'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './HomeEditor.module.css';
import { FaArrowUp, FaArrowDown, FaTrash, FaPlus, FaImage, FaCheck, FaTimes, FaEye, FaLink, FaFont, FaAlignLeft, FaToggleOn, FaToggleOff, FaUpload, FaEdit } from 'react-icons/fa';

interface Slide {
  slide_id: number;
  title: string;
  description: string;
  image_path: string;
  button_text: string;
  button_url: string;
  slide_order: number;
  active: boolean;
}

const HomeEditor = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [selectedSlide, setSelectedSlide] = useState<Slide | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch('/api/api_pages/hero');
        if (response.ok) {
          const data = await response.json();
          setSlides(data);
        }
      } catch (error) {
        console.error('خطأ في جلب بيانات العرض الرئيسي:', error);
        setMessage({ text: 'حدث خطأ أثناء جلب البيانات', type: 'error' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlides();
  }, []);

  const handleSlideSelect = (slide: Slide) => {
    setSelectedSlide(slide);
    setImagePreview(slide.image_path);
  };

  const handleNewSlide = () => {
    const newSlide: Slide = {
      slide_id: Date.now(), // temporary id
      title: '',
      description: '',
      image_path: '',
      button_text: 'اكتشف المزيد',
      button_url: '#',
      slide_order: slides.length + 1,
      active: true
    };
    
    setSelectedSlide(newSlide);
    setImagePreview(null);
  };

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
        if (selectedSlide) {
          setSelectedSlide({ ...selectedSlide, image_path: base64String });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSlide = async () => {
    if (!selectedSlide) return;
    
    setIsSaving(true);
    setMessage({ text: '', type: '' });
    
    try {
      // Check if this is a new slide or an existing one
      const isNewSlide = !slides.some(slide => slide.slide_id === selectedSlide.slide_id);
      
      const method = isNewSlide ? 'POST' : 'PUT';
      const url = isNewSlide ? '/api/api_pages/hero' : '/api/api_pages/hero';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedSlide),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'حدث خطأ أثناء حفظ البيانات');
      }

      const savedSlide = await response.json();
      
      // Update the slides list
      if (isNewSlide) {
        setSlides([...slides, savedSlide]);
      } else {
        setSlides(slides.map(slide => 
          slide.slide_id === selectedSlide.slide_id ? savedSlide : slide
        ));
      }
      
      setMessage({ text: 'تم حفظ الشريحة بنجاح', type: 'success' });
    } catch (error) {
      console.error('خطأ في حفظ الشريحة:', error);
      setMessage({ 
        text: error instanceof Error ? error.message : 'حدث خطأ أثناء حفظ الشريحة', 
        type: 'error' 
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteSlide = async (slideId: number) => {
    if (!confirm('هل أنت متأكد من حذف هذه الشريحة؟')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/api_pages/hero?id=${slideId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'حدث خطأ أثناء حذف الشريحة');
      }

      // Remove the slide from the list
      setSlides(slides.filter(slide => slide.slide_id !== slideId));
      
      // If the deleted slide was selected, clear the selection
      if (selectedSlide && selectedSlide.slide_id === slideId) {
        setSelectedSlide(null);
        setImagePreview(null);
      }
      
      setMessage({ text: 'تم حذف الشريحة بنجاح', type: 'success' });
    } catch (error) {
      console.error('خطأ في حذف الشريحة:', error);
      setMessage({ 
        text: error instanceof Error ? error.message : 'حدث خطأ أثناء حذف الشريحة', 
        type: 'error' 
      });
    }
  };

  const handleMoveSlide = async (slideId: number, direction: 'up' | 'down') => {
    const slideIndex = slides.findIndex(slide => slide.slide_id === slideId);
    if (slideIndex === -1) return;
    
    const newSlides = [...slides];
    
    if (direction === 'up' && slideIndex > 0) {
      // Swap with the previous slide
      [newSlides[slideIndex], newSlides[slideIndex - 1]] = 
      [newSlides[slideIndex - 1], newSlides[slideIndex]];
    } else if (direction === 'down' && slideIndex < newSlides.length - 1) {
      // Swap with the next slide
      [newSlides[slideIndex], newSlides[slideIndex + 1]] = 
      [newSlides[slideIndex + 1], newSlides[slideIndex]];
    } else {
      return; // Can't move further
    }
    
    // Update the order property
    const updatedSlides = newSlides.map((slide, index) => ({
      ...slide,
      slide_order: index + 1
    }));
    
    try {
      const response = await fetch('/api/api_pages/hero', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slides: updatedSlides.map(slide => ({
            id: slide.slide_id,
            order: slide.slide_order
          }))
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'حدث خطأ أثناء تغيير ترتيب الشرائح');
      }

      setSlides(updatedSlides);
    } catch (error) {
      console.error('خطأ في تغيير ترتيب الشرائح:', error);
      setMessage({ 
        text: error instanceof Error ? error.message : 'حدث خطأ أثناء تغيير ترتيب الشرائح', 
        type: 'error' 
      });
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
        <h1 className={styles.editorTitle}>تعديل العرض الرئيسي</h1>
      </div>
          
      <div className={styles.editorContent}>
        {message.text && (
          <div className={message.type === 'success' ? styles.successMessage : styles.errorMessage}>
            {message.type === 'success' ? <FaCheck /> : <FaTimes />}
            {message.text}
          </div>
        )}

        <div className={styles.editorLayout}>
          <div className={styles.sidePanel}>
            <h2 className={styles.sectionTitle}>الشرائح</h2>
            
            <div className={styles.itemsList}>
              {slides.map((slide) => (
                <div 
                  key={slide.slide_id} 
                  className={`${styles.item} ${selectedSlide?.slide_id === slide.slide_id ? styles.selected : ''}`}
                  onClick={() => handleSlideSelect(slide)}
                >
                  <div className={styles.itemPreview}>
                    <Image
                      src={slide.image_path}
                      alt={slide.title}
                      width={60}
                      height={60}
                      className={styles.itemThumb}
                    />
                    <div className={styles.itemInfo}>
                      <h3 className={styles.itemTitle}>{slide.title || 'شريحة بدون عنوان'}</h3>
                      <span className={styles.itemMeta}>الترتيب: {slide.slide_order}</span>
                    </div>
                  </div>
                  
                  <div className={styles.itemActions}>
                    <button
                      type="button"
                      className={styles.iconButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveSlide(slide.slide_id, 'up');
                      }}
                      disabled={slide.slide_order === 1}
                      title="نقل للأعلى"
                    >
                      <FaArrowUp />
                    </button>
                    <button
                      type="button"
                      className={styles.iconButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveSlide(slide.slide_id, 'down');
                      }}
                      disabled={slide.slide_order === slides.length}
                      title="نقل للأسفل"
                    >
                      <FaArrowDown />
                    </button>
                    <button 
                      type="button"
                      className={`${styles.iconButton} ${styles.deleteButton}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSlide(slide.slide_id);
                      }}
                      title="حذف"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              type="button"
              className={styles.addButton}
              onClick={handleNewSlide}
            >
              <FaPlus /> إضافة شريحة جديدة
            </button>
          </div>
          
          <div className={styles.mainPanel}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.labelIcon}>
                {selectedSlide ? (selectedSlide.title ? <FaEdit /> : <FaPlus />) : <FaImage />}
              </span>
              {selectedSlide ? (
                selectedSlide.title ? `تعديل: ${selectedSlide.title}` : 'شريحة جديدة'
              ) : 'اختر شريحة للتعديل'}
            </h2>

            {selectedSlide ? (
              <div className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="title" className={styles.fieldLabel}>
                    <span className={styles.labelIcon}>📝</span>
                    العنوان
                  </label>
                  <input
                    type="text"
                    id="title"
                    className={styles.input}
                    value={selectedSlide.title}
                    onChange={(e) => setSelectedSlide({ ...selectedSlide, title: e.target.value })}
                    placeholder="أدخل عنوان الشريحة"
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="description" className={styles.fieldLabel}>
                    <span className={styles.labelIcon}>📄</span>
                    الوصف
                  </label>
                  <textarea
                    id="description"
                    className={styles.textarea}
                    value={selectedSlide.description}
                    onChange={(e) => setSelectedSlide({ ...selectedSlide, description: e.target.value })}
                    placeholder="أدخل وصف الشريحة"
                    rows={3}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="button_text" className={styles.fieldLabel}>
                    <span className={styles.labelIcon}>🔘</span>
                    نص الزر
                  </label>
                  <input
                    type="text"
                    id="button_text"
                    className={styles.input}
                    value={selectedSlide.button_text}
                    onChange={(e) => setSelectedSlide({ ...selectedSlide, button_text: e.target.value })}
                    placeholder="مثال: اكتشف المزيد"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="button_url" className={styles.fieldLabel}>
                    <span className={styles.labelIcon}>🔗</span>
                    رابط الزر
                  </label>
                  <input
                    type="text"
                    id="button_url"
                    className={styles.input}
                    value={selectedSlide.button_url}
                    onChange={(e) => setSelectedSlide({ ...selectedSlide, button_url: e.target.value })}
                    placeholder="مثال: /about"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="active" className={styles.fieldLabel}>
                    <span className={styles.labelIcon}>{selectedSlide.active ? <FaCheck /> : <FaTimes />}</span>
                    الحالة
                  </label>
                  <select
                    id="active"
                    className={styles.select}
                    value={selectedSlide.active ? '1' : '0'}
                    onChange={(e) => setSelectedSlide({ ...selectedSlide, active: e.target.value === '1' })}
                  >
                    <option value="1">نشط</option>
                    <option value="0">غير نشط</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.fieldLabel}>
                    <span className={styles.labelIcon}><FaImage /></span>
                    صورة الشريحة
                  </label>
                  <div className={styles.imageContainer}>
                    <div className={styles.imageUploadArea}>
                      <label htmlFor="slide_image" className={styles.uploadButton}>
                        <FaImage /> اختر صورة للشريحة
                      </label>
                      <input
                        type="file"
                        id="slide_image"
                        onChange={handleImageChange}
                        accept="image/*"
                        className={styles.fileInput}
                      />
                    </div>
                    {imagePreview ? (
                      <div className={styles.imagePreview}>
                        <Image
                          src={imagePreview}
                          alt="معاينة الصورة"
                          width={300}
                          height={200}
                          className={styles.previewImage}
                        />
                      </div>
                    ) : (
                      <div className={styles.imagePreview} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
                        <div style={{ textAlign: 'center', color: '#adb5bd' }}>
                          <FaImage style={{ fontSize: '3rem', marginBottom: '0.5rem' }} />
                          <p>لم يتم اختيار صورة</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <div className={styles.fieldLabel} style={{ justifyContent: 'space-between' }}>
                    <div>
                      <span className={styles.labelIcon}><FaEye /></span>
                      معاينة الشريحة
                    </div>
                    <button 
                      type="button"
                      onClick={() => setShowPreview(!showPreview)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0056b3' }}
                    >
                      {showPreview ? <FaToggleOn size={20} /> : <FaToggleOff size={20} />}
                    </button>
                  </div>
                  
                  {showPreview && selectedSlide && (
                    <div className={styles.slidePreview}>
                      <div className={styles.slidePreviewTitle}>
                        <span className={styles.labelIcon}><FaEye /></span>
                        معاينة مباشرة للشريحة
                      </div>
                      <div className={styles.slidePreviewContent}>
                        {imagePreview ? (
                          <Image
                            src={imagePreview}
                            alt={selectedSlide.title || 'شريحة'}
                            width={800}
                            height={300}
                            className={styles.slidePreviewImage}
                          />
                        ) : (
                          <div className={styles.slidePreviewImage} style={{ backgroundColor: '#e9ecef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FaImage size={48} color="#adb5bd" />
                          </div>
                        )}
                        <div className={styles.slidePreviewOverlay}>
                          <h2 className={styles.slidePreviewHeading}>{selectedSlide.title || 'عنوان الشريحة'}</h2>
                          <p className={styles.slidePreviewDescription}>{selectedSlide.description || 'وصف الشريحة يظهر هنا'}</p>
                          {selectedSlide.button_text && (
                            <button className={styles.slidePreviewButton}>
                              {selectedSlide.button_text}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className={styles.actionButtons}>
                  <button 
                    type="button" 
                    className={styles.saveButton}
                    onClick={handleSaveSlide}
                    disabled={isSaving}
                  >
                    {isSaving ? 'جاري الحفظ...' : (
                      <>
                        <FaCheck /> حفظ الشريحة
                      </>
                    )}
                  </button>
                  <button 
                    type="button" 
                    className={styles.cancelButton}
                    onClick={() => setSelectedSlide(null)}
                    disabled={isSaving}
                  >
                    <FaTimes /> إلغاء
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <FaImage />
                </div>
                <p>اختر شريحة من القائمة للتعديل أو أضف شريحة جديدة</p>
                <button 
                  className={styles.emptyAddButton}
                  onClick={handleNewSlide}
                >
                  <FaPlus /> إضافة شريحة جديدة
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeEditor;