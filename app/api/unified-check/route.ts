import { NextRequest, NextResponse } from 'next/server';
import { query } from '../api_pages/db';
import { executeQuery } from '../api_academics/db';
import { testUnifiedConnection, getUnifiedTables } from '../../lib/unified-db';

export async function GET(request: NextRequest) {
  try {
    const checkResults = {
      timestamp: new Date().toISOString(),
      currentDatabases: {
        cms: { status: 'disconnected', tables: [] as string[], recordCounts: {} as Record<string, number | string> },
        news: { status: 'disconnected', tables: [] as string[], recordCounts: {} as Record<string, number | string> },
        academics: { status: 'disconnected', tables: [] as string[], recordCounts: {} as Record<string, number | string> }
      },
      unifiedDatabase: {
        status: 'disconnected',
        tables: [] as string[],
        ready: false
      },
      migrationPlan: {
        tablesMapping: {} as Record<string, any>,
        conflicts: [] as Array<{table: string, databases: number, recommendation: string}>,
        recommendations: [] as string[]
      }
    };

    // فحص قاعدة البيانات CMS
    try {
      const cmsTestQuery = await query('SELECT 1 as test');
      checkResults.currentDatabases.cms.status = 'connected';
      
      // الحصول على قائمة الجداول في CMS
      const cmsTables = await query('SHOW TABLES');
      checkResults.currentDatabases.cms.tables = cmsTables.map((table: any) => Object.values(table)[0]);
      
      // إحصائيات الجداول المهمة في CMS
      const importantCmsTables = ['colleges', 'majors', 'courses', 'academic_programs', 'about_university'];
      for (const tableName of importantCmsTables) {
        try {
          const count = await query(`SELECT COUNT(*) as count FROM ${tableName}`);
          checkResults.currentDatabases.cms.recordCounts[tableName] = count[0]?.count || 0;
        } catch (error) {
          checkResults.currentDatabases.cms.recordCounts[tableName] = 'جدول غير موجود';
        }
      }
    } catch (error) {
      console.error('خطأ في فحص قاعدة بيانات CMS:', error);
      checkResults.currentDatabases.cms.status = 'error';
    }
    // فحص قاعدة البيانات الأكاديمية
    try {
      const academicsTestQuery = await executeQuery({ 
        query: 'SELECT 1 as test', 
        values: [] 
      });
      checkResults.currentDatabases.academics.status = 'connected';
      
      // الحصول على قائمة الجداول في Academics
      const academicsTables = await executeQuery({ 
        query: 'SHOW TABLES', 
        values: [] 
      }) as any[];
      checkResults.currentDatabases.academics.tables = academicsTables.map((table: any) => Object.values(table)[0] as string);
      
      // إحصائيات الجداول المهمة في Academics
      const importantAcademicsTables = ['students', 'teachers', 'grades', 'batches'];
      for (const tableName of importantAcademicsTables) {
        try {
          const count = await executeQuery({ 
            query: `SELECT COUNT(*) as count FROM ${tableName}`, 
            values: [] 
          }) as any[];
          checkResults.currentDatabases.academics.recordCounts[tableName] = count[0]?.count || 0;
        } catch (error) {
          checkResults.currentDatabases.academics.recordCounts[tableName] = 'جدول غير موجود';
        }
      }
    } catch (error) {
      console.error('خطأ في فحص قاعدة البيانات الأكاديمية:', error);
      checkResults.currentDatabases.academics.status = 'error';
    }

    // فحص قاعدة البيانات الموحدة
    try {
      const unifiedConnected = await testUnifiedConnection();
      if (unifiedConnected) {
        checkResults.unifiedDatabase.status = 'connected';
        checkResults.unifiedDatabase.tables = await getUnifiedTables();
        checkResults.unifiedDatabase.ready = checkResults.unifiedDatabase.tables.length > 50; // توقع 70+ جدول
      }
    } catch (error) {
      console.error('خطأ في فحص قاعدة البيانات الموحدة:', error);
      checkResults.unifiedDatabase.status = 'not_created';
    }

    // تحليل التضارب والتوصيات
    const allCurrentTables = [
      ...checkResults.currentDatabases.cms.tables,
      ...checkResults.currentDatabases.news.tables,
      ...checkResults.currentDatabases.academics.tables
    ];

    // البحث عن الجداول المكررة
    const tableCounts: {[key: string]: number} = {};
    allCurrentTables.forEach(table => {
      tableCounts[table] = (tableCounts[table] || 0) + 1;
    });

    Object.entries(tableCounts).forEach(([tableName, count]) => {
      if (count > 1) {
        checkResults.migrationPlan.conflicts.push({
          table: tableName,
          databases: count,
          recommendation: `دمج جدول ${tableName} من ${count} قواعد بيانات`
        });
      }
    });

    // التوصيات العامة
    checkResults.migrationPlan.recommendations = [
      'إنشاء نسخة احتياطية من جميع قواعد البيانات الحالية',
      'اختبار قاعدة البيانات الموحدة في بيئة التطوير أولاً',
      'تحديث ملفات API تدريجياً بدءاً من الأساسيات',
      'مراقبة الأداء بعد كل تحديث',
      'الاحتفاظ بقواعد البيانات القديمة كنسخ احتياطية لفترة'
    ];

    return NextResponse.json({
      success: true,
      message: 'تم فحص البنية بنجاح',
      data: checkResults
    });

  } catch (error) {
    console.error('خطأ في فحص البنية:', error);
    return NextResponse.json({
      success: false,
      error: 'فشل في فحص البنية',
      details: error instanceof Error ? error.message : 'خطأ غير معروف'
    }, { status: 500 });
  }
}

