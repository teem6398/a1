// نظام تخزين مؤقت بسيط للبيانات المتكررة
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

class CacheManager {
  private cache: Map<string, CacheItem<any>>;
  private defaultTTL: number; // بالمللي ثانية

  constructor(defaultTTL: number = 5 * 60 * 1000) { // افتراضي 5 دقائق
    this.cache = new Map();
    this.defaultTTL = defaultTTL;
  }

  // الحصول على بيانات من التخزين المؤقت
  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }
    
    // التحقق من صلاحية البيانات
    if (Date.now() - item.timestamp > this.defaultTTL) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  // تخزين بيانات في التخزين المؤقت
  set<T>(key: string, data: T, ttl?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
    
    // إذا تم تحديد مدة صلاحية، قم بإعداد مؤقت لحذف البيانات
    if (ttl) {
      setTimeout(() => {
        this.cache.delete(key);
      }, ttl);
    }
  }

  // حذف بيانات من التخزين المؤقت
  delete(key: string): void {
    this.cache.delete(key);
  }

  // حذف جميع البيانات من التخزين المؤقت
  clear(): void {
    this.cache.clear();
  }

  // الحصول على بيانات من التخزين المؤقت أو تنفيذ دالة للحصول عليها
  async getOrFetch<T>(key: string, fetchFn: () => Promise<T>, ttl?: number): Promise<T> {
    const cachedData = this.get<T>(key);
    
    if (cachedData !== null) {
      return cachedData;
    }
    
    const data = await fetchFn();
    this.set(key, data, ttl);
    return data;
  }
}

// إنشاء مثيل واحد للاستخدام في جميع أنحاء التطبيق
export const cacheManager = new CacheManager();

export default cacheManager; 