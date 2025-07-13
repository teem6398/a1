'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '../../../../lib/translation-context';
import styles from './AlumniList.module.css';
import translations from './translations.json';

interface AlumniData {
  id: number;
  name: string;
  graduation_year: number;
  major_name: string;
  college_name: string;
  current_position: string;
  company_name: string;
  image?: string;
  summary: string;
  views: number;
  published_at?: string;
}

interface AlumniListProps {
  majorId?: number;
  collegeId?: number;
}

export default function AlumniList({ majorId, collegeId }: AlumniListProps) {
  const { language } = useTranslation();
  const [stories, setStories] = useState<AlumniData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const perPage = 12;

  // الحصول على الترجمات من ملف JSON
  const t = (key: string): string => {
    try {
      const lang = language as 'ar' | 'en';
      
      // التحقق من وجود الترجمات
      if (!translations || !translations[lang]) {
        console.warn(`Translation object or language '${lang}' not found`);
        return key;
      }
      
      // التحقق من وجود المفتاح في كائن الترجمات
      if (key in translations[lang]) {
        const value = translations[lang][key as keyof (typeof translations)['ar' | 'en']];
        return typeof value === 'string' ? value : key;
      }
      
      return key;
    } catch (error) {
      console.error('Error in translation function:', error);
      return key;
    }
  };

  useEffect(() => {
    fetchStories();
  }, [language, majorId, collegeId]);

  const fetchStories = async (pageNum = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        lang: language,
        page: pageNum.toString(),
        limit: perPage.toString(),
      });

      if (majorId) params.append('majorId', majorId.toString());
      if (collegeId) params.append('collegeId', collegeId.toString());

      console.log('Fetching alumni stories with params:', params.toString());
      const response = await fetch(`/api/api_pages/alumni?${params}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        throw new Error(`${t('error')} ${response.status}`);
      }

      const result = await response.json();
      console.log('API Response:', result);
      
      if (!result.success) {
        throw new Error(result.error || t('error'));
      }

      const alumniData = result.data?.stories || [];
      const totalCount = result.data?.total || 0;
      
      if (pageNum === 1) {
        setStories(alumniData);
      } else {
        setStories(prev => [...prev, ...alumniData]);
      }
      
      setTotal(totalCount);
      setHasMore(alumniData.length === perPage);
      setError(null);
    } catch (err) {
      console.error('Error fetching alumni:', err);
      setError(err instanceof Error ? err.message : t('error'));
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchStories(nextPage);
  };

  const formatDate = (dateString: string) => {
    try {
      if (!dateString) return '';
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      
      return new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  if (loading && stories.length === 0) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner} />
        <p>{t('loading')}</p>
      </div>
    );
  }

  if (error && stories.length === 0) {
    return (
      <div className={styles.error}>
        <p>{t('error')} {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className={styles.retryButton}
        >
          {t('retry')}
        </button>
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className={styles.empty}>
        {t('empty')}
      </div>
    );
  }

  return (
    <div className={styles.alumniList}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {t('title')}
        </h1>
        <p className={styles.subtitle}>
          {`${total} ${t('subtitle')}`}
        </p>
      </div>

      <div className={styles.storiesGrid}>
        {stories.map((story) => (
          <div key={story.id} className={styles.storyCard}>
            <div className={styles.imageContainer}>
              <Image
                src={story.image || '/default-alumni.jpg'}
                alt={story.name}
                width={300}
                height={300}
                className={styles.image}
              />
            </div>
            <div className={styles.content}>
              <h3 className={styles.name}>{story.name}</h3>
              <div className={styles.info}>
                <p className={styles.position}>{story.current_position}</p>
                <p className={styles.company}>{story.company_name}</p>
              </div>
              <div className={styles.education}>
                <p className={styles.college}>{story.college_name}</p>
                <p className={styles.major}>{story.major_name}</p>
                <p className={styles.year}>
                  {t('classOf')} {story.graduation_year}
                </p>
              </div>
              <p className={styles.summary}>{story.summary}</p>
              <div className={styles.storyMetadata}>
                {story.published_at && (
                  <span className={styles.publishDate}>
                    {formatDate(story.published_at)}
                  </span>
                )}
                <span className={styles.viewCount}>
                  {story.views} {t('views')}
                </span>
              </div>
              <Link
                href={`/AlumniStories/${story.id}`}
                className={styles.readMore}
              >
                {t('readMore')}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className={styles.loadMoreContainer}>
          <button
            onClick={loadMore}
            disabled={loading}
            className={styles.loadMoreButton}
          >
            {loading ? t('loading') : t('loadMore')}
          </button>
        </div>
      )}
    </div>
  );
} 