import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '../../db';

// الحصول على جميع الكلمات المفتاحية
export async function GET(request: NextRequest) {
  try {
    const query = `
      SELECT 
        t.tag_id,
        t.name_ar,
        t.name_en,
        COUNT(ptr.publication_id) as publication_count
      FROM 
        publication_tags t
        LEFT JOIN publication_tag_relations ptr ON t.tag_id = ptr.tag_id
        LEFT JOIN teacher_publications p ON ptr.publication_id = p.publication_id AND p.status = 'published'
      GROUP BY 
        t.tag_id
      ORDER BY 
        publication_count DESC, 
        t.name_ar
    `;
    
    const tags = await executeQuery<any[]>({ query });
    
    // تحويل البيانات إلى التنسيق المناسب
    const formattedTags = tags.map(tag => ({
      tag_id: tag.tag_id,
      name_ar: tag.name_ar,
      name_en: tag.name_en,
      publication_count: tag.publication_count
    }));
    
    return NextResponse.json(formattedTags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب الكلمات المفتاحية' },
      { status: 500 }
    );
  }
}

// إضافة كلمة مفتاحية جديدة
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name_ar,
      name_en
    } = body;
    
    // التحقق من البيانات المطلوبة
    if (!name_ar || !name_en) {
      return NextResponse.json(
        { error: 'اسم الكلمة المفتاحية مطلوب باللغتين العربية والإنجليزية' },
        { status: 400 }
      );
    }
    
    // التحقق من عدم وجود كلمة مفتاحية بنفس الاسم
    const checkQuery = 'SELECT * FROM publication_tags WHERE name_ar = ? OR name_en = ?';
    const existingTag = await executeQuery<any[]>({ 
      query: checkQuery, 
      values: [name_ar, name_en] 
    });
    
    if (existingTag && existingTag.length > 0) {
      return NextResponse.json(
        { error: 'توجد كلمة مفتاحية بنفس الاسم بالفعل' },
        { status: 400 }
      );
    }
    
    // إدخال الكلمة المفتاحية الجديدة
    const insertQuery = `
      INSERT INTO publication_tags (
        name_ar, 
        name_en
      ) VALUES (?, ?)
    `;
    
    const result = await executeQuery<any>({ 
      query: insertQuery, 
      values: [name_ar, name_en] 
    });
    
    return NextResponse.json({
      success: true,
      tag_id: result.insertId,
      message: 'تمت إضافة الكلمة المفتاحية بنجاح'
    });
  } catch (error) {
    console.error('Error adding tag:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إضافة الكلمة المفتاحية' },
      { status: 500 }
    );
  }
} 