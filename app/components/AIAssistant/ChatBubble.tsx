'use client';

import { useState, useEffect, useRef } from 'react';
import { FaTimes, FaPaperPlane, FaSpinner, FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import Image from 'next/image';
import styles from './ChatBubble.module.css';

interface ChatBubbleProps {
  assistantType?: 'visitor' | 'admission' | 'major' | 'form' | 'search' | 'voice' | 'support' | 'feedback' | 'general';
  initialMessage?: string;
  title?: string;
  placeholder?: string;
  autoOpen?: boolean;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  feedback?: 'like' | 'dislike';
}

export default function ChatBubble({
  assistantType = 'general',
  initialMessage = 'مرحبًا! كيف يمكنني مساعدتك اليوم؟',
  title = 'المساعد الريادي',
  placeholder = 'اكتب سؤالك هنا...',
  autoOpen = false,
}: ChatBubbleProps) {
  const [isOpen, setIsOpen] = useState(autoOpen);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: initialMessage,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([
    'كيف أقدم على الجامعة؟',
    'ما هي التخصصات المتاحة؟',
    'متى يبدأ التسجيل؟',
    'هل هناك منح دراسية؟'
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // تمرير إلى آخر رسالة عند إضافة رسالة جديدة
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // التركيز على حقل الإدخال عند فتح المحادثة
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // محاكاة الكتابة للرسائل الأولية
  useEffect(() => {
    if (isOpen && messages.length === 1) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    }
  }, [isOpen, messages.length]);

  // إرسال الرسالة إلى API
  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: userMessage,
      timestamp: new Date()
    }]);
    setIsLoading(true);
    
    // إظهار مؤشر الكتابة
    setIsTyping(true);
    
    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: userMessage,
          assistantType,
        }),
      });
      
      const data = await response.json();
      
      // تأخير قصير لمحاكاة الكتابة
      setTimeout(() => {
        setIsTyping(false);
        
        if (data.error) {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: 'عذرًا، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.',
            timestamp: new Date()
          }]);
        } else {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: data.reply,
            timestamp: new Date()
          }]);
        }
        
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'عذرًا، حدث خطأ في الاتصال. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.',
        timestamp: new Date()
      }]);
      setIsLoading(false);
    }
  };

  // إرسال الرسالة عند الضغط على Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // التعامل مع تغيير حجم حقل الإدخال
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    
    // ضبط ارتفاع حقل الإدخال تلقائيًا
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(120, e.target.scrollHeight) + 'px';
  };

  // استخدام اقتراح
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // تقييم الرد
  const handleFeedback = (messageIndex: number, type: 'like' | 'dislike') => {
    setMessages(prev => 
      prev.map((msg, idx) => 
        idx === messageIndex ? { ...msg, feedback: type } : msg
      )
    );
  };

  // تنسيق التاريخ
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={styles.chatBubbleContainer}>
      {/* زر فتح المحادثة */}
      {!isOpen && (
        <button 
          className={styles.chatBubbleButton} 
          onClick={() => setIsOpen(true)}
          aria-label="فتح المساعد الريادي"
        >
          <Image 
            src="/image/Alryada_Ai.svg" 
            alt="المساعد الريادي" 
            width={90} 
            height={70}
            className={styles.aiIcon}
            priority
          />
        </button>
      )}
      
      {/* نافذة المحادثة */}
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* رأس النافذة */}
          <div className={styles.chatHeader}>
            <button 
              className={styles.closeButton} 
              onClick={() => setIsOpen(false)}
              aria-label="إغلاق المحادثة"
            >
              <FaTimes />
            </button>
            <div className={styles.chatTitle}>
              <Image 
                src="/image/Alryada_Ai.svg"
                alt="المساعد الريادي"
                width={90}
                height={90}
                className={styles.headerIcon}
              />
              <span>{title}</span>
            </div>
          </div>
          
          {/* محتوى المحادثة */}
          <div className={styles.chatMessages}>
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`${styles.message} ${message.role === 'user' ? styles.userMessage : styles.assistantMessage}`}
              >
                {message.content}
                
                <div className={styles.messageFooter}>
                  <span className={styles.timestamp}>{formatTime(message.timestamp)}</span>
                  
                  {message.role === 'assistant' && index > 0 && (
                    <div className={styles.feedbackButtons}>
                      <button 
                        className={`${styles.feedbackButton} ${message.feedback === 'like' ? styles.active : ''}`}
                        onClick={() => handleFeedback(index, 'like')}
                        aria-label="رد مفيد"
                      >
                        <FaRegThumbsUp size={14} />
                      </button>
                      <button 
                        className={`${styles.feedbackButton} ${message.feedback === 'dislike' ? styles.active : ''}`}
                        onClick={() => handleFeedback(index, 'dislike')}
                        aria-label="رد غير مفيد"
                      >
                        <FaRegThumbsDown size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className={`${styles.message} ${styles.assistantMessage} ${styles.typingIndicator}`}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
            )}
            
            {isLoading && !isTyping && (
              <div className={`${styles.message} ${styles.assistantMessage} ${styles.loadingMessage}`}>
                <FaSpinner className={styles.spinner} />
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* اقتراحات سريعة */}
          {messages.length <= 2 && !isLoading && !isTyping && (
            <div className={styles.suggestionContainer}>
              {suggestions.map((suggestion, index) => (
                <button 
                  key={index}
                  className={styles.suggestionButton}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          
          {/* مدخل الرسائل */}
          <div className={styles.chatInput}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              rows={1}
              className={styles.messageInput}
            />
            <button 
              onClick={handleSendMessage} 
              disabled={!input.trim() || isLoading}
              className={styles.sendButton}
              aria-label="إرسال الرسالة"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 