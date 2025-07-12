import { NextResponse } from 'next/server';
import { query } from '../../db';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // تحديث بيانات Hero
    if (data.hero) {
      if (data.hero.id) {
        // استخدام دالة query مباشرة مع استعلام SQL
        await query(
          'UPDATE about_hero_section SET title = ?, subtitle = ?, background_image = ? WHERE id = ?',
          [data.hero.title, data.hero.subtitle, data.hero.background_image, data.hero.id]
        );
      } else {
        await query(
          'INSERT INTO about_hero_section (title, subtitle, background_image) VALUES (?, ?, ?)',
          [data.hero.title, data.hero.subtitle, data.hero.background_image]
        );
      }
    }
    
    // تحديث بيانات المقدمة
    if (data.intro) {
      if (data.intro.id) {
        await query(
          'UPDATE about_intro_section SET section_title = ?, paragraph_1 = ?, paragraph_2 = ? WHERE id = ?',
          [data.intro.section_title, data.intro.paragraph_1, data.intro.paragraph_2, data.intro.id]
        );
      } else {
        await query(
          'INSERT INTO about_intro_section (section_title, paragraph_1, paragraph_2) VALUES (?, ?, ?)',
          [data.intro.section_title, data.intro.paragraph_1, data.intro.paragraph_2]
        );
      }
    }
    
    // تحديث بيانات أقسام الصفحة
    const sections = [
      { data: data.achievementSection, table: 'about_achievements_section' },
      { data: data.rulesSection, table: 'about_rules_section' },
      { data: data.guidelinesSection, table: 'about_guidelines_section' }
    ];
    
    for (const section of sections) {
      if (section.data) {
        if (section.data.id) {
          await query(
            `UPDATE ${section.table} SET title = ?, description = ? WHERE id = ?`,
            [section.data.title, section.data.description, section.data.id]
          );
        } else {
          await query(
            `INSERT INTO ${section.table} (title, description) VALUES (?, ?)`,
            [section.data.title, section.data.description]
          );
        }
      }
    }
    
    // تحديث الإحصائيات
    if (data.statistics && data.statistics.length > 0) {
      // حذف الإحصائيات القديمة
      await query('DELETE FROM about_statistics', []);
      
      // إضافة الإحصائيات الجديدة
      for (const stat of data.statistics) {
        await query(
          'INSERT INTO about_statistics (number, label, stat_order) VALUES (?, ?, ?)',
          [stat.number, stat.label, stat.stat_order]
        );
      }
    }
    
    // تحديث الإنجازات
    if (data.achievements && data.achievements.length > 0) {
      // حذف الإنجازات القديمة
      await query('DELETE FROM about_achievements', []);
      
      // إضافة الإنجازات الجديدة
      for (const achievement of data.achievements) {
        await query(
          'INSERT INTO about_achievements (title, text, icon, achievement_order) VALUES (?, ?, ?, ?)',
          [achievement.title, achievement.text, achievement.icon, achievement.achievement_order]
        );
      }
    }
    
    // تحديث القوانين
    if (data.rules && data.rules.length > 0) {
      // حذف القوانين القديمة
      await query('DELETE FROM about_rules', []);
      
      // إضافة القوانين الجديدة
      for (const rule of data.rules) {
        await query(
          'INSERT INTO about_rules (title, details, rule_order) VALUES (?, ?, ?)',
          [rule.title, rule.details, rule.rule_order]
        );
      }
    }
    
    // تحديث الإرشادات
    if (data.guidelines && data.guidelines.length > 0) {
      // حذف الإرشادات القديمة
      await query('DELETE FROM about_guidelines', []);
      
      // إضافة الإرشادات الجديدة
      for (const guideline of data.guidelines) {
        await query(
          'INSERT INTO about_guidelines (title, text, icon, guideline_order) VALUES (?, ?, ?, ?)',
          [guideline.title, guideline.text, guideline.icon, guideline.guideline_order]
        );
      }
    }
    
    // تحديث عناصر شريط التنقل
    if (data.navbar && data.navbar.length > 0) {
      // حذف العناصر القديمة
      await query('DELETE FROM about_navbar', []);
      
      // إضافة العناصر الجديدة
      for (const navItem of data.navbar) {
        await query(
          'INSERT INTO about_navbar (link_text, section_id, link_order) VALUES (?, ?, ?)',
          [navItem.title, navItem.section_id, navItem.navbar_order || 0]
        );
      }
    }
    
    // تحديث الميزات
    if (data.features && data.features.length > 0) {
      // حذف الميزات القديمة
      await query('DELETE FROM about_features', []);
      
      // إضافة الميزات الجديدة
      for (const feature of data.features) {
        await query(
          'INSERT INTO about_features (feature, feature_order) VALUES (?, ?)',
          [feature.feature, feature.feature_order]
        );
      }
    }
    
    // مسح الكاش لضمان تحديث البيانات في الواجهة الأمامية
    try {
      await fetch('/api/about-university/clear-cache', { method: 'POST' });
    } catch (cacheError) {
      console.warn('فشل في مسح الكاش:', cacheError);
    }
    
    return NextResponse.json({ success: true, message: 'تم تحديث البيانات بنجاح' });
  } catch (error) {
    console.error('Error updating about university data:', error);
    return NextResponse.json(
      { error: 'فشل في تحديث البيانات' },
      { status: 500 }
    );
  }
}