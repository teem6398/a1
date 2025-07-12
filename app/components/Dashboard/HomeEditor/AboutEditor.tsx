'use client';

import { useState, useEffect } from 'react';
import styles from './HomeEditor.module.css';
import Image from 'next/image';
import { FaUniversity, FaImage, FaCheck, FaTimes, FaPlus, FaTrash, FaEdit, FaUserTie, FaHeading, FaQuoteRight, FaUser, FaBriefcase, FaUpload, FaEye } from 'react-icons/fa';

interface AboutData {
  id: number;
  title: string;
  description: string;
  read_more_link: string;
}

interface Feature {
  id: number;
  feature: string;
  feature_order: number;
}

interface Stat {
  id: number;
  number: string;
  label: string;
  stat_order: number;
}

interface President {
  id: number;
  title: string;
  message: string;
  president_name: string;
  president_title: string;
  image_path: string;
}

interface AboutEditorProps {}

const AboutEditor: React.FC<AboutEditorProps> = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [presidentData, setPresidentData] = useState<President | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newFeature, setNewFeature] = useState('');
  const [newStat, setNewStat] = useState({ number: '', label: '' });
  const [activeTab, setActiveTab] = useState('about'); // 'about', 'features', 'stats', 'president'

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('/api/api_pages/about');
        if (response.ok) {
          const data = await response.json();
          setAboutData(data.about);
          setFeatures(data.features || []);
          setStats(data.stats || []);
          setPresidentData(data.president);
          setImagePreview(data.president?.image_path || null);
        }
      } catch (error) {
        console.error('خطأ في جلب بيانات عن الجامعة:', error);
        setMessage({ text: 'حدث خطأ أثناء جلب البيانات', type: 'error' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setMessage({ text: 'حجم الصورة يجب أن يكون أقل من 5 ميجابايت', type: 'error' });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        if (presidentData) {
          setPresidentData({ ...presidentData, image_path: base64String });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      const newFeatureObj: Feature = {
        id: Date.now(), // temporary id
        feature: newFeature.trim(),
        feature_order: features.length + 1
      };
      setFeatures([...features, newFeatureObj]);
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (id: number) => {
    setFeatures(features.filter(feature => feature.id !== id));
  };

  const handleAddStat = () => {
    if (newStat.number.trim() && newStat.label.trim()) {
      const newStatObj: Stat = {
        id: Date.now(), // temporary id
        number: newStat.number.trim(),
        label: newStat.label.trim(),
        stat_order: stats.length + 1
      };
      setStats([...stats, newStatObj]);
      setNewStat({ number: '', label: '' });
    }
  };

  const handleRemoveStat = (id: number) => {
    setStats(stats.filter(stat => stat.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ text: '', type: '' });

    try {
      if (!aboutData || !presidentData) {
        throw new Error('البيانات غير مكتملة');
      }

      const data = {
        about: aboutData,
        features: features,
        stats: stats,
        president: presidentData
      };

      const response = await fetch('/api/api_pages/about', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'حدث خطأ أثناء حفظ البيانات');
      }

      setMessage({ text: 'تم حفظ البيانات بنجاح', type: 'success' });
    } catch (error) {
      console.error('خطأ في حفظ البيانات:', error);
      setMessage({ 
        text: error instanceof Error ? error.message : 'حدث خطأ أثناء حفظ البيانات', 
        type: 'error' 
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className={styles.editorContainer}>
      <div className={styles.editorHeader}>
        <h2 className={styles.editorTitle}>تعديل قسم "عن الجامعة"</h2>
      </div>

      <div className={styles.editorContent}>
        {message.text && (
          <div className={message.type === 'success' ? styles.successMessage : styles.errorMessage}>
            <span className={styles.messageIcon}>
              {message.type === 'success' ? <FaCheck /> : <FaTimes />}
            </span>
            {message.text}
          </div>
        )}

        <div className={styles.aboutTabs}>
          <button 
            className={`${styles.aboutTab} ${activeTab === 'about' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('about')}
          >
            <span className={styles.aboutTabIcon}><FaUniversity /></span>
            معلومات عامة
          </button>
          <button 
            className={`${styles.aboutTab} ${activeTab === 'president' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('president')}
          >
            <span className={styles.aboutTabIcon}><FaUniversity /></span>
            كلمة رئيس الجامعة
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {activeTab === 'about' && (
            <div className={styles.aboutSection}>
              <div className={styles.aboutSectionHeader}>
                <h3 className={styles.aboutSectionTitle}>
                  <span className={styles.aboutSectionIcon}><FaUniversity /></span>
                  معلومات عن الجامعة
                </h3>
              </div>
              
              <div className={styles.aboutInfoContainer}>
                <div className={styles.aboutInfoItem}>
                  <label htmlFor="title" className={styles.aboutInfoLabel}>
                    <span className={styles.aboutLabelIcon}><FaUniversity /></span>
                    العنوان
                  </label>
                  <input
                    type="text"
                    id="title"
                    className={styles.aboutInfoInput}
                    value={aboutData?.title || ''}
                    onChange={(e) => setAboutData(aboutData ? { ...aboutData, title: e.target.value } : null)}
                    placeholder="أدخل عنوان القسم"
                    required
                  />
                </div>
                
                <div className={styles.aboutInfoItem}>
                  <label htmlFor="description" className={styles.aboutInfoLabel}>
                    <span className={styles.aboutLabelIcon}><FaImage /></span>
                    الوصف
                  </label>
                  <div className={styles.aboutDescriptionWrapper}>
                    <textarea
                      id="description"
                      className={styles.aboutDescriptionTextarea}
                      value={aboutData?.description || ''}
                      onChange={(e) => setAboutData(aboutData ? { ...aboutData, description: e.target.value } : null)}
                      rows={8}
                      placeholder="أدخل وصف القسم"
                      required
                    />
                    <div className={styles.aboutDescriptionPreview}>
                      <h4 className={styles.previewTitle}>معاينة النص:</h4>
                      <div className={styles.previewContent}>
                        {aboutData?.description || 'لم يتم إدخال أي نص بعد'}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={styles.aboutInfoItem}>
                  <label htmlFor="read_more_link" className={styles.aboutInfoLabel}>
                    <span className={styles.aboutLabelIcon}><FaCheck /></span>
                    رابط "قراءة المزيد"
                  </label>
                  <input
                    type="text"
                    id="read_more_link"
                    className={styles.aboutInfoInput}
                    value={aboutData?.read_more_link || '/about'}
                    onChange={(e) => setAboutData(aboutData ? { ...aboutData, read_more_link: e.target.value } : null)}
                    placeholder="مثال: /about"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'president' && (
            <div className={styles.aboutSection}>
              <div className={styles.aboutSectionHeader}>
                <h3 className={styles.aboutSectionTitle}>
                  <span className={styles.aboutSectionIcon}><FaUserTie /></span>
                  كلمة رئيس الجامعة
                </h3>
              </div>
              
              <div className={styles.presidentContainer}>
                <div className={styles.presidentInfoColumn}>
                  <div className={styles.presidentFormGroup}>
                    <label htmlFor="president_title" className={styles.presidentLabel}>
                      <span className={styles.aboutLabelIcon}><FaHeading /></span>
                      العنوان
                    </label>
                    <input
                      type="text"
                      id="president_title"
                      className={styles.presidentInput}
                      value={presidentData?.title || ''}
                      onChange={(e) => setPresidentData(presidentData ? { ...presidentData, title: e.target.value } : null)}
                      placeholder="أدخل عنوان الكلمة"
                      required
                    />
                  </div>
                  
                  <div className={styles.presidentFormGroup}>
                    <label htmlFor="president_message" className={styles.presidentLabel}>
                      <span className={styles.aboutLabelIcon}><FaQuoteRight /></span>
                      نص الكلمة
                    </label>
                    <textarea
                      id="president_message"
                      className={styles.presidentTextarea}
                      value={presidentData?.message || ''}
                      onChange={(e) => setPresidentData(presidentData ? { ...presidentData, message: e.target.value } : null)}
                      rows={5}
                      placeholder="أدخل نص كلمة رئيس الجامعة"
                      required
                    />
                  </div>
                  
                  <div className={styles.presidentFormGroup}>
                    <label htmlFor="president_name" className={styles.presidentLabel}>
                      <span className={styles.aboutLabelIcon}><FaUser /></span>
                      اسم رئيس الجامعة
                    </label>
                    <input
                      type="text"
                      id="president_name"
                      className={styles.presidentInput}
                      value={presidentData?.president_name || ''}
                      onChange={(e) => setPresidentData(presidentData ? { ...presidentData, president_name: e.target.value } : null)}
                      placeholder="أدخل اسم رئيس الجامعة"
                      required
                    />
                  </div>
                  
                  <div className={styles.presidentFormGroup}>
                    <label htmlFor="president_title_pos" className={styles.presidentLabel}>
                      <span className={styles.aboutLabelIcon}><FaBriefcase /></span>
                      المنصب
                    </label>
                    <input
                      type="text"
                      id="president_title_pos"
                      className={styles.presidentInput}
                      value={presidentData?.president_title || ''}
                      onChange={(e) => setPresidentData(presidentData ? { ...presidentData, president_title: e.target.value } : null)}
                      placeholder="مثال: رئيس الجامعة"
                      required
                    />
                  </div>
                </div>
                
                <div className={styles.presidentImageColumn}>
                  <div className={styles.presidentFormGroup}>
                    <label className={styles.presidentLabel}>
                      <span className={styles.aboutLabelIcon}><FaImage /></span>
                      صورة رئيس الجامعة
                    </label>
                    <div className={styles.presidentImageUpload}>
                      <label htmlFor="president_image" className={styles.presidentUploadButton}>
                        <FaUpload /> اختر صورة رئيس الجامعة
                      </label>
                      <input
                        type="file"
                        id="president_image"
                        onChange={handleImageChange}
                        accept="image/*"
                        className={styles.presidentFileInput}
                      />
                      {imagePreview ? (
                        <div className={styles.presidentImagePreview}>
                          <Image
                            src={imagePreview}
                            alt="صورة رئيس الجامعة"
                            width={300}
                            height={300}
                            className={styles.presidentPreviewImage}
                          />
                        </div>
                      ) : (
                        <div className={styles.presidentImagePreview} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa', height: '300px' }}>
                          <div style={{ textAlign: 'center', color: '#adb5bd' }}>
                            <FaUserTie style={{ fontSize: '4rem', marginBottom: '1rem' }} />
                            <p>لم يتم اختيار صورة</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {presidentData && (
                <div className={styles.presidentPreviewContainer}>
                  <div className={styles.presidentPreviewTitle}>
                    <span className={styles.aboutLabelIcon}><FaEye /></span>
                    معاينة كلمة رئيس الجامعة
                  </div>
                  <div className={styles.presidentPreviewContent}>
                    <div className={styles.presidentPreviewImageContainer}>
                      {imagePreview ? (
                        <Image
                          src={imagePreview}
                          alt={presidentData.president_name || 'رئيس الجامعة'}
                          width={150}
                          height={150}
                          className={styles.presidentPreviewImage}
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e9ecef' }}>
                          <FaUserTie size={48} color="#adb5bd" />
                        </div>
                      )}
                    </div>
                    <div className={styles.presidentPreviewText}>
                      <h3 className={styles.presidentPreviewHeading}>{presidentData.title || 'عنوان الكلمة'}</h3>
                      <p className={styles.presidentPreviewMessage}>{presidentData.message || 'نص الكلمة سيظهر هنا...'}</p>
                      <div className={styles.presidentPreviewSignature}>{presidentData.president_name || 'اسم رئيس الجامعة'}</div>
                      <div className={styles.presidentPreviewPosition}>{presidentData.president_title || 'المنصب'}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className={styles.actionButtons}>
            <button 
              type="submit" 
              className={styles.modernSaveButton}
              disabled={isSaving}
            >
              {isSaving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AboutEditor;