-- إنشاء جدول about_university إذا لم يكن موجودًا
CREATE TABLE IF NOT EXISTS `about_university` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `title_en` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `description_en` text NOT NULL,
  `read_more_link` varchar(255) DEFAULT '/about',
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- إدراج بيانات افتراضية إذا كان الجدول فارغًا
INSERT INTO `about_university` (`title`, `title_en`, `description`, `description_en`, `read_more_link`)
SELECT 'عن الجامعة', 'About the University', 'جامعة الريادة هي مؤسسة تعليمية رائدة تقدم برامج أكاديمية متميزة.', 'Al-Riyada University is a leading educational institution offering distinguished academic programs.', '/about'
FROM dual
WHERE NOT EXISTS (SELECT 1 FROM `about_university` LIMIT 1); 