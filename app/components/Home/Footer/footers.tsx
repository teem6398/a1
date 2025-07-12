'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './footers.module.css';
import { FaWhatsapp, FaInstagram, FaFacebook, FaMapMarkerAlt, FaPhone, FaEnvelope, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import * as Icons from 'react-icons/fa';
import { useTranslation } from '../../../lib/translation-context';

interface FooterSection {
  id: number;
  title: string;
  type: string;
  content: any[];
}

interface Copyright {
  id: number;
  text: string;
  year: string;
}

interface FooterData {
  sections: FooterSection[];
  copyright: Copyright;
}

const iconMap: { [key: string]: any } = {
  FaWhatsapp,
  FaInstagram,
  FaTwitter: FaXTwitter,
  FaXTwitter,
  FaFacebook,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaLinkedin
};

const Footer = () => {
  const { language, dir } = useTranslation();
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log(`Fetching footer data with language: ${language}...`);
        const response = await fetch(`/api/api_pages/footer?lang=${language}`);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Footer data fetched successfully:', data);
          setFooterData(data);
        } else {
          const errorText = await response.text();
          console.error('Failed to fetch footer data, status:', response.status, 'response:', errorText);
          setError(`فشل في جلب بيانات التذييل: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching footer data:', error);
        setError(`خطأ في جلب بيانات التذييل: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFooterData();
  }, [language]);

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName] || Icons[iconName as keyof typeof Icons] || FaFacebook;
    return <IconComponent />;
  };

  if (isLoading) {
    return <div className={styles.loading}>{language === 'en' ? 'Loading...' : 'جاري التحميل...'}</div>;
  }

  // عرض تذييل بسيط في حالة وجود خطأ أو عدم وجود بيانات
  if (error || !footerData || !footerData.sections || footerData.sections.length === 0) {
    return (
      <footer className={styles.footer} dir={dir}>
        <div className={styles.footerContent}>
          {/* قسم روابط أساسية */}
          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>
              {language === 'en' ? 'Quick Links' : 'روابط سريعة'}
            </h3>
            <ul className={styles.linksList}>
              <li><Link href="/">{language === 'en' ? 'Home' : 'الرئيسية'}</Link></li>
              <li><Link href="/about">{language === 'en' ? 'About' : 'عن الجامعة'}</Link></li>
              <li><Link href="/admission">{language === 'en' ? 'Admission' : 'القبول'}</Link></li>
            </ul>
          </div>
          
          {/* قسم التواصل */}
          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>
              {language === 'en' ? 'Contact Us' : 'اتصل بنا'}
            </h3>
            <ul className={styles.contactList}>
              <li>
                <FaMapMarkerAlt />
                <span>{language === 'en' ? 'Alryada University, Main Street' : 'جامعة الريادة، الشارع الرئيسي'}</span>
              </li>
              <li>
                <FaPhone />
                <span>+123 456 7890</span>
              </li>
              <li>
                <FaEnvelope />
                <span>info@alryada.edu</span>
              </li>
            </ul>
          </div>
          
          {/* قسم التواصل الاجتماعي */}
          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>
              {language === 'en' ? 'Follow Us' : 'تابعنا'}
            </h3>
            <div className={styles.socialLinks}>
              <a href="#" className={`${styles.socialLink} ${styles.facebookLink}`} aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="#" className={`${styles.socialLink} ${styles.xTwitterLink}`} aria-label="X (Twitter)">
                <FaXTwitter />
              </a>
              <a href="#" className={`${styles.socialLink} ${styles.instagramLink}`} aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className={`${styles.socialLink} ${styles.linkedinLink}`} aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>{language === 'en' ? '© 2025 Alryada University. All rights reserved.' : '© 2025 جامعة الريادة. جميع الحقوق محفوظة.'}</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className={styles.footer} dir={dir}>
      <div className={styles.footerContent}>
        {footerData.sections.map((section) => (
          <div key={section.id} className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>{section.title}</h3>
            
            {section.type === 'social' && (
              <div className={styles.socialLinks}>
                {section.content.map((item) => {
                  const getSocialClass = (iconName: string) => {
                    switch (iconName) {
                      case 'FaFacebook':
                        return `${styles.socialLink} ${styles.facebookLink}`;
                      case 'FaTwitter':
                      case 'FaXTwitter':
                        return `${styles.socialLink} ${styles.xTwitterLink}`;
                      case 'FaInstagram':
                        return `${styles.socialLink} ${styles.instagramLink}`;
                      case 'FaLinkedin':
                        return `${styles.socialLink} ${styles.linkedinLink}`;
                      case 'FaWhatsapp':
                        return `${styles.socialLink} ${styles.whatsappLink}`;
                      default:
                        return styles.socialLink;
                    }
                  };
                  
                  return (
                    <a 
                      key={item.social_id} 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={getSocialClass(item.icon)}
                      aria-label={item.title || item.icon}
                    >
                      {getIcon(item.icon)}
                    </a>
                  );
                })}
              </div>
            )}
            
            {section.type === 'links' && (
              <ul className={styles.linksList}>
                {section.content.map((item) => (
                  <li key={item.link_id}>
                    <Link href={item.url}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            )}
            
            {section.type === 'contact' && (
              <ul className={styles.contactList}>
                {section.content.map((item) => (
                  <li key={item.id}>
                    {getIcon(item.icon)}
                    <span>{item.value}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className={styles.copyright}>
        <p>{footerData.copyright?.text} {footerData.copyright?.year}</p>
      </div>
    </footer>
  );
};

export default Footer;