// معلومات إضافية للمطور
export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();
    
    if (action === 'generate_migration_scripts') {
      // إنشاء scripts نقل البيانات
      const migrationScripts = {
        cms_to_unified: `
-- نقل بيانات CMS إلى القاعدة الموحدة
INSERT INTO alryada_university_unified.colleges SELECT * FROM alryada_university_cms.colleges;
INSERT INTO alryada_university_unified.majors SELECT * FROM alryada_university_cms.majors;
INSERT INTO alryada_university_unified.courses SELECT * FROM alryada_university_cms.courses;
INSERT INTO alryada_university_unified.academic_programs SELECT * FROM alryada_university_cms.academic_programs;
        `,
        news_to_unified: `
-- نقل بيانات الأخبار إلى القاعدة الموحدة  
INSERT INTO alryada_university_unified.news SELECT * FROM alryada_university_news.news;
INSERT INTO alryada_university_unified.news_categories SELECT * FROM alryada_university_news.news_categories;
INSERT INTO alryada_university_unified.news_authors SELECT * FROM alryada_university_news.news_authors;
INSERT INTO alryada_university_unified.alumni SELECT * FROM alryada_university_news.alumni;
        `,
        academics_to_unified: `
-- نقل البيانات الأكاديمية إلى القاعدة الموحدة
INSERT INTO alryada_university_unified.students SELECT * FROM alryada_university_academics.students;
INSERT INTO alryada_university_unified.teachers SELECT * FROM alryada_university_academics.teachers;
INSERT INTO alryada_university_unified.grades SELECT * FROM alryada_university_academics.grades;
INSERT INTO alryada_university_unified.batches SELECT * FROM alryada_university_academics.batches;
        `
      };

      return NextResponse.json({
        success: true,
        message: 'تم إنشاء scripts الهجرة',
        scripts: migrationScripts
      });
    }

    return NextResponse.json({
      success: false,
      error: 'إجراء غير مدعوم'
    }, { status: 400 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'خطأ في المعالجة',
      details: error instanceof Error ? error.message : 'خطأ غير معروف'
    }, { status: 500 });
  }
} 