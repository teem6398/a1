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
