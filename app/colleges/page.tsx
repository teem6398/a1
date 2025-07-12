'use client';

import { useState, useEffect } from 'react';
import styles from './colleges.module.css';
import Navbar from '../components/Home/Navbar/Navbar';
import Footer from '../components/Home/Footer/footers';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '../lib/translation-context';


interface Faculty {
  faculty_id: number;
  name: string;
  name_en?: string;
  description: string;
  description_en?: string;
  slug: string;
  image_path: string;
  icon: string;
  programs: number;
  students: number;
}

export default function CollegesPage() {
  const { language, dir } = useTranslation();
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/api_pages/faculties?lang=${language}`);
        if (response.ok) {
          const data = await response.json();
          setFaculties(data);
        } else {
          throw new Error(language === 'en' ? 'Failed to fetch faculties' : 'فشل في جلب بيانات الكليات');
        }
      } catch (error) {
        console.error(language === 'en' ? 'Error fetching faculties:' : 'خطأ في جلب بيانات الكليات:', error);
        setError(language === 'en' 
          ? 'An error occurred while loading faculties. Please try again later.' 
          : 'حدث خطأ أثناء تحميل الكليات. يرجى المحاولة مرة أخرى لاحقًا.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaculties();
  }, [language]);

  return (
    <div dir={dir} className={styles.pageContainer}>
      <Navbar context="faculties" />
      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              {language === 'en' ? 'Our Faculties' : 'كلياتنا'}
            </h1>
            <p className={styles.heroSubtitle}>
              {language === 'en' 
                ? 'Excellence in Education and Research' 
                : 'التميز في التعليم والبحث العلمي'}
            </p>
          </div>
        </div>
      </section>

      <main className={styles.main}>
        <div className={styles.container}>
          {isLoading && (
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}></div>
              <p className={styles.loadingText}>
                {language === 'en' ? 'Loading faculties...' : 'جاري تحميل الكليات...'}
              </p>
            </div>
          )}
          
          {error && (
            <div className={styles.errorContainer}>
              <p className={styles.errorMessage}>{error}</p>
            </div>
          )}
          
          {!isLoading && !error && (
            <div className={styles.collegesGrid}>
              {faculties.map((faculty) => (
                <Link 
                  href={`/colleges/${faculty.faculty_id}`} 
                  key={faculty.faculty_id} 
                  className={styles.collegeCard}
                >
                  <div className={styles.cardImageContainer}>
                    <Image
                      src={faculty.image_path}
                      alt={language === 'en' && faculty.name_en ? faculty.name_en : faculty.name}
                      width={400}
                      height={240}
                      className={styles.cardImage}
                      priority={faculty.faculty_id <= 3}
                    />
                    <div className={styles.cardOverlay}>
                      <span className={styles.cardIcon}>{faculty.icon}</span>
                    </div>
                  </div>
                  
                  <div className={styles.cardContent}>
                    <h2 className={styles.cardTitle}>
                      {language === 'en' && faculty.name_en ? faculty.name_en : faculty.name}
                    </h2>
                    <p className={styles.cardDescription}>
                      {language === 'en' && faculty.description_en ? faculty.description_en : faculty.description}
                    </p>
                    
                    <div className={styles.cardStats}>
                      <div className={styles.statItem}>
                        <span className={styles.statNumber}>{faculty.programs}</span>
                        <span className={styles.statLabel}>
                          {language === 'en' ? 'Programs' : 'برامج'}
                        </span>
                      </div>
                      <div className={styles.statItem}>
                        <span className={styles.statNumber}>{faculty.students}</span>
                        <span className={styles.statLabel}>
                          {language === 'en' ? 'Students' : 'طالب/ة'}
                        </span>
                      </div>
                    </div>
                    
                    <div className={styles.cardAction}>
                      <span className={styles.actionText}>
                        {language === 'en' ? 'Learn More' : 'اعرف المزيد'}
                      </span>
                      <span className={styles.actionArrow}>←</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 