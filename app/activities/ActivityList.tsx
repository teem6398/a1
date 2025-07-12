'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './activities.module.css';
import { formatDate } from '../lib/utils';
import { useTranslation } from '../lib/translation-context';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

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

interface ActivityListProps {
  initialActivities: Activity[];
}

const ActivityCard = ({ activity, index }: { activity: Activity; index: number }) => {
  const { language, t, isRTL } = useTranslation();
  
  // Get localized text based on language
  const getLocalizedText = (arText?: string, enText?: string): string => {
    if (language === 'en' && enText) {
      return enText;
    }
    return arText || '';
  };
  
  // تحديد صورة العرض
  let displayImage = activity.featured_media || activity.featured_image || '/image/1.jpg';
  
  // التأكد من أن مسار الصورة يبدأ بـ "/"
  if (displayImage && typeof displayImage === 'string' && !displayImage.startsWith('/') && !displayImage.startsWith('http')) {
    displayImage = `/${displayImage}`;
  }
  
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
  
  // الحصول على العناوين والأوصاف المترجمة
  const title = getLocalizedText(activity.title_ar || activity.title, activity.title_en);
  const description = getLocalizedText(activity.description_ar || activity.description, activity.description_en);
  const location = getLocalizedText(activity.location_ar || activity.location, activity.location_en);
  const organizer = getLocalizedText(activity.organizer_ar || activity.organizer, activity.organizer_en);
  const categoryName = getLocalizedText(activity.category_name_ar || activity.category_name, activity.category_name_en);
  
  return (
    <Link href={`/activities/${activity.slug || activity.id}`} className={styles.activityCard} style={{ '--index': index } as React.CSSProperties}>
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
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/image/1.jpg';
            }}
          />
        </div>
        
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
        
        <div className={styles.viewDetailsButton}>
          {t('view_details', 'عرض التفاصيل')}
          <svg className={styles.arrowIcon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5"></path>
            <polyline points={isRTL ? "12 19 5 12 12 5" : "12 5 19 12 12 19"}></polyline>
          </svg>
        </div>
      </div>
    </Link>
  );
};

export const ActivityList = ({ initialActivities }: ActivityListProps) => {
  const { t } = useTranslation();
  
  return (
    <div className={styles.activitiesGrid}>
      {initialActivities.length > 0 ? (
        initialActivities.map((activity, index) => (
          <ActivityCard key={activity.id} activity={activity} index={index} />
        ))
      ) : (
        <div className={styles.noResults}>
          <h3>{t('no_matching_activities', 'لا توجد أنشطة مطابقة للبحث')}</h3>
          <p>{t('try_changing_filters', 'جرب تغيير معايير البحث أو التصنيف')}</p>
        </div>
      )}
    </div>
  );
}; 