import { NextResponse } from 'next/server';
import { getAllStudents } from '../db'; // المسار إلى db.ts

export async function GET() {
  try {
    const students = await getAllStudents();
    return NextResponse.json(students);
  } catch (error) {
    console.error('Error in API (studentusers):', error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم عند جلب الطلاب' },
      { status: 500 }
    );
  }
}