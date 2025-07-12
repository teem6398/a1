CREATE TABLE `major_admission_requirements` (
  `id` int(11) NOT NULL,
  `major_id` int(11) NOT NULL,
  `requirement_ar` varchar(255) NOT NULL,
  `requirement_en` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `major_admission_requirements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `major_id` (`id`);

ALTER TABLE `major_admission_requirements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `major_admission_requirements`
  ADD CONSTRAINT `major_admission_requirements_ibfk_1` FOREIGN KEY (`major_id`) REFERENCES `majors` (`id`) ON DELETE CASCADE;
