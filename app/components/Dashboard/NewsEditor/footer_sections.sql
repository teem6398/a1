-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 05 يونيو 2025 الساعة 02:37
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
-- بنية الجدول `footer_sections`
--

CREATE TABLE `footer_sections` (
  `section_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `section_type` enum('links','social','contact') NOT NULL,
  `section_order` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `footer_sections`
--

INSERT INTO `footer_sections` (`section_id`, `title`, `section_type`, `section_order`) VALUES
(1, 'روابط سريعة', 'links', 1),
(2, 'تواصل معنا', 'contact', 2),
(3, 'تابعنا', 'social', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `footer_sections`
--
ALTER TABLE `footer_sections`
  ADD PRIMARY KEY (`section_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `footer_sections`
--
ALTER TABLE `footer_sections`
  MODIFY `section_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
