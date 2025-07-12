import db from './db';

export async function checkTableStructure(tableName: string) {
  try {
    console.log(`Checking structure of table: ${tableName}`);
    
    // Check if table exists
    const tableExists = await db.query(`SHOW TABLES LIKE '${tableName}'`);
    if (tableExists.length === 0) {
      console.log(`Table '${tableName}' does not exist`);
      return {
        exists: false,
        columns: []
      };
    }
    
    // Get table structure
    const columns = await db.query(`DESCRIBE ${tableName}`);
    console.log(`Table '${tableName}' columns:`, columns.map((col: any) => col.Field).join(', '));
    
    // Get sample data
    const sampleData = await db.query(`SELECT * FROM ${tableName} LIMIT 1`);
    console.log(`Sample data from '${tableName}':`, sampleData.length > 0 ? JSON.stringify(sampleData[0]) : 'No data');
    
    return {
      exists: true,
      columns: columns.map((col: any) => col.Field),
      sample: sampleData.length > 0 ? sampleData[0] : null
    };
  } catch (error) {
    console.error(`Error checking table structure for '${tableName}':`, error);
    return {
      exists: false,
      error: error,
      columns: []
    };
  }
}

export async function checkCoursesTable() {
  return await checkTableStructure('courses');
}

export async function checkProjectsTable() {
  return await checkTableStructure('projects');
}

export async function checkMajorsTable() {
  return await checkTableStructure('majors');
} 