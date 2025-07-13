'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from '../../../../lib/translation-context';
import styles from '../../../../components/colleges/sharing/major.module.css';
import translations from './translations.json';
import Navbar from '../../../../components/Home/Navbar/Navbar';
import Footer from '../../../../components/Home/Footer/footers';

interface Major {
  id: number;
  name: string;
  name_en?: string;
  hero_title?: string;
  hero_subtitle?: string;
  hero_image_url?: string;
  about_text?: string;
  description: string;
  features: string;
  image_path: string;
  job_opportunities?: string;
}

interface Course {
  id: number;
  name_ar: string;
  name_en?: string;
  description?: string;
  semester?: number;
  is_elective: boolean;
  url?: string;
}

interface Project {
  id: number;
  title_ar: string;
  title_en?: string;
  description_ar?: string;
  description_en?: string;
  image_url?: string;
}

interface JobOpportunity {
  id: number;
  job_title_ar: string;
  job_title_en?: string;
  icon?: string;
}

interface Skill {
  id: number;
  skill_name: string;
  skill_name_en: string;
  icon?: string;
}

interface DepartmentHead {
  id: number;
  program_id: number;
  name: string;
  name_en?: string;
  title: string;
  title_en?: string;
  image_url?: string;
  message: string;
  message_en?: string;
  email?: string;
  phone?: string;
  office_location?: string;
  office_location_en?: string;
  office_hours?: string;
  office_hours_en?: string;
}

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

