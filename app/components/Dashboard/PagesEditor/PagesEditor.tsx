'use client';

import React, { useState } from 'react';
import styles from './PagesEditor.module.css';
import { FaUniversity, FaGraduationCap, FaNewspaper, FaInfoCircle, FaBuilding, FaBook } from 'react-icons/fa';
import AboutUniversityEditor from './AboutUniversityEditor/AboutUniversityEditor';
import CollegesEditor from '@/components/Dashboard/PagesEditor/CollegesEditor/CollegesEditor';
import MajorsList from './MajorsEditor/Majors'; // Component to display list of majors
import MajorsEditor from './MajorsEditor/MajorsEditor'; // Editor for a single major

interface PagesEditorProps {}



const PagesEditor: React.FC<PagesEditorProps> = () => {
  const [editingMajorId, setEditingMajorId] = useState<number | null>(null);

  // Handler for successful major save
  const handleMajorSaveSuccess = (savedMajorData: any) => {
    console.log('Major saved successfully:', savedMajorData);
    setEditingMajorId(null); // Close the editor and return to the list
    // Optionally, trigger a refresh of the majors list if needed
  };

  // Handler for canceling major edit
  const handleMajorEditCancel = () => {
    setEditingMajorId(null); // Close the editor
  };
  const [activeTab, setActiveTab] = useState('colleges');
  
  const renderContent = () => {
    switch (activeTab) {
     
      case 'colleges':
        return <CollegesEditor />;
        case 'aboutUniversity':
            return <AboutUniversityEditor />;
      case 'programs':
        return (
          <div>
            <MajorsList onSelectMajor={setEditingMajorId} selectedMajorId={editingMajorId} />
            {editingMajorId !== null && (
              <div className={styles.editorContentWrapper}> {/* Optional: Add a wrapper for styling if needed */}
                <MajorsEditor majorId={editingMajorId} onSaveSuccess={handleMajorSaveSuccess} onCancel={handleMajorEditCancel} />
              </div>
            )}
          </div>
        );
      case 'studentLife':
        return <div className={styles.comingSoon}>قسم الحياة الطلابية - قريباً</div>;
      case 'research':
        return <div className={styles.comingSoon}>قسم البحث العلمي - قريباً</div>;
      case 'admission':
        return <div className={styles.comingSoon}>قسم القبول والتسجيل - قريباً</div>;
      default:
        return <AboutUniversityEditor />;
    }
  };
  
  return (
    <div className={styles.pagesEditorContainer}>
      <div className={styles.editorHeader}>
        <h1 className={styles.editorTitle}>
          <FaUniversity /> إدارة صفحات الموقع
        </h1>
      </div>
      
      <div className={styles.pagesTabs}>
        
        
        <button 
          className={`${styles.pagesTab} ${activeTab === 'colleges' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('colleges')}
        >
          <span className={styles.tabIcon}><FaBuilding /></span>
          الكليات
        </button>
        <button 
          className={`${styles.pagesTab} ${activeTab === 'aboutUniversity' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('aboutUniversity')}
        >
          <span className={styles.tabIcon}><FaInfoCircle /></span>
          عن الجامعة
        </button>
        <button 
          className={`${styles.pagesTab} ${activeTab === 'programs' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('programs')}
        >
          <span className={styles.tabIcon}><FaBook /></span>
          البرامج الأكاديمية
        </button>
        
        <button 
          className={`${styles.pagesTab} ${activeTab === 'studentLife' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('studentLife')}
        >
          <span className={styles.tabIcon}><FaGraduationCap /></span>
          الحياة الطلابية
        </button>
        
        <button 
          className={`${styles.pagesTab} ${activeTab === 'research' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('research')}
        >
          <span className={styles.tabIcon}><FaNewspaper /></span>
          البحث العلمي
        </button>
        
        <button 
          className={`${styles.pagesTab} ${activeTab === 'admission' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('admission')}
        >
          <span className={styles.tabIcon}><FaGraduationCap /></span>
          القبول والتسجيل
        </button>
      </div>
      
      <div className={styles.pagesContent}>
        {renderContent()}
      </div>
    </div>
  );
};

export default PagesEditor;