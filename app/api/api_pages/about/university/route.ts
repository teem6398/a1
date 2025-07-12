import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../db';

// دالة للحصول على جميع بيانات صفحة عن الجامعة
export async function GET(request: NextRequest) {
  try {
    // استخراج معلمة اللغة من عنوان URL
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'ar';

    // التحقق من وجود جدول about_university
    try {
      await query(`SELECT 1 FROM about_university LIMIT 1`);
    } catch (tableError) {
      console.error('خطأ: جدول about_university غير موجود:', tableError);
      return NextResponse.json(
        { 
          error: lang === 'en' ? 'Table about_university does not exist' : 'جدول about_university غير موجود',
          details: 'يرجى التأكد من تثبيت قاعدة البيانات بشكل صحيح'
        },
        { status: 500 }
      );
    }

    // جلب بيانات Hero Section
    const heroData = await query(
      `SELECT * FROM about_hero_section ORDER BY id DESC LIMIT 1`
    ) as any[];

    // جلب بيانات المقدمة (من نحن)
    const introData = await query(
      `SELECT * FROM about_intro_section ORDER BY id DESC LIMIT 1`
    ) as any[];

    // جلب الإحصائيات
    const statistics = await query(
      `SELECT * FROM about_statistics ORDER BY stat_order ASC`
    );

    // جلب عنوان قسم الإنجازات
    const achievementsSectionData = await query(
      `SELECT * FROM about_achievements_section ORDER BY id DESC LIMIT 1`
    ) as any[];

    // جلب الإنجازات
    const achievements = await query(
      `SELECT * FROM about_achievements ORDER BY achievement_order ASC`
    );

    // جلب عنوان قسم القوانين
    const rulesSectionData = await query(
      `SELECT * FROM about_rules_section ORDER BY id DESC LIMIT 1`
    ) as any[];

    // جلب القوانين
    const rules = await query(
      `SELECT * FROM about_rules ORDER BY rule_order ASC`
    );

    // جلب عنوان قسم الإرشادات
    const guidelinesSectionData = await query(
      `SELECT * FROM about_guidelines_section ORDER BY id DESC LIMIT 1`
    ) as any[];

    // جلب الإرشادات
    const guidelines = await query(
      `SELECT * FROM about_guidelines ORDER BY guideline_order ASC`
    );

    // جلب الخصائص/المميزات
    const features = await query(
      `SELECT * FROM about_features ORDER BY feature_order ASC`
    );

    // جلب روابط شريط التنقل الداخلي
    let navbarLinks = [];
    try {
      navbarLinks = await query(
        `SELECT * FROM about_navbar ORDER BY link_order ASC`
      );
    } catch (navbarError) {
      console.warn('تحذير: جدول about_navbar غير موجود أو حدث خطأ:', navbarError);
      // استمر في التنفيذ حتى لو كان هناك خطأ في جلب روابط التنقل
    }

    // جلب معلومات عامة عن الجامعة
    let universityInfo = [];
    try {
      universityInfo = await query(
        `SELECT * FROM about_university ORDER BY id DESC LIMIT 1`
      ) as any[];
    } catch (universityInfoError) {
      console.warn('تحذير: حدث خطأ أثناء جلب بيانات about_university:', universityInfoError);
      // استمر في التنفيذ حتى لو كان هناك خطأ في جلب معلومات الجامعة
    }

    // معالجة البيانات بناءً على اللغة المحددة
    const processHeroData = heroData.length > 0 ? {
      ...heroData[0],
      title: lang === 'en' && heroData[0].title_en ? heroData[0].title_en : heroData[0].title,
      subtitle: lang === 'en' && heroData[0].subtitle_en ? heroData[0].subtitle_en : heroData[0].subtitle
    } : null;

    const processIntroData = introData.length > 0 ? {
      ...introData[0],
      section_title: lang === 'en' && introData[0].section_title_en ? introData[0].section_title_en : introData[0].section_title,
      paragraph_1: lang === 'en' && introData[0].paragraph_1_en ? introData[0].paragraph_1_en : introData[0].paragraph_1,
      paragraph_2: lang === 'en' && introData[0].paragraph_2_en ? introData[0].paragraph_2_en : introData[0].paragraph_2
    } : null;

    const processStatistics = statistics.map((stat: any) => ({
      ...stat,
      label: lang === 'en' && stat.label_en ? stat.label_en : stat.label
    }));

    const processAchievementsSectionData = achievementsSectionData.length > 0 ? {
      ...achievementsSectionData[0],
      section_title: lang === 'en' && achievementsSectionData[0].section_title_en ? 
        achievementsSectionData[0].section_title_en : achievementsSectionData[0].section_title
    } : null;

    const processAchievements = achievements.map((achievement: any) => ({
      ...achievement,
      title: lang === 'en' && achievement.title_en ? achievement.title_en : achievement.title,
      text: lang === 'en' && achievement.text_en ? achievement.text_en : achievement.text
    }));

    const processRulesSectionData = rulesSectionData.length > 0 ? {
      ...rulesSectionData[0],
      section_title: lang === 'en' && rulesSectionData[0].section_title_en ? 
        rulesSectionData[0].section_title_en : rulesSectionData[0].section_title
    } : null;

    const processRules = rules.map((rule: any) => ({
      ...rule,
      title: lang === 'en' && rule.title_en ? rule.title_en : rule.title,
      details: lang === 'en' && rule.details_en ? rule.details_en : rule.details
    }));

    const processGuidelinesSectionData = guidelinesSectionData.length > 0 ? {
      ...guidelinesSectionData[0],
      section_title: lang === 'en' && guidelinesSectionData[0].section_title_en ? 
        guidelinesSectionData[0].section_title_en : guidelinesSectionData[0].section_title
    } : null;

    const processGuidelines = guidelines.map((guideline: any) => ({
      ...guideline,
      title: lang === 'en' && guideline.title_en ? guideline.title_en : guideline.title,
      text: lang === 'en' && guideline.text_en ? guideline.text_en : guideline.text
    }));

    const processFeatures = features.map((feature: any) => ({
      ...feature,
      feature: lang === 'en' && feature.feature_en ? feature.feature_en : feature.feature
    }));

    const processUniversityInfo = universityInfo.length > 0 ? {
      ...universityInfo[0],
      title: lang === 'en' && universityInfo[0].title_en ? universityInfo[0].title_en : universityInfo[0].title,
      description: lang === 'en' && universityInfo[0].description_en ? universityInfo[0].description_en : universityInfo[0].description
    } : {
      title: lang === 'en' ? 'About the University' : 'عن الجامعة',
      description: lang === 'en' ? 'Al-Riyada University is a leading educational institution.' : 'جامعة الريادة هي مؤسسة تعليمية رائدة.',
      read_more_link: '/about'
    };

    // تجميع البيانات
    const result = {
      hero: processHeroData,
      intro: processIntroData,
      statistics: processStatistics,
      achievementsSection: processAchievementsSectionData,
      achievements: processAchievements,
      rulesSection: processRulesSectionData,
      rules: processRules,
      guidelinesSection: processGuidelinesSectionData,
      guidelines: processGuidelines,
      features: processFeatures,
      navbarLinks: navbarLinks,
      universityInfo: processUniversityInfo,
      language: lang
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching about university data:', error);
    
    const errorMessage = new URL(request.url).searchParams.get('lang') === 'en' 
      ? 'An error occurred while fetching data' 
      : 'حدث خطأ أثناء جلب البيانات';
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: error instanceof Error ? error.message : 'خطأ غير معروف'
      },
      { status: 500 }
    );
  }
}
