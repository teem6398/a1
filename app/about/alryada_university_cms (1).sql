-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 16 يونيو 2025 الساعة 07:46
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
(4, 'فرص بحثية متنوعة', 'Diverse Research Opportunities', 4, NULL);

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
  `subtitle` varchar(255) NOT NULL DEFAULT 'المعرفة، الابتكار، المستقبل',
  `background_image` varchar(255) DEFAULT '/images/hero-bg.jpg',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `about_hero_section`
--

INSERT INTO `about_hero_section` (`id`, `title`, `subtitle`, `background_image`, `created_at`, `updated_at`) VALUES
(1, 'عن جامعة الريادة', 'المعرفة، الابتكار، المستقبل', '/images/hero-bg.jpg', '2025-05-11 20:12:47', '2025-05-11 20:12:47');

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
(1, 'من نحن', 'About Us', 'تأسست جامعة الريادة عام 2005 كمؤسسة تعليمية رائدة تهدف إلى تقديم تعليم عالي الجودة يجمع بين الأصالة والحداثة. منذ تأسيسها، حققت الجامعة العديد من الإنجازات على المستوى المحلي والإقليمي والدولي، وأصبحت واحدة من الجامعات المرموقة والمعترف بها.', 'Al-Riyada University offers high-quality education.', 'تتميز جامعة الريادة ببنية تحتية متطورة ومرافق حديثة، بما في ذلك مختبرات مجهزة بأحدث التقنيات، ومكتبة رقمية متكاملة، وقاعات دراسية ذكية، ومراكز بحثية متخصصة. كما تضم الجامعة نخبة من أعضاء هيئة التدريس ذوي الكفاءة العالية والخبرة الواسعة في مختلف المجالات.', 'We are committed to developing society through education.', '2025-05-11 20:13:21', '2025-06-15 16:44:09');

-- --------------------------------------------------------

--
-- بنية الجدول `about_navbar`
--

