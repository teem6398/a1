'use client';

import styles from '../../sharing/sharing.module.css';

// تعريف نوع البيانات المتوقعة كـ props
interface StatItem {
  id: number;
  college_id: number;
  stat_number: string;
  stat_label: string;
}

interface AboutProps {
  content: string;
  stats: StatItem[];
}

const About = ({ 
  content = 'تأسست كلية الهندسة في جامعة الريادة لتكون منارة للتعليم الهندسي المتميز. نسعى لتخريج مهندسين أكفاء قادرين على المساهمة في تطوير القطاع الهندسي والتكنولوجي في المجتمع.', 
  stats = []
}: AboutProps) => {
  // استخدام بيانات إحصائية افتراضية إذا كانت القائمة فارغة
  const defaultStats = [
    { id: 1, college_id: 1, stat_number: '15+', stat_label: 'معمل هندسي' },
    { id: 2, college_id: 1, stat_number: '40+', stat_label: 'أستاذ وأستاذة' },
    { id: 3, college_id: 1, stat_number: '600+', stat_label: 'طالب وطالبة' }
  ];

  // استخدام الإحصائيات من قاعدة البيانات أو الافتراضية إذا كانت فارغة
  const statsToShow = stats.length > 0 ? stats : defaultStats;

  return (
    <>
      <section id="about" className={styles.aboutSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>عن الكلية</h2>
          <div className={styles.aboutContent}>
            <div className={styles.aboutText}>
              <p className={styles.aboutTextPara}>
                {content}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* قسم الإحصائيات */}
      <section className={styles.statsSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.statsGrid}>
            {statsToShow.map((stat) => (
              <div key={stat.id} className={styles.statCard}>
                <h3 className={styles.statNumber}>{stat.stat_number}</h3>
                <p className={styles.statLabel}>{stat.stat_label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;