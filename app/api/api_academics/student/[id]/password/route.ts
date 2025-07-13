import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'; // استخدام bcryptjs بدلاً من bcrypt
import { executeQuery } from '../../../db';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { password } = await request.json();
    const studentId = params.id;

    // التحقق من وجود كلمة المرور
    if (!password || password.length < 8) {
      return NextResponse.json(
        { error: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' },
        { status: 400 }
      );
    }

    console.log('تحديث كلمة المرور للطالب:', studentId);

    // التحقق من وجود الطالب - البحث بواسطة student_id أو enrollment_number
    const students = await executeQuery<any[]>({ 
      query: 'SELECT student_id, enrollment_number, password FROM students WHERE student_id = ? OR enrollment_number = ?',
      values: [studentId, studentId]
    });

    if (!students || students.length === 0) {
      console.log('لم يتم العثور على الطالب:', studentId);
      return NextResponse.json(
        { error: 'الطالب غير موجود' },
        { status: 404 }
      );
    }

    const student = students[0];
    console.log('تم العثور على الطالب:', {
      student_id: student.student_id,
      enrollment_number: student.enrollment_number,
      hasPassword: !!student.password,
      passwordLength: student.password ? student.password.length : 0
    });

    // تشفير كلمة المرور
    console.log('تشفير كلمة المرور الجديدة');
    console.log('كلمة المرور المدخلة (مخفية):', '*'.repeat(password.length));
    
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('تم تشفير كلمة المرور للطالب:', student.student_id);
    console.log('كلمة المرور المشفرة (جزئياً):', hashedPassword.substring(0, 10) + '...');

    // تحديث كلمة المرور
    const updateResult = await executeQuery<any>({ 
      query: 'UPDATE students SET password = ? WHERE student_id = ?',
      values: [hashedPassword, student.student_id]
    });

    console.log('نتيجة التحديث:', {
      affectedRows: (updateResult as any).affectedRows,
      changedRows: (updateResult as any).changedRows
    });

    // التحقق من نجاح التحديث
    if (!updateResult || (updateResult as any).affectedRows === 0) {
      throw new Error('فشل في تحديث كلمة المرور');
    }

    // تسجيل محاولة تغيير كلمة المرور
    try {
      await executeQuery({
        query: 'INSERT INTO student_login_attempts (student_id, success, ip_address) VALUES (?, TRUE, ?)',
        values: [student.student_id, request.headers.get('x-forwarded-for') || 'unknown']
      });
    } catch (error) {
      // إذا فشل تسجيل المحاولة، لا نريد أن نفشل العملية بأكملها
      console.warn('فشل في تسجيل محاولة تغيير كلمة المرور:', error);
    }

    // التحقق من كلمة المرور المشفرة بعد التحديث
    const updatedStudents = await executeQuery<any[]>({ 
      query: 'SELECT password FROM students WHERE student_id = ?',
      values: [student.student_id]
    });

    if (updatedStudents && updatedStudents.length > 0) {
      const updatedPassword = updatedStudents[0].password;
      console.log('تم التحقق من كلمة المرور المحدثة:', {
        passwordExists: !!updatedPassword,
        passwordLength: updatedPassword ? updatedPassword.length : 0,
        passwordMatches: updatedPassword === hashedPassword
      });

      // التحقق من صحة كلمة المرور الجديدة
      const isPasswordValid = await bcrypt.compare(password, updatedPassword);
      console.log('التحقق من صحة كلمة المرور الجديدة:', isPasswordValid);
    }

    return NextResponse.json(
      { 
        message: 'تم تحديث كلمة المرور بنجاح',
        studentId: student.student_id,
        enrollmentNumber: student.enrollment_number
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('خطأ في تحديث كلمة المرور:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تحديث كلمة المرور', details: (error as Error).message },
      { status: 500 }
    );
  }
} 