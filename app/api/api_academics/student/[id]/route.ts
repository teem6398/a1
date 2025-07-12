import { NextRequest, NextResponse } from 'next/server';
import { getStudentById, getStudentGrades, getStudentAchievements } from '../../db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const studentId = params.id;
    
    // Obtener información del estudiante
    const student = await getStudentById(studentId);
    
    if (!student) {
      return NextResponse.json(
        { error: 'الطالب غير موجود' },
        { status: 404 }
      );
    }
    
    // Obtener calificaciones del estudiante
    const grades = await getStudentGrades(studentId);
    
    // Obtener logros del estudiante
    const achievements = await getStudentAchievements(studentId);
    
    // Devolver todos los datos
    return NextResponse.json({
      student,
      grades,
      achievements
    });
  } catch (error) {
    console.error('Error en API de estudiante:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}
