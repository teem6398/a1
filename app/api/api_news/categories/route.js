import { NextResponse } from 'next/server';
import { getCategories } from '../db';

// GET handler for /api/api_news/categories
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('activeOnly') !== 'false';
    
    const categories = await getCategories(activeOnly);
    
    return NextResponse.json({ 
      data: categories,
      meta: {
        count: categories.length
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'حدث خطأ في الخادم' }, { status: 500 });
  }
}
