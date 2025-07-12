"use client";

import { useState, useEffect } from 'react';
import styles from './AboutUniversityEditor.module.css';

// واجهات البيانات
interface HeroSection {
  id?: number;
  title: string;
  subtitle: string;
  background_image: string;
}

interface IntroSection {
  id?: number;
  section_title: string;
  paragraph_1: string;
  paragraph_2: string;
}

interface Statistic {
  id?: number;
  number: string; // الاسم الفعلي في قاعدة البيانات
  label: string; // الاسم الفعلي في قاعدة البيانات
  stat_order: number;
  
  // حقول مستخدمة في واجهة المستخدم (للتوافق مع الكود الحالي)
  value?: string;
  title?: string;
}

interface SectionHeader {
  id?: number;
  title: string;
  description?: string;
}

interface Achievement {
  id?: number;
  title: string;
  text: string;
  icon: string;
  achievement_order: number;
}

interface Rule {
  id?: number;
  title: string;
  details: string;
  rule_order: number;
}

interface Guideline {
  id?: number;
  title: string;
  text: string;
  icon: string;
  guideline_order: number;
}

interface AboutUniversityData {
  hero: HeroSection | null;
  intro: IntroSection | null;
  statistics: Statistic[];
  achievementsSection: SectionHeader | null;
  achievements: Achievement[];
  rulesSection: SectionHeader | null;
  rules: Rule[];
  guidelinesSection: SectionHeader | null;
  guidelines: Guideline[];
}

