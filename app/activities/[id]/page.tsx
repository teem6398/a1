import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Home/Navbar/Navbar';
import Footer from '../../components/Home/Footer/footers';
import styles from './activity.module.css';
import { formatDate, formatDateTime } from '../../lib/utils';
import { MediaGallery } from './MediaGallery';
import { RelatedActivities } from './RelatedActivities';
import { cookies } from 'next/headers';
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
  description_ar?: string;
  description_en?: string;
  is_featured: boolean;
  sort_order: number;
}

interface ActivityParticipant {
  id: number;
  activity_id: number;
  name_ar: string;
  name_en: string;
  role_ar?: string;
  role_en?: string;
  bio_ar?: string;
  bio_en?: string;
  image?: string;
  sort_order: number;
}

interface ActivitySchedule {
  id: number;
  activity_id: number;
  title_ar: string;
  title_en: string;
  description_ar?: string;
  description_en?: string;
  start_time: string;
  end_time?: string;
  location_ar?: string;
  location_en?: string;
  presenter_ar?: string;
  presenter_en?: string;
  sort_order: number;
}

interface Activity {
  id: number;
  title_ar: string;
  title_en: string;
  slug: string;
  description_ar: string;
  description_en: string;
  content_ar?: string;
  content_en?: string;
  location_ar?: string;
  location_en?: string;
  start_date: string;
  end_date?: string;
  category_id?: number;
  organizer_ar?: string;
  organizer_en?: string;
  featured_image?: string;
  status: string;
  contact_info?: string;
  category_name?: string;
  category_name_ar?: string;
  category_name_en?: string;
  category_color?: string;
  media?: ActivityMedia[];
  participants?: ActivityParticipant[];
  schedule?: ActivitySchedule[];
}

interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

