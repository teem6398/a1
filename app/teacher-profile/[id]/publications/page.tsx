'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from '../../../lib/translation-context';
import PublicationsManager from '../../../components/Teacher/PublicationsManager';
import styles from '../teacherProfilePage.module.css';

export default function TeacherPublicationsPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const teacherId = params.id as string;
  const { language: lang } = useTranslation();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // التحقق من صلاحية المستخدم
  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        setIsLoading(true);
        
        // التحقق مما إذا كان المستخدم هو المعلم نفسه
        const storedTeacherId = localStorage.getItem('teacherId');
        const userRole = localStorage.getItem('userRole');
        
        // المستخدم مصرح له فقط إذا كان معلمًا ومعرف المعلم يطابق معرف الصفحة
        if (userRole === 'teacher' && storedTeacherId === teacherId) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
          // إعادة توجيه المستخدم إلى صفحة المعلم كضيف بعد فترة قصيرة
          setTimeout(() => {
            router.push(`/teacher-profile/${teacherId}?view=guest`);
          }, 2000);
        }
      } catch (error) {
        console.error('Error checking authorization:', error);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthorization();
  }, [teacherId, router]);
  
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}>
          {lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}
        </div>
      </div>
    );
  }
  
  if (!isAuthorized) {
    return (
      <div className={styles.unauthorizedContainer}>
        <div className={styles.unauthorized}>
          <h2>{lang === 'ar' ? 'غير مصرح' : 'Unauthorized'}</h2>
          <p>
            {lang === 'ar' 
              ? 'ليس لديك صلاحية للوصول إلى هذه الصفحة. سيتم توجيهك إلى صفحة المعلم.' 
              : 'You do not have permission to access this page. You will be redirected to the teacher profile.'
            }
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {lang === 'ar' ? 'إدارة المنشورات' : 'Publications Management'}
        </h1>
      </div>
      
      <div className={styles.content}>
        <PublicationsManager teacherId={teacherId} lang={lang} />
      </div>
    </div>
  );
} 