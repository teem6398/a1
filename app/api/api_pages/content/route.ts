import { NextResponse } from 'next/server';
import { query } from '../db';

export async function GET(request: Request) {
  try {
    // استخراج معلمة اللغة من عنوان URL
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'ar';
    
    console.log(`جاري تحميل الترجمات للغة: ${lang}`);
    
    // جلب عناصر القائمة العلوية
    const navbarItems = await fetchNavbarItems(lang);
    
    // جلب عناصر الصفحة الرئيسية
    const homeContent = await fetchHomeContent(lang);
    
    // جلب عناصر صفحة عن الجامعة
    const aboutContent = await fetchAboutContent(lang);
    
    // جلب عناصر الكليات
    const collegesContent = await fetchCollegesContent(lang);
    
    // جلب عناصر التذييل
    const footerContent = await fetchFooterContent(lang);
    
    // جلب ترجمات قسم الأخبار
    const newsContent = await fetchNewsContent(lang);
    
    // جلب ترجمات قسم الأنشطة
    const activitiesContent = await fetchActivitiesContent(lang);
    
    // تجميع جميع الترجمات في كائن واحد
    const translations = {
      ...flattenTranslations(navbarItems, 'navbar'),
      ...flattenTranslations(homeContent, 'home'),
      ...flattenTranslations(aboutContent, 'about'),
      ...flattenTranslations(collegesContent, 'colleges'),
      ...flattenTranslations(footerContent, 'footer'),
      ...flattenTranslations(newsContent, 'news'),
      ...flattenTranslations(activitiesContent, 'activities'),
    };
    
    // إعداد البيانات للرد
    const responseData = {
      language: lang,
      navbarItems,
      homeContent,
      aboutContent,
      collegesContent,
      footerContent,
      newsContent,
      activitiesContent,
      translations
    };
    
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error('خطأ في جلب بيانات المحتوى:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب بيانات المحتوى' },
      { status: 500 }
    );
  }
}

// دالة لجلب عناصر القائمة العلوية
async function fetchNavbarItems(lang: string) {
  const items = await query(
    'SELECT id, label, label_en, link, parent_id FROM navbar_items WHERE is_active = 1 ORDER BY display_order ASC'
  );
  
  return items.map((item: any) => ({
    id: item.id,
    label: lang === 'en' ? item.label_en : item.label,
    link: item.link,
    parent_id: item.parent_id
  }));
}

// دالة لجلب محتوى الصفحة الرئيسية
async function fetchHomeContent(lang: string) {
  // جلب الشرائح الرئيسية
  const slides = await query(
    'SELECT slide_id, title, title_en, description, description_en, image_path, button_text, button_text_en, button_url FROM hero_slides WHERE active = 1 ORDER BY slide_order ASC'
  );
  
  // جلب الكليات
  const faculties = await query(
    'SELECT faculty_id, name, name_en, description, description_en, image_path, icon FROM faculties WHERE active = 1 ORDER BY display_order ASC'
  );
  
  // جلب معلومات عن الجامعة
  const aboutInfo = await query(
    'SELECT id, title, title_en, description, description_en FROM about_university LIMIT 1'
  );
  
  return {
    slides: slides.map((slide: any) => ({
      id: slide.slide_id,
      title: lang === 'en' ? slide.title_en : slide.title,
      description: lang === 'en' ? slide.description_en : slide.description,
      image_path: slide.image_path,
      button_text: lang === 'en' ? slide.button_text_en : slide.button_text,
      button_url: slide.button_url
    })),
    faculties: faculties.map((faculty: any) => ({
      id: faculty.faculty_id,
      name: lang === 'en' ? faculty.name_en : faculty.name,
      description: lang === 'en' ? faculty.description_en : faculty.description,
      image_path: faculty.image_path,
      icon: faculty.icon
    })),
    about: aboutInfo.length > 0 ? {
      title: lang === 'en' ? aboutInfo[0].title_en : aboutInfo[0].title,
      description: lang === 'en' ? aboutInfo[0].description_en : aboutInfo[0].description
    } : null
  };
}

