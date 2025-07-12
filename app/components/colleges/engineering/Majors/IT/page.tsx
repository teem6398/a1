'use client';

import React, { useEffect, useState } from 'react';
import styles from '../../../sharing/major.module.css';
import Link from 'next/link';
import Footer from '../../../../Home/Footer/footers';

// تعريف أنواع البيانات
interface Program {
  id: number;
  college_id: number;
  name_ar: string;
  name_en: string;
  hero_title: string;
  hero_subtitle: string;
  hero_image_url: string;
  about_text: string;
  college_name_ar: string;
}

interface Course {
  id: number;
  name_ar: string;
  icon: string | null;
}

interface Skill {
  id: number;
  skill_name: string;
  icon: string | null;
}

interface Job {
  id: number;
  job_title_ar: string;
  icon: string | null;
}

interface Project {
  id: number;
  title_ar: string;
  description_ar: string;
  image_url: string | null;
}

interface ProgramData {
  program: Program;
  courses: Course[];
  skills: Skill[];
  jobs: Job[];
  projects: Project[];
}

export default function ITPage() {
  const [programData, setProgramData] = useState<ProgramData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        setLoading(true);
        // استخدام slug=it لجلب بيانات تخصص تقنية المعلومات
        const response = await fetch(`/api/api_pages/academic-programs?slug=it`);
        
        if (!response.ok) {
          throw new Error(`خطأ في جلب البيانات: ${response.status}`);
        }
        
        const data = await response.json();
        setProgramData(data);
        setError(null);
      } catch (err) {
        console.error('خطأ في جلب بيانات البرنامج الأكاديمي:', err);
        setError('حدث خطأ أثناء جلب بيانات البرنامج. يرجى المحاولة مرة أخرى لاحقًا.');
      } finally {
        setLoading(false);
      }
    };

    fetchProgramData();
  }, []);

  if (loading) {
    return <div className={styles.loadingContainer}>جاري تحميل البيانات...</div>;
  }

  if (error || !programData) {
    return (
      <div className={styles.errorContainer}>
        <h2>خطأ</h2>
        <p>{error || 'لم يتم العثور على بيانات البرنامج'}</p>
        <Link href="/colleges/engineering">
          <button className={styles.ctaButton}>العودة إلى كلية الهندسة</button>
        </Link>
      </div>
    );
  }

  const { program, courses, skills, jobs, projects } = programData;

  return (
    <>
      {/* قسم الهيرو */}
      <section 
        className={styles.heroSection}
        style={{
          backgroundImage: `url('${program.hero_image_url || '/images/it-hero.jpg'}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{program.hero_title || program.name_ar}</h1>
          <p className={styles.heroSubtitle}>{program.hero_subtitle}</p>
          <Link href="#courses">
            <button className={styles.ctaButton}>اكتشف المزيد</button>
          </Link>
        </div>
      </section>

      {/* قسم عن التخصص */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>عن التخصص</h2>
        <div className={styles.aboutText}>
          <div dangerouslySetInnerHTML={{ __html: program.about_text }} />
        </div>
      </section>

      {/* قسم المقررات والخطة الدراسية */}
      {courses.length > 0 && (
        <section className={styles.section} id="courses">
          <h2 className={styles.sectionTitle}>المقررات والخطة الدراسية</h2>
          <div className={styles.coursesList}>
            {courses.map((course) => (
              <div key={course.id} className={styles.courseItem}>
                {course.icon && <span className={styles.courseIcon}>{course.icon}</span>}
                {course.name_ar}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* قسم المهارات المكتسبة */}
      {skills.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>المهارات المكتسبة</h2>
          <div className={styles.skillsGrid}>
            {skills.map((skill) => (
              <div key={skill.id} className={styles.skillCard}>
                <div className={styles.skillIcon}>{skill.icon || '🔹'}</div>
                <h3>{skill.skill_name}</h3>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* قسم الوظائف المستقبلية */}
      {jobs.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>الوظائف المستقبلية</h2>
          <div className={styles.jobsList}>
            {jobs.map((job) => (
              <div key={job.id} className={styles.jobItem}>
                <span className={styles.jobIcon}>{job.icon || '💼'}</span>
                <span>{job.job_title_ar}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* قسم مشاريع التخرج أو الإنجازات */}
      {projects.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>مشاريع التخرج والإنجازات</h2>
          <div className={styles.projectsGrid}>
            {projects.map((project) => (
              <div key={project.id} className={styles.projectCard}>
                <img 
                  src={project.image_url || '/images/default-project.jpg'} 
                  alt={project.title_ar} 
                  className={styles.projectImage} 
                />
                <div className={styles.projectContent}>
                  <h3 className={styles.projectTitle}>{project.title_ar}</h3>
                  <p>{project.description_ar}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}
