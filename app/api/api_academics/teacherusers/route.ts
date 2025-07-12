import { NextResponse } from 'next/server';
import { getAllTeachers } from '../db'; // المسار إلى db.ts

export async function GET() {
  try {
    const teachers = await getAllTeachers();
    return NextResponse.json(teachers);
  } catch (error) {
    console.error('Error in API (teacherusers):', error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم عند جلب المعلمين' },
      { status: 500 }
    );
  }
}