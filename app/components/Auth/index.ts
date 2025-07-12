// مكونات المصادقة والأمان
export { default as SecureLogin } from './SecureLogin';
export { default as ProtectedRoute, AdminProtectedRoute, TeacherProtectedRoute, StudentProtectedRoute } from './ProtectedRoute';
export { default as SessionManager } from './SessionManager';
export { default as SecurityProvider } from './SecurityProvider';

// Context المصادقة
export { AuthProvider, useAuth, ProtectedRoute as AuthProtectedRoute, useCSRF } from '../../lib/auth-context';

// نحتاج إلى إعادة تعريف الأنواع هنا لأنها تعريفات داخلية في auth-context
export interface User {
  id: string;
  name: string;
  role: 'admin' | 'editor' | 'teacher' | 'student';
  email?: string;
  studentId?: string;
  teacherId?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<LoginResult>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  hasPermission: (requiredRole: string | string[]) => boolean;
  csrfToken: string | null;
}

export interface LoginCredentials {
  loginType: 'student' | 'teacher' | 'admin';
  studentId?: string;
  name?: string;
  phone?: string;
  password?: string;
}

export interface LoginResult {
  success: boolean;
  error?: string;
  blocked?: boolean;
} 