import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../db';
import fs from 'fs';
import path from 'path';

// دالة لتهيئة جدول about_university
export async function GET(request: NextRequest) {
  try {
    // قراءة ملف SQL
    const sqlFilePath = path.join(process.cwd(), 'app', 'api', 'api_pages', 'about', 'create_university_table.sql');
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    
    // تقسيم الملف إلى استعلامات منفصلة
    const queries = sqlContent
      .split(';')
      .filter(query => query.trim() !== '')
      .map(query => query.trim() + ';');
    
    // تنفيذ الاستعلامات
    for (const sql of queries) {
      await query(sql);
    }
    
    // التحقق من وجود البيانات
    const universityInfo = await query(
      `SELECT * FROM about_university ORDER BY id DESC LIMIT 1`
    );
    
    return NextResponse.json({
      success: true,
      message: 'تم تهيئة جدول about_university بنجاح',
      data: universityInfo
    });
  } catch (error) {
    console.error('خطأ في تهيئة جدول about_university:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'حدث خطأ أثناء تهيئة جدول about_university',
        details: error instanceof Error ? error.message : 'خطأ غير معروف'
      },
      { status: 500 }
    );
  }
} 