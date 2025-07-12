-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 04 يونيو 2025 الساعة 21:58
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
-- بنية الجدول `batches`
--

CREATE TABLE `batches` (
  `batch_id` int(11) NOT NULL,
  `batch_year` year(4) NOT NULL,
  `batch_name` varchar(100) NOT NULL,
  `program_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `batches`
--

INSERT INTO `batches` (`batch_id`, `batch_year`, `batch_name`, `program_id`) VALUES
(1, '2020', 'تقنية معلومات', 1);

-- --------------------------------------------------------

--
-- بنية الجدول `colleges`
--

CREATE TABLE `colleges` (
  `college_id` int(11) NOT NULL,
  `college_name_ar` varchar(100) NOT NULL,
  `college_name_en` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `colleges`
--

INSERT INTO `colleges` (`college_id`, `college_name_ar`, `college_name_en`) VALUES
(1, 'كلية الهندسة', 'colleges of Engineering'),
(2, 'كلية الطب', 'colleges of Medicine'),
(3, 'كلية العلوم الادارية ', 'colleges of Administrative sciences');

-- --------------------------------------------------------

--
-- بنية الجدول `college_deans`
--

CREATE TABLE `college_deans` (
  `dean_id` int(11) NOT NULL,
  `full_name_ar` varchar(100) NOT NULL,
  `full_name_en` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `gender` enum('ذكر','أنثى') DEFAULT NULL,
  `academic_rank` enum('دكتور','بروفيسور') NOT NULL,
  `college_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `college_deans`
--

INSERT INTO `college_deans` (`dean_id`, `full_name_ar`, `full_name_en`, `email`, `phone`, `gender`, `academic_rank`, `college_id`) VALUES
(1, 'احمد عبده ', 'Ahmed abdo', 'ahmed@gmail.com', '778585462', 'ذكر', 'دكتور', 1),
(2, 'فاطمة ثابت ', 'Fatima thabet', 'fatma@gmail.com', '777', 'أنثى', 'دكتور', 2),
(3, 'محمد صالح ', 'Mohammed saleh', 'mohmmed@gmail.com', '777', 'ذكر', 'دكتور', 3);

-- --------------------------------------------------------

--
-- بنية الجدول `courses`
--

CREATE TABLE `courses` (
  `course_id` int(11) NOT NULL,
  `course_name` varchar(100) NOT NULL,
  `teacher_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `courses`
--

INSERT INTO `courses` (`course_id`, `course_name`, `teacher_id`) VALUES
(1, 'English Language (1)', 10),
(2, 'Arabic Language (1)', 7),
(3, 'English Language (2)', 10),
(4, 'Arabic Language (2)', 7),
(5, 'Computer Programming (1)', 4),
(6, 'Computer Programming (2)', 4),
(7, 'Islamic Culture', 3),
(8, 'Introduction to Computer', NULL),
(9, 'Computer Applications', NULL),
(10, 'Calculus (1)', 9),
(11, 'Calculus (2)', 9),
(12, 'Digital Logic Design', 1),
(13, 'Discrete Mathematics', 9),
(14, 'Object oriented programming', 4),
(15, 'Principles of Information Systems', NULL),
(16, 'Operating Systems (Basic)', 1),
(17, 'Computer Org.& Architecture', 1),
(18, 'Numerical Analysis', 9),
(19, 'Principals of Management', NULL),
(20, 'Data Structures', 4),
(21, 'Database System ( Basics)', 2),
(22, ' Systems Analysis & Design', NULL),
(23, 'Microprocessor', 4),
(24, 'Probability & Statistics', NULL),
(25, 'Communication Skills', 1),
(28, 'Visual Programming', NULL),
(29, 'Advance Database System', NULL),
(30, 'Web Design', NULL),
(31, 'Computer Networks', NULL),
(32, 'Multimedia Technologies', NULL),
(33, 'E-Commerce & Business Technology', NULL),
(34, 'Java Programming', NULL),
(35, 'Operating Systems (Advance)', NULL),
(36, 'Web Development', NULL),
(37, 'Computer Networks (2)', NULL),
(38, ' Current in IT', NULL),
(39, 'Human Computer Interaction', NULL),
(40, 'Mobile Applications (With Java)', NULL),
(41, 'Software Engineering', NULL),
(42, 'Scientific Research Methodology', NULL),
(43, 'Data and Computer Security', NULL),
(44, 'Graduation Project (1)', NULL),
(45, 'Artificial Intelligence', NULL),
(46, 'Graduation Project (2)', NULL),
(47, 'Occupation Ethics', NULL),
(48, 'Simulation and modeling', NULL),
(49, 'Internet of things', NULL),
(50, 'Cloud Computing', NULL),
(51, 'Neural Network', NULL),
(52, 'Data Mining', NULL),
(53, 'Machine Learning', NULL);

-- --------------------------------------------------------

--
-- بنية الجدول `grades`
--

CREATE TABLE `grades` (
  `sr` int(11) NOT NULL,
  `detail_id` int(11) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL,
  `grade` decimal(5,2) DEFAULT NULL,
  `evaluation` varchar(50) DEFAULT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- بنية الجدول `levels`
--

CREATE TABLE `levels` (
  `level_id` int(11) NOT NULL,
  `level_number` int(11) NOT NULL,
  `program_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- بنية الجدول `majors`
--

CREATE TABLE `majors` (
  `major_id` int(11) NOT NULL,
  `major_name_ar` varchar(100) NOT NULL,
  `major_name_en` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `majors`
--

INSERT INTO `majors` (`major_id`, `major_name_ar`, `major_name_en`) VALUES
(1, 'تقنية المعلومات ', 'Information Technology'),
(2, 'الهندسة المعمارية', 'Architectural Engineering'),
(3, 'الطب البشري', 'Human medicine'),
(4, 'طب الاسنان', 'Dentistry'),
(5, 'الصيدلة', 'Pharmacy'),
(6, 'المختبرات', 'Medical Laboratory Sciences '),
(7, 'المحاسبة', 'Accounting'),
(8, 'ادارة الاعمال', 'Business Administration');

-- --------------------------------------------------------

--
-- بنية الجدول `programs`
--

CREATE TABLE `programs` (
  `program_id` int(11) NOT NULL,
  `degree_scientific` varchar(100) NOT NULL,
  `program_name` varchar(100) NOT NULL,
  `major_id` int(11) DEFAULT NULL,
  `college_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `programs`
--

INSERT INTO `programs` (`program_id`, `degree_scientific`, `program_name`, `major_id`, `college_id`) VALUES
(1, 'دبلوم', 'دبلوم صيدلة', 5, 2),
(2, 'بكالوريوس ', 'بكالوريوس صيدلة', 5, 2),
(3, 'دبلوم ', 'دبلوم صيدلة ', 5, 2),
(4, 'بكالوريوس ', 'بكالوريوس تقنية معلومات', 1, 1),
(5, 'بكالوريوس', 'بكالوريوس هندسة معمارية', 2, 1),
(6, 'بكالوريوس', 'بكالوريوس طب بشري', 3, 2),
(7, 'بكالوريوس ', 'بكالوريوس محاسبة', 7, 3),
(8, 'بكالوريوس ', 'بكالوريوس ادارة اعمال', 8, 3),
(9, 'بكالوريوس ', 'بكالوريوس طب اسنان', 4, 2),
(10, 'ماجستير', 'ماجستير تقنية معلومات', 1, 1);

-- --------------------------------------------------------

--
-- بنية الجدول `semesters`
--

CREATE TABLE `semesters` (
  `semester_id` int(11) NOT NULL,
  `semester_name` varchar(50) NOT NULL,
  `level_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- بنية الجدول `students`
--

CREATE TABLE `students` (
  `student_id` int(11) NOT NULL,
  `enrollment_number` varchar(50) NOT NULL,
  `first_name_ar` varchar(50) NOT NULL,
  `first_name_en` varchar(50) NOT NULL,
  `gender` enum('ذكر','أنثى') NOT NULL,
  `birth_date` date NOT NULL,
  `batch_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `students`
--

INSERT INTO `students` (`student_id`, `enrollment_number`, `first_name_ar`, `first_name_en`, `gender`, `birth_date`, `batch_id`) VALUES
(1, '21201387', 'احمد مصطفى خضر', 'ahmed mustafa khder', 'ذكر', '2002-08-04', 1);

-- --------------------------------------------------------

--
-- بنية الجدول `study_plans`
--

CREATE TABLE `study_plans` (
  `plan_id` int(11) NOT NULL,
  `batch_id` int(11) DEFAULT NULL,
  `program_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `study_plans`
--

INSERT INTO `study_plans` (`plan_id`, `batch_id`, `program_id`) VALUES
(1, 1, 4);

-- --------------------------------------------------------

--
-- بنية الجدول `study_plan_details`
--

CREATE TABLE `study_plan_details` (
  `detail_id` int(11) NOT NULL,
  `plan_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `level_id` int(11) DEFAULT NULL,
  `semester_id` int(11) DEFAULT NULL,
  `credit_hours` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- بنية الجدول `teachers`
--

CREATE TABLE `teachers` (
  `teacher_id` int(11) NOT NULL,
  `name_ar` varchar(50) NOT NULL,
  `name_en` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `gender` enum('ذكر','أنثى') DEFAULT NULL,
  `hire_date` date DEFAULT NULL,
  `degree` enum('بكالوريوس','ماجستير','دكتوراه') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `teachers`
--

INSERT INTO `teachers` (`teacher_id`, `name_ar`, `name_en`, `email`, `phone`, `gender`, `hire_date`, `degree`) VALUES
(1, 'أحمد عبده علي سعيد', ' Ahmed Abdo Ali Saeed', 'ahmed@gmail.com', '736801342', 'ذكر', '2020-05-14', 'دكتوراه'),
(2, 'عادل سلام محمد حيدر ', 'Adel Sallam Mohamed Haider', 'haider.adel@gmail.com', '777464454', 'ذكر', '2020-05-13', 'دكتوراه'),
(3, 'جبران ناجي جبران يحيى ', 'Jibran Naji Jibran Yahya', 'obran2010@gmail.com', '772499616', 'ذكر', '2020-05-27', 'دكتوراه'),
(4, 'محبوب علي محمد ناجي', 'Mahboub Ali Mohammed Naji', 'AboodiHabeeb@Gmail.com', '78566024', 'ذكر', '2020-05-07', 'دكتوراه'),
(5, 'محمد ابراهيم عبدالوارث الاغبري', 'Mohamad Ebrahim Abdulwarith Al-Aghbari', ' mohamedalaghbari6@gmail.com', '777336200', 'ذكر', '2020-05-21', 'دكتوراه'),
(6, 'فواز احمد غالب نعمان ', 'FAWAZ AHMED GHALEB NOMAN', ' fawazag75@gmail.com', '887452777', 'ذكر', '2021-05-19', 'دكتوراه'),
(7, 'سالم علي أحمد الميسري', 'salem ali ahmed al-mysri', 'salemalmisary@gmail.com ', '777209250', 'ذكر', '2020-05-06', 'دكتوراه'),
(8, 'دلال نجيب علوان', 'Dalal Najeeb Alwan', 'DalalNajeeb99@gmail.com ', '771686831', 'أنثى', '2024-11-06', 'بكالوريوس'),
(9, 'جمال قشاش', 'Gamal qashash', 'gamal@gmail.com', '777', 'ذكر', '2019-05-09', 'دكتوراه'),
(10, 'خضر ', 'khder', 'khder@gmail.com', '77', 'أنثى', '2020-05-07', 'دكتوراه');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `batches`
--
ALTER TABLE `batches`
  ADD PRIMARY KEY (`batch_id`),
  ADD KEY `program_id` (`program_id`);

--
-- Indexes for table `colleges`
--
ALTER TABLE `colleges`
  ADD PRIMARY KEY (`college_id`);

--
-- Indexes for table `college_deans`
--
ALTER TABLE `college_deans`
  ADD PRIMARY KEY (`dean_id`),
  ADD UNIQUE KEY `college_id` (`college_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_id`),
  ADD KEY `fk_teacher_course` (`teacher_id`);

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`sr`),
  ADD KEY `detail_id` (`detail_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `levels`
--
ALTER TABLE `levels`
  ADD PRIMARY KEY (`level_id`),
  ADD KEY `program_id` (`program_id`);

--
-- Indexes for table `majors`
--
ALTER TABLE `majors`
  ADD PRIMARY KEY (`major_id`);

--
-- Indexes for table `programs`
--
ALTER TABLE `programs`
  ADD PRIMARY KEY (`program_id`),
  ADD KEY `major_id` (`major_id`),
  ADD KEY `college_id` (`college_id`);

--
-- Indexes for table `semesters`
--
ALTER TABLE `semesters`
  ADD PRIMARY KEY (`semester_id`),
  ADD KEY `level_id` (`level_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`),
  ADD KEY `batch_id` (`batch_id`);

--
-- Indexes for table `study_plans`
--
ALTER TABLE `study_plans`
  ADD PRIMARY KEY (`plan_id`),
  ADD KEY `program_id` (`program_id`),
  ADD KEY `batch_id` (`batch_id`);

--
-- Indexes for table `study_plan_details`
--
ALTER TABLE `study_plan_details`
  ADD PRIMARY KEY (`detail_id`),
  ADD KEY `plan_id` (`plan_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `level_id` (`level_id`),
  ADD KEY `semester_id` (`semester_id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`teacher_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `batches`
--
ALTER TABLE `batches`
  MODIFY `batch_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `colleges`
--
ALTER TABLE `colleges`
  MODIFY `college_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `college_deans`
--
ALTER TABLE `college_deans`
  MODIFY `dean_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `grades`
--
ALTER TABLE `grades`
  MODIFY `sr` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `levels`
--
ALTER TABLE `levels`
  MODIFY `level_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `majors`
--
ALTER TABLE `majors`
  MODIFY `major_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `programs`
--
ALTER TABLE `programs`
  MODIFY `program_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `semesters`
--
ALTER TABLE `semesters`
  MODIFY `semester_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `study_plans`
--
ALTER TABLE `study_plans`
  MODIFY `plan_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `study_plan_details`
--
ALTER TABLE `study_plan_details`
  MODIFY `detail_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `teacher_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- قيود الجداول المُلقاة.
--

--
-- قيود الجداول `batches`
--
ALTER TABLE `batches`
  ADD CONSTRAINT `batches_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `programs` (`program_id`);

--
-- قيود الجداول `college_deans`
--
ALTER TABLE `college_deans`
  ADD CONSTRAINT `college_deans_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`college_id`);

--
-- قيود الجداول `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `fk_teacher_course` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`) ON DELETE SET NULL;

--
-- قيود الجداول `grades`
--
ALTER TABLE `grades`
  ADD CONSTRAINT `grades_ibfk_1` FOREIGN KEY (`detail_id`) REFERENCES `study_plan_details` (`detail_id`),
  ADD CONSTRAINT `grades_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

--
-- قيود الجداول `levels`
--
ALTER TABLE `levels`
  ADD CONSTRAINT `levels_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `programs` (`program_id`);

--
-- قيود الجداول `programs`
--
ALTER TABLE `programs`
  ADD CONSTRAINT `programs_ibfk_1` FOREIGN KEY (`major_id`) REFERENCES `majors` (`major_id`),
  ADD CONSTRAINT `programs_ibfk_2` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`college_id`);

--
-- قيود الجداول `semesters`
--
ALTER TABLE `semesters`
  ADD CONSTRAINT `semesters_ibfk_1` FOREIGN KEY (`level_id`) REFERENCES `levels` (`level_id`);

--
-- قيود الجداول `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`batch_id`) REFERENCES `batches` (`batch_id`);

--
-- قيود الجداول `study_plans`
--
ALTER TABLE `study_plans`
  ADD CONSTRAINT `study_plans_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `programs` (`program_id`),
  ADD CONSTRAINT `study_plans_ibfk_2` FOREIGN KEY (`batch_id`) REFERENCES `batches` (`batch_id`);

--
-- قيود الجداول `study_plan_details`
--
ALTER TABLE `study_plan_details`
  ADD CONSTRAINT `study_plan_details_ibfk_1` FOREIGN KEY (`plan_id`) REFERENCES `study_plans` (`plan_id`),
  ADD CONSTRAINT `study_plan_details_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  ADD CONSTRAINT `study_plan_details_ibfk_3` FOREIGN KEY (`level_id`) REFERENCES `levels` (`level_id`),
  ADD CONSTRAINT `study_plan_details_ibfk_4` FOREIGN KEY (`semester_id`) REFERENCES `semesters` (`semester_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
