'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './activity.module.css';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

interface Activity {
  id: number;
  title: string;
  title_ar?: string;
  title_en?: string;
  slug: string;
  start_date: string;
  featured_image?: string;
  category_id?: number;
}

interface RelatedActivitiesProps {
  currentActivityId: number;
  categoryId?: number;
  lang?: string;
}

export const RelatedActivities = ({ currentActivityId, categoryId, lang = 'ar' }: RelatedActivitiesProps) => {
  const [relatedActivities, setRelatedActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchRelatedActivities = async () => {
      try {
        setLoading(true);
        
        // Fetch activities from the same category
        const categoryFilter = categoryId ? `&category=${categoryId}` : '';
        const response = await fetch(`/api/api_pages/activities?limit=3&lang=${lang}${categoryFilter}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch related activities');
        }
        
        const data = await response.json();
        
        if (data.success && data.data) {
          // Filter out the current activity and limit to 2 related activities
          const filtered = data.data
            .filter((activity: Activity) => activity.id !== currentActivityId)
            .slice(0, 2);
          
          setRelatedActivities(filtered);
        }
      } catch (error) {
        console.error('Error fetching related activities:', error);
        // Use demo data if API fails
        setRelatedActivities(getDemoActivities());
      } finally {
        setLoading(false);
      }
    };
    
    fetchRelatedActivities();
  }, [currentActivityId, categoryId, lang]);
  
  // Demo activities for fallback
  const getDemoActivities = (): Activity[] => {
    return [
      {
        id: 101,
        title: lang === 'en' ? 'Sports Day' : 'اليوم الرياضي',
        title_ar: 'اليوم الرياضي',
        title_en: 'Sports Day',
        slug: 'sports-day',
        start_date: '2023-10-05T09:00:00',
        featured_image: '/image/activities/activity3.jpg'
      },
      {
        id: 102,
        title: lang === 'en' ? 'Professional Development Workshop' : 'ورشة عمل التطوير المهني',
        title_ar: 'ورشة عمل التطوير المهني',
        title_en: 'Professional Development Workshop',
        slug: 'professional-development-workshop',
        start_date: '2023-09-10T09:00:00',
        featured_image: '/image/activities/activity4.jpg'
      }
    ];
  };
  
  // Format date based on language
  const formatActivityDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'PP', {
        locale: lang === 'ar' ? ar : enUS
      });
    } catch (error) {
      return new Date(dateString).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US');
    }
  };
  
  // Get localized text based on language
  const getLocalizedText = (arText?: string, enText?: string): string => {
    if (lang === 'en' && enText) {
      return enText;
    }
    return arText || '';
  };
  
  if (relatedActivities.length === 0) {
    return null;
  }
  
  return (
    <div className={styles.relatedActivitiesSection}>
      <h3 className={styles.sectionTitle}>
        {lang === 'en' ? 'Related Activities' : 'أنشطة مشابهة'}
      </h3>
      <div className={styles.relatedActivitiesGrid}>
        {relatedActivities.map((activity) => {
          const title = getLocalizedText(activity.title_ar || activity.title, activity.title_en);
          
          return (
            <Link href={`/activities/${activity.slug || activity.id}`} className={styles.relatedActivity} key={activity.id}>
              <div className={styles.relatedActivityImage}>
                <Image 
                  src={activity.featured_image || '/image/1.jpg'} 
                  alt={title} 
                  width={80} 
                  height={60} 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/image/1.jpg';
                  }}
                />
              </div>
              <div className={styles.relatedActivityInfo}>
                <h4 className={styles.relatedActivityTitle}>{title}</h4>
                <span className={styles.relatedActivityDate}>
                  {formatActivityDate(activity.start_date)}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}; 