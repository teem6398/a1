import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

// استخدام متغير بيئي للمفتاح السري مع التأكد من أنه ليس المفتاح الافتراضي في الإنتاج
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '24h';
const STUDENT_JWT_SECRET = process.env.STUDENT_JWT_SECRET || JWT_SECRET;
const TEACHER_JWT_SECRET = process.env.TEACHER_JWT_SECRET || JWT_SECRET;

// تحقق من أن المفتاح السري ليس المفتاح الافتراضي في الإنتاج
if (process.env.NODE_ENV === 'production' && JWT_SECRET === 'your-secret-key-change-in-production') {
  console.error('تحذير أمان: يتم استخدام المفتاح السري الافتراضي في بيئة الإنتاج. يرجى تعيين متغير بيئي JWT_SECRET.');
}

// تخزين مؤقت لمحاولات تسجيل الدخول الفاشلة
const failedAttempts = new Map<string, { count: number; blockedUntil?: Date; blockCount: number }>();

// دالة للتحقق مما إذا كان الكود يعمل في المتصفح
const isBrowser = () => typeof window !== 'undefined';

// دالة لحفظ محاولات تسجيل الدخول الفاشلة في localStorage
const saveFailedAttemptsToStorage = () => {
  if (!isBrowser()) return;
  
  const dataToSave: Record<string, { count: number; blockedUntil?: string; blockCount: number }> = {};
  
  failedAttempts.forEach((value, key) => {
    dataToSave[key] = {
      count: value.count,
      blockedUntil: value.blockedUntil ? value.blockedUntil.toISOString() : undefined,
      blockCount: value.blockCount || 0
    };
  });
  
  try {
    localStorage.setItem('failed_login_attempts', JSON.stringify(dataToSave));
  } catch (error) {
    console.error('فشل في حفظ محاولات تسجيل الدخول الفاشلة في localStorage:', error);
  }
};

// دالة لاسترجاع محاولات تسجيل الدخول الفاشلة من localStorage
const loadFailedAttemptsFromStorage = () => {
  if (!isBrowser()) return;
  
  try {
    const storedData = localStorage.getItem('failed_login_attempts');
    if (!storedData) return;
    
    const parsedData: Record<string, { count: number; blockedUntil?: string; blockCount: number }> = JSON.parse(storedData);
    
    Object.entries(parsedData).forEach(([key, value]) => {
      failedAttempts.set(key, {
        count: value.count,
        blockedUntil: value.blockedUntil ? new Date(value.blockedUntil) : undefined,
        blockCount: value.blockCount || 0
      });
    });
  } catch (error) {
    console.error('فشل في استرجاع محاولات تسجيل الدخول الفاشلة من localStorage:', error);
  }
};

// تحميل البيانات من localStorage عند تهيئة الوحدة
if (isBrowser()) {
  loadFailedAttemptsFromStorage();
  
  // تنظيف دوري لمحاولات تسجيل الدخول الفاشلة القديمة (كل دقيقة)
  setInterval(() => {
    const now = new Date();
    let hasChanges = false;
    
    // استخدام Array.from لتجنب مشكلة MapIterator
    Array.from(failedAttempts.entries()).forEach(([identifier, attempt]) => {
      if (attempt.blockedUntil && now > attempt.blockedUntil) {
        failedAttempts.delete(identifier);
        hasChanges = true;
      }
    });
    
    // حفظ التغييرات إذا كان هناك تغييرات
    if (hasChanges) {
      saveFailedAttemptsToStorage();
    }
  }, 60 * 1000); // كل دقيقة
}

export interface User {
  id: string;
  name: string;
  role: 'student' | 'teacher' | 'admin';
  email?: string;
  studentId?: string;
  teacherId?: string;
}

