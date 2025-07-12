'use client';

import React from 'react';
import styles from '../../../sharing/major.module.css';
import Link from 'next/link';
import Footer from '../../../../Home/Footer/footers';
export default function FinancePage() {
  return (
    <>
      {/* قسم الهيرو */}
      <section 
        className={styles.heroSection}
        style={{
          backgroundImage: `url('/images/finance-hero.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>التمويل والاستثمار</h1>
          <p className={styles.heroSubtitle}>بناء مستقبل مالي ناجح واستثمارات ذكية</p>
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
            يركز تخصص التمويل والاستثمار على تزويد الطلاب بالمعرفة في مجالات التحليل المالي، وإدارة المحافظ الاستثمارية، والتمويل الدولي، والأسواق المالية.
          </p>
          <p>
            يتميز هذا التخصص بتأهيل الطلاب للتعامل مع التحديات المالية المعاصرة، وفهم آليات الاستثمار، وتقييم المخاطر المالية، وإدارة الأصول بكفاءة.
          </p>
        </div>
      </section>

      {/* قسم المقررات والخطة الدراسية */}
      <section className={styles.section} id="courses">
        <h2 className={styles.sectionTitle}>المقررات والخطة الدراسية</h2>
        <div className={styles.coursesList}>
          <div className={styles.courseItem}>مبادئ التمويل</div>
          <div className={styles.courseItem}>الأسواق المالية</div>
          <div className={styles.courseItem}>إدارة المحافظ الاستثمارية</div>
          <div className={styles.courseItem}>التحليل المالي</div>
          <div className={styles.courseItem}>إدارة المخاطر المالية</div>
          <div className={styles.courseItem}>التمويل الدولي</div>
          <div className={styles.courseItem}>تقييم المشاريع الاستثمارية</div>
          <div className={styles.courseItem}>المشتقات المالية</div>
          <div className={styles.courseItem}>التمويل الإسلامي</div>
          <div className={styles.courseItem}>إدارة الثروات</div>
        </div>
      </section>

      {/* قسم المهارات المكتسبة */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>المهارات المكتسبة</h2>
        <div className={styles.skillsGrid}>
          <div className={styles.skillCard}>
            <div className={styles.skillIcon}>📊</div>
            <h3>التحليل المالي</h3>
          </div>
          <div className={styles.skillCard}>
            <div className={styles.skillIcon}>⚖️</div>
            <h3>إدارة المخاطر</h3>
          </div>
          <div className={styles.skillCard}>
            <div className={styles.skillIcon}>📈</div>
            <h3>تخطيط الاستثمار</h3>
          </div>
          <div className={styles.skillCard}>
            <div className={styles.skillIcon}>💼</div>
            <h3>إدارة المحافظ الاستثمارية</h3>
          </div>
          <div className={styles.skillCard}>
            <div className={styles.skillIcon}>🔍</div>
            <h3>التقييم المالي</h3>
          </div>
          <div className={styles.skillCard}>
            <div className={styles.skillIcon}>🌐</div>
            <h3>فهم الأسواق المالية</h3>
          </div>
        </div>
      </section>

      {/* قسم الوظائف المستقبلية */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>الوظائف المستقبلية</h2>
        <div className={styles.jobsList}>
          <div className={styles.jobItem}>
            <span className={styles.jobIcon}>📊</span>
            <span>محلل مالي</span>
          </div>
          <div className={styles.jobItem}>
            <span className={styles.jobIcon}>💰</span>
            <span>مدير استثمار</span>
          </div>
          <div className={styles.jobItem}>
            <span className={styles.jobIcon}>📝</span>
            <span>مستشار مالي</span>
          </div>
          <div className={styles.jobItem}>
            <span className={styles.jobIcon}>💼</span>
            <span>مدير محافظ استثمارية</span>
          </div>
          <div className={styles.jobItem}>
            <span className={styles.jobIcon}>🏦</span>
            <span>مصرفي استثماري</span>
          </div>
          <div className={styles.jobItem}>
            <span className={styles.jobIcon}>⚖️</span>
            <span>مدير مخاطر مالية</span>
          </div>
        </div>
      </section>

      {/* قسم فرص التدريب والتطبيق العملي */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>فرص التدريب والتطبيق العملي</h2>
        <p>
          يوفر البرنامج فرص تدريب في البنوك، وشركات الاستثمار، والمؤسسات المالية، وأسواق المال، مما يتيح للطلاب اكتساب الخبرة العملية وفهم آليات عمل الأسواق المالية.
        </p>
        <div className={styles.trainingPartners}>
          {/* هنا يمكن إضافة شعارات الشركاء */}
          <img src="/images/finance-partner1.png" alt="شركة 1" className={styles.partnerLogo} />
          <img src="/images/finance-partner2.png" alt="شركة 2" className={styles.partnerLogo} />
          <img src="/images/finance-partner3.png" alt="شركة 3" className={styles.partnerLogo} />
          <img src="/images/finance-partner4.png" alt="شركة 4" className={styles.partnerLogo} />
        </div>
      </section>

      {/* قسم مشاريع التخرج أو الإنجازات */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>مشاريع التخرج والإنجازات</h2>
        <div className={styles.projectsGrid}>
          <div className={styles.projectCard}>
            <img src="/images/finance-project1.jpg" alt="مشروع 1" className={styles.projectImage} />
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>بناء محفظة استثمارية متوازنة</h3>
              <p>مشروع طلابي لبناء وإدارة محفظة استثمارية متوازنة وقياس أدائها.</p>
            </div>
          </div>
          <div className={styles.projectCard}>
            <img src="/images/finance-project2.jpg" alt="مشروع 2" className={styles.projectImage} />
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>تحليل الأسواق المالية</h3>
              <p>دراسة تحليلية للأسواق المالية المحلية والعالمية وتأثيرها على الاقتصاد.</p>
            </div>
          </div>
          <div className={styles.projectCard}>
            <img src="/images/finance-project3.jpg" alt="مشروع 3" className={styles.projectImage} />
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>نموذج تقييم مخاطر الاستثمار</h3>
              <p>تطوير نموذج لتقييم مخاطر الاستثمار في المشاريع الناشئة.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
