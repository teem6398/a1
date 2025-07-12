'use client';

import Link from 'next/link';
import styles from '../../sharing/sharing.module.css';

// تعريف نوع البيانات المتوقعة كـ props
interface HeroProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

const Hero = ({ title = 'كلية الهندسة', subtitle = 'نحو مستقبل هندسي مبتكر', imageUrl = '/colloge/1.jpg' }: HeroProps) => {
  return (
    <div 
      className={styles.heroSection} 
      style={{
        backgroundImage: `url('${imageUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}
    >
      {/* طبقة التعتيم للخلفية */}
      <div className={styles.heroOverlay}></div>
      
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>{title}</h1>
        <p className={styles.heroSubtitle}>{subtitle}</p>
        <Link href="#AboutSection" className={styles.ctaButton}>
          اكتشف المزيد
        </Link>
      </div>
    </div>
  );
};

export default Hero;