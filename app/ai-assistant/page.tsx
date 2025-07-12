'use client';

import { useState } from 'react';
import { ChatBubble, AdmissionGuide, MajorRecommender, FormHelper } from '../components/AIAssistant';
import styles from './page.module.css';

export default function AIAssistantPage() {
  const [activeTab, setActiveTab] = useState('chat');
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>المساعد الريادي للجامعة</h1>
      
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'chat' ? styles.active : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          المساعد العام
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'admission' ? styles.active : ''}`}
          onClick={() => setActiveTab('admission')}
        >
          دليل القبول
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'major' ? styles.active : ''}`}
          onClick={() => setActiveTab('major')}
        >
          اختيار التخصص
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'form' ? styles.active : ''}`}
          onClick={() => setActiveTab('form')}
        >
          صياغة الرسائل
        </button>
      </div>
      
      <div className={styles.content}>
        {activeTab === 'chat' && (
          <div className={styles.chatContainer}>
            <div className={styles.chatInfo}>
              <h2>المساعد الريادي</h2>
              <p>يمكنك التواصل مع المساعد الريادي للإجابة على استفساراتك حول الجامعة، البرامج الدراسية، متطلبات القبول، وأكثر.</p>
              <p>جرب طرح أسئلة مثل:</p>
              <ul>
                <li>كيف أقدم على الجامعة؟</li>
                <li>ما هي تخصصات كلية الهندسة؟</li>
                <li>متى يبدأ التسجيل للفصل القادم؟</li>
                <li>هل هناك منح دراسية متاحة؟</li>
              </ul>
            </div>
            <div className={styles.chatDemo}>
              <ChatBubble assistantType="visitor" autoOpen={true} />
            </div>
          </div>
        )}
        
        {activeTab === 'admission' && (
          <div>
            <AdmissionGuide />
          </div>
        )}
        
        {activeTab === 'major' && (
          <div>
            <MajorRecommender />
          </div>
        )}
        
        {activeTab === 'form' && (
          <div>
            <FormHelper />
          </div>
        )}
      </div>
    </div>
  );
} 