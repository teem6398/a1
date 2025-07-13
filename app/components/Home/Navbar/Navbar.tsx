'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { motion} from 'framer-motion';
import { useTheme } from '../../../lib/theme-context';

import { FaUserCircle, FaCog, FaSignOutAlt, FaSearch, FaChalkboardTeacher } from 'react-icons/fa';
import { useTranslation } from '../../../lib/translation-context';
import LanguageSwitcher from '../../LanguageSwitcher/LanguageSwitcher';
import ThemeToggle from '../../ThemeToggle';

interface MenuItem {
  item_id: number;
  title: string;
  url: string;
  children?: MenuItem[];
  hasDropdown?: boolean;
}

interface SiteSettings {
  id: number;
  logo_path: string;
  site_name: string;
  language_toggle: boolean;
}

interface NavbarData {
  menuItems: MenuItem[];
  dropdownItems: any[];
  settings: SiteSettings;
}

interface NavbarProps {
  context?: string;
}

// دالة مساعدة لمسار صورة الطالب
const getStudentImageUrl = (photoUrl: string | null): string => {
  if (!photoUrl) {
    return '';
  }
  
  // إذا كان المسار يبدأ بـ http أو https، فهو URL كامل
  if (photoUrl.startsWith('http')) {
    return photoUrl;
  }
  
  // إذا كان المسار يبدأ بـ /، فهو مسار نسبي من الجذر
  if (photoUrl.startsWith('/')) {
    return photoUrl;
  }
  
  // إذا كان المسار يحتوي على Teachers/، فهو مسار لصورة معلم
  if (photoUrl.includes('Teachers/')) {
    return `/${photoUrl}`;
  }
  
  // إذا كان المسار يحتوي على Sudents/، فهو مسار لصورة طالب
  if (photoUrl.includes('Sudents/')) {
    return `/${photoUrl}`;
  }
  
  // افتراضياً، نعتبره مسار لصورة طالب
  return `/Sudents/${photoUrl}`;
};

