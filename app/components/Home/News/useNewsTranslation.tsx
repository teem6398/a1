'use client';

import { useState, useEffect } from 'react';
import { useTranslation as useAppTranslation } from '../../../lib/translation-context';
import translations from './translations.json';

export function useNewsTranslation() {
  const { language, isRTL, dir } = useAppTranslation();
  const [newsTranslations, setNewsTranslations] = useState<Record<string, string>>({});
  
  useEffect(() => {
    // استخدام الترجمات من ملف JSON المحلي
    setNewsTranslations(language === 'en' ? translations.en : translations.ar);
  }, [language]);
  
  // دالة الترجمة المخصصة لقسم الأخبار
  const t = (key: string, fallback?: string): string => {
    return newsTranslations[key] || fallback || key;
  };
  
  return { language, isRTL, dir, t };
} 