// دالة لجلب محتوى صفحة عن الجامعة
async function fetchAboutContent(lang: string) {
  // جلب بيانات قسم البطل (Hero)
  const heroResult = await query('SELECT * FROM about_hero_section LIMIT 1');
  const hero = heroResult.length > 0 ? {
    title: lang === 'en' && heroResult[0].title_en ? heroResult[0].title_en : heroResult[0].title,
    subtitle: lang === 'en' && heroResult[0].subtitle_en ? heroResult[0].subtitle_en : heroResult[0].subtitle,
    background_image: heroResult[0].background_image
  } : null;
  
  // جلب بيانات المقدمة (Intro)
  const introResult = await query('SELECT * FROM about_intro_section LIMIT 1');
  const intro = introResult.length > 0 ? {
    section_title: lang === 'en' ? introResult[0].section_title_en : introResult[0].section_title,
    paragraph_1: lang === 'en' ? introResult[0].paragraph_1_en : introResult[0].paragraph_1,
    paragraph_2: lang === 'en' ? introResult[0].paragraph_2_en : introResult[0].paragraph_2
  } : null;
  
  // جلب بيانات الإحصائيات (Statistics)
  const statisticsResult = await query('SELECT * FROM about_statistics ORDER BY stat_order');
  const statistics = statisticsResult.map((stat: any) => ({
    number: stat.number,
    label: lang === 'en' ? stat.label_en : stat.label
  }));
  
  return { hero, intro, statistics };
}

// دالة لجلب محتوى الكليات
async function fetchCollegesContent(lang: string) {
  // جلب بيانات الكليات
  const collegesResult = await query('SELECT * FROM colleges');
  const colleges = collegesResult.map((college: any) => ({
    id: college.id,
    hero_title: lang === 'en' ? college.hero_title_en : college.hero_title,
    hero_subtitle: lang === 'en' ? college.hero_subtitle_en : college.hero_subtitle,
    hero_image_url: college.hero_image_url,
    about_content: lang === 'en' ? college.about_content_en : college.about_content,
    dean_name: lang === 'en' ? college.dean_name_en : college.dean_name,
    dean_title: lang === 'en' ? college.dean_title_en : college.dean_title,
    dean_image_url: college.dean_image_url,
    dean_message: lang === 'en' ? college.dean_message_en : college.dean_message
  }));
  
  // جلب بيانات التخصصات
  const majorsResult = await query('SELECT * FROM majors ORDER BY college_id, id');
  const majors = majorsResult.map((major: any) => ({
    id: major.id,
    college_id: major.college_id,
    name: lang === 'en' ? major.name_en : major.name,
    description: lang === 'en' ? major.description_en : major.description,
    features: lang === 'en' ? major.features_en : major.features,
    icon: major.icon,
    duration_years: major.duration_years,
    students_count: major.students_count,
    link: major.link
  }));
  
  return { colleges, majors };
}

// دالة لجلب محتوى التذييل
async function fetchFooterContent(lang: string) {
  // جلب أقسام التذييل
  const sectionsResult = await query('SELECT * FROM footer_sections ORDER BY section_order');
  const sections = sectionsResult.map((section: any) => ({
    id: section.section_id,
    title: lang === 'en' ? section.title_en : section.title,
    type: section.section_type
  }));
  
  // جلب روابط التذييل
  const linksResult = await query('SELECT * FROM footer_links ORDER BY section_id, link_order');
  const links = linksResult.map((link: any) => ({
    id: link.link_id,
    section_id: link.section_id,
    title: lang === 'en' ? link.title_en : link.title,
    url: link.url
  }));
  
  // جلب معلومات حقوق النشر
  const copyrightResult = await query('SELECT * FROM footer_copyright LIMIT 1');
  const copyright = copyrightResult.length > 0 ? {
    text: lang === 'en' ? copyrightResult[0].text_en : copyrightResult[0].text,
    year: copyrightResult[0].year
  } : null;
  
  return { sections, links, copyright };
}

