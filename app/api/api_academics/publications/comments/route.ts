import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '../../db';

// الحصول على تعليقات المنشورات
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const publicationId = searchParams.get('publicationId');
    
    if (!publicationId) {
      return NextResponse.json(
        { error: 'معرف المنشور مطلوب' },
        { status: 400 }
      );
    }
    
    const query = `
      SELECT 
        c.comment_id,
        c.publication_id,
        c.user_id,
        c.user_type,
        c.user_name,
        c.comment_text,
        c.created_at,
        c.status
      FROM 
        publication_comments c
      WHERE 
        c.publication_id = ?
        AND c.status = 'approved'
      ORDER BY 
        c.created_at DESC
    `;
    
    const comments = await executeQuery<any[]>({ 
      query, 
      values: [publicationId] 
    });
    
    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب التعليقات' },
      { status: 500 }
    );
  }
}

// إضافة تعليق جديد
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      publication_id,
      user_id,
      user_type,
      user_name,
      comment_text
    } = body;
    
    // التحقق من البيانات المطلوبة
    if (!publication_id || !comment_text || !user_name) {
      return NextResponse.json(
        { error: 'جميع الحقول المطلوبة غير مكتملة' },
        { status: 400 }
      );
    }
    
    // التحقق من وجود المنشور
    const checkQuery = 'SELECT * FROM teacher_publications WHERE publication_id = ?';
    const existingPublication = await executeQuery<any[]>({ 
      query: checkQuery, 
      values: [publication_id] 
    });
    
    if (!existingPublication || existingPublication.length === 0) {
      return NextResponse.json(
        { error: 'المنشور غير موجود' },
        { status: 404 }
      );
    }
    
    // إدخال التعليق الجديد
    const insertQuery = `
      INSERT INTO publication_comments (
        publication_id,
        user_id,
        user_type,
        user_name,
        comment_text,
        created_at,
        status
      ) VALUES (?, ?, ?, ?, ?, NOW(), ?)
    `;
    
    // تحديد حالة التعليق (معتمد تلقائيًا للمعلمين والإداريين، في انتظار الموافقة للطلاب والزوار)
    const status = user_type === 'teacher' || user_type === 'admin' ? 'approved' : 'pending';
    
    const result = await executeQuery<any>({ 
      query: insertQuery, 
      values: [
        publication_id,
        user_id || null,
        user_type || 'visitor',
        user_name,
        comment_text,
        status
      ] 
    });
    
    return NextResponse.json({
      success: true,
      comment_id: result.insertId,
      status: status,
      message: status === 'approved' ? 'تمت إضافة التعليق بنجاح' : 'تم إرسال التعليق وهو في انتظار الموافقة'
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إضافة التعليق' },
      { status: 500 }
    );
  }
} 