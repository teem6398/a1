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
-- بنية الجدول `activity_participants`
--

CREATE TABLE `activity_participants` (
  `id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `name_ar` varchar(255) NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `role_ar` varchar(255) DEFAULT NULL,
  `role_en` varchar(255) DEFAULT NULL,
  `bio_ar` text DEFAULT NULL,
  `bio_en` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `activity_participants`
--

INSERT INTO `activity_participants` (`id`, `activity_id`, `name_ar`, `name_en`, `role_ar`, `role_en`, `bio_ar`, `bio_en`, `image`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 1, 'د. أحمد محمد', 'Dr. Ahmed Mohamed', 'متحدث رئيسي', 'Keynote Speaker', 'أستاذ الذكاء الاصطناعي بجامعة القاهرة', 'Professor of Artificial Intelligence at Cairo University', NULL, 1, '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(2, 1, 'د. سارة الأحمد', 'Dr. Sarah Al-Ahmad', 'متحدث رئيسي', 'Keynote Speaker', 'أستاذة علوم البيانات بجامعة الملك سعود', 'Professor of Data Science at King Saud University', NULL, 2, '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(3, 1, 'د. جون سميث', 'Dr. John Smith', 'متحدث رئيسي', 'Keynote Speaker', 'أستاذ التعلم الآلي بجامعة أكسفورد', 'Professor of Machine Learning at Oxford University', NULL, 3, '2025-07-06 14:04:28', '2025-07-06 14:04:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_participants`
--
ALTER TABLE `activity_participants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `activity_id` (`activity_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_participants`
--
ALTER TABLE `activity_participants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- قيود الجداول المُلقاة.
--

--
-- قيود الجداول `activity_participants`
--
ALTER TABLE `activity_participants`
  ADD CONSTRAINT `activity_participants_ibfk_1` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
