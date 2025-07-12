'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';
import { motion, AnimatePresence, useInView, useScroll } from 'framer-motion';
import { useTranslation } from '../../../lib/translation-context';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

interface Slide {
  slide_id: number;
  title: string;
  description: string;
  image_path: string;
  button_text: string;
  button_url: string;
}

const Hero = () => {
  const { language, dir } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [direction, setDirection] = useState(0);
  const [overlayOpacity, setOverlayOpacity] = useState(0.4);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const isInView = useInView(scrollRef);

  // درجة شفافية الطبقة العلوية تتغير مع التمرير
  useEffect(() => {
    const handleOpacityChange = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = 300;
      const newOpacity = 0.4 + Math.min(scrollPosition / maxScroll, 0.4);
      setOverlayOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleOpacityChange);
    return () => window.removeEventListener('scroll', handleOpacityChange);
  }, []);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch(`/api/api_pages/hero?lang=${language}`);
        if (response.ok) {
          const data = await response.json();
          setSlides(data);
        }
      } catch (error) {
        console.error('خطأ في جلب بيانات العرض الرئيسي:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlides();
  }, [language]);

  const nextSlide = () => {
    if (slides.length === 0) return;
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (slides.length === 0) return;
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>{language === 'en' ? 'Loading...' : 'جاري التحميل...'}</p>
      </div>
    );
  }

  if (slides.length === 0) {
    return null;
  }

  const slideVariants = {
    enter: () => ({
      opacity: 0,
    }),
    center: {
      opacity: 1,
      transition: {
        opacity: { duration: 0.4 },
      },
    },
    exit: () => ({
      opacity: 0,
      transition: {
        opacity: { duration: 0.2 },
      },
    }),
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.15,
        duration: 0.6,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  };
  
  const changeSlideTo = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  return (
    <section className={styles.hero} ref={scrollRef} dir={dir}>
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          className={styles.slide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <div className={styles.imageWrapper}>
            <Image
              src={slides[currentSlide].image_path}
              alt={slides[currentSlide].title}
              fill
              priority
              className={styles.slideImage}
              style={{ objectFit: 'cover' }}
            />
            <div 
              className={styles.overlay} 
              style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
            />
            <div className={styles.gradientOverlay} />
          </div>
          
          <div className={styles.content}>
            <motion.div 
              className={styles.contentInner}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: {
                    delayChildren: 0.3,
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              <motion.div
                className={styles.titleContainer}
                variants={contentVariants}
                custom={0}
            >
                <h1 className={styles.title}>{slides[currentSlide].title}</h1>
                <div className={styles.titleDecoration}></div>
              </motion.div>
              
            <motion.p
              className={styles.description}
                variants={contentVariants}
                custom={1}
            >
              {slides[currentSlide].description}
            </motion.p>
              
              <motion.div
                variants={contentVariants}
                custom={2}
                className={styles.buttonContainer}
              >
                <button
              className={styles.cta}
              onClick={() => {
                if (slides[currentSlide].button_url && slides[currentSlide].button_url !== '#') {
                  window.location.href = slides[currentSlide].button_url;
                }
              }}
            >
                  <span>{slides[currentSlide].button_text || (language === 'en' ? 'Discover More' : 'اكتشف المزيد')}</span>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className={styles.navigation}>
        <div className={styles.navigationInner}>
          <button 
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={() => {
              setDirection(-1);
              prevSlide();
            }}
            aria-label={language === 'en' ? 'Previous' : 'السابق'}
          >
            <FiArrowLeft />
          </button>

          <div className={styles.indicators}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${
                  index === currentSlide ? styles.active : ''
                }`}
                onClick={() => changeSlideTo(index)}
                aria-label={language === 'en' ? `Go to slide ${index + 1}` : `الانتقال إلى الشريحة ${index + 1}`}
              >
                <div className={styles.indicatorInner}>
                  <div 
                    className={styles.indicatorProgress} 
                    style={{
                      animationPlayState: index !== currentSlide ? 'paused' : 'running'
                    }}
                  ></div>
                </div>
              </button>
            ))}
          </div>
          
          <button 
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={() => {
              setDirection(1);
              nextSlide();
            }}
            aria-label={language === 'en' ? 'Next' : 'التالي'}
          >
            <FiArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero; 