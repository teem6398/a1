'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaSignInAlt, FaUniversity, FaSpinner, FaExclamationTriangle, FaInfoCircle, FaChalkboardTeacher, FaPhone } from 'react-icons/fa';
import styles from './Auth.module.css';
import { getLoginStatus, formatBlockedTime } from '../../../lib/auth';

// تعريف واجهة حالة الحظر
interface BlockedInfo {
  blocked: boolean;
  blockedUntil?: string;
  remainingTime?: string;
  remainingAttempts?: number;
  blockCount?: number;
}

const TeacherLogin: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [blockedInfo, setBlockedInfo] = useState<BlockedInfo | null>(null);
  const [captchaCode, setCaptchaCode] = useState<string>('');
  const [userCaptcha, setUserCaptcha] = useState<string>('');
  const [captchaError, setCaptchaError] = useState<boolean>(false);
  const [showCaptcha, setShowCaptcha] = useState<boolean>(false);

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

  // توليد رمز Captcha عشوائي
  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  };
  
  // إعادة توليد رمز Captcha
  const refreshCaptcha = () => {
    setCaptchaCode(generateCaptcha());
    setUserCaptcha('');
    setCaptchaError(false);
  };
  
  // تحديد ما إذا كان النموذج معطلاً
  const isFormDisabled = loading || success || (blockedInfo?.blocked === true);

  // توليد رمز Captcha عند تحميل الصفحة
  useEffect(() => {
    refreshCaptcha();
  }, []);
  
  // التحقق من حالة الحظر عند تحميل الصفحة
  useEffect(() => {
    if (formData.phone) {
      const loginIdentifier = `teacher-${formData.phone}`;
      const status = getLoginStatus(loginIdentifier);
      
      if (status.blocked) {
        setBlockedInfo({
          blocked: true,
          blockedUntil: status.blockedUntil?.toISOString(),
          remainingTime: formatBlockedTime(status.blockedUntil),
          remainingAttempts: 0,
          blockCount: status.blockCount
        });
      } else if (status.remainingAttempts < 5) {
        setBlockedInfo({
          blocked: false,
          remainingAttempts: status.remainingAttempts,
          blockCount: status.blockCount
        });
        
        // عرض Captcha بعد محاولتين فاشلتين
        if (status.remainingAttempts <= 3) {
          setShowCaptcha(true);
        }
      }
    }
  }, [formData.phone]);

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
    
    // معالجة خاصة لحقل captcha
    if (name === 'captcha') {
      setUserCaptcha(value);
      if (captchaError) setCaptchaError(false);
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // إزالة رسالة الخطأ عند الكتابة
    if (error) setError('');
    
    // إذا كان المستخدم يغير رقم الهاتف، تحقق من حالة الحظر
    if (name === 'phone' && value) {
      const loginIdentifier = `teacher-${value}`;
      const status = getLoginStatus(loginIdentifier);
      
      if (status.blocked) {
        setBlockedInfo({
          blocked: true,
          blockedUntil: status.blockedUntil?.toISOString(),
          remainingTime: formatBlockedTime(status.blockedUntil),
          remainingAttempts: 0,
          blockCount: status.blockCount
        });
      } else if (status.remainingAttempts < 5) {
        setBlockedInfo({
          blocked: false,
          remainingAttempts: status.remainingAttempts,
          blockCount: status.blockCount
        });
        
        // عرض Captcha بعد محاولتين فاشلتين
        if (status.remainingAttempts <= 3) {
          setShowCaptcha(true);
        }
      } else {
        setBlockedInfo(null);
      }
    }
  };

  // إنشاء CSRF Token
  const generateCSRFToken = () => {
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('csrf_token', token);
    return token;
  };
  
  // تعقيم المدخلات قبل الإرسال
  const sanitizeInputs = (inputs: { [key: string]: string }) => {
    const sanitized: { [key: string]: string } = {};
    
    Object.keys(inputs).forEach(key => {
      let value = inputs[key];
      // تنظيف المدخلات من الأكواد الضارة
      value = value.trim().replace(/[<>\"'%;()&+]/g, '');
      sanitized[key] = value;
    });
    
    return sanitized;
  };
  
  // التحقق من صحة رقم الهاتف
  const validatePhone = (phone: string): boolean => {
    // تحقق بسيط من رقم الهاتف - يقبل 9 أرقام أو أكثر
    return /^\d{9}$/.test(phone);
  };
  
  // التحقق من صحة الاسم
  const validateName = (name: string): boolean => {
    // تأكد من أن الاسم يحتوي على حروف فقط ويكون بطول مناسب
    return name.length >= 3 && /^[\u0600-\u06FF\s]+$/.test(name); // للحروف العربية
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBlockedInfo(null);
    setCaptchaError(false);
    
    // التحقق من صحة المدخلات
    if (!validateName(formData.name)) {
      setError('الاسم يجب أن يحتوي على حروف عربية فقط وبطول لا يقل عن 3 أحرف');
      return;
    }
    
    if (!validatePhone(formData.phone)) {
      setError('رقم الهاتف غير صالح، يجب أن يحتوي على أرقام فقط (9 أرقم)');
      return;
    }
    
    // التحقق من captcha إذا كان مطلوباً
    if (showCaptcha && userCaptcha !== captchaCode) {
      setCaptchaError(true);
      setError('رمز التحقق غير صحيح، يرجى المحاولة مرة أخرى');
      refreshCaptcha();
      return;
    }
    
    setLoading(true);

    try {
      // تعقيم المدخلات
      const sanitizedInputs = sanitizeInputs(formData);
      
      // إنشاء CSRF Token
      const csrfToken = generateCSRFToken();
      
      // تسجيل محاولة تسجيل الدخول في localStorage للتتبع
      const loginAttempts = JSON.parse(localStorage.getItem('teacher_login_attempts') || '[]');
      loginAttempts.push({
        timestamp: new Date().toISOString(),
        name: sanitizedInputs.name,
        phone: sanitizedInputs.phone.substring(0, 4) + '****' + sanitizedInputs.phone.slice(-2) // إخفاء جزء من رقم الهاتف للخصوصية
      });
      
      // الاحتفاظ بآخر 10 محاولات فقط
      if (loginAttempts.length > 10) {
        loginAttempts.shift();
      }
      
      localStorage.setItem('teacher_login_attempts', JSON.stringify(loginAttempts));
      
      // استخدام API للتحقق من بيانات المعلم
      console.log('محاولة تسجيل الدخول كأستاذ');

      const response = await fetch('/api/api_academics/auth/teacher-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify({
          name: sanitizedInputs.name,
          phone: sanitizedInputs.phone
        }),
        credentials: 'include' // للسماح بإرسال واستقبال الكوكيز
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // تخزين معلومات المعلم في localStorage
        localStorage.setItem('userRole', 'teacher');
        localStorage.setItem('userName', data.name);
        localStorage.setItem('teacherId', data.teacherId);
        
        // تخزين صورة المعلم إذا كانت متوفرة
        if (data.userImage) {
          localStorage.setItem('userImage', data.userImage);
        }
        
        // تخزين وقت تسجيل الدخول الناجح
        localStorage.setItem('teacher_last_successful_login', new Date().toISOString());

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

        // التعامل مع معلومات الحظر إذا كانت موجودة
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
    } catch (err: any) {
      console.error('خطأ في تسجيل الدخول:', err);
      setError('حدث خطأ أثناء الاتصال بالخادم، يرجى المحاولة مرة أخرى');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className={styles.loginContainer}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
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
      
      <motion.div className={styles.formHeader} variants={itemVariants}>
        <h1 className={styles.title}>
          <FaUniversity />
          تسجيل دخول الأستاذ
        </h1>
        <p className={styles.subtitle}>أدخل بياناتك للوصول إلى حسابك</p>
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
                مدة الحظر تزداد مع كل محاولة فاشلة متكررة وقد تصل إلى أسبوع كامل.
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
          className={styles.loginHelp}
          variants={itemVariants}
        >
          <p>
            أدخل اسمك ورقم هاتفك للدخول إلى حسابك
          </p>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default TeacherLogin; 