'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaUserAlt, FaIdCard, FaSignInAlt, FaUniversity, FaKey, FaSpinner, FaChalkboardTeacher, FaPhone, FaExclamationTriangle, FaInfoCircle, FaLock, FaUser } from 'react-icons/fa';
import styles from './Auth.module.css';
import { getLoginStatus, formatBlockedTime } from '../../../lib/auth';


// تم استبدال البيانات النموذجية بالاتصال بقاعدة البيانات الحقيقية

interface LoginProps {
  inModal?: boolean;
}

// تعريف واجهة حالة الحظر
interface BlockedInfo {
  blocked: boolean;
  blockedUntil?: string;
  remainingTime?: string;
  remainingAttempts?: number;
  blockCount?: number; // Added for progressive blocking
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
  const [blockedInfo, setBlockedInfo] = useState<BlockedInfo | null>(null);

  // إضافة متغير حالة للتحكم في عرض حقل كلمة المرور
  const [hasPassword, setHasPassword] = useState(false);

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

  // تحديد ما إذا كان النموذج معطلاً
  const isFormDisabled = loading || success || (blockedInfo?.blocked === true);

  // التحقق من حالة الحظر عند تحميل الصفحة
  useEffect(() => {
    // التحقق فقط إذا كان هناك رقم قيد مدخل
    if (formData.studentId) {
      const loginIdentifier = `student-${formData.studentId}`;
      const status = getLoginStatus(loginIdentifier);
      
      if (status.blocked) {
        setBlockedInfo({
          blocked: true,
          blockedUntil: status.blockedUntil?.toISOString(),
          remainingTime: formatBlockedTime(status.blockedUntil),
          remainingAttempts: 0,
          blockCount: status.blockCount // Assuming blockCount is part of status
        });
      } else if (status.remainingAttempts < 5) {
        setBlockedInfo({
          blocked: false,
          remainingAttempts: status.remainingAttempts,
          blockCount: status.blockCount // Assuming blockCount is part of status
        });
      }
    }
  }, [formData.studentId]);

