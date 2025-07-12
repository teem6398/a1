'use client';

import React, { useState, useEffect } from 'react';
import styles from './UniversityIntroVideo.module.css';
import { useTranslation } from '../../../lib/translation-context';
import translations from '../translations.json';
import { motion } from 'framer-motion';

const UniversityIntroVideo: React.FC = () => {
  const { language } = useTranslation();
  const t = translations[language as keyof typeof translations];
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // التحقق من حجم الشاشة لتحديد ما إذا كان الجهاز محمولاً
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // التحقق عند تحميل الصفحة
    checkIfMobile();

    // التحقق عند تغيير حجم النافذة
    window.addEventListener('resize', checkIfMobile);

    // تنظيف المستمع عند إزالة المكون
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // معالج النقر على زر التشغيل
  const handlePlayClick = () => {
    setIsVideoPlaying(true);
  };

  return (
    <section className={styles.introSection}>
      <div className={styles.container}>
        <motion.div 
          className={styles.textContent}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>{t.universityIntroVideo.title}</h2>
          <p className={styles.description}>{t.universityIntroVideo.description}</p>
          
          {isMobile && (
            <button 
              className={styles.mobilePlayButton}
              onClick={handlePlayClick}
              aria-label="تشغيل الفيديو"
            >
              {t.universityIntroVideo.playVideo || "شاهد الفيديو"}
              <span className={styles.playIcon}>▶</span>
            </button>
          )}
        </motion.div>
        
        <motion.div 
          className={`${styles.videoWrapper} ${isMobile && !isVideoPlaying ? styles.hiddenOnMobile : ''}`}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.videoContainer}>
            {!isVideoPlaying && !isMobile ? (
              <>
                <div className={styles.videoPlaceholder}>
                  <button 
                    className={styles.playButton}
                    onClick={handlePlayClick}
                    aria-label="تشغيل الفيديو"
                  >
                    <span className={styles.playIcon}>▶</span>
                  </button>
                </div>
                <div className={styles.videoOverlay}></div>
              </>
            ) : (
              <>
                <iframe 
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                  title="University Introduction"
                  allowFullScreen
                  className={styles.video}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
                <div className={styles.videoOverlay}></div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UniversityIntroVideo;
