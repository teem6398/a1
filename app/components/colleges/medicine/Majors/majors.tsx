'use client';

import Link from 'next/link';
import styles from '../../sharing/sharing.module.css';

import { useEffect, useState } from 'react';

interface Major {
  id: number;
  college_id: number;
  name: string;
  icon: string;
  duration_years: number;
  students_count: number;
  description: string;
  features: string;
  link: string;
}

const Majors = () => {
  const [majors, setMajors] = useState<Major[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchMajors = async () => {
      try {
        // كلية الطب (Medicine) - استبدل الرقم 2 برقم الكلية الصحيح في قاعدة البيانات
        const response = await fetch(`/api/api_pages/majors?college_id=2`);
        
        if (!response.ok) {
          throw new Error('فشل في جلب بيانات التخصصات');
        }
        
        const data = await response.json();
        setMajors(data.majors);
      } catch (err) {
        console.error('خطأ في جلب التخصصات:', err);
        setError('حدث خطأ أثناء تحميل التخصصات. يرجى المحاولة مرة أخرى لاحقًا.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMajors();
  }, []);
  
  // تحويل سلسلة المزايا إلى مصفوفة
  const getFeaturesArray = (featuresString: string): string[] => {
    return featuresString ? featuresString.split(';') : [];
  };
  
  return (
    <section id="specialties" className={styles.specialtiesSection}>
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>التخصصات</h2>
        
        {loading && <p className={styles.loadingText}>جاري تحميل التخصصات...</p>}
        
        {error && <p className={styles.errorText}>{error}</p>}
        
        <div className={styles.specialtiesGrid}>
          {majors.map((major) => (
            <Link key={major.id} href={major.link} className={styles.specialtyCard}>
              <span className={styles.specialtyIcon}>{major.icon}</span>
              <h3 className={styles.specialtyName}>{major.name}</h3>
              <p className={styles.specialtyStudents}>
                بكالوريوس - {major.duration_years} سنوات • {major.students_count} طالب/ة
              </p>
              <ul className={styles.featuresList}>
                {getFeaturesArray(major.features).map((feature, index) => (
                  <li key={index} className={styles.featuresItem}>✓ {feature}</li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Majors;