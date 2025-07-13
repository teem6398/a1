'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useTranslation } from '../../lib/translation-context';
import styles from './page.module.css';
import translations from './translations.json';

interface Achievement {
  id: number;
  achievement: string;
  year: number;
  sort_order: number;
}

interface GalleryImage {
  id: number;
  image_path: string;
  caption: string;
  sort_order: number;
}

interface AlumniData {
  id: number;
  name: string;
  graduation_year: number;
  current_position: string;
  image: string | null;
  linkedin: string | null;
  twitter: string | null;
  email: string | null;
  major_name: string;
  company_name: string;
  college_name: string;
  summary: string;
  story: string;
  achievements: Achievement[];
  gallery: GalleryImage[];
}

interface APIResponse {
  success: boolean;
  data: AlumniData;
  error?: string;
}

export default function AlumniDetailsPage() {
  const { id } = useParams();
  const { language } = useTranslation();
  const [alumni, setAlumni] = useState<AlumniData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    const fetchAlumniDetails = async () => {
      try {
        setLoading(true);
        console.log('Fetching alumni details for ID:', id);
        const response = await fetch(`/api/api_pages/alumni?id=${id}&lang=${language}`);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error:', response.status, errorText);
          throw new Error(`${t('error')} ${response.status}`);
        }

        const result: APIResponse = await response.json();
        console.log('API Response:', result);
        
        if (!result.success) {
          throw new Error(result.error || t('error'));
        }

        setAlumni(result.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching alumni details:', err);
        setError(err instanceof Error ? err.message : t('error'));
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAlumniDetails();
    }
  }, [id, language]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner} />
        <p>{t('loading')}</p>
      </div>
    );
  }

  if (error || !alumni) {
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.profileImage}>
          <Image
            src={alumni.image || '/default-alumni.jpg'}
            alt={alumni.name}
            width={300}
            height={300}
            className={styles.image}
          />
        </div>
        <div className={styles.profileInfo}>
          <h1 className={styles.name}>{alumni.name}</h1>
          <p className={styles.position}>
            <span className={styles.label}>{t('position')}: </span>
            {alumni.current_position}
          </p>
          <p className={styles.company}>
            <span className={styles.label}>{t('company')}: </span>
            {alumni.company_name}
          </p>
          <div className={styles.education}>
            <h3>{t('education')}</h3>
            <p>
              <span className={styles.label}>{t('college')}: </span>
              {alumni.college_name}
            </p>
            <p>
              <span className={styles.label}>{t('major')}: </span>
              {alumni.major_name}
            </p>
            <p>{t('classOf')} {alumni.graduation_year}</p>
          </div>
          <div className={styles.socialLinks}>
            {alumni.linkedin && (
              <a href={alumni.linkedin} target="_blank" rel="noopener noreferrer">
                <Image src="/linkedin.svg" alt="LinkedIn" width={24} height={24} />
              </a>
            )}
            {alumni.twitter && (
              <a href={alumni.twitter} target="_blank" rel="noopener noreferrer">
                <Image src="/twitter.svg" alt="Twitter" width={24} height={24} />
              </a>
            )}
            {alumni.email && (
              <a href={`mailto:${alumni.email}`}>
                <Image src="/email.svg" alt="Email" width={24} height={24} />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{t('summary')}</h2>
          <p>{alumni.summary}</p>
        </div>

        <div className={styles.story}>
          <h2>{t('fullStory')}</h2>
          <div className={styles.storyContent}>
            {alumni.story.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {alumni.achievements && alumni.achievements.length > 0 && (
          <div className={styles.achievements}>
            <h2>{t('achievements')}</h2>
            <div className={styles.achievementsList}>
              {alumni.achievements
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((achievement) => (
                  <div key={achievement.id} className={styles.achievementItem}>
                    <span className={styles.achievementYear}>{achievement.year}</span>
                    <p className={styles.achievementText}>{achievement.achievement}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {alumni.gallery && alumni.gallery.length > 0 && (
          <div className={styles.gallery}>
            <h2>{t('photoGallery')}</h2>
            <div className={styles.galleryGrid}>
              {alumni.gallery
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((image) => (
                  <div key={image.id} className={styles.galleryItem}>
                    <Image
                      src={image.image_path}
                      alt={image.caption}
                      width={300}
                      height={200}
                      className={styles.galleryImage}
                    />
                    <p className={styles.imageCaption}>{image.caption}</p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 