'use client';

import React, { useState, useEffect } from 'react';
import styles from './ApplicationForm.module.css';
import { useTranslation } from '../../../lib/translation-context';
import translations from '../translations.json';

// تعريف أنواع البيانات
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  nationalId: string;
  birthDate: string;
  gender: string;
  highSchoolType: string;
  highSchoolGrade: string;
  preferredCollege: string;
  preferredMajor: string;
  address: string;
  notes: string;
}

interface College {
  id: string;
  name: string;
  slug: string;
}

interface Major {
  id: number;
  name: string;
  collegeSlug: string;
}

const ApplicationForm: React.FC = () => {
  // استخدام سياق الترجمة
  const { language, isRTL } = useTranslation();
  
  // الحصول على الترجمات حسب اللغة المحددة
  const t = translations[language];
  
  // حالة النموذج
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    nationalId: '',
    birthDate: '',
    gender: '',
    highSchoolType: '',
    highSchoolGrade: '',
    preferredCollege: '',
    preferredMajor: '',
    address: '',
    notes: ''
  });

  // حالة تقديم النموذج
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [colleges, setColleges] = useState<College[]>([]);
  const [majors, setMajors] = useState<Major[]>([]);
  const [filteredMajors, setFilteredMajors] = useState<Major[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch colleges and majors
  useEffect(() => {
    const fetchCollegesAndMajors = async () => {
      try {
        const response = await fetch(`/api/api_pages/majors?lang=${language}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        setColleges(data.colleges);
        setMajors(data.majors);
      } catch (error) {
        console.error('Error fetching colleges and majors:', error);
      }
    };
    
    fetchCollegesAndMajors();
  }, [language]);
  
  // Filter majors based on selected college
  useEffect(() => {
    if (formData.preferredCollege) {
      const filtered = majors.filter(major => major.collegeSlug === formData.preferredCollege);
      setFilteredMajors(filtered);
    } else {
      setFilteredMajors([]);
    }
  }, [formData.preferredCollege, majors]);

  // التعامل مع تغيير قيم الحقول
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // التحقق من صحة النموذج
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    const requiredFields = ['fullName', 'email', 'phone', 'nationalId', 'birthDate', 'gender', 'highSchoolType', 'highSchoolGrade', 'preferredCollege', 'preferredMajor'];
    
    requiredFields.forEach(field => {
      if (!formData[field as keyof FormData]) {
        newErrors[field] = t.applicationForm.requiredField;
      }
    });
    
    // التحقق من صحة البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = t.applicationForm.invalidEmail;
    }
    
    // التحقق من صحة رقم الهاتف
    const phoneRegex = /^\d{9,10}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = t.applicationForm.invalidPhone;
    }
    
    // التحقق من صحة الرقم الوطني
    const nationalIdRegex = /^\d{10,14}$/;
    if (!nationalIdRegex.test(formData.nationalId)) {
      newErrors.nationalId = t.applicationForm.invalidNationalId;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // الحصول على تسمية الحقل بالعربية
  const getFieldLabel = (fieldName: string): string => {
    const fieldTranslations: Record<string, string> = {
      fullName: t.applicationForm.fullName,
      email: t.applicationForm.email,
      phone: t.applicationForm.phone,
      nationalId: t.applicationForm.nationalId,
      birthDate: t.applicationForm.birthDate,
      gender: t.applicationForm.gender,
      highSchoolType: t.applicationForm.highSchoolType,
      highSchoolGrade: t.applicationForm.highSchoolGrade,
      preferredCollege: t.applicationForm.preferredCollege,
      preferredMajor: t.applicationForm.preferredMajor,
      address: t.applicationForm.address,
      notes: t.applicationForm.notes
    };
    
    return fieldTranslations[fieldName] || fieldName;
  };

  // تقديم النموذج
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // التحقق من صحة النموذج
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    try {
      // هنا يمكن إضافة الاتصال بالخادم لإرسال البيانات
      // مثال: await fetch('/api/application-form', { method: 'POST', body: JSON.stringify(formData) });
      
      // محاكاة الاتصال بالخادم
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // تم التقديم بنجاح
      setSubmitStatus('success');
      
      // إعادة تعيين النموذج
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        nationalId: '',
        birthDate: '',
        gender: '',
        highSchoolType: '',
        highSchoolGrade: '',
        preferredCollege: '',
        preferredMajor: '',
        address: '',
        notes: ''
      });
    } catch (error) {
      console.error('خطأ في تقديم النموذج:', error);
      setSubmitStatus('error');
      setErrorMessage(t.applicationForm.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      nationalId: '',
      birthDate: '',
      gender: '',
      highSchoolType: '',
      highSchoolGrade: '',
      preferredCollege: '',
      preferredMajor: '',
      address: '',
      notes: ''
    });
    setErrors({});
    setSubmitStatus('idle');
  };

  return (
    <section className={styles.formSection} id="registration-form">
      <div className={styles.container}>
        <div className={styles.formHeader}>
          <h2 className={styles.formTitle}>{t.applicationForm.title}</h2>
          <p className={styles.formDescription}>
            {t.applicationForm.subtitle}
          </p>
        </div>

        {submitStatus === 'success' ? (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✓</div>
            <h3>{t.applicationForm.successMessage}</h3>
            <p>{t.applicationForm.notificationMessage}</p>
            <button 
              className={styles.newApplicationButton}
              onClick={() => setSubmitStatus('idle')}
            >
              {t.applicationForm.submit}
            </button>
          </div>
        ) : (
          <form className={styles.applicationForm} onSubmit={handleSubmit}>
            {/* البيانات الشخصية */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>{t.applicationForm.personalInfo}</h3>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="fullName">{t.applicationForm.fullName} *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder={t.applicationForm.fullName}
                    required
                    className={errors.fullName ? styles.inputError : ''}
                  />
                  {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="nationalId">{t.applicationForm.nationalId} *</label>
                  <input
                    type="text"
                    id="nationalId"
                    name="nationalId"
                    value={formData.nationalId}
                    onChange={handleChange}
                    placeholder={t.applicationForm.nationalId}
                    required
                    className={errors.nationalId ? styles.inputError : ''}
                  />
                  {errors.nationalId && <span className={styles.errorText}>{errors.nationalId}</span>}
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="email">{t.applicationForm.email} *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.applicationForm.email}
                    required
                    className={errors.email ? styles.inputError : ''}
                  />
                  {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="phone">{t.applicationForm.phone} *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t.applicationForm.phone}
                    required
                    className={errors.phone ? styles.inputError : ''}
                  />
                  {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="birthDate">{t.applicationForm.birthDate} *</label>
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                    className={errors.birthDate ? styles.inputError : ''}
                  />
                  {errors.birthDate && <span className={styles.errorText}>{errors.birthDate}</span>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="gender">{t.applicationForm.gender} *</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className={errors.gender ? styles.inputError : ''}
                  >
                    <option value="">{t.applicationForm.gender}</option>
                    <option value="male">{t.applicationForm.male}</option>
                    <option value="female">{t.applicationForm.female}</option>
                  </select>
                  {errors.gender && <span className={styles.errorText}>{errors.gender}</span>}
                </div>
              </div>
            </div>
            
            {/* البيانات الأكاديمية */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>{t.applicationForm.academicInfo}</h3>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="highSchoolType">{t.applicationForm.highSchoolType} *</label>
                  <select
                    id="highSchoolType"
                    name="highSchoolType"
                    value={formData.highSchoolType}
                    onChange={handleChange}
                    required
                    className={errors.highSchoolType ? styles.inputError : ''}
                  >
                    <option value="">{t.applicationForm.highSchoolType}</option>
                    <option value="scientific">{t.applicationForm.scientific}</option>
                    <option value="literary">{t.applicationForm.literary}</option>
                    <option value="other">{t.applicationForm.other}</option>
                  </select>
                  {errors.highSchoolType && <span className={styles.errorText}>{errors.highSchoolType}</span>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="highSchoolGrade">{t.applicationForm.highSchoolGrade} *</label>
                  <input
                    type="text"
                    id="highSchoolGrade"
                    name="highSchoolGrade"
                    value={formData.highSchoolGrade}
                    onChange={handleChange}
                    placeholder={t.applicationForm.highSchoolGrade}
                    required
                    className={errors.highSchoolGrade ? styles.inputError : ''}
                  />
                  {errors.highSchoolGrade && <span className={styles.errorText}>{errors.highSchoolGrade}</span>}
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="preferredCollege">{t.applicationForm.preferredCollege} *</label>
                  <select
                    id="preferredCollege"
                    name="preferredCollege"
                    value={formData.preferredCollege}
                    onChange={handleChange}
                    required
                    className={errors.preferredCollege ? styles.inputError : ''}
                  >
                    <option value="">{t.applicationForm.preferredCollege}</option>
                    {colleges.map((college) => (
                      <option key={college.id} value={college.slug}>
                        {college.name}
                      </option>
                    ))}
                  </select>
                  {errors.preferredCollege && <span className={styles.errorText}>{errors.preferredCollege}</span>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="preferredMajor">{t.applicationForm.preferredMajor} *</label>
                  <select
                    id="preferredMajor"
                    name="preferredMajor"
                    value={formData.preferredMajor}
                    onChange={handleChange}
                    disabled={!formData.preferredCollege}
                    required
                    className={errors.preferredMajor ? styles.inputError : ''}
                  >
                    <option value="">{t.applicationForm.preferredMajor}</option>
                    {filteredMajors.map((major) => (
                      <option key={major.id} value={major.id}>
                        {major.name}
                      </option>
                    ))}
                  </select>
                  {errors.preferredMajor && <span className={styles.errorText}>{errors.preferredMajor}</span>}
                </div>
              </div>
            </div>
            
            {/* معلومات إضافية */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>{t.applicationForm.additionalInfo}</h3>
              
              <div className={styles.formGroup}>
                <label htmlFor="address">{t.applicationForm.address}</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder={t.applicationForm.address}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="notes">{t.applicationForm.notes}</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder={t.applicationForm.notes}
                  rows={4}
                ></textarea>
              </div>
            </div>
            
            {/* رسائل الخطأ */}
            {errorMessage && (
              <div className={styles.errorMessage}>
                {errorMessage}
              </div>
            )}
            
            {/* أزرار التقديم */}
            <div className={styles.formActions}>
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className={styles.loadingSpinner}></span>
                ) : (
                  t.applicationForm.submit
                )}
              </button>
              
              <button 
                type="reset" 
                className={styles.resetButton}
                onClick={handleReset}
                disabled={isSubmitting}
              >
                {t.applicationForm.reset}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default ApplicationForm;
