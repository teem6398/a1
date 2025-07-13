import React from 'react';
import styles from './LoadingIndicator.module.css';
import { useTranslation } from '../../lib/translation-context';

interface LoadingIndicatorProps {
  message?: string;
  fullOverlay?: boolean;
  containerClassName?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  message, 
  fullOverlay = false,
  containerClassName = ''
}) => {
  const { language } = useTranslation();
  
  // رسالة التحميل حسب اللغة
  const defaultMessage = language === 'ar' ? 'جاري التحميل' : 'Loading';
  
  return (
    <div className={`${styles.loadingOverlay} ${fullOverlay ? styles.fullOverlay : ''} ${containerClassName}`}>
      <div className={styles.loadingContainer}>
        <div className={styles.dotsContainer}>
          <div className={`${styles.dot} ${styles.dot1}`}></div>
          <div className={`${styles.dot} ${styles.dot2}`}></div>
          <div className={`${styles.dot} ${styles.dot3}`}></div>
        </div>
        <p className={`${styles.message} ${language === 'ar' ? styles.rtl : ''}`}>
          {message || defaultMessage}
        </p>
      </div>
    </div>
  );
};

export default LoadingIndicator; 