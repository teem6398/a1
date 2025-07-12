'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from '../../lib/translation-context';
import { useTheme } from '../../lib/theme-context';
import Navbar from '../../components/Home/Navbar/Navbar';
import Footer from '../../components/Home/Footer/footers';
import HeroSection from '../../components/colleges/shared/HeroSection';
import AboutSection from '../../components/colleges/shared/AboutSection';
import DeanSection from '../../components/colleges/shared/DeanSection';
import MajorsSection from '../../components/colleges/shared/MajorsSection';
import '../../components/colleges/sharing/index.css';
import '../../styles/index.css';
import styles from './college-page.module.css';

// تعريف نوع بيانات الكلية
interface CollegeData {
  id: number;
  name: string;
  name_en?: string;
  hero_title: string;
  hero_title_en?: string;
  hero_subtitle: string;
  hero_subtitle_en?: string;
  hero_image_url: string;
  about_content: string;
  about_content_en?: string;
  dean_name: string;
  dean_name_en?: string;
  dean_title: string;
  dean_title_en?: string;
  dean_image_url: string;
  dean_message: string;
  dean_message_en?: string;
  updated_at: string;
}

// تعريف نوع بيانات الإحصائيات
interface StatItem {
  id: number;
  college_id: number;
  stat_number: string;
  stat_label: string;
  stat_label_en?: string;
}

export default function CollegePage() {
  const { language, dir } = useTranslation();
  const { theme } = useTheme();
  const params = useParams();
  const collegeId = params.id as string;
  
  const [collegeData, setCollegeData] = useState<CollegeData | null>(null);
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Theme persistence and data attribute
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    async function fetchCollegeData() {
      try {
        setLoading(true);
        const response = await fetch(`/api/api_pages/colleges?id=${collegeId}&lang=${language}`);
        if (!response.ok) {
          throw new Error(language === 'en' ? 'Failed to fetch college data' : 'فشل في جلب بيانات الكلية');
        }
        const data = await response.json();
        setCollegeData(data.college);
        setStats(data.stats);
      } catch (err) {
        console.error(language === 'en' ? 'Error fetching college data:' : 'خطأ في جلب بيانات الكلية:', err);
        setError(language === 'en' 
          ? 'Failed to load college data. Please try again later.' 
          : 'فشل في تحميل بيانات الكلية. يرجى المحاولة مرة أخرى لاحقًا.');
      } finally {
        setLoading(false);
      }
    }

    fetchCollegeData();
  }, [collegeId, language]);

  if (loading) {
    return (
      <div dir={dir} className={`${styles.pageContainer} ${theme}`}>
        <Navbar context='faculties'/>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>
            {language === 'en' ? 'Loading college data...' : 'جاري تحميل بيانات الكلية...'}
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div dir={dir} className={`${styles.pageContainer} ${theme}`}>
        <Navbar context='faculties'/>
        <div className={styles.errorContainer}>
          <h2 className={styles.errorTitle}>
            {language === 'en' ? 'Error' : 'خطأ'}
          </h2>
          <p className={styles.errorMessage}>{error}</p>
          <button 
            className={styles.retryButton}
            onClick={() => window.location.reload()}
          >
            {language === 'en' ? 'Try Again' : 'حاول مرة أخرى'}
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  if (!collegeData) {
    return (
      <div dir={dir} className={`${styles.pageContainer} ${theme}`}>
        <Navbar context='faculties'/>
        <div className={styles.notFoundContainer}>
          <h2 className={styles.notFoundTitle}>
            {language === 'en' ? 'College Not Found' : 'لم يتم العثور على الكلية'}
          </h2>
          <p className={styles.notFoundMessage}>
            {language === 'en' 
              ? 'The requested college could not be found.' 
              : 'لا يمكن العثور على الكلية المطلوبة.'}
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  // تحديد عنوان الصفحة حسب اللغة
  const title = language === 'en' && collegeData.hero_title_en 
    ? collegeData.hero_title_en 
    : collegeData.hero_title;
  
  const subtitle = language === 'en' && collegeData.hero_subtitle_en 
    ? collegeData.hero_subtitle_en 
    : collegeData.hero_subtitle;

  return (
    <div dir={dir} className={`${styles.pageContainer} ${theme}`} data-theme={theme}>
      <Navbar context='faculties'/>
      
      <HeroSection 
        title={title}
        subtitle={subtitle}
        imageUrl={collegeData.hero_image_url}
      />
      
      <AboutSection 
        content={collegeData.about_content}
        content_en={collegeData.about_content_en}
        stats={stats}
      />
      
      <DeanSection 
        name={collegeData.dean_name}
        name_en={collegeData.dean_name_en}
        title={collegeData.dean_title}
        title_en={collegeData.dean_title_en}
        imageUrl={collegeData.dean_image_url}
        message={collegeData.dean_message}
        message_en={collegeData.dean_message_en}
      />
      
      <MajorsSection collegeId={Number(collegeId)} />
      
      <Footer />
    </div>
  );
} 