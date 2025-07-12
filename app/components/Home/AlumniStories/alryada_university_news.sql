-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 22 يونيو 2025 الساعة 01:51
-- إصدار الخادم: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `alryada_university_news`
--

-- --------------------------------------------------------

--
-- بنية الجدول `alumni`
--

CREATE TABLE `alumni` (
  `id` int(11) NOT NULL,
  `name_ar` varchar(255) NOT NULL COMMENT 'اسم الخريج باللغة العربية',
  `name_en` varchar(255) NOT NULL COMMENT 'اسم الخريج باللغة الإنجليزية',
  `graduation_year` int(11) NOT NULL COMMENT 'سنة التخرج',
  `major_id` int(11) NOT NULL COMMENT 'معرف التخصص',
  `current_position_ar` varchar(255) NOT NULL COMMENT 'المنصب الحالي باللغة العربية',
  `current_position_en` varchar(255) NOT NULL COMMENT 'المنصب الحالي باللغة الإنجليزية',
  `company_id` int(11) NOT NULL COMMENT 'معرف الشركة',
  `image` varchar(255) DEFAULT NULL COMMENT 'صورة الخريج',
  `linkedin` varchar(255) DEFAULT NULL COMMENT 'رابط حساب LinkedIn',
  `twitter` varchar(255) DEFAULT NULL COMMENT 'رابط حساب Twitter',
  `email` varchar(255) DEFAULT NULL COMMENT 'البريد الإلكتروني',
  `featured` tinyint(1) DEFAULT 0 COMMENT 'خريج مميز للعرض في الصفحة الرئيسية',
  `status` enum('active','inactive') DEFAULT 'active' COMMENT 'حالة الخريج',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `alumni`
--

INSERT INTO `alumni` (`id`, `name_ar`, `name_en`, `graduation_year`, `major_id`, `current_position_ar`, `current_position_en`, `company_id`, `image`, `linkedin`, `twitter`, `email`, `featured`, `status`, `created_at`, `updated_at`) VALUES
(1, 'محمد أحمد', 'Mohammed Ahmed', 2018, 1, 'مهندس برمجيات أول', 'Senior Software Engineer', 1, '/image/1.jpg', 'https://linkedin.com/in/mohammed-ahmed', 'https://twitter.com/mohammed_ahmed', 'mohammed.ahmed@example.com', 1, 'active', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(2, 'نور الهدى علي', 'Noor Al-Huda Ali', 2019, 3, 'مديرة تسويق', 'Marketing Manager', 2, '/image/2.jpg', 'https://linkedin.com/in/noor-ali', 'https://twitter.com/noor_ali', 'noor.ali@example.com', 1, 'active', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(3, 'عبدالله محمد', 'Abdullah Mohammed', 2017, 4, 'طبيب استشاري', 'Consultant Physician', 3, '/image/a1.jpg', 'https://linkedin.com/in/abdullah-mohammed', 'https://twitter.com/abdullah_m', 'abdullah.m@example.com', 1, 'active', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(4, 'سارة خالد', 'Sara Khalid', 2020, 2, 'عالمة بيانات', 'Data Scientist', 4, '/image/a2.jpg', 'https://linkedin.com/in/sara-khalid', 'https://twitter.com/sara_khalid', 'sara.khalid@example.com', 1, 'active', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(5, 'فيصل عبدالرحمن', 'Faisal Abdulrahman', 2016, 5, 'مهندس كهربائي رئيسي', 'Lead Electrical Engineer', 5, '/image/a3.jpg', 'https://linkedin.com/in/faisal-abdulrahman', 'https://twitter.com/faisal_ar', 'faisal.ar@example.com', 0, 'active', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(6, 'لينا يوسف', 'Lina Yousef', 2021, 6, 'مديرة علاقات عامة', 'Public Relations Manager', 6, '/image/1.jpg', 'https://linkedin.com/in/lina-yousef', 'https://twitter.com/lina_yousef', 'lina.yousef@example.com', 0, 'active', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(7, 'خالد إبراهيم', 'Khalid Ibrahim', 2019, 7, 'مدير أمن المعلومات', 'Information Security Manager', 7, '/image/2.jpg', 'https://linkedin.com/in/khalid-ibrahim', 'https://twitter.com/khalid_ibrahim', 'khalid.ibrahim@example.com', 0, 'active', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(8, 'رنا سعيد', 'Rana Saeed', 2018, 8, 'طبيبة أسنان', 'Dentist', 8, '/image/a1.jpg', 'https://linkedin.com/in/rana-saeed', 'https://twitter.com/rana_saeed', 'rana.saeed@example.com', 0, 'active', '2025-06-21 23:06:15', '2025-06-21 23:06:15');

-- --------------------------------------------------------

--
-- بنية الجدول `alumni_achievements`
--

CREATE TABLE `alumni_achievements` (
  `id` int(11) NOT NULL,
  `alumni_id` int(11) NOT NULL COMMENT 'معرف الخريج',
  `achievement_ar` text NOT NULL COMMENT 'الإنجاز باللغة العربية',
  `achievement_en` text NOT NULL COMMENT 'الإنجاز باللغة الإنجليزية',
  `year` int(11) DEFAULT NULL COMMENT 'سنة الإنجاز',
  `sort_order` int(11) DEFAULT 0 COMMENT 'ترتيب العرض',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `alumni_achievements`
--

INSERT INTO `alumni_achievements` (`id`, `alumni_id`, `achievement_ar`, `achievement_en`, `year`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 1, 'حصل على جائزة التميز الأكاديمي خلال فترة الدراسة', 'Received the Academic Excellence Award during the study period', 2017, 1, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(2, 1, 'عمل كمتطوع في برامج خدمة المجتمع', 'Volunteered in community service programs', 2016, 2, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(3, 1, 'شارك في تطوير تطبيق للهواتف الذكية خلال فترة الدراسة', 'Participated in developing a mobile application during the study period', 2018, 3, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(4, 1, 'حصل على براءة اختراع في مجال الذكاء الاصطناعي', 'Obtained a patent in the field of artificial intelligence', 2020, 4, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(5, 2, 'فازت بمسابقة خطط التسويق على مستوى الجامعات', 'Won the marketing plan competition at the university level', 2018, 1, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(6, 2, 'قادت فريق التسويق الطلابي في الجامعة', 'Led the student marketing team at the university', 2017, 2, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(7, 2, 'شاركت في تنظيم مؤتمر ريادة الأعمال السنوي', 'Participated in organizing the annual entrepreneurship conference', 2019, 3, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(8, 2, 'حصلت على منحة دراسية للتدريب الصيفي في شركة عالمية', 'Received a scholarship for summer training at a global company', 2018, 4, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(9, 3, 'نشر بحثًا علميًا في مجلة طبية مرموقة', 'Published a scientific research in a prestigious medical journal', 2016, 1, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(10, 3, 'شارك في بعثة طبية تطوعية لمساعدة المناطق المحتاجة', 'Participated in a voluntary medical mission to help needy areas', 2017, 2, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(11, 3, 'حصل على جائزة أفضل طالب طب في دفعته', 'Received the Best Medical Student Award in his class', 2017, 3, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(12, 3, 'قدم محاضرات توعوية صحية في المدارس والجامعات', 'Delivered health awareness lectures in schools and universities', 2018, 4, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(13, 4, 'فازت بمسابقة البرمجة على مستوى الجامعة', 'Won the programming competition at the university level', 2019, 1, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(14, 4, 'طورت خوارزمية للتنبؤ بأنماط استهلاك الطاقة', 'Developed an algorithm to predict energy consumption patterns', 2020, 2, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(15, 4, 'شاركت في مؤتمر علوم البيانات الدولي', 'Participated in the International Data Science Conference', 2020, 3, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(16, 4, 'حصلت على شهادة احترافية في تحليل البيانات الضخمة', 'Obtained a professional certification in big data analysis', 2021, 4, '2025-06-21 23:06:15', '2025-06-21 23:06:15');

-- --------------------------------------------------------

--
-- بنية الجدول `alumni_colleges`
--

CREATE TABLE `alumni_colleges` (
  `id` int(11) NOT NULL,
  `name_ar` varchar(255) NOT NULL COMMENT 'اسم الكلية باللغة العربية',
  `name_en` varchar(255) NOT NULL COMMENT 'اسم الكلية باللغة الإنجليزية',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `alumni_colleges`
--

INSERT INTO `alumni_colleges` (`id`, `name_ar`, `name_en`, `created_at`, `updated_at`) VALUES
(1, 'كلية الهندسة', 'College of Engineering', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(2, 'كلية إدارة الأعمال', 'College of Business Administration', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(3, 'كلية الطب', 'College of Medicine', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(4, 'كلية علوم الحاسب والمعلومات', 'College of Computer and Information Sciences', '2025-06-21 23:06:15', '2025-06-21 23:06:15');

-- --------------------------------------------------------

--
-- بنية الجدول `alumni_companies`
--

CREATE TABLE `alumni_companies` (
  `id` int(11) NOT NULL,
  `name_ar` varchar(255) NOT NULL COMMENT 'اسم الشركة باللغة العربية',
  `name_en` varchar(255) NOT NULL COMMENT 'اسم الشركة باللغة الإنجليزية',
  `website` varchar(255) DEFAULT NULL COMMENT 'الموقع الإلكتروني للشركة',
  `logo` varchar(255) DEFAULT NULL COMMENT 'شعار الشركة',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `alumni_companies`
--

INSERT INTO `alumni_companies` (`id`, `name_ar`, `name_en`, `website`, `logo`, `created_at`, `updated_at`) VALUES
(1, 'شركة جوجل', 'Google', 'https://www.google.com', '/companies/google.png', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(2, 'شركة أمازون', 'Amazon', 'https://www.amazon.com', '/companies/amazon.png', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(3, 'مستشفى التخصصي', 'Specialized Hospital', 'https://www.specialized-hospital.com', '/companies/hospital.png', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(4, 'شركة مايكروسوفت', 'Microsoft', 'https://www.microsoft.com', '/companies/microsoft.png', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(5, 'شركة أرامكو', 'Saudi Aramco', 'https://www.aramco.com', '/companies/aramco.png', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(6, 'بنك الرياض', 'Riyad Bank', 'https://www.riyadbank.com', '/companies/riyadbank.png', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(7, 'شركة الاتصالات السعودية', 'STC', 'https://www.stc.com.sa', '/companies/stc.png', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(8, 'شركة أبل', 'Apple', 'https://www.apple.com', '/companies/apple.png', '2025-06-21 23:06:15', '2025-06-21 23:06:15');

-- --------------------------------------------------------

--
-- بنية الجدول `alumni_images`
--

CREATE TABLE `alumni_images` (
  `id` int(11) NOT NULL,
  `alumni_id` int(11) NOT NULL COMMENT 'معرف الخريج',
  `image_path` varchar(255) NOT NULL COMMENT 'مسار الصورة',
  `caption_ar` varchar(255) DEFAULT NULL COMMENT 'وصف الصورة بالعربية',
  `caption_en` varchar(255) DEFAULT NULL COMMENT 'وصف الصورة بالإنجليزية',
  `sort_order` int(11) DEFAULT 0 COMMENT 'ترتيب العرض',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `alumni_images`
--

INSERT INTO `alumni_images` (`id`, `alumni_id`, `image_path`, `caption_ar`, `caption_en`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 1, '/image/1.jpg', 'محمد أثناء عمله في مشروع برمجي', 'Mohammed while working on a programming project', 1, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(2, 1, '/image/2.jpg', 'محمد يقدم عرضًا في مؤتمر تقني', 'Mohammed giving a presentation at a tech conference', 2, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(3, 1, '/image/a1.jpg', 'محمد مع فريق العمل في شركة جوجل', 'Mohammed with the team at Google', 3, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(4, 2, '/image/a2.jpg', 'نور أثناء حفل التخرج', 'Noor during the graduation ceremony', 1, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(5, 2, '/image/a3.jpg', 'نور تقدم عرضًا تسويقيًا', 'Noor presenting a marketing presentation', 2, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(6, 2, '/image/1.jpg', 'نور مع فريق التسويق في شركة أمازون', 'Noor with the marketing team at Amazon', 3, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(7, 3, '/image/2.jpg', 'عبدالله في المختبر الطبي', 'Abdullah in the medical laboratory', 1, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(8, 3, '/image/a1.jpg', 'عبدالله أثناء البعثة الطبية التطوعية', 'Abdullah during the voluntary medical mission', 2, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(9, 3, '/image/a2.jpg', 'عبدالله يستلم جائزة التميز الطبي', 'Abdullah receiving the medical excellence award', 3, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(10, 4, '/image/a3.jpg', 'سارة أثناء مسابقة البرمجة', 'Sara during the programming competition', 1, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(11, 4, '/image/1.jpg', 'سارة تقدم ورشة عمل عن علوم البيانات', 'Sara presenting a workshop on data science', 2, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(12, 4, '/image/2.jpg', 'سارة مع فريق علماء البيانات في مايكروسوفت', 'Sara with the data science team at Microsoft', 3, '2025-06-21 23:06:15', '2025-06-21 23:06:15');

-- --------------------------------------------------------

--
-- بنية الجدول `alumni_majors`
--

CREATE TABLE `alumni_majors` (
  `id` int(11) NOT NULL,
  `college_id` int(11) DEFAULT NULL,
  `name_ar` varchar(255) NOT NULL COMMENT 'اسم التخصص باللغة العربية',
  `name_en` varchar(255) NOT NULL COMMENT 'اسم التخصص باللغة الإنجليزية',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `alumni_majors`
--

INSERT INTO `alumni_majors` (`id`, `college_id`, `name_ar`, `name_en`, `created_at`, `updated_at`) VALUES
(1, 1, 'هندسة البرمجيات', 'Software Engineering', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(2, 4, 'علوم الحاسب', 'Computer Science', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(3, 2, 'إدارة أعمال', 'Business Administration', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(4, 3, 'طب بشري', 'Medicine', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(5, 1, 'هندسة كهربائية', 'Electrical Engineering', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(6, 2, 'تسويق', 'Marketing', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(7, 4, 'أمن المعلومات', 'Information Security', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(8, 3, 'طب الأسنان', 'Dentistry', '2025-06-21 23:06:15', '2025-06-21 23:06:15');

-- --------------------------------------------------------

--
-- بنية الجدول `alumni_settings`
--

CREATE TABLE `alumni_settings` (
  `id` int(11) NOT NULL,
  `section_title_ar` varchar(255) NOT NULL DEFAULT 'قصص نجاح خريجينا' COMMENT 'عنوان القسم بالعربية',
  `section_title_en` varchar(255) NOT NULL DEFAULT 'Our Alumni Success Stories' COMMENT 'عنوان القسم بالإنجليزية',
  `section_subtitle_ar` text DEFAULT NULL COMMENT 'العنوان الفرعي للقسم بالعربية',
  `section_subtitle_en` text DEFAULT NULL COMMENT 'العنوان الفرعي للقسم بالإنجليزية',
  `stories_per_page` int(11) DEFAULT 12 COMMENT 'عدد القصص في الصفحة الواحدة',
  `featured_count` int(11) DEFAULT 4 COMMENT 'عدد القصص المميزة في الصفحة الرئيسية',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `alumni_settings`
--

INSERT INTO `alumni_settings` (`id`, `section_title_ar`, `section_title_en`, `section_subtitle_ar`, `section_subtitle_en`, `stories_per_page`, `featured_count`, `updated_at`) VALUES
(1, 'قصص نجاح خريجينا', 'Our Alumni Success Stories', 'تعرف على قصص ملهمة من خريجي جامعتنا الذين يصنعون الفرق في العالم', 'Discover inspiring stories from our university graduates who are making a difference in the world', 12, 4, '2025-06-21 23:00:39');

-- --------------------------------------------------------

--
-- بنية الجدول `alumni_stories`
--

CREATE TABLE `alumni_stories` (
  `id` int(11) NOT NULL,
  `alumni_id` int(11) NOT NULL COMMENT 'معرف الخريج',
  `summary_ar` text NOT NULL COMMENT 'ملخص القصة باللغة العربية',
  `summary_en` text NOT NULL COMMENT 'ملخص القصة باللغة الإنجليزية',
  `story_ar` text NOT NULL COMMENT 'القصة الكاملة باللغة العربية',
  `story_en` text NOT NULL COMMENT 'القصة الكاملة باللغة الإنجليزية',
  `views` int(11) DEFAULT 0 COMMENT 'عدد المشاهدات',
  `slug_ar` varchar(255) NOT NULL COMMENT 'الرابط المختصر باللغة العربية',
  `slug_en` varchar(255) NOT NULL COMMENT 'الرابط المختصر باللغة الإنجليزية',
  `published_at` timestamp NULL DEFAULT NULL COMMENT 'تاريخ النشر',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `alumni_stories`
--

INSERT INTO `alumni_stories` (`id`, `alumni_id`, `summary_ar`, `summary_en`, `story_ar`, `story_en`, `views`, `slug_ar`, `slug_en`, `published_at`, `created_at`, `updated_at`) VALUES
(1, 1, 'بدأت رحلتي بفكرة بسيطة في الجامعة وانتهت بوظيفة في إحدى أكبر شركات التقنية العالمية.', 'My journey started with a simple idea at the university and ended with a job at one of the world\'s largest tech companies.', 'عندما بدأت رحلتي الدراسية في جامعة الريادة، لم أكن أتخيل مدى التأثير الذي ستتركه على مساري المهني. بدأت الدراسة وكانت لدي الكثير من التساؤلات والشكوك حول المستقبل.\r\n\r\nخلال سنوات الدراسة، تعلمت الكثير من المهارات الأساسية التي ساعدتني في بناء مسيرتي المهنية. كان للأساتذة دور كبير في توجيهي نحو المسار الصحيح، وكانت البيئة الأكاديمية محفزة للإبداع والتفكير النقدي.\r\n\r\nبعد التخرج، واجهت تحديات كثيرة في سوق العمل، لكن التعليم الذي تلقيته في الجامعة منحني الأساس القوي للتغلب على هذه التحديات. بدأت العمل في شركة محلية صغيرة، ثم انتقلت بعد ذلك للعمل في شركات عالمية.\r\n\r\nاليوم، أنا فخور بكوني خريج جامعة الريادة، وسعيد بالفرصة التي أتيحت لي لمشاركة قصتي مع الطلاب الحاليين والخريجين الجدد. أنصح جميع الطلاب بالاستفادة القصوى من فترة الدراسة، والمشاركة في الأنشطة اللاصفية، وبناء شبكة علاقات قوية مع الزملاء والأساتذة.', 'When I started my academic journey at Alryada University, I couldn\'t imagine the impact it would have on my career path. I began my studies with many questions and doubts about the future.\r\n\r\nDuring my university years, I learned many essential skills that helped me build my professional career. The professors played a significant role in guiding me towards the right path, and the academic environment was stimulating for creativity and critical thinking.\r\n\r\nAfter graduation, I faced many challenges in the job market, but the education I received at the university gave me a strong foundation to overcome these challenges. I started working at a small local company, then moved on to work for global companies.\r\n\r\nToday, I am proud to be a graduate of Alryada University, and I\'m happy to have the opportunity to share my story with current students and new graduates. I advise all students to make the most of their study period, participate in extracurricular activities, and build a strong network with colleagues and professors.', 1250, 'محمد-أحمد-قصة-نجاح', 'mohammed-ahmed-success-story', '2023-06-15 05:30:00', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(2, 2, 'التحديات التي واجهتها في الدراسة كانت الخطوة الأولى نحو النجاح في مجال التسويق العالمي.', 'The challenges I faced during my studies were the first step towards success in the field of global marketing.', 'كانت رحلتي في كلية إدارة الأعمال مليئة بالتحديات والفرص. في البداية، واجهت صعوبة في فهم بعض المفاهيم المعقدة في التسويق، لكن بفضل دعم الأساتذة والموارد المتاحة في الجامعة، تمكنت من تجاوز هذه الصعوبات.\r\n\r\nخلال السنة الثالثة، شاركت في مسابقة لخطط التسويق على مستوى الجامعات، وحصل فريقنا على المركز الأول. كانت هذه التجربة نقطة تحول في مسيرتي، حيث منحتني الثقة والخبرة العملية التي احتجتها.\r\n\r\nبعد التخرج، حصلت على فرصة للتدريب في شركة أمازون، وبعد ستة أشهر، عُرضت علي وظيفة دائمة. اليوم، أعمل كمديرة تسويق، وأقود فريقًا دوليًا، وأشارك في وضع استراتيجيات التسويق العالمية للشركة.\r\n\r\nأنصح طلاب إدارة الأعمال بالاستفادة من جميع الفرص المتاحة في الجامعة، والمشاركة في المسابقات والفعاليات، وبناء شبكة علاقات مهنية قوية، فهذه هي مفاتيح النجاح في عالم الأعمال اليوم.', 'My journey in the College of Business Administration was full of challenges and opportunities. At first, I had difficulty understanding some complex marketing concepts, but thanks to the support of professors and resources available at the university, I was able to overcome these difficulties.\r\n\r\nDuring my third year, I participated in a marketing plan competition at the university level, and our team won first place. This experience was a turning point in my career, giving me the confidence and practical experience I needed.\r\n\r\nAfter graduation, I got an internship opportunity at Amazon, and after six months, I was offered a permanent position. Today, I work as a Marketing Manager, leading an international team, and participating in setting global marketing strategies for the company.\r\n\r\nI advise business administration students to take advantage of all the opportunities available at the university, participate in competitions and events, and build a strong professional network, as these are the keys to success in today\'s business world.', 980, 'نور-الهدى-علي-قصة-نجاح', 'noor-al-huda-ali-success-story', '2023-07-20 07:15:00', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(3, 3, 'الدعم الذي تلقيته من الجامعة مكنني من تحقيق حلمي في أن أصبح طبيبًا ناجحًا يساعد الآخرين.', 'The support I received from the university enabled me to achieve my dream of becoming a successful doctor helping others.', 'منذ الصغر، كان حلمي أن أصبح طبيبًا. عندما التحقت بكلية الطب في جامعة الريادة، أدركت أن الطريق سيكون طويلاً وصعبًا، لكن شغفي بالطب كان أقوى من أي تحدٍ.\r\n\r\nخلال سنوات الدراسة، استفدت كثيرًا من المختبرات المتطورة والمستشفى التعليمي التابع للجامعة. كان الأساتذة والأطباء المشرفون مصدر إلهام لي، وقدموا لي الدعم والتوجيه الذي احتجته.\r\n\r\nبعد التخرج، أكملت فترة الامتياز في مستشفى التخصصي، ثم حصلت على الزمالة في طب الباطنة. اليوم، أعمل كطبيب استشاري، وأسعى جاهدًا لتقديم أفضل رعاية ممكنة لمرضاي.\r\n\r\nأشعر بالامتنان العميق للتعليم الذي تلقيته في جامعة الريادة، وأحاول رد الجميل من خلال المشاركة في برامج التدريب والتوجيه للطلاب الجدد. رسالتي لطلاب الطب هي: تمسكوا بشغفكم، واستمروا في التعلم، وضعوا المريض دائمًا في المقام الأول.', 'Since childhood, my dream was to become a doctor. When I joined the College of Medicine at Alryada University, I realized that the road would be long and difficult, but my passion for medicine was stronger than any challenge.\r\n\r\nDuring my years of study, I benefited greatly from the advanced laboratories and the university teaching hospital. The professors and supervising doctors were a source of inspiration to me, and they provided me with the support and guidance I needed.\r\n\r\nAfter graduation, I completed my internship at the Specialized Hospital, then obtained a fellowship in internal medicine. Today, I work as a consultant physician, and I strive to provide the best possible care to my patients.\r\n\r\nI feel deep gratitude for the education I received at Alryada University, and I try to give back by participating in training and mentoring programs for new students. My message to medical students is: hold on to your passion, continue learning, and always put the patient first.', 1120, 'عبدالله-محمد-قصة-نجاح', 'abdullah-mohammed-success-story', '2023-08-05 11:45:00', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(4, 4, 'الشغف بالرياضيات والتعلم المستمر قادني إلى مجال علوم البيانات وتحليل البيانات الضخمة.', 'Passion for mathematics and continuous learning led me to the field of data science and big data analysis.', 'منذ المرحلة الثانوية، كنت شغوفة بالرياضيات والحاسوب. عندما حان وقت اختيار التخصص الجامعي، لم أتردد في اختيار علوم الحاسب في جامعة الريادة.\r\n\r\nخلال دراستي، اكتشفت مجال علوم البيانات، وأدركت أنه يجمع بين شغفي بالرياضيات والبرمجة. قررت التخصص في هذا المجال، وشاركت في العديد من المشاريع البحثية والتطبيقية.\r\n\r\nبعد التخرج، التحقت ببرنامج تدريبي في شركة مايكروسوفت، وعملت على مشاريع تحليل البيانات الضخمة. بعد عام، حصلت على وظيفة دائمة كعالمة بيانات، وأعمل الآن على تطوير خوارزميات التعلم الآلي وتحليل البيانات لتحسين منتجات الشركة.\r\n\r\nأنصح الطلاب المهتمين بمجال علوم البيانات بالتركيز على أساسيات الرياضيات والإحصاء، وتطوير مهارات البرمجة، والمشاركة في المشاريع العملية. المجال متطور باستمرار، لذا فإن التعلم المستمر هو مفتاح النجاح.', 'Since high school, I was passionate about mathematics and computers. When it was time to choose a university major, I didn\'t hesitate to choose Computer Science at Alryada University.\r\n\r\nDuring my studies, I discovered the field of data science, and realized that it combines my passion for mathematics and programming. I decided to specialize in this field, and participated in many research and applied projects.\r\n\r\nAfter graduation, I joined a training program at Microsoft, and worked on big data analysis projects. After a year, I got a permanent position as a Data Scientist, and now I work on developing machine learning algorithms and data analysis to improve the company\'s products.\r\n\r\nI advise students interested in data science to focus on the fundamentals of mathematics and statistics, develop programming skills, and participate in practical projects. The field is constantly evolving, so continuous learning is the key to success.', 853, 'سارة-خالد-قصة-نجاح', 'sara-khalid-success-story', '2023-09-10 06:20:00', '2025-06-21 23:06:15', '2025-06-21 23:49:43');

-- --------------------------------------------------------

--
-- بنية الجدول `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `title_en` varchar(255) DEFAULT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `subtitle_en` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  `content_en` text DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `summary_en` text DEFAULT NULL,
  `main_image_url` varchar(255) DEFAULT NULL,
  `publish_date` datetime DEFAULT current_timestamp(),
  `last_updated` datetime DEFAULT current_timestamp(),
  `author_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `views_count` int(11) DEFAULT 0,
  `is_featured` tinyint(1) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `display_order` int(11) DEFAULT 0,
  `slug` varchar(255) DEFAULT NULL,
  `tags` text DEFAULT NULL,
  `tags_en` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `news`
--

INSERT INTO `news` (`id`, `title`, `title_en`, `subtitle`, `subtitle_en`, `content`, `content_en`, `summary`, `summary_en`, `main_image_url`, `publish_date`, `last_updated`, `author_id`, `category_id`, `views_count`, `is_featured`, `is_active`, `display_order`, `slug`, `tags`, `tags_en`) VALUES
(2, 'بدء التسجيل للفصل الدراسي الجديد', 'Scientific Conference on Latest Research Developments', 'فتح باب التسجيل للطلاب الجدد والمستمرين', 'Researchers present latest findings in various fields', '<p>أعلنت عمادة القبول والتسجيل عن بدء استقبال طلبات التسجيل للفصل الدراسي الأول من العام الجامعي 1447/1448هـ اعتباراً من يوم الأحد القادم.</p><p>وأوضح عميد القبول والتسجيل الدكتور فهد السليم أن التسجيل سيكون متاحاً عبر البوابة الإلكترونية للجامعة، مشيراً إلى ضرورة الالتزام بالمواعيد المحددة لكل كلية وتخصص.</p><p>كما أكد على أهمية استكمال جميع المتطلبات والوثائق المطلوبة قبل التقديم لضمان سرعة إنجاز الطلبات وتفادي أي تأخير في عملية التسجيل.</p>', '<p>The university signed a cooperation agreement with several international universities to exchange experiences and develop academic programs. This agreement aims to enhance the quality of education and provide new opportunities for students and faculty members.</p><p>The agreement includes student and faculty exchange programs, joint research projects, and the development of educational curricula. It also includes organizing joint conferences and workshops.</p><p>This agreement is part of the university\'s strategy to enhance its global presence and provide distinguished educational opportunities for its students.</p>', 'أعلنت عمادة القبول والتسجيل عن بدء استقبال طلبات التسجيل للفصل الدراسي الجديد عبر البوابة الإلكترونية للجامعة', 'The university signed a cooperation agreement with several international universities to exchange experiences and develop academic programs.', '/images/news/registration.jpg', '2025-06-08 01:37:16', '2025-05-17 09:15:00', 2, 2, 96, 1, 1, 2, 'new-semester-registration', 'تسجيل,قبول,طلاب جدد,فصل دراسي', 'cooperation, international universities, academic programs, exchange'),
(3, 'فوز فريق الجامعة بالمركز الأول في مسابقة الابتكار', 'Workshop on Developing Teaching Skills for Faculty Members', 'إنجاز جديد يضاف لسجل الجامعة الحافل', 'Developing teaching methods and enhancing educational outcomes', '<p>حقق فريق كلية الهندسة المركز الأول في مسابقة الابتكار التقني على مستوى الجامعات، والتي نظمتها وزارة التعليم بالتعاون مع شركات التقنية الكبرى.</p><p>وتكون الفريق من خمسة طلاب من قسم هندسة الحاسب، وقدموا مشروعاً مبتكراً في مجال إنترنت الأشياء والمدن الذكية، نال إعجاب لجنة التحكيم وتفوق على أكثر من 50 مشروعاً مشاركاً من مختلف الجامعات.</p><p>وأشاد عميد كلية الهندسة بهذا الإنجاز، مؤكداً على دعم الجامعة المستمر للابتكار والإبداع لدى الطلاب وتشجيعهم على المشاركة في المسابقات المحلية والدولية.</p>', '<p>The university celebrated the graduation of a new batch of students from various colleges. The ceremony was attended by university officials, faculty members, students\' families, and a number of distinguished guests.</p><p>During the ceremony, outstanding students were honored, and graduation certificates were distributed to all graduates. The university president delivered a speech congratulating the graduates and wishing them success in their future careers.</p><p>The ceremony included various artistic and cultural performances that reflected the university\'s cultural diversity and its interest in developing students\' talents.</p>', 'حقق فريق كلية الهندسة المركز الأول في مسابقة الابتكار التقني على مستوى الجامعات بمشروع مبتكر في مجال إنترنت الأشياء والمدن الذكية', 'The university celebrated the graduation of a new batch of students from various colleges with the presence of officials and families.', '/images/news/innovation.jpg', '2025-06-12 01:37:16', '2025-05-18 14:45:00', 3, 3, 71, 1, 1, 3, 'innovation-competition-win', 'ابتكار,مسابقة,إنجاز,كلية الهندسة', 'graduation, ceremony, students, achievement'),
(4, 'ورشة عمل حول تقنيات التعلم العميق', 'Student Activities Week Launches with Various Events', 'تدريب عملي على أحدث تقنيات الذكاء الاصطناعي', 'Cultural, sports, and social activities for university students', '<p>تنظم كلية علوم الحاسب ورشة عمل متخصصة في تقنيات التعلم العميق وتطبيقاتها، وذلك يوم الثلاثاء القادم في قاعة المؤتمرات الرئيسية.</p><p>وستتناول الورشة أساسيات التعلم العميق والشبكات العصبية وتطبيقاتها في مجالات الرؤية الحاسوبية ومعالجة اللغات الطبيعية، مع تدريب عملي على استخدام أطر العمل الشهيرة مثل TensorFlow و PyTorch.</p><p>الورشة مفتوحة لطلاب الجامعة والمهتمين من خارجها، ويشترط التسجيل المسبق عبر منصة الفعاليات الإلكترونية للجامعة.</p>', '<p>The university organized a community service campaign with the participation of students and faculty members. The campaign included various activities aimed at serving the local community and enhancing social responsibility.</p><p>Activities included cleaning campaigns, tree planting, visiting hospitals and care homes, and organizing awareness lectures on various topics. The campaign received wide community participation and positive interaction.</p><p>This campaign is part of the university\'s efforts to enhance its role in community service and instill the values of volunteerism and social responsibility among its students.</p>', 'تنظم كلية علوم الحاسب ورشة عمل متخصصة في تقنيات التعلم العميق وتطبيقاتها مع تدريب عملي على أطر العمل الشهيرة', 'The university organized a community service campaign with the participation of students and faculty members to serve the local community.', '/images/news/workshop.jpg', '2025-06-14 01:37:16', '2025-05-16 11:20:00', 1, 4, 44, 0, 1, 4, 'deep-learning-workshop', 'ورشة عمل,تعلم عميق,ذكاء اصطناعي,تدريب', 'community service, volunteer work, social responsibility, students'),
(5, 'توقيع اتفاقية تعاون مع شركات التقنية', 'University Announces New Scholarships for Outstanding Students', 'شراكة استراتيجية لتدريب الطلاب وتوظيف الخريجين', 'Supporting outstanding students and providing educational opportunities', '<p>وقعت الجامعة اتفاقية تعاون مع كبرى شركات التقنية لتدريب الطلاب وتوفير فرص عمل للخريجين، وذلك في إطار سعي الجامعة لتعزيز الشراكة مع القطاع الخاص.</p><p>وتشمل الاتفاقية توفير برامج تدريبية للطلاب خلال فترة الدراسة، وإتاحة فرص التدريب الصيفي، بالإضافة إلى توفير فرص وظيفية للخريجين المتميزين.</p><p>كما تتضمن الاتفاقية تطوير المناهج الدراسية بما يتوافق مع متطلبات سوق العمل، وإشراك خبراء من الشركات في تقديم محاضرات وورش عمل للطلاب.</p>', '<p>The university organized an important event that brought together faculty members, students, and distinguished guests. The event included various activities and discussions about academic development and enhancing the educational process.</p><p>The university president emphasized the importance of continuous development and keeping pace with global educational trends. He also praised the efforts of all participants and their positive contributions.</p><p>At the end of the event, certificates were distributed to the participants, and future plans were announced to organize similar events that contribute to enriching the university experience.</p>', 'وقعت الجامعة اتفاقية تعاون مع كبرى شركات التقنية لتدريب الطلاب وتوفير فرص عمل للخريجين وتطوير المناهج الدراسية', 'The university organized an important event with the participation of faculty members, students, and distinguished guests to discuss academic development.', '/images/news/agreement.jpg', '2025-06-14 01:37:16', '2025-05-14 13:10:00', 2, 1, 40, 1, 1, 5, 'tech-companies-agreement', 'اتفاقية,تعاون,توظيف,تدريب,شركات تقنية', 'university, event, academic development, education'),
(6, 'إطلاق المنصة الإلكترونية الجديدة للجامعة', 'Faculty Members Participate in International Research Conference', 'تطوير الخدمات الإلكترونية للطلاب وأعضاء هيئة التدريس', 'Sharing research experiences and building international partnerships', '<p>أطلقت الجامعة منصتها الإلكترونية الجديدة لتسهيل الخدمات الطلابية والأكاديمية، وذلك ضمن خطتها للتحول الرقمي وتطوير الخدمات الإلكترونية.</p><p>وتتيح المنصة الجديدة العديد من الخدمات للطلاب مثل التسجيل في المقررات، والاطلاع على الجدول الدراسي والنتائج، وطلب الوثائق الرسمية، بالإضافة إلى خدمات التواصل مع أعضاء هيئة التدريس.</p><p>كما توفر المنصة لأعضاء هيئة التدريس خدمات إدارة المقررات، ورصد الدرجات، والتواصل مع الطلاب، وإدارة الأبحاث والمشاريع العلمية.</p>', '<p>A scientific conference was held at the university with the participation of researchers and academics from various universities. The conference discussed the latest scientific developments and research in various fields.</p><p>The conference included several sessions and workshops that addressed important topics in scientific research and academic publishing. Participants presented their research papers and exchanged experiences and knowledge.</p><p>The conference concluded with a set of recommendations aimed at developing scientific research and enhancing cooperation between universities and research centers.</p>', 'أطلقت الجامعة منصتها الإلكترونية الجديدة لتسهيل الخدمات الطلابية والأكاديمية ضمن خطتها للتحول الرقمي وتطوير الخدمات الإلكترونية', 'A scientific conference was held at the university with the participation of researchers and academics from various universities to discuss the latest developments.', '/images/news/platform.jpg', '2025-06-04 01:37:16', '2025-05-12 10:00:00', 3, 2, 66, 0, 1, 6, 'new-university-platform', 'منصة إلكترونية,خدمات طلابية,تحول رقمي', 'conference, research, academic, scientific development');

-- --------------------------------------------------------

--
-- بنية الجدول `news_authors`
--

CREATE TABLE `news_authors` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `name_en` varchar(100) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `title_en` varchar(100) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `bio_en` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `articles_count` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `news_authors`
--

INSERT INTO `news_authors` (`id`, `name`, `name_en`, `title`, `title_en`, `bio`, `bio_en`, `image_url`, `is_active`, `articles_count`) VALUES
(1, 'د. محمد أحمد', 'د. محمد أحمد (EN)', 'رئيس قسم الإعلام', 'EN: رئيس قسم الإعلام', 'دكتوراه في الإعلام والاتصال، له العديد من المؤلفات في مجال الإعلام الرقمي', 'د. محمد أحمد (EN) has been working at the university for several years, contributing significantly to the development of academic programs and research initiatives. They hold a PhD from a prestigious university and have received several awards for their academic achievements.', '/images/authors/mohamed.jpg', 1, 0),
(2, 'أ. سارة خالد', 'أ. سارة خالد (EN)', 'مديرة العلاقات العامة', 'EN: مديرة العلاقات العامة', 'متخصصة في العلاقات العامة والإعلام المؤسسي، تعمل في الجامعة منذ 10 سنوات', 'أ. سارة خالد (EN) specializes in media and communications with extensive experience in university public relations. They have played a key role in enhancing the university\'s media presence and establishing effective communication channels with the community.', '/images/authors/sara.jpg', 1, 0),
(3, 'د. أحمد علي', 'د. أحمد علي (EN)', 'عميد كلية الهندسة', 'EN: عميد كلية الهندسة', 'دكتوراه في الهندسة الميكانيكية، له العديد من الأبحاث المنشورة في مجلات علمية عالمية', 'د. أحمد علي (EN) is a talented writer and researcher who has contributed numerous articles and research papers to academic and public publications. Their work focuses on educational development and academic innovation.', '/images/authors/ahmed.jpg', 1, 0);

-- --------------------------------------------------------

--
-- بنية الجدول `news_categories`
--

CREATE TABLE `news_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `name_en` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `display_order` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `news_categories`
--

INSERT INTO `news_categories` (`id`, `name`, `name_en`, `description`, `description_en`, `icon`, `is_active`, `display_order`) VALUES
(1, 'أخبار الجامعة', 'University News', 'أحدث أخبار الجامعة والفعاليات الرسمية', 'Latest university news and updates', 'university', 1, 1),
(2, 'إعلانات', 'Announcements', 'إعلانات هامة للطلاب وأعضاء هيئة التدريس', 'Important announcements and notifications', 'announcement', 1, 2),
(3, 'إنجازات', 'EN: إنجازات', 'إنجازات الجامعة والطلاب وأعضاء هيئة التدريس', 'English description for: إنجازات', 'achievement', 1, 3),
(4, 'فعاليات', 'Events', 'فعاليات وأنشطة الجامعة المختلفة', 'Events and activities at the university', 'event', 1, 4),
(5, 'مقالات علمية', 'EN: مقالات علمية', 'مقالات علمية وبحثية', 'Articles and opinion pieces', 'research', 1, 5);

-- --------------------------------------------------------

--
-- بنية الجدول `news_media`
--

CREATE TABLE `news_media` (
  `id` int(11) NOT NULL,
  `news_id` int(11) NOT NULL,
  `media_type` enum('image','video','embed') NOT NULL,
  `url` varchar(255) NOT NULL,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `caption_en` varchar(255) DEFAULT NULL,
  `display_order` int(11) DEFAULT 0,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `news_media`
--

INSERT INTO `news_media` (`id`, `news_id`, `media_type`, `url`, `thumbnail_url`, `caption`, `caption_en`, `display_order`, `width`, `height`, `duration`, `is_active`) VALUES
(4, 3, 'image', '/images/news/innovation-team.jpg', '/images/news/innovation-team-thumb.jpg', 'فريق كلية الهندسة الفائز بالمركز الأول', 'Students participating in community service activities and volunteer work', 1, 1200, 800, NULL, 1),
(5, 3, 'image', '/images/news/innovation-project.jpg', '/images/news/innovation-project-thumb.jpg', 'المشروع الفائز في مسابقة الابتكار', 'Workshop activities and interactive discussions between participants', 2, 1200, 800, NULL, 1),
(6, 3, 'video', '/videos/innovation-interview.mp4', '/images/news/innovation-video-thumb.jpg', 'مقابلة مع أعضاء الفريق الفائز', 'University president during his speech at the opening ceremony', 3, 1920, 1080, 240, 1),
(7, 6, 'image', '/images/news/platform-screenshot.jpg', '/images/news/platform-screenshot-thumb.jpg', 'لقطة من المنصة الإلكترونية الجديدة', 'Honoring outstanding students and participants for their achievements', 1, 1200, 800, NULL, 1),
(8, 6, 'video', '/videos/platform-tutorial.mp4', '/images/news/platform-video-thumb.jpg', 'شرح استخدام المنصة الإلكترونية الجديدة', 'Image from the university event showing participants and attendees', 2, 1920, 1080, 300, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alumni`
--
ALTER TABLE `alumni`
  ADD PRIMARY KEY (`id`),
  ADD KEY `major_id` (`major_id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indexes for table `alumni_achievements`
--
ALTER TABLE `alumni_achievements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `alumni_id` (`alumni_id`);

--
-- Indexes for table `alumni_colleges`
--
ALTER TABLE `alumni_colleges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `alumni_companies`
--
ALTER TABLE `alumni_companies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `alumni_images`
--
ALTER TABLE `alumni_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `alumni_id` (`alumni_id`);

--
-- Indexes for table `alumni_majors`
--
ALTER TABLE `alumni_majors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_major_college` (`college_id`);

--
-- Indexes for table `alumni_settings`
--
ALTER TABLE `alumni_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `alumni_stories`
--
ALTER TABLE `alumni_stories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug_ar_unique` (`slug_ar`),
  ADD UNIQUE KEY `slug_en_unique` (`slug_en`),
  ADD KEY `alumni_id` (`alumni_id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `author_id` (`author_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `idx_title_en` (`title_en`),
  ADD KEY `idx_content_en` (`content_en`(255));

--
-- Indexes for table `news_authors`
--
ALTER TABLE `news_authors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_name_en` (`name_en`);

--
-- Indexes for table `news_categories`
--
ALTER TABLE `news_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_name_en` (`name_en`);

--
-- Indexes for table `news_media`
--
ALTER TABLE `news_media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `news_id` (`news_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alumni`
--
ALTER TABLE `alumni`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `alumni_achievements`
--
ALTER TABLE `alumni_achievements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `alumni_colleges`
--
ALTER TABLE `alumni_colleges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `alumni_companies`
--
ALTER TABLE `alumni_companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `alumni_images`
--
ALTER TABLE `alumni_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `alumni_majors`
--
ALTER TABLE `alumni_majors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `alumni_settings`
--
ALTER TABLE `alumni_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `alumni_stories`
--
ALTER TABLE `alumni_stories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `news_authors`
--
ALTER TABLE `news_authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `news_categories`
--
ALTER TABLE `news_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `news_media`
--
ALTER TABLE `news_media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- قيود الجداول المُلقاة.
--

--
-- قيود الجداول `alumni`
--
ALTER TABLE `alumni`
  ADD CONSTRAINT `alumni_ibfk_1` FOREIGN KEY (`major_id`) REFERENCES `alumni_majors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `alumni_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `alumni_companies` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `alumni_achievements`
--
ALTER TABLE `alumni_achievements`
  ADD CONSTRAINT `alumni_achievements_ibfk_1` FOREIGN KEY (`alumni_id`) REFERENCES `alumni` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `alumni_images`
--
ALTER TABLE `alumni_images`
  ADD CONSTRAINT `alumni_images_ibfk_1` FOREIGN KEY (`alumni_id`) REFERENCES `alumni` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `alumni_majors`
--
ALTER TABLE `alumni_majors`
  ADD CONSTRAINT `fk_major_college` FOREIGN KEY (`college_id`) REFERENCES `alumni_colleges` (`id`) ON DELETE SET NULL;

--
-- قيود الجداول `alumni_stories`
--
ALTER TABLE `alumni_stories`
  ADD CONSTRAINT `alumni_stories_ibfk_1` FOREIGN KEY (`alumni_id`) REFERENCES `alumni` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `news_media`
--
ALTER TABLE `news_media`
  ADD CONSTRAINT `news_media_ibfk_1` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
