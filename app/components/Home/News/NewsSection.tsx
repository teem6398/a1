'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './NewsSection.module.css';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import { useNewsTranslation } from './useNewsTranslation';

// نموذج بيانات الخبر
interface NewsItem {
  id: number;
  title: string;
  title_en?: string;
  subtitle?: string;
  subtitle_en?: string;
  summary: string;
  summary_en?: string;
  main_image_url: string;
  publish_date: string;
  category_name?: string;
  category_name_en?: string;
  category_id: number;
  slug: string;
  is_featured: boolean;
  is_active: boolean;
  views_count?: number;
}

export default function NewsSection() {
  const { language, t, isRTL } = useNewsTranslation();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // المؤقت للتبديل التلقائي
  const autoSlideInterval = 6000; // 6 ثوان بين كل تبديل
  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // جلب آخر 3 أخبار مميزة
    async function fetchFeaturedNews() {
      try {
        // جلب الأخبار المميزة من API مع تحديد اللغة
        const response = await fetch(`/api/api_pages/news?featured=true&limit=5&lang=${language}`);
        
        if (!response.ok) {
          throw new Error(`${t('error_fetching_news')}: ${response.status}`);
        }
        
        const data = await response.json();
        setNews(data.data || []); // استخدام data.data لأن API الجديد يعيد البيانات في هذا الهيكل
      } catch (error) {
        console.error('خطأ في جلب الأخبار:', error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedNews();
  }, [language, t]); // إضافة language و t كتبعيات للتأثير

  // بدء التبديل التلقائي بعد تحميل البيانات
  useEffect(() => {
    if (news.length > 1 && !isPaused) {
      // تنظيف أي مؤقت سابق
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
      
      // بدء المؤقت الجديد
      slideIntervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
      }, autoSlideInterval);
    }
    
    // تنظيف المؤقت عند إلغاء تحميل المكون
    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
    };
  }, [news.length, isPaused]);

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

  // التنقل بين الأخبار
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + news.length) % news.length);
  };

  // تنسيق التاريخ حسب اللغة
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'PPP', {
        locale: language === 'ar' ? ar : enUS
      });
    } catch (error) {
      return dateString;
    }
  };

  // الحصول على النص المناسب حسب اللغة
  const getLocalizedText = (arText: string, enText?: string): string => {
    if (language === 'en' && enText) {
      return enText;
    }
    return arText;
  };

  // لا نعرض مؤشر التحميل هنا، بل نستخدم المؤشر الموحد
  if (loading) {
    return null;
  }

  return (
    <section className={styles.newsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>{t('News')}</h2>
        
        <div className={styles.newsSlider}>
          <button 
            className={styles.navButton} 
            onClick={handlePrev} 
            aria-label={t('previous')}
          >
            <svg viewBox="0 0 24 24" className={styles.navIcon}>
              <path d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
            </svg>
          </button>

          <div 
            className={styles.sliderContainer}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {news.map((item, index) => (
              <motion.div
                key={item.id}
                className={styles.newsCard}
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
                    <Image 
                      src={item.main_image_url} 
                      alt={getLocalizedText(item.title, item.title_en)}
                      width={600}
                      height={400}
                      className={styles.newsImage}
                    />
                  </div>
                  <span className={styles.category}>
                    {getLocalizedText(item.category_name || '', item.category_name_en)}
                  </span>
                </div>

                <div className={styles.contentContainer}>
                  <h3 className={styles.newsTitle}>
                    {getLocalizedText(item.title, item.title_en)}
                  </h3>
                  <p className={styles.newsSummary}>
                    {getLocalizedText(item.summary, item.summary_en)}
                  </p>
                  <div className={styles.newsFooter}>
                    <span className={styles.newsDate}>{formatDate(item.publish_date)}</span>
                    <Link href={`/news/${item.slug}`} className={styles.readMoreButton}>
                      {t('read_more')}
                      <svg viewBox="0 0 24 24" className={styles.buttonIcon}>
                        <path d={isRTL ? "M5 12h14M12 5l7 7-7 7" : "M5 12h14M12 5l7 7-7 7"} />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button 
            className={styles.navButton} 
            onClick={handleNext} 
            aria-label={t('next')}
          >
            <svg viewBox="0 0 24 24" className={styles.navIcon}>
              <path d={isRTL ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
            </svg>
          </button>
        </div>

        <div className={styles.indicators}>
          {news.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === currentIndex ? styles.activeIndicator : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={t('go_to_news') + ` ${index + 1}`}
            />
          ))}
        </div>
        
        <div className={styles.viewAllContainer}>
          <Link href="/news" className={styles.viewAllButton}>
            {t('view_all_news')}
          </Link>
        </div>
      </div>
    </section>
  );
}
