import { NextRequest, NextResponse } from 'next/server';
import { query } from '../db';

interface Faculty {
  faculty_id: number;
  name: string;
  name_en: string | null;
  description: string;
  description_en: string | null;
  slug: string;
  image_path: string;
  icon: string;
  programs: number;
  students: number;
}

// دالة للحصول على جميع الكليات
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'ar';
    const id = searchParams.get('id');
    
    if (id) {
      // جلب كلية محددة بواسطة المعرف
      const faculty = await query(
        `SELECT * FROM faculties WHERE faculty_id = ? AND active = TRUE`,
        [id]
      );
      
      if (faculty.length === 0) {
        return NextResponse.json(
          { error: 'الكلية غير موجودة' },
          { status: 404 }
        );
      }
      
      // تحويل البيانات حسب اللغة المطلوبة
      const facultyData = faculty[0];
      const translatedFaculty = {
        faculty_id: facultyData.faculty_id,
        name: lang === 'en' && facultyData.name_en ? facultyData.name_en : facultyData.name,
        description: lang === 'en' && facultyData.description_en ? facultyData.description_en : facultyData.description,
        slug: facultyData.slug,
        image_path: facultyData.image_path,
        icon: facultyData.icon,
        programs: facultyData.programs,
        students: facultyData.students
      };
      
      return NextResponse.json(translatedFaculty);
    } else {
      // جلب جميع الكليات
      const facultiesResult = await query(
        'SELECT faculty_id, name, name_en, description, description_en, slug, image_path, icon, programs, students FROM faculties WHERE active = 1 ORDER BY display_order ASC'
      ) as Faculty[];
      
      // تحويل البيانات حسب اللغة المطلوبة
      const faculties = facultiesResult.map(faculty => ({
        faculty_id: faculty.faculty_id,
        name: lang === 'en' && faculty.name_en ? faculty.name_en : faculty.name,
        description: lang === 'en' && faculty.description_en ? faculty.description_en : faculty.description,
        slug: faculty.slug,
        image_path: faculty.image_path,
        icon: faculty.icon,
        programs: faculty.programs,
        students: faculty.students
      }));
      
      return NextResponse.json(faculties);
    }
  } catch (error) {
    console.error('خطأ في جلب بيانات الكليات:', error);
    return NextResponse.json({ error: 'حدث خطأ في جلب بيانات الكليات' }, { status: 500 });
  }
}

// دالة لإضافة كلية جديدة
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // التحقق من البيانات المطلوبة
    if (!body.name || !body.description || !body.slug || !body.image_path) {
      return NextResponse.json(
        { error: 'البيانات المطلوبة غير مكتملة' },
        { status: 400 }
      );
    }
    
    // التحقق من عدم تكرار الرابط المختصر
    const existingSlug = await query(
      `SELECT * FROM faculties WHERE slug = ?`,
      [body.slug]
    ) as any[];
    
    if (existingSlug && existingSlug.length > 0) {
      return NextResponse.json(
        { error: 'الرابط المختصر موجود بالفعل' },
        { status: 400 }
      );
    }
    
    // الحصول على أعلى ترتيب للعرض
    const orderResult = await query(
      `SELECT MAX(display_order) as max_order FROM faculties`
    ) as any[];
    
    const displayOrder = orderResult[0].max_order ? orderResult[0].max_order + 1 : 1;
    
    // إضافة الكلية الجديدة
    const result = await query(
      `INSERT INTO faculties (
        name, description, slug, image_path, icon, 
        programs, students, display_order, active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        body.name,
        body.description,
        body.slug,
        body.image_path,
        body.icon || '',
        body.programs || 0,
        body.students || 0,
        displayOrder,
        true
      ]
    ) as any;
    
    // جلب الكلية المضافة
    const addedFaculty = await query(
      `SELECT * FROM faculties WHERE faculty_id = ?`,
      [result.insertId]
    ) as any[];
    
    return NextResponse.json(addedFaculty[0]);
  } catch (error) {
    console.error('Error adding faculty:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إضافة الكلية' },
      { status: 500 }
    );
  }
}

// دالة لتحديث بيانات كلية
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // التحقق من البيانات المطلوبة
    if (!body.faculty_id || !body.name || !body.description || !body.slug) {
      return NextResponse.json(
        { error: 'البيانات المطلوبة غير مكتملة' },
        { status: 400 }
      );
    }
    
    // التحقق من وجود الكلية
    const facultyExists = await query(
      `SELECT * FROM faculties WHERE faculty_id = ?`,
      [body.faculty_id]
    ) as any[];
    
    if (!facultyExists || facultyExists.length === 0) {
      return NextResponse.json(
        { error: 'الكلية غير موجودة' },
        { status: 404 }
      );
    }
    
    // التحقق من عدم تكرار الرابط المختصر
    const existingSlug = await query(
      `SELECT * FROM faculties WHERE slug = ? AND faculty_id != ?`,
      [body.slug, body.faculty_id]
    ) as any[];
    
    if (existingSlug && existingSlug.length > 0) {
      return NextResponse.json(
        { error: 'الرابط المختصر موجود بالفعل' },
        { status: 400 }
      );
    }
    
    // تحديث بيانات الكلية
    await query(
      `UPDATE faculties 
       SET name = ?, description = ?, slug = ?, image_path = ?,
           icon = ?, programs = ?, students = ?, active = ?
       WHERE faculty_id = ?`,
      [
        body.name,
        body.description,
        body.slug,
        body.image_path,
        body.icon || '',
        body.programs || 0,
        body.students || 0,
        body.active !== undefined ? body.active : true,
        body.faculty_id
      ]
    );
    
    // جلب الكلية المحدثة
    const updatedFaculty = await query(
      `SELECT * FROM faculties WHERE faculty_id = ?`,
      [body.faculty_id]
    ) as any[];
    
    return NextResponse.json(updatedFaculty[0]);
  } catch (error) {
    console.error('Error updating faculty:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تحديث بيانات الكلية' },
      { status: 500 }
    );
  }
}

// دالة لحذف كلية
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'معرف الكلية مطلوب' },
        { status: 400 }
      );
    }
    
    // التحقق من وجود الكلية
    const facultyExists = await query(
      `SELECT * FROM faculties WHERE faculty_id = ?`,
      [id]
    ) as any[];
    
    if (!facultyExists || facultyExists.length === 0) {
      return NextResponse.json(
        { error: 'الكلية غير موجودة' },
        { status: 404 }
      );
    }
    
    // حذف الكلية
    await query(
      `DELETE FROM faculties WHERE faculty_id = ?`,
      [id]
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting faculty:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء حذف الكلية' },
      { status: 500 }
    );
  }
} 