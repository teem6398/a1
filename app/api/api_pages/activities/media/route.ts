import { NextRequest, NextResponse } from 'next/server';
import { addActivityMedia } from '../db';

// إضافة وسائط جديدة للنشاط
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // التحقق من وجود البيانات المطلوبة
    if (!body.activity_id || !body.media_type || !body.file_path) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const media = await addActivityMedia(body);
    
    return NextResponse.json({ success: true, data: media }, { status: 201 });
  } catch (error) {
    console.error('Error adding activity media:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add activity media' },
      { status: 500 }
    );
  }
} 