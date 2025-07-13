import { NextResponse } from 'next/server';
import { getAllNews, getNewsById, getNewsCategories, getNewsAuthors, searchNews } from '../db';

// تخزين مؤقت للأخبار
const newsCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 دقائق

// دالة للحصول على الأخبار من التخزين المؤقت أو قاعدة البيانات
async function getCachedNews(options: any) {
  const cacheKey = JSON.stringify(options);
  const cachedData = newsCache.get(cacheKey);
  
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
    return cachedData.data;
  }
  
  const data = await getAllNews(options);
  newsCache.set(cacheKey, {
    data,
    timestamp: Date.now()
  });
  
  return data;
}

// GET handler for /api/api_pages/news
export async function GET(request: Request) {
  const url = new URL(request.url);
  const { searchParams } = url;
  const lang = searchParams.get('lang') || 'ar';
  
  try {
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    // If ID or slug is provided, return a single news item
    if (id || slug) {
      const identifier = id || slug || '';
      const cacheKey = `news_${identifier}_${lang}`;
      const cachedItem = newsCache.get(cacheKey);
      
      if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_DURATION) {
        return NextResponse.json({ data: cachedItem.data });
      }
      
      const newsItem = await getNewsById(identifier, lang);
      
      if (!newsItem) {
        const errorMessage = lang === 'en' ? 'News not found' : 'الخبر غير موجود';
        return NextResponse.json({ error: errorMessage }, { status: 404 });
      }
      
      newsCache.set(cacheKey, {
        data: newsItem,
        timestamp: Date.now()
      });
      
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
    
    const news = await getCachedNews(options);
    
    return NextResponse.json({ 
      data: news,
      meta: {
        count: news.length,
        limit,
        offset
      }
    });
    
  } catch (error) {
    console.error('Error fetching news:', error);
    const errorMessage = lang === 'en' ? 'Error fetching news' : 'حدث خطأ في جلب الأخبار';
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