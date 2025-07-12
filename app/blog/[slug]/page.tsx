'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './blogPost.module.css';
import { useTranslation } from '../../lib/translation-context';
import Navbar from '../../components/Home/Navbar/Navbar';
import Footer from '../../components/Home/Footer/footers';
import { motion } from 'framer-motion';
import {
  FaCalendarAlt,
  FaClock,
  FaEye,
  FaShare,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
  FaArrowLeft,
  FaArrowRight,
  FaNewspaper,
  FaMicroscope,
  FaGraduationCap,
  FaTrophy,
  FaLightbulb
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
  content: string;
  featured_image: string;
  reading_time: number;
  views_count: number;
  is_featured: boolean;
  published_at: string;
  meta_title: string;
  meta_description: string;
  category: {
    id: number;
    name: string;
    slug: string;
    color: string;
    icon: string;
  };
  author: {
    id: number;
    name: string;
    title: string;
    bio: string;
    image: string;
    social: {
      email: string;
      linkedin: string;
      twitter: string;
    };
  };
  tags: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  relatedPosts: Array<{
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    featured_image: string;
    reading_time: number;
    published_at: string;
    author_name: string;
  }>;
}

export default function BlogPostPage() {
  const { language, dir } = useTranslation();
  const params = useParams();
  const slug = params.slug as string;
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug, language]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blog/${slug}?lang=${language}`);
      const data = await response.json();

      if (data.success) {
        setPost(data.data);
        // Update page title
        document.title = `${data.data.meta_title || data.data.title} | جامعة الريادة`;
      } else {
        setError(data.error || 'Failed to load post');
      }
    } catch (err) {
      setError('Error loading post');
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
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

  const sharePost = (platform: string) => {
    if (!post) return;
    
    const url = window.location.href;
    const title = post.title;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
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
      <div className={styles.pageWrapper} dir={dir}>
        <Navbar context="Blog" />
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>{language === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className={styles.pageWrapper} dir={dir}>
        <Navbar context="Blog" />
        <div className={styles.errorContainer}>
          <h1>{language === 'ar' ? 'عذراً' : 'Sorry'}</h1>
          <p>{language === 'ar' ? 'المقال غير موجود' : 'Post not found'}</p>
          <Link href="/blog" className={styles.backButton}>
            {language === 'ar' ? 'العودة إلى المدونة' : 'Back to Blog'}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const CategoryIcon = iconMap[post.category.icon] || FaNewspaper;

  return (
    <div className={styles.pageWrapper} dir={dir}>
      <Navbar context="Blog" />
      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        {post.featured_image && (
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className={styles.heroImage}
            priority
          />
        )}
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href={`/blog?category=${post.category.slug}`}
              className={styles.categoryLink}
              style={{ backgroundColor: post.category.color }}
            >
              <CategoryIcon size={16} />
              <span>{post.category.name}</span>
            </Link>
            
            <h1 className={styles.postTitle}>{post.title}</h1>
            
            <div className={styles.postMeta}>
              <div className={styles.authorMeta}>
                {post.author.image && (
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    width={48}
                    height={48}
                    className={styles.authorImage}
                  />
                )}
                <div>
                  <p className={styles.authorName}>{post.author.name}</p>
                  <p className={styles.authorTitle}>{post.author.title}</p>
                </div>
              </div>
              
              <div className={styles.metaInfo}>
                <div className={styles.metaItem}>
                  <FaCalendarAlt />
                  <span>{formatDate(post.published_at)}</span>
                </div>
                <div className={styles.metaItem}>
                  <FaClock />
                  <span>{post.reading_time} {language === 'ar' ? 'دقائق قراءة' : 'min read'}</span>
                </div>
                <div className={styles.metaItem}>
                  <FaEye />
                  <span>{formatViews(post.views_count)} {language === 'ar' ? 'مشاهدة' : 'views'}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.mainSection}>
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            {/* Article Content */}
            <article className={styles.articleContent}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Share Button */}
                <div className={styles.shareWrapper}>
                  <button
                    className={styles.shareButton}
                    onClick={() => setShowShareMenu(!showShareMenu)}
                  >
                    <FaShare />
                    <span>{language === 'ar' ? 'مشاركة' : 'Share'}</span>
                  </button>
                  
                  {showShareMenu && (
                    <div className={styles.shareMenu}>
                      <button onClick={() => sharePost('facebook')} className={styles.shareOption}>
                        <FaFacebook /> Facebook
                      </button>
                      <button onClick={() => sharePost('twitter')} className={styles.shareOption}>
                        <FaTwitter /> Twitter
                      </button>
                      <button onClick={() => sharePost('linkedin')} className={styles.shareOption}>
                        <FaLinkedin /> LinkedIn
                      </button>
                      <button onClick={() => sharePost('whatsapp')} className={styles.shareOption}>
                        <FaWhatsapp /> WhatsApp
                      </button>
                      <button onClick={() => sharePost('email')} className={styles.shareOption}>
                        <FaEnvelope /> Email
                      </button>
                    </div>
                  )}
                </div>

                {/* Article Body */}
                <div 
                  className={styles.articleBody}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className={styles.tagsSection}>
                    <h3>{language === 'ar' ? 'الوسوم' : 'Tags'}</h3>
                    <div className={styles.tagsList}>
                      {post.tags.map((tag) => (
                        <Link
                          key={tag.id}
                          href={`/blog?tag=${tag.slug}`}
                          className={styles.tagLink}
                        >
                          #{tag.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author Bio */}
                <div className={styles.authorBio}>
                  <h3>{language === 'ar' ? 'عن الكاتب' : 'About the Author'}</h3>
                  <div className={styles.authorCard}>
                    {post.author.image && (
                      <Image
                        src={post.author.image}
                        alt={post.author.name}
                        width={80}
                        height={80}
                        className={styles.authorBioImage}
                      />
                    )}
                    <div className={styles.authorBioContent}>
                      <h4>{post.author.name}</h4>
                      <p className={styles.authorBioTitle}>{post.author.title}</p>
                      <p className={styles.authorBioText}>{post.author.bio}</p>
                      <div className={styles.authorSocial}>
                        {post.author.social.email && (
                          <a href={`mailto:${post.author.social.email}`} aria-label="Email">
                            <FaEnvelope />
                          </a>
                        )}
                        {post.author.social.linkedin && (
                          <a href={post.author.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <FaLinkedin />
                          </a>
                        )}
                        {post.author.social.twitter && (
                          <a href={post.author.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <FaTwitter />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </article>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              {/* Related Posts */}
              {post.relatedPosts.length > 0 && (
                <div className={styles.relatedPosts}>
                  <h3>{language === 'ar' ? 'مقالات ذات صلة' : 'Related Posts'}</h3>
                  <div className={styles.relatedPostsList}>
                    {post.relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        href={`/blog/${relatedPost.slug}`}
                        className={styles.relatedPostCard}
                      >
                        {relatedPost.featured_image && (
                          <div className={styles.relatedPostImage}>
                            <Image
                              src={relatedPost.featured_image}
                              alt={relatedPost.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 100px"
                            />
                          </div>
                        )}
                        <div className={styles.relatedPostContent}>
                          <h4>{relatedPost.title}</h4>
                          <div className={styles.relatedPostMeta}>
                            <span>{formatDate(relatedPost.published_at)}</span>
                            <span>•</span>
                            <span>{relatedPost.reading_time} {language === 'ar' ? 'دقائق' : 'min'}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>

          {/* Navigation */}
          <div className={styles.postNavigation}>
            <Link href="/blog" className={styles.backToBlog}>
              {language === 'ar' ? <FaArrowRight /> : <FaArrowLeft />}
              <span>{language === 'ar' ? 'العودة إلى المدونة' : 'Back to Blog'}</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 