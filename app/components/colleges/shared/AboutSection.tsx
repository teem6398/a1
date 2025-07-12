'use client';

import styles from '../sharing/sharing.module.css';
import { useTranslation } from '../../../lib/translation-context';

import { useTheme } from '../../../lib/theme-context';
import { useEffect, useState } from 'react';
import CollegeGeometricShapes, { aboutCollegeShapes, statsectionShapes } from './CollegeGeometricShapes';

// تعريف نوع البيانات المتوقعة كـ props
interface StatItem {
  id: number;
  college_id: number;
  stat_number: string;
  stat_label: string;
  stat_label_en?: string;
}

interface AboutProps {
  content: string;
  content_en?: string;
  stats: StatItem[];
}

const AboutSection = ({ content, content_en, stats = [] }: AboutProps) => {
  const { language, dir } = useTranslation();
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Ensure theme attribute is set
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Animation on scroll
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const aboutElement = document.getElementById('about-section');
    if (aboutElement) {
      observer.observe(aboutElement);
    }

    return () => {
      if (aboutElement) {
        observer.unobserve(aboutElement);
      }
    };
  }, []);
  
  // استخدام بيانات إحصائية افتراضية إذا كانت القائمة فارغة
  const defaultStats = [
    { id: 1, college_id: 0, stat_number: '25+', stat_label: 'قاعة دراسية مجهزة', stat_label_en: 'Equipped Classrooms' },
    { id: 2, college_id: 0, stat_number: '45+', stat_label: 'أستاذ وأستاذة', stat_label_en: 'Professors' },
    { id: 3, college_id: 0, stat_number: '950+', stat_label: 'طالب وطالبة', stat_label_en: 'Students' },
    { id: 4, college_id: 0, stat_number: '12+', stat_label: 'برنامج أكاديمي', stat_label_en: 'Academic Programs' }
  ];

  // استخدام الإحصائيات من قاعدة البيانات أو الافتراضية إذا كانت فارغة
  const statsToShow = stats.length > 0 ? stats : defaultStats;

  // تحديد المحتوى حسب اللغة
  const displayContent = language === 'en' && content_en ? content_en : content;
  
  // تقسيم المحتوى إلى فقرات مع تحسين التنسيق
  const paragraphs = displayContent
    .split(/\.\s+|\n\s*\n/)
    .filter(p => p.trim() !== '')
    .map(p => p.trim().endsWith('.') ? p.trim() : p.trim() + '.');

  return (
    <>
      <section 
        id="about-section" 
        className={`${styles.aboutSection} ${isVisible ? styles.visible : ''}`} 
        dir={dir}
        data-theme={theme}
      >
        {/* إضافة الأشكال الهندسية المتقدمة */}
        <CollegeGeometricShapes shapes={aboutCollegeShapes} className="about-shapes" />
        
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <div className={styles.titleContainer}>
              <h2 className={styles.sectionTitle}>
                {language === 'en' ? 'About the College' : 'عن الكلية'}
              </h2>
              <div className={styles.titleSubtext}>
                {language === 'en' ? 'Excellence in Education & Innovation' : 'التميز في التعليم والابتكار'}
              </div>
            </div>
            <div className={styles.titleDivider}></div>
          </div>
          
          <div className={styles.aboutContent}>
            <div className={styles.aboutText}>
              {paragraphs.map((paragraph, index) => (
                <p 
                  key={index} 
                  className={`${styles.aboutTextPara} ${isVisible ? styles.slideInUp : ''}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* قسم الإحصائيات المحسن */}
      <section 
        className={`${styles.statsSection} ${isVisible ? styles.visible : ''}`}
        data-theme={theme}
      >
        {/* إضافة الأشكال الهندسية لقسم الإحصائيات */}
        <CollegeGeometricShapes shapes={statsectionShapes} className="stats-shapes" />
        
        <div className={styles.sectionContainer}>
          <div className={styles.statsGrid}>
            {statsToShow.map((stat, index) => (
              <div 
                key={stat.id} 
                className={`${styles.statCard} ${isVisible ? styles.countUp : ''}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={styles.statCardInner}>
                  <div className={styles.statIconWrapper}>
                    <span className={styles.statIcon}>
                      {index === 0 ? '🏫' : index === 1 ? '👨‍🏫' : index === 2 ? '🎓' : '📚'}
                    </span>
                  </div>
                  <h3 className={styles.statNumber}>{stat.stat_number}</h3>
                  <p className={styles.statLabel}>
                    {language === 'en' && stat.stat_label_en ? stat.stat_label_en : stat.stat_label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection; 