const Navbar = ({ context = 'global' }: NavbarProps) => {
  const { language, dir } = useTranslation();
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  const [userId, setUserId] = useState('');
  const [navbarData, setNavbarData] = useState<NavbarData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    // التحقق من حجم الشاشة
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Check if user is logged in from localStorage
    const checkAuthStatus = () => {
      const userRole = localStorage.getItem('userRole');
      const storedUserName = localStorage.getItem('userName');
      const storedUserImage = localStorage.getItem('userImage');
      const storedUserId = userRole === 'teacher' 
        ? localStorage.getItem('teacherId')
        : userRole === 'student'
        ? localStorage.getItem('currentStudentId')
        : null;
      
      setIsLoggedIn(!!userRole);
      setIsAdmin(userRole === 'admin');
      setIsStudent(userRole === 'student');
      setIsTeacher(userRole === 'teacher');
      
      if (storedUserName) {
        setUserName(storedUserName);
      }
      
      if (storedUserImage) {
        setUserImage(storedUserImage);
      }
      
      if (storedUserId) {
        setUserId(storedUserId);
      }
      
      // إذا كان المستخدم طالب ولم يكن لديه صورة مخزنة، نحاول جلبها من API
      if (userRole === 'student' && storedUserId && !storedUserImage) {
        fetchStudentImage(storedUserId);
      }
      
      // إذا كان المستخدم معلم ولم يكن لديه صورة مخزنة، نحاول جلبها من API
      if (userRole === 'teacher' && storedUserId && !storedUserImage) {
        fetchTeacherImage(storedUserId);
      }
    };
    
    // دالة لجلب صورة الطالب
    const fetchStudentImage = async (studentId: string) => {
      try {
        const response = await fetch(`/api/api_academics/student/${studentId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.student && data.student.photo_url) {
            // تخزين مسار الصورة في localStorage
            localStorage.setItem('userImage', data.student.photo_url);
            setUserImage(data.student.photo_url);
          }
        }
      } catch (error) {
        console.error('خطأ في جلب صورة الطالب:', error);
      }
    };
    
    // دالة لجلب صورة المعلم
    const fetchTeacherImage = async (teacherId: string) => {
      try {
        const response = await fetch(`/api/api_academics/teacher/${teacherId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.teacher && data.teacher.photo_url) {
            // تخزين مسار الصورة في localStorage
            localStorage.setItem('userImage', data.teacher.photo_url);
            setUserImage(data.teacher.photo_url);
          }
        }
      } catch (error) {
        console.error('خطأ في جلب صورة المعلم:', error);
      }
    };

    // Fetch navbar data
    const fetchNavbarData = async () => {
      try {
        const response = await fetch(`/api/api_pages/navbar?context=${context}&lang=${language}`);
        if (response.ok) {
          const items = await response.json();
          
          // تحويل البيانات المستلمة إلى التنسيق المتوقع مع دعم القوائم المنسدلة
          const formattedData = {
            menuItems: items.map((item: any) => ({
              item_id: item.id,
              title: item.label,
              url: item.link,
              hasDropdown: item.children && item.children.length > 0,
              children: item.children ? item.children.map((child: any) => ({
                item_id: child.id,
                title: child.label,
                url: child.link
              })) : []
            })),
            dropdownItems: [],
            settings: {
              id: 1,
              logo_path: '/image/Alryada--Logo.png',
              site_name: language === 'en' ? 'Al-Riyada University' : 'جامعة الريادة',
              language_toggle: true
            }
          };
          
          setNavbarData(formattedData);
        }
      } catch (error) {
        console.error('خطأ في جلب بيانات شريط التنقل:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial size check
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    checkAuthStatus();
    fetchNavbarData();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [context, language]);
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userImage');
    localStorage.removeItem('teacherId');
    localStorage.removeItem('currentStudentId');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsStudent(false);
    setIsTeacher(false);
    setUserName('');
    setUserImage('');
    setUserId('');
    
    // Redirect to home page if on a protected route
    if (window.location.pathname.includes('/dashboard') || 
        window.location.pathname.includes('/student')) {
      window.location.href = '/';
    }
  };

  // التحقق ما إذا كانت الشاشة محمولة
  const isMobile = windowWidth <= 768;

  if (isLoading) {
    return <div className={styles.navbarPlaceholder}></div>;
  }

  // استخدام البيانات من navbarData
  const menuItems = navbarData?.menuItems || [];

  const settings = navbarData?.settings || {
    id: 1,
    logo_path: '/image/Alryada--Logo.png',
    site_name: language === 'en' ? 'Al-Riyada University' : 'جامعة الريادة',
    language_toggle: true
  };

  // تبديل حالة قائمة الهمبرجر
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // منع التمرير عند فتح القائمة
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // إغلاق القائمة عند النقر على الخلفية
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <motion.nav 
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : styles.solid}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        dir={dir}
      >
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <Image
              src={theme === 'dark' ? '/image/Asset 2.png' : '/image/Alryada--Logo.png'}
              alt={settings.site_name}
              width={150}
              height={50}
              priority
              className={styles.logoImage}
            />
          </Link>

          {/* قائمة التنقل للشاشات الكبيرة */}
          <div className={styles.navLinks}>
            {menuItems.map((item) => (
              <div 
                key={item.item_id} 
                className={styles.navItem}
                onMouseEnter={() => setActiveDropdown(item.item_id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.hasDropdown ? (
                  <>
                    <div 
                      className={styles.dropdownTrigger}
                      onClick={() => setActiveDropdown(activeDropdown === item.item_id ? null : item.item_id)}
                    >
                      {item.title}
                      <span className={styles.dropdownArrow}>▼</span>
                    </div>
                    {activeDropdown === item.item_id && (
                      <div className={styles.dropdownMenu}>
                        {item.children?.map((child) => (
                          <Link 
                            key={child.item_id} 
                            href={child.url} 
                            className={styles.dropdownItem}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={item.url} className={styles.navLink}>
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            {/* صورة المستخدم */}
            {isLoggedIn ? (
              <Link 
                href={isTeacher ? `/teacher-profile/${userId}` : isStudent ? `/student-profile/${userId}` : '#'} 
                className={`${styles.profileImageContainer} ${styles.hideOnMobile}`}
              >
                {userImage ? (
                  <div className={styles.profileImage}>
                    <Image
                      src={getStudentImageUrl(userImage) || '/image/blank.png'}
                      alt={userName}
                      width={64}
                      height={64}
                      className={styles.avatar}
                    />
                  </div>
                ) : (
                  <div className={styles.profileImage}>
                    <FaUserCircle className={styles.userIcon} />
                  </div>
                )}
              </Link>
            ) : null}

            {/* زر تبديل السمة - يظهر على كل الشاشات */}
            <div className={styles.desktopThemeToggle}>
              <ThemeToggle />
            </div>
            
            {/* زر تبديل اللغة */}
            <div className={styles.desktopLanguageSwitcher}>
              <LanguageSwitcher />
            </div>

            {/* زر لوحة التحكم (يظهر فقط إذا كان المستخدم مسجل الدخول وهو مدير) */}
            {isLoggedIn && isAdmin && (
              <Link href="/dashboard" className={styles.controlPanelButton}>
                <FaCog className={styles.cogIcon} />
                <span>{language === 'en' ? 'Dashboard' : 'لوحة التحكم'}</span>
              </Link>
            )}

            {/* زر قائمة الهمبرجر للشاشات الصغيرة */}
            <div 
              className={`${styles.hamburgerMenu} ${mobileMenuOpen ? styles.open : ''}`}
              onClick={toggleMobileMenu}
            >
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
            </div>
          </div>
        </div>
              </motion.nav>

      {/* القائمة المتحركة للهاتف */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
        <div className={styles.mobileMenuContent}>
          {/* معلومات المستخدم في القائمة المتحركة */}
          {isLoggedIn && (
            <div className={styles.mobileUserSection}>
              <Link 
                href={isTeacher ? `/teacher-profile/${userId}` : isStudent ? `/student-profile/${userId}` : '#'} 
                className={styles.mobileProfileLink}
                onClick={closeMobileMenu}
              >
                <div className={styles.mobileProfileContainer}>
                  {userImage ? (
                    <div className={styles.mobileProfileImage}>
                      <Image
                        src={userImage}
                        alt={userName}
                        width={50}
                        height={50}
                        className={styles.mobileAvatar}
                      />
                    </div>
                  ) : (
                    <div className={styles.mobileProfileImage}>
                      <FaUserCircle className={styles.mobileUserIcon} />
                    </div>
                  )}
                  <div className={styles.mobileUserInfo}>
                    <span className={styles.mobileUserName}>{userName}</span>
                    <span className={styles.mobileUserRole}>
                      {isAdmin ? (language === 'en' ? 'Administrator' : 'مدير النظام') : 
                       isTeacher ? (language === 'en' ? 'Teacher' : 'استاذ') : 
                       isStudent ? (language === 'en' ? 'Student' : 'طالب') : ''}
                    </span>
                  </div>
                </div>
              </Link>
              {isLoggedIn && (
                <button className={styles.mobileLogoutButton} onClick={handleLogout}>
                  <FaSignOutAlt className={styles.mobileLogoutIcon} />
                  <span>{language === 'en' ? 'Logout' : 'تسجيل الخروج'}</span>
                </button>
              )}
              {isAdmin && (
                <Link href="/dashboard" className={styles.mobileDashboardButton} onClick={closeMobileMenu}>
                  <FaCog className={styles.mobileCogIcon} />
                  <span>{language === 'en' ? 'Dashboard' : 'لوحة التحكم'}</span>
                </Link>
              )}
              {isTeacher && (
                <Link href={`/teacher-profile/${userId}`} className={styles.mobileDashboardButton} onClick={closeMobileMenu}>
                  <FaChalkboardTeacher className={styles.mobileCogIcon} />
                  <span>{language === 'en' ? 'My Profile' : 'الملف الشخصي'}</span>
                </Link>
              )}
            </div>
          )}

          <div className={styles.mobileDivider}></div>

          {/* روابط التنقل */}
          {menuItems.map((item) => (
            <div key={item.item_id}>
              {item.hasDropdown ? (
                <>
                  <div 
                    className={`${styles.mobileNavLink} ${styles.mobileDropdownTrigger}`}
                    onClick={() => setActiveDropdown(activeDropdown === item.item_id ? null : item.item_id)}
                  >
                    {language === 'en' ? item.title : item.title}
                    <span className={styles.dropdownArrow}>▼</span>
                  </div>
                  {activeDropdown === item.item_id && (
                    <div className={styles.mobileDropdownMenu}>
                      {item.children?.map((child) => (
                        <Link
                          key={child.item_id}
                          href={child.url}
                          className={styles.mobileDropdownItem}
                          onClick={closeMobileMenu}
                        >
                          {language === 'en' ? child.title : child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.url}
                  className={styles.mobileNavLink}
                  onClick={closeMobileMenu}
                >
                  {language === 'en' ? item.title : item.title}
                </Link>
              )}
            </div>
          ))}

          {/* معلومات المستخدم */}
          
        </div>
      </div>

      {/* الخلفية الشفافة للقائمة */}
      <div 
        className={`${styles.backdrop} ${mobileMenuOpen ? styles.show : ''}`}
        onClick={closeMobileMenu}
      ></div>
    </>
  );
};

export default Navbar;