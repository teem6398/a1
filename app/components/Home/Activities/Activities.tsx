import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Activities.module.css';
import { formatDate } from '../../../lib/utils';
import { useTranslation } from '../../../lib/translation-context';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

// واجهات البيانات
interface ActivityMedia {
  id: number;
  activity_id: number;
  media_type: 'image' | 'video' | 'document';
  file_path: string;
  title_ar?: string;
  title_en?: string;
  is_featured: boolean;
  sort_order: number;
}

interface Activity {
  id: number;
  title: string;
  title_ar?: string;
  title_en?: string;
  slug: string;
  description: string;
  description_ar?: string;
  description_en?: string;
  location?: string;
  location_ar?: string;
  location_en?: string;
  start_date: string;
  end_date?: string;
  organizer?: string;
  organizer_ar?: string;
  organizer_en?: string;
  featured_image?: string;
  category_name?: string;
  category_name_ar?: string;
  category_name_en?: string;
  category_color?: string;
  featured_media?: string;
  media?: ActivityMedia[];
}

// مكون بطاقة النشاط المحسنة
const ActivityCard = ({ activity, index }: { activity: Activity; index: number }) => {
  const { language, t, isRTL } = useTranslation();
  
  // تحديد صورة العرض
  let displayImage = '/image/1.jpg';
  
  console.log('Activity Data:', {
    id: activity.id,
    featured_media: activity.featured_media,
    featured_image: activity.featured_image
  });
  
  if (activity.featured_media) {
    displayImage = activity.featured_media;
    console.log('Using featured_media:', displayImage);
  } else if (activity.featured_image) {
    displayImage = activity.featured_image;
    console.log('Using featured_image:', displayImage);
  }

  // التأكد من أن مسار الصورة يبدأ بـ "/"
  if (displayImage && typeof displayImage === 'string' && !displayImage.startsWith('/') && !displayImage.startsWith('http')) {
    displayImage = `/${displayImage}`;
  }

  console.log('Final Image Path:', displayImage);
  
  // تحديد تاريخ النشاط
  const startDate = new Date(activity.start_date);
  
  // تنسيق التاريخ حسب اللغة
  const formatActivityDate = (date: Date) => {
    try {
      return format(date, 'PPP', {
        locale: language === 'ar' ? ar : enUS
      });
    } catch (error) {
      return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US');
    }
  };
  
  // الحصول على النص المناسب حسب اللغة
  const getLocalizedText = (arText?: string, enText?: string): string => {
    if (language === 'en' && enText) {
      return enText;
    }
    return arText || '';
  };
  
  // تأخير تحميل البطاقات للحصول على تأثير متتالي
  const animationDelay = `${index * 0.1}s`;
  
  // الحصول على العناوين والأوصاف المترجمة
  const title = getLocalizedText(activity.title_ar || activity.title, activity.title_en);
  const description = getLocalizedText(activity.description_ar || activity.description, activity.description_en);
  const location = getLocalizedText(activity.location_ar || activity.location, activity.location_en);
  const organizer = getLocalizedText(activity.organizer_ar || activity.organizer, activity.organizer_en);
  const categoryName = getLocalizedText(activity.category_name_ar || activity.category_name, activity.category_name_en);

  return (
    <div 
      className={styles.activityCard} 
      style={{ '--index': index } as React.CSSProperties}
    >
      <div className={styles.imageContainer}>
        {categoryName && (
          <div 
            className={styles.categoryBadge}
            style={{ 
              background: activity.category_color || 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))'
            }}
          >
            {categoryName}
          </div>
        )}
        <div className={styles.imageWrapper}>
          <Image 
            src={displayImage}
            alt={title}
            width={400}
            height={250}
            className={styles.activityImage}
            priority={index < 2}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              console.log('Image load error, using fallback');
              target.src = '/image/1.jpg';
            }}
          />
        </div>
        
        {/* شريط التاريخ */}
        <div className={styles.dateStrip}>
          <div className={styles.dateDay}>{startDate.getDate()}</div>
          <div className={styles.dateMonth}>
            {new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : 'en-US', { month: 'short' }).format(startDate)}
          </div>
        </div>
      </div>
      
      <div className={styles.contentContainer}>
        <div className={styles.metaInfo}>
          {location && (
            <span className={styles.location}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              {location}
            </span>
          )}
          {organizer && (
            <span className={styles.organizer}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              {organizer}
            </span>
          )}
        </div>
        
        <h3 className={styles.activityTitle}>{title}</h3>
        
        <p className={styles.activityDescription}>{description}</p>
        
        <Link href={`/activities/${activity.slug || activity.id}`} className={styles.viewDetailsButton}>
          {t('view_details', 'عرض التفاصيل')}
          <svg className={styles.arrowIcon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5"></path>
            <polyline points={isRTL ? "12 19 5 12 12 5" : "12 5 19 12 12 19"}></polyline>
          </svg>
        </Link>
      </div>
    </div>
  );
};

