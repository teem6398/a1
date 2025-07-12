/**
 * تعريف أسماء الأعمدة في قاعدة البيانات وتراكيب البيانات
 * هذا الملف يعمل كمحول بين واجهة المستخدم وقاعدة البيانات
 */

// تعريف هيكل جدول about_navbar
export const aboutNavbarFields = {
  id: 'id',
  title: 'link_text',     // في الواجهة الأمامية: title، في قاعدة البيانات: link_text
  sectionId: 'section_id',
  order: 'link_order'     // في الواجهة الأمامية: navbar_order، في قاعدة البيانات: link_order
};

/**
 * تحويل البيانات من الواجهة الأمامية إلى تنسيق قاعدة البيانات
 */
export function mapToDbNavbarItem(frontendItem: any) {
  return {
    id: frontendItem.id,
    [aboutNavbarFields.title]: frontendItem.title,
    [aboutNavbarFields.sectionId]: frontendItem.section_id,
    [aboutNavbarFields.order]: frontendItem.navbar_order
  };
}

/**
 * تحويل البيانات من قاعدة البيانات إلى تنسيق الواجهة الأمامية
 */
export function mapFromDbNavbarItem(dbItem: any) {
  return {
    id: dbItem.id,
    title: dbItem[aboutNavbarFields.title],
    section_id: dbItem[aboutNavbarFields.sectionId],
    navbar_order: dbItem[aboutNavbarFields.order]
  };
}

// تحويل مجموعة بيانات كاملة
export function mapNavbarItems(items: any[], toDatabase: boolean = false) {
  if (toDatabase) {
    return items.map(item => mapToDbNavbarItem(item));
  } else {
    return items.map(item => mapFromDbNavbarItem(item));
  }
} 
 