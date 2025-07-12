import { NextRequest, NextResponse } from 'next/server';
import { query } from '../db';

interface AboutData {
  id: number;
  title: string;
  title_en: string | null;
  description: string;
  description_en: string | null;
  read_more_link: string;
}

interface Feature {
  id: number;
  feature: string;
  feature_en: string | null;
  feature_order: number;
}

interface Stat {
  id: number;
  number: string;
  label: string;
  label_en: string | null;
  stat_order: number;
}

interface President {
  id: number;
  title: string;
  title_en: string | null;
  message: string;
  message_en: string | null;
  president_name: string;
  president_name_en: string | null;
  president_title: string;
  president_title_en: string | null;
  image_path: string;
}

// دالة للحصول على بيانات قسم عن الجامعة
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'ar';

    // جلب بيانات عن الجامعة
    const aboutResult = await query(
      'SELECT id, title, title_en, description, description_en, read_more_link FROM about_university LIMIT 1'
    ) as AboutData[];

    // جلب الميزات
    const featuresResult = await query(
      'SELECT id, feature, feature_en, feature_order FROM about_features ORDER BY feature_order ASC'
    ) as Feature[];

    // جلب الإحصائيات
    const statsResult = await query(
      'SELECT id, number, label, label_en, stat_order FROM about_statistics ORDER BY stat_order ASC'
    ) as Stat[];

    // جلب بيانات رئيس الجامعة
    const presidentResult = await query(
      'SELECT id, title, title_en, message, message_en, president_name, president_name_en, president_title, president_title_en, image_path FROM president_message LIMIT 1'
    ) as President[];

    // تحويل البيانات حسب اللغة المطلوبة
    const about = aboutResult.length > 0 ? {
      id: aboutResult[0].id,
      title: lang === 'en' && aboutResult[0].title_en ? aboutResult[0].title_en : aboutResult[0].title,
      description: lang === 'en' && aboutResult[0].description_en ? aboutResult[0].description_en : aboutResult[0].description,
      read_more_link: aboutResult[0].read_more_link
    } : null;

    const features = featuresResult.map(feature => ({
      id: feature.id,
      feature: lang === 'en' && feature.feature_en ? feature.feature_en : feature.feature,
      feature_order: feature.feature_order
    }));

    const stats = statsResult.map(stat => ({
      id: stat.id,
      number: stat.number,
      label: lang === 'en' && stat.label_en ? stat.label_en : stat.label,
      stat_order: stat.stat_order
    }));

    const president = presidentResult.length > 0 ? {
      id: presidentResult[0].id,
      title: lang === 'en' && presidentResult[0].title_en ? presidentResult[0].title_en : presidentResult[0].title,
      message: lang === 'en' && presidentResult[0].message_en ? presidentResult[0].message_en : presidentResult[0].message,
      president_name: lang === 'en' && presidentResult[0].president_name_en ? presidentResult[0].president_name_en : presidentResult[0].president_name,
      president_title: lang === 'en' && presidentResult[0].president_title_en ? presidentResult[0].president_title_en : presidentResult[0].president_title,
      image_path: presidentResult[0].image_path
    } : null;

    // إعداد البيانات للرد
    const responseData = {
      about,
      features,
      stats,
      president
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('خطأ في جلب بيانات عن الجامعة:', error);
    return NextResponse.json({ error: 'حدث خطأ في جلب بيانات عن الجامعة' }, { status: 500 });
  }
}

// دالة لتحديث بيانات قسم عن الجامعة
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // التحقق من وجود البيانات المطلوبة
    if (!body.about || !body.about.title || !body.about.description) {
      return NextResponse.json(
        { error: 'البيانات المطلوبة غير مكتملة' },
        { status: 400 }
      );
    }

    // تحديث بيانات الجامعة الأساسية
    await query(
      `UPDATE about_university 
       SET title = ?, description = ?, read_more_link = ? 
       WHERE id = ?`,
      [
        body.about.title,
        body.about.description,
        body.about.read_more_link || '/about',
        body.about.id
      ]
    );

    // إذا كانت هناك ميزات، قم بتحديثها
    if (body.features && Array.isArray(body.features)) {
      // حذف الميزات القديمة
      await query(
        'DELETE FROM about_features WHERE about_id = ?',
        [body.about.id]
      );
      
      // إضافة الميزات الجديدة
      for (let i = 0; i < body.features.length; i++) {
        const feature = body.features[i];
        await query(
          'INSERT INTO about_features (feature, feature_order, about_id) VALUES (?, ?, ?)',
          [feature.feature, i + 1, body.about.id]
        );
      }
    }

    // إذا كانت هناك إحصائيات، قم بتحديثها
    if (body.stats && Array.isArray(body.stats)) {
      // حذف الإحصائيات القديمة
      await query(
        'DELETE FROM about_stats WHERE about_id = ?',
        [body.about.id]
      );
      
      // إضافة الإحصائيات الجديدة
      for (let i = 0; i < body.stats.length; i++) {
        const stat = body.stats[i];
        await query(
          'INSERT INTO about_stats (number, label, stat_order, about_id) VALUES (?, ?, ?, ?)',
          [stat.number, stat.label, i + 1, body.about.id]
        );
      }
    }

    // إذا كانت هناك بيانات لرئيس الجامعة، قم بتحديثها
    if (body.president) {
      await query(
        `UPDATE president_message 
         SET title = ?, message = ?, president_name = ?, president_title = ?, image_path = ? 
         WHERE id = ?`,
        [
          body.president.title,
          body.president.message,
          body.president.president_name,
          body.president.president_title,
          body.president.image_path,
          body.president.id
        ]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating about data:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تحديث البيانات' },
      { status: 500 }
    );
  }
} 