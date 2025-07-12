'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import Login from './Login';
import styles from './Auth.module.css';
import { useTranslation } from '../../lib/translation-context';

interface LoginModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen: propIsOpen, onClose }) => {
  const [isOpen, setIsOpen] = useState(propIsOpen !== undefined ? propIsOpen : true);
  const { language } = useTranslation();

  // تحديث الحالة عندما تتغير الخاصية
  useEffect(() => {
    if (propIsOpen !== undefined) {
      setIsOpen(propIsOpen);
    }
  }, [propIsOpen]);

  // منع التمرير عند فتح النافذة
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  // إغلاق النافذة عند الضغط على زر Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);
  
  // منع إغلاق النافذة عند النقر داخلها
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modalContent}
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ 
              duration: 0.4, 
              type: 'spring', 
              stiffness: 120,
              damping: 20
            }}
            onClick={handleModalContentClick}
          >
            {/* دوائر زخرفية */}
            <div className={styles.decorCircle1}></div>
            <div className={styles.decorCircle2}></div>
            <div className={styles.decorCircle3}></div>
            
            {/* شعار الجامعة */}
            
            
            <div className={styles.modalHeader}>
              <motion.button 
                className={styles.closeButton} 
                onClick={onClose}
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes />
              </motion.button>
            </div>
            <div className={styles.universityLogoContainer}>
              <Image
                src="/image/Alryada--Logo.png"
                alt={language === 'en' ? 'Al-Riyada University Logo' : 'شعار جامعة الريادة'}
                width={250}
                height={100}
                priority
                className={styles.universityLogo}
              />
            </div>
            
            <Login inModal={true} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
