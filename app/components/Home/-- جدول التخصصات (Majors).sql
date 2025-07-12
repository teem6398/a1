-- جدول التخصصات (Majors)
CREATE TABLE `majors` (
  `id` int(11) NOT NULL,
  `name_ar` varchar(255) NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `college_id` int(11) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description_ar` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `duration_ar` varchar(255) DEFAULT NULL,
  `duration_en` varchar(255) DEFAULT NULL,
  `degree_ar` varchar(255) DEFAULT NULL,
  `degree_en` varchar(255) DEFAULT NULL,
  `students` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `majors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `college_id` (`college_id`);

ALTER TABLE `majors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `majors`
  ADD CONSTRAINT `majors_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`id`) ON DELETE CASCADE;

-- جدول ميزات التخصص (MajorFeatures)
CREATE TABLE `major_features` (
  `id` int(11) NOT NULL,
  `major_id` int(11) NOT NULL,
  `feature_ar` varchar(255) NOT NULL,
  `feature_en` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `major_features`
  ADD PRIMARY KEY (`id`),
  ADD KEY `major_id` (`major_id`);

ALTER TABLE `major_features`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `major_features`
  ADD CONSTRAINT `major_features_ibfk_1` FOREIGN KEY (`major_id`) REFERENCES `majors` (`id`) ON DELETE CASCADE;

-- جدول شروط القبول (MajorAdmissionRequirements)
CREATE TABLE `major_admission_requirements` (
  `id` int(11) NOT NULL,
  `major_id` int(11) NOT NULL,
  `requirement_ar` varchar(255) NOT NULL,
  `requirement_en` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `major_admission_requirements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `major_id` (`major_id`);

ALTER TABLE `major_admission_requirements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `major_admission_requirements`
  ADD CONSTRAINT `major_admission_requirements_ibfk_1` FOREIGN KEY (`major_id`) REFERENCES `majors` (`id`) ON DELETE CASCADE;

-- جدول خطوات التقديم (ApplicationSteps)
CREATE TABLE `application_steps` (
  `id` int(11) NOT NULL,
  `title_ar` varchar(255) NOT NULL,
  `title_en` varchar(255) NOT NULL,
  `description_ar` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `order` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `application_steps`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `application_steps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

-- جدول طلبات التقديم (Applications)
CREATE TABLE `applications` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `national_id` varchar(20) NOT NULL,
  `birth_date` date NOT NULL,
  `gender` varchar(10) NOT NULL,
  `high_school_type_ar` varchar(255) NOT NULL,
  `high_school_type_en` varchar(255) NOT NULL,
  `high_school_grade` varchar(10) NOT NULL,
  `preferred_college_ar` varchar(255) NOT NULL,
  `preferred_college_en` varchar(255) NOT NULL,
  `preferred_major_ar` varchar(255) DEFAULT NULL,
  `preferred_major_en` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `applications`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
