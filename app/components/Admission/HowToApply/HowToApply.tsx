'use client';

import React, { useState, useEffect } from 'react';
import { FaWpforms, FaFileUpload, FaCreditCard, FaHourglassHalf, FaUserGraduate, FaSpinner } from 'react-icons/fa';
import styles from './HowToApply.module.css';
import { useTranslation } from '../../../lib/translation-context';
import translations from '../translations.json';

// تعريف نوع البيانات للخطوة
interface Step {
  id: number;
  title: string;
  description: string;
  icon: string;
  step_order?: number;
}

// مكون خطوات التقديم
const HowToApply: React.FC = () => {
  const { language } = useTranslation();
  const t = translations[language as keyof typeof translations];
  
  // حالة البيانات والتحميل
  const [steps, setSteps] = useState<Step[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // خريطة الأيقونات - تحويل اسم الأيقونة إلى مكون
  const iconMap: { [key: string]: React.ReactNode } = {
    FaWpforms: <FaWpforms className={styles.stepIcon} />,
    FaFileUpload: <FaFileUpload className={styles.stepIcon} />,
    FaCreditCard: <FaCreditCard className={styles.stepIcon} />,
    FaHourglassHalf: <FaHourglassHalf className={styles.stepIcon} />,
    FaUserGraduate: <FaUserGraduate className={styles.stepIcon} />
  };

  // جلب البيانات من API
  useEffect(() => {
    const fetchApplicationSteps = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/api_pages/application-steps?lang=${language}`);
        
        if (!response.ok) {
          throw new Error('فشل في جلب البيانات من الخادم');
        }
        
        const data = await response.json();
        setSteps(data.steps);
        setError(null);
      } catch (err) {
        console.error('خطأ في جلب خطوات التقديم:', err);
        setError(t.howToApply.fetchError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplicationSteps();
  }, [language]);

  return (
    <section className={styles.howToApplySection}>
      <div className={styles.container}>
        {/* العنوان والوصف */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t.howToApply.title}</h2>
          <p className={styles.sectionDescription}>
            {t.howToApply.subtitle}
          </p>
        </div>

        {/* عرض الخطوات */}
        <div className={styles.stepsContainer}>
          {isLoading ? (
            <div className={styles.loadingContainer}>
              <FaSpinner className={styles.loadingIcon} />
              <p>{t.howToApply.loading}</p>
            </div>
          ) : error ? (
            <div className={styles.errorContainer}>
              <p>{error}</p>
              <button className={styles.retryButton} onClick={() => window.location.reload()}>
                {t.howToApply.retry}
              </button>
            </div>
          ) : steps.length === 0 ? (
            <p>{t.howToApply.noSteps}</p>
          ) : (
            steps.map((step) => (
              <div key={step.id} className={styles.stepCard}>
                <div className={styles.stepNumber}>{step.step_order || step.id}</div>
                <div className={styles.stepIconContainer}>
                  {iconMap[step.icon] || <FaWpforms className={styles.stepIcon} />}
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            ))
          )}
        </div>

        {/* زر التقديم */}
        <div className={styles.actionContainer}>
          <button className={styles.applyButton}>
            {t.howToApply.applyButton}
          </button>
          <a href="#" className={styles.helpLink}>
            {t.howToApply.helpLink}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowToApply;
