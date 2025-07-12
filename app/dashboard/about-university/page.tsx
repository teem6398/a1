'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa';
import styles from '../dashboard.module.css';

export default function AboutUniversityRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // تحديد قسم "صفحة عن الجامعة" كقسم نشط في localStorage
    localStorage.setItem('dashboardActiveSection', 'aboutUniversity');
    
    // توجيه المستخدم إلى صفحة لوحة التحكم الرئيسية
    router.push('/dashboard');
  }, [router]);

  // عرض شاشة تحميل أثناء إعادة التوجيه
  return (
    <div className={styles.loadingContainer}>
      <FaSpinner className={styles.loadingSpinner} />
      <p>جاري التوجيه إلى لوحة التحكم...</p>
    </div>
  );
} 