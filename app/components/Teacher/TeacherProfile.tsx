'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight, FaChalkboardTeacher, FaEdit, FaDownload } from 'react-icons/fa';
import styles from './Teacher.module.css';
import ThemeToggle from '../ThemeToggle';
import { useTheme } from '../../lib/theme-context';

// استيراد المكونات الفرعية
import ProfileSection from './ProfileSection/ProfileSection';
import CoursesSection from './CoursesSection/CoursesSection';
import PublicationsSection from './PublicationsSection/PublicationsSection';
import AdviceSection from './AdviceSection/AdviceSection';

// استيراد الواجهات من ملف الواجهات
import { Teacher, Course, Publication, TeacherAdvice } from './interfaces';

interface TeacherProfileProps {
  teacherId: string;
  isOwner?: boolean;
}

const TeacherProfile = ({ teacherId, isOwner = false }: TeacherProfileProps) => {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [advice, setAdvice] = useState<TeacherAdvice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('profile');
  const lang = 'ar';
  const { theme } = useTheme();

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        if (!teacherId) {
          setError('معرف المعلم غير متوفر');
          setLoading(false);
          return;
        }

        // استدعاء API لجلب بيانات المعلم
        const response = await fetch(`/api/api_academics/teachers?id=${teacherId}`);
        
        if (!response.ok) {
          throw new Error(`فشل في جلب البيانات: ${response.status}`);
        }
        
        const data = await response.json();
        
        // تعيين بيانات المعلم
        setTeacher(data);
        
        // جلب المنشورات من API
        try {
          const publicationsResponse = await fetch(`/api/api_academics/teacher/${teacherId}/publications`);
          if (publicationsResponse.ok) {
            const publicationsData = await publicationsResponse.json();
            setPublications(publicationsData);
          }
        } catch (pubError) {
          console.error('خطأ في جلب المنشورات:', pubError);
        }
        
        // جلب المواد الدراسية من API
        try {
          const coursesResponse = await fetch(`/api/api_academics/teacher/${teacherId}/courses`);
          if (coursesResponse.ok) {
            const coursesData = await coursesResponse.json();
            setCourses(coursesData);
          }
        } catch (coursesError) {
          console.error('خطأ في جلب المواد الدراسية:', coursesError);
        }
        
        // جلب النصائح والإرشادات من API
        try {
          const adviceResponse = await fetch(`/api/api_academics/teacher/${teacherId}/advice`);
          if (adviceResponse.ok) {
            const adviceData = await adviceResponse.json();
            setAdvice(adviceData);
          }
        } catch (adviceError) {
          console.error('خطأ في جلب النصائح والإرشادات:', adviceError);
        }
        
      } catch (err: any) {
        console.error('خطأ في جلب بيانات المعلم:', err);
        setError(err?.message || 'حدث خطأ غير متوقع أثناء جلب بيانات المعلم');
      } finally {
        setLoading(false);
      }
    };

    if (teacherId) {
        fetchTeacherData();
    } else {
        setError('معرف المعلم غير متوفر');
        setLoading(false);
    }
  }, [teacherId]);

  if (loading) {
    return <div className={styles.loading}>جاري تحميل البيانات...</div>;
  }

  if (error) {
    return <div className={styles.error}>حدث خطأ: {error}</div>;
  }

  if (!teacher && teacherId) {
    return <div className={styles.error}>لم يتم العثور على بيانات المعلم بالمعرف المقدم.</div>;
  }
  
  if (!teacherId) {
    return <div className={styles.error}>معرف المعلم مطلوب لعرض هذه الصفحة.</div>;
  }

  return (
    <div className={styles.container} data-theme={theme}>
      <div className={styles.topBar}>
        <Link href="/#" className={styles.homeButton}>
          <FaArrowRight />
          <span>الصفحة الرئيسية</span>
        </Link>
        <ThemeToggle className={styles.themeToggle} />
      </div>

      {/* يتم عرض الهيدر والأزرار فقط إذا تم تحميل بيانات المعلم بنجاح */}
      {teacher && (
        <>
          <div className={styles.teacherHero}>
            <div className={styles.heroImageContainer}>
              <Image
                src={teacher.photo_url || 'صور المعلم الثابته'}
                alt={teacher.name_ar || teacher.name_en || 'صورة الاستاذ'}
                width={200}
                height={200}
                className={styles.heroImage}
                priority
              />
            </div>
            <div className={styles.heroContent}>
              <h1 className={styles.heroName}>
                <FaChalkboardTeacher className={styles.heroIcon} />
                {teacher.name_ar}
              </h1>
              <p className={styles.heroTitle}>
                {teacher.academic_degree} - {teacher.department}
              </p>
              <p className={styles.heroCollege}>{teacher.college}</p>
            </div>
          </div>

          <div className={styles.navigation}>
            <button
              className={`${styles.navButton} ${activeSection === 'profile' ? styles.navButtonActive : ''}`}
              onClick={() => setActiveSection('profile')}
            >
              المعلومات الشخصية
            </button>
            <button
              className={`${styles.navButton} ${activeSection === 'courses' ? styles.navButtonActive : ''}`}
              onClick={() => setActiveSection('courses')}
            >
              المواد الدراسية
            </button>
            <button
              className={`${styles.navButton} ${activeSection === 'publications' ? styles.navButtonActive : ''}`}
              onClick={() => setActiveSection('publications')}
            >
              المنشورات
            </button>
            <button
              className={`${styles.navButton} ${activeSection === 'advice' ? styles.navButtonActive : ''}`}
              onClick={() => setActiveSection('advice')}
            >
              النصائح والإرشادات
            </button>
            {isOwner && (
              <Link 
                href={`/teacher-profile/${teacherId}/publications`} 
                className={`${styles.navButton} ${styles.manageButton}`}
              >
                <FaEdit className={styles.buttonIcon} />
                إدارة المنشورات
              </Link>
            )}
          </div>

          <div className={styles.content}>
            {activeSection === 'profile' && teacherId && <ProfileSection teacherId={teacherId} />}
            {activeSection === 'courses' && <CoursesSection courses={courses} teacherId={teacherId} />}
            {activeSection === 'publications' && <PublicationsSection publications={publications} teacherId={teacherId} isOwner={isOwner} />}
            {activeSection === 'advice' && <AdviceSection advice={advice} teacherId={teacherId} />}
          </div>

          {isOwner && (
            <div className={styles.teacherActions}>
              <Link href={`/teacher-profile/${teacherId}/publications`} className={styles.actionButton}>
                إدارة المنشورات
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TeacherProfile;
