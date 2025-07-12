-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 09 يوليو 2025 الساعة 17:20
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
-- بنية الجدول `activity_categories`
--

CREATE TABLE `activity_categories` (
  `id` int(11) NOT NULL,
  `name_ar` varchar(100) NOT NULL,
  `name_en` varchar(100) NOT NULL,
  `description_ar` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `color_code` varchar(20) DEFAULT '#4a00e0',
  `icon` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `activity_categories`
--

INSERT INTO `activity_categories` (`id`, `name_ar`, `name_en`, `description_ar`, `description_en`, `color_code`, `icon`, `created_at`, `updated_at`) VALUES
(1, 'مؤتمرات', 'Conferences', 'مؤتمرات علمية وأكاديمية', 'Scientific and academic conferences', '#4a00e0', 'conference', '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(2, 'معارض', 'Exhibitions', 'معارض طلابية ومهنية', 'Student and professional exhibitions', '#00a3e0', 'exhibition', '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(3, 'رياضة', 'Sports', 'فعاليات وأنشطة رياضية', 'Sports events and activities', '#00c853', 'sports', '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(4, 'ورش عمل', 'Workshops', 'ورش عمل تدريبية', 'Training workshops', '#ff9800', 'workshop', '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(5, 'مسابقات', 'Competitions', 'مسابقات طلابية وعلمية', 'Student and scientific competitions', '#e91e63', 'competition', '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(6, 'توظيف', 'Employment', 'فعاليات التوظيف والتدريب المهني', 'Employment and professional training events', '#3f51b5', 'employment', '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(7, 'فعاليات ثقافية', 'Cultural Events', 'فعاليات ثقافية وفنية', 'Cultural and artistic events', '#9c27b0', 'cultural', '2025-07-06 14:04:28', '2025-07-06 14:04:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_categories`
--
ALTER TABLE `activity_categories`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_categories`
--
ALTER TABLE `activity_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
