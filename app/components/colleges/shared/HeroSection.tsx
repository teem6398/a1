'use client';

import styles from '../sharing/sharing.module.css';
import { useTranslation } from '../../../lib/translation-context';
import CollegeGeometricShapes, { majorsSectionShapes } from './CollegeGeometricShapes';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

const HeroSection = ({ 
  title, 
  subtitle, 
  imageUrl 
}: HeroSectionProps) => {
  const { language, dir } = useTranslation();
  
  return (
    <section 
      className={styles.heroSection} 
      dir={dir}
    >
      <div 
        className={styles.heroOverlay}
        style={{
          backgroundImage: `linear-gradient(
            rgba(0, 0, 0, 0.5), 
            rgba(0, 0, 0, 0.6)
          ), url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <CollegeGeometricShapes shapes={majorsSectionShapes} className="hero-shapes" />
        
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{title}</h1>
          <p className={styles.heroSubtitle}>{subtitle}</p>
          
          {/* Scroll indicator */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 