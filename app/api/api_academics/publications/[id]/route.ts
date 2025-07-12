import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '../../db';

// الحصول على منشور محدد بواسطة المعرف
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const publicationId = params.id;
    
    // التحقق من وجود معرف المنشور
    if (!publicationId) {
      return NextResponse.json(
        { error: 'معرف المنشور مطلوب' },
        { status: 400 }
      );
    }

    // استعلام لجلب المنشور مع التصنيفات والكلمات المفتاحية
    const query = `
      SELECT 
        p.publication_id,
        p.teacher_id,
        t.name_ar as teacher_name_ar,
        t.name_en as teacher_name_en,
        p.title_ar,
        p.title_en,
        p.description_ar,
        p.description_en,
        p.media_type,
        p.file_path,
        p.thumbnail_path,
        p.publication_date,
        p.is_featured,
        p.view_count,
        p.status,
        GROUP_CONCAT(DISTINCT c.category_id) as category_ids,
        GROUP_CONCAT(DISTINCT c.name_ar) as categories_ar,
        GROUP_CONCAT(DISTINCT c.name_en) as categories_en,
        GROUP_CONCAT(DISTINCT tg.tag_id) as tag_ids,
        GROUP_CONCAT(DISTINCT tg.name_ar) as tags_ar,
        GROUP_CONCAT(DISTINCT tg.name_en) as tags_en
      FROM 
        teacher_publications p
        JOIN teachers t ON p.teacher_id = t.teacher_id
        LEFT JOIN publication_category_relations pcr ON p.publication_id = pcr.publication_id
        LEFT JOIN publication_categories c ON pcr.category_id = c.category_id
        LEFT JOIN publication_tag_relations ptr ON p.publication_id = ptr.publication_id
        LEFT JOIN publication_tags tg ON ptr.tag_id = tg.tag_id
      WHERE 
        p.publication_id = ?
      GROUP BY 
        p.publication_id
    `;
    
    const publications = await executeQuery<any[]>({ 
      query, 
      values: [publicationId] 
    });
    
    if (!publications || publications.length === 0) {
      return NextResponse.json(
        { error: 'المنشور غير موجود' },
        { status: 404 }
      );
    }
    
    const pub = publications[0];
    
    // تحديث عدد المشاهدات
    await executeQuery({ 
      query: 'UPDATE teacher_publications SET view_count = view_count + 1 WHERE publication_id = ?', 
      values: [publicationId] 
    });
    
    // تحويل البيانات إلى التنسيق المناسب
    const formattedPublication = {
      publication_id: pub.publication_id,
      teacher_id: pub.teacher_id,
      teacher: {
        name_ar: pub.teacher_name_ar,
        name_en: pub.teacher_name_en
      },
      title_ar: pub.title_ar,
      title_en: pub.title_en,
      description_ar: pub.description_ar,
      description_en: pub.description_en,
      mediaType: pub.media_type,
      link: pub.file_path,
      thumbnailUrl: pub.thumbnail_path,
      publication_date: pub.publication_date,
      is_featured: pub.is_featured === 1,
      view_count: pub.view_count + 1, // زيادة عدد المشاهدات
      status: pub.status,
      category_ids: pub.category_ids ? pub.category_ids.split(',').map(Number) : [],
      categories: {
        ar: pub.categories_ar ? pub.categories_ar.split(',') : [],
        en: pub.categories_en ? pub.categories_en.split(',') : []
      },
      tag_ids: pub.tag_ids ? pub.tag_ids.split(',').map(Number) : [],
      tags: {
        ar: pub.tags_ar ? pub.tags_ar.split(',') : [],
        en: pub.tags_en ? pub.tags_en.split(',') : []
      }
    };
    
    return NextResponse.json(formattedPublication);
  } catch (error) {
    console.error('Error fetching publication:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب المنشور' },
      { status: 500 }
    );
  }
}

