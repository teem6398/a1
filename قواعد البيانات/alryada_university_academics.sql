-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 13 يوليو 2025 الساعة 08:18
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
-- Database: `alryada_university_academics`
--

-- --------------------------------------------------------

--
-- بنية الجدول `achievement_types`
--

CREATE TABLE `achievement_types` (
  `type_id` int(11) NOT NULL,
  `type_name` varchar(100) NOT NULL,
  `type_name_en` varchar(100) DEFAULT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `color` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `achievement_types`
--

INSERT INTO `achievement_types` (`type_id`, `type_name`, `type_name_en`, `icon`, `color`) VALUES
(1, 'مسابقة أكاديمية', 'Academic Competition', 'emoji_events', 'amber'),
(2, 'تفوق أكاديمي', 'Academic Excellence', 'school', 'green'),
(3, 'مشروع تقني', 'Technical Project', 'computer', 'blue'),
(4, 'تقدير', 'Recognition', 'workspace_premium', 'orange'),
(5, 'نشاط طلابي', 'Student Activity', 'groups', 'purple'),
(6, 'بحث علمي', 'Scientific Research', 'science', 'indigo'),
(7, 'خدمة مجتمعية', 'Community Service', 'volunteer_activism', 'pink');

-- --------------------------------------------------------

--
-- بنية الجدول `admins`
--

CREATE TABLE `admins` (
  `admin_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` varchar(20) DEFAULT 'admin',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `admins`
--

INSERT INTO `admins` (`admin_id`, `name`, `email`, `password_hash`, `role`, `created_at`, `updated_at`) VALUES
(1, 'احمد ', 'admin@alryada.edu', 'hashed_password_example_1', 'super_admin', '2025-06-04 20:03:31', '2025-06-04 20:05:33'),
(2, 'مدير القبول والتسجيل', 'registrar@alryada.edu', 'hashed_password_example_2', 'admin', '2025-06-04 20:03:31', '2025-06-04 20:03:31'),
(3, 'مسؤول النظام', 'sysadmin@alryada.edu', 'hashed_password_example_3', 'admin', '2025-06-04 20:03:31', '2025-06-04 20:03:31');

-- --------------------------------------------------------

--
-- بنية الجدول `batches`
--

CREATE TABLE `batches` (
  `batch_id` int(11) NOT NULL,
  `batch_year` year(4) NOT NULL,
  `batch_name` varchar(100) NOT NULL,
  `program_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `batches`
--

INSERT INTO `batches` (`batch_id`, `batch_year`, `batch_name`, `program_id`) VALUES
(1, '2020', 'تقنية معلومات', 4),
(2, '2020', 'صيدله ', 1),
(3, '2020', 'صيدلة', 2),
(4, '2020', 'ادارة اعمال ', 8),
(5, '2020', 'محاسبة', 7),
(6, '2020', 'طب بشري', 6);

-- --------------------------------------------------------

--
-- بنية الجدول `colleges`
--

CREATE TABLE `colleges` (
  `college_id` int(11) NOT NULL,
  `college_name_ar` varchar(100) NOT NULL,
  `college_name_en` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `colleges`
--

INSERT INTO `colleges` (`college_id`, `college_name_ar`, `college_name_en`) VALUES
(1, 'كلية الهندسة', 'colleges of Engineering'),
(2, 'كلية الطب', 'colleges of Medicine'),
(3, 'كلية العلوم الادارية ', 'colleges of Administrative sciences');

-- --------------------------------------------------------

--
-- بنية الجدول `college_deans`
--

CREATE TABLE `college_deans` (
  `dean_id` int(11) NOT NULL,
  `full_name_ar` varchar(100) NOT NULL,
  `full_name_en` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `gender` enum('ذكر','أنثى') DEFAULT NULL,
  `academic_rank` enum('دكتور','بروفيسور') NOT NULL,
  `college_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `college_deans`
--

INSERT INTO `college_deans` (`dean_id`, `full_name_ar`, `full_name_en`, `email`, `phone`, `gender`, `academic_rank`, `college_id`) VALUES
(1, 'احمد عبده ', 'Ahmed abdo', 'ahmed@gmail.com', '778585462', 'ذكر', 'دكتور', 1),
(2, 'فاطمة ثابت ', 'Fatima thabet', 'fatma@gmail.com', '777', 'أنثى', 'دكتور', 2),
(3, 'محمد صالح ', 'Mohammed saleh', 'mohmmed@gmail.com', '777', 'ذكر', 'دكتور', 3);

-- --------------------------------------------------------

--
-- بنية الجدول `courses`
--

CREATE TABLE `courses` (
  `course_id` int(11) NOT NULL,
  `course_name` varchar(100) NOT NULL,
  `teacher_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `courses`
--

INSERT INTO `courses` (`course_id`, `course_name`, `teacher_id`) VALUES
(1, 'English Language (1)', 10),
(2, 'Arabic Language (1)', 7),
(3, 'English Language (2)', 10),
(4, 'Arabic Language (2)', 7),
(5, 'Computer Programming (1)', 4),
(6, 'Computer Programming (2)', 4),
(7, 'Islamic Culture', 3),
(8, 'Introduction to Computer', NULL),
(9, 'Computer Applications', NULL),
(10, 'Calculus (1)', 9),
(11, 'Calculus (2)', 9),
(12, 'Digital Logic Design', 1),
(13, 'Discrete Mathematics', 9),
(14, 'Object oriented programming', 4),
(15, 'Principles of Information Systems', NULL),
(16, 'Operating Systems (Basic)', 1),
(17, 'Computer Org.& Architecture', 1),
(18, 'Numerical Analysis', 9),
(19, 'Principals of Management', NULL),
(20, 'Data Structures', 4),
(21, 'Database System ( Basics)', 2),
(22, ' Systems Analysis & Design', NULL),
(23, 'Microprocessor', 4),
(24, 'Probability & Statistics', NULL),
(25, 'Communication Skills', 1),
(28, 'Visual Programming', NULL),
(29, 'Advance Database System', NULL),
(30, 'Web Design', NULL),
(31, 'Computer Networks', NULL),
(32, 'Multimedia Technologies', NULL),
(33, 'E-Commerce & Business Technology', NULL),
(34, 'Java Programming', NULL),
(35, 'Operating Systems (Advance)', NULL),
(36, 'Web Development', NULL),
(37, 'Computer Networks (2)', NULL),
(38, ' Current in IT', NULL),
(39, 'Human Computer Interaction', NULL),
(40, 'Mobile Applications (With Java)', NULL),
(41, 'Software Engineering', NULL),
(42, 'Scientific Research Methodology', NULL),
(43, 'Data and Computer Security', NULL),
(44, 'Graduation Project (1)', NULL),
(45, 'Artificial Intelligence', NULL),
(46, 'Graduation Project (2)', NULL),
(47, 'Occupation Ethics', NULL),
(48, 'Simulation and modeling', NULL),
(49, 'Internet of things', NULL),
(50, 'Cloud Computing', NULL),
(51, 'Neural Network', NULL),
(52, 'Data Mining', NULL),
(53, 'Machine Learning', NULL);

-- --------------------------------------------------------

--
-- بنية الجدول `grades`
--

CREATE TABLE `grades` (
  `sr` int(11) NOT NULL,
  `detail_id` int(11) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL,
  `grade` decimal(5,2) DEFAULT NULL,
  `evaluation` varchar(50) DEFAULT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `grades`
--

INSERT INTO `grades` (`sr`, `detail_id`, `student_id`, `grade`, `evaluation`, `notes`) VALUES
(1, 1, 1, 90.50, 'A', 'ممتاز'),
(2, 2, 1, 99.00, 'B+', 'جيد جدا'),
(3, 3, 1, 88.50, 'A-', 'ممتاز'),
(4, 4, 1, 92.00, 'A', 'ممتاز'),
(5, 5, 1, 82.50, 'B', 'جيد'),
(6, 6, 1, 87.50, 'A-', 'ممتاز'),
(7, 7, 1, 80.00, 'B', 'جيد'),
(8, 8, 1, 85.00, 'B+', 'جيد جدا'),
(9, 9, 1, 91.00, 'A', 'ممتاز'),
(10, 10, 1, 75.00, 'C+', 'متوسط'),
(11, 11, 1, 86.00, 'B+', 'جيد جدا'),
(12, 12, 1, 88.00, 'A-', 'ممتاز'),
(13, 13, 1, 82.00, 'B', 'جيد'),
(14, 14, 1, 93.00, 'A', 'ممتاز'),
(15, 15, 1, 81.00, 'B', 'جيد'),
(16, 16, 1, 76.00, 'C+', 'متوسط'),
(17, 17, 1, 78.00, 'B-', 'جيد'),
(18, 18, 1, 87.00, 'A-', 'ممتاز'),
(19, 1, 2, 88.00, 'A-', 'ممتاز'),
(20, 2, 2, 82.00, 'B', 'جيد'),
(21, 3, 2, 85.00, 'B+', 'جيد جدا'),
(22, 4, 2, 90.00, 'A', 'ممتاز'),
(23, 5, 2, 78.00, 'B-', 'جيد'),
(24, 6, 2, 84.00, 'B', 'جيد'),
(25, 7, 2, 79.00, 'C+', 'متوسط'),
(26, 8, 2, 83.00, 'B', 'جيد'),
(27, 9, 2, 88.00, 'A-', 'ممتاز'),
(28, 10, 2, 72.00, 'C', 'متوسط');

-- --------------------------------------------------------

--
-- بنية الجدول `levels`
--

CREATE TABLE `levels` (
  `level_id` int(11) NOT NULL,
  `level_number` int(11) NOT NULL,
  `program_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `levels`
--

INSERT INTO `levels` (`level_id`, `level_number`, `program_id`) VALUES
(1, 1, 4),
(2, 2, 4),
(3, 3, 4),
(4, 4, 4);

-- --------------------------------------------------------

--
-- بنية الجدول `majors`
--

CREATE TABLE `majors` (
  `major_id` int(11) NOT NULL,
  `major_name_ar` varchar(100) NOT NULL,
  `major_name_en` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `majors`
--

INSERT INTO `majors` (`major_id`, `major_name_ar`, `major_name_en`) VALUES
(1, 'تقنية المعلومات ', 'Information Technology'),
(2, 'الهندسة المعمارية', 'Architectural Engineering'),
(3, 'الطب البشري', 'Human medicine'),
(4, 'طب الاسنان', 'Dentistry'),
(5, 'الصيدلة', 'Pharmacy'),
(6, 'المختبرات', 'Medical Laboratory Sciences '),
(7, 'المحاسبة', 'Accounting'),
(8, 'ادارة الاعمال', 'Business Administration');

-- --------------------------------------------------------

--
-- بنية الجدول `programs`
--

CREATE TABLE `programs` (
  `program_id` int(11) NOT NULL,
  `degree_scientific` varchar(100) NOT NULL,
  `program_name` varchar(100) NOT NULL,
  `major_id` int(11) DEFAULT NULL,
  `college_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `programs`
--

INSERT INTO `programs` (`program_id`, `degree_scientific`, `program_name`, `major_id`, `college_id`) VALUES
(1, 'دبلوم', 'دبلوم صيدلة', 5, 2),
(2, 'بكالوريوس ', 'بكالوريوس صيدلة', 5, 2),
(3, 'دبلوم ', 'دبلوم صيدلة ', 5, 2),
(4, 'بكالوريوس ', 'بكالوريوس تقنية معلومات', 1, 1),
(5, 'بكالوريوس', 'بكالوريوس هندسة معمارية', 2, 1),
(6, 'بكالوريوس', 'بكالوريوس طب بشري', 3, 2),
(7, 'بكالوريوس ', 'بكالوريوس محاسبة', 7, 3),
(8, 'بكالوريوس ', 'بكالوريوس ادارة اعمال', 8, 3),
(9, 'بكالوريوس ', 'بكالوريوس طب اسنان', 4, 2),
(10, 'ماجستير', 'ماجستير تقنية معلومات', 1, 1);

-- --------------------------------------------------------

--
-- بنية الجدول `publication_categories`
--

CREATE TABLE `publication_categories` (
  `category_id` int(11) NOT NULL,
  `name_ar` varchar(100) NOT NULL,
  `name_en` varchar(100) DEFAULT NULL,
  `description_ar` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `icon` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `publication_categories`
--

INSERT INTO `publication_categories` (`category_id`, `name_ar`, `name_en`, `description_ar`, `description_en`, `icon`) VALUES
(1, 'محاضرات', 'Lectures', 'محاضرات المواد الدراسية', 'Course lectures', 'book'),
(2, 'أبحاث علمية', 'Research Papers', 'أبحاث ومنشورات علمية', 'Academic research and papers', 'file-text'),
(3, 'مواد تعليمية', 'Educational Materials', 'مواد تعليمية إضافية', 'Additional educational materials', 'folder'),
(4, 'مشاريع طلابية', 'Student Projects', 'مشاريع الطلاب المتميزة', 'Outstanding student projects', 'users');

-- --------------------------------------------------------

--
-- بنية الجدول `publication_category_relations`
--

CREATE TABLE `publication_category_relations` (
  `relation_id` int(11) NOT NULL,
  `publication_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `publication_category_relations`
--

INSERT INTO `publication_category_relations` (`relation_id`, `publication_id`, `category_id`) VALUES
(5, 4, 1),
(6, 4, 3),
(17, 14, 1),
(18, 14, 3),
(28, 19, 2),
(27, 19, 3),
(26, 19, 4),
(29, 20, 4);

-- --------------------------------------------------------

--
-- بنية الجدول `publication_comments`
--

CREATE TABLE `publication_comments` (
  `comment_id` int(11) NOT NULL,
  `publication_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_type` enum('student','teacher','admin') NOT NULL,
  `comment_text` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('approved','pending','rejected') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- بنية الجدول `publication_tags`
--

CREATE TABLE `publication_tags` (
  `tag_id` int(11) NOT NULL,
  `name_ar` varchar(50) NOT NULL,
  `name_en` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `publication_tags`
--

INSERT INTO `publication_tags` (`tag_id`, `name_ar`, `name_en`) VALUES
(1, 'برمجة', 'Programming'),
(2, 'هندسة', 'Engineering'),
(3, 'علوم الحاسب', 'Computer Science'),
(4, 'تعليم', 'Education'),
(5, 'بحث علمي', 'Research'),
(6, 'تكنولوجيا', 'Technology');

-- --------------------------------------------------------

--
-- بنية الجدول `publication_tag_relations`
--

CREATE TABLE `publication_tag_relations` (
  `relation_id` int(11) NOT NULL,
  `publication_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `publication_tag_relations`
--

INSERT INTO `publication_tag_relations` (`relation_id`, `publication_id`, `tag_id`) VALUES
(7, 4, 1),
(8, 4, 3),
(22, 14, 1),
(21, 14, 5),
(31, 19, 1),
(30, 19, 5),
(33, 20, 4),
(32, 20, 5);

-- --------------------------------------------------------

--
-- بنية الجدول `semesters`
--

CREATE TABLE `semesters` (
  `semester_id` int(11) NOT NULL,
  `semester_name` varchar(50) NOT NULL,
  `level_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `semesters`
--

INSERT INTO `semesters` (`semester_id`, `semester_name`, `level_id`) VALUES
(1, 'الفصل الأول', 1),
(2, 'الفصل الثاني', 1),
(3, 'الفصل الأول', 2),
(4, 'الفصل الثاني', 2),
(5, 'الفصل الأول', 3),
(6, 'الفصل الثاني', 3),
(7, 'الفصل الأول', 4),
(8, 'الفصل الثاني', 4);

-- --------------------------------------------------------

--
-- بنية الجدول `students`
--

CREATE TABLE `students` (
  `student_id` int(11) NOT NULL,
  `enrollment_number` varchar(50) NOT NULL,
  `first_name_ar` varchar(50) NOT NULL,
  `first_name_en` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `gender` enum('ذكر','أنثى') NOT NULL,
  `birth_date` date NOT NULL,
  `batch_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `photo_url` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `students`
--

INSERT INTO `students` (`student_id`, `enrollment_number`, `first_name_ar`, `first_name_en`, `email`, `gender`, `birth_date`, `batch_id`, `created_at`, `photo_url`, `password`) VALUES
(1, '1', 'ياسر عدنان ', 'ahmed mustafa khder', NULL, 'ذكر', '2002-08-04', 1, '2025-06-04 20:10:03', '/Sudents/y1.jpg', ''),
(2, '21201388', 'عبدللة مختار ', 'abdllah maktar', 'asas@mamsm', 'ذكر', '2002-04-21', 3, '2025-06-04 20:37:41', '/image/1.jpg', ''),
(3, '21201389', 'صالح سالم سالم حسين ثابت', 'sa', 'asas@sas', 'ذكر', '2001-05-21', 1, '2025-06-04 20:37:41', '/image/1.jpg', ''),
(4, '21201398', 'ريما علي  علي فضل', 'salh', 'mmmmmmm', 'أنثى', '2002-02-02', 1, '2025-06-04 22:30:13', '/image/1.jpg', ''),
(5, '21201354', 'محمد عبد الرحمان ', 'mmm', 'mmmm', 'ذكر', '2000-02-05', 1, '2025-06-04 22:30:13', '/image/1.jpg', ''),
(6, '25201388', 'ياسر عدنان أحمد عبدالملك ( مندوبنا)', 'm', 'mmm', 'ذكر', '2000-05-14', 1, '2025-06-04 22:37:02', '/image/1.jpg', ''),
(7, '21201380', 'عمر محمد عوض مسعود ', 'omer', 'omer@gmail.com', 'ذكر', '2002-08-04', 1, '2025-07-11 10:51:04', '/image/1.jpg', ''),
(8, '21201379', 'نواف ', '', 'n@gmail.com', 'ذكر', '2000-07-01', 1, '2025-07-11 10:51:04', '/image/1.jpg', '');

-- --------------------------------------------------------

--
-- بنية الجدول `student_achievements`
--

CREATE TABLE `student_achievements` (
  `achievement_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `title_en` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `description_en` text DEFAULT NULL,
  `achievement_date` date NOT NULL,
  `achievement_type` varchar(100) DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT 0,
  `icon` varchar(50) DEFAULT NULL,
  `color` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `student_achievements`
--

INSERT INTO `student_achievements` (`achievement_id`, `student_id`, `title`, `title_en`, `description`, `description_en`, `achievement_date`, `achievement_type`, `is_verified`, `icon`, `color`, `created_at`, `updated_at`) VALUES
(1, 1, 'المركز الأول في مسابقة البرمجة', 'First Place in Programming Competition', 'حصل على المركز الأول في مسابقة البرمجة على مستوى الجامعة', 'Won first place in the university-level programming competition', '2024-03-15', 'مسابقة أكاديمية', 1, 'emoji_events', 'amber', '2025-06-29 05:35:57', '2025-06-29 05:35:57'),
(2, 1, 'شهادة تقدير للتفوق الأكاديمي', 'Certificate of Academic Excellence', 'حصل على شهادة تقدير لحصوله على معدل عالي في الفصل الأول', 'Received a certificate of appreciation for achieving a high GPA in the first semester', '2024-01-20', 'تفوق أكاديمي', 1, 'school', 'green', '2025-06-29 05:35:57', '2025-06-29 05:35:57'),
(3, 1, 'مشروع تطبيق جوال مميز', 'Outstanding Mobile Application Project', 'تطوير تطبيق جوال مبتكر لإدارة المكتبة الجامعية', 'Developed an innovative mobile application for university library management', '2024-02-10', 'مشروع تقني', 0, 'phone_android', 'blue', '2025-06-29 05:35:57', '2025-06-29 05:35:57'),
(4, 2, 'شهادة تقدير', 'Certificate of Appreciation', 'حصل على شهادة تقدير للأداء المتميز', 'Received a certificate of appreciation for outstanding performance', '2024-01-10', 'تقدير', 1, 'workspace_premium', 'orange', '2025-06-29 05:35:57', '2025-06-29 05:35:57'),
(5, 3, 'المركز الثاني في مسابقة الصيدلة', 'Second Place in Pharmacy Competition', 'حصل على المركز الثاني في مسابقة الصيدلة السريرية', 'Won second place in the clinical pharmacy competition', '2024-02-25', 'مسابقة أكاديمية', 1, 'medical_services', 'purple', '2025-06-29 05:35:57', '2025-06-29 05:35:57');

-- --------------------------------------------------------

--
-- بنية الجدول `study_plans`
--

CREATE TABLE `study_plans` (
  `plan_id` int(11) NOT NULL,
  `batch_id` int(11) DEFAULT NULL,
  `program_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `study_plans`
--

INSERT INTO `study_plans` (`plan_id`, `batch_id`, `program_id`) VALUES
(1, 1, 4);

-- --------------------------------------------------------

--
-- بنية الجدول `study_plan_details`
--

CREATE TABLE `study_plan_details` (
  `detail_id` int(11) NOT NULL,
  `plan_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `level_id` int(11) DEFAULT NULL,
  `semester_id` int(11) DEFAULT NULL,
  `credit_hours` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `study_plan_details`
--

INSERT INTO `study_plan_details` (`detail_id`, `plan_id`, `course_id`, `level_id`, `semester_id`, `credit_hours`) VALUES
(1, 1, 1, 1, 1, 3),
(2, 1, 2, 1, 1, 2),
(3, 1, 5, 1, 1, 4),
(4, 1, 7, 1, 1, 2),
(5, 1, 10, 1, 1, 3),
(6, 1, 3, 1, 2, 3),
(7, 1, 4, 1, 2, 2),
(8, 1, 6, 1, 2, 4),
(9, 1, 8, 1, 2, 3),
(10, 1, 11, 1, 2, 3),
(11, 1, 12, 2, 3, 3),
(12, 1, 13, 2, 3, 3),
(13, 1, 14, 2, 3, 4),
(14, 1, 15, 2, 3, 3),
(15, 1, 16, 2, 4, 3),
(16, 1, 17, 2, 4, 3),
(17, 1, 18, 2, 4, 3),
(18, 1, 20, 2, 4, 4);

-- --------------------------------------------------------

--
-- بنية الجدول `teachers`
--

CREATE TABLE `teachers` (
  `teacher_id` int(11) NOT NULL,
  `name_ar` varchar(50) NOT NULL,
  `name_en` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `gender` enum('ذكر','أنثى') DEFAULT NULL,
  `hire_date` date DEFAULT NULL,
  `degree` enum('بكالوريوس','ماجستير','دكتوراه') NOT NULL,
  `college_id` int(11) DEFAULT NULL,
  `department_name` varchar(100) DEFAULT NULL,
  `years_of_experience` int(11) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `image_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `teachers`
--

INSERT INTO `teachers` (`teacher_id`, `name_ar`, `name_en`, `email`, `phone`, `gender`, `hire_date`, `degree`, `college_id`, `department_name`, `years_of_experience`, `bio`, `created_at`, `image_path`) VALUES
(1, 'أحمد عبده علي سعيد', ' Ahmed Abdo Ali Saeed', 'ahmed@gmail.com', '736801342', 'ذكر', '2020-05-14', 'دكتوراه', 1, 'تقنية المعلومات ', 40, 'نص تجريبي نص تجريبي  نص تجريبي نص تجريبي نص تجريبي نص تجريبي ', '2025-06-04 20:10:32', '/deans/1737840705873.jpg'),
(2, 'عادل سلام محمد حيدر ', 'Adel Sallam Mohamed Haider', 'haider.adel@gmail.com', '777464454', 'ذكر', '2020-05-13', 'دكتوراه', 1, 'تقنية المعلومات', 40, 'نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي ', '2025-06-04 20:10:32', '/Teachers/2.jpg'),
(3, 'جبران ناجي جبران يحيى ', 'Jibran Naji Jibran Yahya', 'obran2010@gmail.com', '772499616', 'ذكر', '2020-05-27', 'دكتوراه', NULL, NULL, 25, NULL, '2025-06-04 20:10:32', '/Teachers/1.png'),
(4, 'محبوب علي محمد ناجي', 'Mahboub Ali Mohammed Naji', 'AboodiHabeeb@Gmail.com', '78566024', 'ذكر', '2020-05-07', 'دكتوراه', 1, 'تقنية المعلومات ', 25, NULL, '2025-06-04 20:10:32', '/Teachers/1.jpg'),
(5, 'محمد ابراهيم عبدالوارث الاغبري', 'Mohamad Ebrahim Abdulwarith Al-Aghbari', ' mohamedalaghbari6@gmail.com', '777336200', 'ذكر', '2020-05-21', 'دكتوراه', 1, NULL, 40, NULL, '2025-06-04 20:10:32', '/Teachers/1.jpg'),
(6, 'فواز احمد غالب نعمان ', 'FAWAZ AHMED GHALEB NOMAN', ' fawazag75@gmail.com', '887452777', 'ذكر', '2021-05-19', 'دكتوراه', 1, 'ميكروتيك ', 40, NULL, '2025-06-04 20:10:32', '/Teachers/3.png'),
(7, 'سالم علي أحمد الميسري', 'salem ali ahmed al-mysri', 'salemalmisary@gmail.com ', '777209250', 'ذكر', '2020-05-06', 'دكتوراه', NULL, NULL, 30, NULL, '2025-06-04 20:10:32', '/Teachers/4.png'),
(8, 'دلال نجيب علوان', 'Dalal Najeeb Alwan', 'DalalNajeeb99@gmail.com ', '771686831', 'أنثى', '2024-11-06', 'بكالوريوس', 1, 'تقنية المعلومات', 2, NULL, '2025-06-04 20:10:32', '/Teachers/1.jpg'),
(9, 'جمال قشاش', 'Gamal qashash', 'gamal@gmail.com', '777', 'ذكر', '2019-05-09', 'دكتوراه', NULL, NULL, 35, NULL, '2025-06-04 20:10:32', '/Teachers/1.jpg'),
(10, 'عبدة سعيد ', '', 'gmail.com ', '77021555', 'ذكر', '2020-05-07', 'دكتوراه', 3, 'العلوم الادارية', 25, NULL, '2025-06-04 20:10:32', '/Teachers/5.png');

-- --------------------------------------------------------

--
-- بنية الجدول `teacher_advice`
--

CREATE TABLE `teacher_advice` (
  `advice_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `title_ar` varchar(255) NOT NULL,
  `title_en` varchar(255) DEFAULT NULL,
  `content_ar` text NOT NULL,
  `content_en` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `teacher_advice`
--

INSERT INTO `teacher_advice` (`advice_id`, `teacher_id`, `title_ar`, `title_en`, `content_ar`, `content_en`, `category`, `created_at`) VALUES
(1, 1, 'نصائح للطلاب الجدد', 'Tips for New Students', 'يجب على الطلاب الجدد الاهتمام بحضور المحاضرات والمشاركة الفعالة في الأنشطة الصفية.', 'New students should focus on attending lectures and actively participating in classroom activities.', 'أكاديمية', '2025-07-05 19:56:44');

-- --------------------------------------------------------

--
-- بنية الجدول `teacher_publications`
--

CREATE TABLE `teacher_publications` (
  `publication_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `title_ar` varchar(255) NOT NULL,
  `title_en` varchar(255) DEFAULT NULL,
  `description_ar` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `media_type` enum('video','image','pdf','powerpoint') NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `thumbnail_path` varchar(255) DEFAULT NULL,
  `publication_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_featured` tinyint(1) DEFAULT 0,
  `view_count` int(11) DEFAULT 0,
  `status` enum('published','draft','archived') DEFAULT 'published'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `teacher_publications`
--

INSERT INTO `teacher_publications` (`publication_id`, `teacher_id`, `title_ar`, `title_en`, `description_ar`, `description_en`, `media_type`, `file_path`, `thumbnail_path`, `publication_date`, `is_featured`, `view_count`, `status`) VALUES
(4, 3, 'شرح خوارزميات البحث', 'Explaining Search Algorithms', 'فيديو تعليمي يشرح خوارزميات البحث المختلفة', 'Educational video explaining different search algorithms', 'video', '/uploads/teachers/3/videos/search_algorithms.mp4', '/uploads/teachers/3/thumbnails/search_algorithms.jpg', '2025-06-23 23:40:27', 1, 0, 'published'),
(14, 1, 'عليsd', 'سشس', 'شسشس', 'sasas', 'image', '/Teachers/1/publications/516aa464-26cf-42df-8104-e38d553a8378.jpg', '/Teachers/1/thumbnails/a002ba9b-adbf-4f7a-af73-e9cf75e94b1d.jpg', '2025-07-04 20:53:56', 0, 0, 'published'),
(19, 2, 'ملزمة الشبكات ', 'Network', 'هناك اشياء محدوفة به صفحة 9-16', 'there things deleted is 9 to 16', 'pdf', '/Teachers/2/publications/1f0e1e70-cacc-4aee-a6b4-b4bf2b2e364d.pdf', '/Teachers/2/thumbnails/44e260ff-0a3b-44e9-bbf4-eead4a420d0f.png', '2025-07-05 18:40:56', 0, 0, 'published'),
(20, 2, 'ششس', 'asas', 'يلنبخ', 'jdsjdkd', 'video', '/Teachers/2/publications/225e82b6-e134-466b-9869-897c417a1408.mp4', '/Teachers/2/thumbnails/bc4c34b4-11f6-47e8-a421-11c94f1d6fea.jpg', '2025-07-06 10:39:08', 0, 0, 'published');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `achievement_types`
--
ALTER TABLE `achievement_types`
  ADD PRIMARY KEY (`type_id`);

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `batches`
--
ALTER TABLE `batches`
  ADD PRIMARY KEY (`batch_id`),
  ADD KEY `program_id` (`program_id`);

--
-- Indexes for table `colleges`
--
ALTER TABLE `colleges`
  ADD PRIMARY KEY (`college_id`);

--
-- Indexes for table `college_deans`
--
ALTER TABLE `college_deans`
  ADD PRIMARY KEY (`dean_id`),
  ADD UNIQUE KEY `college_id` (`college_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_id`),
  ADD KEY `fk_teacher_course` (`teacher_id`);

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`sr`),
  ADD KEY `detail_id` (`detail_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `levels`
--
ALTER TABLE `levels`
  ADD PRIMARY KEY (`level_id`),
  ADD KEY `program_id` (`program_id`);

--
-- Indexes for table `majors`
--
ALTER TABLE `majors`
  ADD PRIMARY KEY (`major_id`);

--
-- Indexes for table `programs`
--
ALTER TABLE `programs`
  ADD PRIMARY KEY (`program_id`),
  ADD KEY `major_id` (`major_id`),
  ADD KEY `college_id` (`college_id`);

--
-- Indexes for table `publication_categories`
--
ALTER TABLE `publication_categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `publication_category_relations`
--
ALTER TABLE `publication_category_relations`
  ADD PRIMARY KEY (`relation_id`),
  ADD UNIQUE KEY `publication_category_unique` (`publication_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `publication_comments`
--
ALTER TABLE `publication_comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `publication_id` (`publication_id`);

--
-- Indexes for table `publication_tags`
--
ALTER TABLE `publication_tags`
  ADD PRIMARY KEY (`tag_id`);

--
-- Indexes for table `publication_tag_relations`
--
ALTER TABLE `publication_tag_relations`
  ADD PRIMARY KEY (`relation_id`),
  ADD UNIQUE KEY `publication_tag_unique` (`publication_id`,`tag_id`),
  ADD KEY `tag_id` (`tag_id`);

--
-- Indexes for table `semesters`
--
ALTER TABLE `semesters`
  ADD PRIMARY KEY (`semester_id`),
  ADD KEY `level_id` (`level_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `batch_id` (`batch_id`);

--
-- Indexes for table `student_achievements`
--
ALTER TABLE `student_achievements`
  ADD PRIMARY KEY (`achievement_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `study_plans`
--
ALTER TABLE `study_plans`
  ADD PRIMARY KEY (`plan_id`),
  ADD KEY `program_id` (`program_id`),
  ADD KEY `batch_id` (`batch_id`);

--
-- Indexes for table `study_plan_details`
--
ALTER TABLE `study_plan_details`
  ADD PRIMARY KEY (`detail_id`),
  ADD KEY `plan_id` (`plan_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `level_id` (`level_id`),
  ADD KEY `semester_id` (`semester_id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`teacher_id`),
  ADD KEY `fk_teacher_college` (`college_id`);

--
-- Indexes for table `teacher_advice`
--
ALTER TABLE `teacher_advice`
  ADD PRIMARY KEY (`advice_id`),
  ADD KEY `fk_teacher_advice_teacher_idx` (`teacher_id`);

--
-- Indexes for table `teacher_publications`
--
ALTER TABLE `teacher_publications`
  ADD PRIMARY KEY (`publication_id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `achievement_types`
--
ALTER TABLE `achievement_types`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `batches`
--
ALTER TABLE `batches`
  MODIFY `batch_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `colleges`
--
ALTER TABLE `colleges`
  MODIFY `college_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `college_deans`
--
ALTER TABLE `college_deans`
  MODIFY `dean_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `grades`
--
ALTER TABLE `grades`
  MODIFY `sr` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `levels`
--
ALTER TABLE `levels`
  MODIFY `level_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `majors`
--
ALTER TABLE `majors`
  MODIFY `major_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `programs`
--
ALTER TABLE `programs`
  MODIFY `program_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `publication_categories`
--
ALTER TABLE `publication_categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `publication_category_relations`
--
ALTER TABLE `publication_category_relations`
  MODIFY `relation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `publication_comments`
--
ALTER TABLE `publication_comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `publication_tags`
--
ALTER TABLE `publication_tags`
  MODIFY `tag_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `publication_tag_relations`
--
ALTER TABLE `publication_tag_relations`
  MODIFY `relation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `semesters`
--
ALTER TABLE `semesters`
  MODIFY `semester_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `student_achievements`
--
ALTER TABLE `student_achievements`
  MODIFY `achievement_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `study_plans`
--
ALTER TABLE `study_plans`
  MODIFY `plan_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `study_plan_details`
--
ALTER TABLE `study_plan_details`
  MODIFY `detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `teacher_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `teacher_advice`
--
ALTER TABLE `teacher_advice`
  MODIFY `advice_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `teacher_publications`
--
ALTER TABLE `teacher_publications`
  MODIFY `publication_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- قيود الجداول المُلقاة.
--

--
-- قيود الجداول `batches`
--
ALTER TABLE `batches`
  ADD CONSTRAINT `batches_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `programs` (`program_id`);

--
-- قيود الجداول `college_deans`
--
ALTER TABLE `college_deans`
  ADD CONSTRAINT `college_deans_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`college_id`);

--
-- قيود الجداول `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `fk_teacher_course` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`) ON DELETE SET NULL;

--
-- قيود الجداول `grades`
--
ALTER TABLE `grades`
  ADD CONSTRAINT `grades_ibfk_1` FOREIGN KEY (`detail_id`) REFERENCES `study_plan_details` (`detail_id`),
  ADD CONSTRAINT `grades_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

--
-- قيود الجداول `levels`
--
ALTER TABLE `levels`
  ADD CONSTRAINT `levels_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `programs` (`program_id`);

--
-- قيود الجداول `programs`
--
ALTER TABLE `programs`
  ADD CONSTRAINT `programs_ibfk_1` FOREIGN KEY (`major_id`) REFERENCES `majors` (`major_id`),
  ADD CONSTRAINT `programs_ibfk_2` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`college_id`);

--
-- قيود الجداول `publication_category_relations`
--
ALTER TABLE `publication_category_relations`
  ADD CONSTRAINT `publication_category_relations_ibfk_1` FOREIGN KEY (`publication_id`) REFERENCES `teacher_publications` (`publication_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `publication_category_relations_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `publication_categories` (`category_id`) ON DELETE CASCADE;

--
-- قيود الجداول `publication_comments`
--
ALTER TABLE `publication_comments`
  ADD CONSTRAINT `publication_comments_ibfk_1` FOREIGN KEY (`publication_id`) REFERENCES `teacher_publications` (`publication_id`) ON DELETE CASCADE;

--
-- قيود الجداول `publication_tag_relations`
--
ALTER TABLE `publication_tag_relations`
  ADD CONSTRAINT `publication_tag_relations_ibfk_1` FOREIGN KEY (`publication_id`) REFERENCES `teacher_publications` (`publication_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `publication_tag_relations_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `publication_tags` (`tag_id`) ON DELETE CASCADE;

--
-- قيود الجداول `semesters`
--
ALTER TABLE `semesters`
  ADD CONSTRAINT `semesters_ibfk_1` FOREIGN KEY (`level_id`) REFERENCES `levels` (`level_id`);

--
-- قيود الجداول `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`batch_id`) REFERENCES `batches` (`batch_id`);

--
-- قيود الجداول `student_achievements`
--
ALTER TABLE `student_achievements`
  ADD CONSTRAINT `student_achievements_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE;

--
-- قيود الجداول `study_plans`
--
ALTER TABLE `study_plans`
  ADD CONSTRAINT `study_plans_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `programs` (`program_id`),
  ADD CONSTRAINT `study_plans_ibfk_2` FOREIGN KEY (`batch_id`) REFERENCES `batches` (`batch_id`);

--
-- قيود الجداول `study_plan_details`
--
ALTER TABLE `study_plan_details`
  ADD CONSTRAINT `study_plan_details_ibfk_1` FOREIGN KEY (`plan_id`) REFERENCES `study_plans` (`plan_id`),
  ADD CONSTRAINT `study_plan_details_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  ADD CONSTRAINT `study_plan_details_ibfk_3` FOREIGN KEY (`level_id`) REFERENCES `levels` (`level_id`),
  ADD CONSTRAINT `study_plan_details_ibfk_4` FOREIGN KEY (`semester_id`) REFERENCES `semesters` (`semester_id`);

--
-- قيود الجداول `teachers`
--
ALTER TABLE `teachers`
  ADD CONSTRAINT `fk_teacher_college` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`college_id`);

--
-- قيود الجداول `teacher_advice`
--
ALTER TABLE `teacher_advice`
  ADD CONSTRAINT `fk_teacher_advice_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- قيود الجداول `teacher_publications`
--
ALTER TABLE `teacher_publications`
  ADD CONSTRAINT `teacher_publications_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
