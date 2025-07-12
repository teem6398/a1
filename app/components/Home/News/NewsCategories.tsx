'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import styles from './NewsCategories.module.css';
import { useTranslation } from '../../../lib/translation-context';

// نماذج البيانات
interface NewsCategory {
  id: number;
  name: string;
  name_en?: string;
  slug: string;
  description?: string;
  description_en?: string;
  icon_url?: string;
  news_count: number;
}

const NewsCategories = () => {
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { language, t } = useTranslation();

  useEffect(() => {
    fetchCategories();
  }, [language]);

  async function fetchCategories() {
    setLoading(true);
    try {
      const response = await fetch(`/api/api_pages/news/categories?lang=${language}`);
      
      if (!response.ok) {
        throw new Error(t('error_fetching_categories', 'خطأ في جلب التصنيفات'));
      }
      
      const data = await response.json();
      setCategories(data.data || []);
    } catch (error) {
      console.error('خطأ في جلب تصنيفات الأخبار:', error);
      setError(t('error_message', 'حدث خطأ أثناء جلب تصنيفات الأخبار. يرجى المحاولة مرة أخرى.'));
      toast.error(t('error_toast', 'حدث خطأ أثناء جلب تصنيفات الأخبار'));
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
        <p>{t('loading_categories', 'جاري تحميل التصنيفات...')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
        <button onClick={fetchCategories} className={styles.retryButton}>
          {t('retry', 'إعادة المحاولة')}
        </button>
      </div>
    );
  }

  return (
    <div className={styles.categoriesContainer}>
      <h2 className={styles.sectionTitle}>{t('news_categories', 'تصنيفات الأخبار')}</h2>
      
      <div className={styles.categoriesGrid}>
        {categories.map((category) => (
          <Link 
            href={`/news/category/${category.slug}`} 
            key={category.id}
            className={styles.categoryCard}
          >
            <div className={styles.categoryIcon}>
              {category.icon_url ? (
                <Image 
                  src={category.icon_url} 
                  alt={getLocalizedText(category.name, category.name_en)}
                  width={48}
                  height={48}
                />
              ) : (
                <div className={styles.defaultIcon}>📰</div>
              )}
            </div>
            <h3 className={styles.categoryName}>
              {getLocalizedText(category.name, category.name_en)}
            </h3>
            {(category.description || category.description_en) && (
              <p className={styles.categoryDescription}>
                {getLocalizedText(category.description || '', category.description_en)}
              </p>
            )}
            <div className={styles.newsCount}>
              {category.news_count} {t('news_count', 'خبر')}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewsCategories;
