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

export default function Home() {
  const [showNews, setShowNews] = useState(false);
  const [showAlumni, setShowAlumni] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <div className={styles.container}>
      <Navbar context="Home"/>
      <Hero />
      <About />
      
      {/* أزرار التحكم للموبايل */}
      {isMobile && (
        <div className={styles.mobileControls}>
          <button 
            className={`${styles.toggleButton} ${showNews ? styles.active : ''}`}
            onClick={() => setShowNews(!showNews)}
          >
            <span className={styles.icon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
                <path d="M2 4v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2zm2 0h16v16H4V4z"/>
              </svg>
            </span>
            <span className={styles.text}>
              {showNews ? 'إخفاء الأخبار' : 'عرض الأخبار'}
            </span>
            <span className={styles.badge}>{showNews ? '−' : '+'}</span>
          </button>
          
          <button 
            className={`${styles.toggleButton} ${showActivities ? styles.active : ''}`}
            onClick={() => setShowActivities(!showActivities)}
          >
            <span className={styles.icon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
              </svg>
            </span>
            <span className={styles.text}>
              {showActivities ? 'إخفاء الأنشطة' : 'عرض الأنشطة'}
            </span>
            <span className={styles.badge}>{showActivities ? '−' : '+'}</span>
          </button>
          
          <button 
            className={`${styles.toggleButton} ${showAlumni ? styles.active : ''}`}
            onClick={() => setShowAlumni(!showAlumni)}
          >
            <span className={styles.icon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </span>
            <span className={styles.text}>
              {showAlumni ? 'إخفاء قصص الخريجين' : 'عرض قصص الخريجين'}
            </span>
            <span className={styles.badge}>{showAlumni ? '−' : '+'}</span>
          </button>
        </div>
      )}
      
      {/* عرض الأقسام بناءً على الحالة */}
      <div className={`${styles.section} ${(showNews || !isMobile) ? styles.visible : styles.hidden}`}>
        <NewsSection />
      </div>
      
      <div className={`${styles.section} ${(showActivities || !isMobile) ? styles.visible : styles.hidden}`}>
        <Activities />
      </div>
      
      <div className={`${styles.section} ${(showAlumni || !isMobile) ? styles.visible : styles.hidden}`}>
        <AlumniSection />
      </div>
      
      <Footer />
    </div>
  );
}