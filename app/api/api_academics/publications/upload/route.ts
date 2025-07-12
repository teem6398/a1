import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, access, constants } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { executeQuery } from '../../db';

// دالة للتحقق من نوع الملف
function isValidFileType(file: File, mediaType: string): boolean {
  const validTypes: Record<string, string[]> = {
    image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    video: ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'],
    pdf: ['application/pdf'],
    powerpoint: [
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ]
  };

  // التحقق من الصور المصغرة
  if (mediaType === 'thumbnail') {
    return validTypes.image.includes(file.type);
  }

  // التحقق من نوع الملف الأساسي
  return validTypes[mediaType]?.includes(file.type) || false;
}

// دالة للحصول على امتداد الملف
function getFileExtension(fileName: string): string {
  return fileName.split('.').pop()?.toLowerCase() || '';
}

// دالة للتحقق من وجود المجلد
async function directoryExists(dirPath: string): Promise<boolean> {
  try {
    await access(dirPath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

// دالة لإنشاء المجلد إذا لم يكن موجودًا
async function ensureDirectoryExists(dirPath: string): Promise<void> {
  console.log(`Ensuring directory exists: ${dirPath}`);
  try {
    const exists = await directoryExists(dirPath);
    if (!exists) {
      console.log(`Creating directory: ${dirPath}`);
      await mkdir(dirPath, { recursive: true });
      console.log(`Directory created: ${dirPath}`);
    } else {
      console.log(`Directory already exists: ${dirPath}`);
    }
  } catch (error: any) {
    console.error(`Error creating directory ${dirPath}:`, error);
    throw error;
  }
}

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

export async function POST(request: NextRequest) {
  console.log('Starting file upload process...');
  try {
    // استخراج البيانات من الطلب
    const formData = await request.formData();
    const mediaType = formData.get('mediaType')?.toString() || '';
    const file = formData.get('file') as File | null;
    const thumbnail = formData.get('thumbnail') as File | null;
    const teacherId = formData.get('teacherId')?.toString() || '';
    
    console.log(`Received upload request: mediaType=${mediaType}, teacherId=${teacherId}, file=${file?.name}, thumbnail=${thumbnail?.name}`);
    
    // التحقق من وجود الملف ونوع الوسائط والمعلم
    if (!file || !mediaType || !teacherId) {
      console.error('Missing required fields:', { file: !!file, mediaType, teacherId });
      return NextResponse.json(
        { error: 'الملف ونوع الوسائط ومعرف المعلم مطلوبان' },
        { status: 400 }
      );
    }
    
    // التحقق من صحة نوع الملف
    if (!isValidFileType(file, mediaType)) {
      console.error(`Invalid file type: ${file.type} for media type: ${mediaType}`);
      return NextResponse.json(
        { error: `نوع الملف غير مدعوم: ${file.type}` },
        { status: 400 }
      );
    }
    
    // الحصول على اسم المعلم لاستخدامه في اسم المجلد
    const teacherName = await getTeacherName(teacherId);
    const safeTeacherName = teacherName.replace(/[\\/:*?"<>|]/g, '_'); // استبدال الأحرف غير المسموح بها في أسماء المجلدات
    
    // استخدام المسار المحدد D:\المنشورات
    const baseDir = 'D:\\المنشورات';
    const teacherDir = join(baseDir, safeTeacherName);
    const publicationsDir = join(teacherDir, 'منشورات');
    const thumbnailsDir = join(teacherDir, 'صور_مصغرة');
    
    console.log('Directory paths:', { 
      baseDir,
      teacherDir, 
      publicationsDir, 
      thumbnailsDir 
    });
    
    // التأكد من وجود المجلدات
    await ensureDirectoryExists(baseDir);
    await ensureDirectoryExists(teacherDir);
    await ensureDirectoryExists(publicationsDir);
    await ensureDirectoryExists(thumbnailsDir);
    
    // إنشاء اسم ملف فريد
    const fileUuid = uuidv4();
    const fileExtension = getFileExtension(file.name);
    const fileName = `${fileUuid}.${fileExtension}`;
    const filePath = join(publicationsDir, fileName);
    
    console.log(`Saving file as: ${filePath}`);
    
    // تحويل الملف إلى مصفوفة بايت
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    
    // حفظ الملف
    await writeFile(filePath, fileBuffer);
    console.log(`File saved successfully: ${filePath}`);
    
    // مسار الملف النسبي للتخزين في قاعدة البيانات
    // نحتفظ بنفس تنسيق المسار النسبي للتوافق مع بقية التطبيق
    const relativeFilePath = `/Teachers/${teacherId}/publications/${fileName}`;
    
    // معالجة الصورة المصغرة إذا وجدت
    let relativeThumbnailPath = '';
    
    if (thumbnail && isValidFileType(thumbnail, 'thumbnail')) {
      const thumbnailUuid = uuidv4();
      const thumbnailExtension = getFileExtension(thumbnail.name);
      const thumbnailName = `${thumbnailUuid}.${thumbnailExtension}`;
      const thumbnailPath = join(thumbnailsDir, thumbnailName);
      
      console.log(`Saving thumbnail as: ${thumbnailPath}`);
      
      // تحويل الصورة المصغرة إلى مصفوفة بايت
      const thumbnailBuffer = Buffer.from(await thumbnail.arrayBuffer());
      
      // حفظ الصورة المصغرة
      await writeFile(thumbnailPath, thumbnailBuffer);
      console.log(`Thumbnail saved successfully: ${thumbnailPath}`);
      
      // مسار الصورة المصغرة النسبي
      relativeThumbnailPath = `/Teachers/${teacherId}/thumbnails/${thumbnailName}`;
    } else if (mediaType === 'image') {
      // إذا كان الملف صورة ولم يتم تحديد صورة مصغرة، نستخدم نفس الصورة كصورة مصغرة
      relativeThumbnailPath = relativeFilePath;
      console.log(`Using main image as thumbnail: ${relativeThumbnailPath}`);
    }
    
    console.log('Upload completed successfully');
    
    // إرجاع المسارات
    return NextResponse.json({
      success: true,
      filePath: relativeFilePath,
      thumbnailPath: relativeThumbnailPath,
      message: 'تم رفع الملف بنجاح'
    });
    
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: `حدث خطأ أثناء رفع الملف: ${error.message}` },
      { status: 500 }
    );
  }
} 