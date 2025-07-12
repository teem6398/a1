'use client';

import { useState } from 'react';
import { FaGraduationCap, FaArrowLeft, FaArrowRight, FaSpinner } from 'react-icons/fa';
import styles from './AdmissionGuide.module.css';

interface AdmissionGuideProps {
  onComplete?: (result: any) => void;
}

export default function AdmissionGuide({ onComplete }: AdmissionGuideProps) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  // بيانات المستخدم
  const [userData, setUserData] = useState({
    nationality: '',
    certificate: '',
    gpa: '',
    major: '',
  });

  // الخطوات
  const steps = [
    {
      title: 'الجنسية',
      question: 'ما هي جنسيتك؟',
      options: ['سعودي', 'مقيم', 'دولي'],
      field: 'nationality'
    },
    {
      title: 'الشهادة',
      question: 'ما نوع الشهادة التي تملكها؟',
      options: ['ثانوية عامة', 'دبلوم', 'بكالوريوس', 'أخرى'],
      field: 'certificate'
    },
    {
      title: 'المعدل',
      question: 'ما هو معدلك التراكمي؟',
      options: ['أقل من 2.5', '2.5 - 3.0', '3.0 - 3.5', '3.5 - 4.0', '4.0 - 4.5', '4.5 - 5.0'],
      field: 'gpa'
    },
    {
      title: 'التخصص',
      question: 'ما هو التخصص الذي ترغب بدراسته؟',
      options: ['هندسة', 'طب', 'علوم حاسب', 'إدارة أعمال', 'علوم إنسانية', 'أخرى'],
      field: 'major'
    }
  ];

  // التعامل مع اختيار الخيار
  const handleOptionSelect = (option: string) => {
    setUserData(prev => ({
      ...prev,
      [steps[step].field]: option
    }));
    
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  // العودة للخطوة السابقة
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  // إرسال البيانات للحصول على النتيجة
  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `أنا ${userData.nationality} وأملك شهادة ${userData.certificate} بمعدل ${userData.gpa} وأرغب بدراسة ${userData.major}. هل أنا مؤهل للقبول؟ وما هي التخصصات المناسبة لي؟`,
          assistantType: 'admission',
        }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        setResult({
          eligible: false,
          message: 'عذرًا، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.',
          majors: [],
          nextSteps: ['التواصل مع إدارة القبول مباشرة']
        });
      } else {
        // تحليل الرد لاستخراج المعلومات المهمة
        const eligible = !data.reply.includes('غير مؤهل') && !data.reply.includes('لا تستوفي');
        
        setResult({
          eligible,
          message: data.reply,
          majors: extractMajors(data.reply),
          nextSteps: extractNextSteps(data.reply)
        });
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      setResult({
        eligible: false,
        message: 'عذرًا، حدث خطأ في الاتصال. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.',
        majors: [],
        nextSteps: ['التواصل مع إدارة القبول مباشرة']
      });
    } finally {
      setLoading(false);
      if (onComplete) {
        onComplete(result);
      }
    }
  };

  // استخراج التخصصات من الرد
  const extractMajors = (reply: string): string[] => {
    const majors = [];
    const lines = reply.split('\n');
    
    for (const line of lines) {
      if (line.includes('تخصص') || line.includes('برنامج') || line.includes('كلية')) {
        const major = line.replace(/^[-*•]?\s*/, '').trim();
        if (major) majors.push(major);
      }
    }
    
    return majors.length > 0 ? majors : ['تواصل مع إدارة القبول لمعرفة التخصصات المناسبة'];
  };

  // استخراج الخطوات التالية من الرد
  const extractNextSteps = (reply: string): string[] => {
    const steps = [];
    const lines = reply.split('\n');
    let collectingSteps = false;
    
    for (const line of lines) {
      if (line.includes('الخطوات التالية') || line.includes('يمكنك الآن') || line.includes('عليك الآن')) {
        collectingSteps = true;
        continue;
      }
      
      if (collectingSteps && line.trim() && !line.startsWith('مع تمنياتنا')) {
        const step = line.replace(/^[-*•]?\s*/, '').trim();
        if (step) steps.push(step);
      }
    }
    
    return steps.length > 0 ? steps : ['التقديم عبر بوابة القبول الإلكترونية', 'تحميل المستندات المطلوبة', 'متابعة حالة الطلب'];
  };

  // عرض نتيجة التقييم
  if (result) {
    return (
      <div className={styles.admissionGuide}>
        <div className={styles.guideHeader}>
          <FaGraduationCap className={styles.headerIcon} />
          <h2>نتيجة التقييم</h2>
        </div>
        
        <div className={styles.resultContainer}>
          <div className={`${styles.eligibilityStatus} ${result.eligible ? styles.eligible : styles.notEligible}`}>
            {result.eligible ? 'مؤهل للقبول' : 'غير مؤهل حاليًا'}
          </div>
          
          <div className={styles.resultMessage}>
            {result.message}
          </div>
          
          {result.majors.length > 0 && (
            <div className={styles.majorsSection}>
              <h3>التخصصات المناسبة:</h3>
              <ul>
                {result.majors.map((major: string, index: number) => (
                  <li key={index}>{major}</li>
                ))}
              </ul>
            </div>
          )}
          
          {result.nextSteps.length > 0 && (
            <div className={styles.nextStepsSection}>
              <h3>الخطوات التالية:</h3>
              <ol>
                {result.nextSteps.map((step: string, index: number) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          )}
          
          <div className={styles.buttonsContainer}>
            <button 
              className={styles.primaryButton}
              onClick={() => window.location.href = '/admission/apply'}
            >
              التقديم الآن
            </button>
            <button 
              className={styles.secondaryButton}
              onClick={() => setResult(null)}
            >
              تقييم جديد
            </button>
          </div>
        </div>
      </div>
    );
  }

  // عرض الاستبيان
  return (
    <div className={styles.admissionGuide}>
      <div className={styles.guideHeader}>
        <FaGraduationCap className={styles.headerIcon} />
        <h2>دليل القبول التفاعلي</h2>
      </div>
      
      {loading ? (
        <div className={styles.loadingContainer}>
          <FaSpinner className={styles.spinner} />
          <p>جاري تحليل بياناتك...</p>
        </div>
      ) : (
        <div className={styles.questionContainer}>
          <div className={styles.stepIndicator}>
            الخطوة {step + 1} من {steps.length}: {steps[step].title}
          </div>
          
          <h3 className={styles.question}>{steps[step].question}</h3>
          
          <div className={styles.optionsContainer}>
            {steps[step].options.map((option, index) => (
              <button
                key={index}
                className={`${styles.optionButton} ${userData[steps[step].field as keyof typeof userData] === option ? styles.selectedOption : ''}`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
          
          <div className={styles.navigationButtons}>
            {step > 0 && (
              <button className={styles.backButton} onClick={handleBack}>
                <FaArrowRight className={styles.buttonIcon} />
                السابق
              </button>
            )}
            {step === steps.length - 1 && (
              <button className={styles.nextButton} onClick={handleSubmit}>
                إرسال
                <FaArrowLeft className={styles.buttonIcon} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 