const AboutUniversityEditor = () => {
  // حالة البيانات
  const [data, setData] = useState<AboutUniversityData>({
    hero: null,
    intro: null,
    statistics: [],
    achievementsSection: null,
    achievements: [],
    rulesSection: null,
    rules: [],
    guidelinesSection: null,
    guidelines: []
  });
  
  // حالة التحميل والحفظ
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<string>("");

  // حالة التبويب النشط
  const [activeTab, setActiveTab] = useState<string>('hero');

  // جلب البيانات عند تحميل المكون
  useEffect(() => {
    fetchData();
  }, []);

  // دالة جلب البيانات
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/api_pages/about-university');
      
      if (!response.ok) {
        throw new Error(`خطأ في جلب البيانات: ${response.status}`);
      }
      
      const fetchedData = await response.json();
      console.log('تم جلب البيانات:', fetchedData);
      
      // مزامنة البيانات المجلوبة مع واجهة المستخدم
      if (fetchedData.statistics && Array.isArray(fetchedData.statistics)) {
        fetchedData.statistics = fetchedData.statistics.map((stat: any) => ({
          ...stat,
          // مزامنة الحقول لتعمل مع واجهة المستخدم
          value: stat.number || '',
          title: stat.label || ''
        }));
      }
      
      setData(fetchedData);
    } catch (err: any) {
      console.error('خطأ في جلب بيانات صفحة عن الجامعة:', err);
      setError(`فشل في جلب البيانات: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // دالة مساعدة لتزامن البيانات بين واجهة المستخدم وقاعدة البيانات
  const synchronizeDataBeforeSave = (dataToSync: AboutUniversityData): AboutUniversityData => {
    // نسخة جديدة من البيانات
    const syncedData = { ...dataToSync };
    
    // تزامن الإحصائيات
    if (syncedData.statistics && Array.isArray(syncedData.statistics)) {
      syncedData.statistics = syncedData.statistics.map(stat => ({
        ...stat,
        // التأكد من تزامن الحقول بين واجهة المستخدم وقاعدة البيانات
        number: stat.value || stat.number || '',
        label: stat.title || stat.label || ''
      }));
    }
    
    return syncedData;
  };
  
  // دالة حفظ البيانات
  const handleSave = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // تزامن البيانات قبل الإرسال
      const syncedData = synchronizeDataBeforeSave(data);
      console.log('البيانات المزامنة قبل الإرسال:', syncedData);
      
      const response = await fetch('/api/api_pages/about-university', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(syncedData),
      });
      
      if (!response.ok) {
        // محاولة الحصول على رسالة الخطأ من الاستجابة
        const errorData = await response.json().catch(() => null);
        console.error('خطأ من الخادم:', errorData);
        throw new Error(errorData?.message || `حدث خطأ أثناء حفظ البيانات (${response.status})`);
      }
      
      setSuccessMessage('تم حفظ البيانات بنجاح ✓');
      setSuccess("تم حفظ البيانات بنجاح!");
      setTimeout(() => {
        setSuccess("");
      }, 3000);
      
    } catch (err: any) {
      setError(err.message || 'حدث خطأ غير معروف');
      // إخفاء رسالة الخطأ بعد 5 ثواني
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  // دوال إدارة الإحصائيات
  const updateStatistic = (index: number, field: keyof Statistic, value: string | number) => {
    const updatedStatistics = [...data.statistics];
    const statistic = { ...updatedStatistics[index] } as any; // استخدام any لتجنب مشاكل TypeScript
  
    // تحديث الحقل المطلوب
    statistic[field] = value;
  
    // تزامن الحقول المرتبطة
    if (field === 'title') {
      statistic.label = value as string;
    } else if (field === 'value') {
      statistic.number = value as string;
    } else if (field === 'label') {
      statistic.title = value as string;
    } else if (field === 'number') {
      statistic.value = value as string;
    }
  
    // تحديث العنصر في المصفوفة
    updatedStatistics[index] = statistic as Statistic;
  
    setData({
      ...data,
      statistics: updatedStatistics
    });
  };

  const addStatistic = () => {
  // استخدام معرف سالب مؤقت للعناصر الجديدة
  const newId = Math.min(0, ...data.statistics.map(item => item.id || 0)) - 1;
  const newOrder = data.statistics.length > 0 
    ? Math.max(...data.statistics.map(item => item.stat_order)) + 1 
    : 1;
  
  const newStatistic: Statistic = {
    id: newId,
    number: '', // القيمة الرقمية للإحصائية
    label: '', // عنوان الإحصائية
    value: '', // للتوافق مع واجهة المستخدم
    title: '', // للتوافق مع واجهة المستخدم
    stat_order: newOrder
  };
  
  setData({
    ...data,
    statistics: [...data.statistics, newStatistic]
  });
};

  const removeStatistic = (index: number) => {
    const updatedStatistics = [...data.statistics];
    updatedStatistics.splice(index, 1);
    
    // إعادة ترتيب العناصر المتبقية
    const reorderedStatistics = updatedStatistics.map((stat, idx) => ({
      ...stat,
      stat_order: idx + 1
    }));
    
    setData({
      ...data,
      statistics: reorderedStatistics
    });
  };

  const reorderStatistic = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === data.statistics.length - 1)
    ) {
      return; // لا يمكن تحريك العنصر الأول للأعلى أو العنصر الأخير للأسفل
    }
    
    const updatedStatistics = [...data.statistics];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // تبديل العناصر
    [updatedStatistics[index], updatedStatistics[targetIndex]] = 
      [updatedStatistics[targetIndex], updatedStatistics[index]];
    
    // تحديث الترتيب
    const reorderedStatistics = updatedStatistics.map((stat, idx) => ({
      ...stat,
      stat_order: idx + 1
    }));
    
    setData({
      ...data,
      statistics: reorderedStatistics
    });
  };

  // دوال إدارة الإنجازات
  const updateAchievementSection = (field: keyof SectionHeader, value: string) => {
    setData({
      ...data,
      achievementsSection: {
        ...data.achievementsSection,
        [field]: value
      } as SectionHeader
    });
  };

  const updateAchievement = (index: number, field: keyof Achievement, value: string | number) => {
    const updatedAchievements = [...data.achievements];
    updatedAchievements[index] = {
      ...updatedAchievements[index],
      [field]: value
    };
    
    setData({
      ...data,
      achievements: updatedAchievements
    });
  };

  const addAchievement = () => {
    // استخدام معرف سالب مؤقت للعناصر الجديدة
    const newId = Math.min(0, ...data.achievements.map(item => item.id || 0)) - 1;
    const newOrder = data.achievements.length > 0 
      ? Math.max(...data.achievements.map(item => item.achievement_order)) + 1 
      : 1;
    
    const newAchievement: Achievement = {
      id: newId,
      title: '',
      text: '',
      icon: 'FaTrophy', // أيقونة افتراضية
      achievement_order: newOrder
    };
    
    setData({
      ...data,
      achievements: [...data.achievements, newAchievement]
    });
  };

  const removeAchievement = (index: number) => {
    const updatedAchievements = [...data.achievements];
    updatedAchievements.splice(index, 1);
    
    // إعادة ترتيب العناصر المتبقية
    const reorderedAchievements = updatedAchievements.map((item, idx) => ({
      ...item,
      achievement_order: idx + 1
    }));
    
    setData({
      ...data,
      achievements: reorderedAchievements
    });
  };

  const reorderAchievement = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === data.achievements.length - 1)
    ) {
      return; // لا يمكن تحريك العنصر الأول للأعلى أو العنصر الأخير للأسفل
    }
    
    const updatedAchievements = [...data.achievements];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // تبديل العناصر
    [updatedAchievements[index], updatedAchievements[targetIndex]] = 
      [updatedAchievements[targetIndex], updatedAchievements[index]];
    
    // تحديث الترتيب
    const reorderedAchievements = updatedAchievements.map((item, idx) => ({
      ...item,
      achievement_order: idx + 1
    }));
    
    setData({
      ...data,
      achievements: reorderedAchievements
    });
  };

  // دوال إدارة القوانين
  const updateRulesSection = (field: keyof SectionHeader, value: string) => {
    setData({
      ...data,
      rulesSection: {
        ...data.rulesSection,
        [field]: value
      } as SectionHeader
    });
  };

  const updateRule = (index: number, field: keyof Rule, value: string | number) => {
    const updatedRules = [...data.rules];
    updatedRules[index] = {
      ...updatedRules[index],
      [field]: value
    };
    
    setData({
      ...data,
      rules: updatedRules
    });
  };

  const addRule = () => {
    // استخدام معرف سالب مؤقت للعناصر الجديدة
    const newId = Math.min(0, ...data.rules.map(item => item.id || 0)) - 1;
    const newOrder = data.rules.length > 0 
      ? Math.max(...data.rules.map(item => item.rule_order)) + 1 
      : 1;
    
    const newRule: Rule = {
      id: newId,
      title: '',
      details: '',
      rule_order: newOrder
    };
    
    setData({
      ...data,
      rules: [...data.rules, newRule]
    });
  };

  const removeRule = (index: number) => {
    const updatedRules = [...data.rules];
    updatedRules.splice(index, 1);
    
    // إعادة ترتيب العناصر المتبقية
    const reorderedRules = updatedRules.map((item, idx) => ({
      ...item,
      rule_order: idx + 1
    }));
    
    setData({
      ...data,
      rules: reorderedRules
    });
  };

  const reorderRule = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === data.rules.length - 1)
    ) {
      return; // لا يمكن تحريك العنصر الأول للأعلى أو العنصر الأخير للأسفل
    }
    
    const updatedRules = [...data.rules];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // تبديل العناصر
    [updatedRules[index], updatedRules[targetIndex]] = 
      [updatedRules[targetIndex], updatedRules[index]];
    
    // تحديث الترتيب
    const reorderedRules = updatedRules.map((item, idx) => ({
      ...item,
      rule_order: idx + 1
    }));
    
    setData({
      ...data,
      rules: reorderedRules
    });
  };

  // دوال إدارة الإرشادات
  const updateGuidelinesSection = (field: keyof SectionHeader, value: string) => {
    setData({
      ...data,
      guidelinesSection: {
        ...data.guidelinesSection,
        [field]: value
      } as SectionHeader
    });
  };

  const updateGuideline = (index: number, field: keyof Guideline, value: string | number) => {
    const updatedGuidelines = [...data.guidelines];
    updatedGuidelines[index] = {
      ...updatedGuidelines[index],
      [field]: value
    };
    
    setData({
      ...data,
      guidelines: updatedGuidelines
    });
  };

  const addGuideline = () => {
    // استخدام معرف سالب مؤقت للعناصر الجديدة
    const newId = Math.min(0, ...data.guidelines.map(item => item.id || 0)) - 1;
    const newOrder = data.guidelines.length > 0 
      ? Math.max(...data.guidelines.map(item => item.guideline_order)) + 1 
      : 1;
    
    const newGuideline: Guideline = {
      id: newId,
      title: '',
      text: '',
      icon: 'FaInfoCircle', // أيقونة افتراضية
      guideline_order: newOrder
    };
    
    setData({
      ...data,
      guidelines: [...data.guidelines, newGuideline]
    });
  };

  const removeGuideline = (index: number) => {
    const updatedGuidelines = [...data.guidelines];
    updatedGuidelines.splice(index, 1);
    
    // إعادة ترتيب العناصر المتبقية
    const reorderedGuidelines = updatedGuidelines.map((item, idx) => ({
      ...item,
      guideline_order: idx + 1
    }));
    
    setData({
      ...data,
      guidelines: reorderedGuidelines
    });
  };

  const reorderGuideline = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === data.guidelines.length - 1)
    ) {
      return; // لا يمكن تحريك العنصر الأول للأعلى أو العنصر الأخير للأسفل
    }
    
    const updatedGuidelines = [...data.guidelines];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // تبديل العناصر
    [updatedGuidelines[index], updatedGuidelines[targetIndex]] = 
      [updatedGuidelines[targetIndex], updatedGuidelines[index]];
    
    // تحديث الترتيب
    const reorderedGuidelines = updatedGuidelines.map((item, idx) => ({
      ...item,
      guideline_order: idx + 1
    }));
    
    setData({
      ...data,
      guidelines: reorderedGuidelines
    });
  };

  // دوال تحديث قسم البطل
  const updateHeroSection = (field: keyof HeroSection, value: string) => {
    setData({
      ...data,
      hero: {
        ...data.hero,
        [field]: value
      } as HeroSection
    });
  };

  // دوال تحديث قسم المقدمة
  const updateIntroSection = (field: keyof IntroSection, value: string) => {
    setData({
      ...data,
      intro: {
        ...data.intro,
        [field]: value
      } as IntroSection
    });
  };

  // إذا كانت البيانات قيد التحميل
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>جاري تحميل البيانات...</p>
      </div>
    );
  }

  return (
    <div className={styles.editorContainer}>
      <h1 className={styles.editorTitle}>محرر صفحة عن الجامعة</h1>
      
      {/* عرض رسالة التحميل */}
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}></div>
          <div className={styles.loadingMessage}>جاري تحميل البيانات...</div>
        </div>
      )}
      
      {/* شريط التبويب */}
      <div className={styles.tabsContainer}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'hero' ? styles.tabButtonActive : ''}`}
          onClick={() => setActiveTab('hero')}
        >
          <i className="fas fa-image"></i> قسم البطل
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'intro' ? styles.tabButtonActive : ''}`}
          onClick={() => setActiveTab('intro')}
        >
          <i className="fas fa-info-circle"></i> المقدمة والإحصائيات
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'achievements' ? styles.tabButtonActive : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          <i className="fas fa-trophy"></i> الإنجازات
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'rules' ? styles.tabButtonActive : ''}`}
          onClick={() => setActiveTab('rules')}
        >
          <i className="fas fa-gavel"></i> القوانين
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'guidelines' ? styles.tabButtonActive : ''}`}
          onClick={() => setActiveTab('guidelines')}
        >
          <i className="fas fa-book"></i> الإرشادات
        </button>
      </div>
      
      {/* قسم البطل */}
      <section className={`${styles.sectionContent} ${activeTab === 'hero' ? styles.sectionContentActive : ''}`}>
        <h2 className={styles.sectionTitle}>القسم الرئيسي</h2>
        <div className={styles.formGroup}>
          <label>العنوان الرئيسي:</label>
          <input
            type="text"
            value={data.hero?.title || ''}
            onChange={(e) => updateHeroSection('title', e.target.value)}
            className={styles.textInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="heroSubtitle">
            <i className="fas fa-heading" style={{ fontSize: '0.9rem', marginLeft: '8px', color: '#0056b3' }}></i>
            العنوان الفرعي للبطل
          </label>
          <input
            type="text"
            value={data.hero?.subtitle || ''}
            onChange={(e) => updateHeroSection('subtitle', e.target.value)}
            className={styles.textInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="heroImage">
            <i className="fas fa-image" style={{ marginLeft: '8px', color: '#0056b3' }}></i>
            صورة البطل (URL)
          </label>
          <input
            type="text"
            value={data.hero?.background_image || ''}
            onChange={(e) => updateHeroSection('background_image', e.target.value)}
            className={styles.textInput}
          />
        </div>
      </section>

      {/* قسم المقدمة والإحصائيات */}
      <section className={`${styles.sectionContent} ${activeTab === 'intro' ? styles.sectionContentActive : ''}`}>
        <div className={styles.sectionTitle}>
          <i className="fas fa-info-circle" style={{ fontSize: '1.2rem', color: '#0056b3' }}></i>
          قسم المقدمة والإحصائيات
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="heroTitle">
            <i className="fas fa-heading" style={{ marginLeft: '8px', color: '#0056b3' }}></i>
            عنوان المقدمة
          </label>
          <input
            type="text"
            value={data.intro?.section_title || ''}
            onChange={(e) => updateIntroSection('section_title', e.target.value)}
            className={styles.textInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="paragraph1">
            <i className="fas fa-align-left" style={{ marginLeft: '8px', color: '#0056b3' }}></i>
            الفقرة الأولى
          </label>
          <textarea
            value={data.intro?.paragraph_1 || ''}
            onChange={(e) => updateIntroSection('paragraph_1', e.target.value)}
            className={styles.textArea}
            rows={4}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="paragraph2">
            <i className="fas fa-align-left" style={{ marginLeft: '8px', color: '#0056b3' }}></i>
            الفقرة الثانية
          </label>
          <textarea
            value={data.intro?.paragraph_2 || ''}
            onChange={(e) => updateIntroSection('paragraph_2', e.target.value)}
            className={styles.textArea}
            rows={4}
          />
        </div>
        
        <div className={styles.subSectionTitle}>
          <i className="fas fa-chart-bar" style={{ fontSize: '1.2rem', color: '#0056b3' }}></i>
          الإحصائيات
        </div>
        
        {/* قائمة الإحصائيات */}
        <div className={styles.itemsList}>
          {data.statistics.map((stat, index) => (
            <div key={stat.id || index} className={styles.itemCard}>
              <div className={styles.itemHeader}>
                <h3>
                  <i className="fas fa-star" style={{ marginLeft: '8px', color: '#0056b3', fontSize: '0.9rem' }}></i>
                  إحصائية {index + 1}
                </h3>
                <div className={styles.itemActions}>
                  <button 
                    onClick={() => reorderStatistic(index, 'up')} 
                    disabled={index === 0}
                    className={styles.actionButton}
                    title="تحريك للأعلى"
                  >
                    ↑
                  </button>
                  <button 
                    onClick={() => reorderStatistic(index, 'down')} 
                    disabled={index === data.statistics.length - 1}
                    className={styles.actionButton}
                    title="تحريك للأسفل"
                  >
                    ↓
                  </button>
                  <button 
                    onClick={() => removeStatistic(index)}
                    className={styles.removeButton}
                    title="حذف"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="description">
                  <i className="fas fa-align-left" style={{ marginLeft: '8px', color: '#0056b3' }}></i>
                  وصف الإحصائية
                </label>
                <input
                  type="text"
                  value={stat.value || ''}
                  onChange={(e) => updateStatistic(index, 'value', e.target.value)}
                  className={styles.textInput}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="title">
                  <i className="fas fa-heading" style={{ marginLeft: '8px', color: '#0056b3' }}></i>
                  عنوان الإحصائية
                </label>
                <input
                  type="text"
                  value={stat.title || ''}
                  onChange={(e) => updateStatistic(index, 'title', e.target.value)}
                  className={styles.textInput}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* زر إضافة إحصائية جديدة */}
        <div className={styles.addButtonContainer}>
          <button 
            onClick={addStatistic} 
            className={styles.addButton}
          >
            إضافة إحصائية جديدة
          </button>
        </div>
      </section>

      {/* قسم الإنجازات */}
      <section className={`${styles.sectionContent} ${activeTab === 'achievements' ? styles.sectionContentActive : ''}`}>
        <div className={styles.sectionTitle}>
          <i className="fas fa-trophy" style={{ fontSize: '1.2rem', color: '#0056b3' }}></i>
          قسم الإنجازات
        </div>
        
        {/* عنوان ووصف القسم */}
        <div className={styles.formGroup}>
          <label htmlFor="title">
            <i className="fas fa-heading" style={{ marginLeft: '8px', color: '#0056b3' }}></i>
            عنوان الإنجازات
          </label>
          <input
            type="text"
            value={data.achievementsSection?.title || ''}
            onChange={(e) => updateAchievementSection('title', e.target.value)}
            className={styles.textInput}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="description">
            <i className="fas fa-align-left" style={{ marginLeft: '8px', color: '#0056b3' }}></i>
            وصف الإنجازات
          </label>
          <textarea
            value={data.achievementsSection?.description || ''}
            onChange={(e) => updateAchievementSection('description', e.target.value)}
            className={styles.textArea}
            rows={3}
          />
        </div>
        
        {/* قائمة الإنجازات */}
        <div className={styles.itemsList}>
          {data.achievements.map((achievement, index) => (
            <div key={achievement.id || index} className={styles.itemCard}>
              <div className={styles.itemHeader}>
                <h3>
                  <i className="fas fa-star" style={{ marginLeft: '8px', color: '#0056b3', fontSize: '0.9rem' }}></i>
                  إنجاز {index + 1}
                </h3>
                <div className={styles.itemActions}>
                  <button 
                    onClick={() => reorderAchievement(index, 'up')} 
                    disabled={index === 0}
                    className={styles.actionButton}
                    title="تحريك للأعلى"
                  >
                    ↑
                  </button>
                  <button 
                    onClick={() => reorderAchievement(index, 'down')} 
                    disabled={index === data.achievements.length - 1}
                    className={styles.actionButton}
                    title="تحريك للأسفل"
                  >
                    ↓
                  </button>
                  <button 
                    onClick={() => removeAchievement(index)}
                    className={styles.removeButton}
                    title="حذف"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="title">
                  <i className="fas fa-heading" style={{ marginLeft: '8px', color: '#0056b3' }}></i>
                  عنوان الإنجاز
                </label>
                <input
                  type="text"
                  value={achievement.title || ''}
                  onChange={(e) => updateAchievement(index, 'title', e.target.value)}
                  className={styles.textInput}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="text">
                  <i className="fas fa-align-left" style={{ marginLeft: '8px', color: '#0056b3' }}></i>
                  نص الإنجاز
                </label>
                <textarea
                  value={achievement.text || ''}
                  onChange={(e) => updateAchievement(index, 'text', e.target.value)}
                  className={styles.textArea}
                  rows={3}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="icon">
                  <i className="fas fa-image" style={{ marginLeft: '8px', color: '#0056b3' }}></i>
                  أيقونة الإنجاز
                </label>
                <input
                  type="text"
                  value={achievement.icon || ''}
                  onChange={(e) => updateAchievement(index, 'icon', e.target.value)}
                  className={styles.textInput}
                  placeholder="مثل: FaTrophy"
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* زر إضافة إنجاز جديد */}
        <div className={styles.addButtonContainer}>
          <button 
            onClick={addAchievement} 
            className={styles.addButton}
          >
            إضافة إنجاز جديد
          </button>
        </div>
      </section>

      {/* قسم القوانين */}
      <section className={`${styles.sectionContent} ${activeTab === 'rules' ? styles.sectionContentActive : ''}`}>
        <div className={styles.sectionTitle}>
          <i className="fas fa-gavel" style={{ fontSize: '1.2rem', color: '#0056b3' }}></i>
          قسم القوانين
        </div>
        
        {/* عنوان ووصف القسم */}
        <div className={styles.formGroup}>
          <label htmlFor="title">
            <i className="fas fa-heading" style={{ marginLeft: '8px', color: '#0056b3' }}></i>
            عنوان القوانين
          </label>
          <input
            type="text"
            value={data.rulesSection?.title || ''}
            onChange={(e) => updateRulesSection('title', e.target.value)}
            className={styles.textInput}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="description">
            <i className="fas fa-align-left" style={{ marginLeft: '8px', color: '#0056b3' }}></i>
            وصف القوانين
          </label>
          <textarea
            value={data.rulesSection?.description || ''}
            onChange={(e) => updateRulesSection('description', e.target.value)}
            className={styles.textArea}
            rows={3}
          />
        </div>
        
        {/* قائمة القوانين */}
        <div className={styles.itemsList}>
          {data.rules.map((rule, index) => (
            <div key={rule.id || index} className={styles.itemCard}>
              <div className={styles.itemHeader}>
                <h3>
                  <i className="fas fa-star" style={{ marginLeft: '8px', color: '#0056b3', fontSize: '0.9rem' }}></i>
                  قانون {index + 1}
                </h3>
                <div className={styles.itemActions}>
                  <button 
                    onClick={() => reorderRule(index, 'up')} 
                    disabled={index === 0}
                    className={styles.actionButton}
                    title="تحريك للأعلى"
                  >
                    ↑
                  </button>
                  <button 
                    onClick={() => reorderRule(index, 'down')} 
                    disabled={index === data.rules.length - 1}
                    className={styles.actionButton}
                    title="تحريك للأسفل"
                  >
                    ↓
                  </button>
                  <button 
                    onClick={() => removeRule(index)}
                    className={styles.removeButton}
                    title="حذف"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="title">
                  <i className="fas fa-heading" style={{ marginLeft: '8px', color: '#0056b3' }}></i>
                  عنوان القانون
                </label>
                <input
                  type="text"
                  value={rule.title || ''}
                  onChange={(e) => updateRule(index, 'title', e.target.value)}
                  className={styles.textInput}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="details">
                  <i className="fas fa-align-left" style={{ marginLeft: '8px', color: '#0056b3' }}></i>
                  تفاصيل القانون
                </label>
                <textarea
                  value={rule.details || ''}
                  onChange={(e) => updateRule(index, 'details', e.target.value)}
                  className={styles.textArea}
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* زر إضافة قانون جديد */}
        <div className={styles.addButtonContainer}>
          <button 
            onClick={addRule} 
            className={styles.addButton}
          >
            إضافة قانون جديد
          </button>
        </div>
      </section>

      {/* قسم الإرشادات */}
      <section className={`${styles.sectionContent} ${activeTab === 'guidelines' ? styles.sectionContentActive : ''}`}>
        <div className={styles.sectionTitle}>
          <i className="fas fa-lightbulb" style={{ fontSize: '1.2rem', color: '#0056b3' }}></i>
          قسم الإرشادات
        </div>
        
        {/* عنوان ووصف القسم */}
        <div className={styles.formGroup}>
          <label htmlFor="title">
            <i className="fas fa-heading" style={{ marginLeft: '8px', color: '#0056b3' }}></i>
            عنوان الإرشادات
          </label>
          <input
            type="text"
            value={data.guidelinesSection?.title || ''}
            onChange={(e) => updateGuidelinesSection('title', e.target.value)}
            className={styles.textInput}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="description">
            <i className="fas fa-align-left" style={{ marginLeft: '8px', color: '#0056b3' }}></i>
            وصف الإرشادات
          </label>
          <textarea
            value={data.guidelinesSection?.description || ''}
            onChange={(e) => updateGuidelinesSection('description', e.target.value)}
            className={styles.textArea}
            rows={3}
          />
        </div>
        
        {/* قائمة الإرشادات */}
        <div className={styles.itemsList}>
          {data.guidelines.map((guideline, index) => (
            <div key={guideline.id || index} className={styles.itemCard}>
              <div className={styles.itemHeader}>
                <h3>
                  <i className="fas fa-star" style={{ marginLeft: '8px', color: '#0056b3', fontSize: '0.9rem' }}></i>
                  إرشاد {index + 1}
                </h3>
                <div className={styles.itemActions}>
                  <button 
                    onClick={() => reorderGuideline(index, 'up')} 
                    disabled={index === 0}
                    className={styles.actionButton}
                    title="تحريك للأعلى"
                  >
                    ↑
                  </button>
                  <button 
                    onClick={() => reorderGuideline(index, 'down')} 
                    disabled={index === data.guidelines.length - 1}
                    className={styles.actionButton}
                    title="تحريك للأسفل"
                  >
                    ↓
                  </button>
                  <button 
                    onClick={() => removeGuideline(index)}
                    className={styles.removeButton}
                    title="حذف"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="title">
                  <i className="fas fa-heading" style={{ marginLeft: '8px', color: '#0056b3' }}></i>
                  عنوان الإرشاد
                </label>
                <input
                  type="text"
                  value={guideline.title || ''}
                  onChange={(e) => updateGuideline(index, 'title', e.target.value)}
                  className={styles.textInput}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="text">
                  <i className="fas fa-align-left" style={{ marginLeft: '8px', color: '#0056b3' }}></i>
                  نص الإرشاد
                </label>
                <textarea
                  value={guideline.text || ''}
                  onChange={(e) => updateGuideline(index, 'text', e.target.value)}
                  className={styles.textArea}
                  rows={3}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="icon">
                  <i className="fas fa-image" style={{ marginLeft: '8px', color: '#0056b3' }}></i>
                  أيقونة الإرشاد
                </label>
                <input
                  type="text"
                  value={guideline.icon || ''}
                  onChange={(e) => updateGuideline(index, 'icon', e.target.value)}
                  className={styles.textInput}
                  placeholder="مثل: FaInfoCircle"
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* زر إضافة إرشاد جديد */}
        <div className={styles.addButtonContainer}>
          <button 
            onClick={addGuideline} 
            className={styles.addButton}
          >
            إضافة إرشاد جديد
          </button>
        </div>
      </section>
      
      {/* زر الحفظ */}
      <div className={styles.saveButtonContainer}>
        {error && (
          <div className={styles.errorMessage}>
            <i className="fas fa-exclamation-circle" style={{ fontSize: '1.2rem' }}></i>
            {error}
          </div>
        )}
        {success && (
          <div className={styles.successMessage}>
            <i className="fas fa-check-circle" style={{ fontSize: '1.2rem' }}></i>
            {success}
          </div>
        )}
        <button
          className={styles.saveButton}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> جاري الحفظ...
            </>
          ) : (
            <>
              <i className="fas fa-save"></i> حفظ التغييرات
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AboutUniversityEditor;