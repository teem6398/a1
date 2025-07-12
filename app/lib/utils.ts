/**
 * مجموعة من الوظائف المساعدة للاستخدام في جميع أنحاء التطبيق
 */

/**
 * تنسيق التاريخ بناءً على اللغة
 * @param date التاريخ المراد تنسيقه
 * @param lang اللغة (ar أو en)
 * @returns التاريخ المنسق كسلسلة نصية
 */
export function formatDate(date: Date, lang: string = 'ar'): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return '';
  }

  try {
    if (lang === 'ar') {
      // تنسيق التاريخ باللغة العربية
      return new Intl.DateTimeFormat('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } else {
      // تنسيق التاريخ باللغة الإنجليزية
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    }
  } catch (error) {
    console.error('Error formatting date:', error);
    return date.toLocaleDateString();
  }
}

/**
 * تنسيق الوقت بناءً على اللغة
 * @param date التاريخ المراد استخراج الوقت منه وتنسيقه
 * @param lang اللغة (ar أو en)
 * @returns الوقت المنسق كسلسلة نصية
 */
export function formatTime(date: Date, lang: string = 'ar'): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return '';
  }

  try {
    if (lang === 'ar') {
      // تنسيق الوقت باللغة العربية
      return new Intl.DateTimeFormat('ar-SA', {
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } else {
      // تنسيق الوقت باللغة الإنجليزية
      return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    }
  } catch (error) {
    console.error('Error formatting time:', error);
    return date.toLocaleTimeString();
  }
}

/**
 * تنسيق التاريخ والوقت معًا بناءً على اللغة
 * @param date التاريخ المراد تنسيقه
 * @param lang اللغة (ar أو en)
 * @returns التاريخ والوقت المنسقين كسلسلة نصية
 */
export function formatDateTime(date: Date, lang: string = 'ar'): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return '';
  }

  try {
    if (lang === 'ar') {
      // تنسيق التاريخ والوقت باللغة العربية
      return new Intl.DateTimeFormat('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } else {
      // تنسيق التاريخ والوقت باللغة الإنجليزية
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    }
  } catch (error) {
    console.error('Error formatting date and time:', error);
    return date.toLocaleString();
  }
}

/**
 * اختصار النص إذا كان أطول من الحد الأقصى
 * @param text النص المراد اختصاره
 * @param maxLength الحد الأقصى لطول النص
 * @returns النص المختصر مع علامة القطع (...) إذا تم اختصاره
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
}

/**
 * تحويل النص إلى رابط مختصر (slug) صالح للاستخدام في URLs
 * @param text النص المراد تحويله
 * @returns الرابط المختصر
 */
export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

/**
 * تحويل حجم الملف من بايت إلى تنسيق مقروء
 * @param bytes حجم الملف بالبايت
 * @param decimals عدد الأرقام العشرية
 * @returns حجم الملف بتنسيق مقروء (مثل KB، MB، إلخ)
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 بايت';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت', 'تيرابايت'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
} 