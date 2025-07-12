'use client';

import { useState, useEffect } from 'react';
import styles from './HomeEditor.module.css';
import AboutEditor from './AboutEditor';
import FacultiesEditor from './FacultiesEditor';
import Footer from './FooterEditor';
import Hero from './HeroEditor';
import { FaInfoCircle, FaUniversity, FaFootballBall, FaImage, FaHome, FaEdit } from 'react-icons/fa';

const SectionHome = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [isLoading, setIsLoading] = useState(false);

  // إضافة تأثير عند تغيير التبويب النشط
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const tabs = [
    { id: 'hero', label: 'القسم الرئيسي', icon: <FaImage />, description: 'تعديل شرائح العرض الرئيسية' },
    { id: 'about', label: 'قسم عن الجامعة', icon: <FaInfoCircle />, description: 'تعديل معلومات ومميزات الجامعة' },
    { id: 'faculties', label: 'قسم الكليات', icon: <FaUniversity />, description: 'تعديل معلومات الكليات المعروضة' },
    { id: 'footer', label: 'تذييل الصفحة', icon: <FaFootballBall />, description: 'تعديل روابط وبيانات تذييل الصفحة' },
  ];

  return (
    <div className={styles.editorContainer}>
      <div className={styles.editorTitleWrapper}>
        <div className={styles.sectionIcon}><FaEdit /></div>
        <h2 className={styles.editorTitle}>إدارة الصفحة الرئيسية</h2>
      </div>
      <div className={styles.editorDescription}>قم بتعديل محتوى الصفحة الرئيسية من خلال الأقسام التالية</div>
      
      <div className={styles.sectionHomeTabs}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${styles.sectionHomeTab} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <div className={styles.sectionHomeTabIcon}>{tab.icon}</div>
            <div className={styles.sectionHomeTabLabel}>{tab.label}</div>
            <div className={styles.sectionHomeTabDesc}>{tab.description}</div>
          </div>
        ))}
      </div>

      <div className={styles.editorContent}>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>جاري تحميل المحتوى...</p>
          </div>
        ) : (
          <div className={styles.sectionHomeContent}>
            {activeTab === 'hero' && <Hero />}
            {activeTab === 'about' && <AboutEditor />}
            {activeTab === 'faculties' && <FacultiesEditor />}
            {activeTab === 'footer' && <Footer />}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionHome;