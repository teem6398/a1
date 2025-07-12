import { NextResponse } from 'next/server';
import { query } from '../db';

/**
 * جلب بيانات صفحة عن الجامعة
 * @returns {Promise<NextResponse>} استجابة تحتوي على بيانات صفحة عن الجامعة
 */
export async function GET() {
  try {
    console.log('جاري جلب بيانات صفحة عن الجامعة...');
    
    // جلب بيانات قسم البطل (Hero)
    const heroResult = await query('SELECT * FROM about_hero_section LIMIT 1');
    const hero = heroResult.length > 0 ? heroResult[0] : null;
    
    // جلب بيانات المقدمة (Intro)
    const introResult = await query('SELECT * FROM about_intro_section LIMIT 1');
    const intro = introResult.length > 0 ? introResult[0] : null;
    
    // جلب بيانات الإحصائيات (Statistics)
    const statisticsResult = await query('SELECT * FROM about_statistics ORDER BY stat_order');
    const statistics = statisticsResult || [];
    
    // جلب بيانات قسم الإنجازات (Achievements Section)
    const achievementsSectionResult = await query('SELECT * FROM about_achievements_section LIMIT 1');
    const achievementsSection = achievementsSectionResult.length > 0 ? {
      id: achievementsSectionResult[0].id,
      title: achievementsSectionResult[0].section_title,
      description: '' // إضافة حقل الوصف بقيمة فارغة لتوافق مع الواجهة
    } : null;
    
    // جلب بيانات الإنجازات (Achievements)
    const achievementsResult = await query('SELECT * FROM about_achievements ORDER BY achievement_order');
    const achievements = achievementsResult || [];
    
    // جلب بيانات قسم القوانين (Rules Section)
    const rulesSectionResult = await query('SELECT * FROM about_rules_section LIMIT 1');
    const rulesSection = rulesSectionResult.length > 0 ? {
      id: rulesSectionResult[0].id,
      title: rulesSectionResult[0].section_title,
      description: '' // إضافة حقل الوصف بقيمة فارغة لتوافق مع الواجهة
    } : null;
    
    // جلب بيانات القوانين (Rules)
    const rulesResult = await query('SELECT * FROM about_rules ORDER BY rule_order');
    const rules = rulesResult || [];
    
    // جلب بيانات قسم الإرشادات (Guidelines Section)
    const guidelinesSectionResult = await query('SELECT * FROM about_guidelines_section LIMIT 1');
    const guidelinesSection = guidelinesSectionResult.length > 0 ? {
      id: guidelinesSectionResult[0].id,
      title: guidelinesSectionResult[0].section_title,
      description: '' // إضافة حقل الوصف بقيمة فارغة لتوافق مع الواجهة
    } : null;
    
    // جلب بيانات الإرشادات (Guidelines)
    const guidelinesResult = await query('SELECT * FROM about_guidelines ORDER BY guideline_order');
    const guidelines = guidelinesResult || [];
    
    // تجميع البيانات في كائن واحد
    const aboutUniversityData = {
      hero,
      intro,
      statistics,
      achievementsSection,
      achievements,
      rulesSection,
      rules,
      guidelinesSection,
      guidelines
    };
    
    console.log('تم جلب بيانات صفحة عن الجامعة بنجاح');
    return NextResponse.json(aboutUniversityData, { status: 200 });
  } catch (error) {
    console.error('خطأ في جلب بيانات صفحة عن الجامعة:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب بيانات صفحة عن الجامعة' },
      { status: 500 }
    );
  }
}

/**
 * تحديث بيانات صفحة عن الجامعة
 * @param {Request} request طلب HTTP يحتوي على بيانات التحديث
 * @returns {Promise<NextResponse>} استجابة تحتوي على نتيجة التحديث
 */
