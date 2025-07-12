'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from '../../lib/translation-context';
import styles from './course.module.css';

interface Course {
  id: number;
  name: string;
  description: string;
  semester: number;
  is_elective: boolean;
  content?: string;
  objectives?: string;
  prerequisites?: string;
  assessment_methods?: string;
  teaching_methods?: string;
  resources?: string;
}

export default function CoursePage() {
  const { t, language } = useTranslation();
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const courseId = params?.id as string;
  const collegeId = searchParams.get('college_id');
  const majorId = searchParams.get('major_id');
  const lang = language || 'ar';

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // يمكن تعديل هذا المسار حسب هيكل API الخاص بك
        const response = await fetch(`/api/api_pages/courses/${courseId}?college_id=${collegeId}&major_id=${majorId}&lang=${lang}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch course data');
        }
        
        const data = await response.json();
        setCourse(data);
      } catch (err: any) {
        console.error('Error fetching course data:', err);
        // في حالة عدم وجود API حقيقي، سنقوم بإنشاء بيانات وهمية للعرض
        setCourse({
          id: parseInt(courseId),
          name: 'اسم المقرر الدراسي',
          description: 'وصف المقرر الدراسي التفصيلي. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة.',
          semester: 3,
          is_elective: false,
          content: `
            <h3>محتوى المقرر</h3>
            <ul>
              <li>الوحدة الأولى: مقدمة في المقرر</li>
              <li>الوحدة الثانية: المفاهيم الأساسية</li>
              <li>الوحدة الثالثة: التطبيقات العملية</li>
              <li>الوحدة الرابعة: دراسات متقدمة</li>
            </ul>
          `,
          objectives: `
            <h3>أهداف المقرر</h3>
            <ul>
              <li>فهم المفاهيم الأساسية في المجال</li>
              <li>تطوير المهارات العملية</li>
              <li>القدرة على تحليل وحل المشكلات</li>
              <li>تطبيق المعرفة في مشاريع واقعية</li>
            </ul>
          `,
          prerequisites: `
            <h3>المتطلبات السابقة</h3>
            <ul>
              <li>مقرر المدخل إلى التخصص</li>
              <li>مقرر أساسيات البرمجة</li>
            </ul>
          `,
          assessment_methods: `
            <h3>طرق التقييم</h3>
            <ul>
              <li>اختبارات دورية (30%)</li>
              <li>مشروع عملي (30%)</li>
              <li>اختبار نهائي (40%)</li>
            </ul>
          `,
          teaching_methods: `
            <h3>طرق التدريس</h3>
            <ul>
              <li>محاضرات نظرية</li>
              <li>تدريبات عملية</li>
              <li>مناقشات جماعية</li>
              <li>مشاريع تطبيقية</li>
            </ul>
          `,
          resources: `
            <h3>المراجع والمصادر</h3>
            <ul>
              <li>الكتاب الأساسي للمقرر</li>
              <li>مراجع إضافية</li>
              <li>مواقع إلكترونية متخصصة</li>
              <li>مقالات علمية حديثة</li>
            </ul>
          `
        });
        setError('لا يمكن الوصول إلى بيانات المقرر من الخادم. يتم عرض بيانات افتراضية.');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId, collegeId, majorId, lang]);

  const handleGoBack = () => {
    if (majorId && collegeId) {
      router.push(`/colleges/${collegeId}/majors/${majorId}`);
    } else {
      router.back();
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}></div>
        <p>{t('loading', 'جاري التحميل...')}</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className={styles.errorContainer}>
        <h2>{t('courseNotFound', 'لم يتم العثور على المقرر')}</h2>
        <button onClick={handleGoBack} className={styles.backButton}>
          {t('goBack', 'الرجوع')}
        </button>
      </div>
    );
  }

  return (
    <div className={styles.courseContainer}>
      <button onClick={handleGoBack} className={styles.backLink}>
        <span className={styles.backIcon}>←</span>
        {t('backToMajor', 'العودة إلى صفحة التخصص')}
      </button>

      <div className={styles.courseHeader}>
        <div className={styles.courseIconLarge}>
          <span>📚</span>
        </div>
        <div className={styles.courseHeaderContent}>
          <h1>{course.name}</h1>
          <div className={styles.courseMeta}>
            {course.semester && (
              <span className={styles.semesterBadge}>
                {t('semester', 'الفصل الدراسي')}: {course.semester}
              </span>
            )}
            {course.is_elective && (
              <span className={styles.electiveBadge}>{t('elective', 'اختياري')}</span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.courseDescription}>
        <h2>{t('courseDescription', 'وصف المقرر')}</h2>
        <p>{course.description}</p>
      </div>

      {error && (
        <div className={styles.warningMessage}>
          <p>{error}</p>
        </div>
      )}

      <div className={styles.courseDetails}>
        {course.objectives && (
          <div className={styles.detailSection}>
            <div dangerouslySetInnerHTML={{ __html: course.objectives }} />
          </div>
        )}

        {course.content && (
          <div className={styles.detailSection}>
            <div dangerouslySetInnerHTML={{ __html: course.content }} />
          </div>
        )}
        
        {course.prerequisites && (
          <div className={styles.detailSection}>
            <div dangerouslySetInnerHTML={{ __html: course.prerequisites }} />
          </div>
        )}
        
        {course.teaching_methods && (
          <div className={styles.detailSection}>
            <div dangerouslySetInnerHTML={{ __html: course.teaching_methods }} />
          </div>
        )}
        
        {course.assessment_methods && (
          <div className={styles.detailSection}>
            <div dangerouslySetInnerHTML={{ __html: course.assessment_methods }} />
          </div>
        )}
        
        {course.resources && (
          <div className={styles.detailSection}>
            <div dangerouslySetInnerHTML={{ __html: course.resources }} />
          </div>
        )}
      </div>
    </div>
  );
} 