// إنشاء JWT Token
export function generateToken(user: User): string {
  // اختيار المفتاح السري المناسب بناءً على نوع المستخدم
  let secretKey = JWT_SECRET;
  if (user.role === 'student') {
    secretKey = STUDENT_JWT_SECRET;
  } else if (user.role === 'teacher') {
    secretKey = TEACHER_JWT_SECRET;
  }

  return jwt.sign(
    {
      userId: user.id,
      name: user.name,
      role: user.role,
      email: user.email,
      studentId: user.studentId,
      teacherId: user.teacherId,
    },
    secretKey,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

// التحقق من JWT Token
export function verifyToken(token: string): User | null {
  try {
    // محاولة التحقق باستخدام المفتاح السري العام أولاً
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      return {
        id: decoded.userId,
        name: decoded.name,
        role: decoded.role,
        email: decoded.email,
        studentId: decoded.studentId,
        teacherId: decoded.teacherId
      };
    } catch (error) {
      // إذا فشل، جرب المفاتيح الأخرى
      try {
        const decoded = jwt.verify(token, STUDENT_JWT_SECRET) as any;
        return {
          id: decoded.userId,
          name: decoded.name,
          role: decoded.role,
          email: decoded.email,
          studentId: decoded.studentId,
          teacherId: decoded.teacherId
        };
      } catch (innerError) {
        // جرب مفتاح المعلم
        const decoded = jwt.verify(token, TEACHER_JWT_SECRET) as any;
        return {
          id: decoded.userId,
          name: decoded.name,
          role: decoded.role,
          email: decoded.email,
          studentId: decoded.studentId,
          teacherId: decoded.teacherId
        };
      }
    }
  } catch (error) {
    return null;
  }
}

// تنظيف المدخلات
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input.trim().replace(/[<>\"'%;()&+]/g, '');
}

// تشفير كلمة المرور
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12); // استخدام 12 جولة للتشفير
  return bcrypt.hash(password, salt);
}

// التحقق من كلمة المرور
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// تسجيل محاولة تسجيل دخول فاشلة
export function recordFailedLogin(identifier: string): { blocked: boolean; remainingAttempts: number; blockedUntil?: Date } {
  // تحميل البيانات من localStorage إذا كان في المتصفح
  if (isBrowser()) {
    loadFailedAttemptsFromStorage();
  }
  
  const now = new Date();
  const attempt = failedAttempts.get(identifier) || { count: 0, blockCount: 0 };
  
  // إذا كان محظوراً، تحقق من انتهاء فترة الحظر
  if (attempt.blockedUntil && now < attempt.blockedUntil) {
    return { 
      blocked: true, 
      remainingAttempts: 0, 
      blockedUntil: attempt.blockedUntil 
    };
  }
  
  // إذا انتهت فترة الحظر، اعيد تعيين العداد لكن احتفظ بعدد مرات الحظر
  if (attempt.blockedUntil && now >= attempt.blockedUntil) {
    attempt.count = 0;
    attempt.blockedUntil = undefined;
    // لا نعيد تعيين blockCount هنا للاحتفاظ بسجل الحظر السابق
  }
  
  attempt.count++;
  
  // حظر بعد 5 محاولات فاشلة بمدة تزداد مع تكرار الحظر
  if (attempt.count >= 5) {
    // زيادة عداد الحظر
    attempt.blockCount = (attempt.blockCount || 0) + 1;
    
    // حساب مدة الحظر بناءً على عدد مرات الحظر السابقة
    // المدة الأساسية هي 15 دقيقة، وتتضاعف مع كل حظر جديد حتى أسبوع كامل (7 أيام) كحد أقصى
    const blockMinutes = Math.min(15 * Math.pow(2, attempt.blockCount - 1), 7 * 24 * 60);
    
    attempt.blockedUntil = new Date(now.getTime() + blockMinutes * 60 * 1000);
    failedAttempts.set(identifier, attempt);
    
    // حفظ البيانات في localStorage إذا كان في المتصفح
    if (isBrowser()) {
      saveFailedAttemptsToStorage();
    }
    
    return { 
      blocked: true, 
      remainingAttempts: 0, 
      blockedUntil: attempt.blockedUntil 
    };
  }
  
  failedAttempts.set(identifier, attempt);
  
  // حفظ البيانات في localStorage إذا كان في المتصفح
  if (isBrowser()) {
    saveFailedAttemptsToStorage();
  }
  
  return { 
    blocked: false, 
    remainingAttempts: 5 - attempt.count 
  };
}

