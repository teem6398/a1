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
-- بنية الجدول `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `title_ar` varchar(255) NOT NULL,
  `title_en` varchar(255) DEFAULT NULL,
  `description_ar` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `projects`
--

INSERT INTO `projects` (`id`, `program_id`, `title_ar`, `title_en`, `description_ar`, `description_en`, `image_url`, `created_at`, `updated_at`) VALUES
(1, 1, 'تطبيق ذكي للرعاية الصحية', NULL, 'تطوير تطبيق ذكي للهواتف الذكية يساعد في متابعة الحالة الصحية وتقديم توصيات شخصية.', NULL, '/images/it-project1.jpg', '2025-06-01 19:13:41', '2025-06-01 19:13:41'),
(2, 1, 'نظام إدارة تعليمي', NULL, 'تصميم وتطوير نظام إدارة تعليمي متكامل يدعم التعلم عن بعد والتفاعل بين الطلاب والمعلمين.', NULL, '/images/it-project2.jpg', '2025-06-01 19:13:41', '2025-06-01 19:13:41'),
(3, 2, 'تصميم مبنى سكني مستدام', NULL, 'مشروع طلابي لتصميم مبنى سكني يعتمد على مبادئ الاستدامة والطاقة المتجددة.', NULL, '/images/arch-project1.jpg', '2025-06-03 11:46:58', '2025-06-03 11:46:58'),
(4, 2, 'إعادة تأهيل المباني التراثية', NULL, 'دراسة وتصميم لإعادة تأهيل المباني التراثية مع الحفاظ على قيمتها التاريخية.', NULL, '/images/arch-project2.jpg', '2025-06-03 11:46:58', '2025-06-03 11:46:58'),
(5, 2, 'تصميم مركز ثقافي', NULL, 'تصميم مركز ثقافي متعدد الاستخدامات يعكس الهوية المحلية ويلبي احتياجات المجتمع.', NULL, '/images/arch-project3.jpg', '2025-06-03 11:46:58', '2025-06-03 11:46:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `program_id` (`program_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- قيود الجداول المُلقاة.
--

--
-- قيود الجداول `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `academic_programs` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
