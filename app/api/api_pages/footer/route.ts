import { NextRequest, NextResponse } from 'next/server';
import { query } from '../db';

interface FooterSection {
  section_id: number;
  title: string;
  title_en: string | null;
  section_type: string;
}

interface FooterLink {
  link_id: number;
  section_id: number;
  title: string;
  title_en: string | null;
  url: string;
}

interface SocialLink {
  social_id: number;
  title: string;
  title_en: string | null;
  icon: string;
  url: string;
}

interface ContactInfo {
  id: number;
  type: string;
  value: string;
  value_en: string | null;
  icon: string;
}

interface Copyright {
  id: number;
  text: string;
  text_en: string | null;
  year: string;
}

interface ProcessedSection {
  id: number;
  title: string;
  type: string;
  content: any[];
}

// التحقق من وجود جدول في قاعدة البيانات
async function tableExists(tableName: string): Promise<boolean> {
  try {
    await query(`SELECT 1 FROM ${tableName} LIMIT 1`);
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes("doesn't exist")) {
      return false;
    }
    throw error;
  }
}

// دالة للحصول على بيانات التذييل
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'ar';

    console.log('Footer API called with language:', lang);

    // التحقق من وجود الجداول المطلوبة
    const requiredTables = ['footer_sections', 'footer_links', 'social_links', 'contact_info', 'footer_copyright'];
    const missingTables = [];
    
    for (const table of requiredTables) {
      const exists = await tableExists(table);
      if (!exists) {
        missingTables.push(table);
      }
    }
    
    if (missingTables.length > 0) {
      console.error('Missing required tables:', missingTables);
      return NextResponse.json({
        error: `Missing required tables: ${missingTables.join(', ')}`,
        sections: [],
        copyright: null
      }, { status: 200 }); // إرجاع 200 مع بيانات فارغة بدلاً من 500
    }

    // جلب أقسام التذييل
    const sections = await query(
      'SELECT section_id, title, title_en, section_type FROM footer_sections ORDER BY section_order ASC'
    ) as FooterSection[];

    console.log('Fetched sections:', sections);

    // جلب روابط التذييل
    const links = await query(
      'SELECT link_id, section_id, title, title_en, url FROM footer_links ORDER BY section_id, link_order ASC'
    ) as FooterLink[];
    
    // جلب روابط التواصل الاجتماعي
    const socialLinks = await query(
      'SELECT social_id, title, title_en, icon, url FROM social_links ORDER BY social_order ASC'
    ) as SocialLink[];

    // جلب معلومات الاتصال
    const contactInfo = await query(
      'SELECT id, type, value, value_en, icon FROM contact_info ORDER BY id ASC'
    ) as ContactInfo[];

    // جلب حقوق النشر
    const copyright = await query(
      'SELECT id, text, text_en, year FROM footer_copyright LIMIT 1'
    ) as Copyright[];

    // تحويل البيانات حسب اللغة
    const processedSections = sections.map((section: FooterSection): ProcessedSection => ({
        id: section.section_id,
      title: lang === 'en' && section.title_en ? section.title_en : section.title,
        type: section.section_type,
        content: []
    }));
      
    // إضافة المحتوى لكل قسم
    processedSections.forEach((section: ProcessedSection) => {
      if (section.type === 'links') {
        // إضافة الروابط
        section.content = links
          .filter((link: FooterLink) => link.section_id === section.id)
          .map((link: FooterLink) => ({
            link_id: link.link_id,
            title: lang === 'en' && link.title_en ? link.title_en : link.title,
            url: link.url
          }));
      } else if (section.type === 'social') {
        // إضافة روابط التواصل الاجتماعي
        section.content = socialLinks.map((link: SocialLink) => ({
          social_id: link.social_id,
          title: lang === 'en' && link.title_en ? link.title_en : link.title,
          icon: link.icon,
          url: link.url
        }));
      } else if (section.type === 'contact') {
        // إضافة معلومات الاتصال
        section.content = contactInfo.map((info: ContactInfo) => ({
          id: info.id,
          type: info.type,
          value: lang === 'en' && info.value_en ? info.value_en : info.value,
          icon: info.icon
        }));
    }
    });
    
    // تحضير بيانات حقوق النشر
    const copyrightData = copyright.length > 0 ? {
      id: copyright[0].id,
      text: lang === 'en' && copyright[0].text_en ? copyright[0].text_en : copyright[0].text,
      year: copyright[0].year
    } : null;

    // إعداد البيانات للرد
    const responseData = {
      sections: processedSections,
      copyright: copyrightData
    };
    
    console.log('Footer API response prepared successfully');
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('خطأ في جلب بيانات التذييل:', error);
    // إرجاع بيانات فارغة مع رمز حالة 200 بدلاً من 500 لتجنب توقف التطبيق
    return NextResponse.json({
      error: `حدث خطأ في جلب بيانات التذييل: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`,
      sections: [],
      copyright: null
    }, { status: 200 });
  }
}

