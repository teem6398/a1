import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromRequest, generateCSRFToken } from '../../../../lib/auth';

export async function GET(request: NextRequest) {
  try {
    // استخراج التوكن من الطلب
    const token = extractTokenFromRequest(request);
    
    if (!token) {
      return NextResponse.json(
        { error: 'لم يتم العثور على رمز المصادقة' },
        { status: 401 }
      );
    }

    // التحقق من صحة التوكن
    const payload = verifyToken(token);
    
    if (!payload) {
      return NextResponse.json(
        { error: 'رمز المصادقة غير صالح' },
        { status: 401 }
      );
    }

    // إنشاء CSRF token جديد
    const csrfToken = generateCSRFToken();

    // إرجاع معلومات المستخدم
    const response = NextResponse.json({
      success: true,
      user: {
        id: payload.userId,
        name: payload.name,
        role: payload.role,
        email: payload.email
      },
      csrfToken
    });

    // تحديث CSRF token في الكوكيز
    response.cookies.set('csrf-token', csrfToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // ساعة واحدة
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('خطأ في التحقق من التوكن:', error);
    
    // إذا كان التوكن منتهي الصلاحية
    if (error instanceof Error && error.message.includes('انتهت صلاحية')) {
      return NextResponse.json(
        { error: 'انتهت صلاحية جلسة المستخدم، يرجى تسجيل الدخول مرة أخرى' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'خطأ في التحقق من المصادقة' },
      { status: 401 }
    );
  }
} 