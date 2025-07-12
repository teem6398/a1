'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './AboutUniversity.module.css';
import Footer from '../../components/Home/Footer/footers';
import Navbar from '../../components/Home/Navbar/Navbar';
import { useTranslation } from '../../lib/translation-context';

// تعريف أنواع البيانات

interface HeroSection {
  id: number;
  title: string;
  subtitle: string;
  background_image: string;
}

interface NavbarLink {
  id: number;
  link_text: string;
  section_id: string;
  link_order: number;
}

interface IntroSection {
  id: number;
  section_title: string;
  paragraph_1: string;
  paragraph_2: string;
}

interface Statistic {
  id: number;
  number: string;
  label: string;
  stat_order: number;
}

interface Achievement {
  id: number;
  title: string;
  text: string;
  icon: string;
  achievement_order: number;
}

interface Rule {
  id: number;
  title: string;
  details: string;
  rule_order: number;
}

interface Guideline {
  id: number;
  title: string;
  text: string;
  icon: string;
  guideline_order: number;
}

interface SectionTitle {
  id: number;
  section_title: string;
}

interface AboutUniversityData {
  hero: HeroSection | null;
  intro: IntroSection | null;
  statistics: Statistic[];
  achievementsSection: SectionTitle | null;
  achievements: Achievement[];
  rulesSection: SectionTitle | null;
  rules: Rule[];
  guidelinesSection: SectionTitle | null;
  guidelines: Guideline[];
  language?: string;
}