// مكون قسم الأنشطة الرئيسي
const Activities = () => {
  const { language, t, isRTL } = useTranslation();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // جلب بيانات الأنشطة من واجهة برمجة التطبيقات
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/api_pages/activities?limit=4&lang=${language}`);
        
        if (!response.ok) {
          throw new Error(t('failed_fetch_activities', 'Failed to fetch activities'));
        }
        
        const data = await response.json();
        console.log('API Response:', data); // طباعة البيانات المستلمة من API
        
        if (data.success && data.data) {
          console.log('Activities Data:', data.data); // طباعة بيانات الأنشطة
          setActivities(data.data);
        } else {
          console.log('Using demo activities'); // طباعة عند استخدام البيانات التجريبية
          setActivities(language === 'en' ? demoActivitiesEn : demoActivitiesAr);
        }
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(t('error_loading_activities', 'حدث خطأ أثناء تحميل الأنشطة'));
        setActivities(language === 'en' ? demoActivitiesEn : demoActivitiesAr);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [language, t]);

  // بيانات تجريبية للأنشطة باللغة العربية
  const demoActivitiesAr: Activity[] = [
    {
      id: 1,
      title: 'المؤتمر العلمي الدولي',
      title_ar: 'المؤتمر العلمي الدولي',
      title_en: 'International Scientific Conference',
      slug: 'international-scientific-conference',
      description: 'مؤتمر علمي دولي يناقش أحدث التطورات في مجال الذكاء الاصطناعي وتطبيقاته في التعليم العالي',
      description_ar: 'مؤتمر علمي دولي يناقش أحدث التطورات في مجال الذكاء الاصطناعي وتطبيقاته في التعليم العالي',
      description_en: 'International scientific conference discussing the latest developments in artificial intelligence and its applications in higher education',
      location: 'قاعة المؤتمرات الكبرى',
      location_ar: 'قاعة المؤتمرات الكبرى',
      location_en: 'Grand Conference Hall',
      start_date: '2023-12-15T09:00:00',
      end_date: '2023-12-17T18:00:00',
      organizer: 'كلية علوم الحاسب والذكاء الاصطناعي',
      organizer_ar: 'كلية علوم الحاسب والذكاء الاصطناعي',
      organizer_en: 'College of Computer Science and Artificial Intelligence',
      featured_image: '/image/activities/1.jpg',
      category_name: 'مؤتمرات',
      category_name_ar: 'مؤتمرات',
      category_name_en: 'Conferences',
      category_color: '#4a00e0'
    },
    {
      id: 2,
      title: 'معرض مشاريع الطلاب',
      title_ar: 'معرض مشاريع الطلاب',
      title_en: 'Student Projects Exhibition',
      slug: 'student-projects-exhibition',
      description: 'معرض سنوي لعرض مشاريع طلاب كلية الهندسة والتكنولوجيا وتكريم المشاريع المتميزة',
      description_ar: 'معرض سنوي لعرض مشاريع طلاب كلية الهندسة والتكنولوجيا وتكريم المشاريع المتميزة',
      description_en: 'Annual exhibition showcasing projects by students of the Faculty of Engineering and Technology and honoring distinguished projects',
      location: 'مركز الابتكار',
      location_ar: 'مركز الابتكار',
      location_en: 'Innovation Center',
      start_date: '2023-11-20T09:00:00',
      end_date: '2023-11-22T17:00:00',
      organizer: 'كلية الهندسة والتكنولوجيا',
      organizer_ar: 'كلية الهندسة والتكنولوجيا',
      organizer_en: 'Faculty of Engineering and Technology',
      featured_image: '/image/activities/1.jpg',
      category_name: 'معارض',
      category_name_ar: 'معارض',
      category_name_en: 'Exhibitions',
      category_color: '#00a3e0'
    },
    {
      id: 3,
      title: 'اليوم الرياضي',
      title_ar: 'اليوم الرياضي',
      title_en: 'Sports Day',
      slug: 'sports-day',
      description: 'فعاليات رياضية متنوعة تشمل مسابقات وبطولات بين كليات الجامعة المختلفة',
      description_ar: 'فعاليات رياضية متنوعة تشمل مسابقات وبطولات بين كليات الجامعة المختلفة',
      description_en: 'Various sports activities including competitions and tournaments between different university colleges',
      location: 'الملعب الرئيسي',
      location_ar: 'الملعب الرئيسي',
      location_en: 'Main Stadium',
      start_date: '2023-10-05T09:00:00',
      end_date: '2023-10-05T17:00:00',
      organizer: 'عمادة شؤون الطلاب',
      organizer_ar: 'عمادة شؤون الطلاب',
      organizer_en: 'Deanship of Student Affairs',
      featured_image: '/image/activities/1.jpg',
      category_name: 'رياضة',
      category_name_ar: 'رياضة',
      category_name_en: 'Sports',
      category_color: '#00c853'
    },
    {
      id: 4,
      title: 'ورشة عمل التطوير المهني',
      title_ar: 'ورشة عمل التطوير المهني',
      title_en: 'Professional Development Workshop',
      slug: 'professional-development-workshop',
      description: 'ورشة عمل لتطوير المهارات المهنية للطلاب وإعدادهم لسوق العمل بالتعاون مع شركات رائدة',
      description_ar: 'ورشة عمل لتطوير المهارات المهنية للطلاب وإعدادهم لسوق العمل بالتعاون مع شركات رائدة',
      description_en: 'Workshop to develop students\' professional skills and prepare them for the job market in collaboration with leading companies',
      location: 'مركز التدريب',
      location_ar: 'مركز التدريب',
      location_en: 'Training Center',
      start_date: '2023-09-10T09:00:00',
      end_date: '2023-09-11T15:00:00',
      organizer: 'وحدة التطوير المهني',
      organizer_ar: 'وحدة التطوير المهني',
      organizer_en: 'Professional Development Unit',
      featured_image: '/image/activities/1.jpg',
      category_name: 'ورش عمل',
      category_name_ar: 'ورش عمل',
      category_name_en: 'Workshops',
      category_color: '#ff9800'
    }
  ];
  
  // بيانات تجريبية للأنشطة باللغة الإنجليزية
  const demoActivitiesEn: Activity[] = demoActivitiesAr.map(activity => ({
    ...activity,
    title: activity.title_en || activity.title,
    description: activity.description_en || activity.description,
    location: activity.location_en || activity.location,
    organizer: activity.organizer_en || activity.organizer,
    category_name: activity.category_name_en || activity.category_name
  }));

  // عرض حالة التحميل
  if (loading) {
    return (
      <section className={styles.activitiesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('university_activities', 'أنشطة الجامعة')}</h2>
            <p className={styles.sectionSubtitle}>
              {t('activities_subtitle', 'تعرف على أحدث الأنشطة والفعاليات في جامعة الريادة')}
            </p>
          </div>
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>{t('loading_activities', 'جاري تحميل الأنشطة...')}</p>
          </div>
        </div>
      </section>
    );
  }

  // عرض رسالة الخطأ
  if (error) {
    return (
      <section className={styles.activitiesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('university_activities', 'أنشطة الجامعة')}</h2>
            <p className={styles.sectionSubtitle}>
              {t('activities_subtitle', 'تعرف على أحدث الأنشطة والفعاليات في جامعة الريادة')}
            </p>
          </div>
          <div className={styles.errorContainer}>
            <p className={styles.errorMessage}>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.activitiesSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('university_activities', 'أنشطة الجامعة')}</h2>
          <p className={styles.sectionSubtitle}>
            {t('activities_subtitle', 'تعرف على أحدث الأنشطة والفعاليات في جامعة الريادة')}
          </p>
        </div>
        
        <div className={styles.activitiesGrid}>
          {activities.map((activity, index) => (
            <ActivityCard key={activity.id} activity={activity} index={index} />
          ))}
        </div>
        
        <div className={styles.viewAllWrapper}>
          <Link href="/activities" className={styles.viewAllButton}>
            {t('view_all_activities', 'عرض جميع الأنشطة')}
            <svg className={styles.buttonIcon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5"></path>
              <polyline points={isRTL ? "12 19 5 12 12 5" : "12 5 19 12 12 19"}></polyline>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Activities; 