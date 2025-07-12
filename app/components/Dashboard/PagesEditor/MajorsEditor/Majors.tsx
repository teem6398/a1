'use client';

import React, { useState, useEffect } from 'react';
import styles from './MajorsEditor.module.css'; // افترض أن هذا الملف موجود وبه الأنماط الأساسية
import { FaBookOpen, FaPlus } from 'react-icons/fa';

// واجهة بسيطة للتخصص
interface MajorListItem {
  id: number;
  name_ar: string;
  name_en?: string; // Optional, based on API response
  college_name?: string; // Optional, based on API response
}

interface MajorsListProps {
  onSelectMajor: (majorId: number) => void;
  selectedMajorId?: number | null; // <-- هذا السطر مهم جدًا
}

const MajorsList: React.FC<MajorsListProps> = ({ onSelectMajor }) => {
  const [majors, setMajors] = useState<MajorListItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMajorVisual, setSelectedMajorVisual] = useState<MajorListItem | null>(null);

  useEffect(() => {
    const fetchMajors = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/api_pages/MajorsEditor');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMajors(data as MajorListItem[]);
      } catch (e) {
        console.error("Failed to fetch majors:", e);
        setError(e instanceof Error ? e.message : 'فشل في جلب قائمة البرامج.');
      }
      setIsLoading(false);
    };

    fetchMajors();
  }, []);

  const handleSelectMajor = (major: MajorListItem) => {
    setSelectedMajorVisual(major);
    onSelectMajor(major.id);
    // لاحقًا، سنقوم بتحميل بيانات التخصص هنا
    console.log('Selected Major:', major.name_ar);
  };

  return (
    <div className={styles.editorLayoutContainer}>
      {/* الشريط الجانبي لعرض قائمة التخصصات */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h3><FaBookOpen /> البرامج الأكاديمية</h3>
          {/* زر إضافة تخصص جديد (سيتم تفعيله لاحقًا) */}
          <button 
            onClick={() => console.log('Add new major clicked')} 
            className={styles.addButtonSmall}
            title="إضافة برنامج جديد (قيد التطوير)"
          >
            <FaPlus /> إضافة
          </button>
        </div>
        {isLoading ? (
          <p className={styles.loadingMessage}>جاري تحميل البرامج...</p>
        ) : error ? (
          <p className={styles.errorMessage}>خطأ: {error}</p>
        ) : majors.length === 0 ? (
          <p className={styles.emptyListMessage}>لا توجد برامج لعرضها.</p>
        ) : (
          <ul className={styles.itemList}>
            {majors.map(major => (
              <li
                key={major.id}
                className={`${styles.item} ${selectedMajorVisual?.id === major.id ? styles.activeItem : ''}`}
                onClick={() => handleSelectMajor(major)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && handleSelectMajor(major)}
              >
                {major.name_ar}
              </li>
            ))}
          </ul>
        )}
      </div>


    </div>
  );
};

export default MajorsList;