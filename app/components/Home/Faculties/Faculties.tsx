'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Faculties.module.css';

interface Faculty {
  faculty_id: number;
  name: string;
  description: string;
  slug: string;
  image_path: string;
  icon: string;
  programs: number;
  students: number;
}

const Faculties = () => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await fetch('/api/api_pages/faculties');
        if (response.ok) {
          const data = await response.json();
          setFaculties(data);
        }
      } catch (error) {
        console.error('خطأ في جلب بيانات الكليات:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaculties();
  }, []);

  if (isLoading) {
    return <div className={styles.loading}>جاري التحميل...</div>;
  }

  if (faculties.length === 0) {
    return null;
  }

  return (
    <section className={styles.facultiesSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.sectionTitle}>كلياتنا</h2>
          <p className={styles.sectionDescription}>
            اكتشف برامجنا الأكاديمية المتميزة في مختلف التخصصات
          </p>
        </motion.div>

        <div className={styles.facultiesGrid}>
          {faculties.map((faculty, index) => (
            <Link href={`/components/colleges/${faculty.slug}`} key={faculty.faculty_id} className={styles.facultyLink}>
              <motion.div
                className={styles.facultyCard}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
                }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={faculty.image_path}
                    alt={faculty.name}
                    width={600}
                    height={300}
                    className={styles.facultyImage}
                  />
                  <span className={styles.icon}>{faculty.icon}</span>
                </div>

                <div className={styles.facultyContent}>
                  <h3 className={styles.facultyName}>{faculty.name}</h3>
                  <p className={styles.facultyDescription}>{faculty.description}</p>
                  
                  <div className={styles.facultyStats}>
                    <div className={styles.stat}>
                      <span className={styles.statNumber}>{faculty.programs}</span>
                      <span className={styles.statLabel}>برامج دراسية</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statNumber}>{faculty.students}</span>
                      <span className={styles.statLabel}>طالب وطالبة</span>
                    </div>
                  </div>

                  <div className={styles.learnMore}>
                    <span>تعرف على المزيد</span>
                    <span className={styles.arrow}>←</span>
                  </div>
                </div>

                <div className={styles.cardOverlay} />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faculties; 