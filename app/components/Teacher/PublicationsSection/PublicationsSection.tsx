'use client';

import React, { useState } from 'react'; 
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight, FaVideo, FaImage, FaFilePdf, FaFilePowerpoint, FaExternalLinkAlt, FaDownload, FaEye } from 'react-icons/fa'; 
import styles from '../Teacher.module.css';
import { Publication, PublicationsSectionProps } from '../interfaces';

const PublicationsSection: React.FC<PublicationsSectionProps> = ({ publications, teacherId, lang = 'ar', isOwner = false }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'video' | 'image' | 'pdf' | 'powerpoint'>('all');

  if (!publications || publications.length === 0) {
    return <div className={styles.noData}>لا توجد منشورات لعرضها حاليًا.</div>;
  }

  // تصفية المنشورات حسب الفئة المحددة
  const filteredPublications = activeCategory === 'all' 
    ? publications 
    : publications.filter(pub => pub.mediaType === activeCategory);

  // الحصول على عدد العناصر في كل فئة
  const getCategoryCount = (category: 'video' | 'image' | 'pdf' | 'powerpoint') => {
    return publications.filter(pub => pub.mediaType === category).length;
  };

  // رمز لكل نوع من أنواع الوسائط
  const getMediaIcon = (mediaType?: string) => {
    switch (mediaType) {
      case 'video':
        return <FaVideo className={styles.mediaIcon} />;
      case 'image':
        return <FaImage className={styles.mediaIcon} />;
      case 'pdf':
        return <FaFilePdf className={styles.mediaIcon} />;
      case 'powerpoint':
        return <FaFilePowerpoint className={styles.mediaIcon} />;
      default:
        return <FaFilePdf className={styles.mediaIcon} />;
    }
  };

  // تحديد نوع الملف بناءً على الامتداد أو نوع الوسائط
  const getFileType = (pub: Publication) => {
    if (pub.mediaType) {
      return pub.mediaType;
    }
    
    // إذا كان لدينا مسار ملف، نحاول استخراج الامتداد
    if (pub.file_path) {
      const extension = pub.file_path.split('.').pop()?.toLowerCase();
      if (extension === 'pdf') return 'pdf';
      if (['ppt', 'pptx'].includes(extension || '')) return 'powerpoint';
      if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) return 'image';
      if (['mp4', 'webm', 'mov'].includes(extension || '')) return 'video';
    }
    
    return 'pdf'; // افتراضي
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>المنشورات والوسائط</h2>
      
      {/* أزرار التصفية حسب الفئة */}
      <div className={styles.categoryFilters}>
        <button 
          className={`${styles.categoryButton} ${activeCategory === 'all' ? styles.activeCategory : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          الكل ({publications.length})
        </button>
        <button 
          className={`${styles.categoryButton} ${activeCategory === 'video' ? styles.activeCategory : ''}`}
          onClick={() => setActiveCategory('video')}
        >
          <FaVideo /> فيديو ({getCategoryCount('video')})
        </button>
        <button 
          className={`${styles.categoryButton} ${activeCategory === 'image' ? styles.activeCategory : ''}`}
          onClick={() => setActiveCategory('image')}
        >
          <FaImage /> صور ({getCategoryCount('image')})
        </button>
        <button 
          className={`${styles.categoryButton} ${activeCategory === 'pdf' ? styles.activeCategory : ''}`}
          onClick={() => setActiveCategory('pdf')}
        >
          <FaFilePdf /> PDF ({getCategoryCount('pdf')})
        </button>
        <button 
          className={`${styles.categoryButton} ${activeCategory === 'powerpoint' ? styles.activeCategory : ''}`}
          onClick={() => setActiveCategory('powerpoint')}
        >
          <FaFilePowerpoint /> عروض تقديمية ({getCategoryCount('powerpoint')})
        </button>
      </div>

      <div className={styles.publicationsGrid}> 
        {filteredPublications.map((pub) => {
          const fileType = getFileType(pub);
          const filePath = pub.link || pub.file_path;
          const downloadUrl = filePath ? `/api/api_academics/publications/download?path=${encodeURIComponent(filePath)}&teacherId=${encodeURIComponent(String(pub.teacher_id))}` : '';
          
          return (
            <div key={pub.publication_id} className={styles.publicationCard}>
              {/* صورة مصغرة للوسائط */}
              {pub.thumbnailUrl && (
                <div className={styles.thumbnailContainer}>
                  <Image 
                    src={`/api/api_academics/publications/download?path=${encodeURIComponent(pub.thumbnailUrl)}&teacherId=${encodeURIComponent(String(pub.teacher_id))}`}
                    alt={pub.title_ar || pub.title_en || ''} 
                    width={250} 
                    height={150} 
                    className={styles.thumbnail}
                  />
                  {getMediaIcon(fileType)}
                </div>
              )}
              
              <div className={styles.publicationDetails}>
                <h3 className={styles.publicationTitle}>
                  {pub.title_ar || pub.title_en}
                </h3>
                
                {(pub.journal_conference_name_ar || pub.journal_conference_name_en) && (
                  <p className={styles.publicationMeta}>
                    {pub.journal_conference_name_ar || pub.journal_conference_name_en}
                    {pub.publication_year && `, ${pub.publication_year}`}
                  </p>
                )}
                
                {pub.description_ar && (
                  <p className={styles.publicationDescription}>
                    {pub.description_ar}
                  </p>
                )}
                
                <div className={styles.publicationActions}>
                  {downloadUrl && (
                    <>
                      <a 
                        href={downloadUrl}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.actionButton}
                      >
                        <FaEye /> عرض
                      </a>
                      
                      <a 
                        href={`${downloadUrl}&download=true`}
                        className={styles.actionButton}
                      >
                        <FaDownload /> تنزيل
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredPublications.length === 0 && (
        <div className={styles.noData}>لا توجد منشورات في هذه الفئة.</div>
      )}
    </div>
  );
};

export default PublicationsSection;
