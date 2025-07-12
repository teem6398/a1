'use client';

import React, { useState, useEffect } from 'react';
import styles from '../PagesEditor.module.css';
import { FaUniversity, FaEdit, FaPlus, FaTrash, FaBuilding } from 'react-icons/fa';
import BusinessEditor from './business/business';
import EngineeringEditor from './engineering/engineering';
import MedicineEditor from './medicine/medicine';


interface College {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_path: string;
  active: boolean;
}

const CollegesEditor: React.FC = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [selectedCollege, setSelectedCollege] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch('/api/api_pages/colleges');
        if (response.ok) {
          const data = await response.json();
          setColleges(data);
        } else {
          setMessage({ text: 'حدث خطأ أثناء جلب بيانات الكليات', type: 'error' });
        }
      } catch (error) {
        console.error('خطأ في جلب بيانات الكليات:', error);
        setMessage({ text: 'حدث خطأ أثناء جلب البيانات', type: 'error' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchColleges();
  }, []);

  const renderCollegeContent = () => {
    if (selectedCollege) {
      switch (selectedCollege) {
        case 'business':
          return <BusinessEditor />;
        case 'engineering':
          return <EngineeringEditor />;
        case 'medicine':
          return <MedicineEditor />;
        default:
          return <div className={styles.comingSoon}>الرجاء اختيار كلية من القائمة</div>;
      }
    }
    return <div className={styles.comingSoon}>الرجاء اختيار كلية من القائمة</div>;
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className={styles.collegesEditorContainer}>
      <div className={styles.collegesHeader}>
        <h2 className={styles.collegesTitle}>
          <FaBuilding /> إدارة صفحات الكليات
        </h2>
      </div>

      <div className={styles.collegesLayout}>
        <div className={styles.collegesSidebar}>
          <h3 className={styles.collegesSidebarTitle}>
            <FaUniversity /> قائمة الكليات
          </h3>
          <ul className={styles.collegesList}>
            <li 
              className={`${styles.collegeItem} ${selectedCollege === 'business' ? styles.activeCollege : ''}`}
              onClick={() => setSelectedCollege('business')}
              style={{ color: selectedCollege === 'business' ? '#000000' : 'inherit' }}
            >
              <span className={styles.collegeIcon}><FaBuilding /></span>
              <span className={styles.collegeName}>كلية إدارة الأعمال</span>
            </li>
            <li 
              className={`${styles.collegeItem} ${selectedCollege === 'engineering' ? styles.activeCollege : ''}`}
              onClick={() => setSelectedCollege('engineering')}
              style={{ color: selectedCollege === 'engineering' ? '#000000' : 'inherit' }}
            >
              <span className={styles.collegeIcon}><FaBuilding /></span>
              <span className={styles.collegeName}>كلية الهندسة</span>
            </li>
            <li 
              className={`${styles.collegeItem} ${selectedCollege === 'medicine' ? styles.activeCollege : ''}`}
              onClick={() => setSelectedCollege('medicine')}
              style={{ color: selectedCollege === 'medicine' ? '#000000' : 'inherit' }}
            >
              <span className={styles.collegeIcon}><FaBuilding /></span>
              <span className={styles.collegeName}>كلية الطب</span>
            </li>
          </ul>
        </div>

        <div className={styles.collegesContent}>
          {renderCollegeContent()}
        </div>
      </div>
    </div>
  );
};

export default CollegesEditor;
