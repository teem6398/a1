import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '../../db';
import { sanitizeInput } from '../../../../../lib/auth';

export async function GET(request: NextRequest) {
  try {
    // الحصول على معرف الطالب من الاستعلام
    const url = new URL(request.url);
    const studentId = url.searchParams.get('id');
    
    if (!studentId) {
      return NextResponse.json(
        { error: 'معرف الطالب مطلوب' },
        { status: 400 }
      );
    }

    // تنظيف المدخلات
    const sanitizedStudentId = sanitizeInput(studentId);
    
    console.log('التحقق من وجود كلمة مرور للطالب:', sanitizedStudentId);

    // التحقق من وجود كلمة مرور للطالب
    const query = `
      SELECT 
        student_id,
        enrollment_number,
        password,
        CASE 
          WHEN password IS NOT NULL AND password != '' THEN 1
          ELSE 0
        END as has_password
      FROM 
        students
      WHERE 
        enrollment_number = ? OR student_id = ?
    `;

    const results = await executeQuery<any[]>({
      query,
      values: [sanitizedStudentId, sanitizedStudentId]
    });

    // إذا لم يتم العثور على الطالب
    if (!results || results.length === 0) {
      console.log('لم يتم العثور على الطالب:', sanitizedStudentId);
      return NextResponse.json(
        { hasPassword: false },
        { status: 200 }
      );
    }

    const hasPassword = results[0].has_password === 1;
    const passwordValue = results[0].password;
    console.log('نتيجة التحقق من وجود كلمة مرور:', {
      student_id: results[0].student_id,
      enrollment_number: results[0].enrollment_number,
      hasPassword: hasPassword,
      passwordExists: !!passwordValue,
      passwordLength: passwordValue ? passwordValue.length : 0
    });

    // إرجاع ما إذا كان الطالب لديه كلمة مرور
    return NextResponse.json(
      { 
        hasPassword: hasPassword,
        studentId: results[0].student_id,
        enrollmentNumber: results[0].enrollment_number
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('خطأ في التحقق من وجود كلمة مرور:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم، يرجى المحاولة لاحقاً' },
      { status: 500 }
    );
  }
} 