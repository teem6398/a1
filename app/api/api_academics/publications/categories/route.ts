import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '../../db';

// الحصول على جميع التصنيفات
export async function GET(request: NextRequest) {
  try {
    const query = `
      SELECT 
        c.category_id,
        c.name_ar,
        c.name_en,
        c.description_ar,
        c.description_en,
        COUNT(pcr.publication_id) as publication_count
      FROM 
        publication_categories c
        LEFT JOIN publication_category_relations pcr ON c.category_id = pcr.category_id
        LEFT JOIN teacher_publications p ON pcr.publication_id = p.publication_id AND p.status = 'published'
      GROUP BY 
        c.category_id
      ORDER BY 
        publication_count DESC, 
        c.name_ar
    `;
    
    const categories = await executeQuery<any[]>({ query });
    
    // تحويل البيانات إلى التنسيق المناسب
    const formattedCategories = categories.map(cat => ({
      category_id: cat.category_id,
      name_ar: cat.name_ar,
      name_en: cat.name_en,
      description_ar: cat.description_ar,
      description_en: cat.description_en,
      publication_count: cat.publication_count
    }));
    
    return NextResponse.json(formattedCategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب التصنيفات' },
      { status: 500 }
    );
  }
}

// إضافة تصنيف جديد
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name_ar,
      name_en,
      description_ar,
      description_en
    } = body;
    
    // التحقق من البيانات المطلوبة
    if (!name_ar || !name_en) {
      return NextResponse.json(
        { error: 'اسم التصنيف مطلوب باللغتين العربية والإنجليزية' },
        { status: 400 }
      );
    }
    
    // التحقق من عدم وجود تصنيف بنفس الاسم
    const checkQuery = 'SELECT * FROM publication_categories WHERE name_ar = ? OR name_en = ?';
    const existingCategory = await executeQuery<any[]>({ 
      query: checkQuery, 
      values: [name_ar, name_en] 
    });
    
    if (existingCategory && existingCategory.length > 0) {
      return NextResponse.json(
        { error: 'يوجد تصنيف بنفس الاسم بالفعل' },
        { status: 400 }
      );
    }
    
    // إدخال التصنيف الجديد
    const insertQuery = `
      INSERT INTO publication_categories (
        name_ar, 
        name_en, 
        description_ar, 
        description_en
      ) VALUES (?, ?, ?, ?)
    `;
    
    const result = await executeQuery<any>({ 
      query: insertQuery, 
      values: [
        name_ar, 
        name_en, 
        description_ar || null, 
        description_en || null
      ] 
    });
    
    return NextResponse.json({
      success: true,
      category_id: result.insertId,
      message: 'تمت إضافة التصنيف بنجاح'
    });
  } catch (error) {
    console.error('Error adding category:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إضافة التصنيف' },
      { status: 500 }
    );
  }
} 