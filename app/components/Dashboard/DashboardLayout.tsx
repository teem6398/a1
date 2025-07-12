'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
  FaHome, 
  FaInfoCircle, 
  FaUniversity, 
  FaNewspaper, 
  FaUserGraduate,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaTachometerAlt,
  FaBars
} from 'react-icons/fa';
import styles from './Dashboard.module.css';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  activeSection,
  onSectionChange
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  // تقسيم عناصر القائمة إلى مجموعات
  const pageEditorItems = [
    { id: 'home', label: 'الصفحة الرئيسية', icon: <FaHome /> },
    { id: 'aboutUniversity', label: 'الصفحات', icon: <FaUniversity /> },
    { id: 'alumni', label: 'قصص الخريجين', icon: <FaUserGraduate /> },
  ];
  
  const adminItems = [
    { id: 'users', label: 'إدارة المستخدمين', icon: <FaUsers /> },
    { id: 'settings', label: 'الإعدادات', icon: <FaCog /> },
  ];
  
  // جمع جميع العناصر للاستخدام في المكونات الأخرى
  const navigationItems = [...pageEditorItems, ...adminItems];
  
  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('userRole');
    // Redirect to home page
    window.location.href = '/';
  };
  
  return (
    <div className={styles.dashboardContainer}>
      <aside className={`${styles.sidebar} ${sidebarCollapsed ? styles.collapsed : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logoContainer}>
            <Image 
              src="/image/Alryada--Logo.png"
              alt="شعار جامعة الريادة"
              width={120}
              height={40}
              className={styles.logo}
            />
          </div>
          <button 
            className={styles.collapseButton}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label={sidebarCollapsed ? "توسيع القائمة" : "طي القائمة"}
          >
            <FaBars />
          </button>
        </div>
        
        <div className={styles.sidebarTitle}>
          <FaTachometerAlt className={styles.dashboardIcon} />
          <span className={styles.titleText}>لوحة التحكم</span>
        </div>
        
        <nav className={styles.navigation}>
          {/* عناصر تحرير صفحات الموقع */}
          <div className={styles.navSection}>
            <h3 className={styles.navSectionTitle}>إدارة المحتوى</h3>
            <ul className={styles.navList}>
              {pageEditorItems.map((item) => (
                <li key={item.id} className={styles.navItem}>
                  <button
                    className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
                    onClick={() => onSectionChange(item.id)}
                  >
                    <span className={styles.navIcon}>{item.icon}</span>
                    <span className={styles.navLabel}>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* فاصل أنيق */}
          <div className={styles.navDivider}></div>
          
          {/* عناصر إدارة النظام */}
          <div className={styles.navSection}>
            <h3 className={styles.navSectionTitle}>إدارة النظام</h3>
            <ul className={styles.navList}>
              {adminItems.map((item) => (
                <li key={item.id} className={styles.navItem}>
                  <button
                    className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
                    onClick={() => onSectionChange(item.id)}
                  >
                    <span className={styles.navIcon}>{item.icon}</span>
                    <span className={styles.navLabel}>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        
        <div className={styles.sidebarFooter}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            <FaSignOutAlt className={styles.logoutIcon} />
            <span className={styles.logoutText}>تسجيل الخروج</span>
          </button>
        </div>
      </aside>
      
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout; 