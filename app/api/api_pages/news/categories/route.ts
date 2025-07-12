import { NextResponse } from 'next/server';
import { getNewsCategories } from '../../db';

// GET handler for /api/api_pages/news/categories
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('activeOnly') !== 'false';
    const lang = searchParams.get('lang') || 'ar';
    
    const categories = await getNewsCategories(activeOnly, lang);
    
    return NextResponse.json({ 
      data: categories,
      meta: {
        count: categories.length,
        language: lang
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'ar';
    const errorMessage = lang === 'en' ? 'Server error occurred' : 'حدث خطأ في الخادم';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 