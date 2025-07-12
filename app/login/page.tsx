'use client';

import React from 'react';
import Login from '../components/Auth/Login';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';
import styles from './auth.module.css';
import { useTheme } from '../lib/theme-context';

export default function AuthPage() {
  const { theme } = useTheme();

  return (
    <div className={styles.authPageContainer}>
      <div className={styles.decorCircle1}></div>
      <div className={styles.decorCircle2}></div>
      <div className={styles.decorCircle3}></div>
      <div className={styles.decorCircle4}></div>
      <div className={styles.decorCircle5}></div>
      <div className={styles.decorCircle6}></div>
      
      <motion.div 
        className={styles.authBox}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Login />
        
        <motion.div 
          className={styles.homeButtonContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/" passHref>
            <motion.button 
              className={styles.homeButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaHome /> العودة إلى الصفحة الرئيسية
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
} 