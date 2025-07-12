'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import StudentProfile from '../../components/Student/StudentProfile';
import styles from '../../components/Student/Student.module.css';

export default function StudentProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  
  useEffect(() => {
    // التحقق من وجود معرف الطالب في localStorage
    const currentStudentId = localStorage.getItem('currentStudentId');
    const userRole = localStorage.getItem('userRole');
    
    // إذا كان المستخدم مسؤولاً أو هو نفس الطالب، فهو مصرح له بالوصول
    if (userRole === 'admin' || (currentStudentId && currentStudentId === params.id)) {
      setAuthorized(true);
    } else {
      // إذا لم يكن مصرحاً له، قم بتوجيهه إلى صفحة تسجيل الدخول
      router.push('/login');
    }
    
    setLoading(false);
  }, [params.id, router]);
  
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>جاري التحميل...</p>
      </div>
    );
  }
  
  if (!authorized) {
    return (
      <div className={styles.unauthorizedContainer}>
        <h1>غير مصرح بالوصول</h1>
        <p>ليس لديك صلاحية لعرض هذه الصفحة.</p>
      </div>
    );
  }
  
  return (
    <div className={styles.pageContainer}>
      <StudentProfile studentId={params.id as string} />
    </div>
  );
}
