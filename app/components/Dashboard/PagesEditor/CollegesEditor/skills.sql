-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 03 يونيو 2025 الساعة 16:46
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
  `icon` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `skills`
--

INSERT INTO `skills` (`id`, `program_id`, `skill_name`, `icon`, `created_at`, `updated_at`) VALUES
(1, 1, 'إدارة المشاريع التقنية', 'gear', '2025-06-03 11:30:02', '2025-06-03 11:30:02'),
(2, 1, 'الذكاء الاصطناعي', 'robot', '2025-06-03 11:30:02', '2025-06-03 11:30:02'),
(3, 1, 'أمن المعلومات', 'shield', '2025-06-03 11:30:02', '2025-06-03 11:30:02'),
(4, 1, 'تطوير التطبيقات', 'app', '2025-06-03 11:30:02', '2025-06-03 11:30:02'),
(5, 1, 'تحليل البيانات', 'search', '2025-06-03 11:30:02', '2025-06-03 11:30:02'),
(6, 1, 'البرمجة المتقدمة', 'laptop', '2025-06-03 11:30:02', '2025-06-03 11:30:02'),
(7, 2, 'التصميم المعماري', '🏛️', '2025-06-03 11:45:07', '2025-06-03 11:45:07'),
(8, 2, 'الرسم والتصور', '🖌️', '2025-06-03 11:45:07', '2025-06-03 11:45:07'),
(9, 2, 'برامج التصميم', '💻', '2025-06-03 11:45:07', '2025-06-03 11:45:07'),
(10, 2, 'التصميم المستدام', '🌱', '2025-06-03 11:45:07', '2025-06-03 11:45:07'),
(11, 2, 'تحليل المشكلات', '🔍', '2025-06-03 11:45:07', '2025-06-03 11:45:07');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
