import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { executeQuery } from '../../../db';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { password } = await request.json();
    const studentId = params.id;

    // التحقق من وجود كلمة المرور
    if (!password) {
      return NextResponse.json(
        { error: 'يجب إدخال كلمة المرور' },
        { status: 400 }
      );
    }

    console.log('التحقق من كلمة المرور للطالب:', studentId);
    console.log('كلمة المرور المدخلة (مخفية):', '*'.repeat(password.length));

    // الحصول على كلمة المرور المخزنة للطالب - البحث بواسطة student_id أو enrollment_number
    const students = await executeQuery<any[]>({ 
      query: `
        SELECT 
          student_id, 
          password, 
          enrollment_number,
          first_name_ar as name
        FROM students 
        WHERE student_id = ? OR enrollment_number = ?
      `,
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
      name: student.name,
      hasPassword: !!student.password,
      passwordLength: student.password ? student.password.length : 0
    });

    // التحقق من وجود كلمة مرور مخزنة
    if (!student.password) {
      console.log('لا توجد كلمة مرور مسجلة للطالب');
      return NextResponse.json(
        { error: 'لا توجد كلمة مرور مسجلة لهذا الطالب' },
        { status: 400 }
      );
    }

    // مقارنة كلمة المرور المدخلة مع كلمة المرور المخزنة
    console.log('مقارنة كلمة المرور المدخلة مع كلمة المرور المخزنة');
    console.log('كلمة المرور المدخلة (مخفية):', '*'.repeat(password.length));
    console.log('كلمة المرور المخزنة (مشفرة جزئياً):', student.password.substring(0, 10) + '...');

    // تجربة مقارنة كلمة المرور باستخدام طرق مختلفة
    try {
      // الطريقة الأولى: استخدام bcrypt.compare
      const isPasswordValid1 = await bcrypt.compare(password, student.password);
      console.log('نتيجة التحقق من كلمة المرور (طريقة 1):', isPasswordValid1);

      // الطريقة الثانية: إعادة تشفير كلمة المرور ومقارنتها
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('كلمة المرور المعاد تشفيرها (جزئياً):', hashedPassword.substring(0, 10) + '...');
      console.log('هل كلمات المرور المشفرة متطابقة؟', student.password === hashedPassword);

      // استخدام نتيجة الطريقة الأولى للتحقق
      if (!isPasswordValid1) {
        // تسجيل محاولة فاشلة
        try {
          await executeQuery({
            query: 'INSERT INTO student_login_attempts (student_id, success, ip_address) VALUES (?, FALSE, ?)',
            values: [student.student_id, request.headers.get('x-forwarded-for') || 'unknown']
          });
        } catch (error) {
          console.warn('فشل في تسجيل محاولة تغيير كلمة المرور:', error);
        }

        return NextResponse.json(
          { error: 'كلمة المرور غير صحيحة' },
          { status: 401 }
        );
      }
    } catch (error) {
      console.error('خطأ في عملية التحقق من كلمة المرور:', error);
      return NextResponse.json(
        { error: 'حدث خطأ أثناء التحقق من كلمة المرور' },
        { status: 500 }
      );
    }

    // تسجيل محاولة ناجحة
    try {
      await executeQuery({
        query: 'INSERT INTO student_login_attempts (student_id, success, ip_address) VALUES (?, TRUE, ?)',
        values: [student.student_id, request.headers.get('x-forwarded-for') || 'unknown']
      });
    } catch (error) {
      // إذا فشل تسجيل المحاولة، لا نريد أن نفشل العملية بأكملها
      console.warn('فشل في تسجيل محاولة التحقق من كلمة المرور:', error);
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'كلمة المرور صحيحة',
        studentId: student.student_id,
        enrollmentNumber: student.enrollment_number,
        name: student.name
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('خطأ في التحقق من كلمة المرور:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء التحقق من كلمة المرور', details: (error as Error).message },
      { status: 500 }
    );
  }
} 