// تحديث منشور محدد
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const publicationId = params.id;
    const body = await request.json();
    const {
      title_ar,
      title_en,
      description_ar,
      description_en,
      media_type,
      file_path,
      thumbnail_path,
      is_featured,
      status,
      categories,
      tags
    } = body;
    
    // التحقق من وجود معرف المنشور
    if (!publicationId) {
      return NextResponse.json(
        { error: 'معرف المنشور مطلوب' },
        { status: 400 }
      );
    }
    
    // التحقق من وجود المنشور
    const checkQuery = 'SELECT * FROM teacher_publications WHERE publication_id = ?';
    const existingPublication = await executeQuery<any[]>({ 
      query: checkQuery, 
      values: [publicationId] 
    });
    
    if (!existingPublication || existingPublication.length === 0) {
      return NextResponse.json(
        { error: 'المنشور غير موجود' },
        { status: 404 }
      );
    }
    
    // تحديث المنشور
    const updateQuery = `
      UPDATE teacher_publications 
      SET 
        title_ar = ?,
        title_en = ?,
        description_ar = ?,
        description_en = ?,
        media_type = ?,
        file_path = COALESCE(?, file_path),
        thumbnail_path = COALESCE(?, thumbnail_path),
        is_featured = ?,
        status = ?
      WHERE 
        publication_id = ?
    `;
    
    await executeQuery({ 
      query: updateQuery, 
      values: [
        title_ar || existingPublication[0].title_ar,
        title_en || existingPublication[0].title_en,
        description_ar !== undefined ? description_ar : existingPublication[0].description_ar,
        description_en !== undefined ? description_en : existingPublication[0].description_en,
        media_type || existingPublication[0].media_type,
        file_path || null,
        thumbnail_path || null,
        is_featured !== undefined ? is_featured : existingPublication[0].is_featured,
        status || existingPublication[0].status,
        publicationId
      ] 
    });
    
    // تحديث التصنيفات إذا وجدت
    if (categories) {
      // حذف التصنيفات الحالية
      await executeQuery({ 
        query: 'DELETE FROM publication_category_relations WHERE publication_id = ?', 
        values: [publicationId] 
      });
      
      // إضافة التصنيفات الجديدة
      if (categories.length > 0) {
        const categoryValues = categories.map((categoryId: number) => [publicationId, categoryId]);
        const categoryQuery = `
          INSERT INTO publication_category_relations (publication_id, category_id) 
          VALUES ?
        `;
        
        await executeQuery({ 
          query: categoryQuery, 
          values: [categoryValues] 
        });
      }
    }
    
    // تحديث الكلمات المفتاحية إذا وجدت
    if (tags) {
      // حذف الكلمات المفتاحية الحالية
      await executeQuery({ 
        query: 'DELETE FROM publication_tag_relations WHERE publication_id = ?', 
        values: [publicationId] 
      });
      
      // إضافة الكلمات المفتاحية الجديدة
      if (tags.length > 0) {
        const tagValues = tags.map((tagId: number) => [publicationId, tagId]);
        const tagQuery = `
          INSERT INTO publication_tag_relations (publication_id, tag_id) 
          VALUES ?
        `;
        
        await executeQuery({ 
          query: tagQuery, 
          values: [tagValues] 
        });
      }
    }
    
    return NextResponse.json({
      success: true,
      publication_id: publicationId,
      message: 'تم تحديث المنشور بنجاح'
    });
  } catch (error) {
    console.error('Error updating publication:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تحديث المنشور' },
      { status: 500 }
    );
  }
}

// حذف منشور محدد
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const publicationId = params.id;
    
    // التحقق من وجود معرف المنشور
    if (!publicationId) {
      return NextResponse.json(
        { error: 'معرف المنشور مطلوب' },
        { status: 400 }
      );
    }
    
    // التحقق من وجود المنشور
    const checkQuery = 'SELECT * FROM teacher_publications WHERE publication_id = ?';
    const existingPublication = await executeQuery<any[]>({ 
      query: checkQuery, 
      values: [publicationId] 
    });
    
    if (!existingPublication || existingPublication.length === 0) {
      return NextResponse.json(
        { error: 'المنشور غير موجود' },
        { status: 404 }
      );
    }
    
    // حذف العلاقات أولاً
    await executeQuery({ 
      query: 'DELETE FROM publication_category_relations WHERE publication_id = ?', 
      values: [publicationId] 
    });
    
    await executeQuery({ 
      query: 'DELETE FROM publication_tag_relations WHERE publication_id = ?', 
      values: [publicationId] 
    });
    
    await executeQuery({ 
      query: 'DELETE FROM publication_comments WHERE publication_id = ?', 
      values: [publicationId] 
    });
    
    // حذف المنشور
    await executeQuery({ 
      query: 'DELETE FROM teacher_publications WHERE publication_id = ?', 
      values: [publicationId] 
    });
    
    return NextResponse.json({
      success: true,
      message: 'تم حذف المنشور بنجاح'
    });
  } catch (error) {
    console.error('Error deleting publication:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء حذف المنشور' },
      { status: 500 }
    );
  }
} 