// دالة لجلب ترجمات قسم الأخبار
async function fetchNewsContent(lang: string) {
  // الترجمات الثابتة لقسم الأخبار
  const newsTranslations = {
    // العناوين الرئيسية
    latest_news: lang === 'en' ? 'Latest News' : 'آخر الأخبار',
    university_news: lang === 'en' ? 'University News' : 'أخبار الجامعة',
    news_description: lang === 'en' ? 'Latest news, events and announcements related to the university and its colleges' : 'آخر الأخبار والفعاليات والإعلانات المتعلقة بالجامعة وكلياتها',
    
    // حالات التحميل والأخطاء
    loading_news: lang === 'en' ? 'Loading news...' : 'جاري تحميل الأخبار...',
    loading_news_details: lang === 'en' ? 'Loading news details...' : 'جاري تحميل تفاصيل الخبر...',
    error_fetching_news: lang === 'en' ? 'Error fetching news' : 'خطأ في جلب الأخبار',
    error_fetching_categories: lang === 'en' ? 'Error fetching categories' : 'خطأ في جلب الفئات',
    error_title: lang === 'en' ? 'Sorry' : 'عذراً',
    news_not_found: lang === 'en' ? 'The requested news was not found' : 'لم يتم العثور على الخبر المطلوب',
    no_news_in_category: lang === 'en' ? 'No news in this category' : 'لا توجد أخبار في هذه الفئة',
    
    // أزرار التنقل
    read_more: lang === 'en' ? 'Read More' : 'اقرأ المزيد',
    view_all_news: lang === 'en' ? 'View All News' : 'عرض جميع الأخبار',
    previous: lang === 'en' ? 'Previous' : 'السابق',
    next: lang === 'en' ? 'Next' : 'التالي',
    go_to_news: lang === 'en' ? 'Go to news' : 'الانتقال إلى الخبر',
    back_to_news: lang === 'en' ? 'Back to news page' : 'العودة إلى صفحة الأخبار',
    
    // التنقل والمسارات
    home: lang === 'en' ? 'Home' : 'الرئيسية',
    news: lang === 'en' ? 'News' : 'الأخبار',
    
    // البحث والتصفية
    search_news_placeholder: lang === 'en' ? 'Search news...' : 'ابحث في الأخبار...',
    
    // صفحة تفاصيل الخبر
    unknown_author: lang === 'en' ? 'Unknown Author' : 'كاتب غير معروف',
    views: lang === 'en' ? 'views' : 'مشاهدة',
    tags: lang === 'en' ? 'Tags' : 'الوسوم',
    media_gallery: lang === 'en' ? 'Media Gallery' : 'معرض الوسائط',
    share_news: lang === 'en' ? 'Share News' : 'شارك الخبر',
    about_author: lang === 'en' ? 'About the Author' : 'عن الكاتب',
    more_from_author: lang === 'en' ? 'More from this author' : 'المزيد من الكاتب',
    related_news: lang === 'en' ? 'Related News' : 'أخبار ذات صلة',
    
    // أزرار المشاركة
    share_on_facebook: lang === 'en' ? 'Share on Facebook' : 'مشاركة على فيسبوك',
    share_on_twitter: lang === 'en' ? 'Share on Twitter' : 'مشاركة على تويتر',
    share_on_whatsapp: lang === 'en' ? 'Share on WhatsApp' : 'مشاركة على واتساب',
    share_via_email: lang === 'en' ? 'Share via Email' : 'مشاركة عبر البريد الإلكتروني',
  };
  
  return newsTranslations;
}

