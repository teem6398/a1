'use client';

import { useState } from 'react';
import { FaPen, FaSpinner, FaCopy, FaCheck } from 'react-icons/fa';
import styles from './FormHelper.module.css';

interface FormHelperProps {
  title?: string;
  placeholder?: string;
}

export default function FormHelper({ 
  title = 'مساعد صياغة الرسائل',
  placeholder = 'اكتب استفسارك هنا وسنقوم بصياغته بشكل رسمي ومحترف...'
}: FormHelperProps) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  // معالجة الاستفسار
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) {
      setError('الرجاء كتابة استفسارك أولاً');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `قم بصياغة الرسالة التالية بشكل رسمي ومحترف مناسب للتواصل مع إدارة الجامعة: ${input}`,
          assistantType: 'form',
        }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        setError('حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.');
      } else {
        setResult(data.reply);
      }
    } catch (error) {
      console.error('Error processing query:', error);
      setError('حدث خطأ في الاتصال. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  // نسخ النص إلى الحافظة
  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // مسح النموذج
  const handleClear = () => {
    setInput('');
    setResult('');
    setError('');
  };

  return (
    <div className={styles.formHelper}>
      <div className={styles.formHelperHeader}>
        <FaPen className={styles.headerIcon} />
        <h2>{title}</h2>
      </div>
      
      <div className={styles.formHelperContent}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="userQuery" className={styles.label}>استفسارك أو رسالتك:</label>
            <textarea
              id="userQuery"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              rows={5}
              className={styles.textarea}
              disabled={loading}
            />
            {error && <p className={styles.errorMessage}>{error}</p>}
          </div>
          
          <div className={styles.buttonsContainer}>
            <button 
              type="submit" 
              className={styles.primaryButton}
              disabled={loading || !input.trim()}
            >
              {loading ? (
                <>
                  <FaSpinner className={styles.spinner} />
                  جاري الصياغة...
                </>
              ) : 'صياغة الرسالة'}
            </button>
            {input && (
              <button 
                type="button" 
                className={styles.secondaryButton}
                onClick={handleClear}
                disabled={loading}
              >
                مسح
              </button>
            )}
          </div>
        </form>
        
        {result && (
          <div className={styles.resultSection}>
            <div className={styles.resultHeader}>
              <h3>الرسالة المصاغة</h3>
              <button 
                className={styles.copyButton} 
                onClick={handleCopy}
                title="نسخ إلى الحافظة"
              >
                {copied ? <FaCheck /> : <FaCopy />}
                {copied ? 'تم النسخ' : 'نسخ'}
              </button>
            </div>
            
            <div className={styles.resultContent}>
              {result.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
            
            <div className={styles.actionButtons}>
              <button 
                className={styles.primaryButton}
                onClick={() => window.location.href = '/contact'}
              >
                استخدام في نموذج الاتصال
              </button>
              <button 
                className={styles.secondaryButton}
                onClick={() => window.location.href = `mailto:info@example.com?body=${encodeURIComponent(result)}`}
              >
                إرسال عبر البريد الإلكتروني
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 