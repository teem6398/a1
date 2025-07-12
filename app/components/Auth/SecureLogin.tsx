'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaUserAlt, FaIdCard, FaSignInAlt, FaUniversity, FaSpinner, FaChalkboardTeacher, FaPhone, FaShieldAlt } from 'react-icons/fa';
import { useAuth } from '../../lib/auth-context';
import styles from './Auth.module.css';

interface SecureLoginProps {
  inModal?: boolean;
}

const SecureLogin: React.FC<SecureLoginProps> = ({ inModal = false }) => {
  const router = useRouter();
  const { login } = useAuth();
  const [loginType, setLoginType] = useState<'student' | 'teacher' | 'admin'>('student');
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    phone: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [blocked, setBlocked] = useState(false);

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
    if (blocked) setBlocked(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setBlocked(false);

    try {
      // تحضير بيانات تسجيل الدخول
      const credentials = {
        loginType,
        ...formData
      };

      // محاولة تسجيل الدخول
      const result = await login(credentials);

      if (result.success) {
        setSuccess(true);
        
        // تأخير قبل التوجيه
        setTimeout(() => {
          // توجيه المستخدم حسب نوع الحساب
          switch (loginType) {
            case 'admin':
              router.push('/dashboard');
              break;
            case 'teacher':
              router.push(`/teacher-profile/${formData.studentId || 'profile'}`);
              break;
            case 'student':
              router.push(`/student-profile/${formData.studentId || 'profile'}`);
              break;
            default:
              router.push('/');
          }
        }, 1500);
      } else {
        setError(result.error || 'فشل تسجيل الدخول');
        if (result.blocked) {
          setBlocked(true);
        }
      }
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  };

  // تحديد أزرار الدخول السريع
  const quickLoginButtons = [
    {
      type: 'admin' as const,
      label: 'دخول كمسؤول',
      icon: <FaShieldAlt />,
      data: { studentId: 'admin', name: 'admin123' }
    }
  ];

  const handleQuickLogin = (buttonData: any) => {
    setFormData(prev => ({
      ...prev,
      ...buttonData
    }));
    setLoginType('admin');
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
          تسجيل دخول آمن
        </h1>
        <p className={styles.subtitle}>
          نظام مصادقة محسن مع حماية متقدمة
        </p>
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
          <FaChalkboardTeacher /> معلم
        </button>
        <button 
          className={`${styles.loginTypeButton} ${loginType === 'admin' ? styles.active : ''}`}
          onClick={() => setLoginType('admin')}
          type="button"
        >
          <FaShieldAlt /> مدير
        </button>
      </motion.div>
      
      {error && (
        <motion.div 
          className={`${styles.formError} ${blocked ? styles.blocked : ''}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
          {blocked && (
            <div className={styles.blockedInfo}>
              <FaShieldAlt />
              تم حظر هذا الحساب مؤقتاً لأسباب أمنية
            </div>
          )}
        </motion.div>
      )}
      
      {success && (
        <motion.div 
          className={styles.formSuccess}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <FaShieldAlt />
          تم تسجيل الدخول بنجاح! جاري تحويلك بأمان...
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        {loginType === 'student' && (
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
                الاسم الأول
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
        )}

        {loginType === 'teacher' && (
          <>
            <motion.div className={styles.formGroup} variants={itemVariants}>
              <label className={styles.label} htmlFor="name">
                اسم الاستاذ
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

        {loginType === 'admin' && (
          <>
            <motion.div className={styles.formGroup} variants={itemVariants}>
              <label className={styles.label} htmlFor="studentId">
                اسم المستخدم
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.iconWrapper}>
                  <FaShieldAlt />
                </span>
                <input
                  className={styles.input}
                  type="text"
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                  placeholder="أدخل اسم المستخدم"
                  disabled={loading || success}
                />
              </div>
            </motion.div>

            <motion.div className={styles.formGroup} variants={itemVariants}>
              <label className={styles.label} htmlFor="name">
                كلمة المرور
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.iconWrapper}>
                  <FaShieldAlt />
                </span>
                <input
                  className={styles.input}
                  type="password"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="أدخل كلمة المرور"
                  disabled={loading || success}
                />
              </div>
            </motion.div>
          </>
        )}

        <motion.button 
          type="submit" 
          className={`${styles.submitButton} ${blocked ? styles.blocked : ''}`}
          disabled={loading || success || blocked}
          variants={itemVariants}
          whileHover={{ scale: blocked ? 1 : 1.03 }}
          whileTap={{ scale: blocked ? 1 : 0.98 }}
        >
          {loading ? (
            <>
              <span className={styles.spinner}></span>
              جاري المصادقة الآمنة...
            </>
          ) : success ? (
            <>
              <FaShieldAlt />
              تم التحقق بنجاح!
            </>
          ) : blocked ? (
            <>
              <FaShieldAlt />
              محظور مؤقتاً
            </>
          ) : (
            <>
              <FaSignInAlt className={styles.buttonIcon} /> 
              دخول آمن
            </>
          )}
        </motion.button>
        
        {!blocked && (
          <motion.div 
            className={styles.quickLoginSection}
            variants={itemVariants}
          >
            <p className={styles.loginHelp}>
              {loginType === 'student' 
                ? 'أدخل رقم القيد واسمك الأول للدخول الآمن' 
                : loginType === 'teacher'
                ? 'أدخل اسمك ورقم هاتفك للدخول الآمن'
                : 'أدخل بيانات المدير للدخول الآمن'}
            </p>
            
            {quickLoginButtons.map((button, index) => (
              <motion.button 
                key={index}
                type="button" 
                className={styles.quickLoginButton}
                onClick={() => handleQuickLogin(button.data)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading || success}
              >
                {button.icon}
                {button.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default SecureLogin; 