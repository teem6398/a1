'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// أنواع البيانات
interface User {
  id: string;
  name: string;
  role: 'admin' | 'editor' | 'teacher' | 'student';
  email?: string;
  studentId?: string;
  teacherId?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<LoginResult>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  hasPermission: (requiredRole: string | string[]) => boolean;
  csrfToken: string | null;
}

interface LoginCredentials {
  loginType: 'student' | 'teacher' | 'admin';
  studentId?: string;
  name?: string;
  phone?: string;
  password?: string;
}

interface LoginResult {
  success: boolean;
  error?: string;
  blocked?: boolean;
}

// إنشاء السياق
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// مزود السياق
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const router = useRouter();

  // التحقق من المصادقة عند تحميل الصفحة
  useEffect(() => {
    checkAuth();
  }, []);

  // التحقق من صحة المصادقة
  const checkAuth = async (): Promise<void> => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/auth/verify', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setCsrfToken(data.csrfToken);
      } else {
        // إذا فشل التحقق، امسح البيانات
        setUser(null);
        setCsrfToken(null);
        // مسح localStorage أيضاً
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        localStorage.removeItem('currentStudentId');
        localStorage.removeItem('teacherId');
      }
    } catch (error) {
      console.error('خطأ في التحقق من المصادقة:', error);
      setUser(null);
      setCsrfToken(null);
    } finally {
      setLoading(false);
    }
  };

  // تسجيل الدخول
  const login = async (credentials: LoginCredentials): Promise<LoginResult> => {
    try {
      setLoading(true);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUser(data.user);
        setCsrfToken(data.csrfToken);
        
        // تحديث localStorage للتوافق مع الكود الموجود
        localStorage.setItem('userRole', data.user.role);
        localStorage.setItem('userName', data.user.name);
        
        if (data.user.studentId) {
          localStorage.setItem('currentStudentId', data.user.studentId);
        }
        if (data.user.teacherId) {
          localStorage.setItem('teacherId', data.user.teacherId);
        }

        return { success: true };
      } else {
        return { 
          success: false, 
          error: data.error || 'فشل تسجيل الدخول',
          blocked: data.blocked 
        };
      }
    } catch (error) {
      console.error('خطأ في تسجيل الدخول:', error);
      return { 
        success: false, 
        error: 'حدث خطأ في الاتصال بالخادم' 
      };
    } finally {
      setLoading(false);
    }
  };

  // تسجيل الخروج
  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      
      await fetch('/api/auth/login', {
        method: 'DELETE',
        credentials: 'include',
      });

      // مسح البيانات
      setUser(null);
      setCsrfToken(null);
      
      // مسح localStorage
      localStorage.removeItem('userRole');
      localStorage.removeItem('userName');
      localStorage.removeItem('currentStudentId');
      localStorage.removeItem('teacherId');

      // توجيه المستخدم إلى صفحة تسجيل الدخول
      router.push('/auth');
    } catch (error) {
      console.error('خطأ في تسجيل الخروج:', error);
    } finally {
      setLoading(false);
    }
  };

  // التحقق من الصلاحيات
  const hasPermission = (requiredRole: string | string[]): boolean => {
    if (!user) return false;

    const roleHierarchy = {
      'admin': 4,
      'editor': 3,
      'teacher': 2,
      'student': 1
    };

    const userLevel = roleHierarchy[user.role] || 0;
    
    if (Array.isArray(requiredRole)) {
      return requiredRole.some(role => {
        const requiredLevel = roleHierarchy[role as keyof typeof roleHierarchy] || 0;
        return userLevel >= requiredLevel;
      });
    }
    
    const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;
    return userLevel >= requiredLevel;
  };

  // قيم السياق
  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    checkAuth,
    hasPermission,
    csrfToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook لاستخدام السياق
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth يجب أن يُستخدم داخل AuthProvider');
  }
  return context;
}

// مكون حماية الصفحات
interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string | string[];
  fallback?: ReactNode;
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  fallback 
}: ProtectedRouteProps) {
  const { user, loading, hasPermission } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  // إذا كان يتم التحميل
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // إذا لم يكن مسجل دخول
  if (!user) {
    return fallback || null;
  }

  // إذا كان هناك متطلب صلاحية ولا يملكها
  if (requiredRole && !hasPermission(requiredRole)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            غير مصرح لك بالوصول
          </h2>
          <p className="text-gray-600">
            ليس لديك الصلاحيات اللازمة للوصول إلى هذه الصفحة
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Hook للحصول على CSRF Token
export function useCSRF() {
  const { csrfToken } = useAuth();
  
  const getCSRFHeaders = () => {
    if (!csrfToken) return {};
    
    return {
      'X-CSRF-Token': csrfToken
    };
  };

  return { csrfToken, getCSRFHeaders };
} 