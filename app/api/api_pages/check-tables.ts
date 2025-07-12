import db from './db';

// List of tables needed for the majors API
const requiredTables = [
  'majors',
  'courses',
  'projects'
];

export async function checkMajorsTables() {
  console.log('Checking if required tables exist...');
  
  try {
    // Test database connection
    await db.testConnection();
    console.log('Database connection successful');
    
    // Check each table
    for (const table of requiredTables) {
      try {
        const result = await db.query(`SHOW TABLES LIKE '${table}'`);
        if (result.length > 0) {
          console.log(`✅ Table '${table}' exists`);
          
          // Check table structure
          const columns = await db.query(`DESCRIBE ${table}`);
          console.log(`Table '${table}' columns:`, columns.map((col: any) => col.Field).join(', '));
          
          // Count records
          const count = await db.query(`SELECT COUNT(*) as count FROM ${table}`);
          console.log(`Table '${table}' has ${count[0].count} records`);
        } else {
          console.log(`❌ Table '${table}' does not exist`);
        }
      } catch (error) {
        console.error(`Error checking table '${table}':`, error);
      }
    }
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

// Export for use in API routes
export default { checkMajorsTables }; 