CREATE TABLE `about_navbar` (
  `id` int(11) NOT NULL,
  `link_text` varchar(255) NOT NULL,
  `link_id` varchar(255) NOT NULL,
  `link_order` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `about_navbar`
--

INSERT INTO `about_navbar` (`id`, `link_text`, `link_id`, `link_order`, `created_at`, `updated_at`) VALUES
(1, 'الرئيسية', 'hero', 1, '2025-05-11 20:17:32', '2025-05-11 20:17:32'),
(2, 'الإنجازات', 'achievements', 2, '2025-05-11 20:17:32', '2025-05-11 20:17:32'),
(3, 'القوانين', 'rules', 3, '2025-05-11 20:17:32', '2025-05-11 20:17:32'),
(4, 'الإرشادات', 'guidelines', 4, '2025-05-11 20:17:32', '2025-05-11 20:17:32');

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
(3, '20+', 'برنامج أكاديمي', 'Academic Program', 3, '2025-05-11 20:13:55', '2025-06-15 16:48:58'),
(4, '15+', 'سنة من التميز', 'Years of Excellence', 4, '2025-05-11 20:13:55', '2025-06-15 16:48:58');

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
(5, '30+', 'شراكات دولية', 'International Partnerships', 5, NULL);

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
(1, 1, 'تقنية المعلومات', 'Information Technology', 'تقنية المعلومات', 'بناء المستقبل الرقمي وتطوير حلول تقنية مبتكرة', '/images/it-hero.jpg', 'يهدف تخصص تقنية المعلومات إلى تزويد الطلاب بالمعارف والمهارات اللازمة لتصميم وتطوير وإدارة أنظمة المعلومات والتطبيقات البرمجية، مع التركيز على التقنيات الحديثة مثل الذكاء الاصطناعي والبيانات الضخمة. يتميز هذا التخصص بتنوع المجالات التي يغطيها، من تطوير البرمجيات إلى أمن المعلومات وإدارة الشبكات، مما يمنح الخريجين فرصًا وظيفية واسعة في مختلف القطاعات التقنية.', '2025-06-01 19:12:52', '2025-06-01 19:12:52'),
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
-- بنية الجدول `application_steps`
--

CREATE TABLE `application_steps` (
  `id` int(11) NOT NULL,
  `step_order` int(11) NOT NULL,
  `title_ar` varchar(255) NOT NULL,
  `description_ar` text DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `application_steps`
--

INSERT INTO `application_steps` (`id`, `step_order`, `title_ar`, `description_ar`, `icon`) VALUES
(1, 1, 'تعبئة نموذج طلب الالتحاق', 'قم بتعبئة نموذج طلب الالتحاق عبر الإنترنت وتقديم المعلومات الشخصية والأكاديمية المطلوبة', 'FaWpforms'),
(2, 2, 'رفع المستندات المطلوبة', 'قم برفع نسخ إلكترونية من المستندات المطلوبة مثل شهادة الثانوية العامة وصورة الهوية', 'FaFileUpload'),
(3, 3, 'دفع رسوم التسجيل', 'قم بدفع رسوم التسجيل عبر بوابة الدفع الإلكتروني أو في مقر الجامعة', 'FaCreditCard'),
(4, 4, 'انتظار نتيجة القبول', 'انتظر إشعار نتيجة القبول عبر البريد الإلكتروني أو رسالة نصية (عادة خلال 3-5 أيام عمل)', 'FaHourglassHalf'),
(5, 5, 'استكمال إجراءات التسجيل النهائي', 'بعد قبولك، قم باستكمال إجراءات التسجيل النهائي وحضور اليوم التعريفي للطلاب الجدد', 'FaUserGraduate');

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
(1, 'كلية الهندس', 'College of Engineering', 'نحو مستقبل هندسي افضل', 'Towards a better engineering future', '/colloge/1.jpg', 'تأسست كلية الهندسة في جامعة الريادة لتكون منارة للتعليم الهندسي المتميز. نسعى لتخريج مهندسين أكفاء قادرين على المساهمة في تطوير القطاع الهندسي والتكنولوجي في المجتمع.', 'The College of Engineering at Al-Riyada University was established to be a beacon of distinguished engineering education. We aim to graduate competent engineers capable of contributing to the development of the engineering and technological sector in society.', 'أ.د. احمد عبده', 'Prof. Ahmed Abdu', 'عميد كلية الهندسة', 'Dean of the College of Engineering', '/deans/1737840705873.jpg', 'نرحب بكم في كلية الهندسة بجامعة الريادة، حيث نجمع بين التعليم النظري والتطبيق العملي لتخريج مهندسين مؤهلين قادرين على مواجهة تحديات المستقبل وتلبية احتياجات سوق العمل.', 'Welcome to the College of Engineering at Al-Riyada University, where we combine theoretical education with practical application to graduate qualified engineers capable of facing future challenges and meeting the needs of the labor market.', '2025-06-14 19:20:42'),
(2, 'كلية الطب', 'College of Medicine', 'نحو مستقبل صحي أفضل', 'Towards a better health future', '/colloge/1.jpg', '\r\nتأسست كلية الطب في جامعة الريادة بهدف تقديم تعليم طبي متميز وفق أحدث المعايير العالمية. نحن نسعى لتخريج أطباء مؤهلين قادرين على خدمة المجتمع وتطوير القطاع الصحي.', 'The College of Medicine at Al-Riyada University was established to provide distinguished medical education according to the latest global standards. We aim to graduate qualified doctors capable of serving the community and developing the health sector.', 'أ.د. محمد أحمد', 'Prof. Mohamed Ahmed', 'عميد كلية الطب', 'Dean of the College of Medicine', NULL, 'نرحب بكم في كلية الطب بجامعة الريادة، حيث نلتزم بتقديم تعليم طبي عالي الجودة يجمع بين النظرية والتطبيق العملي. نحن نؤمن بأهمية إعداد جيل من الأطباء المؤهلين علمياً وعملياً لخدمة المجتمع والمساهمة في تطوير القطاع الصحي.', 'Welcome to the College of Medicine at Al-Riyada University, where we are committed to providing high-quality medical education that combines theory and practical application. We believe in the importance of preparing a generation of scientifically and practically qualified doctors to serve the community and contribute to the development of the health sector.', '2025-06-14 19:20:42'),
(3, 'كلية العلوم الإدارية', 'College of Administrative Sciences', 'نعد قادة المستقبل في مجال الأعمال والإدارة', 'Preparing future leaders in business and management', 'colloge\\1.jpg', 'تأسست كلية العلوم الإدارية عام 2005 لتكون مركزاً متميزاً للتعليم والبحث في مجالات إدارة الأعمال، المالية، التسويق، والموارد البشرية. تهدف الكلية إلى إعداد جيل من القادة والمديرين المؤهلين للمنافسة في سوق العمل المحلي والعالمي.\r\n\r\nتتبنى الكلية أحدث استراتيجيات التعليم وتوفر برامج دراسية متنوعة تواكب احتياجات سوق العمل وتستجيب للتحديات المعاصرة في عالم الأعمال. يتم التركيز على تطوير مهارات الطلاب في التفكير النقدي، الابتكار، والعمل الجماعي، إلى جانب المعرفة النظرية والتطبيقية.', 'The College of Administrative Sciences was established in 2005 to be a distinguished center for education and research in the fields of business administration, finance, marketing, and human resources. The college aims to prepare a generation of leaders and managers qualified to compete in the local and global labor market.', 'أ.د. محمد السعيد', 'Prof. Mohamed Saeed', 'عميد كلية العلوم الإدارية', 'Dean of the College of Administrative Sciences', NULL, '\"نسعى في كلية العلوم الإدارية لتخريج قادة مبدعين قادرين على صناعة المستقبل في عالم الأعمال المتغير. نركز على بناء لمهارات العملية والنظرية وتعزيز روح الابتكار والريادة.\"', 'At the College of Administrative Sciences, we strive to graduate creative leaders capable of shaping the future in the ever-changing business world. We focus on building practical and theoretical skills and fostering a spirit of innovation and entrepreneurship.', '2025-06-14 19:20:42');

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
(1, 1, 'أساسيات البرمجة', NULL, NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-01 19:13:19'),
(2, 1, 'هياكل البيانات والخوارزميات', NULL, NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-01 19:13:19'),
(3, 1, 'قواعد البيانات', NULL, NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-01 19:13:19'),
(4, 1, 'شبكات الحاسوب', NULL, NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-01 19:13:19'),
(5, 1, 'تطوير تطبيقات الويب', NULL, NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-01 19:13:19'),
(6, 1, 'تطوير تطبيقات الهاتف المحمول', NULL, NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-01 19:13:19'),
(7, 1, 'أمن المعلومات', NULL, NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-01 19:13:19'),
(8, 1, 'الذكاء الاصطناعي', NULL, NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-01 19:13:19'),
(9, 1, 'تحليل وتصميم النظم', NULL, NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-01 19:13:19'),
(10, 1, 'الحوسبة السحابية', NULL, NULL, NULL, 0, '2025-06-01 19:13:19', '2025-06-01 19:13:19'),
(11, 2, 'مبادئ التصميم المعماري', NULL, NULL, NULL, 0, '2025-06-03 11:43:54', '2025-06-03 11:43:54'),
(12, 2, 'الرسم المعماري', NULL, NULL, NULL, 0, '2025-06-03 11:43:54', '2025-06-03 11:43:54'),
(13, 2, 'تاريخ العمارة', NULL, NULL, NULL, 0, '2025-06-03 11:43:54', '2025-06-03 11:43:54'),
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
(1, 'مستقبلك يبدأ هنا', 'Your Future Starts Here', 'اكتشف عالماً من الفرص التعليمية المتميزة في جامعتنا', 'Discover a world of exceptional educational opportunities at our university', '/image/a1.jpg', 'المزيد', 'Discover More', '#', 1, 1, '2025-05-11 17:57:50', '2025-06-16 05:25:30'),
(2, 'التميز في البحث العلمي', 'Excellence in Scientific Research', 'نقود مسيرة البحث العلمي نحو آفاق جديدة', 'Leading the way in scientific research towards new horizons', '/image/a2.jpg', 'اكتشف المزيد', 'Discover More', '/about', 3, 1, '2025-05-11 17:57:50', '2025-06-16 05:25:31'),
(3, 'بيئة تعليمية متكاملة', 'Integrated Educational Environment', 'نوفر أحدث التقنيات والمرافق لطلابنا', 'We provide the latest technologies and facilities for our students', '/image/a3.jpg', 'اكتشف ', 'Discover', '#', 2, 1, '2025-05-11 17:57:50', '2025-06-16 05:25:31');

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
(1, 1, 'مهندس برمجيات', 'software Enginerr', '💻', '2025-06-01 19:13:33', '2025-06-03 11:34:36'),
(2, 1, 'محلل نظم', 'System Analyst', '🧠', '2025-06-01 19:13:33', '2025-06-03 11:35:08'),
(3, 1, 'مدير قواعد بيانات', 'Database Director', '🗄️', '2025-06-01 19:13:33', '2025-06-03 11:35:52'),
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
(1, 1, 'الهندسة المعمارية', 'Architecture', '🏢', 5, 220, 'بكالوريوس - 5 سنوات • 220 طالب/ة', 'Bachelor\'s degree - 5 years • 220 students', 'التصميم الإنشائي;إدارة المشاريع;هندسة البيئة', 'Structural design;Project management;Environmental engineering', '/components/colleges/engineering/Majors/Architecture', '2025-05-19 07:50:32', '2025-05-19 07:50:32'),
(2, 1, 'تقنية المعلومات', 'Information Technology', '💾', 4, 200, 'بكالوريوس - 4 سنوات • 200 طالب/ة', 'Bachelor\'s degree - 4 years • 200 students', 'برمجة التطبيقات;الشبكات;أمن المعلومات', 'Application programming;Networking;Information security', '/components/colleges/engineering/Majors/IT', '2025-05-19 07:50:32', '2025-05-19 07:50:32'),
(4, 2, 'الطب البشري', 'Medicine', '🩺', 6, 300, 'بكالوريوس في الطب البشري', 'Bachelor of Medicine degree', 'تدريب سريري متقدم;مختبرات حديثة;برامج تدريب دولية', 'Advanced clinical training;Modern laboratories;International training programs', '/components/colleges/medicine/Majors/Medicine', '2025-05-19 08:00:12', '2025-05-19 08:00:12'),
(5, 2, 'طب الأسنان', 'Dentistry', '🦷', 5, 180, 'بكالوريوس في طب الأسنان', 'Bachelor of Dental Surgery degree', 'عيادات متطورة;تقنيات حديثة;تدريب عملي مكثف', 'Advanced clinics;Modern techniques;Intensive practical training', '/components/colleges/medicine/Majors/Dentistry', '2025-05-19 08:00:12', '2025-05-19 08:00:12'),
(6, 2, 'المختبرات الطبية', 'Medical Laboratories', '🧪', 4, 150, 'بكالوريوس في المختبرات الطبية', 'Bachelor\'s degree in Medical Laboratory', 'مختبرات متخصصة;أجهزة متطورة;تدريب ميداني', 'Specialized laboratories;Advanced devices;Field training', '/components/colleges/medicine/Majors/Laboratory', '2025-05-19 08:00:12', '2025-05-19 08:00:12'),
(7, 2, 'الصيدلة', 'Pharmacy', '💊', 5, 200, 'بكالوريوس في الصيدلة', 'Bachelor of Pharmacy degree', 'معامل متخصصة;تدريب صيدلاني;شراكات مع المستشفيات', 'Specialized laboratories;Pharmaceutical training;Partnerships with hospitals', '/components/colleges/medicine/Majors/Pharmacy', '2025-05-19 08:01:05', '2025-05-19 08:01:05'),
(8, 3, 'إدارة الأعمال', 'Business Administration', '📈', 4, 350, 'بكالوريوس في إدارة الأعمال', 'Bachelor\'s degree in Business Administration', 'إدارة استراتيجية;ريادة الأعمال;إدارة الموارد البشرية', 'Strategic management;Entrepreneurship;Human resources management', '/components/colleges/business/Majors/BusinessManagement', '2025-05-19 08:04:39', '2025-05-19 08:04:39'),
(9, 3, 'المحاسبة', 'Accounting', '📊', 4, 280, 'بكالوريوس في المحاسبة', 'Bachelor\'s degree in Accounting', 'محاسبة مالية;مراجعة وتدقيق;محاسبة تكاليف', 'Financial accounting;Audit and review;Cost accounting', '/components/colleges/business/Majors/Accounting', '2025-05-19 08:04:39', '2025-05-19 08:04:39'),
(10, 3, 'التسويق', 'Marketing', '🛒', 4, 200, 'بكالوريوس في التسويق', 'Bachelor\'s degree in Marketing', 'التسويق الرقمي;إدارة العلامات التجارية;سلوك المستهلك', 'Digital marketing;Brand management;Consumer behavior', '/components/colleges/business/Majors/Marketing', '2025-05-19 08:04:39', '2025-05-19 08:04:39'),
(11, 3, 'التمويل والاستثمار', 'Finance and Investment', '💰', 4, 120, 'بكالوريوس في التمويل والاستثمار', 'Bachelor\'s degree in Finance and Investment', 'التحليل المالي;إدارة المحافظ الاستثمارية;التمويل الدولي', 'Financial analysis;Portfolio management;International finance', '/components/colleges/business/Majors/Finance', '2025-05-19 08:04:39', '2025-05-19 08:04:39');

-- --------------------------------------------------------

--
-- بنية الجدول `major_admission_requirements`
--

CREATE TABLE `major_admission_requirements` (
  `id` int(11) NOT NULL,
  `major_id` int(11) NOT NULL,
  `requirement_ar` varchar(255) NOT NULL,
  `requirement_en` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- بنية الجدول `menu_items`
--

CREATE TABLE `menu_items` (
  `item_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `url` varchar(255) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `item_order` int(11) NOT NULL,
  `active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `menu_items`
--

INSERT INTO `menu_items` (`item_id`, `title`, `url`, `parent_id`, `item_order`, `active`) VALUES
(1, 'الرئيسية', '/', NULL, 1, 1),
(2, 'عن الجامعة', '/about', NULL, 2, 1),
(3, 'الكليات', '/faculties', NULL, 3, 1),
(4, 'البحث العلمي', '/research', NULL, 4, 1);

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
(2, 'عن الجامعة', 'About', '/about', 2, 1, 'Home', NULL),
(3, 'الأخبار', 'News', '/news', 3, 1, 'Home', NULL),
(4, 'الانشطة', 'Activities', 'engineering\\AboutSection', 1, 1, 'faculties', NULL),
(5, 'التخصصات', 'Specialties', '/faculties/specialties', 2, 1, 'faculties', NULL),
(6, 'الكليات', 'Colleges', '#', 1, 1, 'global', NULL),
(7, 'كلية الهندسة', 'Engineering College', '/components/colleges/engineering', 1, 1, 'global', 6),
(8, 'كلية الطب', 'Medical College', '/components/colleges/medicine', 2, 1, 'global', 6),
(9, 'كلية العلوم الادارية', 'Administrative Sciences College', '/components/colleges/business', 0, 1, 'global', 6);

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
(1, 'كلمة رئيسة الجامعة', 'President Message', 'نرحب بكم في جامعة الريادة، حيث نسعى جاهدين لتوفير بيئة تعليمية متميزة تجمع بين الأصالة والمعاصرة. نحن ملتزمون بتخريج جيل من القادة والمبدعين القادرين على المساهمة في تطوير المجتمع وبناء المستقبل.', 'Welcome to Al-Riyada University, where we strive to provide a distinguished educational environment that combines authenticity and modernity. We are committed to graduating a generation of leaders and innovators capable of contributing to community development and building the future.', 'بروفسورة : ', 'Professor:', 'رئيسة جامعة الريادة', 'President of Al-Riyada University', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNj', '2025-06-16 05:37:59');

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
(1, 1, 'إدارة المشاريع التقنية', 'Technical Project Management', 'gear', '2025-06-03 11:30:02', '2025-06-16 05:39:31'),
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
(1, 1, '15+', 'معمل هندسي', 'Engineering Labs'),
(2, 1, '40+', 'أستاذ وأستاذة', 'Faculty Members'),
(3, 1, '600+', 'طالب وطالبة', 'Students'),
(4, 2, '+15', 'مختبر طبي', 'Medical Labs'),
(5, 2, '+120', 'أستاذ وأستاذة', 'Faculty Members'),
(6, 2, '+850', 'طالب وطالبة', 'Students'),
(7, 3, '+25', 'قاعة دراسية مجهزة', 'Equipped Classrooms'),
(8, 3, '+4', 'أستاذ وأستاذة', 'Faculty Members');

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
-- Indexes for table `about_navbar`
--
ALTER TABLE `about_navbar`
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
-- Indexes for table `major_admission_requirements`
--
ALTER TABLE `major_admission_requirements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `major_id` (`major_id`);

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about_achievements`
--
ALTER TABLE `about_achievements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `about_achievements_section`
--
ALTER TABLE `about_achievements_section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `about_features`
--
ALTER TABLE `about_features`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `about_guidelines`
--
ALTER TABLE `about_guidelines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
-- AUTO_INCREMENT for table `about_navbar`
--
ALTER TABLE `about_navbar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `about_rules`
--
ALTER TABLE `about_rules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
  MODIFY `slide_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `job_opportunities`
--
ALTER TABLE `job_opportunities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `majors`
--
ALTER TABLE `majors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `major_admission_requirements`
--
ALTER TABLE `major_admission_requirements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
