'use client';

import Link from 'next/link';
import styles from '../sharing/sharing.module.css';
import { useEffect, useState } from 'react';
import { useTranslation } from '../../../lib/translation-context';
import { useTheme } from '../../../lib/theme-context';
import CollegeGeometricShapes, { majorsSectionShapes } from './CollegeGeometricShapes';

interface Major {
  id: number;
  college_id: number;
  name: string;
  name_en?: string;
  icon: string;
  duration_years: number;
  students_count: number;
  description: string;
  description_en?: string;
  features: string;
  features_en?: string;
  link: string;
}

interface MajorsSectionProps {
  collegeId: number;
}

const MajorsSection = ({ collegeId }: MajorsSectionProps) => {
  const { language, dir } = useTranslation();
  const { theme } = useTheme();
  const [majors, setMajors] = useState<Major[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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
      { threshold: 0.2 }
    );

    const majorsElement = document.getElementById('majors-section');
    if (majorsElement) {
      observer.observe(majorsElement);
    }

    return () => {
      if (majorsElement) {
        observer.unobserve(majorsElement);
      }
    };
  }, []);
  
  useEffect(() => {
    const fetchMajors = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/api_pages/majors?college_id=${collegeId}&lang=${language}`);
        
        if (!response.ok) {
          throw new Error(language === 'en' ? 'Failed to fetch majors data' : 'فشل في جلب بيانات التخصصات');
        }
        
        const data = await response.json();
        setMajors(data.majors);
      } catch (err) {
        console.error(language === 'en' ? 'Error fetching majors:' : 'خطأ في جلب التخصصات:', err);
        setError(language === 'en' 
          ? 'An error occurred while loading majors. Please try again later.' 
          : 'حدث خطأ أثناء تحميل التخصصات. يرجى المحاولة مرة أخرى لاحقًا.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMajors();
  }, [collegeId, language]);
  
  // تحويل سلسلة المزايا إلى مصفوفة محسنة
  const getFeaturesArray = (major: Major): string[] => {
    const featuresString = language === 'en' && major.features_en 
      ? major.features_en 
      : major.features;
    
    if (typeof featuresString === 'string' && featuresString.trim()) {
      return featuresString
        .split(/[;,\n]/)
        .map(feature => feature.trim())
        .filter(feature => feature.length > 0)
        .slice(0, 4); // أقصى 4 مزايا للعرض
    }
    
    // مزايا افتراضية إذا لم تكن متوفرة
    return language === 'en' 
      ? ['Accredited Program', 'Expert Faculty', 'Modern Labs', 'Career Support']
      : ['برنامج معتمد', 'هيئة تدريس خبيرة', 'مختبرات حديثة', 'دعم مهني'];
  };

  // Default majors in case of empty response
  const defaultMajors: Major[] = [
    {
      id: 1,
      college_id: collegeId,
      name: 'تخصص عام',
      name_en: 'General Major',
      icon: '🎓',
      duration_years: 4,
      students_count: 150,
      description: 'تخصص شامل ومتكامل',
      description_en: 'Comprehensive and integrated major',
      features: 'برنامج شامل;هيئة تدريس متميزة;مختبرات حديثة;فرص عمل واسعة',
      features_en: 'Comprehensive program;Distinguished faculty;Modern labs;Wide job opportunities',
      link: `/colleges/${collegeId}/majors/1`
    }
  ];

  const majorsToShow = majors.length > 0 ? majors : defaultMajors;
  
  return (
    <section 
      id="majors-section" 
      className={`${styles.specialtiesSection} ${isVisible ? styles.visible : ''}`} 
      dir={dir}
      data-theme={theme}
    >
      {/* إضافة الأشكال الهندسية المتقدمة */}
      <CollegeGeometricShapes shapes={majorsSectionShapes} className="majors-shapes" />
      
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <div className={styles.titleContainer}>
            <h2 className={styles.sectionTitle}>
              {language === 'en' ? 'Academic Programs' : 'البرامج الأكاديمية'}
            </h2>
            <div className={styles.titleSubtext}>
              {language === 'en' 
                ? 'Discover our comprehensive academic programs designed for your success'
                : 'اكتشف برامجنا الأكاديمية الشاملة المصممة لنجاحك'}
            </div>
          </div>
          <div className={styles.titleDivider}></div>
        </div>
        
        {loading && (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>
              {language === 'en' ? 'Loading academic programs...' : 'جاري تحميل البرامج الأكاديمية...'}
          </p>
          </div>
        )}
        
        {error && (
          <div className={styles.errorContainer}>
            <p className={styles.errorText}>{error}</p>
            <button 
              className={styles.retryButton}
              onClick={() => window.location.reload()}
            >
              {language === 'en' ? 'Try Again' : 'حاول مرة أخرى'}
            </button>
          </div>
        )}
        
        {!loading && !error && (
        <div className={styles.specialtiesGrid}>
            {majorsToShow.map((major, index) => {
            const majorLink = major.link || `/colleges/${collegeId}/majors/${major.id}`;
            
            return (
                <Link 
                  key={major.id} 
                  href={majorLink} 
                  className={`${styles.specialtyCard} ${isVisible ? styles.fadeInUp : ''}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.iconWrapper}>
                <span className={styles.specialtyIcon}>{major.icon}</span>
                    </div>
                    <div className={styles.cardBadge}>
                      {language === 'en' ? 'Bachelor' : 'بكالوريوس'}
                    </div>
                  </div>
                  
                  <div className={styles.cardContent}>
                <h3 className={styles.specialtyName}>
                  {language === 'en' && major.name_en ? major.name_en : major.name}
                </h3>
                    
                    <div className={styles.majorStats}>
                      <div className={styles.statItem}>
                        <span className={styles.statIcon}>⏱️</span>
                        <span className={styles.statText}>
                          {major.duration_years} {language === 'en' ? 'years' : 'سنوات'}
                        </span>
                      </div>
                      <div className={styles.statItem}>
                        <span className={styles.statIcon}>👥</span>
                        <span className={styles.statText}>
                          {major.students_count} {language === 'en' ? 'students' : 'طالب/ة'}
                        </span>
                      </div>
                    </div>
                    
                <ul className={styles.featuresList}>
                      {getFeaturesArray(major).map((feature, featureIndex) => (
                        <li key={featureIndex} className={styles.featuresItem}>
                          <span className={styles.featureIcon}>✓</span>
                          <span className={styles.featureText}>{feature}</span>
                        </li>
                  ))}
                </ul>
                  </div>
                  
                  <div className={styles.cardFooter}>
                    <span className={styles.learnMore}>
                      {language === 'en' ? 'Learn More' : 'اعرف المزيد'}
                    </span>
                    <span className={styles.arrowIcon}>→</span>
                  </div>
              </Link>
            );
          })}
          </div>
        )}
      </div>
    </section>
  );
};

export default MajorsSection; 