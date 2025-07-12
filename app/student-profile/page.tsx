'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../components/Student/Student.module.css';

export default function StudentProfilePage() {
  const router = useRouter();
  
  useEffect(() => {
    // التحقق من وجود معرف الطالب في localStorage
    const currentStudentId = localStorage.getItem('currentStudentId');
    
    if (currentStudentId) {
      // توجيه المستخدم إلى صفحة الملف الشخصي الخاصة به
      router.push(`/student-profile/${currentStudentId}`);
    } else {
      // إذا لم يكن هناك معرف طالب، توجيه المستخدم إلى صفحة تسجيل الدخول
      router.push('/login');
    }
  }, [router]);

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}></div>
      <p>جاري التحميل...</p>
    </div>
  );
}