// دالة لتحديث بيانات التذييل
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // التحقق من البيانات المطلوبة
    if (!body.sections || !Array.isArray(body.sections)) {
      return NextResponse.json(
        { error: 'البيانات المطلوبة غير مكتملة' },
        { status: 400 }
      );
    }
    
    // تحديث كل قسم
    for (const section of body.sections) {
      // التحقق من وجود القسم
      const sectionExists = await query(
        `SELECT * FROM footer_sections WHERE section_id = ?`,
        [section.id]
      ) as any[];
      
      if (!sectionExists || sectionExists.length === 0) {
        continue; // تخطي هذا القسم إذا لم يكن موجوداً
      }
      
      // تحديث عنوان القسم إذا تم تغييره
      if (section.title) {
        await query(
          `UPDATE footer_sections SET title = ? WHERE section_id = ?`,
          [section.title, section.id]
        );
      }
      
      // تحديث محتوى القسم حسب نوعه
      if (section.content && Array.isArray(section.content)) {
        switch (section.type) {
          case 'links':
            // حذف الروابط القديمة
            await query(
              `DELETE FROM footer_links WHERE section_id = ?`,
              [section.id]
            );
            
            // إضافة الروابط الجديدة
            for (let i = 0; i < section.content.length; i++) {
              const link = section.content[i];
              await query(
                `INSERT INTO footer_links (section_id, title, url, link_order) VALUES (?, ?, ?, ?)`,
                [section.id, link.title, link.url, i + 1]
              );
            }
            break;
            
          case 'social':
            // حذف روابط التواصل الاجتماعي القديمة
            await query(
              `DELETE FROM social_links WHERE section_id = ?`,
              [section.id]
            );
            
            // إضافة روابط التواصل الاجتماعي الجديدة
            for (const socialLink of section.content) {
              await query(
                `INSERT INTO social_links (section_id, platform, url, icon) VALUES (?, ?, ?, ?)`,
                [section.id, socialLink.platform, socialLink.url, socialLink.icon]
              );
            }
            break;
            
          case 'contact':
            // حذف معلومات الاتصال القديمة
            await query(
              `DELETE FROM contact_info WHERE section_id = ?`,
              [section.id]
            );
            
            // إضافة معلومات الاتصال الجديدة
            for (const contactInfo of section.content) {
              await query(
                `INSERT INTO contact_info (section_id, type, value, icon) VALUES (?, ?, ?, ?)`,
                [section.id, contactInfo.type, contactInfo.value, contactInfo.icon]
              );
            }
            break;
        }
      }
    }
    
    // تحديث بيانات حقوق النشر إذا كانت موجودة
    if (body.copyright) {
      const copyrightExists = await query(
        `SELECT * FROM footer_copyright LIMIT 1`
      ) as any[];
      
      if (copyrightExists && copyrightExists.length > 0) {
        await query(
          `UPDATE footer_copyright SET text = ?, year = ? WHERE id = ?`,
          [body.copyright.text, body.copyright.year, copyrightExists[0].id]
        );
      } else {
        await query(
          `INSERT INTO footer_copyright (text, year) VALUES (?, ?)`,
          [body.copyright.text, body.copyright.year]
        );
      }
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating footer data:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تحديث بيانات التذييل' },
      { status: 500 }
    );
  }
} 