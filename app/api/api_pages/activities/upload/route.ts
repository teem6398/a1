import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

// دالة لتحميل الملفات
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded' },
        { status: 400 }
      );
    }
    
    // التحقق من نوع الملف
    const fileType = file.type.split('/')[0]; // image, video, application
    let uploadDir = '';
    
    if (fileType === 'image') {
      uploadDir = 'activities';
    } else if (fileType === 'video') {
      uploadDir = 'activities/videos';
    } else {
      uploadDir = 'activities/documents';
    }
    
    // إنشاء اسم فريد للملف
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    
    // تحديد مسار الملف
    const publicDir = join(process.cwd(), 'public', 'image', uploadDir);
    const filePath = join(publicDir, fileName);
    
    // قراءة محتوى الملف
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);
    
    // حفظ الملف
    await writeFile(filePath, buffer);
    
    // إنشاء مسار الملف للاستخدام في قاعدة البيانات
    const dbFilePath = `/image/${uploadDir}/${fileName}`;
    
    return NextResponse.json({
      success: true,
      data: {
        file_path: dbFilePath,
        file_name: fileName,
        file_type: file.type,
        file_size: file.size
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload file' },
      { status: 500 }
    );
  }
} 