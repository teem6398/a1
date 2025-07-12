import { NextResponse } from 'next/server';
import { getNewsAuthors } from '../../db';

// GET handler for /api/api_pages/news/authors
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('activeOnly') !== 'false';
    const lang = searchParams.get('lang') || 'ar';
    
    const authors = await getNewsAuthors(activeOnly, lang);
    
    return NextResponse.json({ 
      data: authors,
      meta: {
        count: authors.length,
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