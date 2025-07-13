import mysql from 'mysql2/promise';

// تكوين الاتصال بقاعدة البيانات
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'alryada_university_cms',
  waitForConnections: true,
  connectionLimit: 25, // زيادة عدد الاتصالات المتزامنة
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  // إضافة إعدادات تحسين الأداء
  multipleStatements: true, // السماح بتنفيذ عدة استعلامات في نفس الوقت
  connectTimeout: 10000 // زيادة مهلة الاتصال
};

// إنشاء تجمع اتصالات
const pool = mysql.createPool(dbConfig);

// عدد محاولات إعادة الاتصال
const MAX_RETRIES = 3;

/**
 * تنفيذ استعلام في قاعدة البيانات مع إعادة المحاولة التلقائية
 * @param {string} sql - استعلام SQL
 * @param {any[]} params - معلمات الاستعلام
 * @param {number} retries - عدد محاولات إعادة المحاولة
 * @returns {Promise<any>} - نتيجة الاستعلام
 */
export async function query(sql: string, params: any[] = [], retries = MAX_RETRIES): Promise<any> {
  try {
    // الحصول على اتصال من التجمع
    const connection = await pool.getConnection();
    console.log('تم الاتصال بقاعدة البيانات بنجاح');
    
    try {
      // تنفيذ الاستعلام
      console.log('تنفيذ استعلام:', sql);
      if (params.length > 0) {
        console.log('بمعلمات:', params);
      }
      
      const [results] = await connection.query(sql, params);
      return results;
    } catch (error) {
      console.error('خطأ في تنفيذ الاستعلام:', error);
      throw error;
    } finally {
      // إعادة الاتصال إلى التجمع بغض النظر عن النتيجة
      connection.release();
    }
  } catch (error) {
    // محاولة إعادة الاتصال في حالة فشل الاتصال
    if (retries > 0) {
      console.warn(`فشل الاستعلام، إعادة المحاولة... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // انتظار ثانية قبل إعادة المحاولة
      return query(sql, params, retries - 1);
    }
    
    // سجل الخطأ وأعد رميه
    console.error('خطأ في قاعدة البيانات:', error);
    throw error;
  }
}

/**
 * التحقق من الاتصال بقاعدة البيانات
 * @returns {Promise<boolean>} - نجاح الاتصال
 */
export async function testConnection(): Promise<boolean> {
  try {
    const connection = await pool.getConnection();
    console.log('تم اختبار الاتصال بقاعدة البيانات بنجاح');
    connection.release();
    return true;
  } catch (error) {
    console.error('فشل الاتصال بقاعدة البيانات:', error);
    return false;
  }
}

/**
 * التحقق من وجود الجداول المطلوبة
 * @returns {Promise<string[]>} - قائمة بالجداول المفقودة
 */
export async function checkRequiredTables(): Promise<string[]> {
  const requiredTables = [
    'about_hero_section',
    'about_intro_section',
    'about_statistics',
    'about_achievements_section',
    'about_achievements',
    'about_rules_section',
    'about_rules',
    'about_guidelines_section',
    'about_guidelines',
    'about_navbar',
    'about_features'
  ];
  
  const missingTables: string[] = [];
  
  try {
    // التحقق من وجود قاعدة البيانات
    const connection = await pool.getConnection();
    
    try {
      // التحقق من وجود كل جدول
      for (const table of requiredTables) {
        try {
          await connection.query(`SELECT 1 FROM ${table} LIMIT 1`);
        } catch (error) {
          if (error instanceof Error && error.message.includes("doesn't exist")) {
            missingTables.push(table);
          } else {
            throw error;
          }
        }
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('خطأ أثناء التحقق من الجداول:', error);
  }
  
  return missingTables;
}

/**
 * بدء معاملة في قاعدة البيانات
 * @returns {Promise<mysql.Connection>} - اتصال المعاملة
 */
export async function startTransaction() {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  return connection;
}

/**
 * تنفيذ معاملة
 * @param {mysql.Connection} connection - اتصال المعاملة
 * @returns {Promise<void>}
 */
export async function commitTransaction(connection: mysql.PoolConnection): Promise<void> {
  try {
    await connection.commit();
  } finally {
    connection.release();
  }
}

/**
 * التراجع عن معاملة
 * @param {mysql.Connection} connection - اتصال المعاملة
 * @returns {Promise<void>}
 */
export async function rollbackTransaction(connection: mysql.PoolConnection): Promise<void> {
  try {
    await connection.rollback();
  } finally {
    connection.release();
  }
}

/**
 * تنفيذ استعلام داخل معاملة
 * @param {mysql.Connection} connection - اتصال المعاملة
 * @param {string} sql - استعلام SQL
 * @param {any[]} params - معلمات الاستعلام
 * @returns {Promise<any>} - نتيجة الاستعلام
 */
export async function queryWithinTransaction(
  connection: mysql.PoolConnection,
  sql: string,
  params: any[] = []
): Promise<any> {
  try {
    const [results] = await connection.query(sql, params);
    return results;
  } catch (error) {
    console.error('خطأ في تنفيذ الاستعلام داخل المعاملة:', error);
    throw error;
  }
}

/**
 * الحصول على جميع الأخبار مع خيارات تصفية اختيارية
 * @param {Object} options - خيارات التصفية
 * @returns {Promise<Array>} - عناصر الأخبار
 */
export async function getAllNews(options: any = {}): Promise<any[]> {
  const { 
    limit = 10, 
    offset = 0, 
    categoryId = null, 
    featured = null,
    active = true,
    orderBy = 'publish_date',
    orderDir = 'DESC',
    lang = 'ar'
  } = options;

  let sql = `
    SELECT n.*, 
           c.name as category_name, 
           c.name_en as category_name_en,
           a.name as author_name, 
           a.name_en as author_name_en,
           a.title as author_title,
           a.title_en as author_title_en,
           a.image_url as author_image
    FROM news n
    LEFT JOIN news_categories c ON n.category_id = c.id
    LEFT JOIN news_authors a ON n.author_id = a.id
    WHERE 1=1
  `;
  
  const params: any[] = [];
  
  if (categoryId !== null) {
    sql += ' AND n.category_id = ?';
    params.push(categoryId);
  }
  
  if (featured !== null) {
    sql += ' AND n.is_featured = ?';
    params.push(featured ? 1 : 0);
  }
  
  if (active !== null) {
    sql += ' AND n.is_active = ?';
    params.push(active ? 1 : 0);
  }
  
  sql += ` ORDER BY n.${orderBy} ${orderDir} LIMIT ? OFFSET ?`;
  params.push(parseInt(limit.toString()), parseInt(offset.toString()));
  
  const results = await query(sql, params);
  
  // إذا كانت اللغة الإنجليزية، قم بتحضير البيانات بالشكل المناسب
  if (lang === 'en') {
    return results.map((item: any) => prepareNewsItemForLanguage(item, 'en'));
  }
  
  return results;
}

/**
 * الحصول على خبر واحد بواسطة المعرف أو الرابط المختصر
 * @param {string|number} identifier - معرف الخبر أو الرابط المختصر
 * @param {string} lang - اللغة (ar أو en)
 * @returns {Promise<Object>} - عنصر الخبر
 */
export async function getNewsById(identifier: string | number, lang: string = 'ar'): Promise<any> {
  let sql = `
    SELECT n.*, 
           c.name as category_name, 
           c.name_en as category_name_en,
           a.name as author_name, 
           a.name_en as author_name_en,
           a.title as author_title,
           a.title_en as author_title_en,
           a.bio as author_bio,
           a.bio_en as author_bio_en,
           a.image_url as author_image
    FROM news n
    LEFT JOIN news_categories c ON n.category_id = c.id
    LEFT JOIN news_authors a ON n.author_id = a.id
    WHERE n.is_active = 1 AND 
  `;
  
  // التحقق مما إذا كان المعرف رقمًا (معرف) أو نصًا (رابط مختصر)
  const isId = !isNaN(Number(identifier));
  if (isId) {
    sql += 'n.id = ?';
  } else {
    sql += 'n.slug = ?';
  }
  
  const newsItems = await query(sql, [identifier]);
  
  if (newsItems.length === 0) {
    return null;
  }
  
  let newsItem = newsItems[0];
  
  // الحصول على الوسائط ذات الصلة
  const mediaSql = `
    SELECT * FROM news_media 
    WHERE news_id = ? AND is_active = 1
    ORDER BY display_order ASC
  `;
  
  const media = await query(mediaSql, [newsItem.id]);
  
  // زيادة عدد المشاهدات
  await query('UPDATE news SET views_count = views_count + 1 WHERE id = ?', [newsItem.id]);
  
  // إضافة وسائط الخبر
  newsItem.media = media;
  
  // إذا كانت اللغة الإنجليزية، قم بتحضير البيانات بالشكل المناسب
  if (lang === 'en') {
    newsItem = prepareNewsItemForLanguage(newsItem, 'en');
    
    if (newsItem.media && newsItem.media.length > 0) {
      newsItem.media = newsItem.media.map((mediaItem: any) => {
        return {
          ...mediaItem,
          caption: mediaItem.caption_en || mediaItem.caption
        };
      });
    }
  }
  
  return newsItem;
}

/**
 * الحصول على جميع فئات الأخبار
 * @param {boolean} activeOnly - الحصول على الفئات النشطة فقط
 * @param {string} lang - اللغة (ar أو en)
 * @returns {Promise<Array>} - الفئات
 */
export async function getNewsCategories(activeOnly: boolean = true, lang: string = 'ar'): Promise<any[]> {
  let sql = 'SELECT * FROM news_categories';
  const params: any[] = [];
  
  if (activeOnly) {
    sql += ' WHERE is_active = ?';
    params.push(1);
  }
  
  sql += ' ORDER BY display_order ASC';
  
  const categories = await query(sql, params);
  
  if (lang === 'en') {
    return categories.map((category: any) => ({
      ...category,
      name: category.name_en || category.name
    }));
  }
  
  return categories;
}

/**
 * الحصول على جميع مؤلفي الأخبار
 * @param {boolean} activeOnly - الحصول على المؤلفين النشطين فقط
 * @param {string} lang - اللغة (ar أو en)
 * @returns {Promise<Array>} - المؤلفون
 */
export async function getNewsAuthors(activeOnly: boolean = true, lang: string = 'ar'): Promise<any[]> {
  let sql = 'SELECT * FROM news_authors';
  const params: any[] = [];
  
  if (activeOnly) {
    sql += ' WHERE is_active = ?';
    params.push(1);
  }
  
  const authors = await query(sql, params);
  
  if (lang === 'en') {
    return authors.map((author: any) => ({
      ...author,
      name: author.name_en || author.name,
      title: author.title_en || author.title,
      bio: author.bio_en || author.bio
    }));
  }
  
  return authors;
}

/**
 * البحث في الأخبار بواسطة كلمة رئيسية
 * @param {string} keyword - كلمة البحث الرئيسية
 * @param {Object} options - خيارات البحث
 * @returns {Promise<Array>} - نتائج البحث
 */
export async function searchNews(keyword: string, options: any = {}): Promise<any[]> {
  const { 
    limit = 10, 
    offset = 0,
    categoryId = null,
    lang = 'ar'
  } = options;
  
  let sql = `
    SELECT n.*, 
           c.name as category_name, 
           c.name_en as category_name_en,
           a.name as author_name,
           a.name_en as author_name_en
    FROM news n
    LEFT JOIN news_categories c ON n.category_id = c.id
    LEFT JOIN news_authors a ON n.author_id = a.id
    WHERE n.is_active = 1 AND (
  `;
  
  // تعديل البحث ليشمل الحقول بالعربية والإنجليزية
  if (lang === 'en') {
    sql += `
      n.title_en LIKE ? OR 
      n.subtitle_en LIKE ? OR 
      n.content_en LIKE ? OR
      n.summary_en LIKE ? OR
      n.tags_en LIKE ?
    `;
  } else {
    sql += `
      n.title LIKE ? OR 
      n.subtitle LIKE ? OR 
      n.content LIKE ? OR
      n.summary LIKE ? OR
      n.tags LIKE ?
    `;
  }
  
  sql += ')';
  
  const searchParam = `%${keyword}%`;
  let params: any[] = [searchParam, searchParam, searchParam, searchParam, searchParam];
  
  if (categoryId !== null) {
    sql += ' AND n.category_id = ?';
    params.push(categoryId);
  }
  
  sql += ' ORDER BY n.publish_date DESC LIMIT ? OFFSET ?';
  params.push(parseInt(limit.toString()), parseInt(offset.toString()));
  
  const results = await query(sql, params);
  
  // إذا كانت اللغة الإنجليزية، قم بتحضير البيانات بالشكل المناسب
  if (lang === 'en') {
    return results.map((item: any) => prepareNewsItemForLanguage(item, 'en'));
  }
  
  return results;
}

/**
 * تحضير عنصر الأخبار للغة المحددة
 * @param {Object} newsItem - عنصر الأخبار
 * @param {string} lang - اللغة (ar أو en)
 * @returns {Object} - عنصر الأخبار المعدل
 */
function prepareNewsItemForLanguage(newsItem: any, lang: string): any {
  if (lang === 'en') {
    // استخدم النسخة الإنجليزية إذا كانت متوفرة، وإلا استخدم النسخة العربية
    return {
      ...newsItem,
      title: newsItem.title_en || newsItem.title,
      subtitle: newsItem.subtitle_en || newsItem.subtitle,
      content: newsItem.content_en || newsItem.content,
      summary: newsItem.summary_en || newsItem.summary,
      category_name: newsItem.category_name_en || newsItem.category_name,
      tags: newsItem.tags_en || newsItem.tags,
      author_name: newsItem.author_name_en || newsItem.author_name,
      author_title: newsItem.author_title_en || newsItem.author_title,
      author_bio: newsItem.author_bio_en || newsItem.author_bio
    };
  }
  
  return newsItem;
}

/**
 * الحصول على قائمة الخريجين مع كل البيانات المرتبطة
 */
export async function getAllAlumni(options: any = {}): Promise<any> {
  try {
    console.log('getAllAlumni called with options:', options);
    
    const {
      limit = 10,
      offset = 0,
      orderBy = 'a.graduation_year',
      orderDir = 'DESC',
      lang = 'ar',
      majorId = null,
      collegeId = null,
      featured = false
    } = options;

    // بناء شروط البحث
    const conditions = ['a.status = "active"'];
    const params: any[] = [];

    if (featured) {
      conditions.push('a.featured = 1');
    }
    if (majorId) {
      conditions.push('a.major_id = ?');
      params.push(majorId);
    }
    if (collegeId) {
      conditions.push('m.college_id = ?');
      params.push(collegeId);
    }

    // استعلام العدد الإجمالي
    const countSql = `
      SELECT COUNT(DISTINCT a.id) as total
      FROM alumni a
      LEFT JOIN alumni_majors m ON a.major_id = m.id
      WHERE ${conditions.join(' AND ')}
    `;

    console.log('Count SQL:', countSql);
    console.log('Count params:', params);

    // استعلام البيانات الرئيسي - بدون استخدام JSON_ARRAYAGG
    const sql = `
      SELECT 
        a.id,
        a.name_${lang} as name,
        a.graduation_year,
        a.current_position_${lang} as current_position,
        a.image,
        a.linkedin,
        a.twitter,
        a.email,
        a.featured,
        a.created_at,
        a.updated_at,
        m.name_${lang} as major_name,
        c.name_${lang} as college_name,
        comp.name_${lang} as company_name,
        comp.website as company_website,
        s.summary_${lang} as summary,
        s.story_${lang} as story,
        s.views,
        s.slug_${lang} as slug,
        s.published_at
      FROM alumni a
      LEFT JOIN alumni_majors m ON a.major_id = m.id
      LEFT JOIN alumni_colleges c ON m.college_id = c.id
      LEFT JOIN alumni_companies comp ON a.company_id = comp.id
      LEFT JOIN alumni_stories s ON a.id = s.alumni_id
      WHERE ${conditions.join(' AND ')}
      ORDER BY ${orderBy} ${orderDir}
      LIMIT ? OFFSET ?
    `;

    // إضافة معلمات الترتيب والصفحات
    const queryParams = [...params, parseInt(limit.toString()), parseInt(offset.toString())];
    console.log('Query SQL:', sql);
    console.log('Query params:', queryParams);

    // تنفيذ الاستعلامات
    try {
      const [[{ total }], stories] = await Promise.all([
        query(countSql, params), // استثناء limit و offset
        query(sql, queryParams)
      ]);

      console.log(`Found ${stories.length} stories out of ${total} total`);

      // الحصول على الإنجازات والصور لكل خريج بعملية منفصلة
      const processedStories = await Promise.all(stories.map(async (story: any) => {
        try {
          // جلب الإنجازات
          const achievementsSql = `
            SELECT id, achievement_${lang} as achievement, year, sort_order
            FROM alumni_achievements
            WHERE alumni_id = ?
            ORDER BY sort_order ASC, year DESC
          `;
          
          // جلب الصور
          const gallerySql = `
            SELECT id, image_path, caption_${lang} as caption, sort_order
            FROM alumni_images
            WHERE alumni_id = ?
            ORDER BY sort_order ASC
          `;
          
          const [achievements, gallery] = await Promise.all([
            query(achievementsSql, [story.id]),
            query(gallerySql, [story.id])
          ]);
          
          return {
            ...story,
            achievements: achievements || [],
            gallery: gallery || [],
            social_links: {
              linkedin: story.linkedin,
              twitter: story.twitter,
              email: story.email
            }
          };
        } catch (parseError) {
          console.error('Error processing story data for ID:', story.id, parseError);
          return {
            ...story,
            achievements: [],
            gallery: [],
            social_links: {
              linkedin: story.linkedin,
              twitter: story.twitter,
              email: story.email
            }
          };
        }
      }));

      return {
        stories: processedStories,
        total
      };
    } catch (queryError) {
      console.error('Error executing queries:', queryError);
      throw queryError;
    }
  } catch (error) {
    console.error('Error in getAllAlumni:', error);
    throw error;
  }
}

/**
 * الحصول على الخريجين المميزين
 */
export async function getFeaturedAlumni(options: any = {}): Promise<any> {
  try {
    console.log('getFeaturedAlumni called with options:', options);
    const result = await getAllAlumni({
      ...options,
      featured: true,
      limit: options.limit || 4
    });
    console.log('getFeaturedAlumni result:', { total: result.total, count: result.stories.length });
    return result;
  } catch (error) {
    console.error('Error in getFeaturedAlumni:', error);
    throw error;
  }
}

/**
 * الحصول على الخريجين حسب التخصص
 */
export async function getAlumniByMajor(majorId: number, options: any = {}): Promise<any> {
  return getAllAlumni({
    ...options,
    majorId
  });
}

/**
 * الحصول على تفاصيل خريج معين
 */
export async function getAlumniById(identifier: string | number, lang: string = 'ar'): Promise<any> {
  try {
    console.log('getAlumniById called with:', { identifier, lang });
    
    // التحقق مما إذا كان المعرف رقمًا أو رابط مختصر
    const isId = !isNaN(Number(identifier));
    
    // بناء الاستعلام - بدون استخدام JSON_ARRAYAGG
    const sql = `
      SELECT 
        a.id,
        a.name_${lang} as name,
        a.graduation_year,
        a.current_position_${lang} as current_position,
        a.image,
        a.linkedin,
        a.twitter,
        a.email,
        a.featured,
        a.created_at,
        a.updated_at,
        m.name_${lang} as major_name,
        c.name_${lang} as college_name,
        comp.name_${lang} as company_name,
        comp.website as company_website,
        s.summary_${lang} as summary,
        s.story_${lang} as story,
        s.views,
        s.slug_${lang} as slug,
        s.published_at
      FROM alumni a
      LEFT JOIN alumni_majors m ON a.major_id = m.id
      LEFT JOIN alumni_colleges c ON m.college_id = c.id
      LEFT JOIN alumni_companies comp ON a.company_id = comp.id
      LEFT JOIN alumni_stories s ON a.id = s.alumni_id
      WHERE a.status = "active" AND ${isId ? 'a.id = ?' : `s.slug_${lang} = ?`}
    `;

    console.log('SQL Query:', sql);
    console.log('Query params:', [identifier]);

    const results = await query(sql, [identifier]);
    console.log('Query results:', results.length > 0 ? 'Found' : 'Not found');

    if (results.length === 0) {
      return null;
    }

    // معالجة النتيجة
    const alumni = results[0];
    
    try {
      // جلب الإنجازات والصور بشكل منفصل
      const achievementsSql = `
        SELECT id, achievement_${lang} as achievement, year, sort_order
        FROM alumni_achievements
        WHERE alumni_id = ?
        ORDER BY sort_order ASC, year DESC
      `;
      
      const gallerySql = `
        SELECT id, image_path, caption_${lang} as caption, sort_order
        FROM alumni_images
        WHERE alumni_id = ?
        ORDER BY sort_order ASC
      `;
      
      const [achievements, gallery] = await Promise.all([
        query(achievementsSql, [alumni.id]),
        query(gallerySql, [alumni.id])
      ]);
    
      // تحديث عدد المشاهدات
      await query(
        'UPDATE alumni_stories SET views = views + 1 WHERE alumni_id = ?',
        [alumni.id]
      );

      return {
        ...alumni,
        achievements: achievements || [],
        gallery: gallery || [],
        social_links: {
          linkedin: alumni.linkedin,
          twitter: alumni.twitter,
          email: alumni.email
        }
      };
    } catch (error) {
      console.error('Error fetching related alumni data:', error);
      return {
        ...alumni,
        achievements: [],
        gallery: [],
        social_links: {
          linkedin: alumni.linkedin,
          twitter: alumni.twitter,
          email: alumni.email
        }
      };
    }
  } catch (error) {
    console.error('Error in getAlumniById:', error);
    throw error;
  }
}

// إضافة وظيفة للتنفيذ المتوازي للاستعلامات
export async function executeParallelQueries(queries: string[], params: any[][] = []) {
  try {
    const connection = await pool.getConnection();
    try {
      const promises = queries.map((sql, index) => {
        return connection.query(sql, params[index] || []);
      });
      const results = await Promise.all(promises);
      return results.map(result => result[0]);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('خطأ في تنفيذ الاستعلامات المتوازية:', error);
    throw error;
  }
}

// تصدير الوظائف
export default {
  query,
  testConnection,
  checkRequiredTables,
  startTransaction,
  commitTransaction,
  rollbackTransaction,
  queryWithinTransaction,
  getAllNews,
  getNewsById,
  getNewsCategories,
  getNewsAuthors,
  searchNews,
  getAllAlumni,
  getFeaturedAlumni,
  getAlumniByMajor,
  getAlumniById
}; 