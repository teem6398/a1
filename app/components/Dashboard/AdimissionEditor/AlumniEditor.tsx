'use client';

import React from 'react';
import { FaEdit, FaSave, FaPlus, FaUserGraduate } from 'react-icons/fa';
import styles from './AlumniEditor.module.css';

const AlumniEditor = () => {
  return (
    <div className={styles.editorContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>تحرير قسم قصص الخريجين</h1>
      </div>
      
      <div className={styles.editorContent}>
        <div className={styles.placeholderContent}>
          <h3><FaUserGraduate style={{ marginLeft: '0.5rem' }} /> إدارة قصص الخريجين</h3>
          <p>هذا القسم قيد التطوير. سيتم إضافة إمكانية تحرير محتوى قسم "قصص الخريجين" قريبًا.</p>
          <p>سيتضمن هذا القسم إمكانية:</p>
          <ul style={{ textAlign: 'right', listStylePosition: 'inside' }}>
            <li>إضافة وتعديل وحذف قصص النجاح للخريجين</li>
            <li>إضافة معلومات التواصل للخريجين</li>
            <li>تصنيف القصص حسب الكلية والتخصص</li>
            <li>إضافة صور وفيديوهات للخريجين</li>
            <li>إدارة شهادات الخريجين عن الجامعة</li>
          </ul>
          <button className={styles.addButton}>
            <FaPlus /> إضافة قصة خريج جديدة
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlumniEditor; 