// التحقق من حالة الحظر
export function getLoginStatus(identifier: string): { blocked: boolean; remainingAttempts: number; blockedUntil?: Date; blockCount?: number } {
  // تحميل البيانات من localStorage إذا كان في المتصفح
  if (isBrowser()) {
    loadFailedAttemptsFromStorage();
  }
  
  const now = new Date();
  const attempt = failedAttempts.get(identifier);
  
  if (!attempt) {
    return { blocked: false, remainingAttempts: 5 };
  }
  
  if (attempt.blockedUntil && now < attempt.blockedUntil) {
    // ما زال محظوراً
    return { 
      blocked: true, 
      remainingAttempts: 0, 
      blockedUntil: attempt.blockedUntil,
      blockCount: attempt.blockCount
    };
  }
  
  if (attempt.blockedUntil && now >= attempt.blockedUntil) {
    // انتهت فترة الحظر
    attempt.count = 0;
    attempt.blockedUntil = undefined;
    // لا نعيد تعيين blockCount هنا
    failedAttempts.set(identifier, attempt);
    
    // حفظ البيانات في localStorage إذا كان في المتصفح
    if (isBrowser()) {
      saveFailedAttemptsToStorage();
    }
    
    return { 
      blocked: false, 
      remainingAttempts: 5,
      blockCount: attempt.blockCount
    };
  }
  
  return { 
    blocked: false, 
    remainingAttempts: 5 - attempt.count,
    blockCount: attempt.blockCount
  };
}

// مسح محاولات تسجيل الدخول الفاشلة
export function clearFailedAttempts(identifier: string): void {
  failedAttempts.delete(identifier);
  
  // حفظ البيانات في localStorage إذا كان في المتصفح
  if (isBrowser()) {
    saveFailedAttemptsToStorage();
  }
}

// تنسيق وقت الحظر المتبقي
export function formatBlockedTime(blockedUntil?: Date): string {
  if (!blockedUntil) return '';
  
  const now = new Date();
  const diffMs = blockedUntil.getTime() - now.getTime();
  const diffMins = Math.round(diffMs / 60000);
  
  if (diffMins <= 0) return 'انتهت فترة الحظر';
  if (diffMins === 1) return 'دقيقة واحدة متبقية';
  if (diffMins < 60) return `${diffMins} دقيقة متبقية`;
  
  const hours = Math.floor(diffMins / 60);
  const mins = diffMins % 60;
  
  if (hours < 24) {
    return `${hours} ساعة${mins > 0 ? ` و ${mins} دقيقة` : ''} متبقية`;
  }
  
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  
  if (days === 1) {
    return `يوم واحد${remainingHours > 0 ? ` و ${remainingHours} ساعة` : ''} متبقي`;
  }
  
  return `${days} أيام${remainingHours > 0 ? ` و ${remainingHours} ساعة` : ''} متبقية`;
}

// التحقق مما إذا كان المستخدم محظوراً
export function isBlocked(identifier: string): boolean {
  const status = getLoginStatus(identifier);
  return status.blocked;
}

// إنشاء CSRF Token
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// التحقق من CSRF Token
export function verifyCSRFToken(token: string, sessionToken: string): boolean {
  if (!token || !sessionToken) return false;
  
  // استخدام مقارنة آمنة من الناحية الزمنية
  try {
    return crypto.timingSafeEqual(
      Buffer.from(token, 'hex'),
      Buffer.from(sessionToken, 'hex')
    );
  } catch (error) {
    return false;
  }
}

// دالة مساعدة لاستخراج token من الكوكيز
export function extractTokenFromCookies(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  
  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [name, value] = cookie.trim().split('=');
    acc[name] = value;
    return acc;
  }, {} as Record<string, string>);
  
  return cookies['auth-token'] || null;
}

// إنشاء رمز تعيين كلمة المرور
export function generatePasswordResetToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// التحقق من صلاحية رمز إعادة تعيين كلمة المرور
export function isValidPasswordResetToken(token: string, storedToken: string, expiryTime: Date): boolean {
  if (!token || !storedToken) return false;
  
  // التحقق من انتهاء صلاحية الرمز
  const now = new Date();
  if (now > expiryTime) return false;
  
  // التحقق من تطابق الرمز
  try {
    return crypto.timingSafeEqual(
      Buffer.from(token),
      Buffer.from(storedToken)
    );
  } catch (error) {
    return false;
  }
} 