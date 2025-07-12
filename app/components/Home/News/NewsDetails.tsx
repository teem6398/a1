'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '../../../lib/translation-context';
import { useTheme } from '../../../lib/theme-context';
import styles from './NewsDetails.module.css';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import { 
  FaCalendarAlt, 
  FaEye, 
  FaFacebook, 
  FaTwitter, 
  FaWhatsapp, 
  FaEnvelope, 
  FaArrowLeft,
  FaUser
} from 'react-icons/fa';

// نماذج البيانات
interface NewsDetails {
  id: number;
  title: string;
  title_en?: string;
  subtitle?: string;
  subtitle_en?: string;
  content: string;
  content_en?: string;
  summary?: string;
  summary_en?: string;
  main_image_url: string;
  publish_date: string;
  last_updated?: string;
  category_id: number;
  category_name?: string;
  category_name_en?: string;
  views_count: number;
  is_featured: boolean;
  is_active: boolean;
  slug: string;
  tags?: string;
  tags_en?: string;
  author_id?: number;
  author?: {
    id: number;
    name: string;
    name_en?: string;
    title?: string;
    title_en?: string;
    bio?: string;
    bio_en?: string;
    image_url?: string;
  };
  media?: MediaItem[];
}

interface MediaItem {
  id: number;
  media_type: 'image' | 'video' | 'embed';
  url: string;
  thumbnail_url?: string;
  caption?: string;
  caption_en?: string;
  width?: number;
  height?: number;
  duration?: number;
  display_order?: number;
  is_active?: number;
}

interface NewsDetailsProps {
  slug: string;
}

