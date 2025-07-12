import { NextRequest, NextResponse } from 'next/server';
import { getTeacherById, getAllTeachers } from '../db'; // Assuming db.ts is in the parent directory (api_academics)

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const teacherId = searchParams.get('id');
  const searchQuery = searchParams.get('search');
  const collegeId = searchParams.get('collegeId');

  try {
    if (teacherId) {
      // Fetch a specific teacher by ID using the dedicated function
      const teacher = await getTeacherById(teacherId);

      if (!teacher) {
        return NextResponse.json({ message: 'Teacher not found' }, { status: 404 });
      }
      return NextResponse.json(teacher);
    } else {
      // Fetch teachers based on search and filter criteria
      const teachers = await getAllTeachers(searchQuery || undefined, collegeId || undefined);
      return NextResponse.json(teachers);
    }
  } catch (error) {
    console.error('Error fetching teachers:', error);
    // It's good practice to hide specific error details from the client in production
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Error fetching teachers', error: errorMessage }, { status: 500 });
  }
}
