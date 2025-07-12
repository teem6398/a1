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
-- بنية الجدول `activity_media`
--

CREATE TABLE `activity_media` (
  `id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `media_type` enum('image','video','document') NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `title_ar` varchar(255) DEFAULT NULL,
  `title_en` varchar(255) DEFAULT NULL,
  `description_ar` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `is_featured` tinyint(1) DEFAULT 0,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `activity_media`
--

INSERT INTO `activity_media` (`id`, `activity_id`, `media_type`, `file_path`, `title_ar`, `title_en`, `description_ar`, `description_en`, `is_featured`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 1, 'image', '/image/activities/conf1.jpg', 'صورة المؤتمر 1', 'Conference Image 1', NULL, NULL, 1, 1, '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(2, 1, 'image', '/image/activities/conf2.jpg', 'صورة المؤتمر 2', 'Conference Image 2', NULL, NULL, 0, 2, '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(3, 1, 'image', '/image/activities/conf3.jpg', 'صورة المؤتمر 3', 'Conference Image 3', NULL, NULL, 0, 3, '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(4, 1, 'video', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'فيديو تعريفي بالمؤتمر', 'Conference Introduction Video', NULL, NULL, 0, 4, '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(5, 2, 'image', '/image/activities/expo1.jpg', 'صورة المعرض 1', 'Exhibition Image 1', NULL, NULL, 1, 1, '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(6, 2, 'image', '/image/activities/expo2.jpg', 'صورة المعرض 2', 'Exhibition Image 2', NULL, NULL, 0, 2, '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(7, 2, 'image', '/image/activities/expo3.jpg', 'صورة المعرض 3', 'Exhibition Image 3', NULL, NULL, 0, 3, '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(8, 2, 'video', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'فيديو تعريفي بالمعرض', 'Exhibition Introduction Video', NULL, NULL, 0, 4, '2025-07-06 14:04:28', '2025-07-06 14:04:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_media`
--
ALTER TABLE `activity_media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `activity_id` (`activity_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_media`
--
ALTER TABLE `activity_media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- قيود الجداول المُلقاة.
--

--
-- قيود الجداول `activity_media`
--
ALTER TABLE `activity_media`
  ADD CONSTRAINT `activity_media_ibfk_1` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
