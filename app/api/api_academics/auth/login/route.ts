import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '../../db';
import { generateToken, recordFailedLogin, getLoginStatus, clearFailedAttempts, formatBlockedTime, sanitizeInput } from '../../../../../lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentId, name, isPasswordLogin } = body;

    console.log('محاولة تسجيل دخول:', { studentId, name, isPasswordLogin });

    // تنظيف المدخلات
    const sanitizedStudentId = sanitizeInput(studentId);
    const sanitizedName = sanitizeInput(name);

    // التحقق من المدخلات
    if (!sanitizedStudentId) {
      return NextResponse.json(
        { error: 'يرجى إدخال رقم القيد أو كلمة المرور' },
        { status: 400 }
      );
    }

    // التحقق من حالة الحظر قبل محاولة تسجيل الدخول
    const loginIdentifier = `student-${sanitizedStudentId}`;
    const loginStatus = getLoginStatus(loginIdentifier);

    // إذا كان المستخدم محظوراً، أرجع رسالة خطأ مع معلومات الحظر
    if (loginStatus.blocked) {
      const remainingTime = formatBlockedTime(loginStatus.blockedUntil);
      return NextResponse.json(
        { 
          error: 'تم حظر الحساب مؤقتاً بسبب محاولات تسجيل دخول متكررة',
          blocked: true,
          blockedUntil: loginStatus.blockedUntil,
          remainingTime
        },
        { status: 429 } // Too Many Requests
      );
    }

    // إذا كان المستخدم يستخدم تسجيل الدخول بكلمة المرور أو تم اكتشاف أن لديه كلمة مرور
    if (isPasswordLogin) {
      console.log('تسجيل دخول باستخدام كلمة المرور');
      
      // الاستعلام للتحقق من كلمة المرور
      const passwordQuery = `
        SELECT 
          s.student_id, 
          s.enrollment_number,
          s.first_name_ar as name,
          s.password,
          s.photo_url
        FROM 
          students s
        WHERE 
          (s.enrollment_number = ? OR s.student_id = ?) 
      `;
      
      const students = await executeQuery<any[]>({
        query: passwordQuery,
        values: [sanitizedStudentId, sanitizedStudentId]
      });
      
      if (!students || students.length === 0) {
        // تسجيل محاولة فاشلة
        const failedResult = recordFailedLogin(loginIdentifier);
        
        return NextResponse.json(
          { 
            error: 'رقم القيد غير صحيح',
            blocked: failedResult.blocked,
            blockedUntil: failedResult.blockedUntil,
            remainingAttempts: failedResult.remainingAttempts,
            remainingTime: failedResult.blockedUntil ? formatBlockedTime(failedResult.blockedUntil) : undefined
          },
          { status: 401 }
        );
      }
      
      const student = students[0];
      
      // التحقق من كلمة المرور
      if (!student.password) {
        // إذا لم يكن للطالب كلمة مرور، فلا يمكن استخدام هذه الطريقة
        return NextResponse.json(
          { error: 'لم يتم تعيين كلمة مرور لهذا الحساب بعد' },
          { status: 401 }
        );
      }
      
      const isPasswordValid = await bcrypt.compare(sanitizedName, student.password);
      
      if (!isPasswordValid) {
        // تسجيل محاولة فاشلة
        const failedResult = recordFailedLogin(loginIdentifier);
        
        return NextResponse.json(
          { 
            error: 'كلمة المرور غير صحيحة',
            blocked: failedResult.blocked,
            blockedUntil: failedResult.blockedUntil,
            remainingAttempts: failedResult.remainingAttempts,
            remainingTime: failedResult.blockedUntil ? formatBlockedTime(failedResult.blockedUntil) : undefined
          },
          { status: 401 }
        );
      }
      
      // مسح محاولات تسجيل الدخول الفاشلة عند النجاح
      clearFailedAttempts(loginIdentifier);
      
      // إرجاع معلومات الطالب
      return NextResponse.json({
        success: true,
        message: 'تم تسجيل الدخول بنجاح',
        studentId: student.student_id,
        name: student.name,
        userImage: student.photo_url || null,
        role: 'student'
      });
    } else {
      // تسجيل الدخول التقليدي (بالاسم ورقم القيد)
      console.log('تسجيل دخول تقليدي');
      
      // الاستعلام للتحقق من بيانات الطالب
      const studentQuery = `
        SELECT 
          s.student_id, 
          s.enrollment_number,
          s.first_name_ar as name,
          s.photo_url
        FROM 
          students s
        WHERE 
          (s.enrollment_number = ? OR s.student_id = ?) AND s.first_name_ar LIKE ?
      `;
      
      const students = await executeQuery<any[]>({
        query: studentQuery,
        values: [sanitizedStudentId, sanitizedStudentId, `%${sanitizedName}%`]
      });
      
      if (!students || students.length === 0) {
        // تسجيل محاولة فاشلة
        const failedResult = recordFailedLogin(loginIdentifier);
        
        return NextResponse.json(
          { 
            error: 'رقم القيد أو الاسم غير صحيح',
            blocked: failedResult.blocked,
            blockedUntil: failedResult.blockedUntil,
            remainingAttempts: failedResult.remainingAttempts,
            remainingTime: failedResult.blockedUntil ? formatBlockedTime(failedResult.blockedUntil) : undefined
          },
          { status: 401 }
        );
      }
      
      // مسح محاولات تسجيل الدخول الفاشلة عند النجاح
      clearFailedAttempts(loginIdentifier);
      
      // إرجاع معلومات الطالب
      const student = students[0];
      return NextResponse.json({
        success: true,
        message: 'تم تسجيل الدخول بنجاح',
        studentId: student.student_id,
        name: student.name,
        userImage: student.photo_url || null,
        role: 'student'
      });
    }
  } catch (error) {
    console.error('خطأ في المصادقة:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}
