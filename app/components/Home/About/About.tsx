'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './About.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '../../../lib/translation-context';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiTarget, FiBook, FiUsers, FiAward, FiGlobe, FiTrendingUp, FiMapPin, FiMessageCircle, FiStar } from 'react-icons/fi';

interface UniversityMission {
  id: number;
  title: string;
  content: string;
  language: string;
}

interface UniversityGoal {
  id: number;
  goal_title: string;
  goal_description: string;
  goal_order: number;
  icon: string;
  language: string;
}

interface AboutData {
  id: number;
  title: string;
  description: string;
  read_more_link: string;
  mission: UniversityMission | null;
  goals: UniversityGoal[];
}

interface Feature {
  id: number;
  feature: string;
  feature_order: number;
}

interface Stat {
  id: number;
  number: string;
  label: string;
  stat_order: number;
}

interface President {
  id: number;
  title: string;
  message: string;
  president_name: string;
  president_title: string;
  image_path: string;
}

const Page = () => {
  const { language, dir } = useTranslation();
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [presidentData, setPresidentData] = useState<President | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPresident, setShowPresident] = useState(false);
  const [showGoals, setShowGoals] = useState(false);
  const [showMission, setShowMission] = useState(false);
  const presidentSectionRef = useRef<HTMLDivElement>(null);
  const goalsSectionRef = useRef<HTMLDivElement>(null);
  const missionSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutResponse, missionResponse] = await Promise.all([
          fetch(`/api/api_pages/about?lang=${language}`),
          fetch(`/api/api_pages/about/mission-and-goals?lang=${language}`)
        ]);

        if (aboutResponse.ok && missionResponse.ok) {
          const aboutData = await aboutResponse.json();
          const missionData = await missionResponse.json();
          
          setAboutData({
            ...aboutData.about,
            mission: missionData.mission,
            goals: missionData.goals
          });
          setFeatures(aboutData.features || []);
          setStats(aboutData.stats || []);
          setPresidentData(aboutData.president);
        }
      } catch (error) {
        console.error('خطأ في جلب بيانات عن الجامعة:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [language]);

  const togglePresidentSection = () => {
    if (showPresident) {
      setShowPresident(false);
    } else {
      setShowPresident(true);
      setShowGoals(false);
      setShowMission(false);
      if (presidentSectionRef.current) {
        setTimeout(() => {
          presidentSectionRef.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start' 
          });
        }, 100);
      }
    }
  };

  const toggleGoalsSection = () => {
    if (showGoals) {
      setShowGoals(false);
    } else {
      setShowGoals(true);
      setShowPresident(false);
      setShowMission(false);
      if (goalsSectionRef.current) {
        setTimeout(() => {
          goalsSectionRef.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start' 
          });
        }, 100);
      }
    }
  };

  const toggleMissionSection = () => {
    if (showMission) {
      setShowMission(false);
    } else {
      setShowMission(true);
      setShowPresident(false);
      setShowGoals(false);
      if (missionSectionRef.current) {
        setTimeout(() => {
          missionSectionRef.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start' 
          });
        }, 100);
      }
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>{language === 'en' ? 'Loading...' : 'جاري التحميل...'}</p>
      </div>
    );
  }

  if (!aboutData || !presidentData) {
    return null;
  }

  return (
    <div className={styles.aboutWrapper}>
      <motion.section 
        id="about" 
        className={styles.about} 
        dir={dir}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
      <div className={styles.container}>
          <div className={styles.sectionTitle}>
          <h2 data-translate="about-title">{aboutData.title}</h2>
        </div>
        
        {/* قسم الفيديو التعريفي */}
          <motion.div 
            className={styles.videoSection}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
          <div className={styles.videoWrapper}>
            <iframe
              className={styles.video}
              src="12.mp4"
              title={language === 'en' ? 'University Introduction Video' : 'فيديو تعريفي عن الجامعة'}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          </motion.div>
          
          {/* أزرار للأقسام المختلفة */}
          <div className={styles.buttonsContainer}>
            <motion.button
              className={styles.showPresidentBtn}
              onClick={togglePresidentSection}
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FiMessageCircle size={32} />
              <span>{language === 'en' ? "President's Message" : 'كلمة رئيس الجامعة'}</span>
            </motion.button>

            <motion.button
              className={styles.showPresidentBtn}
              onClick={toggleGoalsSection}
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            >
              <FiTarget size={32} />
              <span>{language === 'en' ? "Our Goals" : 'أهدافنا'}</span>
            </motion.button>

            <motion.button
              className={styles.showPresidentBtn}
              onClick={toggleMissionSection}
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
            >
              <FiStar size={32} />
              <span>{language === 'en' ? "University Mission" : 'رسالة الجامعة'}</span>
            </motion.button>
        </div>
        
        {/* زر قراءة المزيد */}
        <div className={styles.readMoreContainer} dir={dir}>
            <Link href={aboutData.read_more_link || "/about"} className={`${styles.readMoreBtn} ${styles.blueBtn}`}>
            <svg 
              className={`${styles.readMoreIcon} ${language === 'en' ? '' : styles.rtlIcon}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                  d={language === 'en' ? "M13 5l7 7-7 7M5 12h15" : "M13 5l7 7-7 7M5 12h15"}
              />
            </svg>
              {language === 'en' ? 'Read More' : 'قراءة المزيد'}
          </Link>
        </div>
      </div>
      </motion.section>

      {/* قسم كلمة رئيس الجامعة */}
      <AnimatePresence>
        {showPresident && (
          <motion.section 
            className={styles.presidentMessage} 
            dir={dir}
            ref={presidentSectionRef}
            initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
            animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
            exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
      <div className={styles.container}>
              <motion.h1 
                className={styles.presidentTitle}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {presidentData.title}
              </motion.h1>
              
        <div className={`${styles.presidentContent} ${language === 'en' ? styles.ltrContent : styles.rtlContent}`}>
                <motion.div 
                  className={styles.presidentText}
                  initial={{ x: language === 'en' ? -30 : 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
            <p>{presidentData.message}</p>
            <div className={styles.presidentSignature}>
              <h3>{presidentData.president_name}</h3>
              <p>{presidentData.president_title}</p>
            </div>
                </motion.div>
                
                <motion.div 
                  className={styles.presidentImage}
                  initial={{ x: language === 'en' ? 30 : -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
            <Image 
              src={presidentData.image_path} 
              alt={presidentData.president_name} 
              width={400}
              height={400}
              className={styles.presidentPhoto}
            />
                </motion.div>
              </div>
              
              <motion.button 
                className={styles.collapsePresidentBtn}
                onClick={togglePresidentSection}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {language === 'en' ? 'Close' : 'إغلاق'}
              </motion.button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* قسم رسالة الجامعة */}
      <AnimatePresence>
        {showMission && aboutData.mission && (
          <motion.section 
            className={styles.presidentMessage} 
            dir={dir}
            ref={missionSectionRef}
            initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
            animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
            exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className={styles.container}>
              <motion.h1 
                className={styles.presidentTitle}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {aboutData.mission.title}
              </motion.h1>
              
              <div className={`${styles.presidentContent} ${language === 'en' ? styles.ltrContent : styles.rtlContent}`}>
                <motion.div 
                  className={styles.presidentText}
                  initial={{ x: language === 'en' ? -30 : 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <p>{aboutData.mission.content}</p>
                </motion.div>
              </div>
              
              <motion.button 
                className={styles.collapsePresidentBtn}
                onClick={toggleMissionSection}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {language === 'en' ? 'Close' : 'إغلاق'}
              </motion.button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* قسم الأهداف */}
      <AnimatePresence>
        {showGoals && (
          <motion.div
            ref={goalsSectionRef}
            className={styles.goalsSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.goalsContainer}>
              <div className={styles.sectionTitle}>
                <h2>{language === 'en' ? 'Our Goals' : 'أهدافنا'}</h2>
              </div>
              <motion.div 
                className={styles.goalsGrid}
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {aboutData.goals.map((goal) => {
                  // تعريف مصفوفة من الكلمات المفتاحية والأيقونات المرتبطة بها
                  const iconMap = [
                    { keywords: ['تعليم', 'education'], icon: FiBook },
                    { keywords: ['بحث', 'research'], icon: FiTarget },
                    { keywords: ['مجتمع', 'community'], icon: FiUsers },
                    { keywords: ['جودة', 'quality'], icon: FiAward },
                    { keywords: ['عالمي', 'global'], icon: FiGlobe },
                    { keywords: ['تطوير', 'development'], icon: FiTrendingUp },
                    { keywords: ['قيادة', 'leadership'], icon: FiStar },
                    { keywords: ['تواصل', 'communication'], icon: FiMessageCircle },
                    { keywords: ['موقع', 'location'], icon: FiMapPin }
                  ];

                  // البحث عن الأيقونة المناسبة
                  const title = goal.goal_title.toLowerCase();
                  const GoalIcon = iconMap.find(item => 
                    item.keywords.some(keyword => title.includes(keyword))
                  )?.icon || FiTarget;

                  return (
                    <motion.div
                      key={goal.id}
                      className={styles.goalCard}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: goal.goal_order * 0.1 }}
                    >
                      <div className={styles.goalIcon}>
                        <GoalIcon size={32} />
                      </div>
                      <h3 className={styles.goalTitle}>{goal.goal_title}</h3>
                      <p className={styles.goalDescription}>{goal.goal_description}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;