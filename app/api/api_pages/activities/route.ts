import { NextRequest, NextResponse } from 'next/server';
import { getActivities, getActivity, createActivity, updateActivity, deleteActivity } from './db';
import slugify from 'slugify';

// الحصول على قائمة الأنشطة
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lang = searchParams.get('lang') || 'ar';
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const offset = (page - 1) * limit;
    const categoryId = searchParams.get('category') ? parseInt(searchParams.get('category') as string, 10) : undefined;
    const status = searchParams.get('status') || 'published';
    const search = searchParams.get('search') || undefined;

    const activities = await getActivities(lang, limit, offset, categoryId, status, search);
    
    return NextResponse.json({ 
      success: true, 
      data: activities,
      pagination: {
        page,
        limit,
        offset,
        language: lang
      }
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
    const lang = request.nextUrl.searchParams.get('lang') || 'ar';
    const errorMessage = lang === 'en' ? 'Failed to fetch activities' : 'فشل في جلب الأنشطة';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// إنشاء نشاط جديد
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const lang = body.lang || 'ar';
    
    // التحقق من وجود البيانات المطلوبة
    if (!body.title_ar || !body.title_en || !body.description_ar || !body.description_en || !body.start_date) {
      const errorMessage = lang === 'en' ? 'Missing required fields' : 'بعض الحقول المطلوبة غير موجودة';
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 400 }
      );
    }
    
    // إنشاء الرابط المختصر إذا لم يتم توفيره
    if (!body.slug) {
      body.slug = slugify(body.title_en, { lower: true, strict: true });
    }
    
    const activity = await createActivity(body);
    
    const successMessage = lang === 'en' ? 'Activity created successfully' : 'تم إنشاء النشاط بنجاح';
    return NextResponse.json({ success: true, message: successMessage, data: activity }, { status: 201 });
  } catch (error) {
    console.error('Error creating activity:', error);
    const lang = request.nextUrl.searchParams.get('lang') || 'ar';
    const errorMessage = lang === 'en' ? 'Failed to create activity' : 'فشل في إنشاء النشاط';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
} 