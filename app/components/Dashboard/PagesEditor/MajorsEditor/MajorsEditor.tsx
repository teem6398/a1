'use client';
import React, { useState, useEffect, FormEvent } from 'react';
import styles from './MajorsEditor.module.css';
import { select } from 'framer-motion/client';

// واجهات البيانات المحدثة
interface Course {
  id?: number;
  program_id?: number;
  name_ar: string;
  name_en?: string;
  description_ar?: string; // تم إضافته
  description_en?: string; // تم إضافته
  semester?: number;
  is_elective?: boolean;
}

interface JobOpportunity {
  id?: number;
  program_id?: number;
  title_ar: string;
  title_en?: string;
  icon_url?: string;
}

interface Project {
  id?: number;
  program_id?: number;
  title_ar: string;
  title_en?: string;
  description_ar?: string;
  description_en?: string;
  image_url?: string;
}

interface Skill {
  id?: number;
  program_id?: number;
  name_ar: string;
  name_en?: string;
  icon_url?: string;
}

interface Major {
  id: number; // 0 لإنشاء جديد
  name_ar: string;
  name_en?: string;
  college_id: number;
  hero_title?: string;
  hero_subtitle?: string;
  hero_image_url?: string;
  about_text?: string;
  courses: Course[];
  jobOpportunities: JobOpportunity[]; // جديد
  projects: Project[]; // جديد
  skills: Skill[]; // جديد
}

interface College {
  id: number;
  name_ar: string;
  name_en?: string;
}

interface MajorsEditorProps {
  majorId: number;
  onSaveSuccess: (savedMajorData: Major) => void;
  onCancel: () => void;
}

