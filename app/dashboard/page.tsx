'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import SectionHome from '../components/Dashboard/HomeEditor/SectionHome';
import AboutEditor from '../components/Dashboard/HomeEditor/AboutEditor';
import FacultiesEditor from '../components/Dashboard/HomeEditor/FacultiesEditor';

import AlumniEditor from '../components/Dashboard/AdimissionEditor/AlumniEditor';
import UsersManager from '../components/Dashboard/UserManager/UsersManager';
import SettingsEditor from '../components/Dashboard/SettingEditor/SettingsEditor';
import AboutUniversityEditor from '../components/Dashboard/PagesEditor/AboutUniversityEditor/AboutUniversityEditor';
import PagesEditor from '../components/Dashboard/PagesEditor/PagesEditor';


export default function DashboardPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Check if user is authorized to access the dashboard
  useEffect(() => {
    const checkAuth = () => {
      const userRole = localStorage.getItem('userRole');
      if (userRole !== 'admin' && userRole !== 'editor') {
        // Redirect to login page if not admin or editor
        router.push('/auth');
        return;
      }
      setIsAdmin(true);
    };
    
    checkAuth();
  }, [router]);
  
  // If not authorized, show nothing while redirecting
  if (!isAdmin) {
    return null;
  }
  
  // Handle section change
  const handleSectionChange = (section: string) => {
    // تحديث القسم النشط مباشرة بدلاً من الانتقال إلى صفحة منفصلة
    setActiveSection(section);
  };
  
  // Render the appropriate editor component based on active section
  const renderEditor = () => {
    switch (activeSection) {
      case 'home':
        return <SectionHome />;
      case 'about':
        return <AboutEditor />;
      case 'faculties':
        return <FacultiesEditor />;
      case 'alumni':
        return <AlumniEditor />;
      case 'users':
        return <UsersManager />;
      case 'settings':
        return <SettingsEditor />;
      case 'aboutUniversity':
        return <PagesEditor />;
      default:
        return <SectionHome />;
    }
  };

  return (
    <DashboardLayout 
      activeSection={activeSection}
      onSectionChange={handleSectionChange}
    >
      {renderEditor()}
    </DashboardLayout>
  );
} 