'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFilePdf, FaUniversity, FaGraduationCap, FaIdCard, FaCalendarAlt, FaFlag, FaArrowRight, FaChalkboardTeacher, FaLock, FaCheck, FaTimes } from 'react-icons/fa';
import styles from './Student.module.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Student {
  student_id: string;
  name: string;
  photo_url: string | null;
  college: string;
  major: string;
  level: string;
  age: number;
  nationality: string;
  join_year: number;
  expected_graduation: number;
}

interface Grade {
  course_name: string;
  course_code: string;
  credit_hours: number;
  grade: string;
  academic_year: string;
  semester: string;
}

interface Achievement {
  title: string;
  date: string;
  description: string;
  type: string;
}

const StudentProfile = ({ studentId }: { studentId: string }) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('profile');
  const [activeYear, setActiveYear] = useState('السنة الأولى');
  const [activeSemester, setActiveSemester] = useState('الفصل الأول');
  const [activeAchievementType, setActiveAchievementType] = useState('داخل الجامعة');
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [hasPassword, setHasPassword] = useState(false);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // Usando la nueva ruta de API que hemos creado
        const response = await fetch(`/api/api_academics/student/${studentId}`);
        if (!response.ok) {
          throw new Error('فشل في جلب البيانات');
        }
        const data = await response.json();
        setStudent(data.student);
        setGrades(data.grades);
        setAchievements(data.achievements);
        
        // التحقق مما إذا كان الطالب لديه كلمة مرور
        const passwordCheckResponse = await fetch(`/api/api_academics/student/check-password?id=${data.student.enrollment_number}`);
        if (passwordCheckResponse.ok) {
          const passwordData = await passwordCheckResponse.json();
          setHasPassword(passwordData.hasPassword);
        }
      } catch (err: any) {
        setError(err?.message || 'حدث خطأ غير متوقع');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  // وظيفة لتصدير البيانات كملف PDF
  const exportToPDF = async () => {
    if (!contentRef.current || !student) return;

    try {
      // إظهار رسالة جاري التحميل
      const loadingMessage = document.createElement('div');
      loadingMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 102, 204, 0.95);
        color: white;
        padding: 25px 40px;
        border-radius: 10px;
        font-size: 18px;
        font-weight: bold;
        z-index: 9999;
        box-shadow: 0 6px 24px rgba(0, 0, 0, 0.3);
        text-align: center;
        direction: rtl;
      `;
      loadingMessage.innerHTML = `
        <div>
          <div style="font-size: 22px; margin-bottom: 10px;">جاري تحضير ملف PDF</div>
          <div style="font-size: 16px; opacity: 0.9;">يرجى الانتظار، قد تستغرق هذه العملية بضع ثوان...</div>
        </div>
      `;
      document.body.appendChild(loadingMessage);

      // تهيئة المستند للطباعة
      const printMode = document.createElement('style');
      printMode.innerHTML = `
        @media print {
          body * { visibility: hidden; }
          #studentData, #studentData * { visibility: visible; }
          #studentData { position: absolute; left: 0; top: 0; }
        }
      `;
      document.head.appendChild(printMode);

      // إنشاء نسخة من العنصر للطباعة
      const printElement = contentRef.current.cloneNode(true) as HTMLElement;
      printElement.style.background = 'white';
      printElement.style.padding = '20px';
      printElement.style.borderRadius = '0';
      printElement.style.boxShadow = 'none';

      // إضافة اسم وشعار الجامعة للطباعة
      const pdfHeader = document.createElement('div');
      
      pdfHeader.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px; padding: 20px; border-bottom: 3px solid #0066cc; background-color: #f8faff;">
          <div style="margin-bottom: 15px; height: 80px; display: flex; justify-content: center;">
            <img src="/image/Alryada--Logo.png" alt="شعار الجامعة" style="height: 80px; object-fit: contain;" />
          </div>
          <h2 style="margin: 8px 0; color: #333; font-size: 22px;">السجل الأكاديمي الرسمي</h2>
          <p style="color: #555; margin: 8px 0; font-weight: bold;">تاريخ الإصدار: ${new Date().toLocaleDateString('ar-SA')}</p>
          <p style="color: #555; margin: 5px 0;">وثيقة رسمية صادرة من نظام إدارة الطلاب</p>
        </div>
      `;
      
      // إضافة الهيدر إلى العنصر الأصلي مؤقتاً
      contentRef.current.prepend(pdfHeader);

      // إنشاء canvas من العنصر بدقة عالية
      const canvas = await html2canvas(contentRef.current, {
        scale: 4, // زيادة الدقة أكثر
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        allowTaint: true,
        imageTimeout: 15000, // زيادة وقت انتظار تحميل الصور
        onclone: (clonedDoc) => {
          // تحسين جودة الصور في النسخة المستنسخة
          const images = clonedDoc.querySelectorAll('img');
          images.forEach(img => {
            img.style.imageRendering = 'high-quality';
          });
        }
      });

      // تحويل Canvas إلى صورة بجودة عالية
      const imgData = canvas.toDataURL('image/png', 1.0); // جودة 100%
      
      // إنشاء ملف PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // إضافة خصائص للملف
      pdf.setProperties({
        title: `السجل الأكاديمي - ${student.name}`,
        subject: 'السجل الأكاديمي للطالب',
        author: 'جامعة الريادة',
        keywords: 'سجل أكاديمي، طالب، جامعة',
        creator: 'نظام إدارة الطلاب'
      });

      // تحديد حجم الصفحة
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // حساب نسبة العرض للصورة
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
      // إضافة الصورة إلى PDF مع هوامش
      const margin = 5; // هامش 5 مم
      pdf.addImage(
        imgData, 
        'PNG', 
        margin, 
        margin, 
        imgWidth * ratio - (margin * 2), 
        imgHeight * ratio - (margin * 2)
      );

      // إضافة تذييل للصفحة
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(
        `جامعة الريادة - نظام إدارة الطلاب`,
        pdfWidth / 2,
        pdfHeight - 10,
        { align: 'center' }
      );
      
      // تنزيل الملف
      pdf.save(`السجل_الأكاديمي_${student.name}.pdf`);
      
      // إزالة العناصر المؤقتة
      contentRef.current.removeChild(pdfHeader);
      document.head.removeChild(printMode);
      document.body.removeChild(loadingMessage);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('حدث خطأ أثناء تصدير الملف');
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setPasswordError('');
    setPasswordSuccess('');
    
    // التحقق من كلمة المرور الجديدة
    if (password.length < 8) {
      setPasswordError('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError('كلمة المرور غير متطابقة');
      return;
    }

    // إذا كان المستخدم لديه كلمة مرور بالفعل، يجب التحقق من كلمة المرور الحالية
    if (hasPassword && !currentPassword) {
      setPasswordError('يجب إدخال كلمة المرور الحالية');
      return;
    }

    try {
      // إظهار مؤشر التحميل
      setLoading(true);
      
      // إذا كان لديه كلمة مرور، نتحقق أولاً من صحة كلمة المرور الحالية
      if (hasPassword) {
        console.log('التحقق من كلمة المرور الحالية للطالب:', studentId);
        const verifyResponse = await fetch(`/api/api_academics/student/${studentId}/verify-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password: currentPassword }),
        });

        const verifyData = await verifyResponse.json();
        console.log('نتيجة التحقق من كلمة المرور الحالية:', verifyData);

        if (!verifyResponse.ok) {
          throw new Error(verifyData.error || 'كلمة المرور الحالية غير صحيحة');
        }
      }
      
      // بعد التحقق من كلمة المرور الحالية، نقوم بتحديث كلمة المرور الجديدة
      console.log('تحديث كلمة المرور للطالب:', studentId);
      const response = await fetch(`/api/api_academics/student/${studentId}/password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      console.log('نتيجة تحديث كلمة المرور:', data);

      if (!response.ok) {
        throw new Error(data.error || 'فشل في تحديث كلمة المرور');
      }

      // إظهار رسالة النجاح
      setPasswordSuccess('تم تحديث كلمة المرور بنجاح');
      setPassword('');
      setConfirmPassword('');
      setCurrentPassword('');
      setHasPassword(true); // تحديث حالة وجود كلمة مرور

      // إخفاء رسالة النجاح بعد 3 ثواني
      setTimeout(() => {
        setPasswordSuccess('');
      }, 3000);

    } catch (err: any) {
      console.error('خطأ في تحديث كلمة المرور:', err);
      setPasswordError(err.message || 'حدث خطأ أثناء تحديث كلمة المرور');
    } finally {
      // إخفاء مؤشر التحميل
      setLoading(false);
    }
  };

  const renderPasswordForm = () => {
    return (
      <div className={styles.passwordSection}>
        <h3 className={styles.sectionTitle}>
          <FaLock />
          {hasPassword ? 'تغيير كلمة المرور' : 'إنشاء كلمة مرور'}
        </h3>
        <form className={styles.passwordForm} onSubmit={handlePasswordSubmit}>
          {hasPassword && (
            <div className={styles.passwordInputGroup}>
              <label htmlFor="currentPassword">كلمة المرور الحالية</label>
              <input
                id="currentPassword"
                type="password"
                className={styles.passwordInput}
                placeholder="أدخل كلمة المرور الحالية"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          )}
          
          <div className={styles.passwordInputGroup}>
            <label htmlFor="password">{hasPassword ? 'كلمة المرور الجديدة' : 'كلمة المرور'}</label>
            <input
              id="password"
              type="password"
              className={styles.passwordInput}
              placeholder="أدخل كلمة المرور الجديدة (8 أحرف على الأقل)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              minLength={8}
              required
            />
          </div>
          
          <div className={styles.passwordInputGroup}>
            <label htmlFor="confirmPassword">تأكيد كلمة المرور</label>
            <input
              id="confirmPassword"
              type="password"
              className={styles.passwordInput}
              placeholder="أعد إدخال كلمة المرور للتأكيد"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              minLength={8}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className={styles.passwordButton}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className={styles.buttonSpinner}></span>
                جاري الحفظ...
              </>
            ) : passwordSuccess ? (
              <>
                <FaCheck /> تم الحفظ
              </>
            ) : (
              hasPassword ? 'تحديث كلمة المرور' : 'إنشاء كلمة المرور'
            )}
          </button>
          
          {passwordError && (
            <div className={styles.passwordError}>
              <FaTimes /> {passwordError}
            </div>
          )}
          
          {passwordSuccess && (
            <div className={styles.passwordSuccess}>
              <FaCheck /> {passwordSuccess}
            </div>
          )}
        </form>
      </div>
    );
  };

  const renderStats = () => {
    if (!student) return null;
    
    return (
      <div className={styles.statsCards}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{student.join_year}</div>
          <div className={styles.statLabel}>سنة الالتحاق</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{student.expected_graduation}</div>
          <div className={styles.statLabel}>سنة التخرج المتوقعة</div>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    // بما أننا حذفنا الـ tabs، هذا القسم سيعرض الإنجازات فقط
    return (
      <div className={styles.achievementsSection}>
        <div className={styles.achievementsTabs}>
          <button
            className={`${styles.achievementsTab} ${activeAchievementType === 'داخل الجامعة' ? styles.achievementsTabActive : ''}`}
            onClick={() => setActiveAchievementType('داخل الجامعة')}
          >
            داخل الجامعة
          </button>
          <button
            className={`${styles.achievementsTab} ${activeAchievementType === 'خارج الجامعة' ? styles.achievementsTabActive : ''}`}
            onClick={() => setActiveAchievementType('خارج الجامعة')}
          >
            خارج الجامعة
          </button>
        </div>
        <div className={styles.achievementsList}>
          {achievements
            .filter(achievement => achievement.type === activeAchievementType)
            .map((achievement, index) => (
              <div key={index} className={styles.achievementItem}>
                <h4 className={styles.achievementTitle}>{achievement.title}</h4>
                <p className={styles.achievementDate}>{achievement.date}</p>
                <p className={styles.achievementDescription}>{achievement.description}</p>
              </div>
            ))}
        </div>
      </div>
    );
  };

  // Función para determinar la URL correcta de la imagen del estudiante
  const getStudentImageUrl = (photoUrl: string | null): string => {
    if (!photoUrl) {
      return '/image/6.jpg'; // Imagen por defecto si no hay foto
    }
    
    // Si la URL ya comienza con http o /, la usamos tal cual
    if (photoUrl.startsWith('http') || photoUrl.startsWith('/')) {
      return photoUrl;
    }
    
    // Si es solo un nombre de archivo, asumimos que está en la carpeta Sudents
    return `/Sudents/${photoUrl}`;
  };

  if (loading) return <div>جاري التحميل...</div>;
  if (error) return <div>حدث خطأ: {error}</div>;
  if (!student) return <div>لا توجد بيانات للطالب</div>;

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <Link href="/" className={styles.homeButton}>
          <FaArrowRight />
          <span>العودة للرئيسية</span>
        </Link>
        <Link href="/teachers" className={styles.teachersButton}>
          <FaChalkboardTeacher />
          <span>البحث عن الأساتذة</span>
        </Link>
      </div>
      
      <div className={styles.header}>
        <h1 className={styles.title}>السجل الأكاديمي</h1>
        <button className={styles.exportButton} onClick={exportToPDF}>
          <FaFilePdf /> تصدير PDF
        </button>
      </div>

      <div className={styles.navigation}>
        <button 
          className={`${styles.navButton} ${activeSection === 'profile' ? styles.navButtonActive : ''}`}
          onClick={() => setActiveSection('profile')}
        >
          المعلومات الشخصية
        </button>
        <button 
          className={`${styles.navButton} ${activeSection === 'academic' ? styles.navButtonActive : ''}`}
          onClick={() => setActiveSection('academic')}
        >
          السجل الأكاديمي
        </button>
        <button 
          className={`${styles.navButton} ${activeSection === 'achievements' ? styles.navButtonActive : ''}`}
          onClick={() => setActiveSection('achievements')}
        >
          الإنجازات
        </button>
        <button
          className={`${styles.navButton} ${activeSection === 'password' ? styles.navButtonActive : ''}`}
          onClick={() => setActiveSection('password')}
        >
          كلمة المرور
        </button>
      </div>

      <div ref={contentRef} id="studentData">
        {activeSection === 'profile' && (
          <div className={styles.profileSection}>
            <div className={styles.profileImageContainer}>
              {student.photo_url ? (
                <Image 
                  src={getStudentImageUrl(student.photo_url)}
                  alt={student.name}
                  width={280}
                  height={320}
                  className={styles.profileImage}
                  priority
                  loading="eager"
                  quality={95}
                />
              ) : (
                <div className={styles.defaultUserIcon}>
                  <FaIdCard size={120} color="#b0b0b0" />
                </div>
              )}
              <div className={styles.imageOverlay}>
                <span className={styles.viewProfileText}>صورة الطالب</span>
              </div>
            </div>
            <div className={styles.profileInfo}>
              <h2 className={styles.studentName}>{student.name}</h2>
              <p className={styles.studentId}>الرقم الجامعي: {student.student_id}</p>
              
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}><FaUniversity /> الكلية:</span>
                  <span className={styles.infoValue}>{student.college}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}><FaGraduationCap /> التخصص:</span>
                  <span className={styles.infoValue}>{student.major}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}><FaIdCard /> المستوى:</span>
                  <span className={styles.infoValue}>{student.level}</span>
                </div>
                
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}><FaFlag /> الجنسية:</span>
                  <span className={styles.infoValue}>{student.nationality}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}><FaCalendarAlt /> سنة الالتحاق:</span>
                  <span className={styles.infoValue}>{student.join_year}</span>
                </div>
              </div>
              
              {renderStats()}
            </div>
          </div>
        )}

        {activeSection === 'academic' && (
          <div className={styles.gradesSection}>
            <h2 className={styles.sectionTitle}>السجل الأكاديمي</h2>
            
            <div className={styles.academicRecordContainer}>
              {/* قائمة السنوات الأكاديمية */}
              <div className={styles.yearsPanel}>
                <h3 className={styles.panelTitle}>السنوات الدراسية</h3>
                <div className={styles.yearsList}>
                  {['السنة الأولى', 'السنة الثانية', 'السنة الثالثة', 'السنة الرابعة'].map(year => (
                    <div key={year} className={styles.yearItem}>
                      <button
                        className={`${styles.yearButton} ${activeYear === year ? styles.activeYearButton : ''}`}
                        onClick={() => { 
                          if (activeYear === year) {
                            setActiveYear('');
                            setActiveSemester('');
                          } else {
                            setActiveYear(year);
                            setActiveSemester('');
                          }
                        }}
                      >
                        {year}
                      </button>
                      
                      {/* الفصول الدراسية للسنة المحددة */}
                      {activeYear === year && (
                        <div className={styles.semestersContainer}>
                          <button
                            className={`${styles.semesterButton} ${activeSemester === 'الفصل الأول' ? styles.activeSemesterButton : ''}`}
                            onClick={() => setActiveSemester('الفصل الأول')}
                          >
                            الفصل الأول
                          </button>
                          <button
                            className={`${styles.semesterButton} ${activeSemester === 'الفصل الثاني' ? styles.activeSemesterButton : ''}`}
                            onClick={() => setActiveSemester('الفصل الثاني')}
                          >
                            الفصل الثاني
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* منطقة عرض العلامات */}
              <div className={styles.gradesDisplayPanel}>
                {!activeYear && (
                  <div className={styles.instructionMessage}>
                    <p>يرجى اختيار السنة الدراسية لعرض العلامات</p>
                  </div>
                )}
                
                {activeYear && !activeSemester && (
                  <div className={styles.instructionMessage}>
                    <p>يرجى اختيار الفصل الدراسي لعرض العلامات</p>
                  </div>
                )}
                
                {activeYear && activeSemester && (
                  <div className={styles.gradesTableContainer}>
                    <h3 className={styles.tableTitle}>
                      علامات {activeYear} - {activeSemester}
                    </h3>
                    
                    {grades.filter(grade => grade.academic_year === activeYear && grade.semester === activeSemester).length > 0 ? (
                      <div className={styles.responsiveTable}>
                        <table className={styles.gradesTable}>
                          <thead>
                            <tr>
                              <th>رمز المادة</th>
                              <th>اسم المادة</th>
                              <th>العلامة</th>
                            </tr>
                          </thead>
                          <tbody>
                            {grades
                              .filter(grade => grade.academic_year === activeYear && grade.semester === activeSemester)
                              .map((grade, index) => (
                                <tr key={index}>
                                  <td className={styles.courseCodeCell}>{grade.course_code}</td>
                                  <td>{grade.course_name}</td>
                                  <td className={styles.gradeCell}>{grade.grade}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className={styles.noGrades}>
                        <p>لا توجد مواد مسجلة في هذا الفصل</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'achievements' && renderTabContent()} {/* استخدام renderTabContent هنا مباشرة لعرض الإنجازات */}
        {activeSection === 'password' && renderPasswordForm()}
      </div>
    </div>
  );
};

export default StudentProfile; 