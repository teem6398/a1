import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '../db';

// دالة لجلب جميع الكليات
export async function getAllColleges(): Promise<{ id: number; name: string }[]> {
  try {
    const query = `
      SELECT 
        college_id AS id,
        college_name_ar AS name
      FROM 
        colleges
      ORDER BY 
        college_name_ar ASC
    `;
    
    const colleges = await executeQuery<any[]>({ query });
    return colleges.map(c => ({ id: c.id, name: c.name }));
  } catch (error) {
    console.error('Error fetching all colleges:', error);
    throw new Error('Could not fetch colleges');
  }
}

// Handler for GET request
export async function GET(request: NextRequest) {
  try {
    const colleges = await getAllColleges();
    return NextResponse.json(colleges, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Error fetching colleges', error: errorMessage }, { status: 500 });
  }
} 