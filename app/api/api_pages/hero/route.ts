import { NextRequest, NextResponse } from 'next/server';
import { query } from '../db';

interface HeroSlide {
  slide_id: number;
  title: string;
  title_en: string | null;
  description: string;
  description_en: string | null;
  image_path: string;
  button_text: string;
  button_text_en: string | null;
  button_url: string;
}

// دالة للحصول على شرائح العرض الرئيسي
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'ar';
    const id = searchParams.get('id');
    
    if (id) {
      // جلب شريحة محددة بواسطة المعرف
      const slide = await query(
        `SELECT * FROM hero_slides WHERE slide_id = ? AND active = TRUE`,
        [id]
      );
      
      if (slide.length === 0) {
        return NextResponse.json(
          { error: 'الشريحة غير موجودة' },
          { status: 404 }
        );
      }
      
      // تحويل البيانات حسب اللغة المطلوبة
      const processedSlide = {
        slide_id: slide[0].slide_id,
        title: lang === 'en' && slide[0].title_en ? slide[0].title_en : slide[0].title,
        description: lang === 'en' && slide[0].description_en ? slide[0].description_en : slide[0].description,
        image_path: slide[0].image_path,
        button_text: lang === 'en' && slide[0].button_text_en ? slide[0].button_text_en : slide[0].button_text,
        button_url: slide[0].button_url
      };
      
      return NextResponse.json(processedSlide);
    } else {
      // جلب جميع الشرائح النشطة
      const slides = await query(
        'SELECT slide_id, title, title_en, description, description_en, image_path, button_text, button_text_en, button_url FROM hero_slides WHERE active = 1 ORDER BY slide_order ASC'
      ) as HeroSlide[];
      
      // تحويل البيانات حسب اللغة المطلوبة
      const processedSlides = slides.map((slide: HeroSlide) => ({
        slide_id: slide.slide_id,
        title: lang === 'en' && slide.title_en ? slide.title_en : slide.title,
        description: lang === 'en' && slide.description_en ? slide.description_en : slide.description,
        image_path: slide.image_path,
        button_text: lang === 'en' && slide.button_text_en ? slide.button_text_en : slide.button_text,
        button_url: slide.button_url
      }));
      
      return NextResponse.json(processedSlides);
    }
  } catch (error) {
    console.error('خطأ في جلب بيانات العرض الرئيسي:', error);
    return NextResponse.json({ error: 'حدث خطأ في جلب بيانات العرض الرئيسي' }, { status: 500 });
  }
}

// دالة لإضافة شريحة جديدة
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // التحقق من البيانات المطلوبة
    if (!body.title || !body.image_path) {
      return NextResponse.json(
        { error: 'البيانات المطلوبة غير مكتملة' },
        { status: 400 }
      );
    }
    
    // الحصول على أعلى ترتيب للعرض
    const orderResult = await query(
      `SELECT MAX(slide_order) as max_order FROM hero_slides`
    ) as any[];
    
    const slideOrder = orderResult[0].max_order ? orderResult[0].max_order + 1 : 1;
    
    // إضافة الشريحة الجديدة
    const result = await query(
      `INSERT INTO hero_slides (
        title, description, image_path, button_text, button_url, slide_order, active
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        body.title,
        body.description || '',
        body.image_path,
        body.button_text || 'اكتشف المزيد',
        body.button_url || '#',
        slideOrder,
        true
      ]
    ) as any;
    
    // جلب الشريحة المضافة
    const addedSlide = await query(
      `SELECT * FROM hero_slides WHERE slide_id = ?`,
      [result.insertId]
    ) as any[];
    
    return NextResponse.json(addedSlide[0]);
  } catch (error) {
    console.error('Error adding hero slide:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إضافة شريحة جديدة' },
      { status: 500 }
    );
  }
}

// دالة لتحديث بيانات شريحة
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // التحقق من البيانات المطلوبة
    if (!body.slide_id || !body.title || !body.image_path) {
      return NextResponse.json(
        { error: 'البيانات المطلوبة غير مكتملة' },
        { status: 400 }
      );
    }
    
    // التحقق من وجود الشريحة
    const slideExists = await query(
      `SELECT * FROM hero_slides WHERE slide_id = ?`,
      [body.slide_id]
    ) as any[];
    
    if (!slideExists || slideExists.length === 0) {
      return NextResponse.json(
        { error: 'الشريحة غير موجودة' },
        { status: 404 }
      );
    }
    
    // تحديث بيانات الشريحة
    await query(
      `UPDATE hero_slides 
       SET title = ?, description = ?, image_path = ?,
           button_text = ?, button_url = ?, active = ?
       WHERE slide_id = ?`,
      [
        body.title,
        body.description || '',
        body.image_path,
        body.button_text || 'اكتشف المزيد',
        body.button_url || '#',
        body.active !== undefined ? body.active : true,
        body.slide_id
      ]
    );
    
    // جلب الشريحة المحدثة
    const updatedSlide = await query(
      `SELECT * FROM hero_slides WHERE slide_id = ?`,
      [body.slide_id]
    ) as any[];
    
    return NextResponse.json(updatedSlide[0]);
  } catch (error) {
    console.error('Error updating hero slide:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تحديث بيانات الشريحة' },
      { status: 500 }
    );
  }
}

// دالة لحذف شريحة
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'معرف الشريحة مطلوب' },
        { status: 400 }
      );
    }
    
    // التحقق من وجود الشريحة
    const slideExists = await query(
      `SELECT * FROM hero_slides WHERE slide_id = ?`,
      [id]
    ) as any[];
    
    if (!slideExists || slideExists.length === 0) {
      return NextResponse.json(
        { error: 'الشريحة غير موجودة' },
        { status: 404 }
      );
    }
    
    // حذف الشريحة
    await query(
      `DELETE FROM hero_slides WHERE slide_id = ?`,
      [id]
    );
    
    // إعادة ترتيب الشرائح المتبقية
    const remainingSlides = await query(
      `SELECT slide_id FROM hero_slides ORDER BY slide_order ASC`
    ) as any[];
    
    for (let i = 0; i < remainingSlides.length; i++) {
      await query(
        `UPDATE hero_slides SET slide_order = ? WHERE slide_id = ?`,
        [i + 1, remainingSlides[i].slide_id]
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting hero slide:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء حذف الشريحة' },
      { status: 500 }
    );
  }
}

// دالة لتغيير ترتيب الشرائح
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    
    // التحقق من البيانات المطلوبة
    if (!body.slides || !Array.isArray(body.slides)) {
      return NextResponse.json(
        { error: 'البيانات المطلوبة غير صحيحة' },
        { status: 400 }
      );
    }
    
    // تحديث ترتيب الشرائح
    for (const slide of body.slides) {
      await query(
        `UPDATE hero_slides SET slide_order = ? WHERE slide_id = ?`,
        [slide.order, slide.id]
      );
    }
    
    // جلب الشرائح المحدثة
    const updatedSlides = await query(
      `SELECT * FROM hero_slides ORDER BY slide_order ASC`
    );
    
    return NextResponse.json(updatedSlides);
  } catch (error) {
    console.error('Error reordering hero slides:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تغيير ترتيب الشرائح' },
      { status: 500 }
    );
  }
} 