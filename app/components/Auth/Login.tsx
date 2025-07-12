'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaUserAlt, FaIdCard, FaSignInAlt, FaUniversity, FaKey, FaSpinner, FaChalkboardTeacher, FaPhone } from 'react-icons/fa';
import styles from './Auth.module.css';


// تم استبدال البيانات النموذجية بالاتصال بقاعدة البيانات الحقيقية

interface LoginProps {
  inModal?: boolean;
}

const Login: React.FC<LoginProps> = ({ inModal = false }) => {
  const router = useRouter();
  const [loginType, setLoginType] = useState<'student' | 'teacher'>('student');
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // تأثيرات الظهور للعناصر
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring" as const, 
        stiffness: 100 
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // إزالة رسالة الخطأ عند الكتابة
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // تحقق من تسجيل الدخول كمسؤول
    if (formData.studentId === 'admin' && formData.name === 'admin123') {
      console.log('تم تسجيل الدخول كمسؤول بنجاح');
      
      // إظهار رسالة النجاح قبل الانتقال
      setSuccess(true);
      
      // تأخير قبل الانتقال لإظهار رسالة النجاح
      setTimeout(() => {
        // تعيين دور المسؤول
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('userName', 'أحمد المدير');
        
        // توجيه المستخدم إلى لوحة التحكم
        router.push('/dashboard');
      }, 1500);
      
      return;
    }

    try {
      if (loginType === 'student') {
        // استخدام API للتحقق من بيانات الطالب
        const response = await fetch('/api/api_academics/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            studentId: formData.studentId,
            name: formData.name
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'فشل تسجيل الدخول');
        }

        // إظهار رسالة النجاح
        setSuccess(true);
        
        // تأخير قبل الانتقال
        setTimeout(() => {
          // تخزين معرف الطالب في localStorage
          localStorage.setItem('currentStudentId', data.studentId);
          localStorage.setItem('userName', data.name);
          localStorage.setItem('userRole', 'student');

          // إذا نجح تسجيل الدخول، قم بتوجيه المستخدم إلى صفحة الطالب
          router.push(`/student-profile/${data.studentId}`);
        }, 1500);
      } else if (loginType === 'teacher') {
        // استخدام API للتحقق من بيانات المعلم
        const response = await fetch('/api/api_academics/auth/teacher-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone
          }),
        });

        const data = await response.json();
        console.log('Teacher login response:', data); // للتصحيح

        if (!response.ok) {
          throw new Error(data.error || 'فشل تسجيل الدخول');
        }

        if (!data.success) {
          throw new Error(data.error || 'فشل تسجيل الدخول');
        }

        // إظهار رسالة النجاح
        setSuccess(true);
        
        // تأخير قبل الانتقال
        setTimeout(() => {
          // تخزين معرف المعلم في localStorage
          if (data.teacherId) {
            localStorage.setItem('teacherId', String(data.teacherId));
            localStorage.setItem('userName', data.name);
            localStorage.setItem('userRole', 'teacher');

            // إذا نجح تسجيل الدخول، قم بتوجيه المستخدم إلى صفحة المعلم
            router.push(`/teacher-profile/${data.teacherId}`);
          } else {
            throw new Error('لم يتم العثور على معرف المعلم');
          }
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء تسجيل الدخول');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className={`${styles.loginContainer} ${inModal ? styles.inModal : ''}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {!inModal && (
        <motion.div 
          className={styles.logoContainer}
          variants={itemVariants}
        >
          <Image
            src="/image/Alryada--Logo.png"
            alt="شعار جامعة الريادة"
            width={160} 
            height={60} 
            priority
          />
        </motion.div>
      )}
      
      <motion.div className={styles.formHeader} variants={itemVariants}>
        <h1 className={styles.title}>
          <FaUniversity />
          تسجيل الدخول
        </h1>
        <p className={styles.subtitle}>أدخل بياناتك للوصول إلى حسابك</p>
      </motion.div>
      
      <motion.div className={styles.loginTypeSelector} variants={itemVariants}>
        <button 
          className={`${styles.loginTypeButton} ${loginType === 'student' ? styles.active : ''}`}
          onClick={() => setLoginType('student')}
          type="button"
        >
          <FaUserAlt /> طالب
        </button>
        <button 
          className={`${styles.loginTypeButton} ${loginType === 'teacher' ? styles.active : ''}`}
          onClick={() => setLoginType('teacher')}
          type="button"
        >
          <FaChalkboardTeacher /> الاستاذ
        </button>
      </motion.div>
      
      {error && (
        <motion.div 
          className={styles.formError}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}
      
      {success && (
        <motion.div 
          className={styles.formSuccess}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          تم تسجيل الدخول بنجاح! جاري تحويلك...
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        {loginType === 'student' ? (
          <>
            <motion.div className={styles.formGroup} variants={itemVariants}>
              <label className={styles.label} htmlFor="studentId">
                رقم القيد
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.iconWrapper}>
                  <FaIdCard />
                </span>
                <input
                  className={styles.input}
                  type="text"
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                  placeholder="أدخل رقم القيد"
                  disabled={loading || success}
                />
              </div>
            </motion.div>

            <motion.div className={styles.formGroup} variants={itemVariants}>
              <label className={styles.label} htmlFor="name">
               الاسم 
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.iconWrapper}>
                  <FaUserAlt />
                </span>
                <input
                  className={styles.input}
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="أدخل اسمك الأول"
                  disabled={loading || success}
                />
              </div>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div className={styles.formGroup} variants={itemVariants}>
            <label className={styles.label} htmlFor="name">
                الاسم الكامل (بالعربية)
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.iconWrapper}>
                <FaChalkboardTeacher />
              </span>
              <input
                className={styles.input}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="أدخل اسم الاستاذ بالعربية"
                disabled={loading || success}
              />
            </div>
          </motion.div>

            <motion.div className={styles.formGroup} variants={itemVariants}>
              <label className={styles.label} htmlFor="phone">
                رقم الهاتف
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.iconWrapper}>
                  <FaPhone />
                </span>
                <input
                  className={styles.input}
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="أدخل رقم الهاتف"
                  disabled={loading || success}
                />
              </div>
            </motion.div>
          </>
        )}

        <motion.button 
          type="submit" 
          className={styles.submitButton}
          disabled={loading || success}
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? (
            <>
              <span className={styles.spinner}></span>
              جاري تسجيل الدخول...
            </>
          ) : success ? (
            <>
              تم تسجيل الدخول بنجاح!
            </>
          ) : (
            <>
              <FaSignInAlt className={styles.buttonIcon} /> تسجيل الدخول
            </>
          )}
        </motion.button>
        
        <motion.div 
          className={styles.adminLoginSection}
          variants={itemVariants}
        >
          <p className={styles.loginHelp}>
            {loginType === 'student' 
              ? 'أدخل رقم القيد واسمك الأول للدخول إلى حسابك' 
              : 'أدخل اسمك ورقم هاتفك للدخول إلى حسابك'}
          </p>
          <motion.button 
            type="button" 
            className={styles.adminLoginButton}
            onClick={() => {
              setFormData({
                studentId: 'admin',
                name: 'admin123',
                phone: ''
              });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading || success}
          >
            دخول كمسؤول
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default Login;