// دالة لجلب ترجمات قسم الأنشطة
async function fetchActivitiesContent(lang: string) {
  // الترجمات الثابتة لقسم الأنشطة
  const activitiesTranslations = {
    // العناوين الرئيسية
    university_activities: lang === 'en' ? 'University Activities' : 'أنشطة الجامعة',
    activities_subtitle: lang === 'en' ? 'Learn about the latest activities and events at Al-Riyadah University' : 'تعرف على أحدث الأنشطة والفعاليات في جامعة الريادة',
    
    // تصنيفات الأنشطة
    all_activities: lang === 'en' ? 'All Activities' : 'جميع الأنشطة',
    conferences: lang === 'en' ? 'Conferences' : 'مؤتمرات',
    exhibitions: lang === 'en' ? 'Exhibitions' : 'معارض',
    sports: lang === 'en' ? 'Sports' : 'رياضة',
    workshops: lang === 'en' ? 'Workshops' : 'ورش عمل',
    competitions: lang === 'en' ? 'Competitions' : 'مسابقات',
    employment: lang === 'en' ? 'Employment' : 'توظيف',
    cultural_events: lang === 'en' ? 'Cultural Events' : 'فعاليات ثقافية',
    
    // أزرار وروابط
    view_details: lang === 'en' ? 'View Details' : 'عرض التفاصيل',
    view_all_activities: lang === 'en' ? 'View All Activities' : 'عرض جميع الأنشطة',
    back_to_home: lang === 'en' ? 'Back to Home' : 'العودة للرئيسية',
    register_now: lang === 'en' ? 'Register Now' : 'سجل الآن',
    share_activity: lang === 'en' ? 'Share Activity' : 'شارك النشاط',
    
    // حالات التحميل والبحث
    loading_activities: lang === 'en' ? 'Loading activities...' : 'جاري تحميل الأنشطة...',
    search_activities: lang === 'en' ? 'Search activities...' : 'ابحث في الأنشطة...',
    no_matching_activities: lang === 'en' ? 'No matching activities found' : 'لا توجد أنشطة مطابقة للبحث',
    try_changing_filters: lang === 'en' ? 'Try changing your search criteria or category' : 'جرب تغيير معايير البحث أو التصنيف',
    
    // تفاصيل النشاط
    activity_details: lang === 'en' ? 'Activity Details' : 'تفاصيل النشاط',
    activity_date: lang === 'en' ? 'Date' : 'التاريخ',
    activity_time: lang === 'en' ? 'Time' : 'الوقت',
    activity_location: lang === 'en' ? 'Location' : 'المكان',
    activity_organizer: lang === 'en' ? 'Organizer' : 'الجهة المنظمة',
    activity_category: lang === 'en' ? 'Category' : 'التصنيف',
    
    // جدول الأنشطة
    schedule: lang === 'en' ? 'Schedule' : 'جدول الأعمال',
    schedule_empty: lang === 'en' ? 'No schedule available for this activity' : 'لا يوجد جدول أعمال متاح لهذا النشاط',
    
    // المشاركون
    participants: lang === 'en' ? 'Participants' : 'المشاركون',
    participants_empty: lang === 'en' ? 'No participants available for this activity' : 'لا يوجد مشاركون متاحون لهذا النشاط',
    
    // معرض الوسائط
    media_gallery: lang === 'en' ? 'Media Gallery' : 'معرض الوسائط',
    media_empty: lang === 'en' ? 'No media available for this activity' : 'لا توجد وسائط متاحة لهذا النشاط',
    
    // التنقل
    previous: lang === 'en' ? 'Previous' : 'السابق',
    next: lang === 'en' ? 'Next' : 'التالي',
    
    // رسائل الخطأ
    error_loading_activities: lang === 'en' ? 'Error loading activities' : 'حدث خطأ أثناء تحميل الأنشطة',
    error_loading_activity_details: lang === 'en' ? 'Error loading activity details' : 'حدث خطأ أثناء تحميل تفاصيل النشاط',
    failed_fetch_activities: lang === 'en' ? 'Failed to fetch activities' : 'فشل في جلب الأنشطة',
  };
  
  return activitiesTranslations;
}

// دالة لتسطيح كائنات الترجمة إلى كائن بسيط
function flattenTranslations(obj: any, prefix: string): Record<string, string> {
  const result: Record<string, string> = {};
  
  function flatten(object: any, currentPrefix: string) {
    if (!object) return;
    
    if (Array.isArray(object)) {
      object.forEach((item, index) => {
        flatten(item, `${currentPrefix}.${index}`);
      });
    } else if (typeof object === 'object') {
      Object.entries(object).forEach(([key, value]) => {
        if (value !== null && typeof value === 'object') {
          flatten(value, `${currentPrefix}.${key}`);
        } else if (value !== null && typeof value !== 'function') {
          result[`${currentPrefix}.${key}`] = String(value);
        }
      });
    }
  }
  
  flatten(obj, prefix);
  return result;
} 