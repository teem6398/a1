'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './activity.module.css';

interface ActivityMedia {
  id: number;
  activity_id: number;
  media_type: 'image' | 'video' | 'document';
  file_path: string;
  title_ar?: string;
  title_en?: string;
  description_ar?: string;
  description_en?: string;
  is_featured: boolean;
  sort_order: number;
}

export const MediaGallery = ({ media, lang = 'ar' }: { media: ActivityMedia[], lang?: string }) => {
  const [activeMedia, setActiveMedia] = useState<ActivityMedia | null>(
    media.find(m => m.is_featured) || media[0] || null
  );
  
  // تقسيم الوسائط حسب النوع
  const images = media.filter(m => m.media_type === 'image');
  const videos = media.filter(m => m.media_type === 'video');
  const documents = media.filter(m => m.media_type === 'document');
  
  // الحصول على النص المناسب حسب اللغة
  const getLocalizedText = (arText?: string, enText?: string): string => {
    if (lang === 'en' && enText) {
      return enText;
    }
    return arText || '';
  };

  // معالجة مسار الملف
  const getProcessedFilePath = (path: string): string => {
    if (!path) return '/image/1.jpg';
    
    if (!path.startsWith('/') && !path.startsWith('http')) {
      return `/${path}`;
    }
    
    return path;
  };
  
  // ترجمات الواجهة
  const translations = {
    video_title: lang === 'en' ? 'Activity Video' : 'فيديو النشاط',
    download_document: lang === 'en' ? 'Download Document' : 'تنزيل المستند',
    images: lang === 'en' ? 'Images' : 'صورة',
    videos: lang === 'en' ? 'Videos' : 'فيديو',
    documents: lang === 'en' ? 'Documents' : 'مستند'
  };
  
  return (
    <div className={styles.mediaGallery}>
      {/* عرض الوسائط النشطة */}
      <div className={styles.activeMediaContainer}>
        {activeMedia && (
          activeMedia.media_type === 'image' ? (
            <div className={styles.imageWrapper}>
              <Image 
                src={getProcessedFilePath(activeMedia.file_path)} 
                alt={getLocalizedText(activeMedia.title_ar, activeMedia.title_en)} 
                width={800} 
                height={500} 
                className={styles.activeImage}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/image/1.jpg';
                }}
              />
              {(activeMedia.title_ar || activeMedia.title_en) && (
                <div className={styles.mediaCaption}>
                  {getLocalizedText(activeMedia.title_ar, activeMedia.title_en)}
                </div>
              )}
            </div>
          ) : activeMedia.media_type === 'video' ? (
            <div className={styles.videoWrapper}>
              <iframe 
                src={getProcessedFilePath(activeMedia.file_path)} 
                title={getLocalizedText(activeMedia.title_ar, activeMedia.title_en) || translations.video_title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className={styles.videoFrame}
              ></iframe>
              {(activeMedia.title_ar || activeMedia.title_en) && (
                <div className={styles.mediaCaption}>
                  {getLocalizedText(activeMedia.title_ar, activeMedia.title_en)}
                </div>
              )}
            </div>
          ) : (
            <div className={styles.documentWrapper}>
              <a 
                href={getProcessedFilePath(activeMedia.file_path)} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.documentLink}
              >
                <div className={styles.documentIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <span className={styles.documentName}>
                  {getLocalizedText(activeMedia.title_ar, activeMedia.title_en) || translations.download_document}
                </span>
              </a>
            </div>
          )
        )}
      </div>
      
      {/* معرض مصغر للوسائط */}
      {media.length > 1 && (
        <div className={styles.mediaThumbnails}>
          {media.map((item) => (
            <div 
              key={item.id} 
              className={`${styles.mediaThumbnail} ${activeMedia?.id === item.id ? styles.activeThumbnail : ''}`}
              onClick={() => setActiveMedia(item)}
            >
              {item.media_type === 'image' ? (
                <Image 
                  src={getProcessedFilePath(item.file_path)} 
                  alt={getLocalizedText(item.title_ar, item.title_en)} 
                  width={100} 
                  height={70} 
                  className={styles.thumbnailImage}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/image/1.jpg';
                  }}
                />
              ) : item.media_type === 'video' ? (
                <div className={styles.videoThumbnail}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
              ) : (
                <div className={styles.documentThumbnail}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* عرض أنواع الوسائط */}
      <div className={styles.mediaTypes}>
        {images.length > 0 && (
          <div className={styles.mediaTypeCount}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <span>{images.length} {translations.images}</span>
          </div>
        )}
        
        {videos.length > 0 && (
          <div className={styles.mediaTypeCount}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
              <line x1="7" y1="2" x2="7" y2="22"></line>
              <line x1="17" y1="2" x2="17" y2="22"></line>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <line x1="2" y1="7" x2="7" y2="7"></line>
              <line x1="2" y1="17" x2="7" y2="17"></line>
              <line x1="17" y1="17" x2="22" y2="17"></line>
              <line x1="17" y1="7" x2="22" y2="7"></line>
            </svg>
            <span>{videos.length} {translations.videos}</span>
          </div>
        )}
        
        {documents.length > 0 && (
          <div className={styles.mediaTypeCount}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span>{documents.length} {translations.documents}</span>
          </div>
        )}
      </div>
    </div>
  );
}; 