import { NextResponse } from 'next/server';
import { 
  getAllNews, 
  getNewsById, 
  getNewsCategories, 
  getNewsAuthors, 
  searchNews 
} from '../db';

// GET handler for /api/api_pages/news
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const { searchParams } = url;
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    const lang = searchParams.get('lang') || 'ar';
    
    // If ID or slug is provided, return a single news item
    if (id || slug) {
      const identifier = id || slug || '';
      const newsItem = await getNewsById(identifier, lang);
      
      if (!newsItem) {
        const errorMessage = lang === 'en' ? 'News not found' : 'الخبر غير موجود';
        return NextResponse.json({ error: errorMessage }, { status: 404 });
      }
      
      return NextResponse.json({ data: newsItem });
    }
    
    // If search term is provided, search news
    if (search) {
      const options = {
        limit,
        offset,
        categoryId: category ? parseInt(category) : null,
        lang
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
      categoryId: category ? parseInt(category) : null,
      featured: featured ? featured === 'true' : null,
      lang
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
    const url = new URL(request.url);
    const lang = url.searchParams.get('lang') === 'en' ? 'en' : 'ar';
    const errorMessage = lang === 'en' ? 'Server error' : 'حدث خطأ في الخادم';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// POST handler for creating news (would require authentication in production)
export async function POST(request: Request) {
  const url = new URL(request.url);
  const lang = url.searchParams.get('lang') || 'ar';
  const errorMessage = lang === 'en' ? 'Unauthorized' : 'غير مصرح به';
  return NextResponse.json({ error: errorMessage }, { status: 401 });
}

// PUT handler for updating news (would require authentication in production)
export async function PUT(request: Request) {
  const url = new URL(request.url);
  const lang = url.searchParams.get('lang') || 'ar';
  const errorMessage = lang === 'en' ? 'Unauthorized' : 'غير مصرح به';
  return NextResponse.json({ error: errorMessage }, { status: 401 });
}

// DELETE handler for deleting news (would require authentication in production)
export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const lang = url.searchParams.get('lang') || 'ar';
  const errorMessage = lang === 'en' ? 'Unauthorized' : 'غير مصرح به';
  return NextResponse.json({ error: errorMessage }, { status: 401 });
} 