const MajorsEditor: React.FC<MajorsEditorProps> = ({ majorId, onSaveSuccess: _onSaveSuccess, onCancel: _onCancel }) => { // Global onSaveSuccess/onCancel might be re-evaluated
  const [major, setMajor] = useState<Major | null>(null);
  // const [colleges, setColleges] = useState<College[]>([]); // Removed colleges state
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [sectionStates, setSectionStates] = useState<Record<string, { loading: boolean; message: { type: 'success' | 'error'; text: string } | null }>>({});

  const updateSectionState = (section: string, loading: boolean, message: { type: 'success' | 'error'; text: string } | null) => {
    setSectionStates(prev => ({ ...prev, [section]: { loading, message } }));
  };

  useEffect(() => {
    console.log('[MajorsEditor] useEffect triggered. majorId:', majorId);
    const fetchData = async () => {
      setLoading(true);
      setMessage(null);
      try {
        // Removed college fetching logic
        // const collegesRes = await fetch('/api/api_pages/colleges');
        // if (!collegesRes.ok) throw new Error('فشل في جلب الكليات');
        // const collegesData: College[] = await collegesRes.json();
        // console.log('[MajorsEditor] Colleges data fetched:', collegesData);
        // setColleges(collegesData);

        if (majorId !== 0) {
          console.log(`[MajorsEditor] Fetching major data for ID: ${majorId} from /api/api_pages/MajorsEditor?id=${majorId}`);
          const majorRes = await fetch(`/api/api_pages/MajorsEditor?id=${majorId}`);
          console.log('[MajorsEditor] Major API response status:', majorRes.status);
          if (!majorRes.ok) {
            const errorText = await majorRes.text();
            console.error('[MajorsEditor] Error fetching major data:', majorRes.status, errorText);
            throw new Error(`فشل في جلب بيانات التخصص: ${majorRes.status} ${errorText}`);
          }
          const majorData: Major = await majorRes.json();
          console.log('[MajorsEditor] Major data fetched from API:', majorData);
          // التأكد من أن جميع المصفوفات موجودة حتى لو كانت فارغة من الـ API
          setMajor({
            ...majorData,
            courses: majorData.courses || [],
            jobOpportunities: majorData.jobOpportunities || [],
            projects: majorData.projects || [],
            skills: majorData.skills || [],
          });
          console.log('[MajorsEditor] Major state set with fetched data:', majorData);
        } else {
          setMajor({
            id: 0,
            name_ar: '',
            name_en: '',
            college_id: 1, // Default college_id for new majors
            hero_title: '',
            hero_subtitle: '',
            hero_image_url: '',
            about_text: '',
            courses: [],
            jobOpportunities: [],
            projects: [],
            skills: [],
          });
          console.log('[MajorsEditor] Major state initialized for new major.');
        }
      } catch (error) {
        console.error('[MajorsEditor] Error in fetchData:', error);
        setMessage({ type: 'error', text: error instanceof Error ? error.message : 'حدث خطأ غير متوقع عند تحميل البيانات' });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [majorId]);

  console.log('[MajorsEditor] Current major state:', major);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMajor(prev => prev ? { ...prev, [name]: name === 'college_id' ? parseInt(value) : value } : null);
  };

  // --- Generic Handlers for Sub-Entities ---
  const handleSubEntityChange = <T extends Course | JobOpportunity | Project | Skill>(
    listName: keyof Major,
    index: number,
    field: keyof T,
    value: string | number | boolean
  ) => {
    if (!major) return;
    const list = major[listName] as T[];
    const newList = [...list];
    (newList[index] as any)[field] = value;
    setMajor(prev => prev ? { ...prev, [listName]: newList } : null);
  };

  const addSubEntity = <T extends Course | JobOpportunity | Project | Skill>(
    listName: keyof Major,
    defaultItem: Partial<T>
  ) => {
    if (!major) return;
    const list = major[listName] as T[];
    setMajor(prev => prev ? { ...prev, [listName]: [...list, defaultItem] } : null);
  };

  const handleSaveSection = async (sectionName: string, sectionData: any) => {
    if (!major) {
      updateSectionState(sectionName, false, { type: 'error', text: 'بيانات التخصص غير متاحة للعمليات.' });
      return;
    }

    updateSectionState(sectionName, true, null); // Set loading state

    const isNewMajor = major.id === 0;
    const method = isNewMajor ? 'POST' : 'PUT';
    const endpoint = isNewMajor ? '/api/api_pages/MajorsEditor' : `/api/api_pages/MajorsEditor?id=${major.id}`;

    try {
      const payload = {
        section: sectionName,
        ...sectionData,
      };

      // If it's a new major and this is the 'generalInfo' section, we might send the whole major object
      // or expect the backend to create the major with this first piece of info.
      // For simplicity, we'll send the section data. Backend needs to handle this.
      // If we are creating a new major, the first save should ideally be the 'generalInfo' or a dedicated 'create' action.
      if (isNewMajor && sectionName !== 'generalInfo' && sectionName !== 'initialCreate') {
        updateSectionState(sectionName, false, { type: 'error', text: 'يرجى حفظ البيانات الأساسية للتخصص الجديد أولاً.' });
        return;
      }

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || `فشل ${isNewMajor ? 'إنشاء وحفظ' : 'تحديث'} قسم ${sectionName}`);
      }

      updateSectionState(sectionName, false, { type: 'success', text: `تم ${isNewMajor && responseData.major ? 'إنشاء وحفظ' : 'تحديث'} قسم ${sectionName} بنجاح!` });
      
      // If a new major was created, the response should contain the full major data including the new ID.
      // Or if an existing major was updated, it might also return the updated major data.
      if (responseData.major) {
        // Update the local major state with the response from the server
        // This is crucial if a new major was created to get its ID, or if backend modifies/adds data.
        setMajor(responseData.major);
        if (_onSaveSuccess) {
          _onSaveSuccess(responseData.major); // Notify parent component
        }
      } else if (!isNewMajor) {
        // For existing majors, if only partial data is returned or no major data, 
        // we might need to merge sectionData into the existing major state locally.
        // However, it's better if the API consistently returns the updated major object.
        // For now, let's assume the API returns the full major or we re-fetch if needed.
        // Or, update local state optimistically if API doesn't return full object:
        setMajor(prevMajor => prevMajor ? { ...prevMajor, ...sectionData } : null);
        if (_onSaveSuccess && major) { // Ensure major is not null
             // We should ideally pass the updated major object to onSaveSuccess
             // This requires merging sectionData into the current major state
             const updatedMajorData = { ...major, ...sectionData };
            _onSaveSuccess(updatedMajorData);
        }
      }

    } catch (error) {
      console.error(`Error saving section ${sectionName}:`, error);
      const errorMessage = error instanceof Error ? error.message : `خطأ غير معروف في ${isNewMajor ? 'إنشاء وحفظ' : 'تحديث'} قسم ${sectionName}.`;
      updateSectionState(sectionName, false, { type: 'error', text: errorMessage });
    }
  };

  // This is the correct single definition of removeSubEntity
  const removeSubEntity = <T extends Course | JobOpportunity | Project | Skill>(
    listName: keyof Major,
    index: number
  ) => {
    if (!major) return;
    const list = major[listName] as T[];
    setMajor(prev => prev ? { ...prev, [listName]: list.filter((_, i) => i !== index) } : null);
  };
  // --- End Generic Handlers ---

  // Conditional returns must be before the main form return
  if (loading) {
    // While loading, if major is not yet available (especially for existing majorId), show loading.
    // If it's a new major (majorId === 0), major should be initialized quickly, but loading might still be true briefly.
    return <p className={styles.loadingMessage}>جاري تحميل بيانات التخصص...</p>;
  }

  // After loading is false:
  if (!major) {
    // If major is still null after loading, it means fetching failed for existing majorId,
    // or initialization failed for new majorId (less likely with current useEffect).
    if (majorId !== 0) {
      return <p className={styles.errorMessage}>لم يتم العثور على التخصص المطلوب أو فشل تحميل البيانات.</p>;
    } else {
      // This case (majorId === 0 and major is null after loading) should ideally not happen 
      // as useEffect initializes a new major object. But as a fallback:
      return <p className={styles.errorMessage}>فشل في تهيئة بيانات تخصص جديد. يرجى المحاولة مرة أخرى.</p>;
    }
  }

  // At this point, loading is false and major is guaranteed to be non-null.
  // So, we can proceed to render the main form. // Fallback

  return (
    <div className={styles.editorForm}> 
      {/* General message area - can be removed or repurposed if all messages are per-section */}
      {/* {message && <div className={`${styles.message} ${styles[message.type]}`}>{message.text}</div>} */}
      
      <fieldset className={styles.formSection}>
        <legend>بيانات التخصص الأساسية</legend>
        {/* ... (name_ar, name_en, college_id fields - same as before) ... */}
        <div className={styles.formGroup}>
          <label htmlFor="name_ar">اسم التخصص (عربي):</label>
          <input type="text" id="name_ar" name="name_ar" value={major.name_ar} onChange={handleInputChange} required className={styles.formInput} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="name_en">اسم التخصص (إنجليزي):</label>
          <input type="text" id="name_en" name="name_en" value={major.name_en || ''} onChange={handleInputChange} className={styles.formInput} />
        </div>
        {/* College Select Dropdown */}
        <div className={styles.formGroup}>
          <label htmlFor="college_id">الكلية:</label>
          <select id="college_id" name="college_id" value={major.college_id} onChange={handleInputChange} required className={styles.formInput}>
            <option value="">اختر الكلية</option>
            <option value="1">كلية الهندسة</option>
            <option value="2">كلية العلوم الإدارية</option>
            <option value="3">كلية الطب</option>
          </select>
        </div>
        <div className={styles.sectionActions}>
          <button 
            type="button" 
            onClick={() => {
              if (major) {
                handleSaveSection('generalInfo', { name_ar: major.name_ar, name_en: major.name_en, college_id: Number(major.college_id) });
              } else {
                // This case should ideally not be reached if the button is only rendered when major is not null.
                // However, adding a safeguard.
                updateSectionState('generalInfo', false, { type: 'error', text: 'بيانات التخصص غير متاحة للحفظ.' });
              }
            }}
            disabled={sectionStates['generalInfo']?.loading}
            className={`${styles.button} ${styles.saveSectionButton}`}
          >
            {sectionStates['generalInfo']?.loading ? 'جاري الحفظ...' : 'حفظ البيانات الأساسية'}
          </button>
          {sectionStates['generalInfo']?.message && (
            <div className={`${styles.message} ${styles[sectionStates['generalInfo']!.message!.type]}`}>
              {sectionStates['generalInfo']!.message!.text}
            </div>
          )}
        </div>
      </fieldset>

      {/* Hero Section */}
      <fieldset className={styles.formSection}>
        <legend>قسم الهيرو (Hero Section)</legend>
        <div className={styles.formGroup}>
          <label htmlFor="hero_title">العنوان الرئيسي للهيرو:</label>
          <input type="text" id="hero_title" name="hero_title" value={major.hero_title || ''} onChange={handleInputChange} className={styles.formInput} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="hero_subtitle">العنوان الفرعي للهيرو:</label>
          <input type="text" id="hero_subtitle" name="hero_subtitle" value={major.hero_subtitle || ''} onChange={handleInputChange} className={styles.formInput} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="hero_image_url">رابط صورة الهيرو:</label>
          <input type="text" id="hero_image_url" name="hero_image_url" value={major.hero_image_url || ''} onChange={handleInputChange} className={styles.formInput} />
        </div>
        <div className={styles.sectionActions}>
          <button 
            type="button" 
            onClick={() => {
              if (major) {
                handleSaveSection('heroSection', { hero_title: major.hero_title, hero_subtitle: major.hero_subtitle, hero_image_url: major.hero_image_url });
              } else {
                updateSectionState('heroSection', false, { type: 'error', text: 'بيانات التخصص غير متاحة للحفظ.' });
              }
            }}
            disabled={sectionStates['heroSection']?.loading}
            className={`${styles.button} ${styles.saveSectionButton}`}
          >
            {sectionStates['heroSection']?.loading ? 'جاري الحفظ...' : 'حفظ قسم الهيرو'}
          </button>
          {sectionStates['heroSection']?.message && (
            <div className={`${styles.message} ${styles[sectionStates['heroSection']!.message!.type]}`}>
              {sectionStates['heroSection']!.message!.text}
            </div>
          )}
        </div>
      </fieldset>

      {/* About Section */}
      <fieldset className={styles.formSection}>
        <legend>عن التخصص (About Section)</legend>
        <div className={styles.formGroup}>
          <label htmlFor="about_text">نص عن التخصص:</label>
          <textarea id="about_text" name="about_text" value={major.about_text || ''} onChange={handleInputChange} className={styles.formInput} rows={5}></textarea>
        </div>
        <div className={styles.sectionActions}>
          <button 
            type="button" 
            onClick={() => {
              if (major) {
                handleSaveSection('aboutSection', { about_text: major.about_text });
              } else {
                updateSectionState('aboutSection', false, { type: 'error', text: 'بيانات التخصص غير متاحة للحفظ.' });
              }
            }}
            disabled={sectionStates['aboutSection']?.loading}
            className={`${styles.button} ${styles.saveSectionButton}`}
          >
            {sectionStates['aboutSection']?.loading ? 'جاري الحفظ...' : 'حفظ قسم النبذة'}
          </button>
          {sectionStates['aboutSection']?.message && (
            <div className={`${styles.message} ${styles[sectionStates['aboutSection']!.message!.type]}`}>
              {sectionStates['aboutSection']!.message!.text}
            </div>
          )}
        </div>
      </fieldset>

      
      {/* About Section */}
      <fieldset className={styles.formSection}>
        <legend>عن التخصص</legend>
        {/* ... (about_text field - same as before) ... */}
        <div className={styles.formGroup}>
          <label htmlFor="about_text">نص "عن التخصص":</label>
          <textarea id="about_text" name="about_text" value={major.about_text || ''} onChange={handleInputChange} rows={5} className={styles.largeContentTextarea}></textarea>
        </div>
      </fieldset>

      {/* Courses Section - Updated */}
      <fieldset className={styles.formSection}>
        <legend>المقررات الدراسية</legend>
        {major.courses.map((course, index) => (
          <div key={`course-${index}`} className={`${styles.subEntityItem} ${styles.formGrid}`}>
            <input type="text" placeholder="اسم المقرر (عربي)" value={course.name_ar} onChange={e => handleSubEntityChange<Course>('courses', index, 'name_ar', e.target.value)} required className={styles.formInput} />
            <input type="text" placeholder="اسم المقرر (إنجليزي)" value={course.name_en || ''} onChange={e => handleSubEntityChange<Course>('courses', index, 'name_en', e.target.value)} className={styles.formInput} />
            <textarea placeholder="وصف المقرر (عربي)" value={course.description_ar || ''} onChange={e => handleSubEntityChange<Course>('courses', index, 'description_ar', e.target.value)} rows={2} className={styles.formInput}></textarea>
            <textarea placeholder="وصف المقرر (إنجليزي)" value={course.description_en || ''} onChange={e => handleSubEntityChange<Course>('courses', index, 'description_en', e.target.value)} rows={2} className={styles.formInput}></textarea>
            <select value={course.semester || 1} onChange={e => handleSubEntityChange<Course>('courses', index, 'semester', parseInt(e.target.value))} className={styles.formInput}>
              {Array.from(Array(10).keys()).map(i => <option key={i + 1} value={i + 1}>الفصل {i + 1}</option>)}
            </select>
            <label className={styles.checkboxLabel}><input type="checkbox" checked={course.is_elective || false} onChange={e => handleSubEntityChange<Course>('courses', index, 'is_elective', e.target.checked)} /> اختياري</label>
            <button type="button" onClick={() => removeSubEntity<Course>('courses', index)} className={`${styles.button} ${styles.buttonDanger} ${styles.buttonSmall} ${styles.removeButton}`}>حذف المقرر</button>
          </div>
        ))}
        <button type="button" onClick={() => addSubEntity<Course>('courses', { name_ar: '', semester: 1, is_elective: false })} className={`${styles.button} ${styles.buttonSecondary} ${styles.addButton}`}>إضافة مقرر</button>
        <div className={styles.sectionActions}>
          <button 
            type="button" 
            onClick={() => {
              if (major) {
                handleSaveSection('coursesSection', { courses: major.courses });
              } else {
                updateSectionState('coursesSection', false, { type: 'error', text: 'بيانات التخصص غير متاحة للحفظ.' });
              }
            }}
            disabled={sectionStates['coursesSection']?.loading}
            className={`${styles.button} ${styles.saveSectionButton}`}
          >
            {sectionStates['coursesSection']?.loading ? 'جاري الحفظ...' : 'حفظ قسم المقررات'}
          </button>
          {sectionStates['coursesSection']?.message && (
            <div className={`${styles.message} ${styles[sectionStates['coursesSection']!.message!.type]}`}>
              {sectionStates['coursesSection']!.message!.text}
            </div>
          )}
        </div>
      </fieldset>

      {/* Job Opportunities Section - New */}
      <fieldset className={styles.formSection}>
        <legend>الفرص الوظيفية</legend>
        {major.jobOpportunities.map((job, index) => (
          <div key={`job-${index}`} className={`${styles.subEntityItem} ${styles.formGrid}`}>
            <input type="text" placeholder="عنوان الفرصة (عربي)" value={job.title_ar} onChange={e => handleSubEntityChange<JobOpportunity>('jobOpportunities', index, 'title_ar', e.target.value)} required className={styles.formInput} />
            <input type="text" placeholder="عنوان الفرصة (إنجليزي)" value={job.title_en || ''} onChange={e => handleSubEntityChange<JobOpportunity>('jobOpportunities', index, 'title_en', e.target.value)} className={styles.formInput} />
            <input type="url" placeholder="رابط الأيقونة" value={job.icon_url || ''} onChange={e => handleSubEntityChange<JobOpportunity>('jobOpportunities', index, 'icon_url', e.target.value)} className={styles.formInput} />
            <button type="button" onClick={() => removeSubEntity<JobOpportunity>('jobOpportunities', index)} className={`${styles.button} ${styles.buttonDanger} ${styles.buttonSmall} ${styles.removeButton}`}>حذف الفرصة</button>
          </div>
        ))}
        <button type="button" onClick={() => addSubEntity<JobOpportunity>('jobOpportunities', { title_ar: '' })} className={`${styles.button} ${styles.buttonSecondary} ${styles.addButton}`}>إضافة فرصة وظيفية</button>
        <div className={styles.sectionActions}>
          <button 
            type="button" 
            onClick={() => {
              if (major) {
                handleSaveSection('jobOpportunitiesSection', { jobOpportunities: major.jobOpportunities });
              } else {
                updateSectionState('jobOpportunitiesSection', false, { type: 'error', text: 'بيانات التخصص غير متاحة للحفظ.' });
              }
            }}
            disabled={sectionStates['jobOpportunitiesSection']?.loading}
            className={`${styles.button} ${styles.saveSectionButton}`}
          >
            {sectionStates['jobOpportunitiesSection']?.loading ? 'جاري الحفظ...' : 'حفظ قسم الفرص الوظيفية'}
          </button>
          {sectionStates['jobOpportunitiesSection']?.message && (
            <div className={`${styles.message} ${styles[sectionStates['jobOpportunitiesSection']!.message!.type]}`}>
              {sectionStates['jobOpportunitiesSection']!.message!.text}
            </div>
          )}
        </div>
      </fieldset>

      {/* Projects Section - New */}
      <fieldset className={styles.formSection}>
        <legend>مشاريع التخصص</legend>
        {major.projects.map((project, index) => (
          <div key={`project-${index}`} className={`${styles.subEntityItem} ${styles.formGrid}`}>
            <input type="text" placeholder="عنوان المشروع (عربي)" value={project.title_ar} onChange={e => handleSubEntityChange<Project>('projects', index, 'title_ar', e.target.value)} required className={styles.formInput} />
            <input type="text" placeholder="عنوان المشروع (إنجليزي)" value={project.title_en || ''} onChange={e => handleSubEntityChange<Project>('projects', index, 'title_en', e.target.value)} className={styles.formInput} />
            <textarea placeholder="وصف المشروع (عربي)" value={project.description_ar || ''} onChange={e => handleSubEntityChange<Project>('projects', index, 'description_ar', e.target.value)} rows={3} className={styles.formInput}></textarea>
            <textarea placeholder="وصف المشروع (إنجليزي)" value={project.description_en || ''} onChange={e => handleSubEntityChange<Project>('projects', index, 'description_en', e.target.value)} rows={3} className={styles.formInput}></textarea>
            <input type="url" placeholder="رابط صورة المشروع" value={project.image_url || ''} onChange={e => handleSubEntityChange<Project>('projects', index, 'image_url', e.target.value)} className={styles.formInput} />
            <button type="button" onClick={() => removeSubEntity<Project>('projects', index)} className={`${styles.button} ${styles.buttonDanger} ${styles.buttonSmall} ${styles.removeButton}`}>حذف المشروع</button>
          </div>
        ))}
        <button type="button" onClick={() => addSubEntity<Project>('projects', { title_ar: '' })} className={`${styles.button} ${styles.buttonSecondary} ${styles.addButton}`}>إضافة مشروع</button>
        <div className={styles.sectionActions}>
          <button 
            type="button" 
            onClick={() => {
              if (major) {
                handleSaveSection('projectsSection', { projects: major.projects });
              } else {
                updateSectionState('projectsSection', false, { type: 'error', text: 'بيانات التخصص غير متاحة للحفظ.' });
              }
            }}
            disabled={sectionStates['projectsSection']?.loading}
            className={`${styles.button} ${styles.saveSectionButton}`}
          >
            {sectionStates['projectsSection']?.loading ? 'جاري الحفظ...' : 'حفظ قسم المشاريع'}
          </button>
          {sectionStates['projectsSection']?.message && (
            <div className={`${styles.message} ${styles[sectionStates['projectsSection']!.message!.type]}`}>
              {sectionStates['projectsSection']!.message!.text}
            </div>
          )}
        </div>
      </fieldset>

      {/* Skills Section - New */}
      <fieldset className={styles.formSection}>
        <legend>المهارات المكتسبة</legend>
        {major.skills.map((skill, index) => (
          <div key={`skill-${index}`} className={`${styles.subEntityItem} ${styles.formGrid}`}>
            <input type="text" placeholder="اسم المهارة (عربي)" value={skill.name_ar} onChange={e => handleSubEntityChange<Skill>('skills', index, 'name_ar', e.target.value)} required className={styles.formInput} />
            <input type="text" placeholder="اسم المهارة (إنجليزي)" value={skill.name_en || ''} onChange={e => handleSubEntityChange<Skill>('skills', index, 'name_en', e.target.value)} className={styles.formInput} />
            <input type="url" placeholder="رابط أيقونة المهارة" value={skill.icon_url || ''} onChange={e => handleSubEntityChange<Skill>('skills', index, 'icon_url', e.target.value)} className={styles.formInput} />
            <button type="button" onClick={() => removeSubEntity<Skill>('skills', index)} className={`${styles.button} ${styles.buttonDanger} ${styles.buttonSmall} ${styles.removeButton}`}>حذف المهارة</button>
          </div>
        ))}
        <button type="button" onClick={() => addSubEntity<Skill>('skills', { name_ar: '' })} className={`${styles.button} ${styles.buttonSecondary} ${styles.addButton}`}>إضافة مهارة</button>
        <div className={styles.sectionActions}>
          <button 
            type="button" 
            onClick={() => {
              if (major) {
                handleSaveSection('skillsSection', { skills: major.skills });
              } else {
                updateSectionState('skillsSection', false, { type: 'error', text: 'بيانات التخصص غير متاحة للحفظ.' });
              }
            }}
            disabled={sectionStates['skillsSection']?.loading}
            className={`${styles.button} ${styles.saveSectionButton}`}
          >
            {sectionStates['skillsSection']?.loading ? 'جاري الحفظ...' : 'حفظ قسم المهارات'}
          </button>
          {sectionStates['skillsSection']?.message && (
            <div className={`${styles.message} ${styles[sectionStates['skillsSection']!.message!.type]}`}>
              {sectionStates['skillsSection']!.message!.text}
            </div>
          )}
        </div>
      </fieldset>

    </div> // Was </form>
  );
};

export default MajorsEditor;