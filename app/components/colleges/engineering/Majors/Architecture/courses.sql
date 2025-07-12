-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 03 يونيو 2025 الساعة 16:45
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
-- بنية الجدول `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `name_ar` varchar(255) NOT NULL,
  `name_en` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `semester` int(11) DEFAULT NULL,
  `is_elective` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `courses`
--

INSERT INTO `courses` (`id`, `program_id`, `name_ar`, `name_en`, `description`, `semester`, `is_elective`, `created_at`, `updated_at`) VALUES
(1, 1, 'أساسيات البرمجة', NULL, NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-01 19:13:19'),
(2, 1, 'هياكل البيانات والخوارزميات', NULL, NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-01 19:13:19'),
(3, 1, 'قواعد البيانات', NULL, NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-01 19:13:19'),
(4, 1, 'شبكات الحاسوب', NULL, NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-01 19:13:19'),
(5, 1, 'تطوير تطبيقات الويب', NULL, NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-01 19:13:19'),
(6, 1, 'تطوير تطبيقات الهاتف المحمول', NULL, NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-01 19:13:19'),
(7, 1, 'أمن المعلومات', NULL, NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-01 19:13:19'),
(8, 1, 'الذكاء الاصطناعي', NULL, NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-01 19:13:19'),
(9, 1, 'تحليل وتصميم النظم', NULL, NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-01 19:13:19'),
(10, 1, 'الحوسبة السحابية', NULL, NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-01 19:13:19'),
(11, 2, 'مبادئ التصميم المعماري', NULL, NULL, NULL, 0, '2025-06-03 11:43:54', '2025-06-03 11:43:54'),
(12, 2, 'الرسم المعماري', NULL, NULL, NULL, 0, '2025-06-03 11:43:54', '2025-06-03 11:43:54'),
(13, 2, 'تاريخ العمارة', NULL, NULL, NULL, 0, '2025-06-03 11:43:54', '2025-06-03 11:43:54'),
(14, 2, 'نظريات العمارة', NULL, NULL, NULL, 0, '2025-06-03 11:43:54', '2025-06-03 11:43:54'),
(15, 2, 'تصميم المباني السكنية', NULL, NULL, NULL, 0, '2025-06-03 11:43:54', '2025-06-03 11:43:54'),
(16, 2, 'تصميم المباني التجارية', NULL, NULL, NULL, 0, '2025-06-03 11:43:54', '2025-06-03 11:43:54'),
(17, 2, 'العمارة المستدامة', NULL, NULL, NULL, 0, '2025-06-03 11:43:54', '2025-06-03 11:43:54'),
(18, 2, 'تخطيط المدن', NULL, NULL, NULL, 0, '2025-06-03 11:43:54', '2025-06-03 11:43:54'),
(19, 2, 'تقنيات البناء', NULL, NULL, NULL, 0, '2025-06-03 11:43:54', '2025-06-03 11:43:54'),
(20, 2, 'التصميم بمساعدة الحاسوب', NULL, NULL, NULL, 0, '2025-06-03 11:43:54', '2025-06-03 11:43:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `program_id` (`program_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- قيود الجداول المُلقاة.
--

--
-- قيود الجداول `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `academic_programs` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
