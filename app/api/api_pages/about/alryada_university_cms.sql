 -- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 10 يوليو 2025 الساعة 15:27
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
-- بنية الجدول `about_achievements`
--

CREATE TABLE `about_achievements` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `title_en` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `text_en` text NOT NULL,
  `icon` varchar(50) NOT NULL,
  `achievement_order` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `about_achievements`
--

INSERT INTO `about_achievements` (`id`, `title`, `title_en`, `text`, `text_en`, `icon`, `achievement_order`, `created_at`, `updated_at`) VALUES
(1, 'الاعتماد الأكاديمي', 'Academic Accreditation', 'حصلت الجامعة على الاعتماد الأكاديمي الكامل من هيئة التعليم العالي وتم تصنيفها ضمن أفضل 10 جامعات على المستوى المحلي.', 'The university has obtained full academic accreditation from the Higher Education Authority and has been ranked among the top 10 universities at the local level.', '🌟', 1, '2025-05-11 20:14:50', '2025-06-15 16:32:36'),
(2, 'الجوائز والتكريمات', 'Awards and Honors', 'حصدت الجامعة العديد من الجوائز المحلية والإقليمية في مجالات التعليم والبحث العلمي والابتكار.', 'The university has won many local and regional awards in the fields of education, scientific research, and innovation.', '🏆', 2, '2025-05-11 20:14:50', '2025-06-15 16:32:36'),
(3, 'الأبحاث العلمية', 'Scientific Research', 'نشر باحثو الجامعة أكثر من 500 بحث علمي في مجلات عالمية محكمة خلال السنوات الخمس الماضية.', 'University researchers have published over 500 scientific papers in reputable international journals over the past five years.', '🔬', 3, '2025-05-11 20:14:50', '2025-06-15 16:32:36'),
(4, 'الشراكات الدولية', 'International Partnerships', 'أبرمت الجامعة شراكات استراتيجية مع أكثر من 30 جامعة ومؤسسة تعليمية مرموقة حول العالم.', 'The university has formed strategic partnerships with over 30 prestigious universities and educational institutions around the world.', '🌐', 4, '2025-05-11 20:14:50', '2025-06-15 16:32:36');

-- --------------------------------------------------------

--
-- بنية الجدول `about_achievements_section`
--