export default function NewsDetails({ slug }: NewsDetailsProps) {
  const { language, t, isRTL } = useTranslation();
  const { theme } = useTheme();
  const [news, setNews] = useState<NewsDetails | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    async function fetchNewsDetails() {
      try {
        setLoading(true);
        // جلب تفاصيل الخبر
        const response = await fetch(`/api/api_news?slug=${slug}&lang=${language}`);
        
        if (!response.ok) {
          throw new Error(`${t('error_fetching_news', 'خطأ في جلب تفاصيل الخبر')}: ${response.status}`);
        }
        
        const data = await response.json();
        const newsItem = data.data && data.data.length > 0 ? data.data[0] : null;
        
        if (newsItem) {
          setNews(newsItem);
          
          // جلب أخبار متعلقة من نفس الفئة
          try {
            const relatedResponse = await fetch(`/api/api_news?category=${newsItem.category_id}&limit=3&lang=${language}`);
            if (relatedResponse.ok) {
              const relatedData = await relatedResponse.json();
              // استبعاد الخبر الحالي من القائمة
              const filteredRelated = relatedData.data.filter((item: NewsDetails) => item.id !== newsItem.id);
              setRelatedNews(filteredRelated.slice(0, 3)); // أخذ أول 3 أخبار فقط
            }
          } catch (relatedError) {
            console.error('Error fetching related news:', relatedError);
          }
        } else {
          setError(t('news_not_found', 'لم يتم العثور على الخبر المطلوب'));
        }
      } catch (error) {
        console.error(t('error_fetching_news', 'خطأ في جلب تفاصيل الخبر:'), error);
        setError(t('error_message', 'حدث خطأ أثناء جلب تفاصيل الخبر. يرجى المحاولة مرة أخرى.'));
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchNewsDetails();
    }
  }, [slug, language, t]);

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
  const getLocalizedText = (arText: string | undefined, enText: string | undefined): string => {
    if (language === 'en' && enText) {
      return enText;
    }
    return arText || '';
  };

  // تقسيم الوسوم إلى مصفوفة
  const getTags = (tagsString?: string): string[] => {
    if (!tagsString) return [];
    return tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
  };

  // مشاركة الخبر
  const sharePost = (platform: string) => {
    if (!news) return;
    
    const url = window.location.href;
    const title = getLocalizedText(news.title, news.title_en);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className={styles.newsDetailsPage}>
        <div className={styles.container}>
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p className={styles.loadingText}>{t('loading_news', 'جاري تحميل تفاصيل الخبر...')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className={styles.newsDetailsPage}>
        <div className={styles.container}>
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>!</div>
            <h2 className={styles.errorTitle}>{t('error_title', 'عذراً')}</h2>
            <p className={styles.errorMessage}>{error || t('news_not_found', 'لم يتم العثور على الخبر المطلوب')}</p>
            <Link href="/news" className={styles.backButton}>
              {t('back_to_news', 'العودة إلى صفحة الأخبار')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // تحديد المحتوى المناسب حسب اللغة
  const title = getLocalizedText(news.title, news.title_en);
  const subtitle = getLocalizedText(news.subtitle, news.subtitle_en);
  const content = getLocalizedText(news.content, news.content_en);
  const categoryName = getLocalizedText(news.category_name, news.category_name_en);
  const authorName = news.author ? getLocalizedText(news.author.name, news.author.name_en) : '';
  const authorTitle = news.author ? getLocalizedText(news.author.title, news.author.title_en) : '';
  const authorBio = news.author ? getLocalizedText(news.author.bio, news.author.bio_en) : '';
  const tags = getTags(getLocalizedText(news.tags, news.tags_en));

  return (
    <div className={styles.newsDetailsPage} data-theme={theme}>
      <div className={styles.container}>
        {/* شريط التنقل الفرعي */}
        <div className={styles.breadcrumbs}>
          <Link href="/" className={styles.breadcrumbLink}>
            {t('home', 'الرئيسية')}
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <Link href="/news" className={styles.breadcrumbLink}>
            {t('news', 'الأخبار')}
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{title}</span>
        </div>

        <div className={styles.newsContent}>
          <div className={styles.mainContent}>
            {/* معلومات الخبر */}
            <div className={styles.newsHeader}>
              <div className={styles.categoryAndDate}>
                <Link href={`/news?category=${news.category_id}`} className={styles.category}>
                  {categoryName}
                </Link>
                <time className={styles.date} dateTime={news.publish_date}>
                  <FaCalendarAlt className={styles.dateIcon} />
                  {formatDate(news.publish_date)}
                </time>
              </div>
              
              <h1 className={styles.title}>{title}</h1>
              {subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}
              
              {/* معلومات الكاتب */}
              <div className={styles.authorBox}>
                <div className={styles.author}>
                  {news.author && news.author.image_url ? (
                    <Image 
                      src={news.author.image_url} 
                      alt={authorName}
                      width={48}
                      height={48}
                      className={styles.authorImage}
                    />
                  ) : (
                    <div className={styles.authorImagePlaceholder}>
                      <FaUser />
                    </div>
                  )}
                  <div className={styles.authorInfo}>
                    <span className={styles.authorName}>{authorName || t('unknown_author', 'كاتب غير معروف')}</span>
                    {authorTitle && <span className={styles.authorTitle}>{authorTitle}</span>}
                  </div>
                </div>
                
                <div className={styles.newsStats}>
                  <div className={styles.views}>
                    <FaEye className={styles.icon} />
                    <span>{news.views_count} {t('views', 'مشاهدة')}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* الصورة الرئيسية */}
            <div className={styles.mainImageContainer}>
              <Image 
                src={news.main_image_url} 
                alt={title}
                width={1200}
                height={630}
                className={styles.mainImage}
                priority
              />
            </div>
            
            {/* محتوى الخبر */}
            <div 
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: content }}
            />
            
            {/* الوسوم */}
            {tags.length > 0 && (
              <div className={styles.tagsContainer}>
                <h3 className={styles.tagsTitle}>{t('tags', 'الوسوم')}</h3>
                <div className={styles.tags}>
                  {tags.map((tag, index) => (
                    <Link 
                      key={index} 
                      href={`/news?tag=${encodeURIComponent(tag)}`}
                      className={styles.tag}
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* معرض الوسائط */}
            {news.media && news.media.length > 0 && (
              <div className={styles.mediaGallery}>
                <h3 className={styles.galleryTitle}>{t('media_gallery', 'معرض الوسائط')}</h3>
                <div className={styles.mediaGrid}>
                  {news.media.map((item) => (
                    <div key={item.id} className={styles.mediaItem}>
                      {item.media_type === 'image' && (
                        <div className={styles.imageContainer}>
                          <Image 
                            src={item.url} 
                            alt={getLocalizedText(item.caption, item.caption_en) || title}
                            width={400}
                            height={300}
                            className={styles.mediaImage}
                          />
                        </div>
                      )}
                      {item.media_type === 'video' && (
                        <div className={styles.videoContainer}>
                          <video 
                            src={item.url}
                            poster={item.thumbnail_url}
                            controls
                            className={styles.video}
                          />
                        </div>
                      )}
                      {item.media_type === 'embed' && (
                        <div className={styles.embedContainer}>
                          <div dangerouslySetInnerHTML={{ __html: item.url }} />
                        </div>
                      )}
                      {(item.caption || item.caption_en) && (
                        <div className={styles.caption}>
                          {getLocalizedText(item.caption, item.caption_en)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* مشاركة المقال */}
            <div className={styles.shareSection}>
              <h3 className={styles.shareTitle}>{t('share_news', 'شارك الخبر')}</h3>
              <div className={styles.shareButtons}>
                <button 
                  className={`${styles.shareButton} ${styles.facebook}`}
                  onClick={() => sharePost('facebook')}
                  aria-label={t('share_on_facebook', 'مشاركة على فيسبوك')}
                >
                  <FaFacebook className={styles.shareIcon} />
                </button>
                <button 
                  className={`${styles.shareButton} ${styles.twitter}`}
                  onClick={() => sharePost('twitter')}
                  aria-label={t('share_on_twitter', 'مشاركة على تويتر')}
                >
                  <FaTwitter className={styles.shareIcon} />
                </button>
                <button 
                  className={`${styles.shareButton} ${styles.whatsapp}`}
                  onClick={() => sharePost('whatsapp')}
                  aria-label={t('share_on_whatsapp', 'مشاركة على واتساب')}
                >
                  <FaWhatsapp className={styles.shareIcon} />
                </button>
                <button 
                  className={`${styles.shareButton} ${styles.email}`}
                  onClick={() => sharePost('email')}
                  aria-label={t('share_via_email', 'مشاركة عبر البريد الإلكتروني')}
                >
                  <FaEnvelope className={styles.shareIcon} />
                </button>
              </div>
            </div>
          </div>
          
          {/* الشريط الجانبي */}
          <div className={styles.sidebar}>
            {/* معلومات الكاتب */}
            {news.author && authorBio && (
              <div className={styles.authorBioCard}>
                <h3 className={styles.sidebarTitle}>{t('about_author', 'عن الكاتب')}</h3>
                <div className={styles.authorBioContent}>
                  <div className={styles.authorBioHeader}>
                    {news.author.image_url ? (
                      <Image 
                        src={news.author.image_url} 
                        alt={authorName}
                        width={100}
                        height={100}
                        className={styles.authorBioImage}
                      />
                    ) : (
                      <div className={styles.authorBioImagePlaceholder}>
                        <FaUser />
                      </div>
                    )}
                    <h4 className={styles.authorBioName}>{authorName}</h4>
                    {authorTitle && <p className={styles.authorBioTitle}>{authorTitle}</p>}
                  </div>
                  <p className={styles.authorBioText}>{authorBio}</p>
                  {/* يمكن إضافة رابط لصفحة الكاتب إذا كانت متوفرة */}
                  {news.author.id && (
                    <Link href={`/authors/${news.author.id}`} className={styles.authorMoreLink}>
                      {t('more_from_author', 'المزيد من الكاتب')}
                    </Link>
                  )}
                </div>
              </div>
            )}
            
            {/* أخبار ذات صلة */}
            {relatedNews.length > 0 && (
              <div className={styles.relatedNewsCard}>
                <h3 className={styles.sidebarTitle}>{t('related_news', 'أخبار ذات صلة')}</h3>
                <div className={styles.relatedNewsList}>
                  {relatedNews.map((item) => (
                    <Link 
                      key={item.id} 
                      href={`/news/${item.slug}`}
                      className={styles.relatedNewsItem}
                    >
                      <div className={styles.relatedNewsImageContainer}>
                        <Image 
                          src={item.main_image_url} 
                          alt={getLocalizedText(item.title, item.title_en)}
                          width={100}
                          height={70}
                          className={styles.relatedNewsImage}
                        />
                      </div>
                      <div className={styles.relatedNewsInfo}>
                        <h4 className={styles.relatedNewsTitle}>
                          {getLocalizedText(item.title, item.title_en)}
                        </h4>
                        <time className={styles.relatedNewsDate} dateTime={item.publish_date}>
                          {formatDate(item.publish_date)}
                        </time>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* رابط العودة */}
        <div className={styles.backLinkContainer}>
          <Link href="/news" className={styles.backLink}>
            {isRTL ? (
              <>
                {t('back_to_news', 'العودة إلى صفحة الأخبار')}
                <FaArrowLeft className={styles.backIcon} />
              </>
            ) : (
              <>
                <FaArrowLeft className={styles.backIcon} />
                {t('back_to_news', 'العودة إلى صفحة الأخبار')}
              </>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
