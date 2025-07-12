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
-- بنية الجدول `academic_programs`
--

CREATE TABLE `academic_programs` (
  `id` int(11) NOT NULL,
  `college_id` int(11) NOT NULL,
  `name_ar` varchar(255) NOT NULL,
  `name_en` varchar(255) DEFAULT NULL,
  `hero_title` varchar(255) DEFAULT NULL,
  `hero_subtitle` varchar(255) DEFAULT NULL,
  `hero_image_url` varchar(255) DEFAULT NULL,
  `about_text` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `academic_programs`
--

INSERT INTO `academic_programs` (`id`, `college_id`, `name_ar`, `name_en`, `hero_title`, `hero_subtitle`, `hero_image_url`, `about_text`, `created_at`, `updated_at`) VALUES
(1, 1, 'تقنية المعلومات', 'Information Technology', 'تقنية المعلومات', 'بناء المستقبل الرقمي وتطوير حلول تقنية مبتكرة', '/images/it-hero.jpg', 'يهدف تخصص تقنية المعلومات إلى تزويد الطلاب بالمعارف والمهارات اللازمة لتصميم وتطوير وإدارة أنظمة المعلومات والتطبيقات البرمجية، مع التركيز على التقنيات الحديثة مثل الذكاء الاصطناعي والبيانات الضخمة. يتميز هذا التخصص بتنوع المجالات التي يغطيها، من تطوير البرمجيات إلى أمن المعلومات وإدارة الشبكات، مما يمنح الخريجين فرصًا وظيفية واسعة في مختلف القطاعات التقنية.', '2025-06-01 19:12:52', '2025-06-01 19:12:52'),
(2, 1, 'الهندسة المعمارية', 'Architecture', 'الهندسة المعمارية', 'تصميم المستقبل وبناء عالم أفضل', '/images/architecture-hero.jpg', 'يهدف تخصص الهندسة المعمارية إلى تزويد الطلاب بالمعارف والمهارات اللازمة لتصميم المباني والمنشآت بطريقة تجمع بين الجمال والوظيفة والاستدامة. يتميز هذا التخصص بالتركيز على الإبداع والابتكار، مع الاهتمام بالجوانب الفنية والهندسية والبيئية في التصميم المعماري، وتطبيق أحدث التقنيات في مجال البناء والتشييد.', '2025-06-03 11:43:24', '2025-06-03 11:43:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `academic_programs`
--
ALTER TABLE `academic_programs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `college_id` (`college_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `academic_programs`
--
ALTER TABLE `academic_programs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- قيود الجداول المُلقاة.
--

--
-- قيود الجداول `academic_programs`
--
ALTER TABLE `academic_programs`
  ADD CONSTRAINT `academic_programs_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
