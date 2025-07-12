'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Admission.module.css';
import Navbar from '../Home/Navbar/Navbar';
import MajorsGrid from './MajorsGrid';
import HowToApply from './HowToApply/HowToApply';
import UniversityIntroVideo from './UniversityIntroVideo/UniversityIntroVideo';
import ApplicationForm from './ApplicationForm/ApplicationForm';
import Footer from '../Home/Footer/footers';
import { useTranslation } from '../../lib/translation-context';
import translations from './translations.json';

const Admission = () => {
  // استخدام سياق الترجمة
  const { language, isRTL } = useTranslation();
  
  // الحصول على الترجمات حسب اللغة المحددة
  const t = translations[language as keyof typeof translations];
  
  // حالة لتتبع ما إذا كان نموذج الالتحاق مرئيًا أم لا
  const [showApplicationForm, setShowApplicationForm] = useState<boolean>(false);
  
  // التمرير إلى قسم نموذج الالتحاق
  const scrollToApplicationForm = () => {
    setShowApplicationForm(true);
    setTimeout(() => {
      const formElement = document.getElementById('registration-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  return (
    <div className={styles.admissionPage}>
      {/* استدعاء مكون Navbar */}
      <Navbar />
      
      {/* قسم Hero */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t.admission.title}
          </motion.h1>
          <motion.p 
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.admission.description}
          </motion.p>
          <motion.div 
            className={styles.heroCta}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button 
              onClick={scrollToApplicationForm} 
              className={styles.primaryButton}
            >
              {t.applicationForm.submit}
            </button>
            <Link href="#admission-requirements" className={styles.secondaryButton}>
              {t.admission.requirements}
            </Link>
          </motion.div>
        </div>
        {/* هنا سيتم إضافة الصورة لاحقًا */}
        <div className={styles.heroImagePlaceholder}>
          {/* سيتم استبدال هذا بصورة حقيقية لاحقًا */}
          <div className={styles.placeholderText}>سيتم إضافة صورة هنا</div>
        </div>
      </section>
      
      {/* قسم الفيديو التعريفي عن الجامعة */}
      <UniversityIntroVideo />
      
      {/* قسم التخصصات وشروط القبول */}
      <MajorsGrid />
      
      {/* قسم خطوات التقديم */}
      <HowToApply />
      
      {/* قسم نموذج طلب الالتحاق - يظهر فقط عند الضغط على زر طلب الالتحاق */}
      {showApplicationForm && <ApplicationForm />}
      
      {/* يمكن إضافة أقسام أخرى لاحقًا */}
      <Footer />
    </div>
  );
};

export default Admission;
