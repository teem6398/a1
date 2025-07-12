'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import styles from './NewsAuthors.module.css';
import { useTranslation } from '../../../lib/translation-context';

// نماذج البيانات
interface NewsAuthor {
  id: number;
  name: string;
  name_en?: string;
  title?: string;
  title_en?: string;
  bio?: string;
  bio_en?: string;
  image_url?: string;
  articles_count: number;
}

const NewsAuthors = () => {
  const [authors, setAuthors] = useState<NewsAuthor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { language, t } = useTranslation();

  useEffect(() => {
    fetchAuthors();
  }, [language]);

  async function fetchAuthors() {
    setLoading(true);
    try {
      const response = await fetch(`/api/api_pages/news/authors?lang=${language}`);
      
      if (!response.ok) {
        throw new Error(t('error_fetching_authors', 'خطأ في جلب الكتّاب'));
      }
      
      const data = await response.json();
      setAuthors(data.data || []);
    } catch (error) {
      console.error('خطأ في جلب كتّاب الأخبار:', error);
      setError(t('error_message', 'حدث خطأ أثناء جلب كتّاب الأخبار. يرجى المحاولة مرة أخرى.'));
      toast.error(t('error_toast', 'حدث خطأ أثناء جلب كتّاب الأخبار'));
    } finally {
      setLoading(false);
    }
  }

  // الحصول على النص المناسب حسب اللغة
  const getLocalizedText = (arText: string, enText?: string): string => {
    if (language === 'en' && enText) {
      return enText;
    }
    return arText;
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>{t('loading_authors', 'جاري تحميل الكتّاب...')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
        <button onClick={fetchAuthors} className={styles.retryButton}>
          {t('retry', 'إعادة المحاولة')}
        </button>
      </div>
    );
  }

  return (
    <div className={styles.authorsContainer}>
      <h2 className={styles.sectionTitle}>{t('news_authors', 'كتّاب الأخبار')}</h2>
      
      <div className={styles.authorsGrid}>
        {authors.map((author) => (
          <Link 
            href={`/news/author/${author.id}`} 
            key={author.id}
            className={styles.authorCard}
          >
            <div className={styles.authorAvatar}>
              <Image 
                src={author.image_url || '/images/authors/default.jpg'} 
                alt={getLocalizedText(author.name, author.name_en)}
                width={80}
                height={80}
                className={styles.avatarImage}
              />
            </div>
            <h3 className={styles.authorName}>
              {getLocalizedText(author.name, author.name_en)}
            </h3>
            {(author.title || author.title_en) && (
              <p className={styles.authorTitle}>
                {getLocalizedText(author.title || '', author.title_en)}
              </p>
            )}
            {(author.bio || author.bio_en) && (
              <p className={styles.authorBio}>
                {getLocalizedText(author.bio || '', author.bio_en)}
              </p>
            )}
            <div className={styles.articlesCount}>
              {author.articles_count} {t('articles_count', 'مقال')}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewsAuthors;
