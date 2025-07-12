import { NextResponse } from 'next/server';
import { query } from '../db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const context = searchParams.get('context') || 'global';
    const lang = searchParams.get('lang') || 'ar';

    // جلب عناصر القائمة مع تصفية حسب السياق (context)
    const menuItems = await query(
      'SELECT id, label, label_en, link, parent_id, display_order, context FROM navbar_items WHERE is_active = 1 AND (context = ? OR context = "global") ORDER BY display_order ASC',
      [context]
    );

    // بناء هيكل القائمة مع الترجمة
    const processedItems = menuItems.map(item => ({
      id: item.id,
      label: lang === 'en' && item.label_en ? item.label_en : item.label,
      label_en: item.label_en,
      link: item.link,
      parent_id: item.parent_id,
      display_order: item.display_order,
      context: item.context,
      children: []
    }));

    // بناء هيكل القائمة الشجري
    const rootItems = processedItems.filter(item => !item.parent_id);
    const childItems = processedItems.filter(item => item.parent_id);

    // إضافة العناصر الفرعية إلى العناصر الرئيسية
    childItems.forEach(child => {
      const parent = processedItems.find(item => item.id === child.parent_id);
      if (parent) {
        parent.children.push(child);
      }
    });

    return NextResponse.json(rootItems);
  } catch (error) {
    console.error('خطأ في جلب عناصر القائمة:', error);
    return NextResponse.json({ error: 'حدث خطأ في جلب عناصر القائمة' }, { status: 500 });
  }
}
