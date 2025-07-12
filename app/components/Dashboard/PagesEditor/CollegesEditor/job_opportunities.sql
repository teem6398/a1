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
(1, 1, 'مهندس برمجيات', 'software Enginerr', '💻', '2025-06-01 19:13:33', '2025-06-03 11:34:36'),
(2, 1, 'محلل نظم', 'System Analyst', '🧠', '2025-06-01 19:13:33', '2025-06-03 11:35:08'),
(3, 1, 'مدير قواعد بيانات', 'Database Director', '🗄️', '2025-06-01 19:13:33', '2025-06-03 11:35:52'),
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
(15, 2, 'مصمم نماذج ثلاثية الأبعاد', NULL, '🖥️', '2025-06-03 11:46:30', '2025-06-03 11:46:30');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
