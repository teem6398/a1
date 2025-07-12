import { NextRequest, NextResponse } from 'next/server';
import { 
  generateToken, 
  sanitizeInput, 
  recordFailedLogin, 
  isBlocked, 
  clearFailedAttempts,
  generateCSRFToken 
} from '../../../../lib/auth';
import { executeQuery } from '../../api_academics/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { loginType, studentId, name, phone, password } = body;
    
    // التحقق من الحقول المطلوبة
    if (!loginType) {
      return NextResponse.json(
        { error: 'نوع تسجيل الدخول مطلوب' },
        { status: 400 }
      );
    }

    // تنظيف المدخلات
    const cleanStudentId = studentId ? sanitizeInput(studentId) : '';
    const cleanName = name ? sanitizeInput(name) : '';
    const cleanPhone = phone ? sanitizeInput(phone) : '';
    
    // التحقق من محاولات تسجيل الدخول الفاشلة
    const identifier = cleanStudentId || cleanPhone || cleanName;
    if (isBlocked(identifier)) {
      return NextResponse.json(
        { error: 'تم حظر هذا الحساب مؤقتاً بسبب محاولات تسجيل دخول فاشلة متكررة. يرجى المحاولة بعد 15 دقيقة.' },
        { status: 429 }
      );
    }

    let user = null;
    let authQuery = '';
    let queryParams: any[] = [];

    // تحديد نوع المصادقة
    if (loginType === 'student') {
      if (!cleanStudentId || !cleanName) {
        return NextResponse.json(
          { error: 'رقم القيد والاسم مطلوبان' },
          { status: 400 }
        );
      }

      authQuery = `
        SELECT 
          s.student_id as id,
          s.enrollment_number as studentId,
          s.first_name_ar as name,
          s.email,
          'student' as role
        FROM students s
        WHERE s.enrollment_number = ? AND s.first_name_ar LIKE ?
      `;
      queryParams = [cleanStudentId, `%${cleanName}%`];

    } else if (loginType === 'teacher') {
      if (!cleanName || !cleanPhone) {
        return NextResponse.json(
          { error: 'الاسم ورقم الهاتف مطلوبان' },
          { status: 400 }
        );
      }

      authQuery = `
        SELECT 
          t.teacher_id as id,
          t.teacher_id as teacherId,
          t.name_ar as name,
          t.email,
          t.phone,
          'teacher' as role
        FROM teachers t
        WHERE t.name_ar LIKE ? AND t.phone = ?
      `;
      queryParams = [`%${cleanName}%`, cleanPhone];

    } else if (loginType === 'admin') {
      // المصادقة الخاصة بالمدير (يمكن تحسينها لاحقاً)
      if (cleanStudentId === 'admin' && cleanName === 'admin123') {
        user = {
          id: 'admin-1',
          name: 'أحمد المدير',
          role: 'admin' as const,
          email: 'admin@alryada.edu'
        };
      }
    }

    // تنفيذ الاستعلام للطلاب والمعلمين
    if (authQuery && !user) {
      const results = await executeQuery<any[]>({
        query: authQuery,
        values: queryParams
      });

      if (!results || results.length === 0) {
        // تسجيل محاولة فاشلة
        const blocked = recordFailedLogin(identifier);
        
        return NextResponse.json(
          { 
            error: loginType === 'student' 
              ? 'رقم القيد أو الاسم غير صحيح' 
              : 'الاسم أو رقم الهاتف غير صحيح',
            blocked: blocked
          },
          { status: 401 }
        );
      }

      user = results[0];
    }

    // التحقق من وجود المستخدم
    if (!user) {
      const blocked = recordFailedLogin(identifier);
      return NextResponse.json(
        { 
          error: 'بيانات تسجيل الدخول غير صحيحة',
          blocked: blocked
        },
        { status: 401 }
      );
    }

    // مسح محاولات تسجيل الدخول الفاشلة عند النجاح
    clearFailedAttempts(identifier);

    // إنشاء JWT Token
    const token = generateToken(user);
    
    // إنشاء CSRF Token
    const csrfToken = generateCSRFToken();

    // إنشاء الاستجابة
    const response = NextResponse.json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
        studentId: user.studentId,
        teacherId: user.teacherId
      },
      csrfToken
    });

    // تعيين التوكن في الكوكيز (آمن)
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 ساعة
      path: '/'
    });

    // تعيين CSRF token في الكوكيز
    response.cookies.set('csrf-token', csrfToken, {
      httpOnly: false, // يحتاج للوصول من JavaScript
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // ساعة واحدة
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('خطأ في المصادقة:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم، يرجى المحاولة لاحقاً' },
      { status: 500 }
    );
  }
}

// API للخروج من النظام
export async function DELETE(request: NextRequest) {
  try {
    const response = NextResponse.json({
      success: true,
      message: 'تم تسجيل الخروج بنجاح'
    });

    // مسح الكوكيز
    response.cookies.delete('auth-token');
    response.cookies.delete('csrf-token');

    return response;
  } catch (error) {
    console.error('خطأ في تسجيل الخروج:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تسجيل الخروج' },
      { status: 500 }
    );
  }
} 