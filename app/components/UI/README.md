# نظام الألوان والأنماط للوضعين الليلي والنهاري

هذا الدليل يشرح كيفية استخدام نظام الألوان والأنماط الموحد للوضعين الليلي والنهاري في تطبيق الجامعة.

## ملفات النظام

1. **theme-variables.css**: يحتوي على متغيرات CSS للألوان والظلال والحدود وغيرها.
2. **ThemeStyles.css**: يحتوي على أنماط عامة يمكن استخدامها في جميع المكونات.

## استخدام متغيرات الألوان

يمكن استخدام متغيرات الألوان مباشرة في ملفات CSS الخاصة بك:

```css
.my-component {
  color: var(--text-primary);
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
}
```

## الألوان الأساسية

- `--primary-color`: اللون الأساسي (أزرق)
- `--primary-dark`: اللون الأساسي الداكن
- `--primary-light`: اللون الأساسي الفاتح
- `--primary-very-light`: اللون الأساسي الفاتح جداً

- `--secondary-color`: اللون الثانوي (أخضر)
- `--secondary-dark`: اللون الثانوي الداكن
- `--secondary-light`: اللون الثانوي الفاتح

- `--accent-color`: لون التأكيد (أحمر)
- `--accent-dark`: لون التأكيد الداكن
- `--accent-light`: لون التأكيد الفاتح

## ألوان النصوص

- `--text-primary`: لون النص الأساسي
- `--text-secondary`: لون النص الثانوي
- `--text-muted`: لون النص الخافت
- `--text-light`: لون النص الفاتح (أبيض)

## ألوان الخلفيات

- `--bg-primary`: لون الخلفية الأساسي
- `--bg-secondary`: لون الخلفية الثانوي
- `--bg-tertiary`: لون الخلفية الثالث
- `--bg-card`: لون خلفية البطاقات
- `--bg-hover`: لون خلفية العناصر عند التمرير عليها

## الظلال

- `--shadow-sm`: ظل صغير
- `--shadow-md`: ظل متوسط
- `--shadow-lg`: ظل كبير
- `--shadow-xl`: ظل كبير جداً

## الأنماط الجاهزة

يمكنك استخدام الأنماط الجاهزة من خلال إضافة الفئات التالية:

### العناوين
```html
<h1 class="heading-primary">عنوان رئيسي</h1>
<h2 class="heading-secondary">عنوان ثانوي</h2>
```

### النصوص
```html
<p class="text-primary">نص أساسي</p>
<p class="text-secondary">نص ثانوي</p>
<p class="text-muted">نص خافت</p>
```

### الأزرار
```html
<button class="btn btn-primary">زر أساسي</button>
<button class="btn btn-secondary">زر ثانوي</button>
<button class="btn btn-outline">زر مخطط</button>
```

### البطاقات
```html
<div class="card">
  <div class="card-header">عنوان البطاقة</div>
  <div class="card-body">محتوى البطاقة</div>
  <div class="card-footer">تذييل البطاقة</div>
</div>
```

### الجداول
```html
<table class="table">
  <thead>
    <tr>
      <th>العنوان 1</th>
      <th>العنوان 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>بيانات 1</td>
      <td>بيانات 2</td>
    </tr>
  </tbody>
</table>
```

### الشارات
```html
<span class="badge badge-primary">شارة أساسية</span>
<span class="badge badge-success">شارة نجاح</span>
<span class="badge badge-warning">شارة تحذير</span>
<span class="badge badge-danger">شارة خطر</span>
```

### التنبيهات
```html
<div class="alert alert-info">تنبيه معلومات</div>
<div class="alert alert-success">تنبيه نجاح</div>
<div class="alert alert-warning">تنبيه تحذير</div>
<div class="alert alert-danger">تنبيه خطر</div>
```

## الوضع الليلي

يتم تطبيق الوضع الليلي تلقائياً عند إضافة فئة `dark-mode` إلى عنصر `html` أو `body`. يتم التعامل مع هذا من خلال مكون `ThemeProvider`.

```jsx
<ThemeProvider>
  {/* المحتوى الخاص بك هنا */}
</ThemeProvider>
``` 