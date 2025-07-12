import { NextResponse } from 'next/server';
import { getAllAlumni, getFeaturedAlumni, getAlumniById, getAlumniByMajor } from '../db';

interface AlumniOptions {
  lang?: string;
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDir?: string;
  collegeId?: number | null;
}

export async function GET(request: Request) {
  try {
    console.log('===== API Alumni Route: Start of request =====');
    
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'ar';
    const featured = searchParams.get('featured') === 'true';
    const id = searchParams.get('id');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const majorId = searchParams.get('majorId');
    const collegeId = searchParams.get('collegeId');
    const offset = (page - 1) * limit;

    console.log('API Request:', { lang, featured, id, page, limit, majorId, collegeId });

    // إذا تم تحديد معرف، قم بإرجاع خريج واحد
    if (id) {
      console.log('Fetching alumni by ID:', id);
      const alumni = await getAlumniById(id, lang);
      
      if (!alumni) {
        const errorMessage = lang === 'ar' ? 'لم يتم العثور على الخريج' : 'Alumni not found';
        return NextResponse.json({
          success: false,
          error: errorMessage
        }, { status: 404 });
      }
      
      console.log('Alumni found:', alumni.id);
      return NextResponse.json({
        success: true,
        data: alumni
      });
    }

    const options: AlumniOptions = {
      lang,
      limit,
      offset,
      orderBy: 'a.graduation_year',
      orderDir: 'DESC'
    };

    // إذا كان featured = true، قم بإرجاع الخريجين المميزين فقط
    if (featured) {
      console.log('Fetching featured alumni');
      const result = await getFeaturedAlumni(options);
        
      console.log('Featured alumni found:', result.stories.length);
      return NextResponse.json({
        success: true,
        data: result,
        meta: {
          count: result.stories.length,
          total: result.total,
          page,
          limit
        }
      });
    }

    // إذا تم تحديد majorId، قم بإرجاع الخريجين حسب التخصص
    if (majorId) {
      console.log('Fetching alumni by major:', majorId);
      const result = await getAlumniByMajor(parseInt(majorId), options);
      
      console.log('Alumni found by major:', result.stories.length);
      return NextResponse.json({
        success: true,
        data: result,
        meta: {
          count: result.stories.length,
          total: result.total,
          page,
          limit
        }
      });
    }

    // في حالة عدم وجود معلمات خاصة، قم بإرجاع جميع الخريجين
    console.log('Fetching all alumni');
    if (collegeId) {
      options.collegeId = parseInt(collegeId);
    }
    const result = await getAllAlumni(options);

    console.log('All alumni found:', result.stories.length);
    return NextResponse.json({
      success: true,
      data: result,
      meta: {
        count: result.stories.length,
        total: result.total,
        page,
        limit
      }
    });

  } catch (error: any) {
    console.error('Error in alumni route:', error);
    
    // تقديم رسالة خطأ بناءً على نوع الخطأ
    let errorMessage = 'Failed to fetch alumni data';
    let errorCode = 'UNKNOWN_ERROR';
    let statusCode = 500;
    
    if (error.code === 'ECONNREFUSED') {
      errorMessage = 'Database connection refused';
      errorCode = 'DB_CONNECTION_ERROR';
    } else if (error.code === 'ER_NO_SUCH_TABLE') {
      errorMessage = 'Database table not found';
      errorCode = 'DB_TABLE_ERROR';
    } else if (error.code === 'ER_BAD_FIELD_ERROR') {
      errorMessage = 'Invalid database field';
      errorCode = 'DB_FIELD_ERROR';
    } else if (error.code === 'ER_PARSE_ERROR') {
      errorMessage = 'SQL syntax error';
      errorCode = 'SQL_SYNTAX_ERROR';
    } else if (error.code === 'ER_SP_DOES_NOT_EXIST') {
      errorMessage = 'Database function not supported';
      errorCode = 'DB_FUNCTION_ERROR';
    }
    
    // ترجمة رسائل الخطأ
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'ar';
    
    if (lang === 'ar') {
      if (errorCode === 'DB_CONNECTION_ERROR') errorMessage = 'تعذر الاتصال بقاعدة البيانات';
      else if (errorCode === 'DB_TABLE_ERROR') errorMessage = 'جدول قاعدة البيانات غير موجود';
      else if (errorCode === 'DB_FIELD_ERROR') errorMessage = 'حقل قاعدة بيانات غير صالح';
      else if (errorCode === 'SQL_SYNTAX_ERROR') errorMessage = 'خطأ في بناء جملة SQL';
      else if (errorCode === 'DB_FUNCTION_ERROR') errorMessage = 'وظيفة قاعدة البيانات غير مدعومة';
      else errorMessage = 'فشل في جلب بيانات الخريجين';
    }
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      errorCode: errorCode,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: statusCode });
  }
} 