'use client';

import React from 'react';
import styles from '../../../sharing/major.module.css';
import Link from 'next/link';
import Footer from '../../../../Home/Footer/footers';
import { SiArduino } from 'react-icons/si';
import { output } from 'framer-motion/client';

export default function MarketingPage() {
  return (
    <>
      {/* قسم الهيرو */}
      <section 
        className={styles.heroSection}
        style={{
          backgroundImage: `url('/images/marketing-hero.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>التسويق</h1>
          <p className={styles.heroSubtitle}>ابتكار استراتيجيات تسويقية تصنع الفرق</p>
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
            يهدف تخصص التسويق إلى إعداد الطلاب لفهم سلوك المستهلك، وتطوير استراتيجيات تسويقية فعّالة، واستخدام أدوات التسويق الرقمي الحديثة.
          </p>
          <p>
            يتميز هذا التخصص بتركيزه على الجوانب الإبداعية والتحليلية للتسويق، مما يؤهل الخريجين للعمل في مجالات متنوعة مثل إدارة العلامات التجارية، والتسويق الرقمي، وبحوث السوق.
          </p>
        </div>
      </section>

      {/* قسم المقررات والخطة الدراسية */}
      <section className={styles.section} id="courses">
        <h2 className={styles.sectionTitle}>المقررات والخطة الدراسية</h2>
        <div className={styles.coursesList}>
          <div className={styles.courseItem}>مبادئ التسويق</div>
          <div className={styles.courseItem}>سلوك المستهلك</div>
          <div className={styles.courseItem}>بحوث التسويق</div>
          <div className={styles.courseItem}>التسويق الرقمي</div>
          <div className={styles.courseItem}>إدارة العلامات التجارية</div>
          <div className={styles.courseItem}>استراتيجيات التسويق</div>
          <div className={styles.courseItem}>الاتصالات التسويقية المتكاملة</div>
          <div className={styles.courseItem}>التسويق الدولي</div>
          <div className={styles.courseItem}>تسويق الخدمات</div>
          <div className={styles.courseItem}>التسويق عبر وسائل التواصل الاجتماعي</div>
        </div>
      </section>

      {/* قسم المهارات المكتسبة */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>المهارات المكتسبة</h2>
        <div className={styles.skillsGrid}>
          <div className={styles.skillCard}>
            <div className={styles.skillIcon}>📊</div>
            <h3>تحليل السوق</h3>
          </div>
          <div className={styles.skillCard}>
            <div className={styles.skillIcon}>💻</div>
            <h3>التسويق الرقمي</h3>
          </div>
          <div className={styles.skillCard}>
            <div className={styles.skillIcon}>📱</div>
            <h3>إدارة الحملات الإعلانية</h3>
          </div>
          <div className={styles.skillCard}>
            <div className={styles.skillIcon}>🗣️</div>
            <h3>التواصل والإقناع</h3>
          </div>
          <div className={styles.skillCard}>
            <div className={styles.skillIcon}>🎯</div>
            <h3>استهداف الجمهور</h3>
          </div>
          <div className={styles.skillCard}>
            <div className={styles.skillIcon}>🔍</div>
            <h3>تحليل البيانات</h3>
          </div>
        </div>
      </section>

      {/* قسم الوظائف المستقبلية */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>الوظائف المستقبلية</h2>
        <div className={styles.jobsList}>
          <div className={styles.jobItem}>
            <span className={styles.jobIcon}>📱</span>
            <span>أخصائي تسويق رقمي</span>
          </div>
          <div className={styles.jobItem}>
            <span className={styles.jobIcon}>🎯</span>
            <span>مدير علامة تجارية</span>
          </div>
          <div className={styles.jobItem}>
            <span className={styles.jobIcon}>📊</span>
            <span>محلل سوق</span>
          </div>
          <div className={styles.jobItem}>
            <span className={styles.jobIcon}>📣</span>
            <span>مدير حملات إعلانية</span>
          </div>
          <div className={styles.jobItem}>
            <span className={styles.jobIcon}>🌐</span>
            <span>مدير تسويق محتوى</span>
          </div>
          <div className={styles.jobItem}>
            <span className={styles.jobIcon}>📈</span>
            <span>مدير تسويق</span>
          </div>
        </div>
      </section>

      {/* قسم فرص التدريب والتطبيق العملي */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>فرص التدريب والتطبيق العملي</h2>
        <p>
          يوفر البرنامج فرص تدريب في وكالات الإعلان والتسويق، وأقسام التسويق في الشركات الكبرى، ومنصات التواصل الاجتماعي، مما يتيح للطلاب تطبيق المفاهيم النظرية وبناء محفظة أعمال قوية.
        </p>
        <div className={styles.trainingPartners}>
          {/* هنا يمكن إضافة شعارات الشركاء */}
          <img src="/images/marketing-partner1.png" alt="شركة 1" className={styles.partnerLogo} />
          <img src="/images/marketing-partner2.png" alt="شركة 2" className={styles.partnerLogo} />
          <img src="/images/marketing-partner3.png" alt="شركة 3" className={styles.partnerLogo} />
          <img src="/images/marketing-partner4.png" alt="شركة 4" className={styles.partnerLogo} />
        </div>
      </section>

      {/* قسم مشاريع التخرج أو الإنجازات */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>مشاريع التخرج والإنجازات</h2>
        <div className={styles.projectsGrid}>
          <div className={styles.projectCard}>
            <img src="/images/marketing-project1.jpg" alt="مشروع 1" className={styles.projectImage} />
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>حملة تسويقية متكاملة</h3>
              <p>تصميم وتنفيذ حملة تسويقية متكاملة لمنتج جديد في السوق المحلي.</p>
            </div>
          </div>
          <div className={styles.projectCard}>
            <img src="/images/marketing-project2.jpg" alt="مشروع 2" className={styles.projectImage} />
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>استراتيجية تسويق رقمي</h3>
              <p>تطوير استراتيجية تسويق رقمي لشركة ناشئة وتحقيق نمو في المبيعات.</p>
            </div>
          </div>
          <div className={styles.projectCard}>
            <img src="/images/marketing-project3.jpg" alt="مشروع 3" className={styles.projectImage} />
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>دراسة سلوك المستهلك</h3>
              <p>بحث ميداني حول سلوك المستهلك وتفضيلاته في قطاع معين.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
