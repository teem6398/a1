'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShieldAlt, FaSpinner, FaExclamationTriangle, FaLock } from 'react-icons/fa';
import { useAuth } from '../../lib/auth-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  fallbackPath?: string;
  showLoading?: boolean;
  customUnauthorizedComponent?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles = [],
  fallbackPath = '/login',
  showLoading = true,
  customUnauthorizedComponent
}) => {
  const { user, isAuthenticated, hasPermission, checkAuth } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        setIsChecking(true);
        setAuthError(null);
        
        // التحقق من المصادقة
        if (!isAuthenticated) {
          setAuthError('يجب عليك تسجيل الدخول أولاً');
          setTimeout(() => {
            router.push(fallbackPath);
          }, 2000);
          return;
        }

        // التحقق من الصلاحيات
        if (requiredRoles.length > 0 && !hasPermission(requiredRoles)) {
          setAuthError('ليس لديك صلاحية للوصول إلى هذه الصفحة');
          setTimeout(() => {
            router.push(fallbackPath);
          }, 2000);
          return;
        }

      } catch (error: any) {
        console.error('خطأ في التحقق من المصادقة:', error);
        setAuthError(error.message || 'حدث خطأ في التحقق من الهوية');
        setTimeout(() => {
          router.push(fallbackPath);
        }, 2000);
      } finally {
        setIsChecking(false);
      }
    };

    verifyAuth();
  }, [isAuthenticated, hasPermission, requiredRoles, router, fallbackPath]);

  // مكون التحميل
  const LoadingComponent = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100"
    >
      <div className="text-center p-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="inline-block mb-4"
        >
          <FaShieldAlt className="text-4xl text-indigo-600" />
        </motion.div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          جاري التحقق من الهوية...
        </h2>
        <p className="text-gray-600">
          يرجى الانتظار بينما نتحقق من صلاحياتك
        </p>
        <motion.div
          className="flex justify-center mt-4"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        >
          <FaSpinner className="text-2xl text-indigo-500 animate-spin" />
        </motion.div>
      </div>
    </motion.div>
  );

  // مكون الخطأ
  const ErrorComponent = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100"
    >
      <div className="text-center p-8 max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-block mb-4"
        >
          <FaExclamationTriangle className="text-5xl text-red-500" />
        </motion.div>
        <h2 className="text-2xl font-bold text-red-800 mb-4">
          غير مصرح بالوصول
        </h2>
        <p className="text-red-600 mb-6 leading-relaxed">
          {authError}
        </p>
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-center space-x-2 text-sm text-red-500">
            <FaLock />
            <span>سيتم تحويلك إلى صفحة تسجيل الدخول...</span>
          </div>
          <motion.div
            className="w-full bg-red-200 rounded-full h-2"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
          >
            <motion.div
              className="bg-red-500 h-2 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "linear" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );

  // عرض مكون التحميل أثناء التحقق
  if (isChecking && showLoading) {
    return <LoadingComponent />;
  }

  // عرض مكون الخطأ في حالة وجود خطأ
  if (authError) {
    return customUnauthorizedComponent || <ErrorComponent />;
  }

  // عرض المحتوى المحمي إذا كان المستخدم مصرح له
  if (isAuthenticated && (requiredRoles.length === 0 || hasPermission(requiredRoles))) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    );
  }

  // في حالة عدم المصادقة، عرض مكون غير مصرح
  return customUnauthorizedComponent || <ErrorComponent />;
};

export default ProtectedRoute;

// مكون مساعد لحماية الصفحات الإدارية
export const AdminProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredRoles={['admin']}>
    {children}
  </ProtectedRoute>
);

// مكون مساعد لحماية صفحات المعلمين
export const TeacherProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredRoles={['teacher', 'admin']}>
    {children}
  </ProtectedRoute>
);

// مكون مساعد لحماية صفحات الطلاب
export const StudentProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredRoles={['student', 'teacher', 'admin']}>
    {children}
  </ProtectedRoute>
); 