// المكون الرئيسي لصفحة عن الجامعة
const AboutUniversity = () => {
  const [aboutData, setAboutData] = useState<AboutUniversityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language, t, isRTL } = useTranslation();
  const [activeSection, setActiveSection] = useState<string>('achievements');
  
  // إضافة مراجع للأقسام للتمرير السلس
  const achievementsRef = useRef<HTMLElement>(null);
  const rulesRef = useRef<HTMLElement>(null);
  const guidelinesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/api_pages/about/university?lang=${language}`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("API Response:", data); // للتحقق من البيانات الواردة
        setAboutData(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch about university data:', err);
        setError(isRTL ? 'فشل في جلب البيانات. يرجى المحاولة مرة أخرى لاحقًا.' : 'Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, [language, isRTL]);

  // عرض رسالة التحميل
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>{isRTL ? 'جاري تحميل البيانات...' : 'Loading data...'}</p>
      </div>
    );
  }

  // عرض رسالة الخطأ
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error}</p>
        <button 
          className={styles.retryButton}
          onClick={() => window.location.reload()}
        >
          {isRTL ? 'إعادة المحاولة' : 'Retry'}
        </button>
      </div>
    );
  }

  // التحقق من وجود البيانات الأساسية
  if (!aboutData) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>
          {isRTL ? 'لا توجد بيانات متاحة' : 'No data available'}
        </p>
        <button 
          className={styles.retryButton}
          onClick={() => window.location.reload()}
        >
          {isRTL ? 'إعادة المحاولة' : 'Retry'}
        </button>
      </div>
    );
  }

  // استخدام البيانات من API فقط
  const heroData = aboutData?.hero || null;
  const introData = aboutData?.intro || null;
  const statistics = aboutData?.statistics || [];
  const achievements = aboutData?.achievements || [];
  
  // إذا لم تكن هناك بيانات أساسية، عرض رسالة للمستخدم
  const isMissingCriticalData = !heroData || !introData || statistics.length === 0;
  
  if (isMissingCriticalData) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>
          {isRTL ? 'لا توجد بيانات كافية لعرض الصفحة' : 'Not enough data to display the page'}
        </p>
        <p>
          {isRTL ? 'يرجى التأكد من إضافة البيانات المطلوبة من لوحة التحكم' : 'Please make sure to add the required data from the dashboard'}
        </p>
        <button 
          className={styles.retryButton}
          onClick={() => window.location.href = '/api/api_pages/about/university/init'}
        >
          {isRTL ? 'تهيئة البيانات' : 'Initialize Data'}
        </button>
      </div>
    );
  }

  // وظيفة للتمرير إلى القسم المحدد
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    
    let targetRef;
    switch(sectionId) {
      case 'achievements':
        targetRef = achievementsRef;
        break;
      case 'rules':
        targetRef = rulesRef;
        break;
      case 'guidelines':
        targetRef = guidelinesRef;
        break;
      default:
        targetRef = achievementsRef;
    }
    
    if (targetRef.current) {
      // التمرير إلى القسم بشكل سلس مع مراعاة ارتفاع شريط التنقل
      const yOffset = -70; // تعديل حسب ارتفاع شريط التنقل
      const y = targetRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`${styles.aboutPageContainer} ${isRTL ? '' : styles.ltrMode}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* قسم Hero */}
      <section id="hero" className={styles.heroSection}>
        <div 
          className={styles.heroOverlay}
          style={{
            backgroundImage: heroData.background_image ? 
              `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${heroData.background_image})` : 
              'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8))'
          }}
        ></div>
        <div className={styles.heroContent}>
          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {heroData.title}
          </motion.h1>
          <motion.p 
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {heroData.subtitle}
          </motion.p>
        </div>
      </section>

      <Navbar />

      {/* قسم المقدمة */}
      <section className={styles.introSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>{introData.section_title}</h2>
          <div className={styles.introContent}>
            <div className={styles.introText}>
              <p>{introData.paragraph_1}</p>
              <p>{introData.paragraph_2}</p>
            </div>
            <div className={styles.introStats}>
              {statistics.sort((a, b) => a.stat_order - b.stat_order).map((stat) => (
                <div key={stat.id} className={styles.statCard}>
                  <span className={styles.statNumber}>{stat.number}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* أزرار التنقل للهاتف */}
      <div className={styles.mobileNavigation}>
        <button 
          className={`${styles.mobileNavButton} ${activeSection === 'achievements' ? styles.activeButton : ''}`}
          onClick={() => scrollToSection('achievements')}
        >
          {isRTL ? 'الإنجازات' : 'Achievements'}
        </button>
        <button 
          className={`${styles.mobileNavButton} ${activeSection === 'rules' ? styles.activeButton : ''}`}
          onClick={() => scrollToSection('rules')}
        >
          {isRTL ? 'القوانين' : 'Rules'}
        </button>
        <button 
          className={`${styles.mobileNavButton} ${activeSection === 'guidelines' ? styles.activeButton : ''}`}
          onClick={() => scrollToSection('guidelines')}
        >
          {isRTL ? 'الإرشادات' : 'Guidelines'}
        </button>
      </div>

      {/* قسم الإنجازات */}
      {achievements.length > 0 && (
        <section 
          id="achievements" 
          ref={achievementsRef}
          className={`${styles.achievementsSection} ${activeSection === 'achievements' ? styles.activeMobileSection : styles.hiddenMobileSection}`}
        >
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>
              {aboutData?.achievementsSection?.section_title || (isRTL ? 'إنجازات الجامعة' : 'University Achievements')}
            </h2>
            <div className={styles.achievementsGrid}>
              {achievements.sort((a, b) => a.achievement_order - b.achievement_order).map((achievement) => (
                <div key={achievement.id} className={styles.achievementCard}>
                  <div className={styles.achievementIcon}>{achievement.icon}</div>
                  <h3 className={styles.achievementTitle}>{achievement.title}</h3>
                  <p className={styles.achievementText}>{achievement.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* قسم القوانين */}
      {aboutData?.rules && aboutData.rules.length > 0 && (
        <section 
          id="rules" 
          ref={rulesRef}
          className={`${styles.rulesSection} ${activeSection === 'rules' ? styles.activeMobileSection : styles.hiddenMobileSection}`}
        >
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>
              {aboutData?.rulesSection?.section_title || (isRTL ? 'قوانين الجامعة' : 'University Rules')}
            </h2>
            <div className={styles.rulesContent}>
              <div className={styles.rulesList}>
                {aboutData.rules.sort((a, b) => a.rule_order - b.rule_order).map((rule) => (
                  <div key={rule.id} className={styles.ruleItem}>
                    <h3 className={styles.ruleTitle}>{rule.title}</h3>
                    <ul className={styles.ruleDetails}>
                      {rule.details.split('\n').map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* قسم الإرشادات */}
      {aboutData?.guidelines && aboutData.guidelines.length > 0 && (
        <section 
          id="guidelines" 
          ref={guidelinesRef}
          className={`${styles.guidelinesSection} ${activeSection === 'guidelines' ? styles.activeMobileSection : styles.hiddenMobileSection}`}
        >
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>
              {aboutData?.guidelinesSection?.section_title || (isRTL ? 'إرشادات طلابية' : 'Student Guidelines')}
            </h2>
            <div className={styles.guidelinesCards}>
              {aboutData.guidelines.sort((a, b) => a.guideline_order - b.guideline_order).map((guideline) => (
                <div key={guideline.id} className={styles.guidelineCard}>
                  <div className={styles.guidelineIcon}>{guideline.icon}</div>
                  <h3 className={styles.guidelineTitle}>{guideline.title}</h3>
                  <p className={styles.guidelineText}>{guideline.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default AboutUniversity; 