import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '../../../db';

// دالة للحصول على منشورات معلم محدد
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const teacherId = params.id;
    
    // التحقق من وجود معرف المعلم
    if (!teacherId) {
      return NextResponse.json(
        { error: 'معرف المعلم مطلوب' },
        { status: 400 }
      );
    }

    // استعلام لجلب منشورات المعلم مع التصنيفات والكلمات المفتاحية
    const query = `
      SELECT 
        p.publication_id,
        p.teacher_id,
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
        GROUP_CONCAT(DISTINCT t.name_ar) as tags_ar,
        GROUP_CONCAT(DISTINCT t.name_en) as tags_en
      FROM 
        teacher_publications p
        LEFT JOIN publication_category_relations pcr ON p.publication_id = pcr.publication_id
        LEFT JOIN publication_categories c ON pcr.category_id = c.category_id
        LEFT JOIN publication_tag_relations ptr ON p.publication_id = ptr.publication_id
        LEFT JOIN publication_tags t ON ptr.tag_id = t.tag_id
      WHERE 
        p.teacher_id = ?
        AND p.status = 'published'
      GROUP BY 
        p.publication_id
      ORDER BY 
        p.is_featured DESC, 
        p.publication_date DESC
    `;
    
    const publications = await executeQuery<any[]>({ 
      query, 
      values: [teacherId] 
    });
    
    // تحويل البيانات إلى التنسيق المناسب
    const formattedPublications = publications.map(pub => ({
      publication_id: pub.publication_id,
      teacher_id: pub.teacher_id,
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
    
    return NextResponse.json(formattedPublications);
  } catch (error) {
    console.error('Error fetching teacher publications:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب منشورات المعلم' },
      { status: 500 }
    );
  }
} 