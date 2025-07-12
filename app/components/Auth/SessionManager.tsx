'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShieldAlt, FaClock, FaSignOutAlt, FaRedo } from 'react-icons/fa';
import { useAuth } from '../../lib/auth-context';

interface SessionManagerProps {
  children: React.ReactNode;
  sessionTimeout?: number; // بالدقائق
  warningTime?: number; // بالدقائق قبل انتهاء الجلسة
  checkInterval?: number; // بالثواني
}

const SessionManager: React.FC<SessionManagerProps> = ({
  children,
  sessionTimeout = 30, // 30 دقيقة افتراضياً
  warningTime = 5, // 5 دقائق تحذير
  checkInterval = 60 // فحص كل دقيقة
}) => {
  const { user, logout } = useAuth();
  const [lastActivity, setLastActivity] = useState<number>(Date.now());
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isExtending, setIsExtending] = useState(false);
  
  const sessionTimeoutRef = useRef<number>();
  const warningTimeoutRef = useRef<number>();
  const intervalRef = useRef<number>();

  // تحديث وقت آخر نشاط
  const updateActivity = useCallback(() => {
    setLastActivity(Date.now());
    setShowWarning(false);
  }, []);

  // مراقبة نشاط المستخدم
  const setupActivityListeners = useCallback(() => {
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click'
    ];

    const throttledUpdate = throttle(updateActivity, 1000);

    events.forEach(event => {
      document.addEventListener(event, throttledUpdate, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, throttledUpdate, true);
      });
    };
  }, [updateActivity]);

  // تمديد الجلسة
  const extendSession = async () => {
    try {
      setIsExtending(true);
      // تحديث وقت النشاط لتمديد الجلسة
      updateActivity();
      setShowWarning(false);
    } catch (error) {
      console.error('فشل في تمديد الجلسة:', error);
    } finally {
      setIsExtending(false);
    }
  };

  // تسجيل الخروج التلقائي
  const autoLogout = useCallback(async () => {
    try {
      await logout();
    } catch (error) {
      console.error('فشل في تسجيل الخروج التلقائي:', error);
    }
  }, [logout]);

  // إعداد مؤقتات الجلسة
  const setupSessionTimers = useCallback(() => {
    // مسح المؤقتات السابقة
    if (sessionTimeoutRef.current) clearTimeout(sessionTimeoutRef.current);
    if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);

    const sessionTimeoutMs = sessionTimeout * 60 * 1000;
    const warningTimeMs = warningTime * 60 * 1000;

    // مؤقت التحذير
    warningTimeoutRef.current = window.setTimeout(() => {
      setShowWarning(true);
      setTimeLeft(warningTime * 60);
    }, sessionTimeoutMs - warningTimeMs);

    // مؤقت تسجيل الخروج
    sessionTimeoutRef.current = window.setTimeout(() => {
      autoLogout();
    }, sessionTimeoutMs);

  }, [sessionTimeout, warningTime, autoLogout]);

  // فحص الجلسة دورياً
  useEffect(() => {
    if (!user) return;

    const checkSession = () => {
      const now = Date.now();
      const timeSinceActivity = now - lastActivity;
      const sessionTimeoutMs = sessionTimeout * 60 * 1000;
      const warningTimeMs = warningTime * 60 * 1000;

      if (timeSinceActivity >= sessionTimeoutMs) {
        autoLogout();
      } else if (timeSinceActivity >= sessionTimeoutMs - warningTimeMs) {
        if (!showWarning) {
          setShowWarning(true);
          const remaining = Math.ceil((sessionTimeoutMs - timeSinceActivity) / 1000);
          setTimeLeft(remaining);
        } else {
          const remaining = Math.ceil((sessionTimeoutMs - timeSinceActivity) / 1000);
          setTimeLeft(Math.max(0, remaining));
        }
      }
    };

    intervalRef.current = window.setInterval(checkSession, checkInterval * 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [user, lastActivity, sessionTimeout, warningTime, checkInterval, showWarning, autoLogout]);

  // إعداد مراقبة النشاط
  useEffect(() => {
    if (!user) return;

    const cleanup = setupActivityListeners();
    setupSessionTimers();

    return () => {
      cleanup();
      if (sessionTimeoutRef.current) clearTimeout(sessionTimeoutRef.current);
      if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
    };
  }, [user, setupActivityListeners, setupSessionTimers]);

  // تحديث المؤقتات عند تغيير النشاط
  useEffect(() => {
    if (user && lastActivity) {
      setupSessionTimers();
    }
  }, [lastActivity, setupSessionTimers, user]);

  // تنسيق الوقت المتبقي
  const formatTimeLeft = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!user) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-orange-200"
            >
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block mb-4"
                >
                  <FaClock className="text-4xl text-orange-500" />
                </motion.div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  تحذير انتهاء الجلسة
                </h3>
                
                <p className="text-gray-600 mb-4">
                  ستنتهي جلستك خلال:
                </p>
                
                <motion.div
                  key={timeLeft}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-3xl font-bold text-orange-600 mb-6"
                >
                  {formatTimeLeft(timeLeft)}
                </motion.div>
                
                <p className="text-sm text-gray-500 mb-6">
                  سيتم تسجيل خروجك تلقائياً لحماية حسابك
                </p>
                
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={extendSession}
                    disabled={isExtending}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isExtending ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <FaRedo className="text-sm" />
                        </motion.div>
                        جاري التمديد...
                      </>
                    ) : (
                      <>
                        <FaShieldAlt />
                        تمديد الجلسة
                      </>
                    )}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={autoLogout}
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <FaSignOutAlt />
                    تسجيل الخروج
                  </motion.button>
                </div>
                
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                  <FaShieldAlt />
                  <span>نظام الحماية الآمن</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// دالة مساعدة للتحكم في معدل الاستدعاء
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

export default SessionManager; 