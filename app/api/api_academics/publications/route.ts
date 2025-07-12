import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '../db';

// الحصول على جميع المنشورات مع إمكانية التصفية
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const mediaType = searchParams.get('mediaType');
    const categoryId = searchParams.get('categoryId');
    const tagId = searchParams.get('tagId');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0;
    
    let query = `
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
        GROUP_CONCAT(DISTINCT c.name_ar) as categories_ar,
        GROUP_CONCAT(DISTINCT c.name_en) as categories_en,
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
        p.status = 'published'
    `;
    
    const values: any[] = [];
    
    // إضافة شروط التصفية
    if (mediaType) {
      query += ' AND p.media_type = ?';
      values.push(mediaType);
    }
    
    if (categoryId) {
      query += ' AND pcr.category_id = ?';
      values.push(categoryId);
    }
    
    if (tagId) {
      query += ' AND ptr.tag_id = ?';
      values.push(tagId);
    }
    
    // إضافة التجميع والترتيب والحد
    query += `
      GROUP BY 
        p.publication_id
      ORDER BY 
        p.is_featured DESC, 
        p.publication_date DESC
      LIMIT ? OFFSET ?
    `;
    
    values.push(limit, offset);
    
    const publications = await executeQuery<any[]>({ 
      query, 
      values 
    });
    
    // استعلام للحصول على العدد الإجمالي
    let countQuery = `
      SELECT COUNT(DISTINCT p.publication_id) as total
      FROM 
        teacher_publications p
        LEFT JOIN publication_category_relations pcr ON p.publication_id = pcr.publication_id
        LEFT JOIN publication_tag_relations ptr ON p.publication_id = ptr.publication_id
      WHERE 
        p.status = 'published'
    `;
    
    const countValues: any[] = [];
    
    if (mediaType) {
      countQuery += ' AND p.media_type = ?';
      countValues.push(mediaType);
    }
    
    if (categoryId) {
      countQuery += ' AND pcr.category_id = ?';
      countValues.push(categoryId);
    }
    
    if (tagId) {
      countQuery += ' AND ptr.tag_id = ?';
      countValues.push(tagId);
    }
    
    const countResult = await executeQuery<any[]>({ 
      query: countQuery, 
      values: countValues 
    });
    
    const total = countResult[0]?.total || 0;
    
    // تحويل البيانات إلى التنسيق المناسب
    const formattedPublications = publications.map(pub => ({
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
      view_count: pub.view_count,
      categories: {
        ar: pub.categories_ar ? pub.categories_ar.split(',') : [],
        en: pub.categories_en ? pub.categories_en.split(',') : []
      },
      tags: {
        ar: pub.tags_ar ? pub.tags_ar.split(',') : [],
        en: pub.tags_en ? pub.tags_en.split(',') : []
      }
    }));
    
    return NextResponse.json({
      publications: formattedPublications,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });
  } catch (error) {
    console.error('Error fetching publications:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب المنشورات' },
      { status: 500 }
    );
  }
}

// إضافة منشور جديد
export async function POST(request: NextRequest) {
  console.log('Starting publication creation process...');
  try {
    const body = await request.json();
    const {
      teacher_id,
      title_ar,
      title_en,
      description_ar,
      description_en,
      media_type,
      file_path,
      thumbnail_path,
      categories,
      tags
    } = body;
    
    console.log('Received publication data:', { 
      teacher_id, 
      title_ar, 
      title_en, 
      media_type, 
      file_path: file_path ? 'exists' : 'missing',
      thumbnail_path: thumbnail_path ? 'exists' : 'missing',
      categories: categories?.length || 0,
      tags: tags?.length || 0
    });
    
    // التحقق من البيانات المطلوبة
    if (!teacher_id || !title_ar || !title_en || !media_type) {
      console.error('Missing required fields:', { 
        teacher_id: !!teacher_id, 
        title_ar: !!title_ar, 
        title_en: !!title_en, 
        media_type: !!media_type 
      });
      return NextResponse.json(
        { error: 'جميع الحقول المطلوبة غير مكتملة' },
        { status: 400 }
      );
    }
    
    // إدخال المنشور الجديد
    const insertQuery = `
      INSERT INTO teacher_publications (
        teacher_id, 
        title_ar, 
        title_en, 
        description_ar, 
        description_en, 
        media_type, 
        file_path, 
        thumbnail_path, 
        publication_date, 
        is_featured, 
        view_count, 
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), 0, 0, 'published')
    `;
    
    console.log('Executing insert query for publication...');
    const result = await executeQuery<any>({ 
      query: insertQuery, 
      values: [
        teacher_id, 
        title_ar, 
        title_en, 
        description_ar || null, 
        description_en || null, 
        media_type, 
        file_path || null, 
        thumbnail_path || null
      ] 
    });
    
    const publicationId = result.insertId;
    console.log(`Publication inserted successfully with ID: ${publicationId}`);
    
    // إضافة التصنيفات إذا وجدت
    if (categories && categories.length > 0) {
      console.log(`Adding ${categories.length} categories to publication...`);
      
      // استخدام إدخال متعدد للتصنيفات
      try {
        const categoryValues = categories.map((categoryId: number) => [publicationId, categoryId]);
        console.log('Category values:', categoryValues);
        
        // استخدام إدخال فردي بدلاً من متعدد لتجنب مشاكل التنسيق
        for (const [pubId, catId] of categoryValues) {
          const singleCategoryQuery = `
            INSERT INTO publication_category_relations (publication_id, category_id) 
            VALUES (?, ?)
          `;
          
          await executeQuery({ 
            query: singleCategoryQuery, 
            values: [pubId, catId] 
          });
        }
        
        console.log('Categories added successfully');
      } catch (error) {
        console.error('Error adding categories:', error);
        // لا نريد إيقاف العملية إذا فشلت إضافة التصنيفات
      }
    }
    
    // إضافة الكلمات المفتاحية إذا وجدت
    if (tags && tags.length > 0) {
      console.log(`Adding ${tags.length} tags to publication...`);
      
      try {
        const tagValues = tags.map((tagId: number) => [publicationId, tagId]);
        console.log('Tag values:', tagValues);
        
        // استخدام إدخال فردي بدلاً من متعدد لتجنب مشاكل التنسيق
        for (const [pubId, tagId] of tagValues) {
          const singleTagQuery = `
            INSERT INTO publication_tag_relations (publication_id, tag_id) 
            VALUES (?, ?)
          `;
          
          await executeQuery({ 
            query: singleTagQuery, 
            values: [pubId, tagId] 
          });
        }
        
        console.log('Tags added successfully');
      } catch (error) {
        console.error('Error adding tags:', error);
        // لا نريد إيقاف العملية إذا فشلت إضافة الكلمات المفتاحية
      }
    }
    
    console.log('Publication creation completed successfully');
    
    return NextResponse.json({
      success: true,
      publication_id: publicationId,
      message: 'تمت إضافة المنشور بنجاح'
    });
  } catch (error: any) {
    console.error('Error adding publication:', error);
    return NextResponse.json(
      { error: `حدث خطأ أثناء إضافة المنشور: ${error.message}` },
      { status: 500 }
    );
  }
} 