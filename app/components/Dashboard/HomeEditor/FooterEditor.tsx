'use client';

import { useState, useEffect } from 'react';
import styles from './HomeEditor.module.css';
import { FaWhatsapp, FaInstagram, FaTwitter, FaFacebook, FaMapMarkerAlt, FaPhone, FaEnvelope, FaLinkedin, FaPlus, FaTrash, FaEdit, FaSave } from 'react-icons/fa';
import * as Icons from 'react-icons/fa';

interface FooterSection {
  id: number;
  title: string;
  type: string;
  content: any[];
}

interface Copyright {
  id: number;
  text: string;
  year: string;
}

interface FooterData {
  sections: FooterSection[];
  copyright: Copyright;
}

interface LinkItem {
  link_id: number;
  title: string;
  url: string;
}

interface ContactItem {
  contact_id: number;
  type: string;
  value: string;
  icon: string;
}

interface SocialItem {
  social_id: number;
  platform: string;
  icon: string;
  url: string;
}

const iconOptions = [
  'FaWhatsapp',
  'FaInstagram',
  'FaTwitter',
  'FaFacebook',
  'FaMapMarkerAlt',
  'FaPhone',
  'FaEnvelope',
  'FaLinkedin'
];

const iconMap: { [key: string]: any } = {
  FaWhatsapp,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaLinkedin
};

