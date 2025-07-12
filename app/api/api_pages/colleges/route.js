import { NextResponse } from 'next/server';
import { query } from '../db';

// GET /api/colleges/:id
export async function GET(request) {
  try {
    // استخراج معرف الكلية من URL
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'College ID is required' }, { status: 400 });
    }
    
    try {
      // جلب بيانات الكلية
      const collegeRows = await query(
        'SELECT * FROM colleges WHERE id = ?',
        [id]
      );
      
      // جلب الإحصائيات
      const statsRows = await query(
        'SELECT * FROM stats_section WHERE college_id = ?',
        [id]
      );
      
      if (!collegeRows.length) {
        return NextResponse.json({ error: 'College not found' }, { status: 404 });
      }
      
      return NextResponse.json({
        college: collegeRows[0],
        stats: statsRows
      });
    } catch (innerError) {
      console.error('Error in database operations:', innerError);
      throw innerError;
    }
  } catch (error) {
    console.error('Error fetching college data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT /api/api_pages/colleges - تحديث بيانات الكلية
export async function PUT(request) {
  try {
    // استخراج بيانات الكلية من الطلب
    const data = await request.json();
    const { college } = data;
    
    console.log('Received college data:', college);
    
    if (!college || !college.id) {
      return NextResponse.json({ error: 'College data and ID are required' }, { status: 400 });
    }
    
    try {
      // التحقق من وجود الكلية قبل التحديث
      const checkResult = await query(
        'SELECT * FROM colleges WHERE id = ?',
        [college.id]
      );
      
      console.log('Check result:', checkResult);
      
      // تحديث بيانات الكلية في قاعدة البيانات
      const updateResult = await query(
        `UPDATE colleges SET 
          hero_title = ?, 
          hero_subtitle = ?, 
          hero_image_url = ?, 
          about_content = ?, 
          dean_name = ?, 
          dean_title = ?, 
          dean_image_url = ?, 
          dean_message = ?
        WHERE id = ?`,
        [
          college.hero_title,
          college.hero_subtitle,
          college.hero_image_url,
          college.about_content,
          college.dean_name,
          college.dean_title,
          college.dean_image_url,
          college.dean_message,
          college.id
        ]
      );
      
      console.log('Update result:', updateResult);
      
      return NextResponse.json({
        success: true,
        message: 'College updated successfully',
        affectedRows: updateResult.affectedRows
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: 'Database error: ' + dbError.message }, { status: 500 });
    }
  } catch (error) {
    console.error('Error updating college data:', error);
    return NextResponse.json({ error: 'Internal Server Error: ' + error.message }, { status: 500 });
  }
}
