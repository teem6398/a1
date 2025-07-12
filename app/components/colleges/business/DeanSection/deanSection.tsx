'use client';

import Image from 'next/image';
import styles from '../../sharing/sharing.module.css';

// تعريف نوع البيانات المتوقعة كـ props
interface DeanProps {
  name: string;
  title: string;
  imageUrl: string;
  message: string;
}

const Dean = ({ 
  name = 'أ.د. محمد السعيد', 
  title = 'عميد كلية العلوم الإدارية', 
  imageUrl = '/image/dean-business.jpg',
  message = 'نسعى في كلية العلوم الإدارية لتخريج قادة مبدعين قادرين على صناعة المستقبل في عالم الأعمال المتغير. نركز على بناء المهارات العملية والنظرية وتعزيز روح الابتكار والريادة.'
}: DeanProps) => {
  return (
    <section id="dean" className={styles.deanSection}>
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>كلمة العميد</h2>
        <div className={styles.deanContent}>
          <div className={styles.deanCard}>
            <p className={styles.deanMessage}>
              "{message}"
            </p>
          </div>
          <div className={styles.deanImageContainer}>
            <div className={styles.deanImageWrapper} style={{ borderRadius: '0', transform: 'rotate(0deg)' }}>
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={`عميد ${title}`}
                  width={320}
                  height={400}
                  className={styles.deanImage}
                  style={{ borderRadius: '0' }}
                  priority
                />
              )}
            </div>
            <h3 className={styles.deanName}>{name}</h3>
            <p className={styles.deanTitle}>{title}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dean;