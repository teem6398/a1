'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import styles from './MajorsGrid.module.css';
import { useTranslation } from '../../lib/translation-context';
import translations from './translations.json';

// تعريف واجهة التخصص
interface Major {
  id: number;
  name: string;
  college: string;
  collegeSlug: string;
  slug: string;
  description: string;
  icon: string;
  duration: string;
  students: number;
  features: string[];
  admissionRequirements: string[];
}

// تعريف واجهة الكلية
interface College {
  id: string;
  name: string;
  slug: string;
}

const MajorsGrid: React.FC = () => {
  const { language, isRTL } = useTranslation();
  const t = translations[language as keyof typeof translations];
  const [majors, setMajors] = useState<Major[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [selectedCollege, setSelectedCollege] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [collegeSelected, setCollegeSelected] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // إذا تم اختيار كلية، نقوم بجلب التخصصات الخاصة بها
        if (selectedCollege) {
          const url = `/api/api_pages/majors?lang=${language}&college=${selectedCollege}`;
          const response = await fetch(url);
          
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          
          const data = await response.json();
          setMajors(data.majors);
          setCollegeSelected(true);
        } else {
          // إذا لم يتم اختيار كلية، نقوم فقط بجلب قائمة الكليات
          const url = `/api/api_pages/majors?lang=${language}`;
          const response = await fetch(url);
          
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          
          const data = await response.json();
          setColleges(data.colleges);
          setMajors([]); // إفراغ قائمة التخصصات
          setCollegeSelected(false);
        }
        setError(null);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError(t.majorsGrid.fetchError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language, selectedCollege]);

  const handleCollegeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCollege(e.target.value);
  };

  const handleCollegeClick = (collegeSlug: string) => {
    setSelectedCollege(collegeSlug);
  };

  const handleBackToColleges = () => {
    setSelectedCollege('');
    setCollegeSelected(false);
  };

  if (loading) {
    return <div className={styles.loading}>{t.majorsGrid.loading}</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <section className={styles.majorsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t.majorsGrid.title}</h2>
          <p className={styles.sectionDescription}>{t.majorsGrid.subtitle}</p>
          
          {collegeSelected && (
            <div className={styles.selectedCollegeHeader}>
              <button 
                className={styles.backButton} 
                onClick={handleBackToColleges}
              >
                {isRTL ? '← ' : ''}{t.majorsGrid.backToColleges}{isRTL ? '' : ' →'}
              </button>
              {selectedCollege && colleges.find(c => c.slug === selectedCollege) && (
                <h3 className={styles.selectedCollegeTitle}>
                  {colleges.find(c => c.slug === selectedCollege)?.name}
                </h3>
              )}
            </div>
          )}
        </div>

        {!collegeSelected ? (
          // عرض قائمة الكليات إذا لم يتم اختيار كلية بعد
          <>
            <div className={styles.selectCollegeMessage}>
              <p>{t.majorsGrid.selectCollegePrompt || "الرجاء اختيار كلية لعرض التخصصات المتاحة:"}</p>
            </div>
            <div className={styles.collegesGrid}>
              {colleges.map((college) => (
                <div 
                  key={college.id} 
                  className={styles.collegeCard}
                  onClick={() => handleCollegeClick(college.slug)}
                >
                  <h3 className={styles.collegeName}>{college.name}</h3>
                  <div className={styles.collegeInfo}>
                    <span>{t.majorsGrid.availableMajors}</span>
                    <span className={styles.arrowIcon}>{isRTL ? '←' : '→'}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          // عرض التخصصات إذا تم اختيار كلية
          <>
            {majors.length === 0 ? (
              <div className={styles.noMajors}>{t.majorsGrid.noMajorsFound}</div>
            ) : (
              <div className={styles.majorsGrid}>
                {majors.map((major) => (
                  <Link href={`/colleges/${major.collegeSlug}/majors/${major.slug}`} key={major.id}>
                    <div className={styles.majorCard}>
                      <div className={styles.majorHeader}>
                        <div className={styles.majorIcon}>{major.icon}</div>
                        <div className={styles.majorTitles}>
                          <h3 className={styles.majorName}>{major.name}</h3>
                          <p className={styles.majorCollege}>{major.college}</p>
                        </div>
                      </div>
                      <p className={styles.majorDescription}>{major.description}</p>
                      
                      <div className={styles.majorInfo}>
                        <span className={styles.majorDuration}>{major.duration}</span>
                        <span className={styles.majorStudents}>{major.students} {t.majorsGrid.students}</span>
                      </div>
                      
                      <div className={styles.majorFeatures}>
                        <h4 className={styles.featuresTitle}>{t.majorsGrid.features}</h4>
                        <ul className={styles.featuresList}>
                          {major.features && major.features.map((feature, index) => (
                            <li key={index} className={styles.featureItem}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className={styles.admissionRequirements}>
                        <h4 className={styles.requirementsTitle}>{t.majorsGrid.admissionRequirements}</h4>
                        {major.admissionRequirements && major.admissionRequirements.length > 0 ? (
                          <ul className={styles.requirementsList}>
                            {major.admissionRequirements.map((req, index) => (
                              <li key={index} className={styles.requirementItem}>{req}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className={styles.noRequirements}>{t.majorsGrid.noRequirements}</p>
                        )}
                      </div>
                      
                      <button className={styles.applyButton}>{t.majorsGrid.applyButton}</button>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default MajorsGrid;
