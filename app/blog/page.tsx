'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './blog.module.css';
import { useTranslation } from '../lib/translation-context';
import Navbar from '../components/Home/Navbar/Navbar';
import Footer from '../components/Home/Footer/footers';
import { motion } from 'framer-motion';
import {
  FaCalendarAlt,
  FaClock,
  FaEye,
  FaSearch,
  FaFilter,
  FaNewspaper,
  FaMicroscope,
  FaGraduationCap,
  FaTrophy,
  FaLightbulb,
  FaTimes
} from 'react-icons/fa';

// تحويل أسماء الأيقونات إلى مكونات
const iconMap: { [key: string]: any } = {
  'FaNewspaper': FaNewspaper,
  'FaMicroscope': FaMicroscope,
  'FaGraduationCap': FaGraduationCap,
  'FaTrophy': FaTrophy,
  'FaLightbulb': FaLightbulb
};

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  reading_time: number;
  views_count: number;
  published_at: string;
  category_name: string;
  category_slug: string;
  category_color: string;
  category_icon: string;
  author_name: string;
  author_image: string;
  tags: string[];
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  posts_count?: number;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export default function BlogPage() {
  const { language, dir } = useTranslation();
  const searchParams = useSearchParams();
  
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 9,
    pages: 0
  });
  
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    page: parseInt(searchParams.get('page') || '1')
  });

  const [searchInput, setSearchInput] = useState(filters.search);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, [language]);

  useEffect(() => {
    fetchPosts();
  }, [filters, language]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`/api/blog/categories?lang=${language}&withCount=true`);
      const data = await response.json();
      
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: filters.page.toString(),
        limit: '9',
        lang: language
      });

      if (filters.category) params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);

      const response = await fetch(`/api/blog?${params}`);
      const data = await response.json();

      if (data.success) {
        setPosts(data.data.posts);
        setPagination(data.data.pagination);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = (categorySlug: string) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category === categorySlug ? '' : categorySlug,
      page: 1
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      search: searchInput,
      page: 1
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  return (
    <div className={styles.pageWrapper} dir={dir}>
      <Navbar context="Blog" />
      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {language === 'ar' ? 'مدونة جامعة الريادة' : 'Al-Riyada University Blog'}
          </motion.h1>
          <motion.p 
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {language === 'ar' 
              ? 'اكتشف آخر المقالات والأخبار والأبحاث من جامعتنا'
              : 'Discover the latest articles, news, and research from our university'}
          </motion.p>

          {/* Search Bar */}
          <motion.form 
            className={styles.searchForm}
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.searchWrapper}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder={language === 'ar' ? 'ابحث في المدونة...' : 'Search the blog...'}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchButton}>
                {language === 'ar' ? 'بحث' : 'Search'}
              </button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.mainSection}>
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${showFilters ? styles.showFilters : ''}`}>
              <div className={styles.sidebarHeader}>
                <h3>{language === 'ar' ? 'الفئات' : 'Categories'}</h3>
                <button 
                  className={styles.closeFilters}
                  onClick={() => setShowFilters(false)}
                  aria-label="Close filters"
                >
                  <FaTimes />
                </button>
              </div>

              <div className={styles.categoriesList}>
                <button
                  className={`${styles.categoryItem} ${!filters.category ? styles.active : ''}`}
                  onClick={() => handleCategoryFilter('')}
                >
                  <span className={styles.categoryName}>
                    {language === 'ar' ? 'جميع الفئات' : 'All Categories'}
                  </span>
                  <span className={styles.categoryCount}>
                    {categories.reduce((sum, cat) => sum + (cat.posts_count || 0), 0)}
                  </span>
                </button>

                {categories.map((category) => {
                  const IconComponent = iconMap[category.icon] || FaNewspaper;
                  return (
                    <button
                      key={category.id}
                      className={`${styles.categoryItem} ${filters.category === category.slug ? styles.active : ''}`}
                      onClick={() => handleCategoryFilter(category.slug)}
                    >
                      <div className={styles.categoryInfo}>
                        <IconComponent 
                          className={styles.categoryIcon}
                          style={{ color: category.color }}
                        />
                        <span className={styles.categoryName}>{category.name}</span>
                      </div>
                      <span className={styles.categoryCount}>{category.posts_count || 0}</span>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Posts Grid */}
            <div className={styles.postsSection}>
              {/* Active Filters */}
              {(filters.category || filters.search) && (
                <div className={styles.activeFilters}>
                  {filters.search && (
                    <div className={styles.filterTag}>
                      <span>{language === 'ar' ? 'البحث:' : 'Search:'} {filters.search}</span>
                      <button onClick={() => {
                        setFilters(prev => ({ ...prev, search: '', page: 1 }));
                        setSearchInput('');
                      }}>
                        <FaTimes />
                      </button>
                    </div>
                  )}
                  {filters.category && (
                    <div className={styles.filterTag}>
                      <span>
                        {categories.find(cat => cat.slug === filters.category)?.name}
                      </span>
                      <button onClick={() => setFilters(prev => ({ ...prev, category: '', page: 1 }))}>
                        <FaTimes />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Filter Button */}
              <button 
                className={styles.mobileFilterButton}
                onClick={() => setShowFilters(true)}
              >
                <FaFilter />
                <span>{language === 'ar' ? 'الفئات' : 'Categories'}</span>
              </button>

              {/* Posts Grid */}
              {loading ? (
                <div className={styles.loadingGrid}>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className={styles.skeletonCard}>
                      <div className={styles.skeletonImage}></div>
                      <div className={styles.skeletonContent}>
                        <div className={styles.skeletonCategory}></div>
                        <div className={styles.skeletonTitle}></div>
                        <div className={styles.skeletonExcerpt}></div>
                        <div className={styles.skeletonMeta}></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : posts.length === 0 ? (
                <div className={styles.noResults}>
                  <p>{language === 'ar' ? 'لا توجد مقالات متاحة' : 'No posts available'}</p>
                </div>
              ) : (
                <>
                  <div className={styles.postsGrid}>
                    {posts.map((post, index) => {
                      const IconComponent = iconMap[post.category_icon] || FaNewspaper;
                      
                      return (
                        <motion.article
                          key={post.id}
                          className={styles.postCard}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Link href={`/blog/${post.slug}`} className={styles.postLink}>
                            <div className={styles.postImageWrapper}>
                              {post.featured_image ? (
                                <Image
                                  src={post.featured_image}
                                  alt={post.title}
                                  fill
                                  className={styles.postImage}
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                              ) : (
                                <div className={styles.placeholderImage}>
                                  <IconComponent size={60} />
                                </div>
                              )}
                              <div 
                                className={styles.categoryBadge}
                                style={{ backgroundColor: post.category_color }}
                              >
                                <IconComponent size={14} />
                                <span>{post.category_name}</span>
                              </div>
                            </div>

                            <div className={styles.postContent}>
                              <h2 className={styles.postTitle}>{post.title}</h2>
                              <p className={styles.postExcerpt}>{post.excerpt}</p>

                              <div className={styles.postMeta}>
                                <div className={styles.metaItem}>
                                  <FaCalendarAlt className={styles.metaIcon} />
                                  <span>{formatDate(post.published_at)}</span>
                                </div>
                                <div className={styles.metaItem}>
                                  <FaClock className={styles.metaIcon} />
                                  <span>
                                    {post.reading_time} {language === 'ar' ? 'دقائق' : 'min'}
                                  </span>
                                </div>
                                <div className={styles.metaItem}>
                                  <FaEye className={styles.metaIcon} />
                                  <span>{formatViews(post.views_count)}</span>
                                </div>
                              </div>

                              <div className={styles.postFooter}>
                                <div className={styles.authorInfo}>
                                  {post.author_image && (
                                    <Image
                                      src={post.author_image}
                                      alt={post.author_name}
                                      width={32}
                                      height={32}
                                      className={styles.authorImage}
                                    />
                                  )}
                                  <span className={styles.authorName}>{post.author_name}</span>
                                </div>

                                {post.tags.length > 0 && (
                                  <div className={styles.tags}>
                                    {post.tags.slice(0, 2).map((tag, tagIndex) => (
                                      <span key={tagIndex} className={styles.tag}>
                                        #{tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </Link>
                        </motion.article>
                      );
                    })}
                  </div>

                  {/* Pagination */}
                  {pagination.pages > 1 && (
                    <div className={styles.pagination}>
                      <button
                        className={styles.pageButton}
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                      >
                        {language === 'ar' ? 'السابق' : 'Previous'}
                      </button>

                      <div className={styles.pageNumbers}>
                        {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            className={`${styles.pageNumber} ${page === pagination.page ? styles.active : ''}`}
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      <button
                        className={styles.pageButton}
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.pages}
                      >
                        {language === 'ar' ? 'التالي' : 'Next'}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 