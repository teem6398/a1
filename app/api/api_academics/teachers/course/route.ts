import { NextRequest, NextResponse } from 'next/server';
import { getTeacherCourses } from '../../db'; // Corrected path to db.ts
import { Course } from '../../../../components/Teacher/interfaces'; // Corrected path to interfaces

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const teacherId = searchParams.get('teacherId');

  if (!teacherId) {
    return NextResponse.json({ message: 'Teacher ID is required' }, { status: 400 });
  }

  try {
    const courses: Course[] = await getTeacherCourses(teacherId);
    if (courses.length === 0) {
      // Optional: Differentiate between no courses found and an error
      // return NextResponse.json({ message: 'No courses found for this teacher' }, { status: 404 });
    }
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error('API Error fetching teacher courses:', error);
    let errorMessage = 'Failed to fetch teacher courses';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ message: 'Internal Server Error', error: errorMessage }, { status: 500 });
  }
}
