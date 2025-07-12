'use client';

import React, { useState, useEffect } from 'react';
import { 
  FaUniversity, FaGraduationCap, FaIdCard, FaCalendarAlt, 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaInfoCircle,
  FaUserGraduate, FaUserTie, FaVenusMars, FaBriefcase
} from 'react-icons/fa';
import styles from '../Teacher.module.css';
import { Teacher } from '../interfaces';

interface ProfileSectionProps {
  teacherId: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ teacherId }) => {
  const [teacherData, setTeacherData] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!teacherId) {
      setLoading(false);
      setError("لم يتم توفير معرف المدرس.");
      return;
    }

    const fetchTeacherData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/api_academics/teachers?id=${teacherId}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("لم يتم العثور على بيانات المدرس.");
          }
          throw new Error(`فشل في جلب بيانات المدرس: ${response.statusText}`);
        }
        const data: Teacher = await response.json();
        setTeacherData(data);
      } catch (err: any) {
        setError(err.message || "حدث خطأ غير متوقع.");
        setTeacherData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, [teacherId]);

  if (loading) {
    return <div className={styles.loadingState}>جار التحميل...</div>;
  }

  if (error) {
    return <div className={styles.errorState}>خطأ: {error}</div>;
  }

  if (!teacherData) {
    return <div className={styles.notFoundState}>لم يتم العثور على بيانات المدرس.</div>;
  }

  return (
    <div className={styles.profileSection}>
      <div className={styles.profileInfo}>
        <h3 className={styles.sectionTitle}>
          <FaUserTie style={{ marginLeft: '0.5rem', color: '#0066cc' }} />
          المعلومات الأكاديمية والشخصية
        </h3>
        
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <FaUniversity className={styles.infoIcon} />
            <span className={styles.infoLabel}>الكلية:</span>
            <span className={styles.infoValue}>{teacherData.college}</span>
          </div>
          <div className={styles.infoItem}>
            <FaGraduationCap className={styles.infoIcon} />
            <span className={styles.infoLabel}>القسم:</span>
            <span className={styles.infoValue}>{teacherData.department}</span>
          </div>
          <div className={styles.infoItem}>
            <FaIdCard className={styles.infoIcon} />
            <span className={styles.infoLabel}>الرقم الوظيفي:</span>
            <span className={styles.infoValue}>{teacherData.teacher_id}</span>
          </div>
          <div className={styles.infoItem}>
            <FaCalendarAlt className={styles.infoIcon} />
            <span className={styles.infoLabel}>تاريخ التعيين:</span>
            <span className={styles.infoValue}>{teacherData.hire_date ? new Date(teacherData.hire_date).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' }) : 'غير متوفر'}</span>
          </div>
          <div className={styles.infoItem}>
            <FaBriefcase className={styles.infoIcon} />
            <span className={styles.infoLabel}>سنوات الخبرة:</span>
            <span className={styles.infoValue}>{teacherData.years_of_experience ?? 0} سنة</span>
          </div>
          <div className={styles.infoItem}>
            <FaVenusMars className={styles.infoIcon} />
            <span className={styles.infoLabel}>الجنس:</span>
            <span className={styles.infoValue}>{teacherData.gender || 'غير محدد'}</span>
          </div>
          <div className={styles.infoItem}>
            <FaEnvelope className={styles.infoIcon} />
            <span className={styles.infoLabel}>البريد الإلكتروني:</span>
            <span className={styles.infoValue}>{teacherData.email}</span>
          </div>
          <div className={styles.infoItem}>
            <FaPhone className={styles.infoIcon} />
            <span className={styles.infoLabel}>رقم الهاتف:</span>
            <span className={styles.infoValue}>{teacherData.phone || 'غير متوفر'}</span>
          </div>
        </div>
      </div>
      
      <div className={styles.bioSection}>
        <h3 className={styles.bioTitle}>
          <FaInfoCircle style={{ marginLeft: '0.5rem' }} />
          نبذة شخصية
        </h3>
        <p className={styles.bioContent}>{teacherData.bio || 'لا توجد نبذة شخصية متاحة.'}</p>
      </div>
      
      {teacherData.specialization && (
        <div className={styles.achievementsSection}>
          <h3 className={styles.sectionTitle}>
            <FaGraduationCap style={{ marginLeft: '0.5rem', color: '#0066cc' }} />
            التخصص الدقيق
          </h3>
          <p className={styles.achievementsContent}>{teacherData.specialization}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
