-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 09 يوليو 2025 الساعة 17:19
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
-- بنية الجدول `activities`
--

CREATE TABLE `activities` (
  `id` int(11) NOT NULL,
  `title_ar` varchar(255) NOT NULL,
  `title_en` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description_ar` text NOT NULL,
  `description_en` text NOT NULL,
  `content_ar` longtext DEFAULT NULL,
  `content_en` longtext DEFAULT NULL,
  `location_ar` varchar(255) DEFAULT NULL,
  `location_en` varchar(255) DEFAULT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `organizer_ar` varchar(255) DEFAULT NULL,
  `organizer_en` varchar(255) DEFAULT NULL,
  `featured_image` varchar(255) DEFAULT NULL,
  `status` enum('draft','published','archived','cancelled') DEFAULT 'draft',
  `contact_info` text DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `activities`
--

INSERT INTO `activities` (`id`, `title_ar`, `title_en`, `slug`, `description_ar`, `description_en`, `content_ar`, `content_en`, `location_ar`, `location_en`, `start_date`, `end_date`, `category_id`, `organizer_ar`, `organizer_en`, `featured_image`, `status`, `contact_info`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 'المؤتمر العلمي الدولي', 'International Scientific Conference', 'international-scientific-conference', 'مؤتمر علمي دولي يناقش أحدث التطورات في مجال الذكاء الاصطناعي وتطبيقاته في التعليم العالي', 'International scientific conference discussing the latest developments in artificial intelligence and its applications in higher education', '<p>يسر جامعة الريادة أن تستضيف المؤتمر العلمي الدولي حول \"الذكاء الاصطناعي وتطبيقاته في التعليم العالي\" والذي سيقام في قاعة المؤتمرات الكبرى بالجامعة.</p><h3>محاور المؤتمر:</h3><ul><li>تطبيقات الذكاء الاصطناعي في التعليم العالي</li><li>التعلم الآلي وتحليل البيانات التعليمية</li><li>الروبوتات التعليمية والتعلم التفاعلي</li><li>أخلاقيات استخدام الذكاء الاصطناعي في التعليم</li><li>مستقبل التعليم في ظل تقنيات الذكاء الاصطناعي</li></ul><h3>المتحدثون الرئيسيون:</h3><ul><li>البروفيسور أحمد محمد - جامعة القاهرة</li><li>الدكتورة سارة الأحمد - جامعة الملك سعود</li><li>البروفيسور جون سميث - جامعة أكسفورد</li><li>الدكتور علي الزهراني - جامعة الملك عبدالله للعلوم والتقنية</li></ul><p>يستهدف المؤتمر الباحثين والأكاديميين والطلاب المهتمين بمجال الذكاء الاصطناعي وتطبيقاته في التعليم العالي. سيتم تقديم أوراق بحثية وعروض تقديمية وورش عمل على مدار ثلاثة أيام.</p><p>للتسجيل والمشاركة، يرجى التواصل مع إدارة المؤتمرات بالجامعة.</p>', '<p>Al-Riyadah University is pleased to host the International Scientific Conference on \"Artificial Intelligence and its Applications in Higher Education\", which will be held in the university\'s grand conference hall.</p><h3>Conference Themes:</h3><ul><li>Applications of Artificial Intelligence in Higher Education</li><li>Machine Learning and Educational Data Analysis</li><li>Educational Robotics and Interactive Learning</li><li>Ethics of Using AI in Education</li><li>The Future of Education in Light of AI Technologies</li></ul><h3>Keynote Speakers:</h3><ul><li>Professor Ahmed Mohamed - Cairo University</li><li>Dr. Sarah Al-Ahmad - King Saud University</li><li>Professor John Smith - Oxford University</li><li>Dr. Ali Al-Zahrani - King Abdullah University of Science and Technology</li></ul><p>The conference targets researchers, academics, and students interested in the field of artificial intelligence and its applications in higher education. Research papers, presentations, and workshops will be presented over three days.</p><p>For registration and participation, please contact the university\'s conference management.</p>', 'قاعة المؤتمرات الكبرى', 'Grand Conference Hall', '2023-12-15 09:00:00', '2023-12-17 18:00:00', 1, 'كلية علوم الحاسب والذكاء الاصطناعي', 'College of Computer Science and Artificial Intelligence', '/image/activities/1.jpg', 'published', NULL, NULL, '2025-07-06 14:04:28', '2025-07-06 15:09:48'),
(2, 'مشاريع الطلاب', 'Student Projects Exhibition', 'student-projects-exhibition', 'معرض سنوي لعرض مشاريع طلاب كلية الهندسة والتكنولوجيا وتكريم المشاريع المتميزة', 'Annual exhibition showcasing projects by students of the Faculty of Engineering and Technology and honoring distinguished projects', '<p>تنظم كلية الهندسة والتكنولوجيا المعرض السنوي لمشاريع الطلاب، حيث يتم عرض أفضل المشاريع التي قام بها طلاب الكلية خلال العام الدراسي.</p><h3>أقسام المعرض:</h3><ul><li>مشاريع الهندسة المدنية</li><li>مشاريع الهندسة الكهربائية</li><li>مشاريع الهندسة الميكانيكية</li><li>مشاريع هندسة البرمجيات</li><li>مشاريع الابتكار والريادة</li></ul><p>سيتم تكريم المشاريع الفائزة بجوائز قيمة، كما سيحضر المعرض ممثلون عن شركات كبرى للتواصل مع الطلاب المتميزين وتوفير فرص تدريب وتوظيف.</p><p>المعرض مفتوح للجمهور ويستمر لمدة ثلاثة أيام من الساعة 9 صباحاً حتى 5 مساءً.</p>', '<p>The Faculty of Engineering and Technology organizes the annual student projects exhibition, showcasing the best projects created by the faculty\'s students during the academic year.</p><h3>Exhibition Sections:</h3><ul><li>Civil Engineering Projects</li><li>Electrical Engineering Projects</li><li>Mechanical Engineering Projects</li><li>Software Engineering Projects</li><li>Innovation and Entrepreneurship Projects</li></ul><p>Winning projects will be honored with valuable prizes. Representatives from major companies will attend the exhibition to connect with outstanding students and provide training and employment opportunities.</p><p>The exhibition is open to the public and runs for three days from 9 AM to 5 PM.</p>', 'مركز الابتكار', 'Innovation Center', '2023-11-20 09:00:00', '2023-11-22 17:00:00', 2, 'كلية الهندسة والتكنولوجيا', 'Faculty of Engineering and Technology', '/image/activities/1.jpg', 'published', NULL, NULL, '2025-07-06 14:04:28', '2025-07-06 15:09:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `category_id` (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- قيود الجداول المُلقاة.
--

--
-- قيود الجداول `activities`
--
ALTER TABLE `activities`
  ADD CONSTRAINT `activities_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `activity_categories` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