// مكون جدول الأعمال
const ScheduleTimeline = ({ schedule, lang }: { schedule: ActivitySchedule[], lang: string }) => {
  // تنسيق التاريخ والوقت حسب اللغة
  const formatActivityDateTime = (date: Date) => {
    try {
      return format(date, 'PPp', {
        locale: lang === 'ar' ? ar : enUS
      });
    } catch (error) {
      return date.toLocaleString(lang === 'ar' ? 'ar-SA' : 'en-US');
    }
  };
  
  return (
    <div className={styles.scheduleTimeline}>
      <h3 className={styles.sectionTitle}>{lang === 'en' ? 'Schedule' : 'جدول الأعمال'}</h3>
      <div className={styles.timeline}>
        {schedule.map((item) => {
          const startTime = new Date(item.start_time);
          const endTime = item.end_time ? new Date(item.end_time) : null;
          
          const title = lang === 'en' ? item.title_en : item.title_ar;
          const description = lang === 'en' ? item.description_en : item.description_ar;
          const location = lang === 'en' ? item.location_en : item.location_ar;
          const presenter = lang === 'en' ? item.presenter_en : item.presenter_ar;
          
          return (
            <div key={item.id} className={styles.timelineItem}>
              <div className={styles.timelinePoint}></div>
              <div className={styles.timelineContent}>
                <div className={styles.timelineTime}>
                  {formatActivityDateTime(startTime)}
                  {endTime && ` - ${formatActivityDateTime(endTime)}`}
                </div>
                <h4 className={styles.timelineTitle}>{title}</h4>
                {description && (
                  <p className={styles.timelineDescription}>{description}</p>
                )}
                {location && (
                  <div className={styles.timelineLocation}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{location}</span>
                  </div>
                )}
                {presenter && (
                  <div className={styles.timelinePresenter}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>{presenter}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// مكون المشاركين
const ParticipantsList = ({ participants, lang }: { participants: ActivityParticipant[], lang: string }) => {
  return (
    <div className={styles.participantsSection}>
      <h3 className={styles.sectionTitle}>{lang === 'en' ? 'Participants' : 'المشاركون'}</h3>
      <div className={styles.participantsGrid}>
        {participants.map((participant) => {
          const name = lang === 'en' ? participant.name_en : participant.name_ar;
          const role = lang === 'en' ? participant.role_en : participant.role_ar;
          const bio = lang === 'en' ? participant.bio_en : participant.bio_ar;
          
          return (
            <div key={participant.id} className={styles.participantCard}>
              <div className={styles.participantImageContainer}>
                {participant.image ? (
                  <Image 
                    src={participant.image} 
                    alt={name} 
                    width={100} 
                    height={100} 
                    className={styles.participantImage}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/image/1.jpg';
                    }}
                  />
                ) : (
                  <div className={styles.participantPlaceholder}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                )}
              </div>
              <div className={styles.participantInfo}>
                <h4 className={styles.participantName}>{name}</h4>
                {role && (
                  <p className={styles.participantRole}>{role}</p>
                )}
                {bio && (
                  <p className={styles.participantBio}>{bio}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// دالة لجلب بيانات النشاط
async function getActivity(id: string, lang: string = 'ar'): Promise<Activity | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/api_pages/activities/${id}?lang=${lang}`, { 
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch activity');
    }
    
    const data = await res.json();
    
    if (data.success && data.data) {
      return data.data;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching activity:', error);
    return null;
  }
}

// الصفحة الرئيسية لتفاصيل النشاط
export default async function ActivityPage({ params, searchParams }: PageProps) {
  // Get language from cookie or query parameter
  const cookieStore = await cookies();
  const langCookie = cookieStore.get('NEXT_LOCALE');
  const lang = searchParams.lang as string || langCookie?.value || 'ar';
  
  const activity = await getActivity(params.id, lang);
  
  if (!activity) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <h2 className={styles.errorTitle}>
            {lang === 'en' ? 'Activity Not Found' : 'لم يتم العثور على النشاط'}
          </h2>
          <p className={styles.errorMessage}>
            {lang === 'en' ? 'The requested activity does not exist or has been deleted.' : 'النشاط المطلوب غير موجود أو تم حذفه.'}
          </p>
          <Link href="/activities" className={styles.backButton}>
            {lang === 'en' ? 'Back to Activities' : 'العودة إلى الأنشطة'}
          </Link>
        </div>
      </div>
    );
  }
  
  // استخدام بيانات تجريبية إذا لم تكن هناك وسائط
  const demoMedia: ActivityMedia[] = [
    {
      id: 1,
      activity_id: activity.id,
      media_type: 'image',
      file_path: activity.featured_image || '/image/1.jpg',
      title_ar: 'الصورة الرئيسية',
      title_en: 'Main Image',
      is_featured: true,
      sort_order: 1
    },
    {
      id: 2,
      activity_id: activity.id,
      media_type: 'image',
      file_path: '/image/activities/activity2.jpg',
      title_ar: 'صورة إضافية 1',
      title_en: 'Additional Image 1',
      is_featured: false,
      sort_order: 2
    },
    {
      id: 3,
      activity_id: activity.id,
      media_type: 'video',
      file_path: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      title_ar: 'فيديو تعريفي',
      title_en: 'Introduction Video',
      is_featured: false,
      sort_order: 3
    }
  ];
  
  // استخدام الوسائط الفعلية أو الوسائط التجريبية
  const mediaToDisplay = activity.media && activity.media.length > 0 ? activity.media : demoMedia;
  
  // تنسيق التاريخ
  const startDate = new Date(activity.start_date);
  const endDate = activity.end_date ? new Date(activity.end_date) : null;
  
  // تنسيق التاريخ حسب اللغة
  const formatActivityDate = (date: Date) => {
    try {
      return format(date, 'PPP', {
        locale: lang === 'ar' ? ar : enUS
      });
    } catch (error) {
      return date.toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US');
    }
  };
  
  // الحصول على النص المناسب حسب اللغة
  const title = lang === 'en' ? activity.title_en : activity.title_ar;
  const description = lang === 'en' ? activity.description_en : activity.description_ar;
  const content = lang === 'en' ? activity.content_en : activity.content_ar;
  const location = lang === 'en' ? activity.location_en : activity.location_ar;
  const organizer = lang === 'en' ? activity.organizer_en : activity.organizer_ar;
  const categoryName = lang === 'en' ? activity.category_name_en : activity.category_name_ar || activity.category_name;
  
  return (
    <div className={styles.container}>
      <div className={styles.activityHeader}>
        <div className={styles.breadcrumbs}>
          <Link href="/" className={styles.breadcrumbLink}>
            {lang === 'en' ? 'Home' : 'الرئيسية'}
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <Link href="/activities" className={styles.breadcrumbLink}>
            {lang === 'en' ? 'Activities' : 'الأنشطة'}
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{title}</span>
        </div>
        
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
        
        <h1 className={styles.activityTitle}>{title}</h1>
        
        <div className={styles.metaInfo}>
          <div className={styles.metaItem}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>
              {formatActivityDate(startDate)}
              {endDate && ` - ${formatActivityDate(endDate)}`}
            </span>
          </div>
          
          {location && (
            <div className={styles.metaItem}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{location}</span>
            </div>
          )}
          
          {organizer && (
            <div className={styles.metaItem}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>{organizer}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className={styles.mainContent}>
        {/* معرض الوسائط */}
        <MediaGallery media={mediaToDisplay} lang={lang} />
        
        {/* وصف النشاط */}
        <div className={styles.activityDescription}>
          <h3 className={styles.sectionTitle}>{lang === 'en' ? 'About the Activity' : 'عن النشاط'}</h3>
          <div 
            className={styles.contentHtml}
            dangerouslySetInnerHTML={{ __html: content || description }}
          />
        </div>
        
        {/* جدول الأعمال */}
        {activity.schedule && activity.schedule.length > 0 && (
          <ScheduleTimeline schedule={activity.schedule} lang={lang} />
        )}
        
        {/* المشاركون */}
        {activity.participants && activity.participants.length > 0 && (
          <ParticipantsList participants={activity.participants} lang={lang} />
        )}
      </div>
      
      {/* أنشطة ذات صلة */}
      <RelatedActivities currentActivityId={activity.id} categoryId={activity.category_id} lang={lang} />
      
      {/* زر العودة */}
      <div className={styles.backButtonContainer}>
        <Link href="/activities" className={styles.backButton}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5"></path>
            <polyline points={lang === 'ar' ? "12 19 5 12 12 5" : "12 5 19 12 12 19"}></polyline>
          </svg>
          {lang === 'en' ? 'Back to Activities' : 'العودة إلى الأنشطة'}
        </Link>
      </div>
    </div>
  );
} 