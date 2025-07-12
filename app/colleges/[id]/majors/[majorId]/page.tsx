'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from '../../../../lib/translation-context';
import styles from '../../../../components/colleges/sharing/major.module.css';
import translations from './translations.json';

interface Major {
  id: number;
  name: string;
  description: string;
  features: string;
  image_path: string;
  job_opportunities?: string;
}

interface Course {
  id: number;
  name: string;
  description: string;
  semester: number;
  is_elective: boolean;
  url?: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image_path: string;
}

interface JobOpportunity {
  id: number;
  title: string;
  icon: string;
}

interface Skill {
  id: number;
  name: string;
  icon: string;
}

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

export default function MajorPage() {
  const { t: globalT, language } = useTranslation();
  const params = useParams();
  const router = useRouter();
  const [major, setMajor] = useState<Major | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [jobOpportunities, setJobOpportunities] = useState<JobOpportunity[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
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

  return (
    <div className={styles.majorContainer}>
      <Link 
        href={`/colleges/${collegeId}`}
        className={styles.backToCollegeButton}
      >
        {t('backToCollege', 'العودة إلى الكلية')}
      </Link>

      <div className={styles.majorHeader}>
        <h1>{major.name}</h1>
        {major.image_path && (
          <div className={styles.majorImageContainer}>
            <img 
              src={major.image_path} 
              alt={major.name} 
              className={styles.majorImage} 
            />
          </div>
        )}
      </div>

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
      </div>

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
                      <h3>{course.name}</h3>
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
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </div>
                    {project.image_path && (
                      <div className={styles.projectImageContainer}>
                        <img 
                          src={project.image_path} 
                          alt={project.title} 
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
                    <span className={styles.jobTitle}>{job.title}</span>
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
                    <span className={styles.skillName}>{skill.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.noData}>{t('noSkillsAvailable', 'لا توجد مهارات متاحة حالياً')}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 