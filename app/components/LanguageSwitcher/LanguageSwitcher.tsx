'use client';
import { useState, useEffect } from 'react';
import { useTranslation } from '../../lib/translation-context';
import styles from './LanguageSwitcher.module.css';

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher = ({ className = '' }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useTranslation();
  const [isChanging, setIsChanging] = useState(false);

  const toggleLanguage = () => {
    setIsChanging(true);
    const newLanguage = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLanguage);
  };

  useEffect(() => {
    if (isChanging) {
      const timer = setTimeout(() => {
        setIsChanging(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isChanging]);

  return (
    <button
      className={`${styles.languageSwitcher} ${className} ${isChanging ? styles.changing : ''}`}
      onClick={toggleLanguage}
      aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
      type="button"
    >
      <span className={styles.languageText}>
        {language === 'ar' ? 'English' : 'العربية'}
      </span>
    </button>
  );
};

export default LanguageSwitcher; 