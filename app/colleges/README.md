# تحديثات صفحة التخصصات (Majors Page)

## نظرة عامة
تم تحديث صفحة التخصصات لتتضمن تصميمًا جديدًا مع hero section ومحتوى محسن من الجداول المختلفة في قاعدة البيانات.

## التحديثات الرئيسية

### 1. Hero Section الجديد
- **تصميم كامل الشاشة**: Hero section يغطي 80% من ارتفاع الشاشة مع حد أدنى 600px
- **خلفية ديناميكية**: دعم للصور المخصصة مع خلفية تدرج احتياطية
- **نص متجاوب**: أحجام خطوط متجاوبة باستخدام `clamp()`
- **تأثيرات بصرية**: تدرجات وظلال محسنة
- **زر استكشاف**: زر CTA للانتقال إلى المحتوى

### 2. تحديث واجهات البيانات
تم تحديث الواجهات لدعم المحتوى ثنائي اللغة:

```typescript
interface Major {
  id: number;
  name: string;
  name_en?: string;
  hero_title?: string;
  hero_subtitle?: string;
  hero_image_url?: string;
  about_text?: string;
  description: string;
  features: string;
  image_path: string;
  job_opportunities?: string;
}

interface Course {
  id: number;
  name_ar: string;
  name_en?: string;
  description?: string;
  semester?: number;
  is_elective: boolean;
  url?: string;
}

interface Project {
  id: number;
  title_ar: string;
  title_en?: string;
  description_ar?: string;
  description_en?: string;
  image_url?: string;
}

interface JobOpportunity {
  id: number;
  job_title_ar: string;
  job_title_en?: string;
  icon?: string;
}

interface Skill {
  id: number;
  skill_name: string;
  skill_name_en: string;
  icon?: string;
}

interface DepartmentHead {
  id: number;
  program_id: number;
  name: string;
  name_en?: string;
  title: string;
  title_en?: string;
  image_url?: string;
  message: string;
  message_en?: string;
  email?: string;
  phone?: string;
  office_location?: string;
  office_location_en?: string;
  office_hours?: string;
  office_hours_en?: string;
}
```

### 3. دعم اللغات المحسّن
- **دالة `getLocalizedContent`**: دالة مساعدة للحصول على المحتوى المناسب حسب اللغة
- **ترجمات جديدة**: إضافة ترجمات للعناصر الجديدة
- **دعم RTL/LTR**: تحسين دعم الاتجاهات المختلفة

### 4. تحسينات التصميم
- **تصميم متجاوب محسّن**: تحسين العرض على الأجهزة المحمولة
- **ألوان وظلال محسنة**: تحسين المظهر العام
- **تباعد محسّن**: تحسين المسافات والهوامش
- **تأثيرات حركية**: تحسين الانتقالات والتأثيرات

### 5. هيكل الصفحة الجديد
```
1. Navbar
2. Hero Section (كامل الشاشة)
3. Main Container
   - زر العودة للكلية
   - قسم "عن البرنامج"
   - تبويبات التنقل
   - محتوى التبويبات
4. Footer
```

## الجداول المستخدمة

### 1. academic_programs
- `hero_title`: عنوان Hero
- `hero_subtitle`: عنوان فرعي للHero
- `hero_image_url`: صورة خلفية Hero
- `about_text`: نص وصف البرنامج
- `name_ar/name_en`: اسم التخصص

### 2. courses
- `name_ar/name_en`: اسم المقرر
- `description`: وصف المقرر
- `semester`: الفصل الدراسي
- `is_elective`: هل المقرر اختياري

### 3. projects
- `title_ar/title_en`: عنوان المشروع
- `description_ar/description_en`: وصف المشروع
- `image_url`: صورة المشروع

### 4. job_opportunities
- `job_title_ar/job_title_en`: عنوان الوظيفة
- `icon`: أيقونة الوظيفة

### 5. skills
- `skill_name/skill_name_en`: اسم المهارة
- `icon`: أيقونة المهارة

### 6. department_heads
- `name/name_en`: اسم رئيس القسم
- `title/title_en`: منصب رئيس القسم
- `message/message_en`: رسالة رئيس القسم
- `image_url`: صورة رئيس القسم
- معلومات التواصل: البريد الإلكتروني، الهاتف، موقع المكتب، ساعات العمل

## التحديثات في ملف CSS

### Hero Section
```css
.heroSection {
  height: 80vh;
  min-height: 600px;
  border-radius: 0;
  margin-bottom: 0;
}

.heroTitle {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.heroSubtitle {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  max-width: 90%;
}
```

### تحسينات التصميم المتجاوب
```css
@media (max-width: 768px) {
  .heroSection {
    height: 60vh;
    min-height: 400px;
  }
  
  .majorContainer {
    padding: 2rem 1rem;
  }
}
```

## الترجمات الجديدة

### العربية
- `exploreMore`: "استكشف المزيد"
- `aboutProgram`: "عن البرنامج"

### الإنجليزية
- `exploreMore`: "Explore More"
- `aboutProgram`: "About Program"

## كيفية الاستخدام

### 1. إعداد البيانات
تأكد من وجود البيانات المطلوبة في الجداول:
- `academic_programs`: بيانات Hero والوصف
- `courses`: المقررات الدراسية
- `projects`: مشاريع الطلاب
- `job_opportunities`: الفرص الوظيفية
- `skills`: المهارات المطلوبة
- `department_heads`: معلومات رئيس القسم

### 2. الصور
- **Hero Image**: ضع صورة عالية الجودة في `hero_image_url`
- **Project Images**: صور المشاريع في `image_url`
- **Department Head Image**: صورة رئيس القسم في `image_url`

### 3. المحتوى ثنائي اللغة
- املأ الحقول الإنجليزية للحصول على تجربة أفضل للمستخدمين الناطقين بالإنجليزية
- استخدم `getLocalizedContent()` للحصول على المحتوى المناسب

## المميزات الجديدة

1. **Hero Section جذاب**: تصميم كامل الشاشة مع تأثيرات بصرية
2. **دعم اللغات المحسّن**: تجربة مستخدم أفضل للغتين
3. **تصميم متجاوب**: عرض مثالي على جميع الأجهزة
4. **تنظيم محسّن**: هيكل أوضح وأسهل للتنقل
5. **أداء محسّن**: تحسين سرعة التحميل والعرض

## ملاحظات تقنية

- تم استخدام `clamp()` للأحجام المتجاوبة
- تحسين استخدام CSS Grid و Flexbox
- إضافة تأثيرات حركية سلسة
- تحسين إمكانية الوصول (Accessibility)
- دعم الوضع المظلم (Dark Mode)

## التطوير المستقبلي

1. إضافة المزيد من التأثيرات البصرية
2. تحسين أداء الصور
3. إضافة المزيد من التفاعلات
4. تحسين SEO
5. إضافة المزيد من خيارات التخصيص 