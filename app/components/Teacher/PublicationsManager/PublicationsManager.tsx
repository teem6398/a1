'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './PublicationsManager.module.css';
import { Publication, TeacherAdvice } from '../interfaces';
import { FaLightbulb, FaTrash, FaEdit, FaArrowLeft, FaImage, FaFilePdf, FaFileVideo, FaFilePowerpoint, FaFile } from 'react-icons/fa';
import { useTheme } from '../../../lib/theme-context';
import Image from 'next/image';

interface PublicationsManagerProps {
  teacherId: string;
  lang: string;
}

const PublicationsManager: React.FC<PublicationsManagerProps> = ({ teacherId, lang }) => {
  const router = useRouter();
  const { theme } = useTheme();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [advice, setAdvice] = useState<TeacherAdvice[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('list'); // 'list', 'add', 'edit', 'advice'
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [selectedAdvice, setSelectedAdvice] = useState<TeacherAdvice | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ type: 'publication' | 'advice'; id: number | string } | null>(null);
  
  // نموذج إضافة منشور جديد
  const [formData, setFormData] = useState({
    title_ar: '',
    title_en: '',
    description_ar: '',
    description_en: '',
    media_type: 'image', // الافتراضي هو صورة
    selectedCategories: [] as number[],
    selectedTags: [] as number[],
    file_path: '',
    thumbnail_path: ''
  });

  // نموذج إضافة نصيحة جديدة
  const [adviceForm, setAdviceForm] = useState({
    title_ar: '',
    title_en: '',
    content_ar: '',
    content_en: '',
    category: ''
  });
  
  // مراجع الملفات
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  
  // جلب منشورات المعلم
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/api_academics/teacher/${teacherId}/publications`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setPublications(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching publications:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/api_academics/publications/categories');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    
    const fetchTags = async () => {
      try {
        const response = await fetch('/api/api_academics/publications/tags');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setTags(data);
      } catch (err) {
        console.error('Error fetching tags:', err);
      }
    };

    const fetchAdvice = async () => {
      try {
        const response = await fetch(`/api/api_academics/teacher/${teacherId}/advice`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setAdvice(data);
      } catch (err) {
        console.error('Error fetching advice:', err);
      }
    };
    
    fetchPublications();
    fetchCategories();
    fetchTags();
    fetchAdvice();
  }, [teacherId]);
  
  // تحديث البيانات في النموذج
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // تحديث بيانات نموذج النصائح
  const handleAdviceInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAdviceForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // معالجة تحديد التصنيفات المتعددة
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => parseInt(option.value));
    setFormData(prev => ({
      ...prev,
      selectedCategories: selectedOptions
    }));
  };
  
  // معالجة تحديد الكلمات المفتاحية المتعددة
  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => parseInt(option.value));
    setFormData(prev => ({
      ...prev,
      selectedTags: selectedOptions
    }));
  };
  
  // تحميل الملفات
  const handleFileUpload = async () => {
    if (!fileInputRef.current?.files?.length) {
      return { success: false, error: lang === 'ar' ? 'الرجاء اختيار ملف' : 'Please select a file' };
    }
    
    try {
      setIsUploading(true);
      
      const uploadFormData = new FormData();
      uploadFormData.append('file', fileInputRef.current.files[0]);
      uploadFormData.append('mediaType', formData.media_type);
      uploadFormData.append('teacherId', teacherId);
      
      if (thumbnailInputRef.current?.files?.length) {
        uploadFormData.append('thumbnail', thumbnailInputRef.current.files[0]);
      }
      
      console.log('Uploading file...');
      const response = await fetch('/api/api_academics/publications/upload', {
        method: 'POST',
        body: uploadFormData
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        console.error('Upload error response:', responseData);
        throw new Error(responseData.error || `خطأ في التحميل: ${response.status}`);
      }
      
      console.log('Upload successful:', responseData);
      
      // تحديث مسارات الملفات في النموذج
      setFormData(prev => ({
        ...prev,
        file_path: responseData.filePath,
        thumbnail_path: responseData.thumbnailPath
      }));
      
      return { success: true };
      
    } catch (err: any) {
      console.error('Error uploading file:', err);
      return { success: false, error: err.message };
    } finally {
      setIsUploading(false);
    }
  };
  
  // إرسال النموذج
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setError(null);
      
      // تحميل الملفات أولاً
      if (!formData.file_path) {
        console.log('No file path found, uploading file...');
        const uploadResult = await handleFileUpload();
        
        if (!uploadResult.success) {
          alert(uploadResult.error);
          setIsLoading(false);
          return;
        }
      }
      
      // إعداد البيانات للإرسال
      const publicationData = {
        teacher_id: teacherId,
        title_ar: formData.title_ar,
        title_en: formData.title_en,
        description_ar: formData.description_ar,
        description_en: formData.description_en,
        media_type: formData.media_type,
        file_path: formData.file_path,
        thumbnail_path: formData.thumbnail_path,
        categories: formData.selectedCategories,
        tags: formData.selectedTags
      };
      
      console.log('Submitting publication data:', publicationData);
      
      // إرسال البيانات إلى الخادم
      const response = await fetch('/api/api_academics/publications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(publicationData)
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        console.error('Publication submission error:', responseData);
        throw new Error(responseData.error || `خطأ في إضافة المنشور: ${response.status}`);
      }
      
      console.log('Publication added successfully:', responseData);
      
      // إعادة تعيين النموذج
      setFormData({
        title_ar: '',
        title_en: '',
        description_ar: '',
        description_en: '',
        media_type: 'image',
        selectedCategories: [],
        selectedTags: [],
        file_path: '',
        thumbnail_path: ''
      });
      
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
      
      // إعادة تحميل المنشورات
      console.log('Reloading publications list...');
      const updatedResponse = await fetch(`/api/api_academics/teacher/${teacherId}/publications`);
      
      if (!updatedResponse.ok) {
        console.warn('Failed to reload publications:', await updatedResponse.text());
      } else {
        setPublications(await updatedResponse.json());
      }
      
      // العودة إلى قائمة المنشورات
      setActiveTab('list');
      
    } catch (err: any) {
      console.error('Error submitting publication:', err);
      setError(err.message);
      alert(lang === 'ar' ? `حدث خطأ: ${err.message}` : `Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // إرسال نموذج النصيحة
  const handleAdviceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setError(null);
      
      // إعداد البيانات للإرسال
      const adviceData = {
        teacher_id: teacherId,
        title_ar: adviceForm.title_ar,
        title_en: adviceForm.title_en,
        content_ar: adviceForm.content_ar,
        content_en: adviceForm.content_en,
        category: adviceForm.category
      };
      
      console.log('Submitting advice data:', adviceData);
      
      // إرسال البيانات إلى الخادم
      const response = await fetch(`/api/api_academics/teacher/${teacherId}/advice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(adviceData)
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        console.error('Advice submission error:', responseData);
        throw new Error(responseData.error || `خطأ في إضافة النصيحة: ${response.status}`);
      }
      
      console.log('Advice added successfully:', responseData);
      
      // إعادة تعيين النموذج
      setAdviceForm({
        title_ar: '',
        title_en: '',
        content_ar: '',
        content_en: '',
        category: ''
      });
      
      // إعادة تحميل النصائح
      const updatedResponse = await fetch(`/api/api_academics/teacher/${teacherId}/advice`);
      
      if (!updatedResponse.ok) {
        console.warn('Failed to reload advice:', await updatedResponse.text());
      } else {
        setAdvice(await updatedResponse.json());
      }
      
      // العودة إلى قائمة النصائح
      setActiveTab('advice');
      
    } catch (err: any) {
      console.error('Error submitting advice:', err);
      setError(err.message);
      alert(lang === 'ar' ? `حدث خطأ: ${err.message}` : `Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  // تأكيد الحذف
  const confirmDelete = (type: 'publication' | 'advice', id: number | string) => {
    setItemToDelete({ type, id });
    setShowDeleteConfirm(true);
  };

  // إلغاء الحذف
  const cancelDelete = () => {
    setItemToDelete(null);
    setShowDeleteConfirm(false);
  };

  // تنفيذ الحذف
  const executeDelete = async () => {
    if (!itemToDelete) return;

    try {
      setIsLoading(true);
      
      if (itemToDelete.type === 'publication') {
        const response = await fetch(`/api/api_academics/publications/${itemToDelete.id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        setPublications(publications.filter(pub => pub.publication_id !== itemToDelete.id));
      } else {
        const response = await fetch(`/api/api_academics/teacher/${teacherId}/advice/${itemToDelete.id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        setAdvice(advice.filter(adv => adv.advice_id !== itemToDelete.id));
      }
      
      setShowDeleteConfirm(false);
      setItemToDelete(null);
      
    } catch (err: any) {
      console.error('Error deleting item:', err);
      alert(lang === 'ar' ? `حدث خطأ أثناء الحذف: ${err.message}` : `Error deleting: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // بدء تعديل منشور
  const startEditPublication = (publication: Publication) => {
    setSelectedPublication(publication);
    setFormData({
      title_ar: publication.title_ar || '',
      title_en: publication.title_en || '',
      description_ar: publication.description_ar || '',
      description_en: publication.description_en || '',
      media_type: publication.mediaType || 'image',
      selectedCategories: publication.categories || [],
      selectedTags: publication.tags || [],
      file_path: publication.file_path || '',
      thumbnail_path: publication.thumbnail_path || ''
    });
    setActiveTab('edit');
  };

  // بدء تعديل نصيحة
  const startEditAdvice = (advice: TeacherAdvice) => {
    setSelectedAdvice(advice);
    setAdviceForm({
      title_ar: advice.title_ar || '',
      title_en: advice.title_en || '',
      content_ar: advice.content_ar || '',
      content_en: advice.content_en || '',
      category: advice.category || ''
    });
    setActiveTab('edit-advice');
  };

  // تحديث منشور
  const handleUpdatePublication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPublication) return;

    try {
      setIsLoading(true);
      
      // تحميل الملفات الجديدة إذا تم تحديدها
      if (selectedFile) {
        const uploadResult = await handleFileUpload();
        if (!uploadResult.success) {
          alert(uploadResult.error);
          setIsLoading(false);
          return;
        }
      }

      const publicationData = {
        publication_id: selectedPublication.publication_id,
        teacher_id: teacherId,
        title_ar: formData.title_ar,
        title_en: formData.title_en,
        description_ar: formData.description_ar,
        description_en: formData.description_en,
        media_type: formData.media_type,
        file_path: formData.file_path,
        thumbnail_path: formData.thumbnail_path,
        categories: formData.selectedCategories,
        tags: formData.selectedTags
      };

      const response = await fetch(`/api/api_academics/publications/${selectedPublication.publication_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(publicationData)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // تحديث القائمة
      const updatedResponse = await fetch(`/api/api_academics/teacher/${teacherId}/publications`);
      if (updatedResponse.ok) {
        setPublications(await updatedResponse.json());
      }

      setSelectedPublication(null);
      setActiveTab('list');
      
    } catch (err: any) {
      console.error('Error updating publication:', err);
      alert(lang === 'ar' ? `حدث خطأ: ${err.message}` : `Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // تحديث نصيحة
  const handleUpdateAdvice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAdvice) return;

    try {
      setIsLoading(true);

      const adviceData = {
        advice_id: selectedAdvice.advice_id,
        teacher_id: teacherId,
        title_ar: adviceForm.title_ar,
        title_en: adviceForm.title_en,
        content_ar: adviceForm.content_ar,
        content_en: adviceForm.content_en,
        category: adviceForm.category
      };

      const response = await fetch(`/api/api_academics/teacher/${teacherId}/advice/${selectedAdvice.advice_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(adviceData)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // تحديث القائمة
      const updatedResponse = await fetch(`/api/api_academics/teacher/${teacherId}/advice`);
      if (updatedResponse.ok) {
        setAdvice(await updatedResponse.json());
      }

      setSelectedAdvice(null);
      setActiveTab('advice');
      
    } catch (err: any) {
      console.error('Error updating advice:', err);
      alert(lang === 'ar' ? `حدث خطأ: ${err.message}` : `Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  // تحديد أنواع الملفات المقبولة
  const getAcceptedFileTypes = () => {
    switch(formData.media_type) {
      case 'image':
        return '.jpg,.jpeg,.png,.gif,.webp';
      case 'video':
        return '.mp4,.webm,.mov,.avi';
      case 'pdf':
        return '.pdf';
      case 'powerpoint':
        return '.ppt,.pptx';
      default:
        return '.jpg,.jpeg,.png,.pdf,.mp4,.webm,.ppt,.pptx';
    }
  };
  
  // الحصول على أيقونة لنوع الوسائط
  const getMediaTypeIcon = (mediaType: string) => {
    switch(mediaType) {
      case 'video':
        return <FaFileVideo />;
      case 'image':
        return <FaImage />;
      case 'pdf':
        return <FaFilePdf />;
      case 'powerpoint':
        return <FaFilePowerpoint />;
      default:
        return <FaFile />;
    }
  };
  
  // ترجمة نوع الوسائط
  const translateMediaType = (mediaType: string) => {
    if (lang === 'ar') {
      switch(mediaType) {
        case 'video':
          return 'فيديو';
        case 'image':
          return 'صورة';
        case 'pdf':
          return 'ملف PDF';
        case 'powerpoint':
          return 'عرض تقديمي';
        default:
          return 'ملف';
      }
    } else {
      return mediaType.charAt(0).toUpperCase() + mediaType.slice(1);
    }
  };
  
  // معالجة تغيير الملف
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };
  
  return (
    <div className={styles.publicationsManager} data-theme={theme}>
      <button 
        className={styles.backButton}
        onClick={() => router.push(`/teacher-profile/${teacherId}`)}
      >
        <FaArrowLeft className={styles.backButtonIcon} />
        {lang === 'ar' ? 'العودة لصفحة المعلم' : 'Back to Teacher Profile'}
      </button>
      
      <div className={styles.tabs}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'list' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('list')}
        >
          {lang === 'ar' ? 'قائمة المنشورات' : 'Publications List'}
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'add' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('add')}
        >
          {lang === 'ar' ? 'إضافة منشور' : 'Add Publication'}
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'advice' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('advice')}
        >
          {lang === 'ar' ? 'النصائح والإرشادات' : 'Advice & Tips'}
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'add-advice' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('add-advice')}
        >
          {lang === 'ar' ? 'إضافة نصيحة' : 'Add Advice'}
        </button>
      </div>
      
      {/* مربع حوار تأكيد الحذف */}
      {showDeleteConfirm && (
        <div className={styles.deleteConfirmOverlay}>
          <div className={styles.deleteConfirmDialog}>
            <h3>
              {lang === 'ar' 
                ? `هل أنت متأكد من حذف ${itemToDelete?.type === 'publication' ? 'المنشور' : 'النصيحة'}؟`
                : `Are you sure you want to delete this ${itemToDelete?.type}?`
              }
            </h3>
            <p className={styles.deleteWarning}>
              {lang === 'ar'
                ? 'لا يمكن التراجع عن هذا الإجراء.'
                : 'This action cannot be undone.'
              }
            </p>
            <div className={styles.deleteConfirmActions}>
              <button
                onClick={cancelDelete}
                className={styles.cancelButton}
                disabled={isLoading}
              >
                {lang === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={executeDelete}
                className={styles.deleteButton}
                disabled={isLoading}
              >
                {isLoading 
                  ? (lang === 'ar' ? 'جاري الحذف...' : 'Deleting...')
                  : (lang === 'ar' ? 'نعم، احذف' : 'Yes, Delete')
                }
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* قائمة المنشورات */}
      {activeTab === 'list' && (
        <div className={styles.publicationsList}>
          <h2>{lang === 'ar' ? 'قائمة المنشورات' : 'Publications List'}</h2>
          
          {isLoading ? (
            <div className={styles.loading}>
              {lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}
            </div>
          ) : publications.length === 0 ? (
            <div className={styles.noData}>
              {lang === 'ar' ? 'لا توجد منشورات حالياً' : 'No publications available'}
            </div>
          ) : (
            <div className={styles.publicationsGrid}>
              {publications.map((pub) => (
                <div key={pub.publication_id} className={styles.publicationCard}>
                  <div className={styles.publicationHeader}>
                    <h3>{pub.title_ar || pub.title_en}</h3>
                    <div className={styles.publicationActions}>
                      <button 
                        className={styles.editButton}
                        onClick={() => startEditPublication(pub)}
                        title={lang === 'ar' ? 'تعديل' : 'Edit'}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className={styles.deleteButton}
                        onClick={() => confirmDelete('publication', pub.publication_id)}
                        title={lang === 'ar' ? 'حذف' : 'Delete'}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  
                  <div className={styles.publicationBody}>
                    {/* عرض الصورة المصغرة */}
                    <div className={styles.thumbnailContainer}>
                      {pub.thumbnail_path ? (
                        <Image 
                          src={pub.thumbnail_path} 
                          alt={pub.title_ar || pub.title_en || ''} 
                          width={300} 
                          height={140}
                          className={styles.thumbnailImage}
                        />
                      ) : (
                        <div className={styles.noThumbnail}>
                          {getMediaTypeIcon(pub.mediaType || 'file')}
                        </div>
                      )}
                    </div>
                    
                    {pub.description_ar && <p>{pub.description_ar}</p>}
                    
                    <div className={styles.publicationMeta}>
                      <div className={styles.publicationType}>
                        {getMediaTypeIcon(pub.mediaType || 'file')}
                        <span style={{ marginRight: '5px', marginLeft: '5px' }}>
                          {translateMediaType(pub.mediaType || 'file')}
                      </span>
                    </div>
                    
                      {pub.category && (
                        <div className={styles.publicationCategory}>
                          {pub.category}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* إضافة منشور */}
      {activeTab === 'add' && (
        <div className={styles.addPublication}>
          <h2>{lang === 'ar' ? 'إضافة منشور جديد' : 'Add New Publication'}</h2>
          
          <form onSubmit={handleSubmit} className={styles.publicationForm}>
            <div className={styles.formGroup}>
              <label htmlFor="title_ar">
                {lang === 'ar' ? 'العنوان (بالعربية)' : 'Title (Arabic)'}*
              </label>
              <input
                type="text"
                id="title_ar"
                name="title_ar"
                value={formData.title_ar}
                onChange={handleInputChange}
                required
                className={styles.formControl}
                placeholder={lang === 'ar' ? 'أدخل عنوان المنشور بالعربية' : 'Enter publication title in Arabic'}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="title_en">
                {lang === 'ar' ? 'العنوان (بالإنجليزية)' : 'Title (English)'}*
              </label>
              <input
                type="text"
                id="title_en"
                name="title_en"
                value={formData.title_en}
                onChange={handleInputChange}
                required
                className={styles.formControl}
                placeholder={lang === 'ar' ? 'أدخل عنوان المنشور بالإنجليزية' : 'Enter publication title in English'}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="description_ar">
                {lang === 'ar' ? 'الوصف (بالعربية)' : 'Description (Arabic)'}
              </label>
              <textarea
                id="description_ar"
                name="description_ar"
                value={formData.description_ar}
                onChange={handleInputChange}
                className={styles.formControl}
                rows={4}
                placeholder={lang === 'ar' ? 'أدخل وصف المنشور بالعربية' : 'Enter publication description in Arabic'}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="description_en">
                {lang === 'ar' ? 'الوصف (بالإنجليزية)' : 'Description (English)'}
              </label>
              <textarea
                id="description_en"
                name="description_en"
                value={formData.description_en}
                onChange={handleInputChange}
                className={styles.formControl}
                rows={4}
                placeholder={lang === 'ar' ? 'أدخل وصف المنشور بالإنجليزية' : 'Enter publication description in English'}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="media_type">
                {lang === 'ar' ? 'نوع الوسائط' : 'Media Type'}*
              </label>
              <select
                id="media_type"
                name="media_type"
                value={formData.media_type}
                onChange={handleInputChange}
                required
                className={styles.formControl}
              >
                <option value="image">{lang === 'ar' ? 'صورة' : 'Image'}</option>
                <option value="video">{lang === 'ar' ? 'فيديو' : 'Video'}</option>
                <option value="pdf">{lang === 'ar' ? 'ملف PDF' : 'PDF Document'}</option>
                <option value="powerpoint">{lang === 'ar' ? 'عرض تقديمي' : 'Presentation'}</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="file">
                {lang === 'ar' ? 'الملف' : 'File'}*
              </label>
              <input
                type="file"
                id="file"
                name="file"
                ref={fileInputRef}
                accept={getAcceptedFileTypes()}
                required
                onChange={handleFileChange}
                className={styles.formControl}
              />
              <small className={styles.fileHelp}>
                {lang === 'ar' 
                  ? `أنواع الملفات المسموح بها: ${getAcceptedFileTypes().replace(/\./g, '')}`
                  : `Allowed file types: ${getAcceptedFileTypes().replace(/\./g, '')}`
                }
              </small>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="thumbnail">
                {lang === 'ar' ? 'الصورة المصغرة' : 'Thumbnail'}
              </label>
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                ref={thumbnailInputRef}
                accept=".jpg,.jpeg,.png,.gif"
                className={styles.formControl}
              />
              <small className={styles.fileHelp}>
                {lang === 'ar' 
                  ? 'أنواع الملفات المسموح بها: jpg, jpeg, png, gif'
                  : 'Allowed file types: jpg, jpeg, png, gif'
                }
              </small>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="categories">
                {lang === 'ar' ? 'التصنيفات' : 'Categories'}
              </label>
              <select
                id="categories"
                name="categories"
                multiple
                value={formData.selectedCategories.map(String)}
                onChange={handleCategoryChange}
                className={styles.formControl}
              >
                {categories.map(category => (
                  <option key={category.category_id} value={category.category_id}>
                    {lang === 'ar' ? category.name_ar : category.name_en}
                  </option>
                ))}
              </select>
              <small className={styles.selectHelp}>
                {lang === 'ar' 
                  ? 'اضغط Ctrl أو Cmd للاختيار المتعدد'
                  : 'Hold Ctrl or Cmd for multiple selection'
                }
              </small>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="tags">
                {lang === 'ar' ? 'الكلمات المفتاحية' : 'Tags'}
              </label>
              <select
                id="tags"
                name="tags"
                multiple
                value={formData.selectedTags.map(String)}
                onChange={handleTagChange}
                className={styles.formControl}
              >
                {tags.map(tag => (
                  <option key={tag.tag_id} value={tag.tag_id}>
                    {lang === 'ar' ? tag.name_ar : tag.name_en}
                  </option>
                ))}
              </select>
              <small className={styles.selectHelp}>
                {lang === 'ar' 
                  ? 'اضغط Ctrl أو Cmd للاختيار المتعدد'
                  : 'Hold Ctrl or Cmd for multiple selection'
                }
              </small>
            </div>
            
            <div className={styles.formActions}>
              <button
                type="button"
                onClick={() => setActiveTab('list')}
                className={styles.cancelButton}
                disabled={isLoading || isUploading}
              >
                {lang === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading || isUploading}
              >
                {isLoading || isUploading
                  ? (lang === 'ar' ? 'جاري الحفظ...' : 'Saving...') 
                  : (lang === 'ar' ? 'حفظ المنشور' : 'Save Publication')
                }
              </button>
            </div>
          </form>
        </div>
      )}

      {/* قائمة النصائح */}
      {activeTab === 'advice' && (
        <div className={styles.adviceList}>
          <h2>{lang === 'ar' ? 'النصائح والإرشادات' : 'Advice & Tips'}</h2>
          
          {isLoading ? (
            <div className={styles.loading}>
              {lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}
            </div>
          ) : advice.length === 0 ? (
            <div className={styles.noData}>
              {lang === 'ar' ? 'لا توجد نصائح حالياً' : 'No advice available'}
            </div>
          ) : (
            <div className={styles.adviceGrid}>
              {advice.map((adv) => (
                <div key={adv.advice_id} className={styles.adviceCard}>
                  <div className={styles.adviceHeader}>
                    <h3>{adv.title_ar || adv.title_en}</h3>
                    <FaLightbulb className={styles.adviceIcon} />
                    <div className={styles.adviceActions}>
                      <button 
                        className={styles.editButton}
                        onClick={() => startEditAdvice(adv)}
                        title={lang === 'ar' ? 'تعديل' : 'Edit'}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className={styles.deleteButton}
                        onClick={() => confirmDelete('advice', adv.advice_id)}
                        title={lang === 'ar' ? 'حذف' : 'Delete'}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  
                  <div className={styles.adviceBody}>
                    <p>{adv.content_ar || adv.content_en || ''}</p>
                    {adv.category && (
                      <div className={styles.adviceCategory}>
                        {adv.category}
                      </div>
                    )}
                    {adv.created_at && (
                      <div className={styles.adviceDate}>
                        {new Date(adv.created_at).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US')}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* إضافة نصيحة */}
      {activeTab === 'add-advice' && (
        <div className={styles.addAdvice}>
          <h2>{lang === 'ar' ? 'إضافة نصيحة جديدة' : 'Add New Advice'}</h2>
          
          <form onSubmit={handleAdviceSubmit} className={styles.adviceForm}>
            <div className={styles.formGroup}>
              <label htmlFor="title_ar">
                {lang === 'ar' ? 'العنوان (بالعربية)' : 'Title (Arabic)'}*
              </label>
              <input
                type="text"
                id="title_ar"
                name="title_ar"
                value={adviceForm.title_ar}
                onChange={handleAdviceInputChange}
                required
                className={styles.formControl}
                placeholder={lang === 'ar' ? 'أدخل عنوان النصيحة بالعربية' : 'Enter advice title in Arabic'}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="title_en">
                {lang === 'ar' ? 'العنوان (بالإنجليزية)' : 'Title (English)'}
              </label>
              <input
                type="text"
                id="title_en"
                name="title_en"
                value={adviceForm.title_en}
                onChange={handleAdviceInputChange}
                className={styles.formControl}
                placeholder={lang === 'ar' ? 'أدخل عنوان النصيحة بالإنجليزية' : 'Enter advice title in English'}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="content_ar">
                {lang === 'ar' ? 'المحتوى (بالعربية)' : 'Content (Arabic)'}*
              </label>
              <textarea
                id="content_ar"
                name="content_ar"
                value={adviceForm.content_ar}
                onChange={handleAdviceInputChange}
                required
                className={styles.formControl}
                rows={6}
                placeholder={lang === 'ar' ? 'أدخل محتوى النصيحة بالعربية' : 'Enter advice content in Arabic'}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="content_en">
                {lang === 'ar' ? 'المحتوى (بالإنجليزية)' : 'Content (English)'}
              </label>
              <textarea
                id="content_en"
                name="content_en"
                value={adviceForm.content_en}
                onChange={handleAdviceInputChange}
                className={styles.formControl}
                rows={6}
                placeholder={lang === 'ar' ? 'أدخل محتوى النصيحة بالإنجليزية' : 'Enter advice content in English'}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="category">
                {lang === 'ar' ? 'التصنيف' : 'Category'}
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={adviceForm.category}
                onChange={handleAdviceInputChange}
                className={styles.formControl}
                placeholder={lang === 'ar' ? 'مثال: نصائح أكاديمية' : 'Example: Academic Tips'}
              />
            </div>
            
            <div className={styles.formActions}>
              <button
                type="button"
                onClick={() => setActiveTab('advice')}
                className={styles.cancelButton}
                disabled={isLoading}
              >
                {lang === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading
                  ? (lang === 'ar' ? 'جاري الحفظ...' : 'Saving...') 
                  : (lang === 'ar' ? 'حفظ النصيحة' : 'Save Advice')
                }
              </button>
            </div>
          </form>
        </div>
      )}

      {/* نموذج تعديل المنشور */}
      {activeTab === 'edit' && selectedPublication && (
        <div className={styles.editPublication}>
          <h2>{lang === 'ar' ? 'تعديل المنشور' : 'Edit Publication'}</h2>
          <form onSubmit={handleUpdatePublication} className={styles.publicationForm}>
            <div className={styles.formGroup}>
              <label htmlFor="title_ar">
                {lang === 'ar' ? 'العنوان (بالعربية)' : 'Title (Arabic)'}*
              </label>
              <input
                type="text"
                id="title_ar"
                name="title_ar"
                value={formData.title_ar}
                onChange={handleInputChange}
                required
                className={styles.formControl}
                placeholder={lang === 'ar' ? 'أدخل عنوان المنشور بالعربية' : 'Enter publication title in Arabic'}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="title_en">
                {lang === 'ar' ? 'العنوان (بالإنجليزية)' : 'Title (English)'}*
              </label>
              <input
                type="text"
                id="title_en"
                name="title_en"
                value={formData.title_en}
                onChange={handleInputChange}
                required
                className={styles.formControl}
                placeholder={lang === 'ar' ? 'أدخل عنوان المنشور بالإنجليزية' : 'Enter publication title in English'}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="description_ar">
                {lang === 'ar' ? 'الوصف (بالعربية)' : 'Description (Arabic)'}
              </label>
              <textarea
                id="description_ar"
                name="description_ar"
                value={formData.description_ar}
                onChange={handleInputChange}
                className={styles.formControl}
                rows={4}
                placeholder={lang === 'ar' ? 'أدخل وصف المنشور بالعربية' : 'Enter publication description in Arabic'}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="description_en">
                {lang === 'ar' ? 'الوصف (بالإنجليزية)' : 'Description (English)'}
              </label>
              <textarea
                id="description_en"
                name="description_en"
                value={formData.description_en}
                onChange={handleInputChange}
                className={styles.formControl}
                rows={4}
                placeholder={lang === 'ar' ? 'أدخل وصف المنشور بالإنجليزية' : 'Enter publication description in English'}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="media_type">
                {lang === 'ar' ? 'نوع الوسائط' : 'Media Type'}*
              </label>
              <select
                id="media_type"
                name="media_type"
                value={formData.media_type}
                onChange={handleInputChange}
                required
                className={styles.formControl}
              >
                <option value="image">{lang === 'ar' ? 'صورة' : 'Image'}</option>
                <option value="video">{lang === 'ar' ? 'فيديو' : 'Video'}</option>
                <option value="pdf">{lang === 'ar' ? 'ملف PDF' : 'PDF Document'}</option>
                <option value="powerpoint">{lang === 'ar' ? 'عرض تقديمي' : 'Presentation'}</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="file">
                {lang === 'ar' ? 'الملف' : 'File'}*
              </label>
              <input
                type="file"
                id="file"
                name="file"
                ref={fileInputRef}
                accept={getAcceptedFileTypes()}
                required
                onChange={handleFileChange}
                className={styles.formControl}
              />
              <small className={styles.fileHelp}>
                {lang === 'ar' 
                  ? `أنواع الملفات المسموح بها: ${getAcceptedFileTypes().replace(/\./g, '')}`
                  : `Allowed file types: ${getAcceptedFileTypes().replace(/\./g, '')}`
                }
              </small>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="thumbnail">
                {lang === 'ar' ? 'الصورة المصغرة' : 'Thumbnail'}
              </label>
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                ref={thumbnailInputRef}
                accept=".jpg,.jpeg,.png,.gif"
                className={styles.formControl}
              />
              <small className={styles.fileHelp}>
                {lang === 'ar' 
                  ? 'أنواع الملفات المسموح بها: jpg, jpeg, png, gif'
                  : 'Allowed file types: jpg, jpeg, png, gif'
                }
              </small>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="categories">
                {lang === 'ar' ? 'التصنيفات' : 'Categories'}
              </label>
              <select
                id="categories"
                name="categories"
                multiple
                value={formData.selectedCategories.map(String)}
                onChange={handleCategoryChange}
                className={styles.formControl}
              >
                {categories.map(category => (
                  <option key={category.category_id} value={category.category_id}>
                    {lang === 'ar' ? category.name_ar : category.name_en}
                  </option>
                ))}
              </select>
              <small className={styles.selectHelp}>
                {lang === 'ar' 
                  ? 'اضغط Ctrl أو Cmd للاختيار المتعدد'
                  : 'Hold Ctrl or Cmd for multiple selection'
                }
              </small>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="tags">
                {lang === 'ar' ? 'الكلمات المفتاحية' : 'Tags'}
              </label>
              <select
                id="tags"
                name="tags"
                multiple
                value={formData.selectedTags.map(String)}
                onChange={handleTagChange}
                className={styles.formControl}
              >
                {tags.map(tag => (
                  <option key={tag.tag_id} value={tag.tag_id}>
                    {lang === 'ar' ? tag.name_ar : tag.name_en}
                  </option>
                ))}
              </select>
              <small className={styles.selectHelp}>
                {lang === 'ar' 
                  ? 'اضغط Ctrl أو Cmd للاختيار المتعدد'
                  : 'Hold Ctrl or Cmd for multiple selection'
                }
              </small>
            </div>
            
            <div className={styles.formActions}>
              <button
                type="button"
                onClick={() => {
                  setSelectedPublication(null);
                  setActiveTab('list');
                }}
                className={styles.cancelButton}
                disabled={isLoading || isUploading}
              >
                {lang === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading || isUploading}
              >
                {isLoading || isUploading
                  ? (lang === 'ar' ? 'جاري الحفظ...' : 'Saving...') 
                  : (lang === 'ar' ? 'حفظ التغييرات' : 'Save Changes')
                }
              </button>
            </div>
          </form>
        </div>
      )}

      {/* نموذج تعديل النصيحة */}
      {activeTab === 'edit-advice' && selectedAdvice && (
        <div className={styles.editAdvice}>
          <h2>{lang === 'ar' ? 'تعديل النصيحة' : 'Edit Advice'}</h2>
          <form onSubmit={handleUpdateAdvice} className={styles.adviceForm}>
            <div className={styles.formGroup}>
              <label htmlFor="title_ar">
                {lang === 'ar' ? 'العنوان (بالعربية)' : 'Title (Arabic)'}*
              </label>
              <input
                type="text"
                id="title_ar"
                name="title_ar"
                value={adviceForm.title_ar}
                onChange={handleAdviceInputChange}
                required
                className={styles.formControl}
                placeholder={lang === 'ar' ? 'أدخل عنوان النصيحة بالعربية' : 'Enter advice title in Arabic'}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="title_en">
                {lang === 'ar' ? 'العنوان (بالإنجليزية)' : 'Title (English)'}
              </label>
              <input
                type="text"
                id="title_en"
                name="title_en"
                value={adviceForm.title_en}
                onChange={handleAdviceInputChange}
                className={styles.formControl}
                placeholder={lang === 'ar' ? 'أدخل عنوان النصيحة بالإنجليزية' : 'Enter advice title in English'}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="content_ar">
                {lang === 'ar' ? 'المحتوى (بالعربية)' : 'Content (Arabic)'}*
              </label>
              <textarea
                id="content_ar"
                name="content_ar"
                value={adviceForm.content_ar}
                onChange={handleAdviceInputChange}
                required
                className={styles.formControl}
                rows={6}
                placeholder={lang === 'ar' ? 'أدخل محتوى النصيحة بالعربية' : 'Enter advice content in Arabic'}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="content_en">
                {lang === 'ar' ? 'المحتوى (بالإنجليزية)' : 'Content (English)'}
              </label>
              <textarea
                id="content_en"
                name="content_en"
                value={adviceForm.content_en}
                onChange={handleAdviceInputChange}
                className={styles.formControl}
                rows={6}
                placeholder={lang === 'ar' ? 'أدخل محتوى النصيحة بالإنجليزية' : 'Enter advice content in English'}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="category">
                {lang === 'ar' ? 'التصنيف' : 'Category'}
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={adviceForm.category}
                onChange={handleAdviceInputChange}
                className={styles.formControl}
                placeholder={lang === 'ar' ? 'مثال: نصائح أكاديمية' : 'Example: Academic Tips'}
              />
            </div>
            
            <div className={styles.formActions}>
              <button
                type="button"
                onClick={() => {
                  setSelectedAdvice(null);
                  setActiveTab('advice');
                }}
                className={styles.cancelButton}
                disabled={isLoading}
              >
                {lang === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading
                  ? (lang === 'ar' ? 'جاري الحفظ...' : 'Saving...') 
                  : (lang === 'ar' ? 'حفظ التغييرات' : 'Save Changes')
                }
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PublicationsManager; 