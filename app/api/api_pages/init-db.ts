import db from './db';

export async function initializeDatabase() {
  try {
    console.log('Starting database initialization...');
    
    // Check database connection
    const connected = await db.testConnection();
    if (!connected) {
      console.error('Failed to connect to database');
      return false;
    }
    
    // Create majors table if it doesn't exist
    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS majors (
          id INT AUTO_INCREMENT PRIMARY KEY,
          college_id INT NOT NULL,
          name VARCHAR(255) NOT NULL,
          name_en VARCHAR(255),
          description TEXT,
          description_en TEXT,
          icon VARCHAR(50),
          duration_years INT DEFAULT 4,
          students_count INT DEFAULT 0,
          image_path VARCHAR(255),
          features TEXT,
          features_en TEXT,
          admission_requirements TEXT,
          admission_requirements_en TEXT,
          job_opportunities TEXT,
          job_opportunities_en TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      console.log('Majors table created or already exists');
    } catch (error) {
      console.error('Error creating majors table:', error);
      return false;
    }
    
    // Create courses table if it doesn't exist
    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS courses (
          id INT AUTO_INCREMENT PRIMARY KEY,
          major_id INT NOT NULL,
          name VARCHAR(255) NOT NULL,
          name_en VARCHAR(255),
          description TEXT,
          description_en TEXT,
          credits INT DEFAULT 3,
          year INT,
          semester INT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (major_id) REFERENCES majors(id) ON DELETE CASCADE
        )
      `);
      console.log('Courses table created or already exists');
    } catch (error) {
      console.error('Error creating courses table:', error);
      return false;
    }
    
    // Create projects table if it doesn't exist
    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS projects (
          id INT AUTO_INCREMENT PRIMARY KEY,
          major_id INT NOT NULL,
          title VARCHAR(255) NOT NULL,
          title_en VARCHAR(255),
          description TEXT,
          description_en TEXT,
          image_path VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (major_id) REFERENCES majors(id) ON DELETE CASCADE
        )
      `);
      console.log('Projects table created or already exists');
    } catch (error) {
      console.error('Error creating projects table:', error);
      return false;
    }
    
    // Check if we have any sample data in majors table
    const majorsCount = await db.query('SELECT COUNT(*) as count FROM majors');
    if (majorsCount[0].count === 0) {
      // Insert sample data
      try {
        await db.query(`
          INSERT INTO majors (college_id, name, name_en, description, description_en, icon, duration_years, students_count, features, features_en)
          VALUES 
          (1, 'هندسة البرمجيات', 'Software Engineering', 'برنامج هندسة البرمجيات يركز على تطوير وتصميم البرمجيات بمنهجية هندسية', 'The Software Engineering program focuses on developing and designing software using engineering methodologies', '💻', 4, 120, 'تطوير برمجيات احترافية;إدارة مشاريع التقنية;تصميم واجهات المستخدم', 'Professional software development;Technical project management;UI/UX design'),
          (1, 'علوم الحاسوب', 'Computer Science', 'برنامج علوم الحاسوب يركز على أساسيات علوم الحوسبة والخوارزميات', 'The Computer Science program focuses on the fundamentals of computing and algorithms', '🖥️', 4, 150, 'الذكاء الاصطناعي;تعلم الآلة;أمن المعلومات', 'Artificial Intelligence;Machine Learning;Information Security'),
          (2, 'إدارة الأعمال', 'Business Administration', 'برنامج إدارة الأعمال يؤهل الطلاب لإدارة المؤسسات والشركات', 'The Business Administration program prepares students to manage organizations and companies', '📊', 4, 200, 'إدارة الموارد البشرية;التسويق;المحاسبة', 'Human Resources Management;Marketing;Accounting')
        `);
        console.log('Sample majors data inserted');
      } catch (error) {
        console.error('Error inserting sample majors data:', error);
      }
    }
    
    console.log('Database initialization completed successfully');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
}

export default { initializeDatabase }; 