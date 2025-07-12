'use client';
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Language = 'ar' | 'en';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback: string) => string;
  dir: string;
  isRTL: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider = ({ children }: TranslationProviderProps) => {
  const [language, setLanguage] = useState<Language>('ar');
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const isRTL = language === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';

  // تحميل الترجمات عند تغيير اللغة
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/api/api_pages/content?lang=${language}`);
        if (response.ok) {
          const data = await response.json();
          setTranslations(data.translations || {});
        }
      } catch (error) {
        console.error('Error loading translations:', error);
      }
    };

    loadTranslations();

    // تحديث اتجاه الصفحة وسمة اللغة
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    
    // حفظ اللغة المفضلة في localStorage
    localStorage.setItem('preferredLanguage', language);
    
    // إرسال حدث تغيير اللغة للمكونات الأخرى
    document.dispatchEvent(new CustomEvent('languageChange', { detail: { lang: language } }));
  }, [language, dir]);

  // استرجاع اللغة المفضلة من localStorage عند بدء التشغيل
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // دالة الترجمة
  const t = (key: string, fallback: string): string => {
    return translations[key] || fallback;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, dir, isRTL }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Hook لاستخدام الترجمة
export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}; 