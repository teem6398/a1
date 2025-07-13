import { NextRequest, NextResponse } from 'next/server';
import { query, executeParallelQueries } from '../../db';

// دالة للحصول على جميع بيانات صفحة عن الجامعة
export async function GET(request: NextRequest) {
  try {
    // استخراج معلمة اللغة من عنوان URL
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'ar';

    // تعريف الأنواع لتجنب أخطاء TypeScript
    interface HeroSection {
      id: number;
      title: string;
      title_en?: string;
      subtitle: string;
      subtitle_en?: string;
      background_image: string;
    }

    interface IntroSection {
      id: number;
      section_title: string;
      section_title_en?: string;
      paragraph_1: string;
      paragraph_1_en?: string;
      paragraph_2: string;
      paragraph_2_en?: string;
    }

    interface Statistic {
      id: number;
      number: string;
      label: string;
      label_en?: string;
      stat_order: number;
    }

    interface SectionTitle {
      id: number;
      section_title: string;
      section_title_en?: string;
    }

    interface Achievement {
      id: number;
      title: string;
      title_en?: string;
      text: string;
      text_en?: string;
      icon: string;
      achievement_order: number;
    }

    interface Rule {
      id: number;
      title: string;
      title_en?: string;
      details: string;
      details_en?: string;
      rule_order: number;
    }

    interface Guideline {
      id: number;
      title: string;
      title_en?: string;
      text: string;
      text_en?: string;
      icon: string;
      guideline_order: number;
    }

    // بيانات افتراضية للاستخدام في حالة عدم وجود الجداول
    const defaultData = {
      hero: {
        id: 1,
        title: lang === 'en' ? 'About Al-Riyada University' : 'عن جامعة الريادة',
        title_en: 'About Al-Riyada University',
        subtitle: lang === 'en' ? 'A leading educational institution' : 'مؤسسة تعليمية رائدة',
        subtitle_en: 'A leading educational institution',
        background_image: '/images/university-campus.jpg'
      } as HeroSection,
      intro: {
        id: 1,
        section_title: lang === 'en' ? 'Our University' : 'جامعتنا',
        section_title_en: 'Our University',
        paragraph_1: lang === 'en' ? 'Al-Riyada University is committed to providing high-quality education and research opportunities.' : 'تلتزم جامعة الريادة بتقديم تعليم عالي الجودة وفرص بحثية متميزة.',
        paragraph_1_en: 'Al-Riyada University is committed to providing high-quality education and research opportunities.',
        paragraph_2: lang === 'en' ? 'Our mission is to prepare students for success in their careers and to contribute to society.' : 'مهمتنا هي إعداد الطلاب للنجاح في حياتهم المهنية والمساهمة في المجتمع.',
        paragraph_2_en: 'Our mission is to prepare students for success in their careers and to contribute to society.'
      } as IntroSection,
      statistics: [
        {
          id: 1,
          number: '5000+',
          label: lang === 'en' ? 'Students' : 'طالب',
          label_en: 'Students',
          stat_order: 1
        },
        {
          id: 2,
          number: '200+',
          label: lang === 'en' ? 'Faculty Members' : 'عضو هيئة تدريس',
          label_en: 'Faculty Members',
          stat_order: 2
        },
        {
          id: 3,
          number: '30+',
          label: lang === 'en' ? 'Programs' : 'برنامج',
          label_en: 'Programs',
          stat_order: 3
        }
      ] as Statistic[],
      achievementsSection: {
        id: 1,
        section_title: lang === 'en' ? 'University Achievements' : 'إنجازات الجامعة',
        section_title_en: 'University Achievements'
      } as SectionTitle,
      achievements: [
        {
          id: 1,
          title: lang === 'en' ? 'Academic Excellence' : 'التميز الأكاديمي',
          title_en: 'Academic Excellence',
          text: lang === 'en' ? 'Recognized for outstanding academic programs and research.' : 'معترف بها لبرامجها الأكاديمية المتميزة والبحوث.',
          text_en: 'Recognized for outstanding academic programs and research.',
          icon: '🏆',
          achievement_order: 1
        }
      ] as Achievement[],
      rulesSection: {
        id: 1,
        section_title: lang === 'en' ? 'University Rules' : 'قوانين الجامعة',
        section_title_en: 'University Rules'
      } as SectionTitle,
      rules: [
        {
          id: 1,
          title: lang === 'en' ? 'Academic Integrity' : 'النزاهة الأكاديمية',
          title_en: 'Academic Integrity',
          details: lang === 'en' ? 'All students must adhere to academic integrity standards.' : 'يجب على جميع الطلاب الالتزام بمعايير النزاهة الأكاديمية.',
          details_en: 'All students must adhere to academic integrity standards.',
          rule_order: 1
        }
      ] as Rule[],
      guidelinesSection: {
        id: 1,
        section_title: lang === 'en' ? 'Student Guidelines' : 'إرشادات الطلاب',
        section_title_en: 'Student Guidelines'
      } as SectionTitle,
      guidelines: [
        {
          id: 1,
          title: lang === 'en' ? 'Registration Process' : 'عملية التسجيل',
          title_en: 'Registration Process',
          text: lang === 'en' ? 'Follow the registration guidelines to ensure proper enrollment.' : 'اتبع إرشادات التسجيل لضمان التسجيل بشكل صحيح.',
          text_en: 'Follow the registration guidelines to ensure proper enrollment.',
          icon: '📝',
          guideline_order: 1
        }
      ] as Guideline[]
    };
    
    // التحقق من وجود جدول about_university
    let tablesExist = true;
    try {
      await query(`SELECT 1 FROM about_university LIMIT 1`);
    } catch (tableError) {
      console.error('خطأ: جدول about_university غير موجود:', tableError);
      tablesExist = false;
    }

    // تحديد البيانات (من قاعدة البيانات أو البيانات الافتراضية)
    let heroData = [defaultData.hero] as HeroSection[];
    let introData = [defaultData.intro] as IntroSection[];
    let statistics = defaultData.statistics;
    let achievementsSectionData = [defaultData.achievementsSection] as SectionTitle[];
    let achievements = defaultData.achievements;
    let rulesSectionData = [defaultData.rulesSection] as SectionTitle[];
    let rules = defaultData.rules;
    let guidelinesSectionData = [defaultData.guidelinesSection] as SectionTitle[];
    let guidelines = defaultData.guidelines;
    let features: any[] = [];
    let navbarLinks: any[] = [];
    let universityInfo: any[] = [];
    
    // جلب البيانات من قاعدة البيانات فقط إذا كانت الجداول موجودة
    if (tablesExist) {
      try {
        // تجميع جميع الاستعلامات في مصفوفة واحدة
        const queries = [
          `SELECT * FROM about_hero_section ORDER BY id DESC LIMIT 1`,
          `SELECT * FROM about_intro_section ORDER BY id DESC LIMIT 1`,
          `SELECT * FROM about_statistics ORDER BY stat_order ASC`,
          `SELECT * FROM about_achievements_section ORDER BY id DESC LIMIT 1`,
          `SELECT * FROM about_achievements ORDER BY achievement_order ASC`,
          `SELECT * FROM about_rules_section ORDER BY id DESC LIMIT 1`,
          `SELECT * FROM about_rules ORDER BY rule_order ASC`,
          `SELECT * FROM about_guidelines_section ORDER BY id DESC LIMIT 1`,
          `SELECT * FROM about_guidelines ORDER BY guideline_order ASC`,
          `SELECT * FROM about_features ORDER BY feature_order ASC`,
          `SELECT * FROM about_navbar ORDER BY link_order ASC`,
          `SELECT * FROM about_university ORDER BY id DESC LIMIT 1`
        ];

        try {
          // تنفيذ جميع الاستعلامات بشكل متوازي
          const results = await executeParallelQueries(queries);
          
          // استخدام البيانات من قاعدة البيانات إذا كانت متوفرة
          // تحويل نتائج الاستعلامات إلى مصفوفات بشكل آمن
          const safeResults = results.map(result => {
            if (Array.isArray(result)) {
              return result;
            } else if (result && typeof result === 'object') {
              return [result];
            } else {
              return [];
            }
          });
          
          // تعيين البيانات من قاعدة البيانات إذا كانت متوفرة
          if (safeResults[0] && safeResults[0].length > 0) heroData = safeResults[0] as HeroSection[];
          if (safeResults[1] && safeResults[1].length > 0) introData = safeResults[1] as IntroSection[];
          if (safeResults[2] && safeResults[2].length > 0) statistics = safeResults[2] as Statistic[];
          if (safeResults[3] && safeResults[3].length > 0) achievementsSectionData = safeResults[3] as SectionTitle[];
          if (safeResults[4] && safeResults[4].length > 0) achievements = safeResults[4] as Achievement[];
          if (safeResults[5] && safeResults[5].length > 0) rulesSectionData = safeResults[5] as SectionTitle[];
          if (safeResults[6] && safeResults[6].length > 0) rules = safeResults[6] as Rule[];
          if (safeResults[7] && safeResults[7].length > 0) guidelinesSectionData = safeResults[7] as SectionTitle[];
          if (safeResults[8] && safeResults[8].length > 0) guidelines = safeResults[8] as Guideline[];
          features = safeResults[9] || [];
          navbarLinks = safeResults[10] || [];
          universityInfo = safeResults[11] || [];
        } catch (queryError) {
          console.error('خطأ في تنفيذ الاستعلامات:', queryError);
          // استمر باستخدام البيانات الافتراضية
        }
      } catch (error) {
        console.error('خطأ في جلب البيانات من قاعدة البيانات:', error);
        // استمر باستخدام البيانات الافتراضية
      }
    }

    // معالجة البيانات بناءً على اللغة المحددة
    const processHeroData = heroData.length > 0 ? {
      ...heroData[0],
      title: lang === 'en' && heroData[0].title_en ? heroData[0].title_en : heroData[0].title,
      subtitle: lang === 'en' && heroData[0].subtitle_en ? heroData[0].subtitle_en : heroData[0].subtitle
    } : defaultData.hero;

    const processIntroData = introData.length > 0 ? {
      ...introData[0],
      section_title: lang === 'en' && introData[0].section_title_en ? introData[0].section_title_en : introData[0].section_title,
      paragraph_1: lang === 'en' && introData[0].paragraph_1_en ? introData[0].paragraph_1_en : introData[0].paragraph_1,
      paragraph_2: lang === 'en' && introData[0].paragraph_2_en ? introData[0].paragraph_2_en : introData[0].paragraph_2
    } : defaultData.intro;

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
      statistics: processStatistics.length > 0 ? processStatistics : defaultData.statistics,
      achievementsSection: processAchievementsSectionData || defaultData.achievementsSection,
      achievements: processAchievements.length > 0 ? processAchievements : defaultData.achievements,
      rulesSection: processRulesSectionData || defaultData.rulesSection,
      rules: processRules.length > 0 ? processRules : defaultData.rules,
      guidelinesSection: processGuidelinesSectionData || defaultData.guidelinesSection,
      guidelines: processGuidelines.length > 0 ? processGuidelines : defaultData.guidelines,
      features: processFeatures.length > 0 ? processFeatures : [],
      navbarLinks: navbarLinks,
      universityInfo: processUniversityInfo,
      language: lang
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('خطأ في جلب بيانات صفحة عن الجامعة:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب بيانات صفحة عن الجامعة' },
      { status: 500 }
    );
  }
}
