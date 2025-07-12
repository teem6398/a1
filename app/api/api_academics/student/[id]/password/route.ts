import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { db } from '../../db';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { password } = await request.json();
    const studentId = params.id;

    // التحقق من وجود الطالب
    const student = await db.query(
      'SELECT student_id FROM students WHERE student_id = ?',
      [studentId]
    );

    if (!student.length) {
      return NextResponse.json(
        { error: 'الطالب غير موجود' },
        { status: 404 }
      );
    }

    // تشفير كلمة المرور
    const hashedPassword = await hash(password, 10);

    // تحديث كلمة المرور
    await db.query(
      'UPDATE students SET password = ? WHERE student_id = ?',
      [hashedPassword, studentId]
    );

    // تسجيل محاولة تغيير كلمة المرور
    await db.query(
      'INSERT INTO student_login_attempts (student_id, success, ip_address) VALUES (?, TRUE, ?)',
      [studentId, request.headers.get('x-forwarded-for') || 'unknown']
    );

    return NextResponse.json(
      { message: 'تم تحديث كلمة المرور بنجاح' },
      { status: 200 }
    );
  } catch (error) {
    console.error('خطأ في تحديث كلمة المرور:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تحديث كلمة المرور' },
      { status: 500 }
    );
  }
} 