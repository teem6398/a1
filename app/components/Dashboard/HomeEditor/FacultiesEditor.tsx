'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './HomeEditor.module.css';
import { FaTrash, FaPlus, FaEdit, FaImage, FaCheck, FaTimes, FaUniversity } from 'react-icons/fa';

interface Faculty {
  faculty_id: number;
  name: string;
  description: string;
  slug: string;
  image_path: string;
  icon: string;
  programs: number;
  students: number;
  display_order: number;
  active: boolean;
}

const FacultiesEditor = () => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // دالة لإعادة جلب البيانات من الخادم
  const refreshFaculties = async () => {
    try {
      const response = await fetch('/api/api_pages/faculties');
      if (response.ok) {
        const data = await response.json();
        setFaculties(data);
        return data;
      }
    } catch (error) {
      console.error('خطأ في جلب بيانات الكليات:', error);
      setMessage({ text: 'حدث خطأ أثناء تحديث البيانات', type: 'error' });
    }
    return null;
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        await refreshFaculties();
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleSelectFaculty = (faculty: Faculty) => {
    setSelectedFaculty(faculty);
    setImagePreview(faculty.image_path);
    setIsEditing(true);
  };

  const handleNewFaculty = () => {
    const newFaculty: Faculty = {
      faculty_id: 0, // will be assigned by the server
      name: '',
      description: '',
      slug: '',
      image_path: '',
      icon: '🏫',
      programs: 0,
      students: 0,
      display_order: faculties.length + 1,
      active: true
    };
    
    setSelectedFaculty(newFaculty);
    setImagePreview(null);
    setIsEditing(true);
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
        if (selectedFaculty) {
          setSelectedFaculty({ ...selectedFaculty, image_path: base64String });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!selectedFaculty) return;
    
    const { name, value } = e.target;
    
    if (name === 'programs' || name === 'students') {
      setSelectedFaculty({
        ...selectedFaculty,
        [name]: parseInt(value) || 0
      });
    } else if (name === 'active') {
      setSelectedFaculty({
        ...selectedFaculty,
        active: value === 'true'
      });
    } else {
      setSelectedFaculty({
        ...selectedFaculty,
        [name]: value
      });
    }
  };

  const validateForm = () => {
    if (!selectedFaculty) return false;
    
    if (!selectedFaculty.name.trim()) {
      setMessage({ text: 'يرجى إدخال اسم الكلية', type: 'error' });
      return false;
    }
    
    if (!selectedFaculty.description.trim()) {
      setMessage({ text: 'يرجى إدخال وصف الكلية', type: 'error' });
      return false;
    }
    
    // التحقق من الرابط المختصر
    const slug = selectedFaculty.slug.trim();
    if (!slug) {
      setMessage({ text: 'يرجى إدخال الرابط المختصر للكلية', type: 'error' });
      return false;
    }
    
    // التحقق من تنسيق الرابط المختصر (أحرف إنجليزية وأرقام وشرطات فقط)
    const slugRegex = /^[a-zA-Z0-9-]+$/;
    if (!slugRegex.test(slug)) {
      setMessage({ text: 'الرابط المختصر يجب أن يحتوي على أحرف إنجليزية وأرقام وشرطات فقط', type: 'error' });
      return false;
    }
    
    // التحقق من عدم وجود رابط مختصر مشابه لكلية أخرى
    const isSlugDuplicate = faculties.some(faculty => 
      faculty.slug === slug && faculty.faculty_id !== selectedFaculty.faculty_id
    );
    
    if (isSlugDuplicate) {
      setMessage({ text: 'الرابط المختصر موجود بالفعل. يرجى اختيار رابط مختصر آخر', type: 'error' });
      return false;
    }
    
    if (!selectedFaculty.image_path) {
      setMessage({ text: 'يرجى اختيار صورة للكلية', type: 'error' });
      return false;
    }
    
    // التحقق من حجم الصورة إذا كانت بتنسيق base64
    if (selectedFaculty.image_path.startsWith('data:')) {
      const base64Size = Math.round((selectedFaculty.image_path.length * 3) / 4);
      if (base64Size > 2 * 1024 * 1024) { // 1MB
        setMessage({ text: 'حجم الصورة كبير جدًا. يرجى استخدام صورة أصغر من 2 ميجابايت', type: 'error' });
        return false;
      }
    }
    
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    setMessage({ text: 'جاري حفظ الكلية...', type: 'info' });
    
    try {
      // التحقق من حجم البيانات المرسلة (خاصة إذا كانت الصورة base64)
      if (selectedFaculty?.image_path && selectedFaculty.image_path.startsWith('data:')) {
        const base64Size = Math.round((selectedFaculty.image_path.length * 3) / 4);
        console.log('حجم الصورة بالبايت:', base64Size);
        
        if (base64Size > 2 * 1024 * 1024) { // 2MB
          setMessage({ text: 'حجم الصورة كبير جدًا. يرجى استخدام صورة أصغر', type: 'error' });
          setIsSaving(false);
          return;
        }
      }

      // التحقق من البيانات قبل الإرسال
      const isNewFaculty = selectedFaculty!.faculty_id === 0;
      const method = isNewFaculty ? 'POST' : 'PUT';
      
      // نسخة من البيانات للتعديل قبل الإرسال
      const facultyToSave = { ...selectedFaculty };
      
      // التأكد من أن الحقول الرقمية هي أرقام بالفعل
      facultyToSave.programs = Number(facultyToSave.programs);
      facultyToSave.students = Number(facultyToSave.students);
      facultyToSave.display_order = Number(facultyToSave.display_order);
      
      console.log('بيانات الكلية المرسلة:', { 
        method, 
        faculty_id: facultyToSave.faculty_id,
        name: facultyToSave.name,
        slug: facultyToSave.slug,
        has_image: !!facultyToSave.image_path
      });
      
      const response = await fetch('/api/api_pages/faculties', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(facultyToSave),
      });

      // التحقق من الاستجابة
      if (!response.ok) {
        let errorMessage = `خطأ في الخادم: ${response.status} ${response.statusText}`;
        
        try {
          const errorData = await response.json();
          if (errorData.error) {
            errorMessage = errorData.error;
          }
        } catch (parseError) {
          // إذا لم يكن بالإمكان تحليل الاستجابة كـ JSON
          console.error('خطأ في تحليل استجابة الخطأ:', parseError);
          // محاولة قراءة النص بدلاً من ذلك
          const textResponse = await response.text();
          errorMessage += `\nاستجابة الخادم: ${textResponse.substring(0, 200)}`;
        }
        
        throw new Error(errorMessage);
      }

      const savedFaculty = await response.json();
      console.log('تم حفظ الكلية بنجاح:', savedFaculty);
      
      // إعادة جلب البيانات بعد الحفظ لضمان تحديث الواجهة بالبيانات الصحيحة
      await refreshFaculties();
      
      setSelectedFaculty(savedFaculty);
      setIsEditing(false); // إغلاق نموذج التحرير بعد الحفظ
      setMessage({ text: 'تم حفظ الكلية بنجاح', type: 'success' });
    } catch (error) {
      console.error('خطأ في حفظ الكلية:', error);
      setMessage({ 
        text: error instanceof Error ? error.message : 'حدث خطأ أثناء حفظ الكلية', 
        type: 'error' 
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (facultyId: number) => {
    if (!confirm('هل أنت متأكد من حذف هذه الكلية؟')) {
      return;
    }
    
    try {
      // عرض رسالة جاري الحذف
      setMessage({ text: 'جاري حذف الكلية...', type: 'info' });
      
      const response = await fetch(`/api/api_pages/faculties?id=${facultyId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'حدث خطأ أثناء حذف الكلية');
      }

      // إعادة جلب البيانات بعد الحذف لضمان تحديث الواجهة بالبيانات الصحيحة
      await refreshFaculties();
      
      if (selectedFaculty?.faculty_id === facultyId) {
        setSelectedFaculty(null);
        setIsEditing(false);
        setImagePreview(null);
      }
      
      setMessage({ text: 'تم حذف الكلية بنجاح', type: 'success' });
    } catch (error) {
      console.error('خطأ في حذف الكلية:', error);
      setMessage({ 
        text: error instanceof Error ? error.message : 'حدث خطأ أثناء حذف الكلية', 
        type: 'error' 
      });
    }
  };

  const handleCancel = () => {
    setSelectedFaculty(null);
    setImagePreview(null);
    setIsEditing(false);
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
        <h2 className={styles.editorTitle}>
          <span className={styles.sectionIcon}><FaUniversity /></span>
          إدارة الكليات
        </h2>
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

        {isEditing ? (
          <div className={styles.facultiesSection}>
            <div className={styles.facultiesHeader}>
              <h3 className={styles.facultiesTitle}>
                <span className={styles.facultyIcon}>
                  {selectedFaculty?.faculty_id !== 0 ? <FaEdit /> : <FaPlus />}
                </span>
                {selectedFaculty?.faculty_id !== 0 ? `تعديل: ${selectedFaculty?.name}` : 'إضافة كلية جديدة'}
              </h3>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.fieldLabel}>
                <span className={styles.labelIcon}><FaUniversity /></span>
                اسم الكلية
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={styles.input}
                value={selectedFaculty?.name || ''}
                onChange={handleInputChange}
                placeholder="أدخل اسم الكلية"
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.fieldLabel}>
                <span className={styles.labelIcon}><FaEdit /></span>
                وصف الكلية
              </label>
              <div className={styles.descriptionWrapper}>
                <textarea
                  id="description"
                  name="description"
                  className={styles.textarea}
                  value={selectedFaculty?.description || ''}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="أدخل وصفاً مختصراً للكلية"
                  required
                />
                <div className={styles.previewContainer}>
                  <h4 className={styles.previewTitle}>معاينة الوصف:</h4>
                  <div className={styles.previewContent}>
                    {selectedFaculty?.description || 'لم يتم إدخال أي نص بعد'}
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="slug" className={styles.fieldLabel}>
                <span className={styles.labelIcon}><FaCheck /></span>
                الرابط المختصر
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                className={styles.input}
                value={selectedFaculty?.slug || ''}
                onChange={handleInputChange}
                placeholder="مثال: engineering"
                required
              />
            </div>
            
            <div className={styles.statsContainer}>
              <div className={styles.formGroup}>
                <label htmlFor="programs" className={styles.fieldLabel}>
                  <span className={styles.labelIcon}><FaUniversity /></span>
                  عدد البرامج
                </label>
                <input
                  type="number"
                  id="programs"
                  name="programs"
                  className={styles.input}
                  value={selectedFaculty?.programs || 0}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="students" className={styles.fieldLabel}>
                  <span className={styles.labelIcon}><FaUniversity /></span>
                  عدد الطلاب
                </label>
                <input
                  type="number"
                  id="students"
                  name="students"
                  className={styles.input}
                  value={selectedFaculty?.students || 0}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="icon" className={styles.fieldLabel}>
                <span className={styles.labelIcon}><FaImage /></span>
                أيقونة الكلية
              </label>
              <input
                type="text"
                id="icon"
                name="icon"
                className={styles.input}
                value={selectedFaculty?.icon || '🏫'}
                onChange={handleInputChange}
                placeholder="يمكنك استخدام رمز تعبيري (emoji)"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="active" className={styles.fieldLabel}>
                <span className={styles.labelIcon}><FaCheck /></span>
                حالة الكلية
              </label>
              <select
                id="active"
                name="active"
                className={styles.select}
                value={selectedFaculty?.active ? 'true' : 'false'}
                onChange={handleInputChange}
              >
                <option value="true">نشطة</option>
                <option value="false">غير نشطة</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>
                <span className={styles.labelIcon}><FaImage /></span>
                صورة الكلية
              </label>
              <div className={styles.imageContainer}>
                <div className={styles.imageUploadArea}>
                  <label htmlFor="faculty_image" className={styles.uploadButton}>
                    <FaImage /> اختر صورة للكلية
                  </label>
                  <input
                    type="file"
                    id="faculty_image"
                    onChange={handleImageChange}
                    accept="image/*"
                    className={styles.fileInput}
                  />
                </div>
                {imagePreview && (
                  <div className={styles.imagePreview}>
                    <Image
                      src={imagePreview}
                      alt="صورة الكلية"
                      width={300}
                      height={200}
                      className={styles.previewImage}
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className={styles.actionButtons}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={handleCancel}
              >
                إلغاء
              </button>
              <button
                type="button"
                className={styles.saveButton}
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? 'جاري الحفظ...' : 'حفظ الكلية'}
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.facultiesContainer}>
            <div className={styles.facultiesList}>
              <div className={styles.facultiesHeader}>
                <h3 className={styles.facultiesTitle}>
                  <span className={styles.facultyIcon}><FaUniversity /></span>
                  قائمة الكليات
                </h3>
                <button
                  type="button"
                  className={styles.addButton}
                  onClick={handleNewFaculty}
                >
                  <FaPlus /> إضافة كلية جديدة
                </button>
              </div>
              
              {faculties.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}><FaUniversity size={48} /></div>
                  <p>لا توجد كليات حالياً. قم بإضافة كلية جديدة للبدء.</p>
                  <button 
                    className={styles.emptyAddButton}
                    onClick={handleNewFaculty}
                  >
                    <FaPlus /> إضافة كلية جديدة
                  </button>
                </div>
              ) : (
                <div className={styles.facultiesGrid}>
                  {faculties.map((faculty) => (
                    <div key={faculty.faculty_id} className={styles.facultyItem}>
                      <div className={styles.facultyImageContainer}>
                        <Image
                          src={faculty.image_path}
                          alt={faculty.name}
                          width={300}
                          height={200}
                          className={styles.facultyImage}
                        />
                        <div className={styles.facultyIconBadge}>{faculty.icon}</div>
                        {!faculty.active && (
                          <div className={styles.inactiveBadge}>غير نشطة</div>
                        )}
                      </div>
                      <div className={styles.facultyContent}>
                        <h3 className={styles.facultyName}>{faculty.name}</h3>
                        <div className={styles.facultyStats}>
                          <span>{faculty.programs} برامج</span>
                          <span>{faculty.students} طالب</span>
                        </div>
                        <p className={styles.facultyDesc}>
                          {faculty.description.length > 100
                            ? `${faculty.description.substring(0, 100)}...`
                            : faculty.description}
                        </p>
                        <div className={styles.facultyActions}>
                          <button
                            className={styles.iconButton}
                            onClick={() => handleSelectFaculty(faculty)}
                            title="تعديل"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className={styles.iconButton}
                            onClick={() => handleDelete(faculty.faculty_id)}
                            title="حذف"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultiesEditor;
