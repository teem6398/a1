-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 23 يونيو 2025 الساعة 16:23
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
-- Database: `alryada_university_cms`
--

-- --------------------------------------------------------

--
-- بنية الجدول `skills`
--

CREATE TABLE `skills` (
  `id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `skill_name` varchar(255) NOT NULL,
  `skill_name_en` varchar(255) NOT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `skills`
--

INSERT INTO `skills` (`id`, `program_id`, `skill_name`, `skill_name_en`, `icon`, `created_at`, `updated_at`) VALUES
(1, 1, 'إدارة المشاريع التقنية', 'Technical Project Management', 'gear', '2025-06-03 11:30:02', '2025-06-16 05:39:31'),
(2, 1, 'الذكاء الاصطناعي', 'Artificial Intelligence', 'robot', '2025-06-03 11:30:02', '2025-06-16 05:39:31'),
(3, 1, 'أمن المعلومات', 'Information Security', 'shield', '2025-06-03 11:30:02', '2025-06-16 05:39:31'),
(4, 1, 'تطوير التطبيقات', 'Application Development', 'app', '2025-06-03 11:30:02', '2025-06-16 05:39:31'),
(5, 1, 'تحليل البيانات', 'Data Analysis', 'search', '2025-06-03 11:30:02', '2025-06-16 05:39:31'),
(6, 1, 'البرمجة المتقدمة', 'Advanced Programming', 'laptop', '2025-06-03 11:30:02', '2025-06-16 05:39:31'),
(7, 2, 'التصميم المعماري', 'Architectural Design', '🏛️', '2025-06-03 11:45:07', '2025-06-16 05:42:13'),
(8, 2, 'الرسم والتصور', 'Drawing and Visualization', '🖌️', '2025-06-03 11:45:07', '2025-06-16 05:42:13'),
(9, 2, 'برامج التصميم', 'Design Software', '💻', '2025-06-03 11:45:07', '2025-06-16 05:42:13'),
(10, 2, 'التصميم المستدام', 'Sustainable Design', '🌱', '2025-06-03 11:45:07', '2025-06-16 05:42:13'),
(11, 2, 'تحليل المشكلات', 'Problem Analysis', '🔍', '2025-06-03 11:45:07', '2025-06-16 05:42:13'),
(12, 3, 'تحليل القوائم المالية', 'Financial Statement Analysis', '📊', '2025-06-04 14:42:02', '2025-06-16 05:42:13'),
(13, 3, 'إعداد التقارير المالية', 'Financial Reporting', '🧾', '2025-06-04 14:42:02', '2025-06-16 05:42:13'),
(14, 3, 'استخدام برامج المحاسبة (مثل QuickBooks, SAP)', 'Accounting Software Proficiency (e.g., QuickBooks, SAP)', '💻', '2025-06-04 14:42:02', '2025-06-16 05:42:13'),
(15, 3, 'التدقيق الداخلي والخارجي', 'Internal and External Auditing', '🔍', '2025-06-04 14:42:02', '2025-06-16 05:42:13'),
(16, 3, 'التخطيط المالي وإعداد الموازنات', 'Financial Planning and Budgeting', '🎯', '2025-06-04 14:42:02', '2025-06-16 05:42:13'),
(17, 3, 'تطبيق المعايير المحاسبية الدولية', 'IFRS Application', '🌍', '2025-06-04 14:42:02', '2025-06-16 05:42:13'),
(18, 3, 'التحليل النقدي للمعلومات المالية', 'Financial Data Analysis', '💡', '2025-06-04 14:42:02', '2025-06-16 05:42:13'),
(19, 3, 'مهارات الاتصال وعرض النتائج المالية', 'Communication and Presentation of Financial Results', '🗣️', '2025-06-04 14:42:02', '2025-06-16 05:42:13'),
(20, 4, 'التخطيط الاستراتيجي', 'Strategic Planning', '📊', '2025-06-04 14:57:16', '2025-06-16 05:42:13'),
(21, 4, 'إدارة فرق العمل', 'Team Management', '👥', '2025-06-04 14:57:16', '2025-06-16 05:42:13'),
(22, 4, 'حل المشكلات', 'Problem Solving', '🔍', '2025-06-04 14:57:16', '2025-06-16 05:42:13'),
(23, 4, 'اتخاذ القرار', 'Decision Making', '💼', '2025-06-04 14:57:16', '2025-06-16 05:42:13'),
(24, 4, 'التواصل الفعال', 'Effective Communication', '🗣️', '2025-06-04 14:57:16', '2025-06-16 05:42:13'),
(25, 4, 'التحليل المالي', 'Financial Analysis', '📈', '2025-06-04 14:57:16', '2025-06-16 05:42:14'),
(26, 5, 'التحليل المالي', '', '📊', '2025-06-04 14:58:35', '2025-06-04 14:58:35'),
(27, 5, 'إدارة المخاطر', 'Risk Management', '⚖️', '2025-06-04 14:58:35', '2025-06-16 05:42:14'),
(28, 5, 'تخطيط الاستثمار', 'Investment Planning', '📈', '2025-06-04 14:58:35', '2025-06-16 05:42:14'),
(29, 5, 'إدارة المحافظ الاستثمارية', 'Portfolio Management', '💼', '2025-06-04 14:58:35', '2025-06-16 05:42:14'),
(30, 5, 'التقييم المالي', 'Financial Evaluation', '🔍', '2025-06-04 14:58:35', '2025-06-16 05:42:14'),
(31, 5, 'فهم الأسواق المالية', 'Understanding Financial Markets', '🌐', '2025-06-04 14:58:35', '2025-06-16 05:42:14'),
(32, 6, 'تحليل السوق', 'Market Analysis', '📊', '2025-06-04 15:00:17', '2025-06-16 05:42:14'),
(33, 6, 'التسويق الرقمي', 'Digital Marketing', '💻', '2025-06-04 15:00:17', '2025-06-16 05:42:14'),
(34, 6, 'إدارة الحملات الإعلانية', 'Advertising Campaign Management', '📱', '2025-06-04 15:00:17', '2025-06-16 05:42:14'),
(35, 6, 'التواصل والإقناع', 'Communication and Persuasion', '🗣️', '2025-06-04 15:00:17', '2025-06-16 05:42:14'),
(36, 6, 'استهداف الجمهور', 'Audience Targeting', '🎯', '2025-06-04 15:00:17', '2025-06-16 05:42:14'),
(37, 6, 'تحليل البيانات', '', '🔍', '2025-06-04 15:00:17', '2025-06-04 15:00:17'),
(38, 7, 'التشخيص السني', 'Dental Diagnosis', '🔍', '2025-06-04 15:02:00', '2025-06-16 05:42:14'),
(39, 7, 'العلاج الترميمي', 'Restorative Treatment', '🦷', '2025-06-04 15:02:00', '2025-06-16 05:42:14'),
(40, 7, 'تركيب الأسنان', 'Dental Prosthetics', '🔧', '2025-06-04 15:02:00', '2025-06-16 05:42:14'),
(41, 7, 'الجراحة السنية', 'Oral Surgery', '💉', '2025-06-04 15:02:00', '2025-06-16 05:42:14'),
(42, 7, 'التفكير النقدي', 'Critical Thinking', '🧠', '2025-06-04 15:02:00', '2025-06-16 05:42:14'),
(43, 7, 'التواصل مع المرضى', 'Patient Communication', '🗣️', '2025-06-04 15:02:00', '2025-06-16 05:42:14'),
(44, 8, 'تقنيات المختبرات', 'Laboratory Techniques', '🔬', '2025-06-04 15:02:24', '2025-06-16 05:42:14'),
(45, 8, 'التحليل الكيميائي', 'Chemical Analysis', '🧪', '2025-06-04 15:02:24', '2025-06-16 05:42:14'),
(46, 8, 'الفحص المجهري', 'Microscopic Examination', '🔍', '2025-06-04 15:02:24', '2025-06-16 05:42:14'),
(47, 8, 'تفسير النتائج', 'Results Interpretation', '📊', '2025-06-04 15:02:24', '2025-06-16 05:42:14'),
(48, 8, 'تشغيل الأجهزة المخبرية', 'Laboratory Equipment Operation', '⚙️', '2025-06-04 15:02:24', '2025-06-16 05:42:14'),
(49, 8, 'ضبط الجودة', 'Quality Control', '📝', '2025-06-04 15:02:24', '2025-06-16 05:42:14'),
(50, 9, 'التشخيص السريري', 'Clinical Diagnosis', '🔍', '2025-06-04 15:02:38', '2025-06-16 05:42:14'),
(51, 9, 'المهارات الإكلينيكية', 'Clinical Skills', '💉', '2025-06-04 15:02:38', '2025-06-16 05:42:14'),
(52, 9, 'التفكير النقدي', '', '🧠', '2025-06-04 15:02:38', '2025-06-04 15:02:38'),
(53, 9, 'التواصل مع المرضى', '', '🗣️', '2025-06-04 15:02:38', '2025-06-04 15:02:38'),
(54, 9, 'تفسير الفحوصات', 'Test Results Interpretation', '📊', '2025-06-04 15:02:38', '2025-06-16 05:42:14'),
(55, 9, 'البحث العلمي', 'Scientific Research', '🔬', '2025-06-04 15:02:38', '2025-06-16 05:42:14'),
(56, 10, 'صرف الأدوية', 'Dispensing Medications', '💊', '2025-06-04 15:02:56', '2025-06-16 05:42:14'),
(57, 10, 'تركيب الأدوية', 'Compounding Medications', '🧪', '2025-06-04 15:02:56', '2025-06-16 05:42:14'),
(58, 10, 'تحليل الأدوية', 'Medication Analysis', '📊', '2025-06-04 15:02:56', '2025-06-16 05:42:14'),
(59, 10, 'مراقبة الجودة', 'Quality Assurance', '🔍', '2025-06-04 15:02:56', '2025-06-16 05:42:14'),
(60, 10, 'الإرشاد الدوائي', 'Pharmacological Guidance', '🗣️', '2025-06-04 15:02:56', '2025-06-16 05:42:14'),
(61, 10, 'البحث والتطوير', 'Research and Development', '📝', '2025-06-04 15:02:56', '2025-06-16 05:42:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `program_id` (`program_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- قيود الجداول المُلقاة.
--

--
-- قيود الجداول `skills`
--
ALTER TABLE `skills`
  ADD CONSTRAINT `skills_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `academic_programs` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
