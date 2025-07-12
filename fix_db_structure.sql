-- Check if about_navbar exists and create it if not
CREATE TABLE IF NOT EXISTS about_navbar (
  id INT AUTO_INCREMENT PRIMARY KEY,
  link_text VARCHAR(255) NOT NULL,
  section_id VARCHAR(100) NOT NULL,
  link_order INT NOT NULL DEFAULT 0
);

-- Add title column if it doesn't exist
SET @exist := (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_NAME = 'about_navbar'
  AND COLUMN_NAME = 'title'
  AND TABLE_SCHEMA = 'AHMED'
);

SET @query = IF(@exist = 0, 
  'ALTER TABLE about_navbar ADD COLUMN title VARCHAR(255)',
  'SELECT "Column title already exists"'
);

PREPARE stmt FROM @query;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Create a view that allows both column naming schemes to work
CREATE OR REPLACE VIEW about_navbar_view AS
SELECT 
  id,
  link_text,
  link_text as title,
  section_id,
  link_order,
  link_order as navbar_order
FROM about_navbar; 