CREATE TABLE `about_achievements_section` (
  `id` int(11) NOT NULL,
  `section_title` varchar(255) NOT NULL DEFAULT 'إنجازات الجامعة',
  `section_title_en` varchar(255) NOT NULL DEFAULT 'University Achievements',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `about_achievements_section`
--

INSERT INTO `about_achievements_section` (`id`, `section_title`, `section_title_en`, `created_at`, `updated_at`) VALUES
(1, 'إنجازات الجامعة', 'University Achievements', '2025-05-11 20:14:21', '2025-05-11 20:14:21');

-- --------------------------------------------------------

--
-- بنية الجدول `about_features`
--

CREATE TABLE `about_features` (
  `id` int(11) NOT NULL,
  `feature` text NOT NULL,
  `feature_en` text NOT NULL,
  `feature_order` int(11) NOT NULL,
  `about_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `about_features`
--

INSERT INTO `about_features` (`id`, `feature`, `feature_en`, `feature_order`, `about_id`) VALUES
(1, 'برامج أكاديمية متميزة', 'Distinguished Academic Programs', 1, NULL),
(2, 'هيئة تدريس ذات كفاءة عالية', 'Highly Qualified Teaching Staff', 2, NULL),
(3, 'مرافق حديثة ومتطورة', 'Modern and Advanced Facilities', 3, NULL),
(4, 'فرص بحثية متنوعة', 'Diverse Research Opportunities', 4, NULL),
(9, 'برامج أكاديمية متميزة', '', 1, 1),
(10, 'برامج أكاديمية متميزة', '', 2, 1),
(11, 'هيئة تدريس ذات كفاءة عالية', '', 3, 1),
(12, 'هيئة تدريس ذات كفاءة عالية', '', 4, 1),
(13, 'مرافق حديثة ومتطورة', '', 5, 1),
(14, 'مرافق حديثة ومتطورة', '', 6, 1),
(15, 'فرص بحثية متنوعة', '', 7, 1),
(16, 'فرص بحثية متنوعة', '', 8, 1);

-- --------------------------------------------------------

--
-- بنية الجدول `about_guidelines`
--

CREATE TABLE `about_guidelines` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `title_en` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `text_en` text NOT NULL,
  `icon` varchar(50) NOT NULL,
  `guideline_order` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `about_guidelines`
--

INSERT INTO `about_guidelines` (`id`, `title`, `title_en`, `text`, `text_en`, `icon`, `guideline_order`, `created_at`, `updated_at`) VALUES
(1, 'النجاح الأكاديمي', 'Academic Success', 'احرص على حضور جميع المحاضرات وتنظيم وقتك بشكل جيد. قم بإنشاء جدول للمذاكرة والالتزام به، واستفد من ساعات الدعم الأكاديمي التي يقدمها أعضاء هيئة التدريس.', 'Make sure to attend all lectures and organize your time well. Create a study schedule and stick to it, and take advantage of the academic support hours offered by faculty members.', '📚', 1, '2025-05-11 20:17:07', '2025-06-15 16:40:13'),
(2, 'المشاركة المجتمعية', 'Community Involvement', 'شارك في الأنشطة والفعاليات الطلابية والمجتمعية التي تنظمها الجامعة، واستثمر في بناء شبكة علاقات مهنية قوية مع زملائك وأساتذتك.', 'Participate in student and community activities and events organized by the university, and invest in building a strong professional network with your colleagues and professors.', '🤝', 2, '2025-05-11 20:17:07', '2025-06-15 16:40:13'),
(3, 'التطوير الذاتي', 'Self Development', 'احرص على تطوير مهاراتك الشخصية والمهنية من خلال المشاركة في الدورات التدريبية وورش العمل التي تقدمها الجامعة، والاستفادة من الموارد التعليمية المتاحة.', 'Be keen to develop your personal and professional skills by participating in training courses and workshops offered by the university, and benefit from the available educational resources.', '🌱', 3, '2025-05-11 20:17:07', '2025-06-15 16:40:13'),
(4, 'الاستعداد لسوق العمل', 'Job Market Readiness', 'استفد من برامج التدريب العملي والتدريب الصيفي، وقم بإعداد سيرتك الذاتية بشكل احترافي، واحرص على حضور ملتقيات التوظيف التي تنظمها الجامعة.', 'Take advantage of internship and summer training programs, prepare your resume professionally, and make sure to attend the job fairs organized by the university.', '💼', 4, '2025-05-11 20:17:07', '2025-06-15 16:40:13');

-- --------------------------------------------------------

--
-- بنية الجدول `about_guidelines_section`
--

CREATE TABLE `about_guidelines_section` (
  `id` int(11) NOT NULL,
  `section_title` varchar(255) NOT NULL DEFAULT 'إرشادات طلابية',
  `section_title_en` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `about_guidelines_section`
--

INSERT INTO `about_guidelines_section` (`id`, `section_title`, `section_title_en`, `created_at`, `updated_at`) VALUES
(1, 'إرشادات طلابية', 'Student Guidelines', '2025-05-11 20:16:35', '2025-06-15 16:42:27');

-- --------------------------------------------------------

--
-- بنية الجدول `about_hero_section`
--

CREATE TABLE `about_hero_section` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT 'عن جامعة الريادة',
  `title_en` varchar(255) NOT NULL DEFAULT 'About Al-Riyada University',
  `subtitle` varchar(255) NOT NULL DEFAULT 'المعرفة، الابتكار، المستقبل',
  `subtitle_en` varchar(255) NOT NULL DEFAULT 'Knowledge, Innovation, Future',
  `background_image` varchar(255) DEFAULT '/images/hero-bg.jpg',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `about_hero_section`
--

INSERT INTO `about_hero_section` (`id`, `title`, `title_en`, `subtitle`, `subtitle_en`, `background_image`, `created_at`, `updated_at`) VALUES
(1, ' جامعة الريادة', 'About Al-Riyada Universit', 'المعرفة، الابتكار، المستقبل', 'Knowledge, Innovation, Future', '/images/hero-bg.jpg', '2025-05-11 20:12:47', '2025-07-08 12:42:06');

-- --------------------------------------------------------

--
-- بنية الجدول `about_intro_section`
--

CREATE TABLE `about_intro_section` (
  `id` int(11) NOT NULL,
  `section_title` varchar(255) NOT NULL DEFAULT 'من نحن',
  `section_title_en` varchar(255) NOT NULL DEFAULT 'About Us',
  `paragraph_1` text NOT NULL,
  `paragraph_1_en` text NOT NULL,
  `paragraph_2` text NOT NULL,
  `paragraph_2_en` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `about_intro_section`
--

INSERT INTO `about_intro_section` (`id`, `section_title`, `section_title_en`, `paragraph_1`, `paragraph_1_en`, `paragraph_2`, `paragraph_2_en`, `created_at`, `updated_at`) VALUES
(1, 'من نحن', 'About Us', 'أسست جامعة الريادة في عام 2018 بقرار وزاري من وزارة التعليم العالي والبحث العلمي , لتسهم في جودة التعليم الجامعي وتحسين مخرجاته من خلال إيجاد بيئة علمية متجددة وبرامج أكاديمية تواكب متطلبات العصر وفق معايير الجودة تلبي حاجة السوق التنمية ; \n', 'Al-Riyada University offers high-quality education.', 'وترفد المجتمع يكوادر مؤهلة تسهم في البناء والتنمية المستدامة ', 'We are committed to developing society through education.', '2025-05-11 20:13:21', '2025-07-05 09:14:00');

-- --------------------------------------------------------

--
-- بنية الجدول `about_rules`
--

CREATE TABLE `about_rules` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `title_en` varchar(255) NOT NULL,
  `details` text NOT NULL,
  `details_en` text NOT NULL,
  `rule_order` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `about_rules`
--

INSERT INTO `about_rules` (`id`, `title`, `title_en`, `details`, `details_en`, `rule_order`, `created_at`, `updated_at`) VALUES
(1, 'القبول والتسجيل', 'Admission and Registration', 'يتم القبول في الجامعة وفقًا لمعايير محددة تشمل المعدل الأكاديمي واختبارات القبول\nيجب على الطلاب الالتزام بمواعيد التسجيل المحددة في كل فصل دراسي\nيمكن للطلاب إضافة أو حذف المقررات خلال الأسبوعين الأولين من الفصل الدراسي', 'Admission to the university is based on specific criteria including academic average and admission tests. Students must adhere to the registration deadlines for each semester. Students can add or drop courses within the first two weeks of the semester.', 1, '2025-05-11 20:16:03', '2025-06-15 16:45:40'),
(2, 'نظام الدراسة والاختبارات', 'Study and Examination System', 'تعتمد الجامعة نظام الساعات المعتمدة في جميع البرامج الأكاديمية\nالحد الأدنى للنجاح في المقررات هو 60%\nيحق للطالب إعادة المقرر الذي رسب فيه في الفصل التالي', 'The university adopts the credit hour system in all academic programs. The minimum passing grade for courses is 60%. A student is allowed to retake a failed course in the following semester.', 2, '2025-05-11 20:16:03', '2025-06-15 16:45:40'),
(3, 'الحضور والغياب', 'Attendance and Absence', 'يجب على الطلاب حضور ما لا يقل عن 75% من المحاضرات\nيتم حرمان الطالب من دخول الاختبار النهائي إذا تجاوزت نسبة غيابه 25%\nيمكن قبول الأعذار الطبية والحالات الطارئة وفق ضوابط محددة', 'Students must attend at least 75% of lectures. A student will be barred from the final exam if their absence exceeds 25%. Medical excuses and emergency cases may be accepted under specific regulations.', 3, '2025-05-11 20:16:03', '2025-06-15 16:45:40'),
(4, 'السلوك والانضباط', 'Behavior and Discipline', 'يلتزم الطلاب بقواعد السلوك العام داخل الحرم الجامعي\nيحظر التدخين داخل المباني والقاعات الدراسية\nيتم اتخاذ إجراءات تأديبية ضد حالات الغش أو الانتحال العلمي', 'Students adhere to the rules of public conduct within the campus. Smoking is prohibited inside buildings and classrooms. Disciplinary action will be taken against cases of cheating or academic dishonesty.', 4, '2025-05-11 20:16:03', '2025-06-15 16:45:40');

-- --------------------------------------------------------

--
-- بنية الجدول `about_rules_section`
--

CREATE TABLE `about_rules_section` (
  `id` int(11) NOT NULL,
  `section_title` varchar(255) NOT NULL DEFAULT 'قوانين الجامعة',
  `section_title_en` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `about_rules_section`
--

INSERT INTO `about_rules_section` (`id`, `section_title`, `section_title_en`, `created_at`, `updated_at`) VALUES
(1, 'قوانين الجامعة', 'University Rules', '2025-05-11 20:15:34', '2025-06-15 16:47:24');

-- --------------------------------------------------------

--
-- بنية الجدول `about_statistics`
--

CREATE TABLE `about_statistics` (
  `id` int(11) NOT NULL,
  `number` varchar(50) NOT NULL,
  `label` varchar(255) NOT NULL,
  `label_en` varchar(255) NOT NULL,
  `stat_order` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `about_statistics`
--

INSERT INTO `about_statistics` (`id`, `number`, `label`, `label_en`, `stat_order`, `created_at`, `updated_at`) VALUES
(1, '5000+', 'طالب وطالبة', 'Students', 1, '2025-05-11 20:13:55', '2025-06-15 16:48:58'),
(2, '200+', 'عضو هيئة تدريس', 'Faculty Members', 2, '2025-05-11 20:13:55', '2025-06-15 16:48:58'),
(3, '20+', 'برنامج أكاديمي', 'Academic Program', 4, '2025-05-11 20:13:55', '2025-07-05 09:14:00'),
(4, '15+', 'سنة من التميز', 'Years of Excellence', 3, '2025-05-11 20:13:55', '2025-07-05 09:14:00');

-- --------------------------------------------------------

--
-- بنية الجدول `about_stats`
--

CREATE TABLE `about_stats` (
  `id` int(11) NOT NULL,
  `number` varchar(50) NOT NULL,
  `label` varchar(100) NOT NULL,
  `label_en` varchar(100) NOT NULL,
  `stat_order` int(11) NOT NULL,
  `about_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `about_stats`
--

INSERT INTO `about_stats` (`id`, `number`, `label`, `label_en`, `stat_order`, `about_id`) VALUES
(1, '20+', 'برنامج أكاديمي', 'Academic Program', 1, NULL),
(2, '5000+', 'طالب وطالبة', 'Students', 2, NULL),
(3, '200+', 'عضو هيئة تدريس', 'Faculty Members', 3, NULL),
(4, '15+', 'سنة من التميز', 'Years of Excellence', 4, NULL),
(5, '30+', 'شراكات دولية', 'International Partnerships', 5, NULL),
(11, '5000+', 'طالب وطالبة', '', 1, 1),
(12, '200+', 'عضو هيئة تدريس', '', 2, 1),
(13, '20+', 'برنامج أكاديمي', '', 3, 1),
(14, '15+', 'سنة من التميز', '', 4, 1);

-- --------------------------------------------------------

--
-- بنية الجدول `about_university`
--

CREATE TABLE `about_university` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `title_en` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `description_en` text NOT NULL,
  `read_more_link` varchar(255) DEFAULT '/about',
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `about_university`
--

INSERT INTO `about_university` (`id`, `title`, `title_en`, `description`, `description_en`, `read_more_link`, `last_updated`) VALUES
(1, 'عن الجامعة', 'About the University', 'جامعة الريادة هي مؤسسة تعليمية رائدة تقدم برامج أكاديمية متميزة.', 'Al-Riyada University is a leading educational institution offering distinguished academic programs.', '/about', '2025-06-14 17:47:53');

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
(1, 1, 'تقنية المعلومات', 'Information Technology', 'تقنية المعلومات', 'بناء المستقبل الرقمي وتطوير حلول تقنية مبتكرة', '/images/it-hero.jpg', 'يهدف تخصص تقنية المعلومات إلى تزويد الطلاب بالمعارف والمهارات اللازمة لتصميم وتطوير وإدارة أنظمة المعلومات والتطبيقات البرمجية، مع التركيز على التقنيات الحديثة مثل الذكاء الاصطناعي والبيانات الضخمة. يتميز هذا التخصص بتنوع المجالات التي يغطيها، من تطوير البرمجيات إلى أمن المعلومات وإدارة الشبكات، مما يمنح الخريجين فرصًا وظيفية واسعة في مختلف القطاعات التقنية.', '2025-06-01 19:12:52', '2025-06-29 03:59:33'),
(2, 1, 'الهندسة المعمارية', 'Architecture', 'الهندسة المعمارية', 'تصميم المستقبل وبناء عالم أفضل', '/images/architecture-hero.jpg', 'يهدف تخصص الهندسة المعمارية إلى تزويد الطلاب بالمعارف والمهارات اللازمة لتصميم المباني والمنشآت بطريقة تجمع بين الجمال والوظيفة والاستدامة. يتميز هذا التخصص بالتركيز على الإبداع والابتكار، مع الاهتمام بالجوانب الفنية والهندسية والبيئية في التصميم المعماري، وتطبيق أحدث التقنيات في مجال البناء والتشييد.', '2025-06-03 11:43:24', '2025-06-05 14:18:16'),
(3, 3, 'المحاسبة', 'Accounting', 'برنامج المحاسبة المتميز', 'اكتشف مستقبل الأرقام والتحليل المالي معنا.', '/images/accounting-hero.jpg', 'يهدف تخصص المحاسبة إلى تزويد الطلاب بالمعرفة والفهم العميق للمبادئ والممارسات المحاسبية الحديثة، وتمكينهم من تحليل البيانات المالية واتخاذ القرارات الاقتصادية الرشيدة.يغطي البرنامج مجالات متنوعة مثل المحاسبة المالية، محاسبة التكاليف، المراجعة، الضرائب، والمحاسبة الإدارية، مع التركيز على استخدام التكنولوجيا في المحاسبة وتطبيق المعايير الدولية.', '2025-06-04 14:39:00', '2025-06-04 14:49:02'),
(4, 3, 'إدارة الأعمال', 'Business Management', 'إدارة الأعمال', 'نصنع قادة المستقبل في عالم الأعمال', '/images/business-management-hero.jpg', '<p>يهدف تخصص إدارة الأعمال إلى تزويد الطلاب بالمعارف والمهارات اللازمة لإدارة المؤسسات بكفاءة واحترافية، مع التركيز على القيادة، التخطيط، التنظيم، واتخاذ القرار.</p><p>يتميز هذا التخصص بتنوع المجالات التي يغطيها، من إدارة الموارد البشرية إلى التسويق والتمويل، مما يمنح الخريجين فرصًا وظيفية واسعة في مختلف القطاعات.</p>', '2025-06-04 14:57:16', '2025-06-04 14:57:32'),
(5, 3, 'التمويل والاستثمار', 'Finance', 'التمويل والاستثمار', 'بناء مستقبل مالي ناجح واستثمارات ذكية', '/images/finance-hero.jpg', 'يركز تخصص التمويل والاستثمار على تزويد الطلاب بالمعرفة في مجالات التحليل المالي، وإدارة المحافظ الاستثمارية، والتمويل الدولي، والأسواق المالية.يتميز هذا التخصص بتأهيل الطلاب للتعامل مع التحديات المالية المعاصرة، وفهم آليات الاستثمار، وتقييم المخاطر المالية، وإدارة الأصول بكفاءة.', '2025-06-04 14:58:35', '2025-06-04 15:04:41'),
(6, 3, 'التسويق', 'Marketing', 'التسويق', 'ابتكار استراتيجيات تسويقية تصنع الفرق', '/images/marketing-hero.jpg', '<p>يهدف تخصص التسويق إلى إعداد الطلاب لفهم سلوك المستهلك، وتطوير استراتيجيات تسويقية فعّالة، واستخدام أدوات التسويق الرقمي الحديثة.</p><p>يتميز هذا التخصص بتركيزه على الجوانب الإبداعية والتحليلية للتسويق، مما يؤهل الخريجين للعمل في مجالات متنوعة مثل إدارة العلامات التجارية، والتسويق الرقمي، وبحوث السوق.</p>', '2025-06-04 15:00:17', '2025-06-04 15:04:53'),
(7, 2, 'طب الأسنان', 'Dentistry', 'طب الأسنان', 'ابتسامة صحية لحياة أفضل', '/images/dentistry-hero.jpg', '<p>يهدف تخصص طب الأسنان إلى تزويد الطلاب بالمعارف والمهارات اللازمة لتشخيص وعلاج أمراض الفم والأسنان، وإجراء مختلف العمليات الجراحية والترميمية، مع التركيز على الوقاية وتعزيز صحة الفم.</p><p>يتميز هذا التخصص بالتدريب العملي المكثف في العيادات المتطورة، واستخدام أحدث التقنيات والمواد في مجال طب الأسنان، مما يؤهل الخريجين للعمل في مختلف مجالات طب الأسنان التخصصية.</p>', '2025-06-04 15:02:00', '2025-06-04 15:05:08'),
(8, 2, 'المختبرات الطبية', 'MedicalLaboratorySciences', 'المختبرات الطبية', 'دقة التشخيص لرعاية صحية متميزة', '/images/laboratory-hero.jpg', 'يهدف تخصص المختبرات الطبية إلى تزويد الطلاب بالمعارف والمهارات اللازمة لإجراء الفحوصات المخبرية المختلفة، وتحليل العينات البيولوجية، وتفسير النتائج، مما يساهم في تشخيص الأمراض ومتابعة العلاج. يتميز هذا التخصص بالتدريب العملي المكثف في المختبرات المتطورة، واستخدام أحدث التقنيات والأجهزة في مجال التحاليل الطبية، مما يؤهل الخريجين للعمل في مختلف المجالات المخبرية التخصصية.', '2025-06-04 15:02:24', '2025-06-05 16:31:35'),
(9, 2, 'الطب البشري', 'Medicine', 'الطب البشري', 'رعاية صحية متميزة لمستقبل أفضل', '/images/medicine-hero.jpg', 'يهدف تخصص الطب البشري إلى تزويد الطلاب بالمعارف والمهارات اللازمة لتشخيص وعلاج الأمراض، والوقاية منها، وتعزيز الصحة العامة، مع التركيز على الرعاية الصحية الشاملة والمتكاملة. يتميز هذا التخصص بتكامل العلوم الأساسية مع التدريب السريري، وتطبيق أحدث التقنيات والأبحاث الطبية، مما يؤهل الخريجين للعمل في مختلف المجالات الطبية والتخصصات الدقيقة.', '2025-06-04 15:02:38', '2025-06-05 16:31:19'),
(10, 2, 'الصيدلة', 'Pharmacy', 'الصيدلة', 'علاج آمن وفعال لصحة أفضل', '/images/pharmacy-hero.jpg', 'يهدف تخصص الصيدلة إلى تزويد الطلاب بالمعارف والمهارات اللازمة في مجال الأدوية وتركيبها وتصنيعها وآلية عملها، وكيفية صرفها ومراقبة آثارها، مع التركيز على الاستخدام الآمن والفعال للعلاجات. يتميز هذا التخصص بالتدريب العملي في المعامل والصيدليات، ودراسة التفاعلات الدوائية والآثار الجانبية، مما يؤهل الخريجين للعمل في مختلف المجالات الصيدلانية والدوائية.', '2025-06-04 15:02:56', '2025-06-05 16:31:03');

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
(1, 'المؤتمر العلمي الدولي', 'International Scientific Conference', 'international-scientific-conference', 'مؤتمر علمي دولي يناقش أحدث التطورات في مجال الذكاء الاصطناعي وتطبيقاته في التعليم العالي', 'International scientific conference discussing the latest developments in artificial intelligence and its applications in higher education', '<p>يسر جامعة الريادة أن تستضيف المؤتمر العلمي الدولي حول \"الذكاء الاصطناعي وتطبيقاته في التعليم العالي\" والذي سيقام في قاعة المؤتمرات الكبرى بالجامعة.</p><h3>محاور المؤتمر:</h3><ul><li>تطبيقات الذكاء الاصطناعي في التعليم العالي</li><li>التعلم الآلي وتحليل البيانات التعليمية</li><li>الروبوتات التعليمية والتعلم التفاعلي</li><li>أخلاقيات استخدام الذكاء الاصطناعي في التعليم</li><li>مستقبل التعليم في ظل تقنيات الذكاء الاصطناعي</li></ul><h3>المتحدثون الرئيسيون:</h3><ul><li>البروفيسور أحمد محمد - جامعة القاهرة</li><li>الدكتورة سارة الأحمد - جامعة الملك سعود</li><li>البروفيسور جون سميث - جامعة أكسفورد</li><li>الدكتور علي الزهراني - جامعة الملك عبدالله للعلوم والتقنية</li></ul><p>يستهدف المؤتمر الباحثين والأكاديميين والطلاب المهتمين بمجال الذكاء الاصطناعي وتطبيقاته في التعليم العالي. سيتم تقديم أوراق بحثية وعروض تقديمية وورش عمل على مدار ثلاثة أيام.</p><p>للتسجيل والمشاركة، يرجى التواصل مع إدارة المؤتمرات بالجامعة.</p>', '<p>Al-Riyadah University is pleased to host the International Scientific Conference on \"Artificial Intelligence and its Applications in Higher Education\", which will be held in the university\'s grand conference hall.</p><h3>Conference Themes:</h3><ul><li>Applications of Artificial Intelligence in Higher Education</li><li>Machine Learning and Educational Data Analysis</li><li>Educational Robotics and Interactive Learning</li><li>Ethics of Using AI in Education</li><li>The Future of Education in Light of AI Technologies</li></ul><h3>Keynote Speakers:</h3><ul><li>Professor Ahmed Mohamed - Cairo University</li><li>Dr. Sarah Al-Ahmad - King Saud University</li><li>Professor John Smith - Oxford University</li><li>Dr. Ali Al-Zahrani - King Abdullah University of Science and Technology</li></ul><p>The conference targets researchers, academics, and students interested in the field of artificial intelligence and its applications in higher education. Research papers, presentations, and workshops will be presented over three days.</p><p>For registration and participation, please contact the university\'s conference management.</p>', 'قاعة المؤتمرات الكبرى', 'Grand Conference Hall', '2023-12-15 09:00:00', '2023-12-17 18:00:00', 1, 'كلية علوم الحاسب والذكاء الاصطناعي', 'College of Computer Science and Artificial Intelligence', '/a/1.jpg', 'published', NULL, NULL, '2025-07-06 14:04:28', '2025-07-09 16:48:23'),
(2, 'مشاريع الطلاب', 'Student Projects Exhibition', 'student-projects-exhibition', 'معرض سنوي لعرض مشاريع طلاب كلية الهندسة والتكنولوجيا وتكريم المشاريع المتميزة', 'Annual exhibition showcasing projects by students of the Faculty of Engineering and Technology and honoring distinguished projects', '<p>تنظم كلية الهندسة والتكنولوجيا المعرض السنوي لمشاريع الطلاب، حيث يتم عرض أفضل المشاريع التي قام بها طلاب الكلية خلال العام الدراسي.</p><h3>أقسام المعرض:</h3><ul><li>مشاريع الهندسة المدنية</li><li>مشاريع الهندسة الكهربائية</li><li>مشاريع الهندسة الميكانيكية</li><li>مشاريع هندسة البرمجيات</li><li>مشاريع الابتكار والريادة</li></ul><p>سيتم تكريم المشاريع الفائزة بجوائز قيمة، كما سيحضر المعرض ممثلون عن شركات كبرى للتواصل مع الطلاب المتميزين وتوفير فرص تدريب وتوظيف.</p><p>المعرض مفتوح للجمهور ويستمر لمدة ثلاثة أيام من الساعة 9 صباحاً حتى 5 مساءً.</p>', '<p>The Faculty of Engineering and Technology organizes the annual student projects exhibition, showcasing the best projects created by the faculty\'s students during the academic year.</p><h3>Exhibition Sections:</h3><ul><li>Civil Engineering Projects</li><li>Electrical Engineering Projects</li><li>Mechanical Engineering Projects</li><li>Software Engineering Projects</li><li>Innovation and Entrepreneurship Projects</li></ul><p>Winning projects will be honored with valuable prizes. Representatives from major companies will attend the exhibition to connect with outstanding students and provide training and employment opportunities.</p><p>The exhibition is open to the public and runs for three days from 9 AM to 5 PM.</p>', 'مركز الابتكار', 'Innovation Center', '2023-11-20 09:00:00', '2023-11-22 17:00:00', 2, 'كلية الهندسة والتكنولوجيا', 'Faculty of Engineering and Technology', '/image/activities/1.jpg', 'published', NULL, NULL, '2025-07-06 14:04:28', '2025-07-06 15:09:33');

-- --------------------------------------------------------

--
-- بنية الجدول `activity_categories`
--

CREATE TABLE `activity_categories` (
  `id` int(11) NOT NULL,
  `name_ar` varchar(100) NOT NULL,
  `name_en` varchar(100) NOT NULL,
  `description_ar` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `color_code` varchar(20) DEFAULT '#4a00e0',
  `icon` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `activity_categories`
--

INSERT INTO `activity_categories` (`id`, `name_ar`, `name_en`, `description_ar`, `description_en`, `color_code`, `icon`, `created_at`, `updated_at`) VALUES
(1, 'مؤتمرات', 'Conferences', 'مؤتمرات علمية وأكاديمية', 'Scientific and academic conferences', '#4a00e0', 'conference', '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(2, 'معارض', 'Exhibitions', 'معارض طلابية ومهنية', 'Student and professional exhibitions', '#00a3e0', 'exhibition', '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(3, 'رياضة', 'Sports', 'فعاليات وأنشطة رياضية', 'Sports events and activities', '#00c853', 'sports', '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(4, 'ورش عمل', 'Workshops', 'ورش عمل تدريبية', 'Training workshops', '#ff9800', 'workshop', '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(5, 'مسابقات', 'Competitions', 'مسابقات طلابية وعلمية', 'Student and scientific competitions', '#e91e63', 'competition', '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(6, 'توظيف', 'Employment', 'فعاليات التوظيف والتدريب المهني', 'Employment and professional training events', '#3f51b5', 'employment', '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(7, 'فعاليات ثقافية', 'Cultural Events', 'فعاليات ثقافية وفنية', 'Cultural and artistic events', '#9c27b0', 'cultural', '2025-07-06 14:04:28', '2025-07-06 14:04:28');

-- --------------------------------------------------------

--
-- بنية الجدول `activity_media`
--

CREATE TABLE `activity_media` (
  `id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `media_type` enum('image','video','document') NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `title_ar` varchar(255) DEFAULT NULL,
  `title_en` varchar(255) DEFAULT NULL,
  `description_ar` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `is_featured` tinyint(1) DEFAULT 0,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `activity_media`
--

INSERT INTO `activity_media` (`id`, `activity_id`, `media_type`, `file_path`, `title_ar`, `title_en`, `description_ar`, `description_en`, `is_featured`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 1, 'image', '/a/1.jpg', 'صورة المؤتمر 1', 'Conference Image 1', NULL, NULL, 1, 1, '2025-07-06 14:04:28', '2025-07-09 16:50:20'),
(2, 1, 'image', '/image/activities/conf2.jpg', 'صورة المؤتمر 2', 'Conference Image 2', NULL, NULL, 0, 2, '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(3, 1, 'image', '/image/activities/conf3.jpg', 'صورة المؤتمر 3', 'Conference Image 3', NULL, NULL, 0, 3, '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(4, 1, 'video', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'فيديو تعريفي بالمؤتمر', 'Conference Introduction Video', NULL, NULL, 0, 4, '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(5, 2, 'image', '/image/activities/expo1.jpg', 'صورة المعرض 1', 'Exhibition Image 1', NULL, NULL, 1, 1, '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(6, 2, 'image', '/image/activities/expo2.jpg', 'صورة المعرض 2', 'Exhibition Image 2', NULL, NULL, 0, 2, '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(7, 2, 'image', '/image/activities/expo3.jpg', 'صورة المعرض 3', 'Exhibition Image 3', NULL, NULL, 0, 3, '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(8, 2, 'video', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'فيديو تعريفي بالمعرض', 'Exhibition Introduction Video', NULL, NULL, 0, 4, '2025-07-06 14:04:28', '2025-07-06 14:04:28');

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

-- --------------------------------------------------------

--
-- بنية الجدول `activity_schedule`
--

CREATE TABLE `activity_schedule` (
  `id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `title_ar` varchar(255) NOT NULL,
  `title_en` varchar(255) NOT NULL,
  `description_ar` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime DEFAULT NULL,
  `location_ar` varchar(255) DEFAULT NULL,
  `location_en` varchar(255) DEFAULT NULL,
  `presenter_ar` varchar(255) DEFAULT NULL,
  `presenter_en` varchar(255) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `activity_schedule`
--

INSERT INTO `activity_schedule` (`id`, `activity_id`, `title_ar`, `title_en`, `description_ar`, `description_en`, `start_time`, `end_time`, `location_ar`, `location_en`, `presenter_ar`, `presenter_en`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 1, 'تسجيل المشاركين', 'Participant Registration', 'تسجيل المشاركين وتوزيع المواد التعريفية', 'Registration of participants and distribution of introductory materials', '2023-11-15 08:00:00', '2023-12-15 09:00:00', 'مدخل قاعة المؤتمرات', 'Conference Hall Entrance', NULL, NULL, 1, '2025-07-06 14:04:28', '2025-07-09 16:53:05'),
(2, 1, 'كلمة افتتاحية', 'Opening Speech', 'كلمة افتتاحية من رئيس الجامعة', 'Opening speech by the university president', '2023-12-15 09:00:00', '2023-12-15 09:30:00', 'قاعة المؤتمرات الرئيسية', 'Main Conference Hall', 'أ.د. محمد العمري', 'Prof. Mohammed Al-Amri', 2, '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(3, 1, 'الجلسة الأولى: مستقبل الذكاء الاصطناعي في التعليم', 'First Session: The Future of AI in Education', 'مناقشة حول مستقبل الذكاء الاصطناعي وتأثيره على التعليم العالي', 'Discussion about the future of AI and its impact on higher education', '2023-12-15 09:30:00', '2023-12-15 11:00:00', 'قاعة المؤتمرات الرئيسية', 'Main Conference Hall', 'د. أحمد محمد', 'Dr. Ahmed Mohamed', 3, '2025-07-06 14:04:28', '2025-07-06 14:04:28'),
(4, 1, 'استراحة', 'Break', 'استراحة قهوة وشاي', 'Coffee and tea break', '2023-12-15 11:00:00', '2023-12-15 11:30:00', 'بهو قاعة المؤتمرات', 'Conference Hall Lobby', NULL, NULL, 4, '2025-07-06 14:04:28', '2025-07-06 14:04:28');

-- --------------------------------------------------------

--
-- بنية الجدول `alumni`
--

CREATE TABLE `alumni` (
  `id` int(11) NOT NULL,
  `name_ar` varchar(255) NOT NULL COMMENT 'اسم الخريج باللغة العربية',
  `name_en` varchar(255) NOT NULL COMMENT 'اسم الخريج باللغة الإنجليزية',
  `graduation_year` int(11) NOT NULL COMMENT 'سنة التخرج',
  `major_id` int(11) NOT NULL COMMENT 'معرف التخصص',
  `current_position_ar` varchar(255) NOT NULL COMMENT 'المنصب الحالي باللغة العربية',
  `current_position_en` varchar(255) NOT NULL COMMENT 'المنصب الحالي باللغة الإنجليزية',
  `company_id` int(11) NOT NULL COMMENT 'معرف الشركة',
  `image` varchar(255) DEFAULT NULL COMMENT 'صورة الخريج',
  `linkedin` varchar(255) DEFAULT NULL COMMENT 'رابط حساب LinkedIn',
  `twitter` varchar(255) DEFAULT NULL COMMENT 'رابط حساب Twitter',
  `email` varchar(255) DEFAULT NULL COMMENT 'البريد الإلكتروني',
  `featured` tinyint(1) DEFAULT 0 COMMENT 'خريج مميز للعرض في الصفحة الرئيسية',
  `status` enum('active','inactive') DEFAULT 'active' COMMENT 'حالة الخريج',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `alumni`
--

INSERT INTO `alumni` (`id`, `name_ar`, `name_en`, `graduation_year`, `major_id`, `current_position_ar`, `current_position_en`, `company_id`, `image`, `linkedin`, `twitter`, `email`, `featured`, `status`, `created_at`, `updated_at`) VALUES
(1, 'محمد أحمد', 'Mohammed Ahmed', 2020, 1, 'مهندس برمجيات أول', 'Senior Software Engineer', 1, '/image/6.jpg', 'https://linkedin.com/in/mohammed-ahmed', 'https://twitter.com/mohammed_ahmed', 'mohammed.ahmed@example.com', 1, 'active', '2025-06-21 23:06:15', '2025-07-05 19:59:24'),
(2, 'نور الهدى علي', 'Noor Al-Huda Ali', 2019, 3, 'مديرة تسويق', 'Marketing Manager', 2, '/image/6.jpg', 'https://linkedin.com/in/noor-ali', 'https://twitter.com/noor_ali', 'noor.ali@example.com', 1, 'active', '2025-06-21 23:06:15', '2025-07-05 19:59:34'),
(3, 'عبدالله محمد', 'Abdullah Mohammed', 2021, 4, 'طبيب استشاري', 'Consultant Physician', 3, '/image/6.jpg', 'https://linkedin.com/in/abdullah-mohammed', 'https://twitter.com/abdullah_m', 'abdullah.m@example.com', 1, 'active', '2025-06-21 23:06:15', '2025-07-05 19:59:40'),
(4, 'سارة خالد', 'Sara Khalid', 2020, 2, 'عالمة بيانات', 'Data Scientist', 4, '/image/6.jpg', 'https://linkedin.com/in/sara-khalid', 'https://twitter.com/sara_khalid', 'sara.khalid@example.com', 1, 'active', '2025-06-21 23:06:15', '2025-07-05 19:59:57'),
(5, 'فيصل عبدالرحمن', 'Faisal Abdulrahman', 2022, 5, 'مهندس معماري', 'Structural Engineer', 5, '/image/6.jpg', 'https://linkedin.com/in/faisal-abdulrahman', 'https://twitter.com/faisal_ar', 'faisal.ar@example.com', 0, 'active', '2025-06-21 23:06:15', '2025-07-05 20:00:17'),
(6, 'لينا يوسف', 'Lina Yousef', 2021, 6, 'مديرة علاقات عامة', 'Public Relations Manager', 6, '/image/6.jpg', 'https://linkedin.com/in/lina-yousef', 'https://twitter.com/lina_yousef', 'lina.yousef@example.com', 0, 'active', '2025-06-21 23:06:15', '2025-07-05 20:00:27'),
(7, 'خالد إبراهيم', 'Khalid Ibrahim', 2019, 7, 'مدير أمن المعلومات', 'Information Security Manager', 7, '/image/6.jpg', 'https://linkedin.com/in/khalid-ibrahim', 'https://twitter.com/khalid_ibrahim', 'khalid.ibrahim@example.com', 0, 'active', '2025-06-21 23:06:15', '2025-07-05 20:00:35'),
(8, 'رنا سعيد', 'Rana Saeed', 2018, 8, 'طبيبة أسنان', 'Dentist', 8, '/image/6.jpg', 'https://linkedin.com/in/rana-saeed', 'https://twitter.com/rana_saeed', 'rana.saeed@example.com', 0, 'active', '2025-06-21 23:06:15', '2025-07-05 20:00:44');

-- --------------------------------------------------------

--
-- بنية الجدول `alumni_achievements`
--

CREATE TABLE `alumni_achievements` (
  `id` int(11) NOT NULL,
  `alumni_id` int(11) NOT NULL COMMENT 'معرف الخريج',
  `achievement_ar` text NOT NULL COMMENT 'الإنجاز باللغة العربية',
  `achievement_en` text NOT NULL COMMENT 'الإنجاز باللغة الإنجليزية',
  `year` int(11) DEFAULT NULL COMMENT 'سنة الإنجاز',
  `sort_order` int(11) DEFAULT 0 COMMENT 'ترتيب العرض',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `alumni_achievements`
--

INSERT INTO `alumni_achievements` (`id`, `alumni_id`, `achievement_ar`, `achievement_en`, `year`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 1, 'حصل على جائزة التميز الأكاديمي خلال فترة الدراسة', 'Received the Academic Excellence Award during the study period', 2017, 1, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(2, 1, 'عمل كمتطوع في برامج خدمة المجتمع', 'Volunteered in community service programs', 2016, 2, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(3, 1, 'شارك في تطوير تطبيق للهواتف الذكية خلال فترة الدراسة', 'Participated in developing a mobile application during the study period', 2018, 3, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(4, 1, 'حصل على براءة اختراع في مجال الذكاء الاصطناعي', 'Obtained a patent in the field of artificial intelligence', 2020, 4, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(5, 2, 'فازت بمسابقة خطط التسويق على مستوى الجامعات', 'Won the marketing plan competition at the university level', 2018, 1, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(6, 2, 'قادت فريق التسويق الطلابي في الجامعة', 'Led the student marketing team at the university', 2017, 2, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(7, 2, 'شاركت في تنظيم مؤتمر ريادة الأعمال السنوي', 'Participated in organizing the annual entrepreneurship conference', 2019, 3, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(8, 2, 'حصلت على منحة دراسية للتدريب الصيفي في شركة عالمية', 'Received a scholarship for summer training at a global company', 2018, 4, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(9, 3, 'نشر بحثًا علميًا في مجلة طبية مرموقة', 'Published a scientific research in a prestigious medical journal', 2016, 1, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(10, 3, 'شارك في بعثة طبية تطوعية لمساعدة المناطق المحتاجة', 'Participated in a voluntary medical mission to help needy areas', 2017, 2, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(11, 3, 'حصل على جائزة أفضل طالب طب في دفعته', 'Received the Best Medical Student Award in his class', 2017, 3, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(12, 3, 'قدم محاضرات توعوية صحية في المدارس والجامعات', 'Delivered health awareness lectures in schools and universities', 2018, 4, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(13, 4, 'فازت بمسابقة البرمجة على مستوى الجامعة', 'Won the programming competition at the university level', 2019, 1, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(14, 4, 'طورت خوارزمية للتنبؤ بأنماط استهلاك الطاقة', 'Developed an algorithm to predict energy consumption patterns', 2020, 2, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(15, 4, 'شاركت في مؤتمر علوم البيانات الدولي', 'Participated in the International Data Science Conference', 2020, 3, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(16, 4, 'حصلت على شهادة احترافية في تحليل البيانات الضخمة', 'Obtained a professional certification in big data analysis', 2021, 4, '2025-06-21 23:06:15', '2025-06-21 23:06:15');

-- --------------------------------------------------------

--
-- بنية الجدول `alumni_colleges`
--

CREATE TABLE `alumni_colleges` (
  `id` int(11) NOT NULL,
  `name_ar` varchar(255) NOT NULL COMMENT 'اسم الكلية باللغة العربية',
  `name_en` varchar(255) NOT NULL COMMENT 'اسم الكلية باللغة الإنجليزية',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `alumni_colleges`
--

INSERT INTO `alumni_colleges` (`id`, `name_ar`, `name_en`, `created_at`, `updated_at`) VALUES
(1, 'كلية الهندسة', 'College of Engineering', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(2, 'كلية إدارة الأعمال', 'College of Business Administration', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(3, 'كلية الطب', 'College of Medicine', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(4, 'كلية علوم الحاسب والمعلومات', 'College of Computer and Information Sciences', '2025-06-21 23:06:15', '2025-06-21 23:06:15');

-- --------------------------------------------------------

--
-- بنية الجدول `alumni_companies`
--

CREATE TABLE `alumni_companies` (
  `id` int(11) NOT NULL,
  `name_ar` varchar(255) NOT NULL COMMENT 'اسم الشركة باللغة العربية',
  `name_en` varchar(255) NOT NULL COMMENT 'اسم الشركة باللغة الإنجليزية',
  `website` varchar(255) DEFAULT NULL COMMENT 'الموقع الإلكتروني للشركة',
  `logo` varchar(255) DEFAULT NULL COMMENT 'شعار الشركة',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `alumni_companies`
--

INSERT INTO `alumni_companies` (`id`, `name_ar`, `name_en`, `website`, `logo`, `created_at`, `updated_at`) VALUES
(1, 'شركة جوجل', 'Google', 'https://www.google.com', '/companies/google.png', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(2, 'شركة أمازون', 'Amazon', 'https://www.amazon.com', '/companies/amazon.png', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(3, 'مستشفى التخصصي', 'Specialized Hospital', 'https://www.specialized-hospital.com', '/companies/hospital.png', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(4, 'شركة مايكروسوفت', 'Microsoft', 'https://www.microsoft.com', '/companies/microsoft.png', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(5, 'شركة أرامكو', 'Saudi Aramco', 'https://www.aramco.com', '/companies/aramco.png', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(6, 'بنك الرياض', 'Riyad Bank', 'https://www.riyadbank.com', '/companies/riyadbank.png', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(7, 'شركة الاتصالات السعودية', 'STC', 'https://www.stc.com.sa', '/companies/stc.png', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(8, 'شركة أبل', 'Apple', 'https://www.apple.com', '/companies/apple.png', '2025-06-21 23:06:15', '2025-06-21 23:06:15');

-- --------------------------------------------------------

--
-- بنية الجدول `alumni_images`
--

CREATE TABLE `alumni_images` (
  `id` int(11) NOT NULL,
  `alumni_id` int(11) NOT NULL COMMENT 'معرف الخريج',
  `image_path` varchar(255) NOT NULL COMMENT 'مسار الصورة',
  `caption_ar` varchar(255) DEFAULT NULL COMMENT 'وصف الصورة بالعربية',
  `caption_en` varchar(255) DEFAULT NULL COMMENT 'وصف الصورة بالإنجليزية',
  `sort_order` int(11) DEFAULT 0 COMMENT 'ترتيب العرض',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `alumni_images`
--

INSERT INTO `alumni_images` (`id`, `alumni_id`, `image_path`, `caption_ar`, `caption_en`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 1, '/image/1.jpg', 'محمد أثناء عمله في مشروع برمجي', 'Mohammed while working on a programming project', 1, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(2, 1, '/image/2.jpg', 'محمد يقدم عرضًا في مؤتمر تقني', 'Mohammed giving a presentation at a tech conference', 2, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(3, 1, '/image/a1.jpg', 'محمد مع فريق العمل في شركة جوجل', 'Mohammed with the team at Google', 3, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(4, 2, '/image/a2.jpg', 'نور أثناء حفل التخرج', 'Noor during the graduation ceremony', 1, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(5, 2, '/image/a3.jpg', 'نور تقدم عرضًا تسويقيًا', 'Noor presenting a marketing presentation', 2, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(6, 2, '/image/1.jpg', 'نور مع فريق التسويق في شركة أمازون', 'Noor with the marketing team at Amazon', 3, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(7, 3, '/image/2.jpg', 'عبدالله في المختبر الطبي', 'Abdullah in the medical laboratory', 1, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(8, 3, '/image/a1.jpg', 'عبدالله أثناء البعثة الطبية التطوعية', 'Abdullah during the voluntary medical mission', 2, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(9, 3, '/image/a2.jpg', 'عبدالله يستلم جائزة التميز الطبي', 'Abdullah receiving the medical excellence award', 3, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(10, 4, '/image/a3.jpg', 'سارة أثناء مسابقة البرمجة', 'Sara during the programming competition', 1, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(11, 4, '/image/1.jpg', 'سارة تقدم ورشة عمل عن علوم البيانات', 'Sara presenting a workshop on data science', 2, '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(12, 4, '/image/2.jpg', 'سارة مع فريق علماء البيانات في مايكروسوفت', 'Sara with the data science team at Microsoft', 3, '2025-06-21 23:06:15', '2025-06-21 23:06:15');

-- --------------------------------------------------------

--
-- بنية الجدول `alumni_majors`
--

CREATE TABLE `alumni_majors` (
  `id` int(11) NOT NULL,
  `college_id` int(11) DEFAULT NULL,
  `name_ar` varchar(255) NOT NULL COMMENT 'اسم التخصص باللغة العربية',
  `name_en` varchar(255) NOT NULL COMMENT 'اسم التخصص باللغة الإنجليزية',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `alumni_majors`
--

INSERT INTO `alumni_majors` (`id`, `college_id`, `name_ar`, `name_en`, `created_at`, `updated_at`) VALUES
(1, 1, 'هندسة البرمجيات', 'Software Engineering', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(2, 4, 'علوم الحاسب', 'Computer Science', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(3, 2, 'إدارة أعمال', 'Business Administration', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(4, 3, 'طب بشري', 'Medicine', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(5, 1, 'هندسة كهربائية', 'Electrical Engineering', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(6, 2, 'تسويق', 'Marketing', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(7, 4, 'أمن المعلومات', 'Information Security', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(8, 3, 'طب الأسنان', 'Dentistry', '2025-06-21 23:06:15', '2025-06-21 23:06:15');

-- --------------------------------------------------------

--
-- بنية الجدول `alumni_settings`
--

CREATE TABLE `alumni_settings` (
  `id` int(11) NOT NULL,
  `section_title_ar` varchar(255) NOT NULL DEFAULT 'قصص نجاح خريجينا' COMMENT 'عنوان القسم بالعربية',
  `section_title_en` varchar(255) NOT NULL DEFAULT 'Our Alumni Success Stories' COMMENT 'عنوان القسم بالإنجليزية',
  `section_subtitle_ar` text DEFAULT NULL COMMENT 'العنوان الفرعي للقسم بالعربية',
  `section_subtitle_en` text DEFAULT NULL COMMENT 'العنوان الفرعي للقسم بالإنجليزية',
  `stories_per_page` int(11) DEFAULT 12 COMMENT 'عدد القصص في الصفحة الواحدة',
  `featured_count` int(11) DEFAULT 4 COMMENT 'عدد القصص المميزة في الصفحة الرئيسية',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `alumni_settings`
--

INSERT INTO `alumni_settings` (`id`, `section_title_ar`, `section_title_en`, `section_subtitle_ar`, `section_subtitle_en`, `stories_per_page`, `featured_count`, `updated_at`) VALUES
(1, 'قصص نجاح خريجينا', 'Our Alumni Success Stories', 'تعرف على قصص ملهمة من خريجي جامعتنا الذين يصنعون الفرق في العالم', 'Discover inspiring stories from our university graduates who are making a difference in the world', 12, 4, '2025-06-21 23:00:39');

-- --------------------------------------------------------

--
-- بنية الجدول `alumni_stories`
--

CREATE TABLE `alumni_stories` (
  `id` int(11) NOT NULL,
  `alumni_id` int(11) NOT NULL COMMENT 'معرف الخريج',
  `summary_ar` text NOT NULL COMMENT 'ملخص القصة باللغة العربية',
  `summary_en` text NOT NULL COMMENT 'ملخص القصة باللغة الإنجليزية',
  `story_ar` text NOT NULL COMMENT 'القصة الكاملة باللغة العربية',
  `story_en` text NOT NULL COMMENT 'القصة الكاملة باللغة الإنجليزية',
  `views` int(11) DEFAULT 0 COMMENT 'عدد المشاهدات',
  `slug_ar` varchar(255) NOT NULL COMMENT 'الرابط المختصر باللغة العربية',
  `slug_en` varchar(255) NOT NULL COMMENT 'الرابط المختصر باللغة الإنجليزية',
  `published_at` timestamp NULL DEFAULT NULL COMMENT 'تاريخ النشر',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- إرجاع أو استيراد بيانات الجدول `alumni_stories`
--

INSERT INTO `alumni_stories` (`id`, `alumni_id`, `summary_ar`, `summary_en`, `story_ar`, `story_en`, `views`, `slug_ar`, `slug_en`, `published_at`, `created_at`, `updated_at`) VALUES
(1, 1, 'بدأت رحلتي بفكرة بسيطة في الجامعة وانتهت بوظيفة في إحدى أكبر شركات التقنية العالمية.', 'My journey started with a simple idea at the university and ended with a job at one of the world\'s largest tech companies.', 'عندما بدأت رحلتي الدراسية في جامعة الريادة، لم أكن أتخيل مدى التأثير الذي ستتركه على مساري المهني. بدأت الدراسة وكانت لدي الكثير من التساؤلات والشكوك حول المستقبل.\r\n\r\nخلال سنوات الدراسة، تعلمت الكثير من المهارات الأساسية التي ساعدتني في بناء مسيرتي المهنية. كان للأساتذة دور كبير في توجيهي نحو المسار الصحيح، وكانت البيئة الأكاديمية محفزة للإبداع والتفكير النقدي.\r\n\r\nبعد التخرج، واجهت تحديات كثيرة في سوق العمل، لكن التعليم الذي تلقيته في الجامعة منحني الأساس القوي للتغلب على هذه التحديات. بدأت العمل في شركة محلية صغيرة، ثم انتقلت بعد ذلك للعمل في شركات عالمية.\r\n\r\nاليوم، أنا فخور بكوني خريج جامعة الريادة، وسعيد بالفرصة التي أتيحت لي لمشاركة قصتي مع الطلاب الحاليين والخريجين الجدد. أنصح جميع الطلاب بالاستفادة القصوى من فترة الدراسة، والمشاركة في الأنشطة اللاصفية، وبناء شبكة علاقات قوية مع الزملاء والأساتذة.', 'When I started my academic journey at Alryada University, I couldn\'t imagine the impact it would have on my career path. I began my studies with many questions and doubts about the future.\r\n\r\nDuring my university years, I learned many essential skills that helped me build my professional career. The professors played a significant role in guiding me towards the right path, and the academic environment was stimulating for creativity and critical thinking.\r\n\r\nAfter graduation, I faced many challenges in the job market, but the education I received at the university gave me a strong foundation to overcome these challenges. I started working at a small local company, then moved on to work for global companies.\r\n\r\nToday, I am proud to be a graduate of Alryada University, and I\'m happy to have the opportunity to share my story with current students and new graduates. I advise all students to make the most of their study period, participate in extracurricular activities, and build a strong network with colleagues and professors.', 1252, 'محمد-أحمد-قصة-نجاح', 'mohammed-ahmed-success-story', '2023-06-15 05:30:00', '2025-06-21 23:06:15', '2025-06-25 01:03:29'),
(2, 2, 'التحديات التي واجهتها في الدراسة كانت الخطوة الأولى نحو النجاح في مجال التسويق العالمي.', 'The challenges I faced during my studies were the first step towards success in the field of global marketing.', 'كانت رحلتي في كلية إدارة الأعمال مليئة بالتحديات والفرص. في البداية، واجهت صعوبة في فهم بعض المفاهيم المعقدة في التسويق، لكن بفضل دعم الأساتذة والموارد المتاحة في الجامعة، تمكنت من تجاوز هذه الصعوبات.\r\n\r\nخلال السنة الثالثة، شاركت في مسابقة لخطط التسويق على مستوى الجامعات، وحصل فريقنا على المركز الأول. كانت هذه التجربة نقطة تحول في مسيرتي، حيث منحتني الثقة والخبرة العملية التي احتجتها.\r\n\r\nبعد التخرج، حصلت على فرصة للتدريب في شركة أمازون، وبعد ستة أشهر، عُرضت علي وظيفة دائمة. اليوم، أعمل كمديرة تسويق، وأقود فريقًا دوليًا، وأشارك في وضع استراتيجيات التسويق العالمية للشركة.\r\n\r\nأنصح طلاب إدارة الأعمال بالاستفادة من جميع الفرص المتاحة في الجامعة، والمشاركة في المسابقات والفعاليات، وبناء شبكة علاقات مهنية قوية، فهذه هي مفاتيح النجاح في عالم الأعمال اليوم.', 'My journey in the College of Business Administration was full of challenges and opportunities. At first, I had difficulty understanding some complex marketing concepts, but thanks to the support of professors and resources available at the university, I was able to overcome these difficulties.\r\n\r\nDuring my third year, I participated in a marketing plan competition at the university level, and our team won first place. This experience was a turning point in my career, giving me the confidence and practical experience I needed.\r\n\r\nAfter graduation, I got an internship opportunity at Amazon, and after six months, I was offered a permanent position. Today, I work as a Marketing Manager, leading an international team, and participating in setting global marketing strategies for the company.\r\n\r\nI advise business administration students to take advantage of all the opportunities available at the university, participate in competitions and events, and build a strong professional network, as these are the keys to success in today\'s business world.', 980, 'نور-الهدى-علي-قصة-نجاح', 'noor-al-huda-ali-success-story', '2023-07-20 07:15:00', '2025-06-21 23:06:15', '2025-06-21 23:06:15'),
(3, 3, 'الدعم الذي تلقيته من الجامعة مكنني من تحقيق حلمي في أن أصبح طبيبًا ناجحًا يساعد الآخرين.', 'The support I received from the university enabled me to achieve my dream of becoming a successful doctor helping others.', 'منذ الصغر، كان حلمي أن أصبح طبيبًا. عندما التحقت بكلية الطب في جامعة الريادة، أدركت أن الطريق سيكون طويلاً وصعبًا، لكن شغفي بالطب كان أقوى من أي تحدٍ.\r\n\r\nخلال سنوات الدراسة، استفدت كثيرًا من المختبرات المتطورة والمستشفى التعليمي التابع للجامعة. كان الأساتذة والأطباء المشرفون مصدر إلهام لي، وقدموا لي الدعم والتوجيه الذي احتجته.\r\n\r\nبعد التخرج، أكملت فترة الامتياز في مستشفى التخصصي، ثم حصلت على الزمالة في طب الباطنة. اليوم، أعمل كطبيب استشاري، وأسعى جاهدًا لتقديم أفضل رعاية ممكنة لمرضاي.\r\n\r\nأشعر بالامتنان العميق للتعليم الذي تلقيته في جامعة الريادة، وأحاول رد الجميل من خلال المشاركة في برامج التدريب والتوجيه للطلاب الجدد. رسالتي لطلاب الطب هي: تمسكوا بشغفكم، واستمروا في التعلم، وضعوا المريض دائمًا في المقام الأول.', 'Since childhood, my dream was to become a doctor. When I joined the College of Medicine at Alryada University, I realized that the road would be long and difficult, but my passion for medicine was stronger than any challenge.\r\n\r\nDuring my years of study, I benefited greatly from the advanced laboratories and the university teaching hospital. The professors and supervising doctors were a source of inspiration to me, and they provided me with the support and guidance I needed.\r\n\r\nAfter graduation, I completed my internship at the Specialized Hospital, then obtained a fellowship in internal medicine. Today, I work as a consultant physician, and I strive to provide the best possible care to my patients.\r\n\r\nI feel deep gratitude for the education I received at Alryada University, and I try to give back by participating in training and mentoring programs for new students. My message to medical students is: hold on to your passion, continue learning, and always put the patient first.', 1141, 'عبدالله-محمد-قصة-نجاح', 'abdullah-mohammed-success-story', '2023-08-05 11:45:00', '2025-06-21 23:06:15', '2025-07-06 15:18:59'),
(4, 4, 'الشغف بالرياضيات والتعلم المستمر قادني إلى مجال علوم البيانات وتحليل البيانات الضخمة.', 'Passion for mathematics and continuous learning led me to the field of data science and big data analysis.', 'منذ المرحلة الثانوية، كنت شغوفة بالرياضيات والحاسوب. عندما حان وقت اختيار التخصص الجامعي، لم أتردد في اختيار علوم الحاسب في جامعة الريادة.\r\n\r\nخلال دراستي، اكتشفت مجال علوم البيانات، وأدركت أنه يجمع بين شغفي بالرياضيات والبرمجة. قررت التخصص في هذا المجال، وشاركت في العديد من المشاريع البحثية والتطبيقية.\r\n\r\nبعد التخرج، التحقت ببرنامج تدريبي في شركة مايكروسوفت، وعملت على مشاريع تحليل البيانات الضخمة. بعد عام، حصلت على وظيفة دائمة كعالمة بيانات، وأعمل الآن على تطوير خوارزميات التعلم الآلي وتحليل البيانات لتحسين منتجات الشركة.\r\n\r\nأنصح الطلاب المهتمين بمجال علوم البيانات بالتركيز على أساسيات الرياضيات والإحصاء، وتطوير مهارات البرمجة، والمشاركة في المشاريع العملية. المجال متطور باستمرار، لذا فإن التعلم المستمر هو مفتاح النجاح.', 'Since high school, I was passionate about mathematics and computers. When it was time to choose a university major, I didn\'t hesitate to choose Computer Science at Alryada University.\r\n\r\nDuring my studies, I discovered the field of data science, and realized that it combines my passion for mathematics and programming. I decided to specialize in this field, and participated in many research and applied projects.\r\n\r\nAfter graduation, I joined a training program at Microsoft, and worked on big data analysis projects. After a year, I got a permanent position as a Data Scientist, and now I work on developing machine learning algorithms and data analysis to improve the company\'s products.\r\n\r\nI advise students interested in data science to focus on the fundamentals of mathematics and statistics, develop programming skills, and participate in practical projects. The field is constantly evolving, so continuous learning is the key to success.', 861, 'سارة-خالد-قصة-نجاح', 'sara-khalid-success-story', '2023-09-10 06:20:00', '2025-06-21 23:06:15', '2025-06-24 15:37:00');

-- --------------------------------------------------------

--
-- بنية الجدول `application_steps`
--

CREATE TABLE `application_steps` (
  `id` int(11) NOT NULL,
  `step_order` int(11) NOT NULL,
  `title_ar` varchar(255) NOT NULL,
  `title_en` varchar(255) NOT NULL,
  `description_ar` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `application_steps`
--

INSERT INTO `application_steps` (`id`, `step_order`, `title_ar`, `title_en`, `description_ar`, `description_en`, `icon`) VALUES
(1, 1, 'تعبئة نموذج طلب الالتحاق', 'Fill out the application form', 'قم بتعبئة نموذج طلب الالتحاق عبر الإنترنت وتقديم المعلومات الشخصية والأكاديمية المطلوبة', 'Complete the online application form and provide the required personal and academic information', 'FaWpforms'),
(2, 2, 'رفع المستندات المطلوبة', 'Upload required documents', 'قم برفع نسخ إلكترونية من المستندات المطلوبة مثل شهادة الثانوية العامة وصورة الهوية', 'Upload electronic copies of required documents such as high school certificate and ID', 'FaFileUpload'),
(3, 3, 'دفع رسوم التسجيل', 'Pay registration fees', 'قم بدفع رسوم التسجيل عبر بوابة الدفع الإلكتروني أو في مقر الجامعة', 'Pay registration fees through the electronic payment gateway or at the university headquarters', 'FaCreditCard'),
(4, 4, 'انتظار نتيجة القبول', 'Wait for admission result', 'انتظر إشعار نتيجة القبول عبر البريد الإلكتروني أو رسالة نصية (عادة خلال 3-5 أيام عمل)', 'Wait for admission result notification via email or text message (usually within 3-5 business days)', 'FaHourglassHalf'),
(5, 5, 'استكمال إجراءات التسجيل النهائي', 'Complete final registration procedures', 'بعد قبولك، قم باستكمال إجراءات التسجيل النهائي وحضور اليوم التعريفي للطلاب الجدد', 'After acceptance, complete final registration procedures and attend the orientation day for new students', 'FaUserGraduate');

-- --------------------------------------------------------

--
-- بنية الجدول `colleges`
--

CREATE TABLE `colleges` (
  `id` int(11) NOT NULL,
  `hero_title` varchar(255) NOT NULL,
  `hero_title_en` varchar(255) DEFAULT NULL,
  `hero_subtitle` varchar(255) DEFAULT NULL,
  `hero_subtitle_en` varchar(255) DEFAULT NULL,
  `hero_image_url` varchar(255) DEFAULT NULL,
  `about_content` text DEFAULT NULL,
  `about_content_en` text DEFAULT NULL,
  `dean_name` varchar(255) DEFAULT NULL,
  `dean_name_en` varchar(255) DEFAULT NULL,
  `dean_title` varchar(255) DEFAULT NULL,
  `dean_title_en` varchar(255) DEFAULT NULL,
  `dean_image_url` varchar(255) DEFAULT NULL,
  `dean_message` text DEFAULT NULL,
  `dean_message_en` text DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `colleges`
--

INSERT INTO `colleges` (`id`, `hero_title`, `hero_title_en`, `hero_subtitle`, `hero_subtitle_en`, `hero_image_url`, `about_content`, `about_content_en`, `dean_name`, `dean_name_en`, `dean_title`, `dean_title_en`, `dean_image_url`, `dean_message`, `dean_message_en`, `updated_at`) VALUES
(1, 'كلية الهندسة وتقنية المعومات', 'College of Engineering', 'نحو مستقبل هندسي افضل', 'Towards a better engineering future', '/colloge/3.jpg', 'تأسست كلية الهندسة في جامعة الريادة لتكون منارة للتعليم الهندسي المتميز. نسعى لتخريج مهندسين أكفاء قادرين على المساهمة في تطوير القطاع الهندسي والتكنولوجي في المجتمع.', 'The College of Engineering at Al-Riyada University was established to be a beacon of distinguished engineering education. We aim to graduate competent engineers capable of contributing to the development of the engineering and technological sector in society.', 'أ.د. احمد عبدة', 'Prof. Ahmed Abdu', 'عميد كلية الهندسة', 'Dean of the College of Engineering', '/deans/1737840705873.jpg', 'نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي.', 'Experimental Text Experimental Text Experimental Text Experimental Text Experimental Text Experimental Text Experimental Text Experimental Text Experimental Text Experimental Text Experimental Text Experimental Text  ', '2025-07-08 03:01:01'),
(2, 'كلية الطب', 'College of Medicine', 'نحو مستقبل صحي أفضل', 'Towards a better health future', '/colloge/1.jpg', '\r\nتأسست كلية الطب في جامعة الريادة بهدف تقديم تعليم طبي متميز وفق أحدث المعايير العالمية. نحن نسعى لتخريج أطباء مؤهلين قادرين على خدمة المجتمع وتطوير القطاع الصحي.', 'The College of Medicine at Al-Riyada University was established to provide distinguished medical education according to the latest global standards. We aim to graduate qualified doctors capable of serving the community and developing the health sector.', 'أ.د. فاطمة', 'Prof. Fatima', 'عميد كلية الطب', 'Dean of the College of Medicine', '/image/1.jpg', 'نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي.', 'Experimental Text Experimental Text Experimental Text Experimental Text Experimental Text Experimental Text Experimental Text Experimental Text Experimental Text Experimental Text Experimental Text Experimental Text  ', '2025-07-09 13:20:18'),
(3, 'كلية العلوم الإدارية', 'College of Administrative Sciences', 'نعد قادة المستقبل في مجال الأعمال والإدارة', 'Preparing future leaders in business and management', '/colloge/4.jpg', 'تأسست كلية العلوم الإدارية عام 2005 لتكون مركزاً متميزاً للتعليم والبحث في مجالات إدارة الأعمال، المالية، التسويق، والموارد البشرية. تهدف الكلية إلى إعداد جيل من القادة والمديرين المؤهلين للمنافسة في سوق العمل المحلي والعالمي.\r\n\r\nتتبنى الكلية أحدث استراتيجيات التعليم وتوفر برامج دراسية متنوعة تواكب احتياجات سوق العمل وتستجيب للتحديات المعاصرة في عالم الأعمال. يتم التركيز على تطوير مهارات الطلاب في التفكير النقدي، الابتكار، والعمل الجماعي، إلى جانب المعرفة النظرية والتطبيقية.', 'The College of Administrative Sciences was established in 2005 to be a distinguished center for education and research in the fields of business administration, finance, marketing, and human resources. The college aims to prepare a generation of leaders and managers qualified to compete in the local and global labor market.', 'أ.د. محمد السعيد', 'Prof. Mohamed Saeed', 'عميد كلية العلوم الإدارية', 'Dean of the College of Administrative Sciences', '/image/1.jpg', 'نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي نص تجريبي.', 'Experimental Text Experimental Text Experimental Text Experimental Text Experimental Text Experimental Text Experimental Text Experimental Text Experimental Text Experimental Text Experimental Text Experimental Text  ', '2025-07-05 23:05:13');

-- --------------------------------------------------------

--
-- بنية الجدول `college_goals`
--

CREATE TABLE `college_goals` (
  `id` int(11) NOT NULL,
  `college_id` int(11) NOT NULL,
  `goal_title` varchar(255) NOT NULL,
  `goal_title_en` varchar(255) DEFAULT NULL,
  `goal_description` text DEFAULT NULL,
  `goal_description_en` text DEFAULT NULL,
  `goal_order` int(11) DEFAULT 0,
  `icon` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `college_goals`
--

INSERT INTO `college_goals` (`id`, `college_id`, `goal_title`, `goal_title_en`, `goal_description`, `goal_description_en`, `goal_order`, `icon`, `created_at`, `updated_at`) VALUES
(2, 1, 'عزيز البحث العلمي', 'Enhance Scientific Research', 'دعم وتشجيع البحث العلمي وربطه باحتياجات المجتمع والصناعة', 'Supporting and encouraging scientific research and linking it to the needs of society and industry', 2, 'microscope', '2025-07-05 18:01:52', '2025-07-08 16:17:06'),
(3, 1, 'التطوير المهني', 'Professional Development', 'تطوير المهارات المهنية للطلاب وأعضاء هيئة التدريس', 'Developing professional skills for students and faculty members', 3, 'users', '2025-07-05 18:01:52', '2025-07-05 18:01:52'),
(4, 2, 'التميز الأكاديمي', 'Academic Excellence', 'تحقيق التميز في التعليم الطبي وفق المعايير العالمية', 'Achieving excellence in medical education according to international standards', 1, 'award', '2025-07-05 18:01:52', '2025-07-05 18:01:52'),
(5, 2, 'البحث والابتكار', 'Research and Innovation', 'تعزيز البحث العلمي والابتكار في المجال الطبي', 'Promoting scientific research and innovation in the medical field', 2, 'lab', '2025-07-05 18:01:52', '2025-07-05 18:01:52'),
(6, 2, 'خدمة المجتمع', 'Community Service', 'المساهمة في تحسين الصحة العامة وتقديم الخدمات الطبية للمجتمع', 'Contributing to improving public health and providing medical services to the community', 3, 'heart', '2025-07-05 18:01:52', '2025-07-05 18:01:52'),
(7, 3, 'التعليم المتميز', 'Distinguished Education', 'تقديم برامج تعليمية متميزة تلبي احتياجات سوق العمل', 'Providing distinguished educational programs that meet labor market needs', 1, 'graduation-cap', '2025-07-05 18:01:52', '2025-07-05 18:01:52'),
(8, 3, 'الشراكات الاستراتيجية', 'Strategic Partnerships', 'بناء شراكات استراتيجية مع القطاع الخاص والمؤسسات الأكاديمية', 'Building strategic partnerships with the private sector and academic institutions', 2, 'handshake', '2025-07-05 18:01:52', '2025-07-05 18:01:52'),
(9, 3, 'ريادة الأعمال', 'Entrepreneurship', 'تعزيز ثقافة ريادة الأعمال والابتكار لدى الطلاب', 'Promoting entrepreneurship and innovation culture among students', 3, 'lightbulb', '2025-07-05 18:01:52', '2025-07-05 18:01:52');

-- --------------------------------------------------------

--
-- بنية الجدول `college_vision_mission`
--

CREATE TABLE `college_vision_mission` (
  `id` int(11) NOT NULL,
  `college_id` int(11) NOT NULL,
  `vision` text DEFAULT NULL,
  `vision_en` text DEFAULT NULL,
  `mission` text DEFAULT NULL,
  `mission_en` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `college_vision_mission`
--

INSERT INTO `college_vision_mission` (`id`, `college_id`, `vision`, `vision_en`, `mission`, `mission_en`, `created_at`, `updated_at`) VALUES
(1, 1, 'أن نكون كلية رائدة في التعليم الهندسي والبحث العلمي على المستوى المحلي والإقليمي', 'To be a leading college in engineering education and scientific research at the local and regional levels', 'تقديم تعليم هندسي متميز وإجراء بحوث علمية مبتكرة تخدم المجتمع وتلبي احتياجات سوق العمل', 'Providing distinguished engineering education and conducting innovative scientific research that serves society and meets labor market needs', '2025-07-05 18:01:52', '2025-07-05 18:01:52'),
(2, 2, 'أن نكون مركزاً متميزاً في التعليم الطبي والبحث العلمي والرعاية الصحية', 'To be a distinguished center in medical education, scientific research and healthcare', 'إعداد أطباء مؤهلين قادرين على تقديم رعاية صحية عالية الجودة وإجراء بحوث طبية متقدمة', 'Preparing qualified doctors capable of providing high-quality healthcare and conducting advanced medical research', '2025-07-05 18:01:52', '2025-07-05 18:01:52'),
(3, 3, 'أن نكون كلية رائدة في تعليم وبحوث العلوم الإدارية على المستوى الوطني والإقليمي', 'To be a leading college in administrative sciences education and research at the national and regional levels', 'إعداد قادة مؤهلين في مجال الأعمال والإدارة قادرين على المنافسة في سوق العمل وخدمة المجتمع', 'Preparing qualified leaders in business and management capable of competing in the labor market and serving society', '2025-07-05 18:01:52', '2025-07-05 18:01:52');

-- --------------------------------------------------------

--
-- بنية الجدول `contact_info`
--

CREATE TABLE `contact_info` (
  `contact_id` int(11) NOT NULL,
  `section_id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `value` text NOT NULL,
  `icon` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `contact_info`
--

INSERT INTO `contact_info` (`contact_id`, `section_id`, `type`, `value`, `icon`) VALUES
(40, 2, 'address', 'صنعاء - شارع الستين - جوار جامعة العلو', 'FaMapMarkerAlt'),
(41, 2, 'phone', '+967 1 234 5678', 'FaPhone'),
(42, 2, 'email', '   Alryada@gmail.com', 'FaEnvelope');

-- --------------------------------------------------------

--
-- بنية الجدول `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `name_ar` varchar(255) NOT NULL,
  `name_en` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `semester` int(11) DEFAULT NULL,
  `is_elective` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `courses`
--

INSERT INTO `courses` (`id`, `program_id`, `name_ar`, `name_en`, `description`, `semester`, `is_elective`, `created_at`, `updated_at`) VALUES
(1, 1, 'أساسيات البرمجة', 'Programming Fundamentals', NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-29 04:01:35'),
(2, 1, 'هياكل البيانات والخوارزميات', 'Data Structures and Algorithms', NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-29 04:01:25'),
(3, 1, 'قواعد البيانات', 'Database Systems', NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-29 04:01:17'),
(4, 1, 'شبكات الحاسوب', 'Computer Networks', NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-29 04:01:09'),
(5, 1, 'تطوير تطبيقات الويب', 'Web Application Development', NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-29 04:00:57'),
(6, 1, 'تطوير تطبيقات الهاتف المحمول', NULL, NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-29 04:00:49'),
(7, 1, 'أمن المعلومات', NULL, NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-29 04:00:40'),
(8, 1, 'الذكاء الاصطناعي', NULL, NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-29 04:00:33'),
(9, 1, 'تحليل وتصميم النظم', NULL, NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-29 04:00:22'),
(10, 1, 'الحوسبة السحابية', NULL, NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-29 04:00:05'),
(11, 2, 'مبادئ التصميم المعماري', 'Principles of Architectural Design', NULL, NULL, 0, '2025-06-03 11:43:54', '2025-06-21 01:42:07'),
(12, 2, 'الرسم المعماري', 'Architectural Drawing', NULL, NULL, 0, '2025-06-03 11:43:54', '2025-06-21 01:42:07'),
(13, 2, 'تاريخ العمارة', 'History of Architecture', NULL, NULL, 0, '2025-06-03 11:43:54', '2025-06-21 01:42:07'),
(14, 2, 'نظريات العمارة', NULL, NULL, NULL, 0, '2025-06-03 11:43:54', '2025-06-03 11:43:54'),
(15, 2, 'تصميم المباني السكنية', NULL, NULL, NULL, 0, '2025-06-03 11:43:54', '2025-06-03 11:43:54'),
(16, 2, 'تصميم المباني التجارية', NULL, NULL, NULL, 0, '2025-06-03 11:43:54', '2025-06-03 11:43:54'),
(17, 2, 'العمارة المستدامة', NULL, NULL, NULL, 0, '2025-06-03 11:43:54', '2025-06-03 11:43:54'),
(18, 2, 'تخطيط المدن', NULL, NULL, NULL, 0, '2025-06-03 11:43:54', '2025-06-03 11:43:54'),
(19, 2, 'تقنيات البناء', NULL, NULL, NULL, 0, '2025-06-03 11:43:54', '2025-06-03 11:43:54'),
(20, 2, 'التصميم بمساعدة الحاسوب', NULL, NULL, NULL, 0, '2025-06-03 11:43:54', '2025-06-03 11:43:54'),
(21, 3, 'مبادئ المحاسبة المالية (1)', 'Principles of Financial Accounting (1)', 'مقدمة للمفاهيم الأساسية للمحاسبة المالية وتسجيل العمليات.', 1, 0, '2025-06-04 14:40:31', '2025-06-04 14:40:31'),
(22, 3, 'مبادئ المحاسبة المالية (2)', 'Principles of Financial Accounting (2)', 'استكمال لمبادئ المحاسبة المالية مع التركيز على إعداد القوائم المالية.', 2, 0, '2025-06-04 14:40:31', '2025-06-04 14:40:31'),
(23, 3, 'محاسبة التكاليف', 'Cost Accounting', 'مفاهيم وأساليب محاسبة التكاليف في الشركات الصناعية والخدمية.', 3, 0, '2025-06-04 14:40:31', '2025-06-04 14:40:31'),
(24, 3, 'المحاسبة المتوسطة (1)', 'Intermediate Accounting (1)', 'دراسة متعمقة للمعايير المحاسبية المتعلقة بالأصول والالتزامات.', 3, 0, '2025-06-04 14:40:31', '2025-06-04 14:40:31'),
(25, 3, 'المحاسبة المتوسطة (2)', 'Intermediate Accounting (2)', 'استكمال لدراسة المعايير المحاسبية المتعلقة بحقوق الملكية والإيرادات والمصروفات.', 4, 0, '2025-06-04 14:40:31', '2025-06-04 14:40:31'),
(26, 3, 'نظم المعلومات المحاسبية', 'Accounting Information Systems', 'تصميم وتطبيق نظم المعلومات المحاسبية ودورها في اتخاذ القرارات.', 4, 0, '2025-06-04 14:40:31', '2025-06-04 14:40:31'),
(27, 3, 'المراجعة والتدقيق', 'Auditing', 'مبادئ وإجراءات المراجعة الداخلية والخارجية للقوائم المالية.', 5, 0, '2025-06-04 14:40:31', '2025-06-04 14:40:31'),
(28, 3, 'المحاسبة الضريبية', 'Tax Accounting', 'القوانين واللوائح الضريبية وتطبيقاتها المحاسبية.', 5, 0, '2025-06-04 14:40:31', '2025-06-04 14:40:31'),
(29, 3, 'المحاسبة الإدارية المتقدمة', 'Advanced Management Accounting', 'استخدام المعلومات المحاسبية في التخطيط والرقابة واتخاذ القرارات الإدارية.', 6, 0, '2025-06-04 14:40:31', '2025-06-04 14:40:31'),
(30, 3, 'معايير المحاسبة الدولية', 'International Accounting Standards', 'دراسة المعايير الدولية لإعداد التقارير المالية (IFRS).', 6, 0, '2025-06-04 14:40:31', '2025-06-04 14:40:31'),
(31, 4, 'مبادئ الإدارة', 'Principles of Management', NULL, NULL, 0, '2025-06-04 14:57:16', '2025-06-04 14:57:16'),
(32, 4, 'السلوك التنظيمي', 'Organizational Behavior', NULL, NULL, 0, '2025-06-04 14:57:16', '2025-06-04 14:57:16'),
(33, 4, 'إدارة الموارد البشرية', 'Human Resource Management', NULL, NULL, 0, '2025-06-04 14:57:16', '2025-06-04 14:57:16'),
(34, 4, 'التسويق', 'Marketing', NULL, NULL, 0, '2025-06-04 14:57:16', '2025-06-04 14:57:16'),
(35, 4, 'المحاسبة المالية', 'Financial Accounting', NULL, NULL, 0, '2025-06-04 14:57:16', '2025-06-04 14:57:16'),
(36, 4, 'ريادة الأعمال', 'Entrepreneurship', NULL, NULL, 0, '2025-06-04 14:57:16', '2025-06-04 14:57:16'),
(37, 4, 'الإدارة الاستراتيجية', 'Strategic Management', NULL, NULL, 0, '2025-06-04 14:57:16', '2025-06-04 14:57:16'),
(38, 4, 'إدارة العمليات', 'Operations Management', NULL, NULL, 0, '2025-06-04 14:57:16', '2025-06-04 14:57:16'),
(39, 4, 'القانون التجاري', 'Business Law', NULL, NULL, 0, '2025-06-04 14:57:16', '2025-06-04 14:57:16'),
(40, 4, 'نظم المعلومات الإدارية', 'Management Information Systems', NULL, NULL, 0, '2025-06-04 14:57:16', '2025-06-04 14:57:16'),
(41, 5, 'مبادئ التمويل', 'Principles of Finance', NULL, NULL, 0, '2025-06-04 14:58:35', '2025-06-04 14:58:35'),
(42, 5, 'الأسواق المالية', 'Financial Markets', NULL, NULL, 0, '2025-06-04 14:58:35', '2025-06-04 14:58:35'),
(43, 5, 'إدارة المحافظ الاستثمارية', 'Investment Portfolio Management', NULL, NULL, 0, '2025-06-04 14:58:35', '2025-06-04 14:58:35'),
(44, 5, 'التحليل المالي', 'Financial Analysis', NULL, NULL, 0, '2025-06-04 14:58:35', '2025-06-04 14:58:35'),
(45, 5, 'إدارة المخاطر المالية', 'Financial Risk Management', NULL, NULL, 0, '2025-06-04 14:58:35', '2025-06-04 14:58:35'),
(46, 5, 'التمويل الدولي', 'International Finance', NULL, NULL, 0, '2025-06-04 14:58:35', '2025-06-04 14:58:35'),
(47, 5, 'تقييم المشاريع الاستثمارية', 'Investment Project Appraisal', NULL, NULL, 0, '2025-06-04 14:58:35', '2025-06-04 14:58:35'),
(48, 5, 'المشتقات المالية', 'Financial Derivatives', NULL, NULL, 0, '2025-06-04 14:58:35', '2025-06-04 14:58:35'),
(49, 5, 'التمويل الإسلامي', 'Islamic Finance', NULL, NULL, 0, '2025-06-04 14:58:35', '2025-06-04 14:58:35'),
(50, 5, 'إدارة الثروات', 'Wealth Management', NULL, NULL, 0, '2025-06-04 14:58:35', '2025-06-04 14:58:35'),
(51, 6, 'مبادئ التسويق', 'Principles of Marketing', NULL, NULL, 0, '2025-06-04 15:00:17', '2025-06-04 15:00:17'),
(52, 6, 'سلوك المستهلك', 'Consumer Behavior', NULL, NULL, 0, '2025-06-04 15:00:17', '2025-06-04 15:00:17'),
(53, 6, 'بحوث التسويق', 'Marketing Research', NULL, NULL, 0, '2025-06-04 15:00:17', '2025-06-04 15:00:17'),
(54, 6, 'التسويق الرقمي', 'Digital Marketing', NULL, NULL, 0, '2025-06-04 15:00:17', '2025-06-04 15:00:17'),
(55, 6, 'إدارة العلامات التجارية', 'Brand Management', NULL, NULL, 0, '2025-06-04 15:00:17', '2025-06-04 15:00:17'),
(56, 6, 'استراتيجيات التسويق', 'Marketing Strategies', NULL, NULL, 0, '2025-06-04 15:00:17', '2025-06-04 15:00:17'),
(57, 6, 'الاتصالات التسويقية المتكاملة', 'Integrated Marketing Communications', NULL, NULL, 0, '2025-06-04 15:00:17', '2025-06-04 15:00:17'),
(58, 6, 'التسويق الدولي', 'International Marketing', NULL, NULL, 0, '2025-06-04 15:00:17', '2025-06-04 15:00:17'),
(59, 6, 'تسويق الخدمات', 'Services Marketing', NULL, NULL, 0, '2025-06-04 15:00:17', '2025-06-04 15:00:17'),
(60, 6, 'التسويق عبر وسائل التواصل الاجتماعي', 'Social Media Marketing', NULL, NULL, 0, '2025-06-04 15:00:17', '2025-06-04 15:00:17'),
(61, 7, 'تشريح الأسنان', 'Dental Anatomy', NULL, NULL, 0, '2025-06-04 15:02:00', '2025-06-04 15:02:00'),
(62, 7, 'علم الأنسجة الفموية', 'Oral Histology', NULL, NULL, 0, '2025-06-04 15:02:00', '2025-06-04 15:02:00'),
(63, 7, 'علم أمراض الفم', 'Oral Pathology', NULL, NULL, 0, '2025-06-04 15:02:00', '2025-06-04 15:02:00'),
(64, 7, 'المواد السنية', 'Dental Materials', NULL, NULL, 0, '2025-06-04 15:02:00', '2025-06-04 15:02:00'),
(65, 7, 'طب أسنان ترميمي', 'Restorative Dentistry', NULL, NULL, 0, '2025-06-04 15:02:00', '2025-06-04 15:02:00'),
(66, 7, 'جراحة الفم والوجه والفكين', 'Oral and Maxillofacial Surgery', NULL, NULL, 0, '2025-06-04 15:02:00', '2025-06-04 15:02:00'),
(67, 7, 'علاج جذور الأسنان', 'Endodontics', NULL, NULL, 0, '2025-06-04 15:02:00', '2025-06-04 15:02:00'),
(68, 7, 'تقويم الأسنان', 'Orthodontics', NULL, NULL, 0, '2025-06-04 15:02:00', '2025-06-04 15:02:00'),
(69, 7, 'طب أسنان الأطفال', 'Pediatric Dentistry', NULL, NULL, 0, '2025-06-04 15:02:00', '2025-06-04 15:02:00'),
(70, 7, 'التركيبات السنية', 'Prosthodontics', NULL, NULL, 0, '2025-06-04 15:02:00', '2025-06-04 15:02:00'),
(71, 8, 'الكيمياء الحيوية', 'Biochemistry', NULL, NULL, 0, '2025-06-04 15:02:24', '2025-06-04 15:02:24'),
(72, 8, 'علم الأحياء الدقيقة', 'Microbiology', NULL, NULL, 0, '2025-06-04 15:02:24', '2025-06-04 15:02:24'),
(73, 8, 'علم الدم', 'Hematology', NULL, NULL, 0, '2025-06-04 15:02:24', '2025-06-04 15:02:24'),
(74, 8, 'علم المناعة', 'Immunology', NULL, NULL, 0, '2025-06-04 15:02:24', '2025-06-04 15:02:24'),
(75, 8, 'علم الأنسجة', 'Histology', NULL, NULL, 0, '2025-06-04 15:02:24', '2025-06-04 15:02:24'),
(76, 8, 'علم الطفيليات', 'Parasitology', NULL, NULL, 0, '2025-06-04 15:02:24', '2025-06-04 15:02:24'),
(77, 8, 'تقنيات المختبرات', 'Laboratory Techniques', NULL, NULL, 0, '2025-06-04 15:02:24', '2025-06-04 15:02:24'),
(78, 8, 'الكيمياء السريرية', 'Clinical Chemistry', NULL, NULL, 0, '2025-06-04 15:02:24', '2025-06-04 15:02:24'),
(79, 8, 'بنك الدم', 'Blood Bank', NULL, NULL, 0, '2025-06-04 15:02:24', '2025-06-04 15:02:24'),
(80, 8, 'ضبط الجودة المخبرية', 'Laboratory Quality Control', NULL, NULL, 0, '2025-06-04 15:02:24', '2025-06-04 15:02:24'),
(81, 9, 'التشريح البشري', 'Human Anatomy', NULL, NULL, 0, '2025-06-04 15:02:38', '2025-06-04 15:02:38'),
(82, 9, 'علم وظائف الأعضاء', 'Physiology', NULL, NULL, 0, '2025-06-04 15:02:38', '2025-06-04 15:02:38'),
(83, 9, 'الكيمياء الحيوية', 'Biochemistry', NULL, NULL, 0, '2025-06-04 15:02:38', '2025-06-04 15:02:38'),
(84, 9, 'علم الأمراض', 'Pathology', NULL, NULL, 0, '2025-06-04 15:02:38', '2025-06-04 15:02:38'),
(85, 9, 'علم الأدوية', 'Pharmacology', NULL, NULL, 0, '2025-06-04 15:02:38', '2025-06-04 15:02:38'),
(86, 9, 'الطب الباطني', 'Internal Medicine', NULL, NULL, 0, '2025-06-04 15:02:38', '2025-06-04 15:02:38'),
(87, 9, 'الجراحة العامة', 'General Surgery', NULL, NULL, 0, '2025-06-04 15:02:38', '2025-06-04 15:02:38'),
(88, 9, 'طب الأطفال', 'Pediatrics', NULL, NULL, 0, '2025-06-04 15:02:38', '2025-06-04 15:02:38'),
(89, 9, 'النساء والتوليد', 'Obstetrics and Gynecology', NULL, NULL, 0, '2025-06-04 15:02:38', '2025-06-04 15:02:38'),
(90, 9, 'الطب النفسي', 'Psychiatry', NULL, NULL, 0, '2025-06-04 15:02:38', '2025-06-04 15:02:38'),
(91, 10, 'الكيمياء الصيدلانية', 'Pharmaceutical Chemistry', NULL, NULL, 0, '2025-06-04 15:02:56', '2025-06-04 15:02:56'),
(92, 10, 'علم الأدوية', 'Pharmacology', NULL, NULL, 0, '2025-06-04 15:02:56', '2025-06-04 15:02:56'),
(93, 10, 'الصيدلانيات', 'Pharmaceutics', NULL, NULL, 0, '2025-06-04 15:02:56', '2025-06-04 15:02:56'),
(94, 10, 'العقاقير الطبية', 'Pharmacognosy', NULL, NULL, 0, '2025-06-04 15:02:56', '2025-06-04 15:02:56'),
(95, 10, 'علم السموم', 'Toxicology', NULL, NULL, 0, '2025-06-04 15:02:56', '2025-06-04 15:02:56'),
(96, 10, 'الكيمياء الحيوية', 'Biochemistry', NULL, NULL, 0, '2025-06-04 15:02:56', '2025-06-04 15:02:56'),
(97, 10, 'الصيدلة السريرية', 'Clinical Pharmacy', NULL, NULL, 0, '2025-06-04 15:02:56', '2025-06-04 15:02:56'),
(98, 10, 'الصيدلة الصناعية', 'Industrial Pharmacy', NULL, NULL, 0, '2025-06-04 15:02:56', '2025-06-04 15:02:56'),
(99, 10, 'الرقابة الدوائية', 'Pharmaceutical Quality Control', NULL, NULL, 0, '2025-06-04 15:02:56', '2025-06-04 15:02:56'),
(100, 10, 'التسويق الدوائي', 'Pharmaceutical Marketing', NULL, NULL, 0, '2025-06-04 15:02:56', '2025-06-04 15:02:56'),
(101, 7, 'تشريح الأسنان', 'Dental Anatomy', NULL, NULL, 0, '2025-06-04 15:07:13', '2025-06-04 15:07:13'),
(102, 7, 'علم الأنسجة الفموية', 'Oral Histology', NULL, NULL, 0, '2025-06-04 15:07:13', '2025-06-04 15:07:13'),
(103, 7, 'علم أمراض الفم', 'Oral Pathology', NULL, NULL, 0, '2025-06-04 15:07:13', '2025-06-04 15:07:13'),
(104, 7, 'المواد السنية', 'Dental Materials', NULL, NULL, 0, '2025-06-04 15:07:13', '2025-06-04 15:07:13'),
(105, 7, 'طب أسنان ترميمي', 'Restorative Dentistry', NULL, NULL, 0, '2025-06-04 15:07:13', '2025-06-04 15:07:13'),
(106, 7, 'جراحة الفم والوجه والفكين', 'Oral and Maxillofacial Surgery', NULL, NULL, 0, '2025-06-04 15:07:13', '2025-06-04 15:07:13'),
(107, 7, 'علاج جذور الأسنان', 'Endodontics', NULL, NULL, 0, '2025-06-04 15:07:13', '2025-06-04 15:07:13'),
(108, 7, 'تقويم الأسنان', 'Orthodontics', NULL, NULL, 0, '2025-06-04 15:07:13', '2025-06-04 15:07:13'),
(109, 7, 'طب أسنان الأطفال', 'Pediatric Dentistry', NULL, NULL, 0, '2025-06-04 15:07:13', '2025-06-04 15:07:13'),
(110, 7, 'التركيبات السنية', 'Prosthodontics', NULL, NULL, 0, '2025-06-04 15:07:13', '2025-06-04 15:07:13');

-- --------------------------------------------------------

--
-- بنية الجدول `faculties`
--

CREATE TABLE `faculties` (
  `faculty_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `description_en` text NOT NULL,
  `slug` varchar(100) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `programs` int(11) DEFAULT 0,
  `students` int(11) DEFAULT 0,
  `display_order` int(11) NOT NULL,
  `active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `faculties`
--

INSERT INTO `faculties` (`faculty_id`, `name`, `name_en`, `description`, `description_en`, `slug`, `image_path`, `icon`, `programs`, `students`, `display_order`, `active`, `created_at`, `updated_at`) VALUES
(1, 'كلية الطب', 'College of Medicine', 'نقدم تعليماً طبياً متميزاً وفق أحدث المعايير العالمية', 'We offer distinguished medical education according to the latest global standards', 'medicine', '/image/a3.jpg', '🏥', 5, 850, 1, 1, '2025-05-11 17:58:10', '2025-06-16 05:29:36'),
(2, 'كلية الهندسة', 'College of Engineering', 'نبني مستقبل التكنولوجيا من خلال الابتكار والإبداع', 'We build the future of technology through innovation and creativity', 'engineering', '/image/a1.jpg', '⚡', 8, 1200, 2, 1, '2025-05-11 17:58:10', '2025-06-16 05:29:36'),
(3, 'كلية العلوم الإدارية', 'College of Business', 'نعد قادة المستقبل في مجال الأعمال والإدارة', 'We prepare future leaders in the field of business and management', 'business', '/image/a2.jpg', '📊', 6, 950, 3, 1, '2025-05-11 17:58:10', '2025-06-16 05:29:36');

-- --------------------------------------------------------

--
-- بنية الجدول `footer_copyright`
--

CREATE TABLE `footer_copyright` (
  `id` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `text_en` varchar(255) NOT NULL,
  `year` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `footer_copyright`
--

INSERT INTO `footer_copyright` (`id`, `text`, `text_en`, `year`) VALUES
(1, 'جميع الحقوق محفوظة لجامعة الريادة', 'All rights reserved to Al-Riyada University', '2025');

-- --------------------------------------------------------

--
-- بنية الجدول `footer_links`
--

CREATE TABLE `footer_links` (
  `link_id` int(11) NOT NULL,
  `section_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `title_en` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `link_order` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `footer_links`
--

INSERT INTO `footer_links` (`link_id`, `section_id`, `title`, `title_en`, `url`, `link_order`) VALUES
(41, 1, 'الصفحة الرئيسية', 'Home', '/', 1),
(42, 1, 'عن الجامعة', 'About', '/about', 2),
(43, 1, 'الكليات', 'Colleges', '/colleges', 3),
(44, 1, 'التسجيل والقبول', 'Admission', '/admission', 4);

-- --------------------------------------------------------

--
-- بنية الجدول `footer_sections`
--

CREATE TABLE `footer_sections` (
  `section_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `title_en` varchar(255) NOT NULL,
  `section_type` enum('links','social','contact') NOT NULL,
  `section_order` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `footer_sections`
--

INSERT INTO `footer_sections` (`section_id`, `title`, `title_en`, `section_type`, `section_order`) VALUES
(1, 'روابط سريعة', 'Quick Links', 'links', 1),
(2, 'تواصل معنا', 'Contact Us', 'contact', 2),
(3, 'تابعنا', 'Follow Us', 'social', 3);

-- --------------------------------------------------------

--
-- بنية الجدول `hero_slides`
--

CREATE TABLE `hero_slides` (
  `slide_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `title_en` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `image_path` varchar(255) NOT NULL,
  `button_text` varchar(100) DEFAULT 'اكتشف المزيد',
  `button_text_en` varchar(100) DEFAULT 'Discover More',
  `button_url` varchar(255) DEFAULT '#',
  `slide_order` int(11) NOT NULL,
  `active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `hero_slides`
--

INSERT INTO `hero_slides` (`slide_id`, `title`, `title_en`, `description`, `description_en`, `image_path`, `button_text`, `button_text_en`, `button_url`, `slide_order`, `active`, `created_at`, `updated_at`) VALUES
(1, '  مستقبلك يبدأ هنا', 'Your Future Starts Here', 'سيسي', 'Discover a world of exceptional educational opportunities at our university', '/image/a1.jpg', 'المزيد', 'Discover More', '#', 1, 1, '2025-05-11 17:57:50', '2025-07-07 16:04:53'),
(2, 'التميز في البحث العلمي', 'Excellence in Scientific Research', 'نقود مسيرة البحث العلمي نحو آفاق جديدة', 'Leading the way in scientific research towards new horizons', '/image/a1.jpg', 'اكتشف المزيد', 'Discover More', '/about', 3, 1, '2025-05-11 17:57:50', '2025-07-02 19:46:51'),
(3, 'بيئة تعليمية متكاملة', 'Integrated Educational Environment', 'احمد مصطفى ', 'We provide the latest technologies and facilities for our students', '/image/3.jpg', 'اكتشف ', 'Discover', '#', 2, 1, '2025-05-11 17:57:50', '2025-07-07 16:07:15');

-- --------------------------------------------------------

--
-- بنية الجدول `job_opportunities`
--

CREATE TABLE `job_opportunities` (
  `id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `job_title_ar` varchar(255) NOT NULL,
  `job_title_en` varchar(255) DEFAULT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `job_opportunities`
--

INSERT INTO `job_opportunities` (`id`, `program_id`, `job_title_ar`, `job_title_en`, `icon`, `created_at`, `updated_at`) VALUES
(1, 1, 'مهندس برمجيات', 'Software Engineer', '💻', '2025-06-01 19:13:33', '2025-06-21 01:43:11'),
(2, 1, 'محلل نظم', 'System Analyst', '🧠', '2025-06-01 19:13:33', '2025-06-03 11:35:08'),
(3, 1, 'مدير قواعد بيانات', 'Database Manager', '🗄️', '2025-06-01 19:13:33', '2025-06-21 01:43:11'),
(4, 1, 'مهندس شبكات', 'Network Engineer', '🌐', '2025-06-01 19:13:33', '2025-06-03 11:36:26'),
(5, 1, 'مهندس أمن معلومات', 'Information Security Engineer', '🛡️', '2025-06-01 19:13:33', '2025-06-03 11:37:07'),
(6, 1, 'مطور تطبيقات ويب', 'Web Application Developer', '🌍', '2025-06-01 19:13:33', '2025-06-03 11:37:48'),
(7, 1, 'مطور تطبيقات موبايل', 'Mobile Application Developer', '📱', '2025-06-01 19:13:33', '2025-06-03 11:38:10'),
(8, 1, 'مهندس حوسبة سحابية', 'Cloud Computing Engineer', '☁️', '2025-06-01 19:13:33', '2025-06-03 11:38:53'),
(9, 1, 'امن سيبراني', 'cyber security', '👨‍💻', '2025-06-03 11:33:59', '2025-06-03 11:33:59'),
(10, 2, 'مهندس معماري', NULL, '🏢', '2025-06-03 11:46:30', '2025-06-03 11:46:30'),
(11, 2, 'مخطط مدن', NULL, '🏙️', '2025-06-03 11:46:30', '2025-06-03 11:46:30'),
(12, 2, 'مصمم داخلي', NULL, '🎨', '2025-06-03 11:46:30', '2025-06-03 11:46:30'),
(13, 2, 'مدير مشاريع', NULL, '👷', '2025-06-03 11:46:30', '2025-06-03 11:46:30'),
(14, 2, 'مستشار استدامة', NULL, '🌿', '2025-06-03 11:46:30', '2025-06-03 11:46:30'),
(15, 2, 'مصمم نماذج ثلاثية الأبعاد', NULL, '🖥️', '2025-06-03 11:46:30', '2025-06-03 11:46:30'),
(16, 3, 'محاسب مالي', 'Financial Accountant', '💼', '2025-06-04 14:40:49', '2025-06-04 14:40:49'),
(17, 3, 'مدقق حسابات (داخلي/خارجي)', 'Auditor (Internal/External)', '🕵️', '2025-06-04 14:40:49', '2025-06-04 14:40:49'),
(18, 3, 'محاسب تكاليف', 'Cost Accountant', '⚙️', '2025-06-04 14:40:49', '2025-06-04 14:40:49'),
(19, 3, 'محلل مالي', 'Financial Analyst', '💹', '2025-06-04 14:40:49', '2025-06-04 14:40:49'),
(20, 3, 'مستشار ضريبي', 'Tax Consultant', '🏛️', '2025-06-04 14:40:49', '2025-06-04 14:40:49'),
(21, 3, 'مدير مالي', 'Financial Manager', '📈', '2025-06-04 14:40:49', '2025-06-04 14:40:49'),
(22, 3, 'مراقب مالي', 'Financial Controller', '🛂', '2025-06-04 14:40:49', '2025-06-04 14:40:49'),
(23, 3, 'خبير محاسبة قضائية', 'Forensic Accountant', '⚖️', '2025-06-04 14:40:49', '2025-06-04 14:40:49'),
(24, 4, 'مدير مشاريع', 'Project Manager', '📋', '2025-06-04 14:57:16', '2025-06-04 14:57:16'),
(25, 4, 'مدير موارد بشرية', 'Human Resources Manager', '👥', '2025-06-04 14:57:16', '2025-06-04 14:57:16'),
(26, 4, 'محلل أعمال', 'Business Analyst', '📊', '2025-06-04 14:57:16', '2025-06-04 14:57:16'),
(27, 4, 'ريادي أعمال', 'Entrepreneur', '🚀', '2025-06-04 14:57:16', '2025-06-04 14:57:16'),
(28, 4, 'مدير تنفيذي', 'Executive Manager', '🏢', '2025-06-04 14:57:16', '2025-06-04 14:57:16'),
(29, 4, 'مدير تسويق', 'Marketing Manager', '🛒', '2025-06-04 14:57:16', '2025-06-04 14:57:16'),
(30, 5, 'محلل مالي', 'Financial Analyst', '📊', '2025-06-04 14:58:35', '2025-06-04 14:58:35'),
(31, 5, 'مدير استثمار', 'Investment Manager', '💰', '2025-06-04 14:58:35', '2025-06-04 14:58:35'),
(32, 5, 'مستشار مالي', 'Financial Advisor', '📝', '2025-06-04 14:58:35', '2025-06-04 14:58:35'),
(33, 5, 'مدير محافظ استثمارية', 'Portfolio Manager', '💼', '2025-06-04 14:58:35', '2025-06-04 14:58:35'),
(34, 5, 'مصرفي استثماري', 'Investment Banker', '🏦', '2025-06-04 14:58:35', '2025-06-04 14:58:35'),
(35, 5, 'مدير مخاطر مالية', 'Financial Risk Manager', '⚖️', '2025-06-04 14:58:35', '2025-06-04 14:58:35'),
(36, 6, 'أخصائي تسويق رقمي', 'Digital Marketing Specialist', '📱', '2025-06-04 15:00:17', '2025-06-04 15:00:17'),
(37, 6, 'مدير علامة تجارية', 'Brand Manager', '🎯', '2025-06-04 15:00:17', '2025-06-04 15:00:17'),
(38, 6, 'محلل سوق', 'Market Analyst', '📊', '2025-06-04 15:00:17', '2025-06-04 15:00:17'),
(39, 6, 'مدير حملات إعلانية', 'Advertising Campaign Manager', '📣', '2025-06-04 15:00:17', '2025-06-04 15:00:17'),
(40, 6, 'مدير تسويق محتوى', 'Content Marketing Manager', '🌐', '2025-06-04 15:00:17', '2025-06-04 15:00:17'),
(41, 6, 'مدير تسويق', 'Marketing Manager', '📈', '2025-06-04 15:00:17', '2025-06-04 15:00:17'),
(42, 7, 'طبيب أسنان عام', 'General Dentist', '🏥', '2025-06-04 15:02:00', '2025-06-04 15:02:00'),
(43, 7, 'أخصائي تقويم أسنان', 'Orthodontist', '👨‍⚕️', '2025-06-04 15:02:00', '2025-06-04 15:02:00'),
(44, 7, 'أخصائي علاج جذور', 'Endodontist', '🔬', '2025-06-04 15:02:00', '2025-06-04 15:02:00'),
(45, 7, 'جراح فم وفكين', 'Oral and Maxillofacial Surgeon', '🧑‍🔬', '2025-06-04 15:02:00', '2025-06-04 15:02:00'),
(46, 7, 'أستاذ جامعي', 'University Professor', '🏫', '2025-06-04 15:02:00', '2025-06-04 15:02:00'),
(47, 7, 'مدير عيادة أسنان', 'Dental Clinic Manager', '📋', '2025-06-04 15:02:00', '2025-06-04 15:02:00'),
(48, 8, 'أخصائي مختبرات طبية', 'Medical Laboratory Specialist', '🏥', '2025-06-04 15:02:24', '2025-06-04 15:02:24'),
(49, 8, 'أخصائي علم الأمراض', 'Pathology Specialist', '🔬', '2025-06-04 15:02:24', '2025-06-04 15:02:24'),
(50, 8, 'أخصائي وراثة', 'Genetics Specialist', '🧬', '2025-06-04 15:02:24', '2025-06-04 15:02:24'),
(51, 8, 'أخصائي كيمياء حيوية', 'Biochemistry Specialist', '🧪', '2025-06-04 15:02:24', '2025-06-04 15:02:24'),
(52, 8, 'باحث علمي', 'Scientific Researcher', '🏫', '2025-06-04 15:02:24', '2025-06-04 15:02:24'),
(53, 8, 'مدير مختبر طبي', 'Medical Laboratory Manager', '📋', '2025-06-04 15:02:24', '2025-06-04 15:02:24'),
(54, 9, 'طبيب ممارس عام', 'General Practitioner', '🏥', '2025-06-04 15:02:38', '2025-06-04 15:02:38'),
(55, 9, 'أخصائي طبي', 'Medical Specialist', '👨‍⚕️', '2025-06-04 15:02:38', '2025-06-04 15:02:38'),
(56, 9, 'باحث طبي', 'Medical Researcher', '🔬', '2025-06-04 15:02:38', '2025-06-04 15:02:38'),
(57, 9, 'أستاذ جامعي', 'University Professor', '🏫', '2025-06-04 15:02:38', '2025-06-04 15:02:38'),
(58, 9, 'استشاري طبي دولي', 'International Medical Consultant', '🌐', '2025-06-04 15:02:38', '2025-06-04 15:02:38'),
(59, 9, 'مدير مؤسسة صحية', 'Healthcare Administrator', '📋', '2025-06-04 15:02:38', '2025-06-04 15:02:38'),
(60, 10, 'صيدلي مستشفى', 'Hospital Pharmacist', '🏥', '2025-06-04 15:02:56', '2025-06-04 15:02:56'),
(61, 10, 'صيدلي مجتمعي', 'Community Pharmacist', '🏪', '2025-06-04 15:02:56', '2025-06-04 15:02:56'),
(62, 10, 'صيدلي سريري', 'Clinical Pharmacist', '🔬', '2025-06-04 15:02:56', '2025-06-04 15:02:56'),
(63, 10, 'صيدلي صناعي', 'Industrial Pharmacist', '🏭', '2025-06-04 15:02:56', '2025-06-04 15:02:56'),
(64, 10, 'باحث في مجال الأدوية', 'Pharmaceutical Researcher', '🧪', '2025-06-04 15:02:56', '2025-06-04 15:02:56'),
(65, 10, 'مدير رقابة دوائية', 'Pharmaceutical Regulatory Affairs Manager', '📋', '2025-06-04 15:02:56', '2025-06-04 15:02:56');

-- --------------------------------------------------------

--
-- بنية الجدول `majors`
--

CREATE TABLE `majors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `college_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `icon` varchar(16) DEFAULT NULL,
  `duration_years` int(11) DEFAULT NULL,
  `students_count` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `features` text DEFAULT NULL,
  `features_en` text DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `majors`
--

INSERT INTO `majors` (`id`, `college_id`, `name`, `name_en`, `icon`, `duration_years`, `students_count`, `description`, `description_en`, `features`, `features_en`, `link`, `created_at`, `updated_at`) VALUES
(1, 1, 'تقنية المعلومات', 'Information Technology', '💾', 4, 200, 'بكالوريوس - 4 سنوات • 200 طالب/ة', 'Bachelor\'s degree - 4 years • 200 students', 'برمجة التطبيقات;الشبكات;أمن المعلومات', 'Application programming;Networking;Information security', '/components/colleges/engineering/Majors/IT', '2025-05-19 07:50:32', '2025-05-19 07:50:32'),
(2, 1, 'معمارية', 'Architecture', '🏢', 5, 220, 'بكالوريوس - 5 سنوات • 220 طالب/ة', 'Bachelor\'s degree - 5 years • 220 students', 'التصميم الإنشائي;إدارة المشاريع;هندسة البيئة', 'Structural design;Project management;Environmental engineering', '/components/colleges/engineering/Majors/Architecture', '2025-05-19 07:50:32', '2025-05-19 07:50:32'),
(3, 3, 'المحاسبة', 'Accounting', '📊', 4, 280, 'بكالوريوس في المحاسبة', 'Bachelor\'s degree in Accounting', 'محاسبة مالية;مراجعة وتدقيق;محاسبة تكاليف', 'Financial accounting;Audit and review;Cost accounting', '/components/colleges/business/Majors/Accounting', '2025-05-19 08:04:39', '2025-05-19 08:04:39'),
(4, 3, 'إدارة الأعمال', 'Business Administration', '📈', 4, 350, 'بكالوريوس في إدارة الأعمال', 'Bachelor\'s degree in Business Administration', 'إدارة استراتيجية;ريادة الأعمال;إدارة الموارد البشرية', 'Strategic management;Entrepreneurship;Human resources management', '/components/colleges/business/Majors/BusinessManagement', '2025-05-19 08:04:39', '2025-05-19 08:04:39'),
(5, 3, 'التمويل والاستثمار', 'Finance and Investment', '💰', 4, 120, 'بكالوريوس في التمويل والاستثمار', 'Bachelor\'s degree in Finance and Investment', 'التحليل المالي;إدارة المحافظ الاستثمارية;التمويل الدولي', 'Financial analysis;Portfolio management;International finance', '/components/colleges/business/Majors/Finance', '2025-05-19 08:04:39', '2025-05-19 08:04:39'),
(6, 3, 'التسويق', 'Marketing', '🛒', 4, 200, 'بكالوريوس في التسويق', 'Bachelor\'s degree in Marketing', 'التسويق الرقمي;إدارة العلامات التجارية;سلوك المستهلك', 'Digital marketing;Brand management;Consumer behavior', '/components/colleges/business/Majors/Marketing', '2025-05-19 08:04:39', '2025-05-19 08:04:39'),
(7, 2, 'طب الأسنان', 'Dentistry', '🦷', 5, 180, 'بكالوريوس في طب الأسنان', 'Bachelor of Dental Surgery degree', 'عيادات متطورة;تقنيات حديثة;تدريب عملي مكثف', 'Advanced clinics;Modern techniques;Intensive practical training', '/components/colleges/medicine/Majors/Dentistry', '2025-05-19 08:00:12', '2025-05-19 08:00:12'),
(8, 2, 'المختبرات الطبية', 'Medical Laboratories', '🧪', 4, 150, 'بكالوريوس في المختبرات الطبية', 'Bachelor\'s degree in Medical Laboratory', 'مختبرات متخصصة;أجهزة متطورة;تدريب ميداني', 'Specialized laboratories;Advanced devices;Field training', '/components/colleges/medicine/Majors/Laboratory', '2025-05-19 08:00:12', '2025-05-19 08:00:12'),
(9, 2, 'الطب البشري', 'Medicine', '🩺', 6, 300, 'بكالوريوس في الطب البشري', 'Bachelor of Medicine degree', 'تدريب سريري متقدم;مختبرات حديثة;برامج تدريب دولية', 'Advanced clinical training;Modern laboratories;International training programs', '/components/colleges/medicine/Majors/Medicine', '2025-05-19 08:00:12', '2025-05-19 08:00:12'),
(10, 2, 'الصيدلة', 'Pharmacy', '💊', 5, 200, 'بكالوريوس في الصيدلة', 'Bachelor of Pharmacy degree', 'معامل متخصصة;تدريب صيدلاني;شراكات مع المستشفيات', 'Specialized laboratories;Pharmaceutical training;Partnerships with hospitals', '/components/colleges/medicine/Majors/Pharmacy', '2025-05-19 08:01:05', '2025-05-19 08:01:05'),
(11, 1, 'تقنية المعلومات ', 'IT', '💻', 6, 0, 'ماجستير', 'm', 'برمجة التطبيقات;الشبكات;أمن المعلومات', 'sd', NULL, '2025-07-04 14:24:02', '2025-07-04 14:24:02');

-- --------------------------------------------------------

--
-- بنية الجدول `majorsgrid`
--

CREATE TABLE `majorsgrid` (
  `id` int(11) NOT NULL,
  `major_name_en` varchar(255) DEFAULT NULL,
  `major_name_ar` varchar(255) DEFAULT NULL,
  `college_en` varchar(255) DEFAULT NULL,
  `college_ar` varchar(255) DEFAULT NULL,
  `college_slug` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `description_ar` text DEFAULT NULL,
  `icon` varchar(10) DEFAULT NULL,
  `duration` varchar(50) DEFAULT NULL,
  `students` int(11) DEFAULT NULL,
  `features_en` text DEFAULT NULL,
  `features_ar` text DEFAULT NULL,
  `admission_requirements_en` text DEFAULT NULL,
  `admission_requirements_ar` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `majorsgrid`
--

INSERT INTO `majorsgrid` (`id`, `major_name_en`, `major_name_ar`, `college_en`, `college_ar`, `college_slug`, `slug`, `description_en`, `description_ar`, `icon`, `duration`, `students`, `features_en`, `features_ar`, `admission_requirements_en`, `admission_requirements_ar`) VALUES
(11, 'Architecture', 'هندسة معمارية', 'Engineering College', 'كلية الهندسة', 'engineering', 'Architecture', 'Design and planning of architectural buildings and structures', 'تصميم وتخطيط المباني والمنشآت المعمارية', '🏛️', 'Bachelor - 5 years', 180, '[\"Architectural Design\", \"Urban Planning\", \"Modern Building Techniques\"]', '[\"تصميم معماري\", \"تخطيط عمراني\", \"تقنيات البناء الحديثة\"]', '[\"High school diploma with a minimum average of 85%\", \"Pass the engineering aptitude test\", \"Pass the personal interview\", \"Proficiency in engineering drawing skills\"]', '[\"الحصول على شهادة الثانوية العامة بمعدل لا يقل عن 85%\", \"اجتياز اختبار القدرات الهندسية\", \"اجتياز المقابلة الشخصية\", \"إتقان مهارات الرسم الهندسي\"]'),
(12, 'Information Technology', 'تقنية المعلومات', 'Engineering College', 'كلية الهندسة', 'engineering', 'IT', 'Development and management of IT systems', 'تطوير وإدارة أنظمة تكنولوجيا المعلومات', '💻', 'Bachelor - 4 years', 250, '[\"Computer Programming\", \"Computer Networks\", \"Information Security\"]', '[\"برمجة الحاسوب\", \"شبكات الحاسوب\", \"أمن المعلومات\"]', '[\"High school diploma with a minimum average of 80%\", \"Pass the math aptitude test\", \"Basic knowledge of computers and programming\", \"Pass the personal interview\"]', '[\"الحصول على شهادة الثانوية العامة بمعدل لا يقل عن 80%\", \"اجتياز اختبار القدرات في الرياضيات\", \"إلمام بأساسيات الحاسوب والبرمجة\", \"اجتياز المقابلة الشخصية\"]'),
(13, 'Medicine', 'الطب البشري', 'Medical College', 'كلية الطب', 'medicine', 'Medicine', 'Study of general medicine and diagnosis and treatment of diseases', 'دراسة الطب العام وتشخيص وعلاج الأمراض', '⚕️', 'Bachelor - 6 years', 120, '[\"Anatomy\", \"Pathology\", \"Family Medicine\"]', '[\"تشريح\", \"علم الأمراض\", \"طب الأسرة\"]', '[\"High school diploma with a minimum average of 95%\", \"Pass the medical aptitude test\", \"Pass the personal interview\", \"Pass the medical examination\", \"Proficiency in English\"]', '[\"الحصول على شهادة الثانوية العامة بمعدل لا يقل عن 95%\", \"اجتياز اختبار القدرات الطبية\", \"اجتياز المقابلة الشخصية\", \"اجتياز الفحص الطبي\", \"إتقان اللغة الإنجليزية\"]'),
(14, 'Dentistry', 'طب الأسنان', 'Medical College', 'كلية الطب', 'medicine', 'Dentistry', 'Diagnosis and treatment of oral and dental diseases', 'تشخيص وعلاج أمراض الفم والأسنان', '🦷', 'Bachelor - 5 years', 100, '[\"Oral Surgery\", \"Orthodontics\", \"Pediatric Dentistry\"]', '[\"جراحة الفم\", \"تقويم الأسنان\", \"طب أسنان الأطفال\"]', '[\"High school diploma with a minimum average of 90%\", \"Pass the medical aptitude test\", \"Pass the personal interview\", \"Proficiency in English\", \"Good manual skills\"]', '[\"الحصول على شهادة الثانوية العامة بمعدل لا يقل عن 90%\", \"اجتياز اختبار القدرات الطبية\", \"اجتياز المقابلة الشخصية\", \"إتقان اللغة الإنجليزية\", \"مهارات يدوية جيدة\"]'),
(15, 'Pharmacy', 'الصيدلة', 'Medical College', 'كلية الطب', 'medicine', 'Pharmacy', 'Study of drug composition, manufacturing, and effects', 'دراسة تركيب وتصنيع وتأثير الأدوية', '💊', 'Bachelor - 5 years', 150, '[\"Pharmaceutical Chemistry\", \"Pharmacology\", \"Clinical Pharmacy\"]', '[\"كيمياء صيدلانية\", \"علم الأدوية\", \"صيدلة سريرية\"]', '[\"High school diploma with a minimum average of 85%\", \"Pass the scientific aptitude test\", \"Pass the personal interview\", \"Proficiency in English\"]', '[\"الحصول على شهادة الثانوية العامة بمعدل لا يقل عن 85%\", \"اجتياز اختبار القدرات العلمية\", \"اجتياز المقابلة الشخصية\", \"إتقان اللغة الإنجليزية\"]'),
(16, 'Medical Laboratories', 'المختبرات الطبية', 'Medical College', 'كلية الطب', 'medicine', 'Laboratory', 'Conducting laboratory tests and interpreting results', 'إجراء التحاليل المخبرية وتفسير نتائجها', '🔬', 'Bachelor - 4 years', 130, '[\"Microbiology\", \"Hematology\", \"Biochemistry\"]', '[\"علم الأحياء الدقيقة\", \"علم الدم\", \"الكيمياء الحيوية\"]', '[\"High school diploma with a minimum average of 80%\", \"Pass the scientific aptitude test\", \"Pass the personal interview\", \"Proficiency in English\"]', '[\"الحصول على شهادة الثانوية العامة بمعدل لا يقل عن 80%\", \"اجتياز اختبار القدرات العلمية\", \"اجتياز المقابلة الشخصية\", \"إتقان اللغة الإنجليزية\"]'),
(17, 'Business Management', 'إدارة الأعمال', 'Business College', 'كلية العلوم الإدارية', 'business', 'BusinessManagement', 'Study of business and corporate management', 'دراسة إدارة الشركات والمؤسسات', '📈', 'Bachelor - 4 years', 350, '[\"Strategic Management\", \"Entrepreneurship\", \"Human Resource Management\"]', '[\"إدارة استراتيجية\", \"ريادة الأعمال\", \"إدارة الموارد البشرية\"]', '[\"High school diploma with a minimum average of 75%\", \"Pass the general aptitude test\", \"Pass the personal interview\", \"Good communication skills\"]', '[\"الحصول على شهادة الثانوية العامة بمعدل لا يقل عن 75%\", \"اجتياز اختبار القدرات العامة\", \"اجتياز المقابلة الشخصية\", \"مهارات تواصل جيدة\"]'),
(18, 'Accounting', 'المحاسبة', 'Business College', 'كلية العلوم الإدارية', 'business', 'Accounting', 'Study of recording and analyzing financial data', 'دراسة تسجيل وتحليل البيانات المالية', '📊', 'Bachelor - 4 years', 280, '[\"Financial Accounting\", \"Auditing\", \"Cost Accounting\"]', '[\"محاسبة مالية\", \"مراجعة وتدقيق\", \"محاسبة تكاليف\"]', '[\"High school diploma with a minimum average of 75%\", \"Pass the math aptitude test\", \"Pass the personal interview\", \"Good analytical skills\"]', '[\"الحصول على شهادة الثانوية العامة بمعدل لا يقل عن 75%\", \"اجتياز اختبار القدرات في الرياضيات\", \"اجتياز المقابلة الشخصية\", \"مهارات تحليلية جيدة\"]'),
(19, 'Marketing', 'التسويق', 'Business College', 'كلية العلوم الإدارية', 'business', 'Marketing', 'Study of promotion strategies and product marketing', 'دراسة استراتيجيات الترويج وتسويق المنتجات', '🛒', 'Bachelor - 4 years', 200, '[\"Digital Marketing\", \"Brand Management\", \"Consumer Behavior\"]', '[\"التسويق الرقمي\", \"إدارة العلامات التجارية\", \"سلوك المستهلك\"]', '[\"High school diploma with a minimum average of 70%\", \"Pass the general aptitude test\", \"Pass the personal interview\", \"Creative and good communication skills\"]', '[\"الحصول على شهادة الثانوية العامة بمعدل لا يقل عن 70%\", \"اجتياز اختبار القدرات العامة\", \"اجتياز المقابلة الشخصية\", \"مهارات إبداعية وتواصل جيدة\"]'),
(20, 'Finance and Investment', 'التمويل والاستثمار', 'Business College', 'كلية العلوم الإدارية', 'business', 'Finance', 'Study of money management and investments', 'دراسة إدارة الأموال والاستثمارات', '💰', 'Bachelor - 4 years', 120, '[\"Financial Analysis\", \"Portfolio Management\", \"International Finance\"]', '[\"التحليل المالي\", \"إدارة المحافظ الاستثمارية\", \"التمويل الدولي\"]', '[\"High school diploma with a minimum average of 75%\", \"Pass the math aptitude test\", \"Pass the personal interview\", \"Good analytical skills\"]', '[\"الحصول على شهادة الثانوية العامة بمعدل لا يقل عن 75%\", \"اجتياز اختبار القدرات في الرياضيات\", \"اجتياز المقابلة الشخصية\", \"مهارات تحليلية جيدة\"]');

-- --------------------------------------------------------

--
-- بنية الجدول `menu_items`
--

CREATE TABLE `menu_items` (
  `item_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `title_en` varchar(100) NOT NULL,
  `url` varchar(255) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `item_order` int(11) NOT NULL,
  `active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `menu_items`
--

INSERT INTO `menu_items` (`item_id`, `title`, `title_en`, `url`, `parent_id`, `item_order`, `active`) VALUES
(1, 'الرئيسية', 'Home', '/', NULL, 1, 1),
(2, 'عن الجامعة', 'About University', '/about', NULL, 2, 1),
(3, 'الكليات', 'Colleges', '/faculties', NULL, 3, 1),
(4, 'البحث العلمي', 'Research', '/research', NULL, 4, 1);

-- --------------------------------------------------------

--
-- بنية الجدول `navbar_items`
--

CREATE TABLE `navbar_items` (
  `id` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `label_en` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `display_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `context` varchar(100) DEFAULT 'global',
  `parent_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `navbar_items`
--

INSERT INTO `navbar_items` (`id`, `label`, `label_en`, `link`, `display_order`, `is_active`, `context`, `parent_id`) VALUES
(1, 'الرئيسية', 'Home', '/', 1, 1, 'global', NULL),
(2, 'عن الجامعة', 'About', '/about', 2, 1, 'global', NULL),
(3, 'الأخبار', 'News', '/news', 3, 1, 'Home', NULL),
(4, 'القبول والتسجيل ', 'Admission', '/admission', 3, 1, 'Home', NULL),
(6, 'الكليات', 'Colleges', '#', 1, 1, 'global', NULL),
(7, 'كلية الهندسة', 'Engineering College', '/colleges/1', 1, 1, 'global', 6),
(8, 'كلية الطب', 'Medical College', '/colleges/2', 2, 1, 'global', 6),
(9, 'كلية العلوم الادارية', 'Administrative Sciences College', '/colleges/3', 3, 1, 'global', 6),
(10, 'إنجازات', 'Achievements', '', 0, 1, 'Achievements', NULL);

-- --------------------------------------------------------

--
-- بنية الجدول `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `title_en` varchar(255) DEFAULT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `subtitle_en` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  `content_en` text DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `summary_en` text DEFAULT NULL,
  `main_image_url` varchar(255) DEFAULT NULL,
  `publish_date` datetime DEFAULT current_timestamp(),
  `last_updated` datetime DEFAULT current_timestamp(),
  `author_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `views_count` int(11) DEFAULT 0,
  `is_featured` tinyint(1) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `display_order` int(11) DEFAULT 0,
  `slug` varchar(255) DEFAULT NULL,
  `tags` text DEFAULT NULL,
  `tags_en` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `news`
--

INSERT INTO `news` (`id`, `title`, `title_en`, `subtitle`, `subtitle_en`, `content`, `content_en`, `summary`, `summary_en`, `main_image_url`, `publish_date`, `last_updated`, `author_id`, `category_id`, `views_count`, `is_featured`, `is_active`, `display_order`, `slug`, `tags`, `tags_en`) VALUES
(2, 'بدء التسجيل للفصل الدراسي الجديد', 'Scientific Conference on Latest Research Developments', 'فتح باب التسجيل للطلاب الجدد والمستمرين', 'Researchers present latest findings in various fields', '<p>أعلنت عمادة القبول والتسجيل عن بدء استقبال طلبات التسجيل للفصل الدراسي الأول من العام الجامعي 1447/1448هـ اعتباراً من يوم الأحد القادم.</p><p>وأوضح عميد القبول والتسجيل الدكتور فهد السليم أن التسجيل سيكون متاحاً عبر البوابة الإلكترونية للجامعة، مشيراً إلى ضرورة الالتزام بالمواعيد المحددة لكل كلية وتخصص.</p><p>كما أكد على أهمية استكمال جميع المتطلبات والوثائق المطلوبة قبل التقديم لضمان سرعة إنجاز الطلبات وتفادي أي تأخير في عملية التسجيل.</p>', '<p>The university signed a cooperation agreement with several international universities to exchange experiences and develop academic programs. This agreement aims to enhance the quality of education and provide new opportunities for students and faculty members.</p><p>The agreement includes student and faculty exchange programs, joint research projects, and the development of educational curricula. It also includes organizing joint conferences and workshops.</p><p>This agreement is part of the university\'s strategy to enhance its global presence and provide distinguished educational opportunities for its students.</p>', 'أعلنت عمادة القبول والتسجيل عن بدء استقبال طلبات التسجيل للفصل الدراسي الجديد عبر البوابة الإلكترونية للجامعة', 'The university signed a cooperation agreement with several international universities to exchange experiences and develop academic programs.', '/image/a1.jpg', '2025-06-08 01:37:16', '2025-05-17 09:15:00', 2, 2, 114, 1, 1, 2, 'new-semester-registration', 'تسجيل,قبول,طلاب جدد,فصل دراسي', 'cooperation, international universities, academic programs, exchange'),
(3, 'فوز فريق الجامعة بالمركز الأول في مسابقة الابتكار', 'Workshop on Developing Teaching Skills for Faculty Members', 'إنجاز جديد يضاف لسجل الجامعة الحافل', 'Developing teaching methods and enhancing educational outcomes', '<p>حقق فريق كلية الهندسة المركز الأول في مسابقة الابتكار التقني على مستوى الجامعات، والتي نظمتها وزارة التعليم بالتعاون مع شركات التقنية الكبرى.</p><p>وتكون الفريق من خمسة طلاب من قسم هندسة الحاسب، وقدموا مشروعاً مبتكراً في مجال إنترنت الأشياء والمدن الذكية، نال إعجاب لجنة التحكيم وتفوق على أكثر من 50 مشروعاً مشاركاً من مختلف الجامعات.</p><p>وأشاد عميد كلية الهندسة بهذا الإنجاز، مؤكداً على دعم الجامعة المستمر للابتكار والإبداع لدى الطلاب وتشجيعهم على المشاركة في المسابقات المحلية والدولية.</p>', '<p>The university celebrated the graduation of a new batch of students from various colleges. The ceremony was attended by university officials, faculty members, students\' families, and a number of distinguished guests.</p><p>During the ceremony, outstanding students were honored, and graduation certificates were distributed to all graduates. The university president delivered a speech congratulating the graduates and wishing them success in their future careers.</p><p>The ceremony included various artistic and cultural performances that reflected the university\'s cultural diversity and its interest in developing students\' talents.</p>', 'حقق فريق كلية الهندسة المركز الأول في مسابقة الابتكار التقني على مستوى الجامعات بمشروع مبتكر في مجال إنترنت الأشياء والمدن الذكية', 'The university celebrated the graduation of a new batch of students from various colleges with the presence of officials and families.', '/images/news/innovation.jpg', '2025-06-12 01:37:16', '2025-05-18 14:45:00', 3, 3, 77, 1, 1, 3, 'innovation-competition-win', 'ابتكار,مسابقة,إنجاز,كلية الهندسة', 'graduation, ceremony, students, achievement'),
(4, ' عمل حول تقنيات التعلم العميق', 'Student Activities Week Launches with Various Events', 'تدريب عملي على أحدث تقنيات الذكاء الاصطناعي', 'Cultural, sports, and social activities for university students', '<p>تنظم كلية علوم الحاسب ورشة عمل متخصصة في تقنيات التعلم العميق وتطبيقاتها، وذلك يوم الثلاثاء القادم في قاعة المؤتمرات الرئيسية.</p><p>وستتناول الورشة أساسيات التعلم العميق والشبكات العصبية وتطبيقاتها في مجالات الرؤية الحاسوبية ومعالجة اللغات الطبيعية، مع تدريب عملي على استخدام أطر العمل الشهيرة مثل TensorFlow و PyTorch.</p><p>الورشة مفتوحة لطلاب الجامعة والمهتمين من خارجها، ويشترط التسجيل المسبق عبر منصة الفعاليات الإلكترونية للجامعة.</p>', '<p>The university organized a community service campaign with the participation of students and faculty members. The campaign included various activities aimed at serving the local community and enhancing social responsibility.</p><p>Activities included cleaning campaigns, tree planting, visiting hospitals and care homes, and organizing awareness lectures on various topics. The campaign received wide community participation and positive interaction.</p><p>This campaign is part of the university\'s efforts to enhance its role in community service and instill the values of volunteerism and social responsibility among its students.</p>', 'تنظم كلية علوم الحاسب ورشة عمل متخصصة في تقنيات التعلم العميق وتطبيقاتها مع تدريب عملي على أطر العمل الشهيرة', 'The university organized a community service campaign with the participation of students and faculty members to serve the local community.', '/images/news/workshop.jpg', '2025-06-14 01:37:16', '2025-07-08 21:16:39', 1, 4, 0, 0, 1, 4, 'deep-learning-workshop', 'ورشة عمل,تعلم عميق,ذكاء اصطناعي,تدريب', 'community service, volunteer work, social responsibility, students'),
(5, 'توقيع اتفاقية تعاون مع شركات التقنية', 'University Announces New Scholarships for Outstanding Students', 'شراكة استراتيجية لتدريب الطلاب وتوظيف الخريجين', 'Supporting outstanding students and providing educational opportunities', '<p>وقعت الجامعة اتفاقية تعاون مع كبرى شركات التقنية لتدريب الطلاب وتوفير فرص عمل للخريجين، وذلك في إطار سعي الجامعة لتعزيز الشراكة مع القطاع الخاص.</p><p>وتشمل الاتفاقية توفير برامج تدريبية للطلاب خلال فترة الدراسة، وإتاحة فرص التدريب الصيفي، بالإضافة إلى توفير فرص وظيفية للخريجين المتميزين.</p><p>كما تتضمن الاتفاقية تطوير المناهج الدراسية بما يتوافق مع متطلبات سوق العمل، وإشراك خبراء من الشركات في تقديم محاضرات وورش عمل للطلاب.</p>', '<p>The university organized an important event that brought together faculty members, students, and distinguished guests. The event included various activities and discussions about academic development and enhancing the educational process.</p><p>The university president emphasized the importance of continuous development and keeping pace with global educational trends. He also praised the efforts of all participants and their positive contributions.</p><p>At the end of the event, certificates were distributed to the participants, and future plans were announced to organize similar events that contribute to enriching the university experience.</p>', 'وقعت الجامعة اتفاقية تعاون مع كبرى شركات التقنية لتدريب الطلاب وتوفير فرص عمل للخريجين وتطوير المناهج الدراسية', 'The university organized an important event with the participation of faculty members, students, and distinguished guests to discuss academic development.', '/images/news/agreement.jpg', '2025-06-14 01:37:16', '2025-05-14 13:10:00', 2, 1, 44, 1, 1, 5, 'tech-companies-agreement', 'اتفاقية,تعاون,توظيف,تدريب,شركات تقنية', 'university, event, academic development, education'),
(6, 'إطلاق المنصة الإلكترونية الجديدة للجامعة', 'Faculty Members Participate in International Research Conference', 'تطوير الخدمات الإلكترونية للطلاب وأعضاء هيئة التدريس', 'Sharing research experiences and building international partnerships', '<p>أطلقت الجامعة منصتها الإلكترونية الجديدة لتسهيل الخدمات الطلابية والأكاديمية، وذلك ضمن خطتها للتحول الرقمي وتطوير الخدمات الإلكترونية.</p><p>وتتيح المنصة الجديدة العديد من الخدمات للطلاب مثل التسجيل في المقررات، والاطلاع على الجدول الدراسي والنتائج، وطلب الوثائق الرسمية، بالإضافة إلى خدمات التواصل مع أعضاء هيئة التدريس.</p><p>كما توفر المنصة لأعضاء هيئة التدريس خدمات إدارة المقررات، ورصد الدرجات، والتواصل مع الطلاب، وإدارة الأبحاث والمشاريع العلمية.</p>', '<p>A scientific conference was held at the university with the participation of researchers and academics from various universities. The conference discussed the latest scientific developments and research in various fields.</p><p>The conference included several sessions and workshops that addressed important topics in scientific research and academic publishing. Participants presented their research papers and exchanged experiences and knowledge.</p><p>The conference concluded with a set of recommendations aimed at developing scientific research and enhancing cooperation between universities and research centers.</p>', 'أطلقت الجامعة منصتها الإلكترونية الجديدة لتسهيل الخدمات الطلابية والأكاديمية ضمن خطتها للتحول الرقمي وتطوير الخدمات الإلكترونية', 'A scientific conference was held at the university with the participation of researchers and academics from various universities to discuss the latest developments.', '/image/a1.jpg', '2025-06-04 01:37:16', '2025-05-12 10:00:00', 3, 2, 80, 0, 1, 6, 'new-university-platform', 'منصة إلكترونية,خدمات طلابية,تحول رقمي', 'conference, research, academic, scientific development');

-- --------------------------------------------------------

--
-- بنية الجدول `news_authors`
--

CREATE TABLE `news_authors` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `name_en` varchar(100) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `title_en` varchar(100) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `bio_en` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `articles_count` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `news_authors`
--

INSERT INTO `news_authors` (`id`, `name`, `name_en`, `title`, `title_en`, `bio`, `bio_en`, `image_url`, `is_active`, `articles_count`) VALUES
(1, 'د. محمد أحمد', 'د. محمد أحمد (EN)', 'رئيس قسم الإعلام', 'EN: رئيس قسم الإعلام', 'دكتوراه في الإعلام والاتصال، له العديد من المؤلفات في مجال الإعلام الرقمي', 'د. محمد أحمد (EN) has been working at the university for several years, contributing significantly to the development of academic programs and research initiatives. They hold a PhD from a prestigious university and have received several awards for their academic achievements.', '/images/authors/mohamed.jpg', 1, 0),
(2, 'أ. سارة خالد', 'أ. سارة خالد (EN)', 'مديرة العلاقات العامة', 'EN: مديرة العلاقات العامة', 'متخصصة في العلاقات العامة والإعلام المؤسسي، تعمل في الجامعة منذ 10 سنوات', 'أ. سارة خالد (EN) specializes in media and communications with extensive experience in university public relations. They have played a key role in enhancing the university\'s media presence and establishing effective communication channels with the community.', '/images/authors/sara.jpg', 1, 0),
(3, 'د. أحمد علي', 'د. أحمد علي (EN)', 'عميد كلية الهندسة', 'EN: عميد كلية الهندسة', 'دكتوراه في الهندسة الميكانيكية، له العديد من الأبحاث المنشورة في مجلات علمية عالمية', 'د. أحمد علي (EN) is a talented writer and researcher who has contributed numerous articles and research papers to academic and public publications. Their work focuses on educational development and academic innovation.', '/images/authors/ahmed.jpg', 1, 0);

-- --------------------------------------------------------

--
-- بنية الجدول `news_categories`
--

CREATE TABLE `news_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `name_en` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `icon` text DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `display_order` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `news_categories`
--

INSERT INTO `news_categories` (`id`, `name`, `name_en`, `description`, `description_en`, `icon`, `is_active`, `display_order`) VALUES
(1, 'أخبار الجامعة', 'University News', 'أحدث أخبار الجامعة والفعاليات الرسمية', 'Latest university news and updates', 'university', 1, 1),
(2, 'إعلانات', 'Announcements', 'إعلانات هامة للطلاب وأعضاء هيئة التدريس', 'Important announcements and notifications', 'announcement', 1, 2),
(3, 'إنجازات', 'EN: إنجازات', 'إنجازات الجامعة والطلاب وأعضاء هيئة التدريس', 'English description for: إنجازات', 'achievement', 1, 3),
(4, 'فعاليات', 'Events', 'فعاليات وأنشطة الجامعة المختلفة', 'Events and activities at the university', 'event', 1, 4),
(5, 'مقالات علمية', 'EN: مقالات علمية', 'مقالات علمية وبحثية', 'Articles and opinion pieces', 'research', 1, 5);

-- --------------------------------------------------------

--
-- بنية الجدول `news_media`
--

CREATE TABLE `news_media` (
  `id` int(11) NOT NULL,
  `news_id` int(11) NOT NULL,
  `media_type` enum('image','video','embed') NOT NULL,
  `url` varchar(255) NOT NULL,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `caption_en` varchar(255) DEFAULT NULL,
  `display_order` int(11) DEFAULT 0,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `news_media`
--

INSERT INTO `news_media` (`id`, `news_id`, `media_type`, `url`, `thumbnail_url`, `caption`, `caption_en`, `display_order`, `width`, `height`, `duration`, `is_active`) VALUES
(4, 3, 'image', '/images/news/innovation-team.jpg', '/images/news/innovation-team-thumb.jpg', 'فريق كلية الهندسة الفائز بالمركز الأول', 'Students participating in community service activities and volunteer work', 1, 1200, 800, NULL, 1),
(5, 3, 'image', '/images/news/innovation-project.jpg', '/images/news/innovation-project-thumb.jpg', 'المشروع الفائز في مسابقة الابتكار', 'Workshop activities and interactive discussions between participants', 2, 1200, 800, NULL, 1),
(6, 3, 'video', '/videos/innovation-interview.mp4', '/images/news/innovation-video-thumb.jpg', 'مقابلة مع أعضاء الفريق الفائز', 'University president during his speech at the opening ceremony', 3, 1920, 1080, 240, 1),
(7, 6, 'image', '/images/news/platform-screenshot.jpg', '/images/news/platform-screenshot-thumb.jpg', 'لقطة من المنصة الإلكترونية الجديدة', 'Honoring outstanding students and participants for their achievements', 1, 1200, 800, NULL, 1),
(8, 6, 'video', '/videos/platform-tutorial.mp4', '/images/news/platform-video-thumb.jpg', 'شرح استخدام المنصة الإلكترونية الجديدة', 'Image from the university event showing participants and attendees', 2, 1920, 1080, 300, 1);

-- --------------------------------------------------------

--
-- بنية الجدول `president_message`
--

CREATE TABLE `president_message` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `title_en` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `message_en` text NOT NULL,
  `president_name` varchar(255) NOT NULL,
  `president_name_en` varchar(255) NOT NULL,
  `president_title` varchar(255) NOT NULL,
  `president_title_en` varchar(255) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `president_message`
--

INSERT INTO `president_message` (`id`, `title`, `title_en`, `message`, `message_en`, `president_name`, `president_name_en`, `president_title`, `president_title_en`, `image_path`, `last_updated`) VALUES
(1, 'كلمة رئيسة الجامعة', 'President Message', 'ارحب بكم في جامعة  الريادة الصرح العلمي الذي يجمع بين الاصالة والابتكار وبين النظري والتطبيق , يسعى باستمرار لصناعة الغد وقادة المستقبل في بيئة محفزة على الابداع , تدمج بين المعرفة الرصينة والمهارات العصرية.\nاننا على يقين انّ كل طالب وطالبة هو قصة نجاح قادمة , وأن كل بحثٍ علمي هو خطوة نحو تنمية المجتمع . لذا تلتزم الجامعة بجودة التعليم , وتسعى لتأهيل قاًدةٍ يسهمون في بناء المعرفة والاقتصاد.\nختامًا نتمنى لكم في مسيرتكم الجامعية عاما جامعيا سعيدا وحافلا بالعلم والجد والاجتهاد متمنين لكم التوفيق والنجاح ', 'Welcome to Al-Riyada University, where we strive to provide a distinguished educational environment that combines authenticity and modernity. We are committed to graduating a generation of leaders and innovators capable of contributing to community development and building the future.', 'أ.د: نهلة صالح الكعكي', 'Prof: Nahla Saleh AL_kaki', 'رئيسة جامعة الريادة', 'President of Al-Riyada University', '/image/1.jpg', '2025-07-10 08:28:59');

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
(1, 1, 'تطبيق ذكي للرعاية الصحية', 'Smart Healthcare Application', 'تطوير تطبيق ذكي للهواتف الذكية يساعد في متابعة الحالة الصحية وتقديم توصيات شخصية.', 'Development of a smart mobile application that helps in monitoring health status and providing personalized recommendations.', '/images/it-project1.jpg', '2025-06-01 19:13:41', '2025-06-21 01:42:37'),
(2, 1, 'نظام إدارة تعليمي', 'Educational Management System', 'تصميم وتطوير نظام إدارة تعليمي متكامل يدعم التعلم عن بعد والتفاعل بين الطلاب والمعلمين.', 'Design and development of an integrated educational management system that supports distance learning and interaction between students and teachers.', '/images/it-project2.jpg', '2025-06-01 19:13:41', '2025-06-21 01:42:37'),
(3, 2, 'تصميم مبنى سكني مستدام', 'Sustainable Residential Building Design', 'مشروع طلابي لتصميم مبنى سكني يعتمد على مبادئ الاستدامة والطاقة المتجددة.', 'Student project to design a residential building based on sustainability principles and renewable energy.', '/images/arch-project1.jpg', '2025-06-03 11:46:58', '2025-06-21 01:42:37'),
(4, 2, 'إعادة تأهيل المباني التراثية', NULL, 'دراسة وتصميم لإعادة تأهيل المباني التراثية مع الحفاظ على قيمتها التاريخية.', NULL, '/images/arch-project2.jpg', '2025-06-03 11:46:58', '2025-06-03 11:46:58'),
(5, 2, 'تصميم مركز ثقافي', NULL, 'تصميم مركز ثقافي متعدد الاستخدامات يعكس الهوية المحلية ويلبي احتياجات المجتمع.', NULL, '/images/arch-project3.jpg', '2025-06-03 11:46:58', '2025-06-03 11:46:58'),
(6, 3, 'تطبيق نظام محاسبة تكاليف لشركة صناعية', 'Cost Accounting System Implementation for a Manufacturing Company', 'دراسة حالة وتطبيق عملي لنظام محاسبة تكاليف متكامل لشركة صناعية، مع تحليل النتائج وتقديم التوصيات.', NULL, '/images/accounting-project1.jpg', '2025-06-04 14:41:08', '2025-06-04 14:41:08'),
(7, 3, 'تحليل أثر تطبيق المعايير الدولية (IFRS) على القوائم المالية لشركة مساهمة', 'Impact Analysis of IFRS Adoption on Financial Statements of a Listed Company', 'بحث تحليلي يقيم مدى تأثر القوائم المالية لشركة مساهمة عامة بتطبيق المعايير المحاسبية الدولية.', NULL, '/images/accounting-project2.jpg', '2025-06-04 14:41:08', '2025-06-04 14:41:08'),
(8, 3, 'دراسة جدوى محاسبية لمشروع استثماري جديد', 'Accounting Feasibility Study for a New Investment Project', 'إعداد دراسة جدوى شاملة من الناحية المحاسبية والمالية لمشروع استثماري مقترح، وتقييم مدى ربحيته ومخاطره.', NULL, '/images/accounting-project3.jpg', '2025-06-04 14:41:08', '2025-06-04 14:41:08'),
(9, 4, 'تطوير استراتيجية تسويق رقمي', 'Digital Marketing Strategy Development', 'مشروع طلابي لتطوير استراتيجية تسويق رقمي لشركة ناشئة محلية.', 'A student project to develop a digital marketing strategy for a local startup.', '/images/project1.jpg', '2025-06-04 14:57:16', '2025-06-04 14:57:16'),
(10, 4, 'دراسة جدوى اقتصادية', 'Feasibility Study', 'إعداد دراسة جدوى اقتصادية لمشروع استثماري في قطاع التجزئة.', 'Preparing a feasibility study for an investment project in the retail sector.', '/images/project2.jpg', '2025-06-04 14:57:16', '2025-06-04 14:57:16'),
(11, 4, 'تحسين العمليات الإدارية', 'Improving Administrative Processes', 'مشروع لتحسين العمليات الإدارية وزيادة الكفاءة في إحدى المؤسسات الحكومية.', 'A project to improve administrative processes and increase efficiency in a government institution.', '/images/project3.jpg', '2025-06-04 14:57:16', '2025-06-04 14:57:16'),
(12, 5, 'بناء محفظة استثمارية متوازنة', 'Building a Balanced Investment Portfolio', 'مشروع طلابي لبناء وإدارة محفظة استثمارية متوازنة وقياس أدائها.', 'A student project to build and manage a balanced investment portfolio and measure its performance.', '/images/finance-project1.jpg', '2025-06-04 14:58:35', '2025-06-04 14:58:35'),
(13, 5, 'تحليل الأسواق المالية', 'Financial Markets Analysis', 'دراسة تحليلية للأسواق المالية المحلية والعالمية وتأثيرها على الاقتصاد.', 'An analytical study of local and global financial markets and their impact on the economy.', '/images/finance-project2.jpg', '2025-06-04 14:58:35', '2025-06-04 14:58:35'),
(14, 5, 'نموذج تقييم مخاطر الاستثمار', 'Investment Risk Assessment Model', 'تطوير نموذج لتقييم مخاطر الاستثمار في المشاريع الناشئة.', 'Developing a model to assess investment risks in startups.', '/images/finance-project3.jpg', '2025-06-04 14:58:35', '2025-06-04 14:58:35'),
(15, 6, 'حملة تسويقية متكاملة', 'Integrated Marketing Campaign', 'تصميم وتنفيذ حملة تسويقية متكاملة لمنتج جديد في السوق المحلي.', 'Designing and implementing an integrated marketing campaign for a new product in the local market.', '/images/marketing-project1.jpg', '2025-06-04 15:00:17', '2025-06-04 15:00:17'),
(16, 6, 'استراتيجية تسويق رقمي', 'Digital Marketing Strategy', 'تطوير استراتيجية تسويق رقمي لشركة ناشئة وتحقيق نمو في المبيعات.', 'Developing a digital marketing strategy for a startup and achieving sales growth.', '/images/marketing-project2.jpg', '2025-06-04 15:00:17', '2025-06-04 15:00:17'),
(17, 6, 'دراسة سلوك المستهلك', 'Consumer Behavior Study', 'بحث ميداني حول سلوك المستهلك وتفضيلاته في قطاع معين.', 'Field research on consumer behavior and preferences in a specific sector.', '/images/marketing-project3.jpg', '2025-06-04 15:00:17', '2025-06-04 15:00:17'),
(18, 7, 'تقنيات حديثة في زراعة الأسنان', 'Modern Techniques in Dental Implantation', 'دراسة حول تقنيات زراعة الأسنان الحديثة ومعدلات نجاحها على المدى الطويل.', 'A study on modern dental implantation techniques and their long-term success rates.', '/images/dental-project1.jpg', '2025-06-04 15:02:01', '2025-06-04 15:02:01'),
(19, 7, 'مواد ترميمية جديدة', 'New Restorative Materials', 'تقييم فعالية مواد ترميمية جديدة في علاج تسوس الأسنان ومقارنتها بالمواد التقليدية.', 'Evaluating the effectiveness of new restorative materials in treating dental caries and comparing them with traditional materials.', '/images/dental-project2.jpg', '2025-06-04 15:02:01', '2025-06-04 15:02:01'),
(20, 7, 'برنامج توعية صحة الفم', 'Oral Health Awareness Program', 'تصميم وتنفيذ برنامج توعوي لتعزيز صحة الفم والأسنان في المدارس الابتدائية.', 'Designing and implementing an awareness program to promote oral and dental health in elementary schools.', '/images/dental-project3.jpg', '2025-06-04 15:02:01', '2025-06-04 15:02:01'),
(21, 8, 'تطوير طرق تشخيصية جديدة', 'Development of New Diagnostic Methods', 'دراسة لتطوير طرق تشخيصية سريعة ودقيقة للكشف عن الأمراض المعدية.', 'A study to develop rapid and accurate diagnostic methods for detecting infectious diseases.', '/images/lab-project1.jpg', '2025-06-04 15:02:24', '2025-06-04 15:02:24'),
(22, 8, 'تقييم اختبارات مخبرية', 'Evaluation of Laboratory Tests', 'تقييم دقة وفعالية الاختبارات المخبرية المستخدمة في تشخيص أمراض الدم.', 'Evaluating the accuracy and effectiveness of laboratory tests used in diagnosing blood diseases.', '/images/lab-project2.jpg', '2025-06-04 15:02:24', '2025-06-04 15:02:24'),
(23, 8, 'نظام إدارة جودة المختبرات', 'Laboratory Quality Management System', 'تصميم وتطبيق نظام لإدارة الجودة في المختبرات الطبية وفق المعايير الدولية.', 'Designing and implementing a quality management system in medical laboratories according to international standards.', '/images/lab-project3.jpg', '2025-06-04 15:02:24', '2025-06-04 15:02:24'),
(24, 9, 'دراسة وبائية محلية', 'Local Epidemiological Study', 'دراسة وبائية حول انتشار الأمراض المزمنة في المجتمع المحلي وعوامل الخطر المرتبطة بها.', 'An epidemiological study on the prevalence of chronic diseases in the local community and associated risk factors.', '/images/med-project1.jpg', '2025-06-04 15:02:38', '2025-06-04 15:02:38'),
(25, 9, 'تطوير بروتوكول علاجي', 'Development of a Treatment Protocol', 'تطوير وتقييم بروتوكول علاجي جديد لإدارة مرضى السكري من النوع الثاني.', 'Developing and evaluating a new treatment protocol for managing type 2 diabetes patients.', '/images/med-project2.jpg', '2025-06-04 15:02:38', '2025-06-04 15:02:38'),
(26, 9, 'تطبيق للرعاية الصحية', 'Healthcare Application', 'تصميم تطبيق ذكي للهواتف المحمولة لمتابعة الحالة الصحية للمرضى عن بعد.', 'Designing a smart mobile application for remote patient health monitoring.', '/images/med-project3.jpg', '2025-06-04 15:02:38', '2025-06-04 15:02:38'),
(27, 10, 'تطوير نظام توصيل دوائي', 'Development of a Drug Delivery System', 'تصميم وتطوير نظام توصيل دوائي جديد لتحسين فعالية العلاج وتقليل الآثار الجانبية.', 'Designing and developing a new drug delivery system to improve treatment efficacy and reduce side effects.', '/images/pharma-project1.jpg', '2025-06-04 15:02:56', '2025-06-04 15:02:56'),
(28, 10, 'دراسة تفاعلات دوائية', 'Study of Drug Interactions', 'دراسة التفاعلات بين الأدوية المستخدمة في علاج الأمراض المزمنة وتأثيرها على فعالية العلاج.', 'Studying interactions between drugs used in treating chronic diseases and their impact on treatment effectiveness.', '/images/pharma-project2.jpg', '2025-06-04 15:02:56', '2025-06-04 15:02:56'),
(29, 10, 'استخلاص مواد فعالة طبيعية', 'Extraction of Natural Active Compounds', 'استخلاص وتحليل مواد فعالة طبيعية من النباتات المحلية ودراسة تأثيراتها العلاجية.', 'Extracting and analyzing natural active compounds from local plants and studying their therapeutic effects.', '/images/pharma-project3.jpg', '2025-06-04 15:02:56', '2025-06-04 15:02:56');

-- --------------------------------------------------------

--
-- بنية الجدول `skills`
--

CREATE TABLE `skills` (
  `id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `skill_name` varchar(255) NOT NULL,
  `skill_name_en` varchar(255) NOT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `skills`
--

INSERT INTO `skills` (`id`, `program_id`, `skill_name`, `skill_name_en`, `icon`, `created_at`, `updated_at`) VALUES
(1, 1, 'إدارة المشاريع التقنية', 'Technical Project Management', '🎛', '2025-06-03 11:30:02', '2025-06-25 08:05:40'),
(2, 1, 'الذكاء الاصطناعي', 'Artificial Intelligence', 'robot', '2025-06-03 11:30:02', '2025-06-16 05:39:31'),
(3, 1, 'أمن المعلومات', 'Information Security', 'shield', '2025-06-03 11:30:02', '2025-06-16 05:39:31'),
(4, 1, 'تطوير التطبيقات', 'Application Development', 'app', '2025-06-03 11:30:02', '2025-06-16 05:39:31'),
(5, 1, 'تحليل البيانات', 'Data Analysis', 'search', '2025-06-03 11:30:02', '2025-06-16 05:39:31'),
(6, 1, 'البرمجة المتقدمة', 'Advanced Programming', 'laptop', '2025-06-03 11:30:02', '2025-06-16 05:39:31'),
(7, 2, 'التصميم المعماري', 'Architectural Design', '🏛️', '2025-06-03 11:45:07', '2025-06-16 05:42:13'),
(8, 2, 'الرسم والتصور', 'Drawing and Visualization', '🖌️', '2025-06-03 11:45:07', '2025-06-16 05:42:13'),
(9, 2, 'برامج التصميم', 'Design Software', '💻', '2025-06-03 11:45:07', '2025-06-16 05:42:13'),
(10, 2, 'التصميم المستدام', 'Sustainable Design', '🌱', '2025-06-03 11:45:07', '2025-06-16 05:42:13'),
(11, 2, 'تحليل المشكلات', 'Problem Analysis', '🔍', '2025-06-03 11:45:07', '2025-06-16 05:42:13'),
(12, 3, 'تحليل القوائم المالية', 'Financial Statement Analysis', '📊', '2025-06-04 14:42:02', '2025-06-16 05:42:13'),
(13, 3, 'إعداد التقارير المالية', 'Financial Reporting', '🧾', '2025-06-04 14:42:02', '2025-06-16 05:42:13'),
(14, 3, 'استخدام برامج المحاسبة (مثل QuickBooks, SAP)', 'Accounting Software Proficiency (e.g., QuickBooks, SAP)', '💻', '2025-06-04 14:42:02', '2025-06-16 05:42:13'),
(15, 3, 'التدقيق الداخلي والخارجي', 'Internal and External Auditing', '🔍', '2025-06-04 14:42:02', '2025-06-16 05:42:13'),
(16, 3, 'التخطيط المالي وإعداد الموازنات', 'Financial Planning and Budgeting', '🎯', '2025-06-04 14:42:02', '2025-06-16 05:42:13'),
(17, 3, 'تطبيق المعايير المحاسبية الدولية', 'IFRS Application', '🌍', '2025-06-04 14:42:02', '2025-06-16 05:42:13'),
(18, 3, 'التحليل النقدي للمعلومات المالية', 'Financial Data Analysis', '💡', '2025-06-04 14:42:02', '2025-06-16 05:42:13'),
(19, 3, 'مهارات الاتصال وعرض النتائج المالية', 'Communication and Presentation of Financial Results', '🗣️', '2025-06-04 14:42:02', '2025-06-16 05:42:13'),
(20, 4, 'التخطيط الاستراتيجي', 'Strategic Planning', '📊', '2025-06-04 14:57:16', '2025-06-16 05:42:13'),
(21, 4, 'إدارة فرق العمل', 'Team Management', '👥', '2025-06-04 14:57:16', '2025-06-16 05:42:13'),
(22, 4, 'حل المشكلات', 'Problem Solving', '🔍', '2025-06-04 14:57:16', '2025-06-16 05:42:13'),
(23, 4, 'اتخاذ القرار', 'Decision Making', '💼', '2025-06-04 14:57:16', '2025-06-16 05:42:13'),
(24, 4, 'التواصل الفعال', 'Effective Communication', '🗣️', '2025-06-04 14:57:16', '2025-06-16 05:42:13'),
(25, 4, 'التحليل المالي', 'Financial Analysis', '📈', '2025-06-04 14:57:16', '2025-06-16 05:42:14'),
(26, 5, 'التحليل المالي', '', '📊', '2025-06-04 14:58:35', '2025-06-04 14:58:35'),
(27, 5, 'إدارة المخاطر', 'Risk Management', '⚖️', '2025-06-04 14:58:35', '2025-06-16 05:42:14'),
(28, 5, 'تخطيط الاستثمار', 'Investment Planning', '📈', '2025-06-04 14:58:35', '2025-06-16 05:42:14'),
(29, 5, 'إدارة المحافظ الاستثمارية', 'Portfolio Management', '💼', '2025-06-04 14:58:35', '2025-06-16 05:42:14'),
(30, 5, 'التقييم المالي', 'Financial Evaluation', '🔍', '2025-06-04 14:58:35', '2025-06-16 05:42:14'),
(31, 5, 'فهم الأسواق المالية', 'Understanding Financial Markets', '🌐', '2025-06-04 14:58:35', '2025-06-16 05:42:14'),
(32, 6, 'تحليل السوق', 'Market Analysis', '📊', '2025-06-04 15:00:17', '2025-06-16 05:42:14'),
(33, 6, 'التسويق الرقمي', 'Digital Marketing', '💻', '2025-06-04 15:00:17', '2025-06-16 05:42:14'),
(34, 6, 'إدارة الحملات الإعلانية', 'Advertising Campaign Management', '📱', '2025-06-04 15:00:17', '2025-06-16 05:42:14'),
(35, 6, 'التواصل والإقناع', 'Communication and Persuasion', '🗣️', '2025-06-04 15:00:17', '2025-06-16 05:42:14'),
(36, 6, 'استهداف الجمهور', 'Audience Targeting', '🎯', '2025-06-04 15:00:17', '2025-06-16 05:42:14'),
(37, 6, 'تحليل البيانات', '', '🔍', '2025-06-04 15:00:17', '2025-06-04 15:00:17'),
(38, 7, 'التشخيص السني', 'Dental Diagnosis', '🔍', '2025-06-04 15:02:00', '2025-06-16 05:42:14'),
(39, 7, 'العلاج الترميمي', 'Restorative Treatment', '🦷', '2025-06-04 15:02:00', '2025-06-16 05:42:14'),
(40, 7, 'تركيب الأسنان', 'Dental Prosthetics', '🔧', '2025-06-04 15:02:00', '2025-06-16 05:42:14'),
(41, 7, 'الجراحة السنية', 'Oral Surgery', '💉', '2025-06-04 15:02:00', '2025-06-16 05:42:14'),
(42, 7, 'التفكير النقدي', 'Critical Thinking', '🧠', '2025-06-04 15:02:00', '2025-06-16 05:42:14'),
(43, 7, 'التواصل مع المرضى', 'Patient Communication', '🗣️', '2025-06-04 15:02:00', '2025-06-16 05:42:14'),
(44, 8, 'تقنيات المختبرات', 'Laboratory Techniques', '🔬', '2025-06-04 15:02:24', '2025-06-16 05:42:14'),
(45, 8, 'التحليل الكيميائي', 'Chemical Analysis', '🧪', '2025-06-04 15:02:24', '2025-06-16 05:42:14'),
(46, 8, 'الفحص المجهري', 'Microscopic Examination', '🔍', '2025-06-04 15:02:24', '2025-06-16 05:42:14'),
(47, 8, 'تفسير النتائج', 'Results Interpretation', '📊', '2025-06-04 15:02:24', '2025-06-16 05:42:14'),
(48, 8, 'تشغيل الأجهزة المخبرية', 'Laboratory Equipment Operation', '⚙️', '2025-06-04 15:02:24', '2025-06-16 05:42:14'),
(49, 8, 'ضبط الجودة', 'Quality Control', '📝', '2025-06-04 15:02:24', '2025-06-16 05:42:14'),
(50, 9, 'التشخيص السريري', 'Clinical Diagnosis', '🔍', '2025-06-04 15:02:38', '2025-06-16 05:42:14'),
(51, 9, 'المهارات الإكلينيكية', 'Clinical Skills', '💉', '2025-06-04 15:02:38', '2025-06-16 05:42:14'),
(52, 9, 'التفكير النقدي', '', '🧠', '2025-06-04 15:02:38', '2025-06-04 15:02:38'),
(53, 9, 'التواصل مع المرضى', '', '🗣️', '2025-06-04 15:02:38', '2025-06-04 15:02:38'),
(54, 9, 'تفسير الفحوصات', 'Test Results Interpretation', '📊', '2025-06-04 15:02:38', '2025-06-16 05:42:14'),
(55, 9, 'البحث العلمي', 'Scientific Research', '🔬', '2025-06-04 15:02:38', '2025-06-16 05:42:14'),
(56, 10, 'صرف الأدوية', 'Dispensing Medications', '💊', '2025-06-04 15:02:56', '2025-06-16 05:42:14'),
(57, 10, 'تركيب الأدوية', 'Compounding Medications', '🧪', '2025-06-04 15:02:56', '2025-06-16 05:42:14'),
(58, 10, 'تحليل الأدوية', 'Medication Analysis', '📊', '2025-06-04 15:02:56', '2025-06-16 05:42:14'),
(59, 10, 'مراقبة الجودة', 'Quality Assurance', '🔍', '2025-06-04 15:02:56', '2025-06-16 05:42:14'),
(60, 10, 'الإرشاد الدوائي', 'Pharmacological Guidance', '🗣️', '2025-06-04 15:02:56', '2025-06-16 05:42:14'),
(61, 10, 'البحث والتطوير', 'Research and Development', '📝', '2025-06-04 15:02:56', '2025-06-16 05:42:14');

-- --------------------------------------------------------

--
-- بنية الجدول `social_links`
--

CREATE TABLE `social_links` (
  `social_id` int(11) NOT NULL,
  `section_id` int(11) NOT NULL,
  `platform` varchar(50) NOT NULL,
  `icon` varchar(50) NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `social_links`
--

INSERT INTO `social_links` (`social_id`, `section_id`, `platform`, `icon`, `url`) VALUES
(4, 3, '', 'FaFacebook', 'https://facebook.com'),
(5, 3, '', 'FaTwitter', 'https://twitter.com'),
(6, 3, '', 'FaInstagram', 'https://instagram.com'),
(7, 3, '', 'FaLinkedin', 'https://linkedin.com');

-- --------------------------------------------------------

--
-- بنية الجدول `stats_section`
--

CREATE TABLE `stats_section` (
  `id` int(11) NOT NULL,
  `college_id` int(11) NOT NULL,
  `stat_number` varchar(50) DEFAULT NULL,
  `stat_label` varchar(255) DEFAULT NULL,
  `stat_label_en` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `stats_section`
--

INSERT INTO `stats_section` (`id`, `college_id`, `stat_number`, `stat_label`, `stat_label_en`) VALUES
(1, 1, '?+', 'معمل هندسي', 'Engineering Labs'),
(2, 1, '?+', 'أستاذ وأستاذة', 'Faculty Members'),
(3, 1, '?+', 'طالب وطالبة', 'Students'),
(4, 2, '?+', 'مختبر طبي', 'Medical Labs'),
(5, 2, '?+', 'أستاذ وأستاذة', 'Faculty Members'),
(6, 2, '?+', 'طالب وطالبة', 'Students'),
(7, 3, '+?', 'قاعة دراسية مجهزة', 'Equipped Classrooms'),
(8, 3, '+?', 'أستاذ وأستاذة', 'Faculty Members');

-- --------------------------------------------------------

--
-- بنية الجدول `universityintrovideo`
--

CREATE TABLE `universityintrovideo` (
  `id` int(11) NOT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `description_ar` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- بنية الجدول `university_goals`
--

CREATE TABLE `university_goals` (
  `id` int(11) NOT NULL,
  `goal_title` varchar(255) NOT NULL,
  `goal_description` text NOT NULL,
  `goal_order` int(11) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `language` varchar(10) NOT NULL DEFAULT 'ar',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `university_goals`
--

INSERT INTO `university_goals` (`id`, `goal_title`, `goal_description`, `goal_order`, `icon`, `language`, `created_at`, `updated_at`) VALUES
(1, 'التميز الأكاديمي', 'إعداد خريجين متميزين في مجالات العلوم التطبيقية والإنسانية، بما يحقق متطلبات التنمية واحتياجات المجتمع وسوق العمل.', 1, 'academic', 'ar', '2025-07-05 13:51:13', '2025-07-05 14:09:17'),
(2, 'روابط قوية ', 'تقوية الروابط بين الجامعة والمجتمع بما يتلاءم ومنظومة القيم الوطنية للمجتمع اليمني.', 2, 'research', 'ar', '2025-07-05 13:51:13', '2025-07-05 14:09:44'),
(3, 'خدمة المجتمع', 'تسهيل النشاط البحثي والعلمي والاجتماعي وتطويره.', 3, 'community', 'ar', '2025-07-05 13:51:13', '2025-07-05 14:10:03'),
(4, 'التطوير المستمر', 'السعي لتحقيق معايير الجودة الشاملة لترسيخ مقومات اعتماد الجامعة وبرامجها الأكاديمية وتعزيز سمعتها محلياً وإقليمياً.', 4, 'development', 'ar', '2025-07-05 13:51:13', '2025-07-05 14:10:34'),
(5, 'الروابط العلمية ', 'إقامة الروابط العلمية وتبادل الخبرات مع الجامعات والمؤسسات العلمية والهيئات المتميزة والمرموقة.', 5, '✨', 'ar', '2025-07-05 14:12:10', '2025-07-05 14:12:30'),
(6, 'المواقف الإيجابية', 'تنمية المواقف الإيجابية نحو التعلم المستمر والعمل على تعزيز مهارات العمل الجماعي وروح التعاون والمسؤولية والالتزام الأخلاقي لدى الخريج.', 6, '🧨', 'ar', '2025-07-05 14:14:36', '2025-07-05 14:14:36'),
(7, 'بيئة اكاديمية ممتازة', 'توفير بيئة أكاديمية مساعدة على حرية الفكر والتعبير بما لا يتعارض مع القيم الاجتماعية.', 7, '🎢', 'ar', '2025-07-05 14:14:36', '2025-07-05 14:14:36'),
(8, 'التشجيع ', 'التشجيع المهني وتشجيع التأليف والترجمة والنشر.', 8, '🎞', 'ar', '2025-07-05 14:15:16', '2025-07-05 14:15:16'),
(9, 'Academic Excellence', 'The university aims to graduate distinguished students in the fields of applied and human sciences in a way that meets the requirements of development and the needs of society and the labor market.\r\n\r\n', 1, 'academic', 'en', '2025-07-05 13:51:13', '2025-07-07 16:45:02'),
(10, 'Strong ties', 'Encourage scientific research, innovation, and creativity, and create a competitive environment to address societal problems using available and modern resources.\r\n\r\n', 2, 'research', 'en', '2025-07-05 13:51:13', '2025-07-05 14:20:29'),
(11, 'Community Service', 'Strengthen the relationship between the university and the community in alignment with the values and systems of Yemeni society.\r\n\r\n', 3, 'community', 'en', '2025-07-05 13:51:13', '2025-07-05 14:21:08'),
(12, 'Continuous Development', 'Facilitate and develop research, scientific, and social activities through the studies and consultations offered by the university.\r\n\r\n', 4, 'development', 'en', '2025-07-05 13:51:13', '2025-07-05 14:21:34'),
(13, 'Scientific ties', 'Strive to meet comprehensive quality standards to establish the foundations of university and academic program accreditation and enhance the university’s reputation locally and regionally.\r\n\r\n', 5, '✨', 'en', '2025-07-05 14:22:18', '2025-07-07 16:45:02'),
(14, 'Positive attitudes', 'Establish scientific links and exchange expertise with universities, scientific institutions, and distinguished global bodies.\r\n\r\n', 6, '🧨', 'en', '2025-07-05 14:24:09', '2025-07-07 16:45:02'),
(15, 'Excellent academic environment\r\n', 'Promote positive attitudes towards continuous learning, and enhance teamwork skills, cooperation, responsibility, and ethical commitment among graduates.\r\n\r\n', 7, '🎢', 'en', '2025-07-05 14:24:09', '2025-07-07 16:45:02'),
(16, 'Encouragement', 'Promote professionalism, authorship, translation, and publishing.', 8, '🎞', 'en', '2025-07-05 14:28:44', '2025-07-07 16:45:02');

-- --------------------------------------------------------

--
-- بنية الجدول `university_mission`
--

CREATE TABLE `university_mission` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `language` varchar(10) NOT NULL DEFAULT 'ar',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `university_mission`
--

INSERT INTO `university_mission` (`id`, `title`, `content`, `language`, `created_at`, `updated_at`) VALUES
(1, 'سالة الجامعة', 'إعداد كوادر مؤهلة في مختلف التخصصات، وتقديم برامج علمية عالية الجودة متوافقة مع متطلبات التنمية واحتياجات سوق العمل ضمن بيئة تعليمية محفزة على الإبداع والتميز وتطوير الشراكات مع الجامعات والمؤسسات العلمية والهيئات المتميزة عالمياً.', 'ar', '2025-07-05 13:51:13', '2025-07-07 16:55:55'),
(2, 'University Mission', 'Preparing qualified personnel in various disciplines and offering high-quality academic programs aligned with development requirements and labor market needs, within a learning environment that fosters creativity and excellence, while developing partnerships with universities, scientific institutions, and globally distinguished bodies.', 'en', '2025-07-05 13:51:13', '2025-07-05 14:08:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about_achievements`
--
ALTER TABLE `about_achievements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `about_achievements_section`
--
ALTER TABLE `about_achievements_section`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `about_features`
--
ALTER TABLE `about_features`
  ADD PRIMARY KEY (`id`),
  ADD KEY `about_id` (`about_id`);

--
-- Indexes for table `about_guidelines`
--
ALTER TABLE `about_guidelines`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `about_guidelines_section`
--
ALTER TABLE `about_guidelines_section`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `about_hero_section`
--
ALTER TABLE `about_hero_section`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `about_intro_section`
--
ALTER TABLE `about_intro_section`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `about_rules`
--
ALTER TABLE `about_rules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `about_rules_section`
--
ALTER TABLE `about_rules_section`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `about_statistics`
--
ALTER TABLE `about_statistics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `about_stats`
--
ALTER TABLE `about_stats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `about_id` (`about_id`);

--
-- Indexes for table `about_university`
--
ALTER TABLE `about_university`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `academic_programs`
--
ALTER TABLE `academic_programs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `college_id` (`college_id`);

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `activity_categories`
--
ALTER TABLE `activity_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `activity_media`
--
ALTER TABLE `activity_media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `activity_id` (`activity_id`);

--
-- Indexes for table `activity_participants`
--
ALTER TABLE `activity_participants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `activity_id` (`activity_id`);

--
-- Indexes for table `activity_schedule`
--
ALTER TABLE `activity_schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `activity_id` (`activity_id`);

--
-- Indexes for table `alumni`
--
ALTER TABLE `alumni`
  ADD PRIMARY KEY (`id`),
  ADD KEY `major_id` (`major_id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indexes for table `alumni_achievements`
--
ALTER TABLE `alumni_achievements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `alumni_id` (`alumni_id`);

--
-- Indexes for table `alumni_colleges`
--
ALTER TABLE `alumni_colleges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `alumni_companies`
--
ALTER TABLE `alumni_companies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `alumni_images`
--
ALTER TABLE `alumni_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `alumni_id` (`alumni_id`);

--
-- Indexes for table `alumni_majors`
--
ALTER TABLE `alumni_majors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_major_college` (`college_id`);

--
-- Indexes for table `alumni_settings`
--
ALTER TABLE `alumni_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `alumni_stories`
--
ALTER TABLE `alumni_stories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug_ar_unique` (`slug_ar`),
  ADD UNIQUE KEY `slug_en_unique` (`slug_en`),
  ADD KEY `alumni_id` (`alumni_id`);

--
-- Indexes for table `application_steps`
--
ALTER TABLE `application_steps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `colleges`
--
ALTER TABLE `colleges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `college_goals`
--
ALTER TABLE `college_goals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `college_id` (`college_id`);

--
-- Indexes for table `college_vision_mission`
--
ALTER TABLE `college_vision_mission`
  ADD PRIMARY KEY (`id`),
  ADD KEY `college_id` (`college_id`);

--
-- Indexes for table `contact_info`
--
ALTER TABLE `contact_info`
  ADD PRIMARY KEY (`contact_id`),
  ADD KEY `section_id` (`section_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `program_id` (`program_id`);

--
-- Indexes for table `faculties`
--
ALTER TABLE `faculties`
  ADD PRIMARY KEY (`faculty_id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `footer_copyright`
--
ALTER TABLE `footer_copyright`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `footer_links`
--
ALTER TABLE `footer_links`
  ADD PRIMARY KEY (`link_id`),
  ADD KEY `section_id` (`section_id`);

--
-- Indexes for table `footer_sections`
--
ALTER TABLE `footer_sections`
  ADD PRIMARY KEY (`section_id`);

--
-- Indexes for table `hero_slides`
--
ALTER TABLE `hero_slides`
  ADD PRIMARY KEY (`slide_id`);

--
-- Indexes for table `job_opportunities`
--
ALTER TABLE `job_opportunities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `program_id` (`program_id`);

--
-- Indexes for table `majors`
--
ALTER TABLE `majors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `college_id` (`college_id`);

--
-- Indexes for table `majorsgrid`
--
ALTER TABLE `majorsgrid`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu_items`
--
ALTER TABLE `menu_items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Indexes for table `navbar_items`
--
ALTER TABLE `navbar_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_parent` (`parent_id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `author_id` (`author_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `idx_title_en` (`title_en`),
  ADD KEY `idx_content_en` (`content_en`(255));

--
-- Indexes for table `news_authors`
--
ALTER TABLE `news_authors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_name_en` (`name_en`);

--
-- Indexes for table `news_categories`
--
ALTER TABLE `news_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_name_en` (`name_en`);

--
-- Indexes for table `news_media`
--
ALTER TABLE `news_media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `news_id` (`news_id`);

--
-- Indexes for table `president_message`
--
ALTER TABLE `president_message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `program_id` (`program_id`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `program_id` (`program_id`);

--
-- Indexes for table `social_links`
--
ALTER TABLE `social_links`
  ADD PRIMARY KEY (`social_id`),
  ADD KEY `section_id` (`section_id`);

--
-- Indexes for table `stats_section`
--
ALTER TABLE `stats_section`
  ADD PRIMARY KEY (`id`),
  ADD KEY `college_id` (`college_id`);

--
-- Indexes for table `universityintrovideo`
--
ALTER TABLE `universityintrovideo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `university_goals`
--
ALTER TABLE `university_goals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_goal_order` (`goal_order`),
  ADD KEY `idx_language` (`language`);

--
-- Indexes for table `university_mission`
--
ALTER TABLE `university_mission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_mission_lang` (`language`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about_achievements`
--
ALTER TABLE `about_achievements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `about_achievements_section`
--
ALTER TABLE `about_achievements_section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `about_features`
--
ALTER TABLE `about_features`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `about_guidelines`
--
ALTER TABLE `about_guidelines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `about_guidelines_section`
--
ALTER TABLE `about_guidelines_section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `about_hero_section`
--
ALTER TABLE `about_hero_section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `about_intro_section`
--
ALTER TABLE `about_intro_section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `about_rules`
--
ALTER TABLE `about_rules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `about_rules_section`
--
ALTER TABLE `about_rules_section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `about_statistics`
--
ALTER TABLE `about_statistics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `about_stats`
--
ALTER TABLE `about_stats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `about_university`
--
ALTER TABLE `about_university`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `academic_programs`
--
ALTER TABLE `academic_programs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `activity_categories`
--
ALTER TABLE `activity_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `activity_media`
--
ALTER TABLE `activity_media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `activity_participants`
--
ALTER TABLE `activity_participants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `activity_schedule`
--
ALTER TABLE `activity_schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `alumni`
--
ALTER TABLE `alumni`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `alumni_achievements`
--
ALTER TABLE `alumni_achievements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `alumni_colleges`
--
ALTER TABLE `alumni_colleges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `alumni_companies`
--
ALTER TABLE `alumni_companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `alumni_images`
--
ALTER TABLE `alumni_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `alumni_majors`
--
ALTER TABLE `alumni_majors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `alumni_settings`
--
ALTER TABLE `alumni_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `alumni_stories`
--
ALTER TABLE `alumni_stories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `application_steps`
--
ALTER TABLE `application_steps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `colleges`
--
ALTER TABLE `colleges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `college_goals`
--
ALTER TABLE `college_goals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `college_vision_mission`
--
ALTER TABLE `college_vision_mission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `contact_info`
--
ALTER TABLE `contact_info`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `faculties`
--
ALTER TABLE `faculties`
  MODIFY `faculty_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `footer_copyright`
--
ALTER TABLE `footer_copyright`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `footer_links`
--
ALTER TABLE `footer_links`
  MODIFY `link_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `footer_sections`
--
ALTER TABLE `footer_sections`
  MODIFY `section_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `hero_slides`
--
ALTER TABLE `hero_slides`
  MODIFY `slide_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `job_opportunities`
--
ALTER TABLE `job_opportunities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `majors`
--
ALTER TABLE `majors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `majorsgrid`
--
ALTER TABLE `majorsgrid`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `menu_items`
--
ALTER TABLE `menu_items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `navbar_items`
--
ALTER TABLE `navbar_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `news_authors`
--
ALTER TABLE `news_authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `news_categories`
--
ALTER TABLE `news_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `news_media`
--
ALTER TABLE `news_media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `president_message`
--
ALTER TABLE `president_message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `social_links`
--
ALTER TABLE `social_links`
  MODIFY `social_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `stats_section`
--
ALTER TABLE `stats_section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `universityintrovideo`
--
ALTER TABLE `universityintrovideo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `university_goals`
--
ALTER TABLE `university_goals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `university_mission`
--
ALTER TABLE `university_mission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- قيود الجداول المُلقاة.
--

--
-- قيود الجداول `about_features`
--
ALTER TABLE `about_features`
  ADD CONSTRAINT `about_features_ibfk_1` FOREIGN KEY (`about_id`) REFERENCES `about_university` (`id`);

--
-- قيود الجداول `about_stats`
--
ALTER TABLE `about_stats`
  ADD CONSTRAINT `about_stats_ibfk_1` FOREIGN KEY (`about_id`) REFERENCES `about_university` (`id`);

--
-- قيود الجداول `academic_programs`
--
ALTER TABLE `academic_programs`
  ADD CONSTRAINT `academic_programs_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `activities`
--
ALTER TABLE `activities`
  ADD CONSTRAINT `activities_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `activity_categories` (`id`) ON DELETE SET NULL;

--
-- قيود الجداول `activity_media`
--
ALTER TABLE `activity_media`
  ADD CONSTRAINT `activity_media_ibfk_1` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `activity_participants`
--
ALTER TABLE `activity_participants`
  ADD CONSTRAINT `activity_participants_ibfk_1` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `activity_schedule`
--
ALTER TABLE `activity_schedule`
  ADD CONSTRAINT `activity_schedule_ibfk_1` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `alumni`
--
ALTER TABLE `alumni`
  ADD CONSTRAINT `alumni_ibfk_1` FOREIGN KEY (`major_id`) REFERENCES `alumni_majors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `alumni_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `alumni_companies` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `alumni_achievements`
--
ALTER TABLE `alumni_achievements`
  ADD CONSTRAINT `alumni_achievements_ibfk_1` FOREIGN KEY (`alumni_id`) REFERENCES `alumni` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `alumni_images`
--
ALTER TABLE `alumni_images`
  ADD CONSTRAINT `alumni_images_ibfk_1` FOREIGN KEY (`alumni_id`) REFERENCES `alumni` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `alumni_majors`
--
ALTER TABLE `alumni_majors`
  ADD CONSTRAINT `fk_major_college` FOREIGN KEY (`college_id`) REFERENCES `alumni_colleges` (`id`) ON DELETE SET NULL;

--
-- قيود الجداول `alumni_stories`
--
ALTER TABLE `alumni_stories`
  ADD CONSTRAINT `alumni_stories_ibfk_1` FOREIGN KEY (`alumni_id`) REFERENCES `alumni` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `college_goals`
--
ALTER TABLE `college_goals`
  ADD CONSTRAINT `fk_college_goals` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- قيود الجداول `college_vision_mission`
--
ALTER TABLE `college_vision_mission`
  ADD CONSTRAINT `fk_college_vision_mission` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- قيود الجداول `contact_info`
--
ALTER TABLE `contact_info`
  ADD CONSTRAINT `contact_info_ibfk_1` FOREIGN KEY (`section_id`) REFERENCES `footer_sections` (`section_id`);

--
-- قيود الجداول `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `academic_programs` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `footer_links`
--
ALTER TABLE `footer_links`
  ADD CONSTRAINT `footer_links_ibfk_1` FOREIGN KEY (`section_id`) REFERENCES `footer_sections` (`section_id`);

--
-- قيود الجداول `job_opportunities`
--
ALTER TABLE `job_opportunities`
  ADD CONSTRAINT `job_opportunities_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `academic_programs` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `majors`
--
ALTER TABLE `majors`
  ADD CONSTRAINT `majors_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `menu_items`
--
ALTER TABLE `menu_items`
  ADD CONSTRAINT `menu_items_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `menu_items` (`item_id`);

--
-- قيود الجداول `navbar_items`
--
ALTER TABLE `navbar_items`
  ADD CONSTRAINT `fk_parent` FOREIGN KEY (`parent_id`) REFERENCES `navbar_items` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `news_media`
--
ALTER TABLE `news_media`
  ADD CONSTRAINT `news_media_ibfk_1` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `academic_programs` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `skills`
--
ALTER TABLE `skills`
  ADD CONSTRAINT `skills_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `academic_programs` (`id`) ON DELETE CASCADE;

--
-- قيود الجداول `social_links`
--
ALTER TABLE `social_links`
  ADD CONSTRAINT `social_links_ibfk_1` FOREIGN KEY (`section_id`) REFERENCES `footer_sections` (`section_id`);

--
-- قيود الجداول `stats_section`
--
ALTER TABLE `stats_section`
  ADD CONSTRAINT `stats_section_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
