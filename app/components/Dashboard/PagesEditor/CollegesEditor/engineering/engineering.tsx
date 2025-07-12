'use client';

import React, { useState, useEffect } from 'react';
import { FaEdit, FaSave, FaTrash, FaPlus, FaUndo, FaImage } from 'react-icons/fa';
import styles from '../college-editor.module.css';

// تعريف نوع بيانات الكلية
interface CollegeData {
  id: number;
  hero_title: string;
  hero_subtitle: string;
  hero_image_url: string;
  about_content: string;
  dean_name: string;
  dean_title: string;
  dean_image_url: string;
  dean_message: string;
  updated_at: string;
}

// تعريف نوع بيانات الإحصائيات
interface StatItem {
  id: number;
  college_id: number;
  stat_number: string;
  stat_label: string;
}

const BusinessEditor: React.FC = () => {
  // حالة البيانات
  const [collegeData, setCollegeData] = useState<CollegeData | null>(null);
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editData, setEditData] = useState<CollegeData | null>(null);
  const [editStats, setEditStats] = useState<StatItem[]>([]);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

  // جلب بيانات الكلية
  useEffect(() => {
    fetchCollegeData();
  }, []);

  // دالة جلب البيانات
  const fetchCollegeData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/api_pages/colleges?id=1'); // id=3 لكلية العلوم الإدارية
      if (!response.ok) {
        throw new Error('فشل في جلب بيانات الكلية');
      }
      const data = await response.json();
      setCollegeData(data.college);
      setStats(data.stats);
      setEditData(data.college); // نسخة للتعديل
      setEditStats(data.stats); // نسخة للتعديل
      setMessage(null);
    } catch (err) {
      console.error('خطأ في جلب بيانات الكلية:', err);
      setMessage('فشل في تحميل بيانات الكلية. يرجى المحاولة مرة أخرى لاحقًا.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  // دالة حفظ التغييرات
  const handleSave = async () => {
    if (!editData) return;
    
    setLoading(true);
    try {
      console.log('Saving college data:', editData);
      
      // حفظ بيانات الكلية
      const collegeResponse = await fetch('/api/api_pages/colleges', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ college: editData }),
      });

      const collegeResult = await collegeResponse.json();
      console.log('College save response:', collegeResult);

      if (!collegeResponse.ok) {
        throw new Error(`فشل في حفظ بيانات الكلية: ${collegeResult.error || 'خطأ غير معروف'}`);
      }

      // تأكد من أن جميع الإحصائيات لديها college_id ومعالجة الإحصائيات الجديدة
      // إنشاء مصفوفة للإحصائيات التي سيتم إرسالها إلى API
      const statsToSend: any[] = [];
      
      // معالجة كل إحصائية
      editStats.forEach(stat => {
        // إذا كانت الإحصائية جديدة (معرف سالب)
        if (stat.id < 0) {
          // إضافة إحصائية جديدة بدون معرف
          statsToSend.push({
            college_id: editData.id,
            stat_number: stat.stat_number,
            stat_label: stat.stat_label
          });
        } else if (!stat.college_id) {
          // إذا كان لديها معرف ولكن لا يوجد لديها college_id
          statsToSend.push({
            ...stat,
            college_id: editData.id
          });
        } else {
          // إحصائية موجودة بالفعل
          statsToSend.push(stat);
        }
      });
      
      console.log('Saving stats data:', statsToSend);

      // حفظ بيانات الإحصائيات
      const statsResponse = await fetch('/api/api_pages/college_stats', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stats: statsToSend }),
      });

      const statsResult = await statsResponse.json();
      console.log('Stats save response:', statsResult);

      if (!statsResponse.ok) {
        throw new Error(`فشل في حفظ بيانات الإحصائيات: ${statsResult.error || 'خطأ غير معروف'}`);
      }

      // تحديث البيانات المعروضة
      setCollegeData(editData);
      // لا نستخدم statsToSend مباشرة لأنه قد لا يحتوي على معرفات للإحصائيات الجديدة
      // سنعتمد على إعادة تحميل البيانات من الخادم
      setIsEditing(false);
      setMessage('تم حفظ التغييرات بنجاح');
      setMessageType('success');
      
      // إعادة تحميل البيانات من الخادم
      fetchCollegeData();
    } catch (err: any) {
      console.error('خطأ في حفظ البيانات:', err);
      setMessage(`فشل في حفظ التغييرات: ${err.message}`);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  // دالة إلغاء التعديلات
  const handleCancel = () => {
    setEditData(collegeData);
    setEditStats(stats);
    setIsEditing(false);
    setMessage(null);
  };

  // دالة تحديث بيانات الكلية
  const handleCollegeDataChange = (field: keyof CollegeData, value: string) => {
    if (!editData) return;
    setEditData({
      ...editData,
      [field]: value,
    });
  };

  // دالة تحديث بيانات الإحصائيات
  const handleStatChange = (index: number, field: keyof StatItem, value: string | number) => {
    const newStats = [...editStats];
    if (field === 'stat_number' || field === 'stat_label') {
      newStats[index][field] = value as string;
    } else {
      newStats[index][field] = value as number;
    }
    setEditStats(newStats);
  };

  // دالة إضافة إحصائية جديدة
  const handleAddStat = () => {
    if (!editData) return;
    
    // استخدام رقم سالب مؤقتًا للإحصائيات الجديدة لتجنب تضارب المعرفات
    // سيتم تعيين المعرف الحقيقي عند الحفظ في قاعدة البيانات
    const tempId = -Math.floor(Math.random() * 1000000) - 1;
    
    const newStat: StatItem = {
      id: tempId,
      college_id: editData.id,
      stat_number: '0',
      stat_label: 'إحصائية جديدة',
    };
    
    console.log('Adding new stat:', newStat);
    setEditStats([...editStats, newStat]);
  };

  // دالة حذف إحصائية
  const handleDeleteStat = async (statId: number) => {
    try {
      console.log('Deleting stat with ID:', statId);
      
      // إذا كان المعرف سالبًا، فهذا يعني أنها إحصائية جديدة لم يتم حفظها بعد
      if (statId < 0) {
        console.log('Removing unsaved stat with temporary ID:', statId);
        // إزالة الإحصائية من القائمة المحلية فقط
        setEditStats(editStats.filter(stat => stat.id !== statId));
        setMessage('تم حذف الإحصائية بنجاح');
        setMessageType('success');
        return;
      }
      
      // حذف الإحصائية من قاعدة البيانات
      const response = await fetch(`/api/api_pages/college_stats?id=${statId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      console.log('Delete response:', result);

      if (!response.ok) {
        throw new Error(`فشل في حذف الإحصائية: ${result.error || 'خطأ غير معروف'}`);
      }

      // تحديث القائمة المحلية
      setEditStats(editStats.filter(stat => stat.id !== statId));
      setStats(stats.filter(stat => stat.id !== statId));
      setMessage('تم حذف الإحصائية بنجاح');
      setMessageType('success');
    } catch (err: any) {
      console.error('خطأ في حذف الإحصائية:', err);
      setMessage(`فشل في حذف الإحصائية: ${err.message}`);
      setMessageType('error');
    }
  };

  // عرض شاشة التحميل
  if (loading && !collegeData) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>جاري تحميل بيانات الكلية...</p>
      </div>
    );
  }

  // عرض رسالة الخطأ
  if (message && messageType === 'error' && !collegeData) {
    return <div className={styles.errorMessage}>{message}</div>;
  }

  // عرض رسالة عدم وجود بيانات
  if (!collegeData) {
    return <div className={styles.notFound}>لم يتم العثور على بيانات الكلية</div>;
  }

  return (
    <div className={styles.collegeEditorContainer}>
      {/* رسالة النجاح أو الخطأ */}
      {message && (
        <div className={messageType === 'success' ? styles.successMessage : styles.errorMessage}>
          {message}
        </div>
      )}

      {/* أزرار التحكم */}
      <div className={styles.editorControls}>
        {!isEditing ? (
          <button 
            className={styles.editButton}
            onClick={() => setIsEditing(true)}
          >
            <FaEdit /> تعديل المحتوى
          </button>
        ) : (
          <>
            <button 
              className={styles.saveButton}
              onClick={handleSave}
              disabled={loading}
            >
              <FaSave /> حفظ التغييرات
            </button>
            <button 
              className={styles.cancelButton}
              onClick={handleCancel}
              disabled={loading}
            >
              <FaUndo /> إلغاء
            </button>
          </>
        )}
        <button 
          className={styles.refreshButton}
          onClick={fetchCollegeData}
          disabled={loading}
        >
          تحديث البيانات
        </button>
      </div>

      {/* قسم معلومات الصفحة الرئيسية */}
      <div className={styles.editorSection}>
        <h3 className={styles.sectionTitle}>قسم الصفحة الرئيسية</h3>
        <div className={styles.formGroup}>
          <label>عنوان الصفحة الرئيسية:</label>
          {isEditing && editData ? (
            <input 
              type="text" 
              value={editData.hero_title} 
              onChange={(e) => handleCollegeDataChange('hero_title', e.target.value)}
              className={styles.inputField}
            />
          ) : (
            <p className={styles.dataDisplay}>{collegeData.hero_title}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label>العنوان الفرعي:</label>
          {isEditing && editData ? (
            <input 
              type="text" 
              value={editData.hero_subtitle} 
              onChange={(e) => handleCollegeDataChange('hero_subtitle', e.target.value)}
              className={styles.inputField}
            />
          ) : (
            <p className={styles.dataDisplay}>{collegeData.hero_subtitle}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label>رابط صورة الصفحة الرئيسية:</label>
          {isEditing && editData ? (
            <div className={styles.imageInputContainer}>
              <input 
                type="text" 
                value={editData.hero_image_url} 
                onChange={(e) => handleCollegeDataChange('hero_image_url', e.target.value)}
                className={styles.inputField}
              />
              <button className={styles.uploadButton}>
                <FaImage /> رفع صورة
              </button>
            </div>
          ) : (
            <div className={styles.imagePreviewContainer}>
              <p className={styles.dataDisplay}>{collegeData.hero_image_url}</p>
              <div className={styles.imagePreview}>
                <img src={collegeData.hero_image_url} alt="صورة الصفحة الرئيسية" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* قسم عن الكلية */}
      <div className={styles.editorSection}>
        <h3 className={styles.sectionTitle}>قسم عن الكلية</h3>
        <div className={styles.formGroup}>
          <label>محتوى عن الكلية:</label>
          {isEditing && editData ? (
            <textarea 
              value={editData.about_content} 
              onChange={(e) => handleCollegeDataChange('about_content', e.target.value)}
              className={styles.textareaField}
              rows={6}
            />
          ) : (
            <p className={styles.dataDisplay}>{collegeData.about_content}</p>
          )}
        </div>

        {/* إحصائيات الكلية */}
        <div className={styles.statsContainer}>
          <h4 className={styles.subsectionTitle}>إحصائيات الكلية</h4>
          
          {isEditing && (
            <button 
              className={styles.addButton}
              onClick={handleAddStat}
            >
              <FaPlus /> إضافة إحصائية جديدة
            </button>
          )}
          
          <div className={styles.statsGrid}>
            {(isEditing ? editStats : stats).map((stat, index) => (
              <div key={stat.id} className={styles.statItem}>
                {isEditing ? (
                  <>
                    <input 
                      type="text" 
                      value={stat.stat_number} 
                      onChange={(e) => handleStatChange(index, 'stat_number', e.target.value)}
                      className={styles.statNumberInput}
                      placeholder="الرقم"
                    />
                    <input 
                      type="text" 
                      value={stat.stat_label} 
                      onChange={(e) => handleStatChange(index, 'stat_label', e.target.value)}
                      className={styles.statLabelInput}
                      placeholder="العنوان"
                    />
                    <button 
                      className={styles.deleteButton}
                      onClick={() => handleDeleteStat(stat.id)}
                    >
                      <FaTrash />
                    </button>
                  </>
                ) : (
                  <>
                    <div className={styles.statNumber}>{stat.stat_number}</div>
                    <div className={styles.statLabel}>{stat.stat_label}</div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* قسم العميد */}
      <div className={styles.editorSection}>
        <h3 className={styles.sectionTitle}>قسم العميد</h3>
        <div className={styles.formGroup}>
          <label>اسم العميد:</label>
          {isEditing && editData ? (
            <input 
              type="text" 
              value={editData.dean_name} 
              onChange={(e) => handleCollegeDataChange('dean_name', e.target.value)}
              className={styles.inputField}
            />
          ) : (
            <p className={styles.dataDisplay}>{collegeData.dean_name}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label>منصب العميد:</label>
          {isEditing && editData ? (
            <input 
              type="text" 
              value={editData.dean_title} 
              onChange={(e) => handleCollegeDataChange('dean_title', e.target.value)}
              className={styles.inputField}
            />
          ) : (
            <p className={styles.dataDisplay}>{collegeData.dean_title}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label>رابط صورة العميد:</label>
          {isEditing && editData ? (
            <div className={styles.imageInputContainer}>
              <input 
                type="text" 
                value={editData.dean_image_url} 
                onChange={(e) => handleCollegeDataChange('dean_image_url', e.target.value)}
                className={styles.inputField}
              />
              <button className={styles.uploadButton}>
                <FaImage /> رفع صورة
              </button>
            </div>
          ) : (
            <div className={styles.imagePreviewContainer}>
              <p className={styles.dataDisplay}>{collegeData.dean_image_url}</p>
              <div className={styles.imagePreview}>
                <img src={collegeData.dean_image_url} alt="صورة العميد" />
              </div>
            </div>
          )}
        </div>
        <div className={styles.formGroup}>
          <label>رسالة العميد:</label>
          {isEditing && editData ? (
            <textarea 
              value={editData.dean_message} 
              onChange={(e) => handleCollegeDataChange('dean_message', e.target.value)}
              className={styles.textareaField}
              rows={6}
            />
          ) : (
            <p className={styles.dataDisplay}>{collegeData.dean_message}</p>
          )}
        </div>
      </div>

      {/* قسم التخصصات */}
      <div className={styles.editorSection}>
        <h3 className={styles.sectionTitle}>قسم التخصصات</h3>
        <p className={styles.infoText}>
          لإدارة التخصصات، يرجى الانتقال إلى قسم "البرامج الأكاديمية" في لوحة التحكم.
        </p>
      </div>
    </div>
  );
};

export default BusinessEditor;