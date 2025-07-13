import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '../../db';
import { sanitizeInput, recordFailedLogin, clearFailedAttempts, getLoginStatus, generateToken } from '../../../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone } = body;
    
    // تعريف معرف المستخدم لتتبع محاولات تسجيل الدخول
    const loginIdentifier = `teacher-${phone}`;
    
    // التحقق من حالة الحظر قبل محاولة تسجيل الدخول
    const loginStatus = getLoginStatus(loginIdentifier);
    if (loginStatus.blocked) {
      return NextResponse.json({
        error: 'تم حظر الحساب مؤقتاً بسبب محاولات تسجيل دخول متكررة',
        blocked: true,
        blockedUntil: loginStatus.blockedUntil,
        remainingTime: loginStatus.blockedUntil ? new Date(loginStatus.blockedUntil.getTime() - new Date().getTime()).toISOString() : undefined,
        blockCount: loginStatus.blockCount
      }, { status: 429 });
    }

    // التحقق من توفر البيانات المطلوبة
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'يرجى إدخال الاسم ورقم الهاتف' },
        { status: 400 }
      );
    }
    
    // تعقيم المدخلات
    const sanitizedName = sanitizeInput(name);
    const sanitizedPhone = sanitizeInput(phone);
    
    // التحقق من صحة رقم الهاتف (مثال بسيط)
    if (!/^\d{9,15}$/.test(sanitizedPhone)) {
      return NextResponse.json(
        { error: 'رقم الهاتف غير صالح' },
        { status: 400 }
      );
    }

    // الاستعلام عن قاعدة البيانات للتحقق من بيانات المعلم
    const query = `
      SELECT 
        t.teacher_id, 
        t.name_ar as name,
        t.name_en,
        t.phone,
        t.email,
        t.gender,
        t.hire_date,
        t.degree AS academic_degree,
        t.department_name AS department,
        t.image_path AS photo_url,
        c.college_name_ar AS college
      FROM 
        teachers t
        LEFT JOIN colleges c ON t.college_id = c.college_id
      WHERE 
        t.name_ar LIKE ? AND t.phone = ?
    `;

    const teachers = await executeQuery<any[]>({
      query,
      values: [`%${sanitizedName}%`, sanitizedPhone]
    });

    // إذا لم يتم العثور على معلم بهذه البيانات
    if (!teachers || teachers.length === 0) {
      // تسجيل محاولة تسجيل دخول فاشلة
      const failedStatus = recordFailedLogin(loginIdentifier);
      
      return NextResponse.json({
        error: 'الاسم أو رقم الهاتف غير صحيح',
        blocked: failedStatus.blocked,
        remainingAttempts: failedStatus.remainingAttempts,
        blockedUntil: failedStatus.blockedUntil,
        remainingTime: failedStatus.blockedUntil ? new Date(failedStatus.blockedUntil.getTime() - new Date().getTime()).toISOString() : undefined,
      }, { status: 401 });
    }

    // تم العثور على المعلم، إرجاع المعلومات الأساسية
    const teacher = teachers[0];
    
    // مسح محاولات تسجيل الدخول الفاشلة
    clearFailedAttempts(loginIdentifier);
    
    // إنشاء JWT token
    const token = generateToken({
      id: teacher.teacher_id,
      name: teacher.name,
      role: 'teacher',
      email: teacher.email,
      teacherId: teacher.teacher_id
    });
    
    // تسجيل محاولة تسجيل الدخول الناجحة (يمكن إضافة سجل في قاعدة البيانات)
    console.log(`تسجيل دخول ناجح للمعلم: ${teacher.name} (${teacher.teacher_id})`);
    
    // إعداد الاستجابة مع تعيين الكوكي
    const response = NextResponse.json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      teacherId: teacher.teacher_id,
      name: teacher.name,
      email: teacher.email,
      userImage: teacher.photo_url || null,
      academic_degree: teacher.academic_degree,
      department: teacher.department,
      college: teacher.college,
      role: 'teacher'
    });
    
    // تعيين كوكي JWT (httpOnly للأمان)
    response.cookies.set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 ساعة
      path: '/'
    });
    
    return response;
  } catch (error) {
    console.error('خطأ في المصادقة:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}