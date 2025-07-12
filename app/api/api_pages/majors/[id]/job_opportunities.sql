-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 23 يونيو 2025 الساعة 15:23
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
-- بنية الجدول `job_opportunities`
--

CREATE TABLE `job_opportunities` (
  `id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `job_title_ar` varchar(255) NOT NULL,
  `job_title_en` varchar(255) DEFAULT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `job_opportunities`
--

INSERT INTO `job_opportunities` (`id`, `program_id`, `job_title_ar`, `job_title_en`, `icon`, `created_at`, `updated_at`) VALUES
(1, 1, 'مهندس برمجيات', 'Software Engineer', '💻', '2025-06-01 19:13:33', '2025-06-21 01:43:11'),
(2, 1, 'محلل نظم', 'System Analyst', '🧠', '2025-06-01 19:13:33', '2025-06-03 11:35:08'),
(3, 1, 'مدير قواعد بيانات', 'Database Manager', '🗄️', '2025-06-01 19:13:33', '2025-06-21 01:43:11'),
(4, 1, 'مهندس شبكات', 'Network Engineer', '🌐', '2025-06-01 19:13:33', '2025-06-03 11:36:26'),
(5, 1, 'مهندس أمن معلومات', 'Information Security Engineer', '🛡️', '2025-06-01 19:13:33', '2025-06-03 11:37:07'),
(6, 1, 'مطور تطبيقات ويب', 'Web Application Developer', '🌍', '2025-06-01 19:13:33', '2025-06-03 11:37:48'),
(7, 1, 'مطور تطبيقات موبايل', 'Mobile Application Developer', '📱', '2025-06-01 19:13:33', '2025-06-03 11:38:10'),
(8, 1, 'مهندس حوسبة سحابية', 'Cloud Computing Engineer', '☁️', '2025-06-01 19:13:33', '2025-06-03 11:38:53'),
(9, 1, 'امن سيبراني', 'cyber security', '👨‍💻', '2025-06-03 11:33:59', '2025-06-03 11:33:59'),
(10, 2, 'مهندس معماري', NULL, '🏢', '2025-06-03 11:46:30', '2025-06-03 11:46:30'),
(11, 2, 'مخطط مدن', NULL, '🏙️', '2025-06-03 11:46:30', '2025-06-03 11:46:30'),
(12, 2, 'مصمم داخلي', NULL, '🎨', '2025-06-03 11:46:30', '2025-06-03 11:46:30'),
(13, 2, 'مدير مشاريع', NULL, '👷', '2025-06-03 11:46:30', '2025-06-03 11:46:30'),
(14, 2, 'مستشار استدامة', NULL, '🌿', '2025-06-03 11:46:30', '2025-06-03 11:46:30'),
(15, 2, 'مصمم نماذج ثلاثية الأبعاد', NULL, '🖥️', '2025-06-03 11:46:30', '2025-06-03 11:46:30'),
(16, 3, 'محاسب مالي', 'Financial Accountant', '💼', '2025-06-04 14:40:49', '2025-06-04 14:40:49'),
(17, 3, 'مدقق حسابات (داخلي/خارجي)', 'Auditor (Internal/External)', '🕵️', '2025-06-04 14:40:49', '2025-06-04 14:40:49'),
(18, 3, 'محاسب تكاليف', 'Cost Accountant', '⚙️', '2025-06-04 14:40:49', '2025-06-04 14:40:49'),
(19, 3, 'محلل مالي', 'Financial Analyst', '💹', '2025-06-04 14:40:49', '2025-06-04 14:40:49'),
(20, 3, 'مستشار ضريبي', 'Tax Consultant', '🏛️', '2025-06-04 14:40:49', '2025-06-04 14:40:49'),
(21, 3, 'مدير مالي', 'Financial Manager', '📈', '2025-06-04 14:40:49', '2025-06-04 14:40:49'),
(22, 3, 'مراقب مالي', 'Financial Controller', '🛂', '2025-06-04 14:40:49', '2025-06-04 14:40:49'),
(23, 3, 'خبير محاسبة قضائية', 'Forensic Accountant', '⚖️', '2025-06-04 14:40:49', '2025-06-04 14:40:49'),
(24, 4, 'مدير مشاريع', 'Project Manager', '📋', '2025-06-04 14:57:16', '2025-06-04 14:57:16'),
(25, 4, 'مدير موارد بشرية', 'Human Resources Manager', '👥', '2025-06-04 14:57:16', '2025-06-04 14:57:16'),
(26, 4, 'محلل أعمال', 'Business Analyst', '📊', '2025-06-04 14:57:16', '2025-06-04 14:57:16'),
(27, 4, 'ريادي أعمال', 'Entrepreneur', '🚀', '2025-06-04 14:57:16', '2025-06-04 14:57:16'),
(28, 4, 'مدير تنفيذي', 'Executive Manager', '🏢', '2025-06-04 14:57:16', '2025-06-04 14:57:16'),
(29, 4, 'مدير تسويق', 'Marketing Manager', '🛒', '2025-06-04 14:57:16', '2025-06-04 14:57:16'),
(30, 5, 'محلل مالي', 'Financial Analyst', '📊', '2025-06-04 14:58:35', '2025-06-04 14:58:35'),
(31, 5, 'مدير استثمار', 'Investment Manager', '💰', '2025-06-04 14:58:35', '2025-06-04 14:58:35'),
(32, 5, 'مستشار مالي', 'Financial Advisor', '📝', '2025-06-04 14:58:35', '2025-06-04 14:58:35'),
(33, 5, 'مدير محافظ استثمارية', 'Portfolio Manager', '💼', '2025-06-04 14:58:35', '2025-06-04 14:58:35'),
(34, 5, 'مصرفي استثماري', 'Investment Banker', '🏦', '2025-06-04 14:58:35', '2025-06-04 14:58:35'),
(35, 5, 'مدير مخاطر مالية', 'Financial Risk Manager', '⚖️', '2025-06-04 14:58:35', '2025-06-04 14:58:35'),
(36, 6, 'أخصائي تسويق رقمي', 'Digital Marketing Specialist', '📱', '2025-06-04 15:00:17', '2025-06-04 15:00:17'),
(37, 6, 'مدير علامة تجارية', 'Brand Manager', '🎯', '2025-06-04 15:00:17', '2025-06-04 15:00:17'),
(38, 6, 'محلل سوق', 'Market Analyst', '📊', '2025-06-04 15:00:17', '2025-06-04 15:00:17'),
(39, 6, 'مدير حملات إعلانية', 'Advertising Campaign Manager', '📣', '2025-06-04 15:00:17', '2025-06-04 15:00:17'),
(40, 6, 'مدير تسويق محتوى', 'Content Marketing Manager', '🌐', '2025-06-04 15:00:17', '2025-06-04 15:00:17'),
(41, 6, 'مدير تسويق', 'Marketing Manager', '📈', '2025-06-04 15:00:17', '2025-06-04 15:00:17'),
(42, 7, 'طبيب أسنان عام', 'General Dentist', '🏥', '2025-06-04 15:02:00', '2025-06-04 15:02:00'),
(43, 7, 'أخصائي تقويم أسنان', 'Orthodontist', '👨‍⚕️', '2025-06-04 15:02:00', '2025-06-04 15:02:00'),
(44, 7, 'أخصائي علاج جذور', 'Endodontist', '🔬', '2025-06-04 15:02:00', '2025-06-04 15:02:00'),
(45, 7, 'جراح فم وفكين', 'Oral and Maxillofacial Surgeon', '🧑‍🔬', '2025-06-04 15:02:00', '2025-06-04 15:02:00'),
(46, 7, 'أستاذ جامعي', 'University Professor', '🏫', '2025-06-04 15:02:00', '2025-06-04 15:02:00'),
(47, 7, 'مدير عيادة أسنان', 'Dental Clinic Manager', '📋', '2025-06-04 15:02:00', '2025-06-04 15:02:00'),
(48, 8, 'أخصائي مختبرات طبية', 'Medical Laboratory Specialist', '🏥', '2025-06-04 15:02:24', '2025-06-04 15:02:24'),
(49, 8, 'أخصائي علم الأمراض', 'Pathology Specialist', '🔬', '2025-06-04 15:02:24', '2025-06-04 15:02:24'),
(50, 8, 'أخصائي وراثة', 'Genetics Specialist', '🧬', '2025-06-04 15:02:24', '2025-06-04 15:02:24'),
(51, 8, 'أخصائي كيمياء حيوية', 'Biochemistry Specialist', '🧪', '2025-06-04 15:02:24', '2025-06-04 15:02:24'),
(52, 8, 'باحث علمي', 'Scientific Researcher', '🏫', '2025-06-04 15:02:24', '2025-06-04 15:02:24'),
(53, 8, 'مدير مختبر طبي', 'Medical Laboratory Manager', '📋', '2025-06-04 15:02:24', '2025-06-04 15:02:24'),
(54, 9, 'طبيب ممارس عام', 'General Practitioner', '🏥', '2025-06-04 15:02:38', '2025-06-04 15:02:38'),
(55, 9, 'أخصائي طبي', 'Medical Specialist', '👨‍⚕️', '2025-06-04 15:02:38', '2025-06-04 15:02:38'),
(56, 9, 'باحث طبي', 'Medical Researcher', '🔬', '2025-06-04 15:02:38', '2025-06-04 15:02:38'),
(57, 9, 'أستاذ جامعي', 'University Professor', '🏫', '2025-06-04 15:02:38', '2025-06-04 15:02:38'),
(58, 9, 'استشاري طبي دولي', 'International Medical Consultant', '🌐', '2025-06-04 15:02:38', '2025-06-04 15:02:38'),
(59, 9, 'مدير مؤسسة صحية', 'Healthcare Administrator', '📋', '2025-06-04 15:02:38', '2025-06-04 15:02:38'),
(60, 10, 'صيدلي مستشفى', 'Hospital Pharmacist', '🏥', '2025-06-04 15:02:56', '2025-06-04 15:02:56'),
(61, 10, 'صيدلي مجتمعي', 'Community Pharmacist', '🏪', '2025-06-04 15:02:56', '2025-06-04 15:02:56'),
(62, 10, 'صيدلي سريري', 'Clinical Pharmacist', '🔬', '2025-06-04 15:02:56', '2025-06-04 15:02:56'),
(63, 10, 'صيدلي صناعي', 'Industrial Pharmacist', '🏭', '2025-06-04 15:02:56', '2025-06-04 15:02:56'),
(64, 10, 'باحث في مجال الأدوية', 'Pharmaceutical Researcher', '🧪', '2025-06-04 15:02:56', '2025-06-04 15:02:56'),
(65, 10, 'مدير رقابة دوائية', 'Pharmaceutical Regulatory Affairs Manager', '📋', '2025-06-04 15:02:56', '2025-06-04 15:02:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `job_opportunities`
--
ALTER TABLE `job_opportunities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `program_id` (`program_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `job_opportunities`
--
ALTER TABLE `job_opportunities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- قيود الجداول المُلقاة.
--

--
-- قيود الجداول `job_opportunities`
--
ALTER TABLE `job_opportunities`
  ADD CONSTRAINT `job_opportunities_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `academic_programs` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