const FooterEditor = () => {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // جلب بيانات التذييل
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setIsLoading(true);
        setErrorMessage('');
        
        // محاولة جلب البيانات من API المتصل بقاعدة بيانات XAMPP
        const response = await fetch('/api/api_pages/footer');
        
        if (!response.ok) {
          throw new Error(`فشل جلب البيانات: ${response.status}`);
        }
        
        const data = await response.json();
        
        // التحقق من صحة البيانات المستلمة
        if (!data || !data.sections || !Array.isArray(data.sections) || !data.copyright) {
          throw new Error('البيانات المستلمة غير صالحة');
        }
        
        console.log('تم جلب بيانات التذييل بنجاح:', data);
        setFooterData(data);
      } catch (error) {
        console.error('خطأ في جلب بيانات التذييل:', error);
        setErrorMessage(`حدث خطأ أثناء جلب بيانات التذييل: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`);
        
        // استخدام بيانات افتراضية في حالة فشل الاستجابة
      
      } finally {
        setIsLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  // حفظ بيانات التذييل
  const saveFooterData = async () => {
    if (!footerData) return;

    try {
      setIsSaving(true);
      setErrorMessage('');
      setSuccessMessage('');
      
      // التحقق من صحة البيانات قبل الإرسال
      if (!validateFooterData(footerData)) {
        setErrorMessage('البيانات غير صالحة، يرجى التحقق من جميع الحقول');
        return;
      }
      
      // إرسال البيانات إلى API المتصل بقاعدة بيانات XAMPP
      const response = await fetch('/api/api_pages/footer', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(footerData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `خطأ في الاستجابة: ${response.status}`);
      }

      const data = await response.json();
      console.log('تم حفظ بيانات التذييل بنجاح:', data);
      
      setSuccessMessage('تم حفظ جميع بيانات تذييل الصفحة بنجاح');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // تحديث البيانات المحلية بالبيانات المستلمة من الخادم (إذا كانت متوفرة)
      if (data && data.sections) {
        setFooterData(data);
      }
    } catch (error) {
      console.error('خطأ في حفظ بيانات التذييل:', error);
      setErrorMessage(`حدث خطأ أثناء حفظ بيانات التذييل: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`);
      setTimeout(() => setErrorMessage(''), 5000);
    } finally {
      setIsSaving(false);
    }
  };
  
  // التحقق من صحة بيانات التذييل
  const validateFooterData = (data: FooterData): boolean => {
    if (!data || !data.sections || !Array.isArray(data.sections) || !data.copyright) {
      return false;
    }
    
    // التحقق من وجود جميع الأقسام المطلوبة
    const requiredSectionTypes = ['links', 'contact', 'social'];
    const sectionTypes = data.sections.map(section => section.type);
    
    for (const type of requiredSectionTypes) {
      if (!sectionTypes.includes(type)) {
        return false;
      }
    }
    
    // التحقق من صحة بيانات حقوق النشر
    if (!data.copyright.text || !data.copyright.year) {
      return false;
    }
    
    // التحقق من صحة محتوى الأقسام
    for (const section of data.sections) {
      if (!section.title || !section.content || !Array.isArray(section.content)) {
        return false;
      }
      
      // التحقق من عدم وجود عناصر فارغة
      if (section.type === 'links') {
        for (const item of section.content) {
          if (!item.title || !item.url) {
            return false;
          }
        }
      } else if (section.type === 'contact') {
        for (const item of section.content) {
          if (!item.type || !item.value || !item.icon) {
            return false;
          }
        }
      } else if (section.type === 'social') {
        for (const item of section.content) {
          if (!item.platform || !item.url || !item.icon) {
            return false;
          }
        }
      }
    }
    
    return true;
  };

  // إضافة عنصر جديد إلى قسم معين
  const addItemToSection = (sectionId: number) => {
    if (!footerData) return;

    const section = footerData.sections.find(s => s.id === sectionId);
    if (!section) return;

    let newItem: any;
    let newId = 1;

    switch (section.type) {
      case 'links':
        newId = Math.max(0, ...section.content.map((item: any) => item.link_id)) + 1;
        newItem = { link_id: newId, title: '', url: '' };
        break;
      case 'contact':
        newId = Math.max(0, ...section.content.map((item: any) => item.contact_id)) + 1;
        newItem = { contact_id: newId, type: '', value: '', icon: 'FaMapMarkerAlt' };
        break;
      case 'social':
        newId = Math.max(0, ...section.content.map((item: any) => item.social_id)) + 1;
        newItem = { social_id: newId, platform: '', icon: 'FaFacebook', url: '' };
        break;
      default:
        return;
    }

    const updatedSections = footerData.sections.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          content: [...s.content, newItem]
        };
      }
      return s;
    });

    setFooterData({
      ...footerData,
      sections: updatedSections
    });

    setEditMode(`${section.type}-item`);
    setEditItem(newItem);
  };

  // حذف عنصر من قسم معين
  const deleteItemFromSection = (sectionId: number, itemId: number, idField: string) => {
    if (!footerData) return;

    const updatedSections = footerData.sections.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          content: s.content.filter(item => item[idField] !== itemId)
        };
      }
      return s;
    });

    setFooterData({
      ...footerData,
      sections: updatedSections
    });
  };

  // تعديل عنصر في قسم معين
  const editItemInSection = (sectionId: number, itemId: number, idField: string) => {
    if (!footerData) return;

    const section = footerData.sections.find(s => s.id === sectionId);
    if (!section) return;

    const item = section.content.find(item => item[idField] === itemId);
    if (!item) return;

    setEditMode(`${section.type}-item`);
    setEditItem(item);
  };

  // حفظ تعديلات العنصر
  const saveItemEdits = () => {
    if (!footerData || !editItem || !editMode) return;

    const sectionType = editMode.split('-')[0];
    const section = footerData.sections.find(s => s.type === sectionType);
    if (!section) return;

    let idField: string;
    switch (sectionType) {
      case 'links':
        idField = 'link_id';
        break;
      case 'contact':
        idField = 'contact_id';
        break;
      case 'social':
        idField = 'social_id';
        break;
      default:
        return;
    }

    const updatedSections = footerData.sections.map(s => {
      if (s.id === section.id) {
        return {
          ...s,
          content: s.content.map(item => {
            if (item[idField] === editItem[idField]) {
              return editItem;
            }
            return item;
          })
        };
      }
      return s;
    });

    setFooterData({
      ...footerData,
      sections: updatedSections
    });

    setEditMode(null);
    setEditItem(null);
  };

  // تعديل حقوق النشر
  const editCopyright = () => {
    if (!footerData) return;
    setEditMode('copyright');
    setEditItem({ ...footerData.copyright });
  };

  // حفظ تعديلات حقوق النشر
  const saveCopyrightEdits = () => {
    if (!footerData || !editItem || editMode !== 'copyright') return;

    setFooterData({
      ...footerData,
      copyright: editItem
    });

    setEditMode(null);
    setEditItem(null);
  };

  // عرض أيقونة
  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName] || Icons[iconName as keyof typeof Icons] || FaFacebook;
    return <IconComponent />;
  };

  // تحديث قيمة في العنصر قيد التعديل
  const updateEditItemValue = (key: string, value: string) => {
    if (!editItem) return;
    setEditItem({
      ...editItem,
      [key]: value
    });
  };

  if (isLoading) {
    return (
      <div className={styles.editorContainer}>
        <div className={styles.loading}>جاري التحميل...</div>
      </div>
    );
  }

  if (!footerData) {
    return (
      <div className={styles.editorContainer}>
        <div className={styles.errorMessage}>لا يمكن تحميل بيانات التذييل</div>
      </div>
    );
  }

  return (
    <div className={styles.editorContainer}>
      <div className={styles.editorHeader}>
        <h2 className={styles.editorTitle}>إدارة تذييل الصفحة الرئيسية</h2>
        <button 
          className={styles.modernSaveButton} 
          onClick={saveFooterData}
          disabled={isSaving}
        >
          <FaSave />
          {isSaving ? 'جاري الحفظ...' : 'حفظ جميع التغييرات'}
        </button>
      </div>

      {successMessage && (
        <div className={styles.successMessage}>
          <span className={styles.messageIcon}>✓</span>
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className={styles.errorMessage}>
          <span className={styles.messageIcon}>⚠️</span>
          {errorMessage}
        </div>
      )}

      <div className={styles.editorContent}>
        <div className={styles.sectionsContainer}>
          {footerData.sections.map((section) => (
            <div key={section.id} className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <h3>{section.title}</h3>
                <button 
                  className={styles.modernAddButton}
                  onClick={() => addItemToSection(section.id)}
                >
                  <FaPlus /> إضافة عنصر جديد
                </button>
              </div>

              <div className={styles.sectionContent}>
                {section.type === 'links' && (
                  <div className={styles.tableContainer}>
                    <table className={styles.modernTable}>
                      <thead>
                        <tr>
                          <th>عنوان الرابط</th>
                          <th>مسار الرابط (URL)</th>
                          <th>إجراءات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.content.map((item: LinkItem) => (
                          <tr key={item.link_id}>
                            <td>{item.title}</td>
                            <td>{item.url}</td>
                            <td>
                              <div className={styles.actionButtons}>
                                <button 
                                  className={styles.iconButton} 
                                  onClick={() => editItemInSection(section.id, item.link_id, 'link_id')}
                                >
                                  <FaEdit />
                                </button>
                                <button 
                                  className={styles.iconButton} 
                                  onClick={() => deleteItemFromSection(section.id, item.link_id, 'link_id')}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {section.type === 'contact' && (
                  <div className={styles.tableContainer}>
                    <table className={styles.modernTable}>
                      <thead>
                        <tr>
                          <th>نوع معلومات الاتصال</th>
                          <th>بيانات الاتصال</th>
                          <th>الأيقونة المستخدمة</th>
                          <th>إجراءات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.content.map((item: ContactItem) => (
                          <tr key={item.contact_id}>
                            <td>{item.type}</td>
                            <td>{item.value}</td>
                            <td>
                              <span className={styles.iconPreview}>
                                {getIcon(item.icon)}
                              </span>
                            </td>
                            <td>
                              <div className={styles.actionButtons}>
                                <button 
                                  className={styles.iconButton} 
                                  onClick={() => editItemInSection(section.id, item.contact_id, 'contact_id')}
                                >
                                  <FaEdit />
                                </button>
                                <button 
                                  className={styles.iconButton} 
                                  onClick={() => deleteItemFromSection(section.id, item.contact_id, 'contact_id')}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {section.type === 'social' && (
                  <div className={styles.tableContainer}>
                    <table className={styles.modernTable}>
                      <thead>
                        <tr>
                          <th>منصة التواصل</th>
                          <th>رابط الصفحة</th>
                          <th>الأيقونة المستخدمة</th>
                          <th>إجراءات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.content.map((item: SocialItem) => (
                          <tr key={item.social_id}>
                            <td>{item.platform}</td>
                            <td>{item.url}</td>
                            <td>
                              <span className={styles.iconPreview}>
                                {getIcon(item.icon)}
                              </span>
                            </td>
                            <td>
                              <div className={styles.actionButtons}>
                                <button 
                                  className={styles.iconButton} 
                                  onClick={() => editItemInSection(section.id, item.social_id, 'social_id')}
                                >
                                  <FaEdit />
                                </button>
                                <button 
                                  className={styles.iconButton} 
                                  onClick={() => deleteItemFromSection(section.id, item.social_id, 'social_id')}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h3>حقوق النشر</h3>
              <button 
                className={styles.modernEditButton}
                onClick={editCopyright}
              >
                <FaEdit /> تعديل
              </button>
            </div>
            <div className={styles.sectionContent}>
              <p>{footerData.copyright.text} {footerData.copyright.year}</p>
            </div>
          </div>
        </div>
      </div>

      {/* نموذج تعديل العناصر */}
      {editMode === 'links-item' && editItem && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>تعديل بيانات الرابط</h3>
              <button 
                className={styles.closeButton}
                onClick={() => { setEditMode(null); setEditItem(null); }}
              >
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>العنوان:</label>
                <input 
                  type="text" 
                  value={editItem.title} 
                  onChange={(e) => updateEditItemValue('title', e.target.value)}
                  className={styles.modernInput}
                />
              </div>
              <div className={styles.formGroup}>
                <label>الرابط:</label>
                <input 
                  type="text" 
                  value={editItem.url} 
                  onChange={(e) => updateEditItemValue('url', e.target.value)}
                  className={styles.modernInput}
                />
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button 
                className={styles.modernSaveButton}
                onClick={saveItemEdits}
              >
                حفظ
              </button>
              <button 
                className={styles.modernCancelButton}
                onClick={() => { setEditMode(null); setEditItem(null); }}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {editMode === 'contact-item' && editItem && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>تعديل بيانات الاتصال</h3>
              <button 
                className={styles.closeButton}
                onClick={() => { setEditMode(null); setEditItem(null); }}
              >
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>النوع:</label>
                <input 
                  type="text" 
                  value={editItem.type} 
                  onChange={(e) => updateEditItemValue('type', e.target.value)}
                  className={styles.modernInput}
                />
              </div>
              <div className={styles.formGroup}>
                <label>القيمة:</label>
                <input 
                  type="text" 
                  value={editItem.value} 
                  onChange={(e) => updateEditItemValue('value', e.target.value)}
                  className={styles.modernInput}
                />
              </div>
              <div className={styles.formGroup}>
                <label>الأيقونة:</label>
                <select 
                  value={editItem.icon} 
                  onChange={(e) => updateEditItemValue('icon', e.target.value)}
                  className={styles.modernSelect}
                >
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button 
                className={styles.modernSaveButton}
                onClick={saveItemEdits}
              >
                حفظ
              </button>
              <button 
                className={styles.modernCancelButton}
                onClick={() => { setEditMode(null); setEditItem(null); }}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {editMode === 'social-item' && editItem && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>تعديل بيانات منصة التواصل الاجتماعي</h3>
              <button 
                className={styles.closeButton}
                onClick={() => { setEditMode(null); setEditItem(null); }}
              >
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>المنصة:</label>
                <input 
                  type="text" 
                  value={editItem.platform} 
                  onChange={(e) => updateEditItemValue('platform', e.target.value)}
                  className={styles.modernInput}
                />
              </div>
              <div className={styles.formGroup}>
                <label>الرابط:</label>
                <input 
                  type="text" 
                  value={editItem.url} 
                  onChange={(e) => updateEditItemValue('url', e.target.value)}
                  className={styles.modernInput}
                />
              </div>
              <div className={styles.formGroup}>
                <label>الأيقونة:</label>
                <select 
                  value={editItem.icon} 
                  onChange={(e) => updateEditItemValue('icon', e.target.value)}
                  className={styles.modernSelect}
                >
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button 
                className={styles.modernSaveButton}
                onClick={saveItemEdits}
              >
                حفظ
              </button>
              <button 
                className={styles.modernCancelButton}
                onClick={() => { setEditMode(null); setEditItem(null); }}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {editMode === 'copyright' && editItem && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>تعديل بيانات حقوق النشر</h3>
              <button 
                className={styles.closeButton}
                onClick={() => { setEditMode(null); setEditItem(null); }}
              >
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>نص حقوق النشر:</label>
                <input 
                  type="text" 
                  value={editItem.text} 
                  onChange={(e) => updateEditItemValue('text', e.target.value)}
                  className={styles.modernInput}
                />
              </div>
              <div className={styles.formGroup}>
                <label>سنة حقوق النشر:</label>
                <input 
                  type="text" 
                  value={editItem.year} 
                  onChange={(e) => updateEditItemValue('year', e.target.value)}
                  className={styles.modernInput}
                />
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button 
                className={styles.modernSaveButton}
                onClick={saveCopyrightEdits}
              >
                حفظ
              </button>
              <button 
                className={styles.modernCancelButton}
                onClick={() => { setEditMode(null); setEditItem(null); }}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FooterEditor;