import { NextResponse } from 'next/server';
import { query } from '../db';

// PUT /api/api_pages/college_stats - تحديث بيانات الإحصائيات
export async function PUT(request) {
  try {
    // استخراج بيانات الإحصائيات من الطلب
    const data = await request.json();
    const { stats } = data;
    
    console.log('Received stats data:', stats);
    
    if (!stats || !Array.isArray(stats)) {
      return NextResponse.json({ error: 'Stats data is required and must be an array' }, { status: 400 });
    }
    
    // تحديث كل إحصائية
    const results = [];
    
    try {
      for (const stat of stats) {
        console.log('Processing stat:', stat);
        
        // التحقق من إذا كانت الإحصائية جديدة (لا يوجد معرف أو المعرف سالب)
        if (!stat.id || stat.id < 0) {
          // إضافة إحصائية جديدة
          if (!stat.college_id) {
            console.error('Missing college_id for new stat:', stat);
            results.push({
              operation: 'insert',
              error: 'Missing college_id',
              success: false,
              stat
            });
            continue;
          }
          
          console.log('Adding new stat to database with college_id:', stat.college_id);
          
          const insertResult = await query(
            'INSERT INTO stats_section (college_id, stat_number, stat_label) VALUES (?, ?, ?)',
            [stat.college_id, stat.stat_number, stat.stat_label]
          );
          
          console.log('Insert result:', insertResult);
          
          results.push({
            operation: 'insert',
            id: insertResult.insertId,
            success: true
          });
        } else {
          // تحديث إحصائية موجودة
          const updateResult = await query(
            'UPDATE stats_section SET stat_number = ?, stat_label = ? WHERE id = ?',
            [stat.stat_number, stat.stat_label, stat.id]
          );
          
          console.log('Update result for stat ID', stat.id, ':', updateResult);
          
          results.push({
            operation: 'update',
            id: stat.id,
            success: updateResult.affectedRows > 0
          });
        }
      }
      
      return NextResponse.json({
        success: true,
        message: 'Stats updated successfully',
        results
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ 
        error: 'Database error: ' + dbError.message,
        partialResults: results 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error updating stats data:', error);
    return NextResponse.json({ error: 'Internal Server Error: ' + error.message }, { status: 500 });
  }
}

// DELETE /api/api_pages/college_stats?id=X - حذف إحصائية
export async function DELETE(request) {
  try {
    // استخراج معرف الإحصائية من URL
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    console.log('Attempting to delete stat with ID:', id);
    
    if (!id) {
      return NextResponse.json({ error: 'Stat ID is required' }, { status: 400 });
    }
    
    try {
      // التحقق من وجود الإحصائية قبل الحذف
      const checkResult = await query(
        'SELECT * FROM stats_section WHERE id = ?',
        [id]
      );
      
      console.log('Check result:', checkResult);
      
      if (!checkResult || checkResult.length === 0) {
        return NextResponse.json({ error: 'Stat not found' }, { status: 404 });
      }
      
      // حذف الإحصائية
      const deleteResult = await query(
        'DELETE FROM stats_section WHERE id = ?',
        [id]
      );
      
      console.log('Delete result:', deleteResult);
      
      return NextResponse.json({
        success: true,
        message: 'Stat deleted successfully',
        affectedRows: deleteResult.affectedRows
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: 'Database error: ' + dbError.message }, { status: 500 });
    }
  } catch (error) {
    console.error('Error deleting stat:', error);
    return NextResponse.json({ error: 'Internal Server Error: ' + error.message }, { status: 500 });
  }
}
