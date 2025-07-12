'use client';

import React from 'react';
import styles from '../../../sharing/major.module.css';
import Link from 'next/link';
import Footer from '../../../../Home/Footer/footers';

export default function BusinessManagementPage() {
  return (
    <>
      {/* قسم الهيرو */}
      <section 
        className={styles.heroSection}
        style={{
          backgroundImage: `url('/images/business-management-hero.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>إدارة الأعمال</h1>
          <p className={styles.heroSubtitle}>نصنع قادة المستقبل في عالم الأعمال</p>
          <Link href="#courses">
            <button className={styles.ctaButton}>اكتشف المزيد</button>
          </Link>
        </div>
      </section>

      {/* قسم عن التخصص */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>عن التخصص</h2>
        <div className={styles.aboutText}>
          <p>
            يهدف تخصص إدارة الأعمال إلى تزويد الطلاب بالمعارف والمهارات اللازمة لإدارة المؤسسات بكفاءة واحترافية، مع التركيز على القيادة، التخطيط، التنظيم، واتخاذ القرار.
          </p>
          <p>
            يتميز هذا التخصص بتنوع المجالات التي يغطيها، من إدارة الموارد البشرية إلى التسويق والتمويل، مما يمنح الخريجين فرصًا وظيفية واسعة في مختلف القطاعات.
          </p>
        </div>
      </section>

      {/* قسم المقررات والخطة الدراسية */}
      <section className={styles.section} id="courses">
        <h2 className={styles.sectionTitle}>المقررات والخطة الدراسية</h2>
        <div className={styles.coursesList}>
          <div className={styles.courseItem}>مبادئ الإدارة</div>
          <div className={styles.courseItem}>السلوك التنظيمي</div>
          <div className={styles.courseItem}>إدارة الموارد البشرية</div>
          <div className={styles.courseItem}>التسويق</div>
          <div className={styles.courseItem}>المحاسبة المالية</div>
          <div className={styles.courseItem}>ريادة الأعمال</div>
          <div className={styles.courseItem}>الإدارة الاستراتيجية</div>
          <div className={styles.courseItem}>إدارة العمليات</div>
          <div className={styles.courseItem}>القانون التجاري</div>
          <div className={styles.courseItem}>نظم المعلومات الإدارية</div>
        </div>
      </section>

      {/* قسم المهارات المكتسبة */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>المهارات المكتسبة</h2>
        <div className={styles.skillsGrid}>
          <div className={styles.skillCard}>
            <div className={styles.skillIcon}>📊</div>
            <h3>التخطيط الاستراتيجي</h3>
          </div>
          <div className={styles.skillCard}>
            <div className={styles.skillIcon}>👥</div>
            <h3>إدارة فرق العمل</h3>
          </div>
          <div className={styles.skillCard}>
            <div className={styles.skillIcon}>🔍</div>
            <h3>حل المشكلات</h3>
          </div>
          <div className={styles.skillCard}>
            <div className={styles.skillIcon}>💼</div>
            <h3>اتخاذ القرار</h3>
          </div>
          <div className={styles.skillCard}>
            <div className={styles.skillIcon}>🗣️</div>
            <h3>التواصل الفعال</h3>
          </div>
          <div className={styles.skillCard}>
            <div className={styles.skillIcon}>📈</div>
            <h3>التحليل المالي</h3>
          </div>
        </div>
      </section>

      {/* قسم الوظائف المستقبلية */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>الوظائف المستقبلية</h2>
        <div className={styles.jobsList}>
          <div className={styles.jobItem}>
            <span className={styles.jobIcon}>📋</span>
            <span>مدير مشاريع</span>
          </div>
          <div className={styles.jobItem}>
            <span className={styles.jobIcon}>👥</span>
            <span>مدير موارد بشرية</span>
          </div>
          <div className={styles.jobItem}>
            <span className={styles.jobIcon}>📊</span>
            <span>محلل أعمال</span>
          </div>
          <div className={styles.jobItem}>
            <span className={styles.jobIcon}>🚀</span>
            <span>ريادي أعمال</span>
          </div>
          <div className={styles.jobItem}>
            <span className={styles.jobIcon}>🏢</span>
            <span>مدير تنفيذي</span>
          </div>
          <div className={styles.jobItem}>
            <span className={styles.jobIcon}>🛒</span>
            <span>مدير تسويق</span>
          </div>
        </div>
      </section>

      {/* قسم فرص التدريب والتطبيق العملي */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>فرص التدريب والتطبيق العملي</h2>
        <p>
          يوفر البرنامج فرص تدريب متنوعة بالتعاون مع كبرى الشركات والمؤسسات في القطاعين العام والخاص، مما يتيح للطلاب اكتساب خبرة عملية قبل التخرج.
        </p>
        <div className={styles.trainingPartners}>
          {/* هنا يمكن إضافة شعارات الشركاء */}
          <img src="/images/partner1.png" alt="شركة 1" className={styles.partnerLogo} />
          <img src="/images/partner2.png" alt="شركة 2" className={styles.partnerLogo} />
          <img src="/images/partner3.png" alt="شركة 3" className={styles.partnerLogo} />
          <img src="/images/partner4.png" alt="شركة 4" className={styles.partnerLogo} />
        </div>
      </section>

      {/* قسم مشاريع التخرج أو الإنجازات */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>مشاريع التخرج والإنجازات</h2>
        <div className={styles.projectsGrid}>
          <div className={styles.projectCard}>
            <img src="/images/project1.jpg" alt="مشروع 1" className={styles.projectImage} />
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>تطوير استراتيجية تسويق رقمي</h3>
              <p>مشروع طلابي لتطوير استراتيجية تسويق رقمي لشركة ناشئة محلية.</p>
            </div>
          </div>
          <div className={styles.projectCard}>
            <img src="/images/project2.jpg" alt="مشروع 2" className={styles.projectImage} />
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>دراسة جدوى اقتصادية</h3>
              <p>إعداد دراسة جدوى اقتصادية لمشروع استثماري في قطاع التجزئة.</p>
            </div>
          </div>
          <div className={styles.projectCard}>
            <img src="/images/project3.jpg" alt="مشروع 3" className={styles.projectImage} />
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>تحسين العمليات الإدارية</h3>
              <p>مشروع لتحسين العمليات الإدارية وزيادة الكفاءة في إحدى المؤسسات الحكومية.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
