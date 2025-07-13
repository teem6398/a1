'use client';

import { useState, useEffect } from 'react';
import { useTranslation as useAppTranslation } from '../../../lib/translation-context';
import translations from './translations.json';

export function useActivitiesTranslation() {
  const { language, isRTL, dir } = useAppTranslation();
  const [activitiesTranslations, setActivitiesTranslations] = useState<Record<string, string>>({});
  
  useEffect(() => {
    // استخدام الترجمات من ملف JSON المحلي
    setActivitiesTranslations(language === 'en' ? translations.en : translations.ar);
  }, [language]);
  
  // دالة الترجمة المخصصة لقسم الأنشطة
  const t = (key: string, fallback?: string): string => {
    return activitiesTranslations[key] || fallback || key;
  };
  
  return { language, isRTL, dir, t };
} 