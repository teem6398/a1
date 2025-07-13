'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './AllNews.module.css';
import { useTranslation } from '../../../lib/translation-context';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

// نموذج بيانات الخبر
interface NewsItem {
  id: number;
  title: string;
  title_en?: string;
  subtitle?: string;
  subtitle_en?: string;
  summary: string;
  summary_en?: string;
  main_image_url: string;
  publish_date: string;
  category_name?: string;
  category_name_en?: string;
  category_id: number;
  slug: string;
  is_featured: boolean;
  is_active: boolean;
  views_count: number;
}

// نموذج بيانات الفئة
interface Category {
  id: number;
  name: string;
  name_en?: string;
  slug: string;
}

export default function AllNews() {
  const { language, t, isRTL } = useTranslation();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);

  // جلب فئات الأخبار
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`/api/api_pages/news/categories?lang=${language}`);
        
        if (!response.ok) {
          throw new Error(`${t('error_fetching_categories', 'خطأ في جلب الفئات')}: ${response.status}`);
        }
        
        const data = await response.json();
        // إضافة فئة "جميع الأخبار" للقائمة
        setCategories([
          { 
            id: 0, 
            name: language === 'ar' ? 'جميع الأخبار' : 'All News', 
            slug: 'all' 
          }, 
          ...(data.data || [])
        ]);
      } catch (error) {
        console.error('خطأ في جلب فئات الأخبار:', error);
        setCategories([
          { 
            id: 0, 
            name: language === 'ar' ? 'جميع الأخبار' : 'All News', 
            slug: 'all' 
          }
        ]);
      }
    }
    
    fetchCategories();
  }, [language, t]);

  useEffect(() => {
    // جلب الأخبار مع التصفية والترقيم
    async function fetchNews() {
      setLoading(true);
      try {
        // بناء URL للطلب مع معاملات التصفية
        let url = `/api/api_pages/news?limit=6&offset=${(currentPage - 1) * 6}&lang=${language}`;
        
        if (activeCategory !== 'all') {
          url += `&category=${activeCategory}`;
        }
        
        if (searchQuery) {
          url += `&search=${encodeURIComponent(searchQuery)}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`${t('error_fetching_news', 'خطأ في جلب الأخبار')}: ${response.status}`);
        }
        
        const data = await response.json();
        
        // استخدام البيانات من API الجديد
        if (data.data) {
          setNews(data.data);
          setFilteredNews(data.data);
          // حساب إجمالي الصفحات من البيانات الوصفية
          const totalItems = data.meta?.total || data.data.length;
          setTotalPages(Math.ceil(totalItems / 6));
        } else {
          setNews([]);
          setFilteredNews([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error('خطأ في جلب الأخبار:', error);
        setNews([]);
        setFilteredNews([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [currentPage, activeCategory, searchQuery, language, t]);

  // تصفية الأخبار حسب البحث
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredNews(news);
      setTotalPages(Math.ceil(news.length / 6));
      return;
    }

    const query = searchQuery.trim().toLowerCase();
    const filtered = news.filter(item => {
      const title = language === 'en' && item.title_en ? item.title_en : item.title;
      const summary = language === 'en' && item.summary_en ? item.summary_en : item.summary;
      
      return (
        title.toLowerCase().includes(query) || 
        summary.toLowerCase().includes(query)
      );
    });

    setFilteredNews(filtered);
    setTotalPages(Math.ceil(filtered.length / 6));
    setCurrentPage(1); // إعادة تعيين الصفحة عند البحث
  }, [searchQuery, news, language]);

  // تنسيق التاريخ حسب اللغة
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'PPP', {
        locale: language === 'ar' ? ar : enUS
      });
    } catch (error) {
      return dateString;
    }
  };

  // الحصول على النص المناسب حسب اللغة
  const getLocalizedText = (arText: string, enText?: string): string => {
    if (language === 'en' && enText) {
      return enText;
    }
    return arText;
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
    setSearchQuery('');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // البحث يتم تلقائيًا من خلال useEffect
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // التمرير إلى أعلى الصفحة
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.newsPage}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>{t('university_news', 'أخبار الجامعة')}</h1>
          <p className={styles.pageDescription}>
            {t('news_description', 'آخر الأخبار والفعاليات والإعلانات المتعلقة بالجامعة وكلياتها')}
          </p>
        </div>
        
        {/* قسم البحث والتصفية */}
        <div className={styles.filterSection}>
          {/* مربع البحث */}
          <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
            <div className={styles.searchInputContainer}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder={t('search_news_placeholder', 'ابحث في الأخبار...')}
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button type="submit" className={styles.searchButton}>
                <span className={styles.searchIcon}>🔍</span>
              </button>
            </div>
          </form>

          {/* تصفية حسب الفئة */}
          <div className={styles.categoryFilter}>
            <button 
              key="all"
              className={`${styles.categoryButton} ${activeCategory === 'all' ? styles.active : ''}`}
              onClick={() => handleCategoryChange('all')}
            >
              {language === 'ar' ? 'جميع الأخبار' : 'All News'}
            </button>
            {categories.map((category) => (
              category.id !== 0 && (
                <button 
                  key={category.id}
                  className={`${styles.categoryButton} ${activeCategory === category.id.toString() ? styles.active : ''}`}
                  onClick={() => handleCategoryChange(category.id.toString())}
                >
                  {getLocalizedText(category.name, category.name_en)}
                </button>
              )
            ))}
          </div>
        </div>
        
        {loading ? (
          <div className={styles.loading}>{t('loading_news', 'جاري تحميل الأخبار...')}</div>
        ) : filteredNews.length === 0 ? (
          <div className={styles.noResults}>{t('no_news_in_category', 'لا توجد أخبار في هذه الفئة')}</div>
        ) : (
          <>
            <div className={styles.newsGrid}>
              {filteredNews.map((item) => (
                <div key={item.id} className={styles.newsCard}>
                  <div className={styles.imageContainer}>
                    <Image 
                      src={item.main_image_url} 
                      alt={getLocalizedText(item.title, item.title_en)}
                      width={400}
                      height={250}
                      className={styles.newsImage}
                    />
                    <span className={styles.category}>
                      {getLocalizedText(item.category_name || '', item.category_name_en)}
                    </span>
                  </div>
                  <div className={styles.newsContent}>
                    <h3 className={styles.newsTitle}>
                      <Link href={`/news/${item.slug}`}>
                        {getLocalizedText(item.title, item.title_en)}
                      </Link>
                    </h3>
                    <p className={styles.newsSummary}>
                      {getLocalizedText(item.summary, item.summary_en)}
                    </p>
                    <div className={styles.newsFooter}>
                      <div className={styles.newsInfo}>
                        <span className={styles.newsDate}>{formatDate(item.publish_date)}</span>
                        <span className={styles.viewsCount}>
                          <i className={styles.eyeIcon}>👁️</i> {item.views_count}
                        </span>
                      </div>
                      <Link href={`/news/${item.slug}`} className={styles.readMore}>
                        {t('read_more', 'اقرأ المزيد')}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* ترقيم الصفحات */}
            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button 
                  className={styles.pageButton}
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  {t('previous', 'السابق')}
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`${styles.pageButton} ${currentPage === page ? styles.activePage : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
                
                <button 
                  className={styles.pageButton}
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  {t('next', 'التالي')}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
