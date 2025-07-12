import mysql from 'mysql2/promise';

// تكوين الاتصال بقاعدة البيانات الموحدة
const unifiedDbConfig = {
  host: process.env.UNIFIED_DB_HOST || 'localhost',
  user: process.env.UNIFIED_DB_USER || 'root',
  password: process.env.UNIFIED_DB_PASSWORD || '',
  database: process.env.UNIFIED_DB_NAME || 'alryada_university_unified',
  waitForConnections: true,
  connectionLimit: 15,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  charset: 'utf8mb4'
};

// إنشاء تجمع اتصالات للقاعدة الموحدة
const unifiedPool = mysql.createPool(unifiedDbConfig);

// عدد محاولات إعادة الاتصال
const MAX_RETRIES = 3;

/**
 * تنفيذ استعلام في قاعدة البيانات الموحدة مع إعادة المحاولة التلقائية
 * @param {string} sql - استعلام SQL
 * @param {any[]} params - معلمات الاستعلام
 * @param {number} retries - عدد محاولات إعادة المحاولة
 * @returns {Promise<any>} - نتيجة الاستعلام
 */
export async function queryUnified(sql: string, params: any[] = [], retries = MAX_RETRIES): Promise<any> {
  try {
    const connection = await unifiedPool.getConnection();
    console.log('تم الاتصال بقاعدة البيانات الموحدة بنجاح');
    
    try {
      console.log('تنفيذ استعلام في القاعدة الموحدة:', sql);
      if (params.length > 0) {
        console.log('بمعلمات:', params);
      }
      
      const [results] = await connection.query(sql, params);
      return results;
    } catch (error) {
      console.error('خطأ في تنفيذ الاستعلام:', error);
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    if (retries > 0) {
      console.warn(`فشل الاستعلام، إعادة المحاولة... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return queryUnified(sql, params, retries - 1);
    }
    
    console.error('خطأ في قاعدة البيانات الموحدة:', error);
    throw error;
  }
}

/**
 * التحقق من الاتصال بقاعدة البيانات الموحدة
 * @returns {Promise<boolean>} - نجاح الاتصال
 */
export async function testUnifiedConnection(): Promise<boolean> {
  try {
    const connection = await unifiedPool.getConnection();
    console.log('تم اختبار الاتصال بقاعدة البيانات الموحدة بنجاح');
    connection.release();
    return true;
  } catch (error) {
    console.error('فشل الاتصال بقاعدة البيانات الموحدة:', error);
    return false;
  }
}

/**
 * التحقق من وجود الجداول في قاعدة البيانات الموحدة
 * @returns {Promise<string[]>} - قائمة بأسماء الجداول الموجودة
 */
export async function getUnifiedTables(): Promise<string[]> {
  try {
    const tables = await queryUnified('SHOW TABLES');
    return tables.map((table: any) => Object.values(table)[0] as string);
  } catch (error) {
    console.error('خطأ في الحصول على قائمة الجداول:', error);
    return [];
  }
}

/**
 * بدء معاملة في قاعدة البيانات الموحدة
 * @returns {Promise<mysql.PoolConnection>} - اتصال المعاملة
 */
export async function startUnifiedTransaction() {
  const connection = await unifiedPool.getConnection();
  await connection.beginTransaction();
  return connection;
}

/**
 * تنفيذ معاملة في قاعدة البيانات الموحدة
 * @param {mysql.PoolConnection} connection - اتصال المعاملة
 * @returns {Promise<void>}
 */
export async function commitUnifiedTransaction(connection: mysql.PoolConnection): Promise<void> {
  try {
    await connection.commit();
  } finally {
    connection.release();
  }
}

/**
 * التراجع عن معاملة في قاعدة البيانات الموحدة
 * @param {mysql.PoolConnection} connection - اتصال المعاملة
 * @returns {Promise<void>}
 */
export async function rollbackUnifiedTransaction(connection: mysql.PoolConnection): Promise<void> {
  try {
    await connection.rollback();
  } finally {
    connection.release();
  }
}

/**
 * تنفيذ استعلام داخل معاملة في قاعدة البيانات الموحدة
 * @param {mysql.PoolConnection} connection - اتصال المعاملة
 * @param {string} sql - استعلام SQL
 * @param {any[]} params - معلمات الاستعلام
 * @returns {Promise<any>} - نتيجة الاستعلام
 */
export async function queryUnifiedWithinTransaction(
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
 * إغلاق تجمع الاتصالات
 */
export async function closeUnifiedPool(): Promise<void> {
  try {
    await unifiedPool.end();
    console.log('تم إغلاق تجمع اتصالات قاعدة البيانات الموحدة');
  } catch (error) {
    console.error('خطأ في إغلاق تجمع الاتصالات:', error);
  }
}

// تصدير الوظائف
export default {
  queryUnified,
  testUnifiedConnection,
  getUnifiedTables,
  startUnifiedTransaction,
  commitUnifiedTransaction,
  rollbackUnifiedTransaction,
  queryUnifiedWithinTransaction,
  closeUnifiedPool
};

// تصدير التجمع للاستخدام المباشر إذا لزم الأمر
export { unifiedPool }; 