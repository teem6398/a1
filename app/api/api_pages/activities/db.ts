import mysql from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';
import db from '../db';

// واجهات البيانات
export interface ActivityCategory extends RowDataPacket {
  id: number;
  name_ar: string;
  name_en: string;
  description_ar?: string;
  description_en?: string;
  color_code: string;
  icon?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Activity extends RowDataPacket {
  id: number;
  title_ar: string;
  title_en: string;
  slug: string;
  description_ar: string;
  description_en: string;
  content_ar?: string;
  content_en?: string;
  location_ar?: string;
  location_en?: string;
  start_date: Date;
  end_date?: Date;
  category_id?: number;
  organizer_ar?: string;
  organizer_en?: string;
  featured_image?: string;
  status: 'draft' | 'published' | 'archived' | 'cancelled';
  contact_info?: string;
  created_by?: number;
  created_at: Date;
  updated_at: Date;
  // حقول إضافية للعرض
  category_name_ar?: string;
  category_name_en?: string;
  category_color?: string;
  media?: ActivityMedia[];
  participants?: ActivityParticipant[];
  schedule?: ActivitySchedule[];
}

export interface ActivityMedia extends RowDataPacket {
  id: number;
  activity_id: number;
  media_type: 'image' | 'video' | 'document';
  file_path: string;
  title_ar?: string;
  title_en?: string;
  description_ar?: string;
  description_en?: string;
  is_featured: boolean;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface ActivityParticipant extends RowDataPacket {
  id: number;
  activity_id: number;
  name_ar: string;
  name_en: string;
  role_ar?: string;
  role_en?: string;
  bio_ar?: string;
  bio_en?: string;
  image?: string;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface ActivitySchedule extends RowDataPacket {
  id: number;
  activity_id: number;
  title_ar: string;
  title_en: string;
  description_ar?: string;
  description_en?: string;
  start_time: Date;
  end_time?: Date;
  location_ar?: string;
  location_en?: string;
  presenter_ar?: string;
  presenter_en?: string;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

// دالة للحصول على جميع تصنيفات الأنشطة
export async function getActivityCategories(lang: string = 'ar') {
  try {
    const rows = await db.query(
      `SELECT id, 
        name_${lang} as name, 
        description_${lang} as description, 
        color_code, 
        icon 
      FROM activity_categories 
      ORDER BY id ASC`
    );
    return rows;
  } catch (error) {
    console.error('Error in getActivityCategories:', error);
    throw error;
  }
}

// دالة للحصول على جميع الأنشطة
export async function getActivities(
  lang: string = 'ar',
  limit: number = 10,
  offset: number = 0,
  categoryId?: number,
  status: string = 'published',
  searchQuery?: string
) {
  try {
    let query = `
      SELECT 
        a.id, 
        a.title_${lang} as title, 
        a.slug,
        a.description_${lang} as description, 
        a.location_${lang} as location, 
        a.start_date, 
        a.end_date, 
        a.organizer_${lang} as organizer, 
        a.featured_image, 
        a.status,
        c.id as category_id, 
        c.name_${lang} as category_name, 
        c.color_code as category_color,
        (SELECT file_path FROM activity_media WHERE activity_id = a.id AND is_featured = 1 LIMIT 1) as featured_media
      FROM activities a
      LEFT JOIN activity_categories c ON a.category_id = c.id
      WHERE 1=1
    `;

    const params: any[] = [];

    if (status) {
      query += ` AND a.status = ?`;
      params.push(status);
    }

    if (categoryId) {
      query += ` AND a.category_id = ?`;
      params.push(categoryId);
    }

    if (searchQuery) {
      query += ` AND (a.title_${lang} LIKE ? OR a.description_${lang} LIKE ?)`;
      params.push(`%${searchQuery}%`, `%${searchQuery}%`);
    }

    query += ` ORDER BY a.start_date DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const rows = await db.query(query, params);
    return rows;
  } catch (error) {
    console.error('Error in getActivities:', error);
    throw error;
  }
}

// دالة للحصول على نشاط واحد بواسطة المعرف أو الرابط المختصر
export async function getActivity(idOrSlug: string | number, lang: string = 'ar') {
  try {
    const param = typeof idOrSlug === 'number' ? idOrSlug : idOrSlug;
    const paramType = typeof idOrSlug === 'number' ? 'id' : 'slug';
    
    const activities = await db.query(
      `SELECT 
        a.*, 
        c.name_${lang} as category_name, 
        c.color_code as category_color
      FROM activities a
      LEFT JOIN activity_categories c ON a.category_id = c.id
      WHERE a.${paramType} = ?`,
      [param]
    );

    if (!activities || activities.length === 0) {
      return null;
    }

    const activity = activities[0];

    // استعلام للحصول على وسائط النشاط
    const media = await db.query(
      `SELECT * FROM activity_media WHERE activity_id = ? ORDER BY sort_order ASC`,
      [activity.id]
    );
    activity.media = media;

    // استعلام للحصول على المشاركين في النشاط
    const participants = await db.query(
      `SELECT * FROM activity_participants WHERE activity_id = ? ORDER BY sort_order ASC`,
      [activity.id]
    );
    activity.participants = participants;

    // استعلام للحصول على جدول أعمال النشاط
    const schedule = await db.query(
      `SELECT * FROM activity_schedule WHERE activity_id = ? ORDER BY start_time ASC, sort_order ASC`,
      [activity.id]
    );
    activity.schedule = schedule;

    return activity;
  } catch (error) {
    console.error('Error in getActivity:', error);
    throw error;
  }
}

// دالة لإنشاء نشاط جديد
export async function createActivity(activity: Partial<Activity>) {
  const connection = await db.startTransaction();
  
  try {
    const [result] = await db.queryWithinTransaction(
      connection,
      `INSERT INTO activities (
        title_ar, title_en, slug, description_ar, description_en, 
        content_ar, content_en, location_ar, location_en, 
        start_date, end_date, category_id, organizer_ar, organizer_en, 
        featured_image, status, contact_info, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        activity.title_ar, activity.title_en, activity.slug, 
        activity.description_ar, activity.description_en,
        activity.content_ar, activity.content_en, 
        activity.location_ar, activity.location_en,
        activity.start_date, activity.end_date, 
        activity.category_id, activity.organizer_ar, 
        activity.organizer_en, activity.featured_image, 
        activity.status || 'draft', activity.contact_info, 
        activity.created_by
      ]
    );
    
    await db.commitTransaction(connection);
    return { id: result.insertId, ...activity };
  } catch (error) {
    await db.rollbackTransaction(connection);
    throw error;
  }
}

// دالة لتحديث نشاط
export async function updateActivity(id: number, activity: Partial<Activity>) {
  const connection = await db.startTransaction();
  
  try {
    await db.queryWithinTransaction(
      connection,
      `UPDATE activities SET
        title_ar = ?, title_en = ?, slug = ?, description_ar = ?, description_en = ?,
        content_ar = ?, content_en = ?, location_ar = ?, location_en = ?,
        start_date = ?, end_date = ?, category_id = ?, organizer_ar = ?, organizer_en = ?,
        featured_image = ?, status = ?, contact_info = ?
      WHERE id = ?`,
      [
        activity.title_ar, activity.title_en, activity.slug,
        activity.description_ar, activity.description_en,
        activity.content_ar, activity.content_en,
        activity.location_ar, activity.location_en,
        activity.start_date, activity.end_date,
        activity.category_id, activity.organizer_ar, activity.organizer_en,
        activity.featured_image, activity.status, activity.contact_info,
        id
      ]
    );
    
    await db.commitTransaction(connection);
    return { id, ...activity };
  } catch (error) {
    await db.rollbackTransaction(connection);
    throw error;
  }
}

// دالة لإضافة وسائط للنشاط
export async function addActivityMedia(media: Partial<ActivityMedia>) {
  try {
    const result = await db.query(
      `INSERT INTO activity_media (
        activity_id, media_type, file_path, title_ar, title_en,
        description_ar, description_en, is_featured, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        media.activity_id, media.media_type, media.file_path,
        media.title_ar, media.title_en, media.description_ar,
        media.description_en, media.is_featured || false,
        media.sort_order || 0
      ]
    );
    
    return { id: result.insertId, ...media };
  } catch (error) {
    console.error('Error in addActivityMedia:', error);
    throw error;
  }
}

// دالة لحذف نشاط
export async function deleteActivity(id: number) {
  const connection = await db.startTransaction();
  
  try {
    await db.queryWithinTransaction(connection, 'DELETE FROM activities WHERE id = ?', [id]);
    await db.commitTransaction(connection);
    return { success: true };
  } catch (error) {
    await db.rollbackTransaction(connection);
    throw error;
  }
}

// دالة لحذف وسائط النشاط
export async function deleteActivityMedia(id: number) {
  try {
    await db.query('DELETE FROM activity_media WHERE id = ?', [id]);
    return { success: true };
  } catch (error) {
    console.error('Error in deleteActivityMedia:', error);
    throw error;
  }
}

// دالة لإضافة مشارك في النشاط
export async function addActivityParticipant(participant: Partial<ActivityParticipant>) {
  try {
    const result = await db.query(
      `INSERT INTO activity_participants (
        activity_id, name_ar, name_en, role_ar, role_en,
        bio_ar, bio_en, image, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        participant.activity_id, participant.name_ar, participant.name_en,
        participant.role_ar, participant.role_en, participant.bio_ar,
        participant.bio_en, participant.image, participant.sort_order || 0
      ]
    );
    
    return { id: result.insertId, ...participant };
  } catch (error) {
    console.error('Error in addActivityParticipant:', error);
    throw error;
  }
}

// دالة لإضافة عنصر في جدول أعمال النشاط
export async function addActivityScheduleItem(scheduleItem: Partial<ActivitySchedule>) {
  try {
    const result = await db.query(
      `INSERT INTO activity_schedule (
        activity_id, title_ar, title_en, description_ar, description_en,
        start_time, end_time, location_ar, location_en,
        presenter_ar, presenter_en, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        scheduleItem.activity_id, scheduleItem.title_ar, scheduleItem.title_en,
        scheduleItem.description_ar, scheduleItem.description_en,
        scheduleItem.start_time, scheduleItem.end_time,
        scheduleItem.location_ar, scheduleItem.location_en,
        scheduleItem.presenter_ar, scheduleItem.presenter_en,
        scheduleItem.sort_order || 0
      ]
    );
    
    return { id: result.insertId, ...scheduleItem };
  } catch (error) {
    console.error('Error in addActivityScheduleItem:', error);
    throw error;
  }
} 