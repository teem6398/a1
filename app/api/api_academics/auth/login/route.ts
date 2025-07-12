import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '../../db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentId, name } = body;

    // Validar que se proporcionaron los campos requeridos
    if (!studentId || !name) {
      return NextResponse.json(
        { error: 'يرجى إدخال رقم القيد والاسم' },
        { status: 400 }
      );
    }

    // Consultar la base de datos para verificar las credenciales del estudiante
    const query = `
      SELECT 
        s.student_id, 
        s.enrollment_number,
        s.first_name_ar as name
      FROM 
        students s
      WHERE 
        s.enrollment_number = ? AND s.first_name_ar LIKE ?
    `;

    const students = await executeQuery<any[]>({
      query,
      values: [studentId, `%${name}%`]
    });

    // Si no se encuentra ningún estudiante con esas credenciales
    if (!students || students.length === 0) {
      return NextResponse.json(
        { error: 'رقم القيد أو الاسم غير صحيح' },
        { status: 401 }
      );
    }

    // Estudiante encontrado, devolver información básica
    const student = students[0];
    
    return NextResponse.json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      studentId: student.student_id,
      name: student.name
    });
  } catch (error) {
    console.error('Error en la autenticación:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}
