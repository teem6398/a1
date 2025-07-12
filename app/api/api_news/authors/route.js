import { NextResponse } from 'next/server';
import { getAuthors } from '../db';

// GET handler for /api/api_news/authors
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('activeOnly') !== 'false';
    
    const authors = await getAuthors(activeOnly);
    
    return NextResponse.json({ 
      data: authors,
      meta: {
        count: authors.length
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'حدث خطأ في الخادم' }, { status: 500 });
  }
}
