-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 11 يوليو 2025 الساعة 13:37
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
-- Database: `alryada_university_academics`
--

-- --------------------------------------------------------

--
-- بنية الجدول `students`
--

CREATE TABLE `students` (
  `student_id` int(11) NOT NULL,
  `enrollment_number` varchar(50) NOT NULL,
  `first_name_ar` varchar(50) NOT NULL,
  `first_name_en` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `gender` enum('ذكر','أنثى') NOT NULL,
  `birth_date` date NOT NULL,
  `batch_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `photo_url` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `students`
--

INSERT INTO `students` (`student_id`, `enrollment_number`, `first_name_ar`, `first_name_en`, `email`, `gender`, `birth_date`, `batch_id`, `created_at`, `photo_url`, `password`) VALUES
(1, '1', 'احمد مصطفى', 'ahmed mustafa khder', NULL, 'ذكر', '2002-08-04', 1, '2025-06-04 20:10:03', '/image/1.jpg', ''),
(2, '21201388', 'عبدللة مختار ', 'abdllah maktar', 'asas@mamsm', 'ذكر', '2002-04-21', 3, '2025-06-04 20:37:41', NULL, ''),
(3, '21201389', 'صالح سالم سالم حسين ثابت', 'sa', 'asas@sas', 'ذكر', '2001-05-21', 1, '2025-06-04 20:37:41', NULL, ''),
(4, '21201398', 'ريما علي  علي فضل', 'salh', 'mmmmmmm', 'أنثى', '2002-02-02', 1, '2025-06-04 22:30:13', NULL, ''),
(5, '21201354', 'محمد عبد الرحمان ', 'mmm', 'mmmm', 'ذكر', '2000-02-05', 1, '2025-06-04 22:30:13', NULL, ''),
(6, '25201388', 'ياسر عدنان أحمد عبدالملك ( مندوبنا)', 'm', 'mmm', 'ذكر', '2000-05-14', 1, '2025-06-04 22:37:02', NULL, ''),
(7, '21201380', 'عمر محمد عوض مسعود ', 'omer', 'omer@gmail.com', 'ذكر', '2002-08-04', 1, '2025-07-11 10:51:04', NULL, ''),
(8, '21201379', 'نواف ', '', 'n@gmail.com', 'ذكر', '2000-07-01', 1, '2025-07-11 10:51:04', NULL, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `batch_id` (`batch_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- قيود الجداول المُلقاة.
--

--
-- قيود الجداول `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`batch_id`) REFERENCES `batches` (`batch_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
