'use client';

import { useState, useEffect } from 'react';
import styles from "./home.module.css";
import Navbar from './Navbar/Navbar';
import Hero from './Hero/Hero';
import NewsSection from './News/NewsSection';
import About from './About/About';
import Footer from './Footer/footers';  
import AlumniSection from "./AlumniStories/AlumniSection";
import Activities from './Activities';
import LoadingIndicator from './LoadingIndicator';

export default function Home() {
  const [showNews, setShowNews] = useState(false);
  const [showAlumni, setShowAlumni] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSections, setLoadedSections] = useState({
    hero: false,
    about: false,
    news: false,
    activities: false,
    alumni: false,
    footer: false
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      // إظهار الأقسام تلقائياً على الشاشات الكبيرة
      if (window.innerWidth > 768) {
        setShowNews(true);
        setShowAlumni(true);
        setShowActivities(true);
      } else {
        setShowNews(false);
        setShowAlumni(false);
        setShowActivities(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // تحميل الأقسام بالتدريج
  useEffect(() => {
    const loadSectionsSequentially = async () => {
      // Hero
      await new Promise(resolve => setTimeout(resolve, 300));
      setLoadedSections(prev => ({ ...prev, hero: true }));

      // عن الجامعة
      await new Promise(resolve => setTimeout(resolve, 400));
      setLoadedSections(prev => ({ ...prev, about: true }));

      // الأخبار
      await new Promise(resolve => setTimeout(resolve, 500));
      setLoadedSections(prev => ({ ...prev, news: true }));

      // الأنشطة
      await new Promise(resolve => setTimeout(resolve, 600));
      setLoadedSections(prev => ({ ...prev, activities: true }));

      // قصص الخريجين
      await new Promise(resolve => setTimeout(resolve, 700));
      setLoadedSections(prev => ({ ...prev, alumni: true }));

      // التذييل أخيراً
      await new Promise(resolve => setTimeout(resolve, 800));
      setLoadedSections(prev => ({ ...prev, footer: true }));

      // إخفاء مؤشر التحميل
      await new Promise(resolve => setTimeout(resolve, 200));
      setIsLoading(false);
    };

    loadSectionsSequentially();
  }, []);

  return (
    <div className={styles.container}>
      {/* الشريط العلوي - يظهر دائماً */}
      <Navbar context="Home"/>
      
      {isLoading && <LoadingIndicator />}
      
      {!isLoading && (
        <>
          {/* Hero */}
          <div className={`${styles.section} ${loadedSections.hero ? styles.visible : styles.hidden}`}>
            <Hero />
          </div>
          
          {/* عن الجامعة */}
          <div className={`${styles.section} ${loadedSections.about ? styles.visible : styles.hidden}`}>
            <About />
          </div>
          
          {/* أزرار التحكم المحسنة للموبايل */}
          {isMobile && (
            <div className={styles.homeMobileNavigation}>
              <button
                className={`${styles.homeMobileNavButton} ${showNews ? styles.homeActiveButton : ''}`}
                onClick={() => setShowNews(!showNews)}
                aria-label="عرض الأخبار"
              >
                <span className={styles.buttonIcon}>📰</span>
                <span className={styles.buttonText}>الأخبار</span>
              </button>
              <button
                className={`${styles.homeMobileNavButton} ${showActivities ? styles.homeActiveButton : ''}`}
                onClick={() => setShowActivities(!showActivities)}
                aria-label="عرض الأنشطة"
              >
                <span className={styles.buttonIcon}>🎯</span>
                <span className={styles.buttonText}>الأنشطة</span>
              </button>
              <button
                className={`${styles.homeMobileNavButton} ${showAlumni ? styles.homeActiveButton : ''}`}
                onClick={() => setShowAlumni(!showAlumni)}
                aria-label="عرض قصص الخريجين"
              >
                <span className={styles.buttonIcon}>👨‍🎓</span>
                <span className={styles.buttonText}>قصص الخريجين</span>
              </button>
            </div>
          )}
          
          {/* الأخبار */}
          <div className={`${styles.section} ${(showNews || !isMobile) && loadedSections.news ? styles.visible : styles.hidden}`}>
            <NewsSection />
          </div>
          
          {/* الأنشطة */}
          <div className={`${styles.section} ${(showActivities || !isMobile) && loadedSections.activities ? styles.visible : styles.hidden}`}>
            <Activities />
          </div>
          
          {/* قصص الخريجين */}
          <div className={`${styles.section} ${(showAlumni || !isMobile) && loadedSections.alumni ? styles.visible : styles.hidden}`}>
            <AlumniSection />
          </div>
          
          {/* التذييل */}
          <div className={`${styles.section} ${loadedSections.footer ? styles.visible : styles.hidden}`}>
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}