export async function PUT(request: Request) {
  try {
    console.log('بدء معالجة طلب تحديث بيانات صفحة عن الجامعة');
    const data = await request.json();
    console.log('البيانات المستلمة:', JSON.stringify(data, null, 2));
    
    // تحديث بيانات قسم البطل (Hero)
    if (data.hero) {
      if (data.hero.id) {
        // تحديث السجل الموجود
        await query(
          'UPDATE about_hero_section SET title = ?, subtitle = ?, background_image = ? WHERE id = ?',
          [data.hero.title, data.hero.subtitle, data.hero.background_image, data.hero.id]
        );
      } else {
        // إنشاء سجل جديد
        const result = await query(
          'INSERT INTO about_hero_section (title, subtitle, background_image) VALUES (?, ?, ?)',
          [data.hero.title, data.hero.subtitle, data.hero.background_image]
        );
        data.hero.id = result.insertId;
      }
    }
    
    // تحديث بيانات المقدمة (Intro)
    if (data.intro) {
      if (data.intro.id) {
        // تحديث السجل الموجود
        await query(
          'UPDATE about_intro_section SET section_title = ?, paragraph_1 = ?, paragraph_2 = ? WHERE id = ?',
          [data.intro.section_title, data.intro.paragraph_1, data.intro.paragraph_2, data.intro.id]
        );
      } else {
        // إنشاء سجل جديد
        const result = await query(
          'INSERT INTO about_intro_section (section_title, paragraph_1, paragraph_2) VALUES (?, ?, ?)',
          [data.intro.section_title, data.intro.paragraph_1, data.intro.paragraph_2]
        );
        data.intro.id = result.insertId;
      }
    }
    
    // تحديث بيانات الإحصائيات (Statistics)
    if (data.statistics && Array.isArray(data.statistics)) {
      // الحصول على جميع معرفات الإحصائيات الحالية
      const currentStatistics = await query('SELECT id FROM about_statistics');
      const currentIds = currentStatistics.map((stat: any) => stat.id);
      
      // تحديث أو إنشاء كل إحصائية
      for (const statistic of data.statistics) {
        if (statistic.id && statistic.id > 0) {
          // تحديث السجل الموجود
          await query(
            'UPDATE about_statistics SET number = ?, label = ?, stat_order = ? WHERE id = ?',
            [statistic.number || statistic.value, statistic.label || statistic.title, statistic.stat_order, statistic.id]
          );
        } else {
          // إنشاء سجل جديد
          const result = await query(
            'INSERT INTO about_statistics (number, label, stat_order) VALUES (?, ?, ?)',
            [statistic.number || statistic.value, statistic.label || statistic.title, statistic.stat_order]
          );
          statistic.id = result.insertId;
        }
      }
      
      // حذف الإحصائيات التي لم تعد موجودة
      const newIds = data.statistics.filter((stat: any) => stat.id && stat.id > 0).map((stat: any) => stat.id);
      const idsToDelete = currentIds.filter((id: number) => !newIds.includes(id));
      
      if (idsToDelete.length > 0) {
        await query(`DELETE FROM about_statistics WHERE id IN (${idsToDelete.join(',')})`);
      }
    }
    
    // تحديث بيانات قسم الإنجازات (Achievements Section)
    if (data.achievementSection) {
      if (data.achievementSection.id) {
        // تحديث السجل الموجود
        await query(
          'UPDATE about_achievements_section SET section_title = ? WHERE id = ?',
          [data.achievementSection.title, data.achievementSection.id]
        );
      } else {
        // إنشاء سجل جديد
        const result = await query(
          'INSERT INTO about_achievements_section (section_title) VALUES (?)',
          [data.achievementSection.title]
        );
        data.achievementSection.id = result.insertId;
      }
    }
    
    // تحديث بيانات الإنجازات (Achievements)
    if (data.achievements && Array.isArray(data.achievements)) {
      // الحصول على جميع معرفات الإنجازات الحالية
      const currentAchievements = await query('SELECT id FROM about_achievements');
      const currentIds = currentAchievements.map((achievement: any) => achievement.id);
      
      // تحديث أو إنشاء كل إنجاز
      for (const achievement of data.achievements) {
        if (achievement.id && achievement.id > 0) {
          // تحديث السجل الموجود
          await query(
            'UPDATE about_achievements SET title = ?, text = ?, icon = ?, achievement_order = ? WHERE id = ?',
            [achievement.title, achievement.text, achievement.icon, achievement.achievement_order, achievement.id]
          );
        } else {
          // إنشاء سجل جديد
          const result = await query(
            'INSERT INTO about_achievements (title, text, icon, achievement_order) VALUES (?, ?, ?, ?)',
            [achievement.title, achievement.text, achievement.icon, achievement.achievement_order]
          );
          achievement.id = result.insertId;
        }
      }
      
      // حذف الإنجازات التي لم تعد موجودة
      const newIds = data.achievements.filter((achievement: any) => achievement.id).map((achievement: any) => achievement.id);
      const idsToDelete = currentIds.filter((id: number) => !newIds.includes(id));
      
      if (idsToDelete.length > 0) {
        await query(`DELETE FROM about_achievements WHERE id IN (${idsToDelete.join(',')})`);
      }
    }
    
    // تحديث بيانات قسم القوانين (Rules Section)
    if (data.rulesSection) {
      if (data.rulesSection.id) {
        // تحديث السجل الموجود
        await query(
          'UPDATE about_rules_section SET section_title = ? WHERE id = ?',
          [data.rulesSection.title, data.rulesSection.id]
        );
      } else {
        // إنشاء سجل جديد
        const result = await query(
          'INSERT INTO about_rules_section (section_title) VALUES (?)',
          [data.rulesSection.title]
        );
        data.rulesSection.id = result.insertId;
      }
    }
    
    // تحديث بيانات القوانين (Rules)
    if (data.rules && Array.isArray(data.rules)) {
      // الحصول على جميع معرفات القوانين الحالية
      const currentRules = await query('SELECT id FROM about_rules');
      const currentIds = currentRules.map((rule: any) => rule.id);
      
      // تحديث أو إنشاء كل قانون
      for (const rule of data.rules) {
        if (rule.id && rule.id > 0) {
          // تحديث السجل الموجود
          await query(
            'UPDATE about_rules SET title = ?, details = ?, rule_order = ? WHERE id = ?',
            [rule.title, rule.details, rule.rule_order, rule.id]
          );
        } else {
          // إنشاء سجل جديد
          const result = await query(
            'INSERT INTO about_rules (title, details, rule_order) VALUES (?, ?, ?)',
            [rule.title, rule.details, rule.rule_order]
          );
          rule.id = result.insertId;
        }
      }
      
      // حذف القوانين التي لم تعد موجودة
      const newIds = data.rules.filter((rule: any) => rule.id).map((rule: any) => rule.id);
      const idsToDelete = currentIds.filter((id: number) => !newIds.includes(id));
      
      if (idsToDelete.length > 0) {
        await query(`DELETE FROM about_rules WHERE id IN (${idsToDelete.join(',')})`);
      }
    }
    
    // تحديث بيانات قسم الإرشادات (Guidelines Section)
    if (data.guidelinesSection) {
      if (data.guidelinesSection.id) {
        // تحديث السجل الموجود
        await query(
          'UPDATE about_guidelines_section SET section_title = ? WHERE id = ?',
          [data.guidelinesSection.title, data.guidelinesSection.id]
        );
      } else {
        // إنشاء سجل جديد
        const result = await query(
          'INSERT INTO about_guidelines_section (section_title) VALUES (?)',
          [data.guidelinesSection.title]
        );
        data.guidelinesSection.id = result.insertId;
      }
    }
    
    // تحديث بيانات الإرشادات (Guidelines)
    if (data.guidelines && Array.isArray(data.guidelines)) {
      // الحصول على جميع معرفات الإرشادات الحالية
      const currentGuidelines = await query('SELECT id FROM about_guidelines');
      const currentIds = currentGuidelines.map((guideline: any) => guideline.id);
      
      // تحديث أو إنشاء كل إرشاد
      for (const guideline of data.guidelines) {
        if (guideline.id && guideline.id > 0) {
          // تحديث السجل الموجود
          await query(
            'UPDATE about_guidelines SET title = ?, text = ?, icon = ?, guideline_order = ? WHERE id = ?',
            [guideline.title, guideline.text, guideline.icon, guideline.guideline_order, guideline.id]
          );
        } else {
          // إنشاء سجل جديد
          const result = await query(
            'INSERT INTO about_guidelines (title, text, icon, guideline_order) VALUES (?, ?, ?, ?)',
            [guideline.title, guideline.text, guideline.icon, guideline.guideline_order]
          );
          guideline.id = result.insertId;
        }
      }
      
      // حذف الإرشادات التي لم تعد موجودة
      const newIds = data.guidelines.filter((guideline: any) => guideline.id).map((guideline: any) => guideline.id);
      const idsToDelete = currentIds.filter((id: number) => !newIds.includes(id));
      
      if (idsToDelete.length > 0) {
        await query(`DELETE FROM about_guidelines WHERE id IN (${idsToDelete.join(',')})`);
      }
    }
    
    // جلب البيانات المحدثة لإرجاعها
    const updatedData = await GET();
    const responseData = await updatedData.json();
    
    console.log('تم تحديث بيانات صفحة عن الجامعة بنجاح');
    return NextResponse.json({ success: true, message: 'تم تحديث بيانات صفحة عن الجامعة بنجاح' });
  } catch (error: any) {
    console.error('خطأ في تحديث بيانات صفحة عن الجامعة:', error);
    // تحسين رسالة الخطأ لتكون أكثر تفصيلاً
    const errorMessage = error.message || 'حدث خطأ غير معروف أثناء تحديث البيانات';
    const errorCode = error.code || 'UNKNOWN_ERROR';
    console.error(`رمز الخطأ: ${errorCode}, رسالة الخطأ: ${errorMessage}`);
    
    return NextResponse.json({ 
      success: false, 
      message: errorMessage,
      code: errorCode,
      details: error.toString()
    }, { status: 500 });
  }
}
