import { NextResponse } from 'next/server';
import { query } from '../db';

// GET /api/majors
export async function GET(request) {
  try {
    // استخراج معرف الكلية من URL
    const url = new URL(request.url);
    const collegeId = url.searchParams.get('college_id');
    
    if (!collegeId) {
      return NextResponse.json({ error: 'College ID is required' }, { status: 400 });
    }
    
    try {
      // جلب بيانات التخصصات للكلية المحددة
      const majorsRows = await query(
        'SELECT * FROM majors WHERE college_id = ?',
        [collegeId]
      );
      
      return NextResponse.json({
        majors: majorsRows
      });
    } catch (innerError) {
      console.error('Error in database operations:', innerError);
      throw innerError;
    }
  } catch (error) {
    console.error('Error fetching majors data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
