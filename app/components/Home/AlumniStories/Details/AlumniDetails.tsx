'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from '../../../../lib/translation-context';
import { FaLinkedin, FaTwitter, FaEnvelope, FaCalendarAlt, FaEye } from 'react-icons/fa';
import styles from './AlumniDetails.module.css';

interface Achievement {
  id: number;
  achievement: string;
  year?: number;
}

interface GalleryImage {
  id: number;
  image_path: string;
  caption?: string;
}

interface AlumniData {
  id: number;
  name: string;
  graduation_year: number;
  major_name: string;
  college_name: string;
  current_position: string;
  company_name: string;
  company_website?: string;
  image?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  summary: string;
  story: string;
  views: number;
  slug: string;
  published_at?: string;
  achievements: Achievement[];
  gallery: GalleryImage[];
}

interface AlumniDetailsProps {
  slug: string;
}

export default function AlumniDetails({ slug }: AlumniDetailsProps) {
  const { language } = useTranslation();
  const [alumniData, setAlumniData] = useState<AlumniData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlumniDetails = async () => {
      try {
        const response = await fetch(`/api/api_pages/alumni?id=${slug}&lang=${language}`);
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error:', response.status, errorText);
          throw new Error('Failed to fetch alumni details');
        }
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch alumni details');
        }
        setAlumniData(data.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAlumniDetails();
  }, [slug, language]);

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

  if (loading) {
    return (
      <div className={styles.loading}>
        {language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
      </div>
    );
  }

  if (error || !alumniData) {
    return (
      <div className={styles.error}>
        {language === 'ar' ? 'حدث خطأ في تحميل البيانات' : 'Error loading data'}
      </div>
    );
  }

  return (
    <article className={styles.alumniDetails}>
      <div className={styles.header}>
        <div className={styles.imageContainer}>
          <Image
            src={alumniData.image || '/default-alumni.jpg'}
            alt={alumniData.name}
            width={400}
            height={400}
            className={styles.profileImage}
          />
        </div>
        <div className={styles.profileInfo}>
          <h1 className={styles.name}>{alumniData.name}</h1>
          <div className={styles.currentInfo}>
            <p className={styles.position}>{alumniData.current_position}</p>
            {alumniData.company_name && (
              <p className={styles.company}>
                {alumniData.company_website ? (
                  <a href={alumniData.company_website} target="_blank" rel="noopener noreferrer">
                    {alumniData.company_name}
                  </a>
                ) : (
                  alumniData.company_name
                )}
              </p>
            )}
          </div>
          <div className={styles.education}>
            <p className={styles.college}>{alumniData.college_name}</p>
            <p className={styles.major}>{alumniData.major_name}</p>
            <p className={styles.year}>
              {language === 'ar' ? 'دفعة' : 'Class of'} {alumniData.graduation_year}
            </p>
          </div>
          <div className={styles.socialLinks}>
            {alumniData.linkedin && (
              <a href={alumniData.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className={styles.socialIcon} />
              </a>
            )}
            {alumniData.twitter && (
              <a href={alumniData.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter className={styles.socialIcon} />
              </a>
            )}
            {alumniData.email && (
              <a href={`mailto:${alumniData.email}`}>
                <FaEnvelope className={styles.socialIcon} />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className={styles.story}>
        <div className={styles.storyMetadata}>
          {alumniData.published_at && (
            <div className={styles.metadataItem}>
              <FaCalendarAlt className={styles.metadataIcon} />
              <span>{formatDate(alumniData.published_at)}</span>
            </div>
          )}
          <div className={styles.metadataItem}>
            <FaEye className={styles.metadataIcon} />
            <span>{alumniData.views} {language === 'ar' ? 'مشاهدة' : 'views'}</span>
          </div>
        </div>

        <div className={styles.storyContent}>
          <p className={styles.summary}>{alumniData.summary}</p>
          <div className={styles.fullStory}>{alumniData.story}</div>
        </div>
      </div>

      {alumniData.achievements && alumniData.achievements.length > 0 && (
        <div className={styles.achievements}>
          <h2>{language === 'ar' ? 'الإنجازات' : 'Achievements'}</h2>
          <div className={styles.achievementsList}>
            {alumniData.achievements.map((achievement) => (
              <div key={achievement.id} className={styles.achievementItem}>
                <p className={styles.achievementText}>{achievement.achievement}</p>
                {achievement.year && (
                  <span className={styles.achievementYear}>{achievement.year}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {alumniData.gallery && alumniData.gallery.length > 0 && (
        <div className={styles.gallery}>
          <h2>{language === 'ar' ? 'معرض الصور' : 'Photo Gallery'}</h2>
          <div className={styles.galleryGrid}>
            {alumniData.gallery.map((image) => (
              <div key={image.id} className={styles.galleryItem}>
                <Image
                  src={image.image_path}
                  alt={image.caption || alumniData.name}
                  width={300}
                  height={300}
                  className={styles.galleryImage}
                />
                {image.caption && (
                  <p className={styles.imageCaption}>{image.caption}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