  // تحديث المعلومات كل دقيقة لعرض الوقت المتبقي للحظر بشكل صحيح
  useEffect(() => {
    if (!blockedInfo?.blocked) return;
    
    const timer = setInterval(() => {
      if (blockedInfo.blockedUntil) {
        const blockedUntil = new Date(blockedInfo.blockedUntil);
        const now = new Date();
        
        if (now >= blockedUntil) {
          // انتهت فترة الحظر
          setBlockedInfo(null);
          setError('');
        } else {
          // تحديث الوقت المتبقي
          setBlockedInfo({
            ...blockedInfo,
            remainingTime: formatBlockedTime(blockedUntil)
          });
        }
      }
    }, 60000); // تحديث كل دقيقة
    
    return () => clearInterval(timer);
  }, [blockedInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // إزالة رسالة الخطأ عند الكتابة
    if (error) setError('');
    
    // إذا كان المستخدم يغير رقم القيد، تحقق من حالة الحظر
    if (name === 'studentId' && value) {
      const loginIdentifier = `student-${value}`;
      const status = getLoginStatus(loginIdentifier);
      
      if (status.blocked) {
        setBlockedInfo({
          blocked: true,
          blockedUntil: status.blockedUntil?.toISOString(),
          remainingTime: formatBlockedTime(status.blockedUntil),
          remainingAttempts: 0,
          blockCount: status.blockCount // Assuming blockCount is part of status
        });
      } else if (status.remainingAttempts < 5) {
        setBlockedInfo({
          blocked: false,
          remainingAttempts: status.remainingAttempts,
          blockCount: status.blockCount // Assuming blockCount is part of status
        });
      } else {
        setBlockedInfo(null);
      }
    }
  };

  // تحديث واجهة المستخدم للتعامل مع طريقة تسجيل الدخول بكلمة المرور
  const handleStudentIdChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const studentId = e.target.value;
    setFormData(prev => ({ ...prev, studentId }));
    
    if (studentId && loginType === 'student') {
      try {
        // التحقق مما إذا كان الطالب لديه كلمة مرور
        console.log('التحقق من وجود كلمة مرور للطالب:', studentId);
        const response = await fetch(`/api/api_academics/student/check-password?id=${studentId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('نتيجة التحقق من وجود كلمة مرور:', data);
          if (data.hasPassword) {
            // إذا كان الطالب لديه كلمة مرور، قم بتغيير تسمية حقل الاسم
            console.log('الطالب لديه كلمة مرور، تغيير واجهة المستخدم');
            setHasPassword(true);
          } else {
            console.log('الطالب ليس لديه كلمة مرور، استخدام واجهة المستخدم التقليدية');
            setHasPassword(false);
          }
        }
      } catch (error) {
        console.error('خطأ في التحقق من وجود كلمة مرور:', error);
        setHasPassword(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBlockedInfo(null);
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
        console.log('محاولة تسجيل الدخول كطالب:', {
          studentId: formData.studentId,
          name: formData.name,
          isPasswordLogin: hasPassword
        });

        const response = await fetch('/api/api_academics/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            studentId: formData.studentId,
            name: formData.name,
            isPasswordLogin: hasPassword // إضافة علامة لتحديد نوع تسجيل الدخول
          }),
        });

        const data = await response.json();
        console.log('استجابة API تسجيل الدخول:', data);

        if (response.ok && data.success) {
          // تخزين معلومات المستخدم في localStorage
          localStorage.setItem('userRole', 'student');
          localStorage.setItem('userName', data.name);
          localStorage.setItem('currentStudentId', data.studentId);
          
          // تخزين صورة المستخدم إذا كانت متوفرة
          if (data.userImage) {
            localStorage.setItem('userImage', data.userImage);
          }

          // إظهار رسالة النجاح قبل الانتقال
          setSuccess(true);

          // تأخير قبل الانتقال لإظهار رسالة النجاح
          setTimeout(() => {
            // توجيه المستخدم إلى صفحة الملف الشخصي
            router.push(`/student-profile/${data.studentId}`);
          }, 1500);
        } else {
          // إظهار رسالة الخطأ
          setError(data.error || 'فشل تسجيل الدخول');

          // التعامل مع معلومات الحظر
          if (data.blocked) {
            setBlockedInfo({
              blocked: data.blocked,
              blockedUntil: data.blockedUntil,
              remainingTime: data.remainingTime,
              remainingAttempts: data.remainingAttempts || 0,
              blockCount: data.blockCount
            });
          } else if (data.remainingAttempts && data.remainingAttempts < 5) {
            setBlockedInfo({
              blocked: false,
              remainingAttempts: data.remainingAttempts,
              blockCount: data.blockCount
            });
          }
        }
      } else if (loginType === 'teacher') {
        // استخدام API للتحقق من بيانات المعلم
        console.log('محاولة تسجيل الدخول كأستاذ:', {
          name: formData.name,
          phone: formData.phone
        });

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
        console.log('استجابة API تسجيل الدخول لاستاذ:', data);

        if (response.ok && data.success) {
          // تخزين معلومات المعلم في localStorage
          localStorage.setItem('userRole', 'teacher');
          localStorage.setItem('userName', data.name);
          localStorage.setItem('teacherId', data.teacherId);
          
          // تخزين صورة المعلم إذا كانت متوفرة
          if (data.userImage) {
            localStorage.setItem('userImage', data.userImage);
          }

          // إظهار رسالة النجاح قبل الانتقال
          setSuccess(true);

          // تأخير قبل الانتقال لإظهار رسالة النجاح
          setTimeout(() => {
            // توجيه المستخدم إلى صفحة الملف الشخصي
            router.push(`/teacher-profile/${data.teacherId}`);
          }, 1500);
        } else {
          // إظهار رسالة الخطأ
          setError(data.error || 'فشل تسجيل الدخول');
        }
      }
    } catch (err: any) {
      console.error('خطأ في تسجيل الدخول:', err);
      setError(err.message || 'حدث خطأ أثناء تسجيل الدخول');
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
          <FaChalkboardTeacher /> الأستاذ
        </button>
      </motion.div>
      
      {error && (
        <motion.div 
          className={styles.formError}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FaExclamationTriangle /> {error}
        </motion.div>
      )}
      
      {blockedInfo && blockedInfo.blocked && (
        <motion.div 
          className={styles.formBlocked}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FaExclamationTriangle />
          <div>
            <p>تم حظر الحساب مؤقتاً بسبب محاولات تسجيل دخول متكررة</p>
            <p>يمكنك المحاولة مرة أخرى بعد: {blockedInfo.remainingTime}</p>
            {blockedInfo.blockCount && blockedInfo.blockCount > 1 && (
              <p className={styles.blockCountWarning}>
                تنبيه: هذه المرة {blockedInfo.blockCount} من محاولات الحظر. 
                مدة الحظر تزداد مع كل محاولة فاشلة متكررة وقد تصل إلى شهر كامل.
              </p>
            )}
          </div>
        </motion.div>
      )}
      
      {blockedInfo && !blockedInfo.blocked && blockedInfo.remainingAttempts !== undefined && (
        <motion.div 
          className={styles.formWarning}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FaInfoCircle />
          <div>
            <p>محاولات متبقية: {blockedInfo.remainingAttempts}</p>
            <p>سيتم حظر الحساب مؤقتاً بعد استنفاد جميع المحاولات</p>
          </div>
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
        {loginType === 'student' && (
          <>
            <motion.div 
              className={styles.formGroup}
              variants={itemVariants}
            >
              <label htmlFor="studentId" className={styles.label}>رقم القيد</label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  className={styles.input}
                  value={formData.studentId}
                  onChange={(e) => {
                    handleChange(e);
                    handleStudentIdChange(e);
                  }}
                  disabled={isFormDisabled}
                  required
                  placeholder="أدخل رقم القيد الخاص بك"
                />
                <span className={styles.iconWrapper}>
                  <FaIdCard />
                </span>
              </div>
            </motion.div>
            <motion.div 
              className={styles.formGroup}
              variants={itemVariants}
            >
              <label htmlFor="name" className={styles.label}>{hasPassword ? 'كلمة المرور' : 'الاسم'}</label>
              <div className={styles.inputWrapper}>
                <input
                  type={hasPassword ? "password" : "text"}
                  id="name"
                  name="name"
                  className={styles.input}
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isFormDisabled}
                  required
                  placeholder={hasPassword ? "أدخل كلمة المرور" : "أدخل اسمك الكامل"}
                />
                <span className={styles.iconWrapper}>
                  {hasPassword ? <FaLock /> : <FaUser />}
                </span>
              </div>
            </motion.div>
          </>
        )}

        {loginType === 'teacher' && (
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
                disabled={isFormDisabled}
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
                  disabled={isFormDisabled}
                />
              </div>
            </motion.div>
          </>
        )}

        <motion.button 
          type="submit" 
          className={styles.submitButton}
          disabled={isFormDisabled}
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
          ) : blockedInfo && blockedInfo.blocked ? (
            <>
              <FaExclamationTriangle /> الحساب محظور مؤقتاً
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
              ? (hasPassword ? 'أدخل رقم القيد وكلمة المرور للدخول إلى حسابك' : 'أدخل رقم القيد واسمك الأول للدخول إلى حسابك')
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
            disabled={isFormDisabled}
          >
            دخول كمسؤول
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default Login;
