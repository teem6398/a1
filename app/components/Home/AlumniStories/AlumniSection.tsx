'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './AlumniSection.module.css';
import { useTranslation } from '../../../lib/translation-context';
import translations from './translations.json';

// واجهة بيانات الخريج من API
interface AlumniData {
  id: number;
  name: string;
  graduation_year: number;
  current_position: string;
  company_name: string;
  major_name: string;
  college_name: string;
  image: string | null;
  summary: string;
  linkedin: string | null;
  twitter: string | null;
  email: string | null;
  featured: boolean;
}

// واجهة استجابة API
interface APIResponse {
  success: boolean;
  data: {
    stories: AlumniData[];
    total: number;
  };
  meta: {
    count: number;
    total: number;
    page: number;
    limit: number;
  };
  error?: string;
}

export default function AlumniSection() {
  const [alumniData, setAlumniData] = useState<AlumniData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const { language, isRTL } = useTranslation();
  
  // المؤقت للتبديل التلقائي
  const autoSlideInterval = 5000; // 5 ثوان بين كل تبديل
  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // الحصول على الترجمات من ملف JSON
  const t = (key: string): string => {
    try {
      const lang = language as 'ar' | 'en';
      
      // التحقق من وجود الترجمات
      if (!translations || !translations[lang]) {
        console.warn(`Translation object or language '${lang}' not found`);
        return key;
      }
      
      // التحقق من وجود المفتاح في كائن الترجمات
      if (key in translations[lang]) {
        const value = translations[lang][key as keyof (typeof translations)['ar' | 'en']];
        return typeof value === 'string' ? value : key;
      }
      
      return key;
    } catch (error) {
      console.error('Error in translation function:', error);
      return key;
    }
  };

  // جلب بيانات الخريجين من API
  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log(`Fetching featured alumni from API with language: ${language}...`);
        const response = await fetch(`/api/api_pages/alumni?lang=${language}&featured=true&limit=4`);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error:', response.status, errorText);
          throw new Error(`${t('error')} ${response.status}`);
        }

        const result: APIResponse = await response.json();
        console.log('API Response:', result);
        
        if (!result.success) {
          throw new Error(result.error || t('error'));
        }

        if (result.data.stories && result.data.stories.length > 0) {
          setAlumniData(result.data.stories);
        } else {
          console.log('No alumni stories found, using fallback data');
        }
      } catch (err) {
        console.error('Error fetching alumni:', err);
        setError(err instanceof Error ? err.message : t('error'));
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, [language]);

  // بدء التبديل التلقائي بعد تحميل البيانات
  useEffect(() => {
    if (alumniData.length > 1 && !isPaused) {
      // تنظيف أي مؤقت سابق
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
      
      // بدء المؤقت الجديد
      slideIntervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % alumniData.length);
      }, autoSlideInterval);
    }
    
    // تنظيف المؤقت عند إلغاء تحميل المكون
    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
    };
  }, [alumniData.length, isPaused]);

  // إيقاف التبديل التلقائي مؤقتاً عند تمرير المؤشر فوق البطاقة
  const handleMouseEnter = () => {
    setIsPaused(true);
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
      slideIntervalRef.current = null;
    }
  };

  // إعادة تشغيل التبديل التلقائي عند إزالة المؤشر
  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // التنقل بين الخريجين
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % alumniData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + alumniData.length) % alumniData.length);
  };

  // عرض حالة التحميل
  if (loading) {
    return (
      <section className={styles.alumniSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{t('sectionTitle')}</h2>
          <p className={styles.sectionSubtitle}>{t('sectionSubtitle')}</p>
          <div className={styles.loading}>
            <div className={styles.loadingSpinner}></div>
            <p>{t('loading')}</p>
          </div>
        </div>
      </section>
    );
  }

  // عرض رسالة الخطأ
  if (error) {
    return (
      <section className={styles.alumniSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{t('sectionTitle')}</h2>
          <p className={styles.sectionSubtitle}>{t('sectionSubtitle')}</p>
          <div className={styles.error}>
            <p>{t('error')} {error}</p>
            <button onClick={() => window.location.reload()} className={styles.retryButton}>
              {t('retry')}
            </button>
          </div>
        </div>
      </section>
    );
  }

  // في حالة عدم وجود بيانات
  if (alumniData.length === 0) {
    return (
      <section className={styles.alumniSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{t('sectionTitle')}</h2>
          <p className={styles.sectionSubtitle}>{t('sectionSubtitle')}</p>
          <div className={styles.empty}>
            <p>{t('empty')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.alumniSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>{t('sectionTitle')}</h2>
        <p className={styles.sectionSubtitle}>{t('sectionSubtitle')}</p>

        <div className={styles.alumniSlider}>
          <button 
            className={styles.navButton} 
            onClick={isRTL ? handleNext : handlePrev} 
            aria-label={t('prev')}
          >
            <svg viewBox="0 0 24 24" className={styles.navIcon}>
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div 
            className={styles.sliderContainer}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {alumniData.map((alumni, index) => (
              <motion.div
                key={alumni.id}
                className={styles.alumniCard}
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: index === currentIndex ? 1 : 0,
                  x: index === currentIndex ? 0 : 100,
                  display: index === currentIndex ? 'flex' : 'none'
                }}
                transition={{ duration: 0.8 }}
              >
                <div className={styles.imageContainer}>
                  <div className={styles.imageWrapper}>
                    <img
                      src={alumni.image || '/image/placeholder.jpg'}
                      alt={alumni.name}
                      className={styles.alumniImage}
                      onError={(e) => {
                        // عند حدوث خطأ في تحميل الصورة، استخدم الصورة الاحتياطية
                        const target = e.target as HTMLImageElement;
                        target.src = '/image/placeholder.jpg';
                      }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>

                <div className={styles.contentContainer}>
                  <div className={styles.alumniInfo}>
                    <h3 className={styles.alumniName}>{alumni.name}</h3>
                    <p className={styles.alumniPosition}>
                      {alumni.current_position} {t('at')} {alumni.company_name}
                    </p>
                    <p className={styles.alumniMajor}>
                      {t('graduateOf')} {alumni.major_name} - {t('class')} {alumni.graduation_year}
                    </p>
                  </div>

                  <div className={styles.alumniBio}>
                    <p className={styles.alumniSummary}>{alumni.summary}</p>
                  </div>

                  <Link href={`/AlumniStories/${alumni.id}`} className={styles.readMoreButton}>
                    {t('readMore')}
                    <svg viewBox="0 0 24 24" className={styles.buttonIcon}>
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <button 
            className={styles.navButton} 
            onClick={isRTL ? handlePrev : handleNext} 
            aria-label={t('next')}
          >
            <svg viewBox="0 0 24 24" className={styles.navIcon}>
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className={styles.indicators}>
          {alumniData.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === currentIndex ? styles.activeIndicator : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`${t('goToAlumni')} ${index + 1}`}
            />
          ))}
        </div>

        <div className={styles.viewAllWrapper}>
          <Link href="/AlumniStories" className={styles.viewAllButton}>
            {t('viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
} 