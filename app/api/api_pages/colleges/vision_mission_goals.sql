-- بنية جدول رؤية ورسالة الكلية
CREATE TABLE `college_vision_mission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `college_id` int(11) NOT NULL,
  `vision` text DEFAULT NULL,
  `vision_en` text DEFAULT NULL,
  `mission` text DEFAULT NULL,
  `mission_en` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `college_id` (`college_id`),
  CONSTRAINT `fk_college_vision_mission` FOREIGN KEY (`college_id`) 
  REFERENCES `colleges` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- بنية جدول أهداف الكلية
CREATE TABLE `college_goals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `college_id` int(11) NOT NULL,
  `goal_title` varchar(255) NOT NULL,
  `goal_title_en` varchar(255) DEFAULT NULL,
  `goal_description` text DEFAULT NULL,
  `goal_description_en` text DEFAULT NULL,
  `goal_order` int(11) DEFAULT 0,
  `icon` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `college_id` (`college_id`),
  CONSTRAINT `fk_college_goals` FOREIGN KEY (`college_id`) 
  REFERENCES `colleges` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- إدخال بيانات تجريبية لكلية الهندسة
INSERT INTO `college_vision_mission` 
(`college_id`, `vision`, `vision_en`, `mission`, `mission_en`) 
VALUES 
(1, 
 'أن نكون كلية رائدة في التعليم الهندسي والبحث العلمي على المستوى المحلي والإقليمي',
 'To be a leading college in engineering education and scientific research at the local and regional levels',
 'تقديم تعليم هندسي متميز وإجراء بحوث علمية مبتكرة تخدم المجتمع وتلبي احتياجات سوق العمل',
 'Providing distinguished engineering education and conducting innovative scientific research that serves society and meets labor market needs'
);

INSERT INTO `college_goals` 
(`college_id`, `goal_title`, `goal_title_en`, `goal_description`, `goal_description_en`, `goal_order`, `icon`) 
VALUES 
(1, 'تطوير المناهج الدراسية', 'Curriculum Development', 
   'تحديث وتطوير المناهج الدراسية بما يتواكب مع التطورات العالمية في مجال الهندسة',
   'Updating and developing curricula in line with global developments in engineering',
   1, 'book'),
(1, 'تعزيز البحث العلمي', 'Enhance Scientific Research',
   'دعم وتشجيع البحث العلمي وربطه باحتياجات المجتمع والصناعة',
   'Supporting and encouraging scientific research and linking it to the needs of society and industry',
   2, 'microscope'),
(1, 'التطوير المهني', 'Professional Development',
   'تطوير المهارات المهنية للطلاب وأعضاء هيئة التدريس',
   'Developing professional skills for students and faculty members',
   3, 'users');

-- إدخال بيانات تجريبية لكلية الطب
INSERT INTO `college_vision_mission`
(`college_id`, `vision`, `vision_en`, `mission`, `mission_en`)
VALUES
(2,
 'أن نكون مركزاً متميزاً في التعليم الطبي والبحث العلمي والرعاية الصحية',
 'To be a distinguished center in medical education, scientific research and healthcare',
 'إعداد أطباء مؤهلين قادرين على تقديم رعاية صحية عالية الجودة وإجراء بحوث طبية متقدمة',
 'Preparing qualified doctors capable of providing high-quality healthcare and conducting advanced medical research'
);

INSERT INTO `college_goals`
(`college_id`, `goal_title`, `goal_title_en`, `goal_description`, `goal_description_en`, `goal_order`, `icon`)
VALUES
(2, 'التميز الأكاديمي', 'Academic Excellence',
   'تحقيق التميز في التعليم الطبي وفق المعايير العالمية',
   'Achieving excellence in medical education according to international standards',
   1, 'award'),
(2, 'البحث والابتكار', 'Research and Innovation',
   'تعزيز البحث العلمي والابتكار في المجال الطبي',
   'Promoting scientific research and innovation in the medical field',
   2, 'lab'),
(2, 'خدمة المجتمع', 'Community Service',
   'المساهمة في تحسين الصحة العامة وتقديم الخدمات الطبية للمجتمع',
   'Contributing to improving public health and providing medical services to the community',
   3, 'heart');

-- إدخال بيانات تجريبية لكلية العلوم الإدارية
INSERT INTO `college_vision_mission`
(`college_id`, `vision`, `vision_en`, `mission`, `mission_en`)
VALUES
(3,
 'أن نكون كلية رائدة في تعليم وبحوث العلوم الإدارية على المستوى الوطني والإقليمي',
 'To be a leading college in administrative sciences education and research at the national and regional levels',
 'إعداد قادة مؤهلين في مجال الأعمال والإدارة قادرين على المنافسة في سوق العمل وخدمة المجتمع',
 'Preparing qualified leaders in business and management capable of competing in the labor market and serving society'
);

INSERT INTO `college_goals`
(`college_id`, `goal_title`, `goal_title_en`, `goal_description`, `goal_description_en`, `goal_order`, `icon`)
VALUES
(3, 'التعليم المتميز', 'Distinguished Education',
   'تقديم برامج تعليمية متميزة تلبي احتياجات سوق العمل',
   'Providing distinguished educational programs that meet labor market needs',
   1, 'graduation-cap'),
(3, 'الشراكات الاستراتيجية', 'Strategic Partnerships',
   'بناء شراكات استراتيجية مع القطاع الخاص والمؤسسات الأكاديمية',
   'Building strategic partnerships with the private sector and academic institutions',
   2, 'handshake'),
(3, 'ريادة الأعمال', 'Entrepreneurship',
   'تعزيز ثقافة ريادة الأعمال والابتكار لدى الطلاب',
   'Promoting entrepreneurship and innovation culture among students',
   3, 'lightbulb'); 