export default function MajorPage() {
  const { t: globalT, language, dir } = useTranslation();
  const params = useParams();
  const router = useRouter();
  const [major, setMajor] = useState<Major | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [jobOpportunities, setJobOpportunities] = useState<JobOpportunity[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [departmentHead, setDepartmentHead] = useState<DepartmentHead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const collegeId = params?.id as string;
  const majorId = params?.majorId as string;
  const lang = language || 'ar';

  const t = (key: string, fallback: string) => {
    const trans = translations as Translations;
    if (trans[lang] && trans[lang][key]) {
      return trans[lang][key];
    }
    return fallback;
  };

  useEffect(() => {
    const fetchMajorData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log(`Fetching major data for majorId: ${majorId}, collegeId: ${collegeId}, lang: ${lang}`);
        
        const response = await fetch(`/api/api_pages/majors/${majorId}?college_id=${collegeId}&lang=${lang}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('API error:', errorData);
          throw new Error(errorData.error || 'Failed to fetch major data');
        }
        
        const data = await response.json();
        console.log('API response:', data);
        
        setMajor(data.major);
        setCourses(data.courses || []);
        setProjects(data.projects || []);
        setJobOpportunities(data.job_opportunities || []);
        setSkills(data.skills || []);
        setDepartmentHead(data.department_head || null);
      } catch (err: any) {
        console.error('Error fetching major data:', err);
        setError(err.message || 'Failed to fetch major data');
      } finally {
        setLoading(false);
      }
    };

    if (collegeId && majorId) {
      fetchMajorData();
    }
  }, [collegeId, majorId, lang]);

  const handleCourseClick = (courseId: number) => {
    router.push(`/courses/${courseId}?college_id=${collegeId}&major_id=${majorId}`);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}></div>
        <p>{t('loading', 'جاري التحميل...')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>{t('error', 'خطأ')}</h2>
        <p>{error}</p>
        <button onClick={() => router.back()} className={styles.backButton}>
          {t('goBack', 'الرجوع')}
        </button>
      </div>
    );
  }

  if (!major) {
    return (
      <div className={styles.errorContainer}>
        <h2>{t('majorNotFound', 'لم يتم العثور على التخصص')}</h2>
        <button onClick={() => router.back()} className={styles.backButton}>
          {t('goBack', 'الرجوع')}
        </button>
      </div>
    );
  }

  // Get localized content
  const getLocalizedContent = (ar: string, en?: string) => {
    return lang === 'en' && en ? en : ar;
  };

  const majorName = getLocalizedContent(major.name, major.name_en);
  const heroTitle = getLocalizedContent(major.hero_title || major.name, major.hero_title || major.name_en);
  const heroSubtitle = getLocalizedContent(major.hero_subtitle || '', major.hero_subtitle || '');
  const aboutText = getLocalizedContent(major.about_text || major.description, major.about_text || major.description);

  return (
    <div className={styles.majorPage} dir={dir}>
      <Navbar context="faculties" />
      
      {/* Hero Section */}
      <section 
        className={styles.heroSection}
        style={{
          backgroundImage: major.hero_image_url ? `url(${major.hero_image_url})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{heroTitle}</h1>
          {heroSubtitle && <p className={styles.heroSubtitle}>{heroSubtitle}</p>}
          <button className={styles.ctaButton} onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}>
            {t('exploreMore', 'استكشف المزيد')}
          </button>
        </div>
      </section>

      {/* Main Content */}
      <div className={styles.majorContainer}>
        <Link 
          href={`/colleges/${collegeId}`}
          className={styles.backToCollegeButton}
        >
          {t('backToCollege', 'العودة إلى الكلية')}
        </Link>

        {/* About Section */}
        <section id="overview" className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('aboutProgram', 'عن البرنامج')}</h2>
          <div className={styles.aboutText}>
            <p>{aboutText}</p>
          </div>
        </section>

        {/* Tabs Navigation */}
        <div className={styles.tabsContainer}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'overview' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            {t('overview', 'نظرة عامة')}
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'courses' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            {t('courses', 'المقررات الدراسية')}
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'projects' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            {t('projects', 'المشاريع')}
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'jobs' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            {t('jobOpportunities', 'الفرص الوظيفية')}
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'skills' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            {t('skills', 'المهارات')}
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'department-head' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('department-head')}
          >
            {t('departmentHead', 'كلمة رئيس القسم')}
          </button>
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {activeTab === 'overview' && (
            <div className={styles.overviewTab}>
              <div className={styles.majorDescription}>
                <h2>{t('description', 'الوصف')}</h2>
                <p>{major.description}</p>
              </div>
              
              {major.features && (
                <div className={styles.majorFeatures}>
                  <h2>{t('features', 'المميزات')}</h2>
                  <div dangerouslySetInnerHTML={{ __html: major.features }} />
                </div>
              )}
            </div>
          )}

          {activeTab === 'courses' && (
            <div className={styles.coursesTab}>
              <h2>{t('courses', 'المقررات الدراسية')}</h2>
              {courses.length > 0 ? (
                <div className={styles.coursesList}>
                  {courses.map((course) => (
                    <div 
                      key={course.id} 
                      className={`${styles.courseItem} ${styles.courseLink}`}
                      onClick={() => handleCourseClick(course.id)}
                    >
                      <div className={styles.courseIconWrapper}>
                        <span className={styles.courseIcon}>📚</span>
                      </div>
                      <div className={styles.courseContent}>
                        <h3>{getLocalizedContent(course.name_ar, course.name_en)}</h3>
                        {course.description && <p>{course.description}</p>}
                        {course.semester && (
                          <div className={styles.courseMeta}>
                            <span className={styles.semester}>
                              {t('semester', 'الفصل الدراسي')}: {course.semester}
                            </span>
                            {course.is_elective && (
                              <span className={styles.elective}>{t('elective', 'اختياري')}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.noData}>{t('noCoursesAvailable', 'لا توجد مقررات متاحة حالياً')}</p>
              )}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className={styles.projectsTab}>
              <h2>{t('studentProjects', 'مشاريع الطلاب')}</h2>
              {projects.length > 0 ? (
                <div className={styles.projectsList}>
                  {projects.map((project) => (
                    <div key={project.id} className={styles.projectItem}>
                      <div className={styles.projectContent}>
                        <h3>{getLocalizedContent(project.title_ar, project.title_en)}</h3>
                        <p>{getLocalizedContent(project.description_ar || '', project.description_en || '')}</p>
                      </div>
                      {project.image_url && (
                        <div className={styles.projectImageContainer}>
                          <img 
                            src={project.image_url} 
                            alt={getLocalizedContent(project.title_ar, project.title_en)} 
                            className={styles.projectImage} 
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.noData}>{t('noProjectsAvailable', 'لا توجد مشاريع متاحة حالياً')}</p>
              )}
            </div>
          )}

          {activeTab === 'jobs' && (
            <div className={styles.jobsTab}>
              <h2>{t('jobOpportunities', 'الفرص الوظيفية')}</h2>
              {jobOpportunities.length > 0 ? (
                <div className={styles.jobsList}>
                  {jobOpportunities.map((job) => (
                    <div key={job.id} className={styles.jobItem}>
                      {job.icon && <span className={styles.jobIcon}>{job.icon}</span>}
                      <span className={styles.jobTitle}>{getLocalizedContent(job.job_title_ar, job.job_title_en)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                major.job_opportunities ? (
                  <div dangerouslySetInnerHTML={{ __html: major.job_opportunities }} />
                ) : (
                  <p className={styles.noData}>{t('noJobOpportunitiesAvailable', 'لا توجد فرص وظيفية متاحة حالياً')}</p>
                )
              )}
            </div>
          )}

          {activeTab === 'skills' && (
            <div className={styles.skillsTab}>
              <h2>{t('skills', 'المهارات')}</h2>
              {skills.length > 0 ? (
                <div className={styles.skillsList}>
                  {skills.map((skill) => (
                    <div key={skill.id} className={styles.skillItem}>
                      {skill.icon && <span className={styles.skillIcon}>{skill.icon}</span>}
                      <span className={styles.skillName}>{getLocalizedContent(skill.skill_name, skill.skill_name_en)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.noData}>{t('noSkillsAvailable', 'لا توجد مهارات متاحة حالياً')}</p>
              )}
            </div>
          )}

          {activeTab === 'department-head' && (
            <div className={styles.departmentHeadTab}>
              <h2>{t('departmentHeadMessage', 'كلمة رئيس القسم')}</h2>
              {departmentHead ? (
                <div className={styles.departmentHeadContent}>
                  <div className={styles.departmentHeadHeader}>
                    {departmentHead.image_url && (
                      <div className={styles.departmentHeadImageContainer}>
                        <img 
                          src={departmentHead.image_url} 
                          alt={getLocalizedContent(departmentHead.name, departmentHead.name_en)} 
                          className={styles.departmentHeadImage} 
                        />
                      </div>
                    )}
                    <div className={styles.departmentHeadInfo}>
                      <h3 className={styles.departmentHeadName}>
                        {getLocalizedContent(departmentHead.name, departmentHead.name_en)}
                      </h3>
                      <p className={styles.departmentHeadTitle}>
                        {getLocalizedContent(departmentHead.title, departmentHead.title_en)}
                      </p>
                    </div>
                  </div>
                  
                  <div className={styles.departmentHeadMessage}>
                    <p>{getLocalizedContent(departmentHead.message, departmentHead.message_en)}</p>
                  </div>

                  <div className={styles.departmentHeadContact}>
                    <h4>{t('contactInfo', 'معلومات التواصل')}</h4>
                    <div className={styles.contactDetails}>
                      {departmentHead.email && (
                        <div className={styles.contactItem}>
                          <span className={styles.contactIcon}>📧</span>
                          <span className={styles.contactLabel}>{t('email', 'البريد الإلكتروني')}:</span>
                          <a href={`mailto:${departmentHead.email}`} className={styles.contactValue}>
                            {departmentHead.email}
                          </a>
                        </div>
                      )}
                      {departmentHead.phone && (
                        <div className={styles.contactItem}>
                          <span className={styles.contactIcon}>📞</span>
                          <span className={styles.contactLabel}>{t('phone', 'الهاتف')}:</span>
                          <a href={`tel:${departmentHead.phone}`} className={styles.contactValue}>
                            {departmentHead.phone}
                          </a>
                        </div>
                      )}
                      {departmentHead.office_location && (
                        <div className={styles.contactItem}>
                          <span className={styles.contactIcon}>📍</span>
                          <span className={styles.contactLabel}>{t('officeLocation', 'موقع المكتب')}:</span>
                          <span className={styles.contactValue}>
                            {getLocalizedContent(departmentHead.office_location, departmentHead.office_location_en)}
                          </span>
                        </div>
                      )}
                      {departmentHead.office_hours && (
                        <div className={styles.contactItem}>
                          <span className={styles.contactIcon}>🕒</span>
                          <span className={styles.contactLabel}>{t('officeHours', 'ساعات العمل')}:</span>
                          <span className={styles.contactValue}>
                            {getLocalizedContent(departmentHead.office_hours, departmentHead.office_hours_en)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <p className={styles.noData}>{t('noDepartmentHeadAvailable', 'لا توجد كلمة رئيس قسم متاحة حالياً')}</p>
              )}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 