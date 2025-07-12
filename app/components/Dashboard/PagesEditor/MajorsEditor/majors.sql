-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 05 يونيو 2025 الساعة 18:00
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
-- بنية الجدول `majors`
--

CREATE TABLE `majors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `college_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `icon` varchar(16) DEFAULT NULL,
  `duration_years` int(11) DEFAULT NULL,
  `students_count` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `features` text DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `majors`
--

INSERT INTO `majors` (`id`, `college_id`, `name`, `icon`, `duration_years`, `students_count`, `description`, `features`, `link`, `created_at`, `updated_at`) VALUES
(1, 1, 'الهندسة المعمارية', '🏢', 5, 220, 'بكالوريوس - 5 سنوات • 220 طالب/ة', 'التصميم الإنشائي;إدارة المشاريع;هندسة البيئة', '/components/colleges/engineering/Majors/Architecture', '2025-05-19 07:50:32', '2025-05-19 07:50:32'),
(2, 1, 'تقنية المعلومات', '💾', 4, 200, 'بكالوريوس - 4 سنوات • 200 طالب/ة', 'برمجة التطبيقات;الشبكات;أمن المعلومات', '/components/colleges/engineering/Majors/IT', '2025-05-19 07:50:32', '2025-05-19 07:50:32'),
(4, 2, 'الطب البشري', '🩺', 6, 300, 'بكالوريوس في الطب البشري', 'تدريب سريري متقدم;مختبرات حديثة;برامج تدريب دولية', '/components/colleges/medicine/Majors/Medicine', '2025-05-19 08:00:12', '2025-05-19 08:00:12'),
(5, 2, 'طب الأسنان', '🦷', 5, 180, 'بكالوريوس في طب الأسنان', 'عيادات متطورة;تقنيات حديثة;تدريب عملي مكثف', '/components/colleges/medicine/Majors/Dentistry', '2025-05-19 08:00:12', '2025-05-19 08:00:12'),
(6, 2, 'المختبرات الطبية', '🧪', 4, 150, 'بكالوريوس في المختبرات الطبية', 'مختبرات متخصصة;أجهزة متطورة;تدريب ميداني', '/components/colleges/medicine/Majors/Laboratory', '2025-05-19 08:00:12', '2025-05-19 08:00:12'),
(7, 2, 'الصيدلة', '💊', 5, 200, 'بكالوريوس في الصيدلة', 'معامل متخصصة;تدريب صيدلاني;شراكات مع المستشفيات', '/components/colleges/medicine/Majors/Pharmacy', '2025-05-19 08:01:05', '2025-05-19 08:01:05'),
(8, 3, 'إدارة الأعمال', '📈', 4, 350, 'بكالوريوس في إدارة الأعمال', 'إدارة استراتيجية;ريادة الأعمال;إدارة الموارد البشرية', '/components/colleges/business/Majors/BusinessManagement', '2025-05-19 08:04:39', '2025-05-19 08:04:39'),
(9, 3, 'المحاسبة', '📊', 4, 280, 'بكالوريوس في المحاسبة', 'محاسبة مالية;مراجعة وتدقيق;محاسبة تكاليف', '/components/colleges/business/Majors/Accounting', '2025-05-19 08:04:39', '2025-05-19 08:04:39'),
(10, 3, 'التسويق', '🛒', 4, 200, 'بكالوريوس في التسويق', 'التسويق الرقمي;إدارة العلامات التجارية;سلوك المستهلك', '/components/colleges/business/Majors/Marketing', '2025-05-19 08:04:39', '2025-05-19 08:04:39'),
(11, 3, 'التمويل والاستثمار', '💰', 4, 120, 'بكالوريوس في التمويل والاستثمار', 'التحليل المالي;إدارة المحافظ الاستثمارية;التمويل الدولي', '/components/colleges/business/Majors/Finance', '2025-05-19 08:04:39', '2025-05-19 08:04:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `majors`
--
ALTER TABLE `majors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `college_id` (`college_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `majors`
--
ALTER TABLE `majors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- قيود الجداول المُلقاة.
--

--
-- قيود الجداول `majors`
--
ALTER TABLE `majors`
  ADD CONSTRAINT `majors_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
