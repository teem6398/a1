import { NextRequest, NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import { join } from 'path';
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

// دالة للحصول على مسارات الملفات الخاصة بمنشور معين
async function getPublicationFilePaths(publicationId: number): Promise<{filePath: string, thumbnailPath: string, teacherId: string}> {
  try {
    const query = `
      SELECT file_path, thumbnail_path, teacher_id 
      FROM teacher_publications 
      WHERE publication_id = ?
    `;
    
    const result = await executeQuery<any[]>({ 
      query, 
      values: [publicationId] 
    });
    
    if (result && result.length > 0) {
      return {
        filePath: result[0].file_path || '',
        thumbnailPath: result[0].thumbnail_path || '',
        teacherId: result[0].teacher_id || ''
      };
    }
    
    return { filePath: '', thumbnailPath: '', teacherId: '' };
  } catch (error) {
    console.error('Error getting publication file paths:', error);
    return { filePath: '', thumbnailPath: '', teacherId: '' };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { publicationId } = body;
    
    console.log(`Delete file request for publication ID: ${publicationId}`);
    
    if (!publicationId) {
      return NextResponse.json(
        { error: 'معرف المنشور مطلوب' },
        { status: 400 }
      );
    }
    
    // الحصول على مسارات الملفات ومعرف المعلم
    const { filePath, thumbnailPath, teacherId } = await getPublicationFilePaths(publicationId);
    
    if (!filePath && !thumbnailPath) {
      console.log('No files found for this publication');
      return NextResponse.json({
        success: true,
        message: 'لا توجد ملفات لهذا المنشور'
      });
    }
    
    // الحصول على اسم المعلم
    const teacherName = await getTeacherName(teacherId);
    const safeTeacherName = teacherName.replace(/[\\/:*?"<>|]/g, '_');
    
    // حذف الملف الرئيسي
    if (filePath) {
      try {
        // استخراج اسم الملف من المسار
        const pathParts = filePath.split('/');
        const fileName = pathParts[pathParts.length - 1];
        
        // بناء المسار الكامل للملف في المسار الخارجي
        const externalFilePath = join('D:\\المنشورات', safeTeacherName, 'منشورات', fileName);
        console.log(`Attempting to delete file: ${externalFilePath}`);
        
        await unlink(externalFilePath);
        console.log(`File deleted successfully: ${externalFilePath}`);
      } catch (error) {
        console.error(`Error deleting file: ${error}`);
        // نستمر حتى لو فشل حذف الملف
      }
    }
    
    // حذف الصورة المصغرة إذا كانت مختلفة عن الملف الرئيسي
    if (thumbnailPath && thumbnailPath !== filePath) {
      try {
        // استخراج اسم الملف من المسار
        const pathParts = thumbnailPath.split('/');
        const fileName = pathParts[pathParts.length - 1];
        
        // بناء المسار الكامل للملف في المسار الخارجي
        const externalThumbnailPath = join('D:\\المنشورات', safeTeacherName, 'صور_مصغرة', fileName);
        console.log(`Attempting to delete thumbnail: ${externalThumbnailPath}`);
        
        await unlink(externalThumbnailPath);
        console.log(`Thumbnail deleted successfully: ${externalThumbnailPath}`);
      } catch (error) {
        console.error(`Error deleting thumbnail: ${error}`);
        // نستمر حتى لو فشل حذف الصورة المصغرة
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'تم حذف الملفات بنجاح'
    });
    
  } catch (error: any) {
    console.error('Error deleting files:', error);
    return NextResponse.json(
      { error: `حدث خطأ أثناء حذف الملفات: ${error.message}` },
      { status: 500 }
    );
  }
} 