import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '../../db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone } = body;

    // التحقق من توفر البيانات المطلوبة
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'يرجى إدخال الاسم ورقم الهاتف' },
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
        c.college_name_ar AS college
      FROM 
        teachers t
        LEFT JOIN colleges c ON t.college_id = c.college_id
      WHERE 
        t.name_ar LIKE ? AND t.phone = ?
    `;

    const teachers = await executeQuery<any[]>({
      query,
      values: [`%${name}%`, phone]
    });

    // إذا لم يتم العثور على معلم بهذه البيانات
    if (!teachers || teachers.length === 0) {
      return NextResponse.json(
        { error: 'الاسم أو رقم الهاتف غير صحيح' },
        { status: 401 }
      );
    }

    // تم العثور على المعلم، إرجاع المعلومات الأساسية
    const teacher = teachers[0];
    
    return NextResponse.json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      teacherId: teacher.teacher_id,
      name: teacher.name,
      email: teacher.email,
      academic_degree: teacher.academic_degree,
      department: teacher.department,
      college: teacher.college
    });
  } catch (error) {
    console.error('خطأ في المصادقة:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}