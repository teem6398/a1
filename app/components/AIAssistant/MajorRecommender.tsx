'use client';

import { useState } from 'react';
import { FaGraduationCap, FaSpinner, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import styles from './MajorRecommender.module.css';

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    value: string;
  }[];
}

export default function MajorRecommender() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [feedback, setFeedback] = useState<'liked' | 'disliked' | null>(null);

  // أسئلة الاستبيان
  const questions: Question[] = [
    {
      id: 1,
      text: 'هل تستمتع بحل المشكلات المعقدة؟',
      options: [
        { text: 'نعم، أحب التحديات', value: 'يحب التحديات والمشكلات المعقدة' },
        { text: 'إلى حد ما', value: 'يستمتع بالتحديات بشكل معتدل' },
        { text: 'لا، أفضل المهام البسيطة', value: 'يفضل المهام البسيطة والواضحة' }
      ]
    },
    {
      id: 2,
      text: 'هل تفضل العمل مع الأرقام والإحصاءات؟',
      options: [
        { text: 'نعم، أحب التعامل مع البيانات', value: 'يحب التعامل مع البيانات والأرقام' },
        { text: 'أحيانًا', value: 'يتعامل مع الأرقام بشكل معتدل' },
        { text: 'لا، أفضل المهام الإبداعية', value: 'يفضل المهام الإبداعية على الأرقام' }
      ]
    },
    {
      id: 3,
      text: 'هل تستمتع بمساعدة الآخرين وتقديم الرعاية؟',
      options: [
        { text: 'نعم، بشكل كبير', value: 'يحب مساعدة الآخرين وتقديم الرعاية' },
        { text: 'إلى حد ما', value: 'يستمتع بمساعدة الآخرين بشكل معتدل' },
        { text: 'لا، أفضل العمل بمفردي', value: 'يفضل العمل المستقل' }
      ]
    },
    {
      id: 4,
      text: 'هل تهتم بالتكنولوجيا والأجهزة الإلكترونية؟',
      options: [
        { text: 'نعم، أحب التقنية كثيرًا', value: 'مهتم جدًا بالتكنولوجيا' },
        { text: 'بشكل متوسط', value: 'اهتمام متوسط بالتكنولوجيا' },
        { text: 'لا، لست مهتمًا بالتقنية', value: 'غير مهتم بالتكنولوجيا' }
      ]
    },
    {
      id: 5,
      text: 'هل تفضل العمل في بيئة مكتبية أم ميدانية؟',
      options: [
        { text: 'بيئة مكتبية', value: 'يفضل العمل المكتبي' },
        { text: 'مزيج من الاثنين', value: 'يفضل مزيج من العمل المكتبي والميداني' },
        { text: 'بيئة ميدانية', value: 'يفضل العمل الميداني' }
      ]
    },
    {
      id: 6,
      text: 'هل تهتم بالعلوم الطبيعية (الفيزياء، الكيمياء، الأحياء)؟',
      options: [
        { text: 'نعم، أحب العلوم الطبيعية', value: 'مهتم بالعلوم الطبيعية' },
        { text: 'بعض المجالات فقط', value: 'اهتمام جزئي بالعلوم الطبيعية' },
        { text: 'لا، لست مهتمًا', value: 'غير مهتم بالعلوم الطبيعية' }
      ]
    }
  ];

  // التعامل مع اختيار الإجابة
  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  // إرسال الإجابات للحصول على توصية
  const handleSubmit = async () => {
    setLoading(true);
    
    // تجهيز نص الاستفسار
    const answersText = Object.values(answers).join('. ');
    const query = `بناءً على إجاباتي التالية، ما هو التخصص الجامعي المناسب لي؟ ${answersText}`;
    
    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          assistantType: 'major',
        }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        setResult({
          error: true,
          message: 'عذرًا، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.'
        });
      } else {
        // معالجة الرد وتنظيمه
        const processedResult = processRecommendation(data.reply);
        setResult(processedResult);
      }
    } catch (error) {
      console.error('Error getting recommendation:', error);
      setResult({
        error: true,
        message: 'عذرًا، حدث خطأ في الاتصال. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.'
      });
    } finally {
      setLoading(false);
    }
  };

  // معالجة الرد وتنظيمه
  const processRecommendation = (reply: string) => {
    // استخراج التخصص الرئيسي
    const majorMatch = reply.match(/تخصص ([\u0600-\u06FF\s]+)/);
    const recommendedMajor = majorMatch ? majorMatch[1].trim() : 'غير محدد';
    
    // استخراج الوصف
    let description = '';
    const descLines = reply.split('\n').filter(line => 
      line.includes('وصف') || 
      (!line.includes(':') && line.length > 20)
    );
    if (descLines.length > 0) {
      description = descLines.join(' ').replace('وصف التخصص:', '').trim();
    }
    
    // استخراج عدد سنوات الدراسة
    const yearsMatch = reply.match(/(\d+)[\s-]*سنوات/);
    const years = yearsMatch ? yearsMatch[1] : '4';
    
    // استخراج الفرص الوظيفية
    const jobsSection = reply.split('الفرص الوظيفية:')[1];
    const jobsList = jobsSection ? 
      jobsSection.split('\n')
        .filter(line => line.trim().length > 0)
        .map(line => line.replace(/^[-*•]?\s*/, '').trim())
        .filter(line => line.length > 0 && !line.includes('الخطة الدراسية')) : 
      [];
    
    // استخراج المواد الدراسية
    const coursesSection = reply.includes('الخطة الدراسية:') ? 
      reply.split('الخطة الدراسية:')[1] : 
      '';
    const coursesList = coursesSection ? 
      coursesSection.split('\n')
        .filter(line => line.trim().length > 0)
        .map(line => line.replace(/^[-*•]?\s*/, '').trim())
        .filter(line => line.length > 0) : 
      [];
    
    return {
      major: recommendedMajor,
      description,
      years,
      jobs: jobsList,
      courses: coursesList,
      fullReply: reply
    };
  };

  // إعادة بدء الاستبيان
  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    setFeedback(null);
  };

  // إرسال تقييم التوصية
  const handleFeedback = (type: 'liked' | 'disliked') => {
    setFeedback(type);
    // يمكن إضافة كود لإرسال التقييم إلى الخادم
  };

  // عرض نتيجة التوصية
  if (result) {
    return (
      <div className={styles.recommender}>
        <div className={styles.recommenderHeader}>
          <FaGraduationCap className={styles.headerIcon} />
          <h2>التخصص المناسب لك</h2>
        </div>
        
        {result.error ? (
          <div className={styles.errorMessage}>
            {result.message}
            <button className={styles.restartButton} onClick={handleRestart}>
              المحاولة مرة أخرى
            </button>
          </div>
        ) : (
          <div className={styles.resultContainer}>
            <h3 className={styles.majorTitle}>{result.major}</h3>
            
            {result.description && (
              <div className={styles.section}>
                <h4 className={styles.sectionTitle}>نبذة عن التخصص</h4>
                <p className={styles.description}>{result.description}</p>
              </div>
            )}
            
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>مدة الدراسة:</span>
                <span className={styles.infoValue}>{result.years} سنوات</span>
              </div>
            </div>
            
            {result.jobs.length > 0 && (
              <div className={styles.section}>
                <h4 className={styles.sectionTitle}>الفرص الوظيفية</h4>
                <ul className={styles.list}>
                  {result.jobs.map((job: string, index: number) => (
                    <li key={index} className={styles.listItem}>{job}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {result.courses.length > 0 && (
              <div className={styles.section}>
                <h4 className={styles.sectionTitle}>أبرز المواد الدراسية</h4>
                <ul className={styles.list}>
                  {result.courses.slice(0, 6).map((course: string, index: number) => (
                    <li key={index} className={styles.listItem}>{course}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className={styles.feedbackSection}>
              <p>هل كانت هذه التوصية مفيدة؟</p>
              <div className={styles.feedbackButtons}>
                <button 
                  className={`${styles.feedbackButton} ${feedback === 'liked' ? styles.active : ''}`} 
                  onClick={() => handleFeedback('liked')}
                  disabled={feedback !== null}
                >
                  <FaThumbsUp /> نعم
                </button>
                <button 
                  className={`${styles.feedbackButton} ${feedback === 'disliked' ? styles.active : ''}`} 
                  onClick={() => handleFeedback('disliked')}
                  disabled={feedback !== null}
                >
                  <FaThumbsDown /> لا
                </button>
              </div>
              {feedback && (
                <p className={styles.feedbackMessage}>
                  شكرًا لتقييمك! سنعمل على تحسين توصياتنا.
                </p>
              )}
            </div>
            
            <div className={styles.actionsContainer}>
              <button className={styles.primaryButton} onClick={() => window.location.href = '/majors'}>
                استكشاف التخصص
              </button>
              <button className={styles.secondaryButton} onClick={handleRestart}>
                إعادة الاختبار
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // عرض الاستبيان
  return (
    <div className={styles.recommender}>
      <div className={styles.recommenderHeader}>
        <FaGraduationCap className={styles.headerIcon} />
        <h2>اكتشف التخصص المناسب لك</h2>
        <p className={styles.headerDescription}>
          أجب عن الأسئلة التالية لمساعدتنا في تحديد التخصص الجامعي الأنسب لميولك واهتماماتك
        </p>
      </div>
      
      {loading ? (
        <div className={styles.loadingContainer}>
          <FaSpinner className={styles.spinner} />
          <p>جاري تحليل إجاباتك...</p>
        </div>
      ) : (
        <div className={styles.questionContainer}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${(currentQuestion / (questions.length - 1)) * 100}%` }}
            ></div>
          </div>
          
          <div className={styles.progressText}>
            السؤال {currentQuestion + 1} من {questions.length}
          </div>
          
          <h3 className={styles.question}>{questions[currentQuestion].text}</h3>
          
          <div className={styles.optionsContainer}>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={styles.optionButton}
                onClick={() => handleAnswer(option.value)}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 