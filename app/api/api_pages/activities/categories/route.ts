import { NextRequest, NextResponse } from 'next/server';
import { getActivityCategories } from '../db';

// الحصول على جميع تصنيفات الأنشطة
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lang = searchParams.get('lang') || 'ar';
    
    const categories = await getActivityCategories(lang);
    
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching activity categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch activity categories' },
      { status: 500 }
    );
  }
} 