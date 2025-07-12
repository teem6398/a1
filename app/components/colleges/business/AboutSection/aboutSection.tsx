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
  content = 'تأسست كلية العلوم الإدارية عام 2005 لتكون مركزاً متميزاً للتعليم والبحث في مجالات إدارة الأعمال، المالية، التسويق، والموارد البشرية. تهدف الكلية إلى إعداد جيل من القادة والمديرين المؤهلين للمنافسة في سوق العمل المحلي والعالمي. تتبنى الكلية أحدث استراتيجيات التعليم وتوفر برامج دراسية متنوعة تواكب احتياجات سوق العمل وتستجيب للتحديات المعاصرة في عالم الأعمال.', 
  stats = []
}: AboutProps) => {
  // استخدام بيانات إحصائية افتراضية إذا كانت القائمة فارغة
  const defaultStats = [
    { id: 1, college_id: 3, stat_number: '25+', stat_label: 'قاعة دراسية مجهزة' },
    { id: 2, college_id: 3, stat_number: '45+', stat_label: 'أستاذ وأستاذة' },
    { id: 3, college_id: 3, stat_number: '950+', stat_label: 'طالب وطالبة' }
  ];

  // استخدام الإحصائيات من قاعدة البيانات أو الافتراضية إذا كانت فارغة
  const statsToShow = stats.length > 0 ? stats : defaultStats;

  // تقسيم المحتوى إلى فقرات
  const paragraphs = content.split('. ').filter(p => p.trim() !== '').map(p => p.trim() + '.');

  return (
    <>
      <section id="about" className={styles.aboutSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>عن الكلية</h2>
          <div className={styles.aboutContent}>
            <div className={styles.aboutText}>
              {paragraphs.map((paragraph, index) => (
                <p key={index} className={styles.aboutTextPara}>
                  {paragraph}
                </p>
              ))}
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