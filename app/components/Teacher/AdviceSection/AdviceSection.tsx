'use client';

import React from 'react';
import { FaLightbulb } from 'react-icons/fa';
import styles from './AdviceSection.module.css';
import { TeacherAdvice as Advice, AdviceSectionProps } from '../interfaces'; // استيراد الواجهات المحدثة

const AdviceSection: React.FC<AdviceSectionProps> = ({ advice, teacherId }) => { // إضافة teacherId
  return (
    <div className={styles.adviceSection}>
      <h2 className={styles.sectionTitle}>
        <FaLightbulb style={{ color: 'var(--brand)' }} />
        نصائح المعلم
      </h2>
      <div className={styles.adviceList}>
        {advice.length > 0 ? (
          advice.map((item) => (
            <div key={item.advice_id} className={styles.adviceCard}>
              <FaLightbulb 
                style={{ 
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  color: 'var(--brand)',
                  fontSize: 'var(--font-size-xl)',
                  opacity: 0.2
                }} 
              />
              {item.title_ar && <h4 className={styles.adviceTitle}>{item.title_ar || item.title_en}</h4>}
              <p className={styles.adviceContent}>{item.content_ar || item.content_en}</p>
              {item.created_at && 
                <p className={styles.adviceDate}>
                  {new Date(item.created_at).toLocaleDateString('ar-SA', { 
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              }
              {/* يمكن إضافة item.category إذا كان مطلوبًا عرضه */}
            </div>
          ))
        ) : (
          <div className={styles.noData}>لا توجد نصائح متاحة</div>
        )}
      </div>
    </div>
  );
};

export default AdviceSection;
