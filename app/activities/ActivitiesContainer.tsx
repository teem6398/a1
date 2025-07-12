'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './activities.module.css';
import { ActivityList } from './ActivityList';
import Footer from '@/components/Home/Footer/footers';
import { useTranslation } from '../lib/translation-context';

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
  featured_image?: string;
  category_name?: string;
  category_name_ar?: string;
  category_name_en?: string;
  category_color?: string;
  category_id?: number;
}

interface Category {
  id: number;
  name: string;
  name_ar?: string;
  name_en?: string;
  color?: string;
}

interface ActivitiesContainerProps {
  initialActivities: Activity[];
  initialCategories: Category[];
}

export function ActivitiesContainer({ initialActivities, initialCategories }: ActivitiesContainerProps) {
  const { language, t, isRTL } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Get localized text based on language
  const getLocalizedText = (arText?: string, enText?: string): string => {
    if (language === 'en' && enText) {
      return enText;
    }
    return arText || '';
  };

  // تصفية الأنشطة حسب البحث والتصنيف
  const filteredActivities = initialActivities.filter(activity => {
    // Get localized title and description for search
    const title = getLocalizedText(activity.title_ar || activity.title, activity.title_en);
    const description = getLocalizedText(activity.description_ar || activity.description, activity.description_en);
    
    const matchesSearch = !searchTerm || 
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = !selectedCategory || activity.category_id === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // حساب عدد الصفحات
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);

  // الحصول على الأنشطة للصفحة الحالية
  const currentActivities = filteredActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className={styles.activitiesPage}>
        <div className={styles.container}>
          <div className={styles.pageHeader}>
            <Link href="/" className={styles.backButton}>
              {t('back_to_home', 'العودة للرئيسية')}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5"/>
                <polyline points={isRTL ? "12 5 5 12 12 19" : "12 19 19 12 12 5"}/>
              </svg>
            </Link>
            <h1 className={styles.pageTitle}>{t('university_activities', 'أنشطة الجامعة')}</h1>
            <p className={styles.pageDescription}>
              {t('activities_subtitle', 'تعرف على أحدث الأنشطة والفعاليات في جامعة الريادة')}
            </p>
          </div>

          <div className={styles.filterSection}>
            <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.searchInputContainer}>
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder={t('search_activities', 'ابحث في الأنشطة...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className={styles.searchButton}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </button>
              </div>
            </form>

            <div className={styles.categoryFilter}>
              <button 
                className={`${styles.categoryButton} ${!selectedCategory ? styles.active : ''}`}
                onClick={() => setSelectedCategory(null)}
              >
                {t('all_activities', 'جميع الأنشطة')}
              </button>
              {initialCategories.map((category) => {
                const categoryName = getLocalizedText(
                  category.name_ar || category.name, 
                  category.name_en
                );
                
                return (
                  <button 
                    key={category.id}
                    className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.active : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                    style={category.color ? { 
                      '--category-color': category.color 
                    } as React.CSSProperties : undefined}
                  >
                    {categoryName}
                  </button>
                );
              })}
            </div>
          </div>

          {currentActivities.length === 0 ? (
            <div className={styles.noResults}>
              <h3>{t('no_matching_activities', 'لا توجد أنشطة مطابقة للبحث')}</h3>
              <p>{t('try_changing_filters', 'جرب تغيير معايير البحث أو التصنيف')}</p>
            </div>
          ) : (
            <>
              <ActivityList initialActivities={currentActivities} />
              
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
      <Footer />
    </>
  );
} 