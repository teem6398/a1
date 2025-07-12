import { NextRequest, NextResponse } from 'next/server';
import { getTeacherById, getTeacherCourses, getTeacherPublications, getTeacherAdvice } from '../../db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const teacherId = params.id;
    
    // جلب معلومات المعلم
    const teacher = await getTeacherById(teacherId);
    
    if (!teacher) {
      return NextResponse.json(
        { error: 'المعلم غير موجود' },
        { status: 404 }
      );
    }
    
    // جلب المواد الدراسية للمعلم
    const courses = await getTeacherCourses(teacherId);
    
    // جلب منشورات المعلم
    const publications = await getTeacherPublications(teacherId);
    
    // جلب نصائح المعلم
    const advice = await getTeacherAdvice(teacherId);
    
    // إرجاع جميع البيانات
    return NextResponse.json({
      teacher,
      courses,
      publications,
      advice
    });
    
  } catch (error) {
    console.error('خطأ في جلب بيانات المعلم:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم عند جلب بيانات المعلم' },
      { status: 500 }
    );
  }
}