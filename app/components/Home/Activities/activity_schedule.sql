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
-- بنية الجدول `activity_schedule`
--

CREATE TABLE `activity_schedule` (
  `id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `title_ar` varchar(255) NOT NULL,
  `title_en` varchar(255) NOT NULL,
  `description_ar` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime DEFAULT NULL,
  `location_ar` varchar(255) DEFAULT NULL,
  `location_en` varchar(255) DEFAULT NULL,
  `presenter_ar` varchar(255) DEFAULT NULL,
  `presenter_en` varchar(255) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `activity_schedule`
--

INSERT INTO `activity_schedule` (`id`, `activity_id`, `title_ar`, `title_en`, `description_ar`, `description_en`, `start_time`, `end_time`, `location_ar`, `location_en`, `presenter_ar`, `presenter_en`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 1, 'تسجيل المشاركين', 'Participant Registration', 'تسجيل المشاركين وتوزيع المواد التعريفية', 'Registration of participants and distribution of introductory materials', '2023-12-15 08:00:00', '2023-12-15 09:00:00', 'مدخل قاعة المؤتمرات', 'Conference Hall Entrance', NULL, NULL, 1, '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(2, 1, 'كلمة افتتاحية', 'Opening Speech', 'كلمة افتتاحية من رئيس الجامعة', 'Opening speech by the university president', '2023-12-15 09:00:00', '2023-12-15 09:30:00', 'قاعة المؤتمرات الرئيسية', 'Main Conference Hall', 'أ.د. محمد العمري', 'Prof. Mohammed Al-Amri', 2, '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(3, 1, 'الجلسة الأولى: مستقبل الذكاء الاصطناعي في التعليم', 'First Session: The Future of AI in Education', 'مناقشة حول مستقبل الذكاء الاصطناعي وتأثيره على التعليم العالي', 'Discussion about the future of AI and its impact on higher education', '2023-12-15 09:30:00', '2023-12-15 11:00:00', 'قاعة المؤتمرات الرئيسية', 'Main Conference Hall', 'د. أحمد محمد', 'Dr. Ahmed Mohamed', 3, '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(4, 1, 'استراحة', 'Break', 'استراحة قهوة وشاي', 'Coffee and tea break', '2023-12-15 11:00:00', '2023-12-15 11:30:00', 'بهو قاعة المؤتمرات', 'Conference Hall Lobby', NULL, NULL, 4, '2025-07-06 14:04:28', '2025-07-06 14:04:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_schedule`
--
ALTER TABLE `activity_schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `activity_id` (`activity_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_schedule`
--
ALTER TABLE `activity_schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- قيود الجداول المُلقاة.
--

--
-- قيود الجداول `activity_schedule`
--
ALTER TABLE `activity_schedule`
  ADD CONSTRAINT `activity_schedule_ibfk_1` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
