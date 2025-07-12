import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import path from 'path';
import { executeQuery } from '../../db';

// دالة للحصول على اسم المعلم
async function getTeacherName(teacherId: string): Promise<string> {
  try {
    const query = `
      SELECT name_ar FROM teachers WHERE teacher_id = ?
    `;
    
    const result = await executeQuery<any[]>({ 
      query, 
      values: [teacherId] 
    });
    
    if (result && result.length > 0) {
      return result[0].name_ar || `معلم_${teacherId}`;
    }
    
    return `معلم_${teacherId}`;
  } catch (error) {
    console.error('Error getting teacher name:', error);
    return `معلم_${teacherId}`;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path');
    const teacherId = searchParams.get('teacherId');
    const isDownload = searchParams.get('download') === 'true';
    
    console.log(`Download request for file: ${filePath}, teacherId: ${teacherId}, download: ${isDownload}`);
    
    if (!filePath || !teacherId) {
      return NextResponse.json(
        { error: 'مسار الملف ومعرف المعلم مطلوبان' },
        { status: 400 }
      );
    }
    
    // الحصول على اسم المعلم
    const teacherName = await getTeacherName(teacherId);
    const safeTeacherName = teacherName.replace(/[\\/:*?"<>|]/g, '_');
    
    // استخراج نوع الملف (منشورات أو صور مصغرة) واسم الملف من المسار
    const pathParts = filePath.split('/');
    const fileName = pathParts[pathParts.length - 1];
    const fileType = pathParts[pathParts.length - 2].toLowerCase();
    
    // تحديد المجلد المناسب (منشورات أو صور_مصغرة)
    let folderName = 'منشورات';
    if (fileType === 'thumbnails') {
      folderName = 'صور_مصغرة';
    }
    
    // بناء المسار الكامل للملف في المسار الخارجي
    const externalFilePath = join('D:\\المنشورات', safeTeacherName, folderName, fileName);
    console.log(`Looking for file at: ${externalFilePath}`);
    
    try {
      // قراءة الملف
      const fileBuffer = await readFile(externalFilePath);
      
      // تحديد نوع المحتوى بناءً على امتداد الملف
      const ext = path.extname(fileName).toLowerCase();
      let contentType = 'application/octet-stream'; // افتراضي
      
      switch (ext) {
        case '.pdf':
          contentType = 'application/pdf';
          break;
        case '.jpg':
        case '.jpeg':
          contentType = 'image/jpeg';
          break;
        case '.png':
          contentType = 'image/png';
          break;
        case '.gif':
          contentType = 'image/gif';
          break;
        case '.webp':
          contentType = 'image/webp';
          break;
        case '.mp4':
          contentType = 'video/mp4';
          break;
        case '.webm':
          contentType = 'video/webm';
          break;
        case '.ppt':
        case '.pptx':
          contentType = 'application/vnd.ms-powerpoint';
          break;
      }
      
      // تحديد نوع Content-Disposition بناءً على ما إذا كان تنزيلًا أم عرضًا
      const contentDisposition = isDownload 
        ? `attachment; filename="${fileName}"` 
        : `inline; filename="${fileName}"`;
      
      // إنشاء استجابة مع الملف
      const response = new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': contentDisposition,
          'Cache-Control': 'public, max-age=86400' // تخزين مؤقت لمدة يوم
        }
      });
      
      return response;
      
    } catch (error) {
      console.error(`File not found: ${externalFilePath}`, error);
      
      // محاولة البحث عن الملف في المسار الافتراضي داخل المشروع
      try {
        const publicFilePath = join(process.cwd(), 'public', filePath.startsWith('/') ? filePath.substring(1) : filePath);
        console.log(`Trying default path: ${publicFilePath}`);
        
        const fileBuffer = await readFile(publicFilePath);
        
        // تحديد نوع المحتوى بناءً على امتداد الملف
        const ext = path.extname(fileName).toLowerCase();
        let contentType = 'application/octet-stream'; // افتراضي
        
        switch (ext) {
          case '.pdf':
            contentType = 'application/pdf';
            break;
          case '.jpg':
          case '.jpeg':
            contentType = 'image/jpeg';
            break;
          case '.png':
            contentType = 'image/png';
            break;
          case '.gif':
            contentType = 'image/gif';
            break;
          case '.webp':
            contentType = 'image/webp';
            break;
          case '.mp4':
            contentType = 'video/mp4';
            break;
          case '.webm':
            contentType = 'video/webm';
            break;
          case '.ppt':
          case '.pptx':
            contentType = 'application/vnd.ms-powerpoint';
            break;
        }
        
        // تحديد نوع Content-Disposition بناءً على ما إذا كان تنزيلًا أم عرضًا
        const contentDisposition = isDownload 
          ? `attachment; filename="${fileName}"` 
          : `inline; filename="${fileName}"`;
        
        // إنشاء استجابة مع الملف
        const response = new NextResponse(fileBuffer, {
          status: 200,
          headers: {
            'Content-Type': contentType,
            'Content-Disposition': contentDisposition,
            'Cache-Control': 'public, max-age=86400' // تخزين مؤقت لمدة يوم
          }
        });
        
        return response;
        
      } catch (error) {
        console.error(`File not found in default path either`, error);
        return NextResponse.json(
          { error: 'الملف غير موجود' },
          { status: 404 }
        );
      }
    }
    
  } catch (error: any) {
    console.error('Error downloading file:', error);
    return NextResponse.json(
      { error: `حدث خطأ أثناء تحميل الملف: ${error.message}` },
      { status: 500 }
    );
  }
} 