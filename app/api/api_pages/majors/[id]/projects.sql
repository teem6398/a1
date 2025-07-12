-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 23 يونيو 2025 الساعة 15:23
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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `program_id` (`program_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- قيود الجداول المُلقاة.
--

--
-- قيود الجداول `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `academic_programs` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
