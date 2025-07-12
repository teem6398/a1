'use client';

import styles from '../sharing/sharing.module.css';
import { useTranslation } from '../../../lib/translation-context';
import { useTheme } from '../../../lib/theme-context';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import CollegeGeometricShapes, { deanSectionShapes } from './CollegeGeometricShapes';

interface DeanSectionProps {
  name: string;
  name_en?: string;
  title: string;
  title_en?: string;
  imageUrl: string;
  message: string;
  message_en?: string;
}

const DeanSection = ({
  name,
  name_en,
  title,
  title_en,
  imageUrl,
  message,
  message_en
}: DeanSectionProps) => {
  const { language, dir } = useTranslation();
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentView, setCurrentView] = useState<'dean' | 'vision' | 'goals' | 'mission'>('dean');

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

    const deanElement = document.getElementById('dean-section');
    if (deanElement) {
      observer.observe(deanElement);
    }

    return () => {
      if (deanElement) {
        observer.unobserve(deanElement);
      }
    };
  }, []);

  // تحديد النصوص حسب اللغة
  const displayName = language === 'en' && name_en ? name_en : name;
  const displayTitle = language === 'en' && title_en ? title_en : title;
  const displayMessage = language === 'en' && message_en ? message_en : message;

  // تقسيم الرسالة إلى فقرات
  const messageParagraphs = displayMessage
    .split(/\.\s+|\n\s*\n/)
    .filter(p => p.trim() !== '')
    .map(p => p.trim().endsWith('.') ? p.trim() : p.trim() + '.');

  // دوال التعامل مع تغيير العرض
  const handleViewChange = (view: 'dean' | 'vision' | 'goals' | 'mission') => {
    setCurrentView(view);
  };

  const handleBackToDean = () => {
    setCurrentView('dean');
  };

  // محتوى الأقسام المختلفة
  const getContent = () => {
    switch (currentView) {
      case 'vision':
        return {
          title: language === 'en' ? 'College Vision' : 'رؤية الكلية',
          icon: '🎯',
          content: language === 'en' 
            ? 'To be a leading college in providing high-quality education and innovative research that contributes to building a knowledge-based society and sustainable development.'
            : 'أن نكون كلية رائدة في تقديم تعليم عالي الجودة وبحوث مبتكرة تساهم في بناء مجتمع معرفي وتنمية مستدامة.'
        };
      case 'goals':
        return {
          title: language === 'en' ? 'College Goals' : 'أهداف الكلية',
          icon: '🏆',
          content: language === 'en'
            ? 'Providing distinguished academic programs • Developing research and innovation capabilities • Building strategic partnerships • Preparing qualified graduates for the job market'
            : 'تقديم برامج أكاديمية متميزة • تطوير قدرات البحث والابتكار • بناء شراكات استراتيجية • إعداد خريجين مؤهلين لسوق العمل'
        };
      case 'mission':
        return {
          title: language === 'en' ? 'College Message' : 'رسالة الكلية',
          icon: '📋',
          content: language === 'en'
            ? 'We are committed to providing exceptional educational experience through innovative curricula, outstanding faculty, and modern facilities that prepare our students to be leaders in their fields.'
            : 'نحن ملتزمون بتقديم تجربة تعليمية استثنائية من خلال مناهج مبتكرة وهيئة تدريس متميزة ومرافق حديثة تعد طلابنا ليكونوا قادة في مجالاتهم.'
        };
      default:
        return null;
    }
  };

  return (
    <section 
      id="dean-section"
      className={`${styles.deanSection} ${isVisible ? styles.visible : ''}`} 
      dir={dir}
      data-theme={theme}
    >
      {/* إضافة الأشكال الهندسية المتقدمة */}
      <CollegeGeometricShapes shapes={deanSectionShapes} className="dean-shapes" />
      
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <div className={styles.titleContainer}>
            <h2 className={styles.sectionTitle}>
              {language === 'en' ? 'Dean\'s Message' : 'كلمة العميد'}
            </h2>
            <div className={styles.titleSubtext}>
              {language === 'en' ? 'Leadership Vision & Message' : 'رؤية القيادة والرسالة'}
            </div>
          </div>
          <div className={styles.titleDivider}></div>
        </div>

        <div className={styles.deanContent}>
          {/* Dean Image Container */}
          <div className={`${styles.deanImageContainer} ${isVisible ? styles.slideInRight : ''}`}>
            <div className={styles.deanImageWrapper}>
              <div className={styles.imageFrame}>
                <Image
                  src={imageUrl}
                  alt={displayName}
                  width={300}
                  height={300}
                  className={`${styles.deanImage} ${imageLoaded ? styles.loaded : ''}`}
                  onLoad={() => setImageLoaded(true)}
                  priority
                />
              </div>
              
              {/* Decorative elements */}
              <div className={styles.imageDecorations}>
                <div className={styles.decoration1}></div>
                <div className={styles.decoration2}></div>
              </div>
            </div>
            
            <div className={styles.deanInfo}>
              <h3 className={styles.deanName}>{displayName}</h3>
              <p className={styles.deanTitle}>{displayTitle}</p>
              
              {/* Social/Contact Icons */}
              <div className={styles.deanContacts}>
                <span className={styles.contactIcon}>📧</span>
                <span className={styles.contactIcon}>📞</span>
                <span className={styles.contactIcon}>💼</span>
              </div>
            </div>
          </div>

          {/* Dean Message or Other Content */}
          <div className={`${styles.deanMessageContainer} ${isVisible ? styles.slideInLeft : ''}`}>
            <div className={styles.deanCard}>
              {currentView === 'dean' ? (
                <>
                  <div className={styles.quoteIcon}>"</div>
                  
                  <div className={styles.messageContent}>
                    {messageParagraphs.map((paragraph, index) => (
                      <p 
                        key={index}
                        className={`${styles.deanMessage} ${isVisible ? styles.fadeInUp : ''}`}
                        style={{ animationDelay: `${index * 0.3}s` }}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  
                  <div className={styles.signature}>
                    <div className={styles.signatureLine}></div>
                  </div>
                  
                  {/* أزرار الكلية */}
                  <div className={styles.collegeButtons}>
                    <button 
                      className={styles.collegeButton}
                      onClick={() => handleViewChange('vision')}
                    >
                      <span className={styles.buttonIcon}>🎯</span>
                      <span className={styles.buttonText}>
                        {language === 'en' ? 'Vision' : 'رؤية الكلية'}
                      </span>
                    </button>
                    <button 
                      className={styles.collegeButton}
                      onClick={() => handleViewChange('goals')}
                    >
                      <span className={styles.buttonIcon}>🏆</span>
                      <span className={styles.buttonText}>
                        {language === 'en' ? 'Goals' : 'أهداف الكلية'}
                      </span>
                    </button>
                    <button 
                      className={styles.collegeButton}
                      onClick={() => handleViewChange('mission')}
                    >
                      <span className={styles.buttonIcon}>📋</span>
                      <span className={styles.buttonText}>
                        {language === 'en' ? 'Message' : 'رسالة الكلية'}
                      </span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* عرض المحتوى المختار */}
                  {(() => {
                    const content = getContent();
                    if (!content) return null;
                    
                    return (
                      <>
                        <div className={styles.contentHeader}>
                          <div className={styles.contentIcon}>{content.icon}</div>
                          <h3 className={styles.contentTitle}>{content.title}</h3>
                        </div>
                        
                        <div className={styles.contentBody}>
                          {content.content.includes('•') ? (
                            <ul className={styles.contentList}>
                              {content.content.split('•').map((item, index) => (
                                item.trim() && (
                                  <li key={index} className={styles.contentListItem}>
                                    <span className={styles.listIcon}>✓</span>
                                    {item.trim()}
                                  </li>
                                )
                              ))}
                            </ul>
                          ) : (
                            <p className={styles.contentText}>{content.content}</p>
                          )}
                        </div>
                        
                        <div className={styles.backButtonContainer}>
                          <button 
                            className={styles.backButton}
                            onClick={handleBackToDean}
                          >
                            <span className={styles.backIcon}>←</span>
                            <span className={styles.backText}>
                              {language === 'en' ? 'Back to Dean\'s Message' : 'العودة لكلمة العميد'}
                            </span>
                          </button>
                        </div>
                      </>
                    );
                  })()}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeanSection; 