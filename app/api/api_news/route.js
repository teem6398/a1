import { NextResponse } from 'next/server';
import { 
  getAllNews, 
  getNewsById, 
  getCategories, 
  getAuthors, 
  searchNews 
} from './db';

// GET handler for /api/api_news
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    const limit = searchParams.get('limit') || 10;
    const offset = searchParams.get('offset') || 0;
    
    // If ID or slug is provided, return a single news item
    if (id || slug) {
      const identifier = id || slug;
      const newsItem = await getNewsById(identifier);
      
      if (!newsItem) {
        return NextResponse.json({ error: 'الخبر غير موجود' }, { status: 404 });
      }
      
      return NextResponse.json({ data: newsItem });
    }
    
    // If search term is provided, search news
    if (search) {
      const options = {
        limit,
        offset,
        categoryId: category || null
      };
      
      const results = await searchNews(search, options);
      return NextResponse.json({ 
        data: results,
        meta: {
          count: results.length,
          limit,
          offset
        }
      });
    }
    
    // Otherwise, return a list of news
    const options = {
      limit,
      offset,
      categoryId: category || null,
      featured: featured ? featured === 'true' : null
    };
    
    const news = await getAllNews(options);
    
    return NextResponse.json({ 
      data: news,
      meta: {
        count: news.length,
        limit,
        offset
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'حدث خطأ في الخادم' }, { status: 500 });
  }
}

// POST handler for creating news (would require authentication in production)
export async function POST(request) {
  // This would be implemented with proper authentication
  return NextResponse.json({ error: 'غير مصرح به' }, { status: 401 });
}

// PUT handler for updating news (would require authentication in production)
export async function PUT(request) {
  // This would be implemented with proper authentication
  return NextResponse.json({ error: 'غير مصرح به' }, { status: 401 });
}

// DELETE handler for deleting news (would require authentication in production)
export async function DELETE(request) {
  // This would be implemented with proper authentication
  return NextResponse.json({ error: 'غير مصرح به' }, { status: 401 });
}
