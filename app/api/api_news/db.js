import mysql from 'mysql2/promise';

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'alryada_university_news',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

/**
 * Execute a SQL query with parameters
 * @param {string} sql - SQL query
 * @param {Array} params - Parameters for the query
 * @returns {Promise<Array>} - Query results
 */
export async function query(sql, params) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

/**
 * Get all news items with optional filtering
 * @param {Object} options - Filter options
 * @returns {Promise<Array>} - News items
 */
export async function getAllNews(options = {}) {
  const { 
    limit = 10, 
    offset = 0, 
    categoryId = null, 
    featured = null,
    active = true,
    orderBy = 'publish_date',
    orderDir = 'DESC'
  } = options;

  let sql = `
    SELECT n.*, 
           c.name as category_name, 
           a.name as author_name, 
           a.image_url as author_image
    FROM news n
    LEFT JOIN news_categories c ON n.category_id = c.id
    LEFT JOIN news_authors a ON n.author_id = a.id
    WHERE 1=1
  `;
  
  const params = [];
  
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
  params.push(parseInt(limit), parseInt(offset));
  
  return await query(sql, params);
}

/**
 * Get a single news item by ID or slug
 * @param {string|number} identifier - News ID or slug
 * @returns {Promise<Object>} - News item
 */
export async function getNewsById(identifier) {
  let sql = `
    SELECT n.*, 
           c.name as category_name, 
           a.name as author_name, 
           a.title as author_title,
           a.bio as author_bio,
           a.image_url as author_image
    FROM news n
    LEFT JOIN news_categories c ON n.category_id = c.id
    LEFT JOIN news_authors a ON n.author_id = a.id
    WHERE n.is_active = 1 AND 
  `;
  
  // Check if identifier is a number (ID) or string (slug)
  const isId = !isNaN(identifier);
  if (isId) {
    sql += 'n.id = ?';
  } else {
    sql += 'n.slug = ?';
  }
  
  const newsItem = await query(sql, [identifier]);
  
  if (newsItem.length === 0) {
    return null;
  }
  
  // Get related media
  const mediaSql = `
    SELECT * FROM news_media 
    WHERE news_id = ? AND is_active = 1
    ORDER BY display_order ASC
  `;
  
  const media = await query(mediaSql, [newsItem[0].id]);
  
  // Increment view count
  await query('UPDATE news SET views_count = views_count + 1 WHERE id = ?', [newsItem[0].id]);
  
  return { ...newsItem[0], media };
}

/**
 * Get all news categories
 * @param {boolean} activeOnly - Get only active categories
 * @returns {Promise<Array>} - Categories
 */
export async function getCategories(activeOnly = true) {
  let sql = 'SELECT * FROM news_categories';
  const params = [];
  
  if (activeOnly) {
    sql += ' WHERE is_active = ?';
    params.push(1);
  }
  
  sql += ' ORDER BY display_order ASC';
  
  return await query(sql, params);
}

/**
 * Get all news authors
 * @param {boolean} activeOnly - Get only active authors
 * @returns {Promise<Array>} - Authors
 */
export async function getAuthors(activeOnly = true) {
  let sql = 'SELECT * FROM news_authors';
  const params = [];
  
  if (activeOnly) {
    sql += ' WHERE is_active = ?';
    params.push(1);
  }
  
  return await query(sql, params);
}

/**
 * Search news by keyword
 * @param {string} keyword - Search keyword
 * @param {Object} options - Search options
 * @returns {Promise<Array>} - Search results
 */
export async function searchNews(keyword, options = {}) {
  const { 
    limit = 10, 
    offset = 0,
    categoryId = null
  } = options;
  
  let sql = `
    SELECT n.*, 
           c.name as category_name, 
           a.name as author_name
    FROM news n
    LEFT JOIN news_categories c ON n.category_id = c.id
    LEFT JOIN news_authors a ON n.author_id = a.id
    WHERE n.is_active = 1 AND (
      n.title LIKE ? OR 
      n.subtitle LIKE ? OR 
      n.content LIKE ? OR
      n.summary LIKE ? OR
      n.tags LIKE ?
    )
  `;
  
  const searchParam = `%${keyword}%`;
  let params = [searchParam, searchParam, searchParam, searchParam, searchParam];
  
  if (categoryId !== null) {
    sql += ' AND n.category_id = ?';
    params.push(categoryId);
  }
  
  sql += ' ORDER BY n.publish_date DESC LIMIT ? OFFSET ?';
  params.push(parseInt(limit), parseInt(offset));
  
  return await query(sql, params);
}

export default {
  query,
  getAllNews,
  getNewsById,
  getCategories,
  getAuthors,
  searchNews
};
