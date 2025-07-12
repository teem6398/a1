'use client';

import React, { useState, useEffect } from 'react';
import { 
  FaSave, 
  FaCog, 
  FaGlobe, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
  FaLinkedin,
  FaImage,
  FaPlus,
  FaTrash
} from 'react-icons/fa';
import styles from './SettingsEditor.module.css';
import Image from 'next/image';

// Mock settings data
const initialSettings = {
  general: {
    siteName: 'جامعة الريادة',
    siteDescription: 'الموقع الرسمي لجامعة الريادة - التميز في التعليم والبحث العلمي',
    logo: '/image/Alryada--Logo.png',
    favicon: '/image/favicon.ico',
    email: 'info@alriada.edu.ye',
    phone: '+967 1 234 5678',
    address: 'صنعاء، اليمن',
    workingHours: 'السبت - الخميس: 8:00 صباحاً - 4:00 مساءً'
  },
  social: {
    facebook: 'https://facebook.com/alriadauniversity',
    twitter: 'https://twitter.com/alriadauniv',
    instagram: 'https://instagram.com/alriadauniv',
    youtube: 'https://youtube.com/alriadauniversity',
    linkedin: 'https://linkedin.com/company/alriadauniversity'
  },
  seo: {
    metaTitle: 'جامعة الريادة | الصفحة الرئيسية',
    metaDescription: 'موقع الجامعة الرسمي - التميز في التعليم والبحث العلمي',
    keywords: 'جامعة الريادة، تعليم، بحث علمي، كليات، طلاب، يمن'
  }
};

interface SiteSettings {
  id: number;
  logo_path: string;
  site_name: string;
  language_toggle: boolean;
}

interface FooterSection {
  id: number;
  title: string;
  type: string;
  content: any[];
}

interface FooterLink {
  link_id: number;
  section_id: number;
  title: string;
  url: string;
  link_order: number;
}

interface SocialLink {
  social_id: number;
  section_id: number;
  platform: string;
  url: string;
  icon: string;
  active: boolean;
}

interface ContactInfo {
  id: number;
  section_id: number;
  type: string;
  value: string;
  icon: string;
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

const SettingsEditor = () => {
  const [activeTab, setActiveTab] = useState('site');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  // Site Settings
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  // Footer Data
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [selectedSection, setSelectedSection] = useState<FooterSection | null>(null);
  const [newLink, setNewLink] = useState({ title: '', url: '' });
  const [newSocialLink, setNewSocialLink] = useState({ platform: '', url: '', icon: 'FaFacebook' });
  const [newContactInfo, setNewContactInfo] = useState({ type: '', value: '', icon: 'FaMapMarkerAlt' });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch site settings
        const navbarResponse = await fetch('/api/navbar');
        if (navbarResponse.ok) {
          const navbarData = await navbarResponse.json();
          if (navbarData.settings) {
            setSiteSettings(navbarData.settings);
            setLogoPreview(navbarData.settings.logo_path);
          }
        }
        
        // Fetch footer data
        const footerResponse = await fetch('/api/footer');
        if (footerResponse.ok) {
          const data = await footerResponse.json();
          setFooterData(data);
        }
      } catch (error) {
        console.error('خطأ في جلب البيانات:', error);
        setMessage({ text: 'حدث خطأ أثناء جلب البيانات', type: 'error' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setMessage({ text: 'حجم الشعار يجب أن يكون أقل من 2 ميجابايت', type: 'error' });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setLogoPreview(base64String);
        if (siteSettings) {
          setSiteSettings({ ...siteSettings, logo_path: base64String });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSiteSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!siteSettings) return;
    
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setSiteSettings({
        ...siteSettings,
        [name]: checked
      });
    } else {
      setSiteSettings({
        ...siteSettings,
        [name]: value
      });
    }
  };

  const handleSaveSiteSettings = async () => {
    if (!siteSettings) return;
    
    setIsSaving(true);
    setMessage({ text: '', type: '' });
    
    try {
      const response = await fetch('/api/navbar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          menuItems: [],
          settings: siteSettings
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'حدث خطأ أثناء حفظ الإعدادات');
      }
      
      setMessage({ text: 'تم حفظ إعدادات الموقع بنجاح', type: 'success' });
    } catch (error) {
      console.error('خطأ في حفظ إعدادات الموقع:', error);
      setMessage({ 
        text: error instanceof Error ? error.message : 'حدث خطأ أثناء حفظ الإعدادات', 
        type: 'error' 
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSelectSection = (section: FooterSection) => {
    setSelectedSection(section);
  };

  const handleSectionTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedSection || !footerData) return;
    
    const updatedSection = { ...selectedSection, title: e.target.value };
    
    setSelectedSection(updatedSection);
    setFooterData({
      ...footerData,
      sections: footerData.sections.map(section => 
        section.id === selectedSection.id ? updatedSection : section
      )
    });
  };

  const handleAddLink = () => {
    if (!selectedSection || !footerData || !newLink.title || !newLink.url) return;
    
    const newLinkObj: FooterLink = {
      link_id: Date.now(),
      section_id: selectedSection.id,
      title: newLink.title,
      url: newLink.url,
      link_order: selectedSection.content.length + 1
    };
    
    const updatedContent = [...selectedSection.content, newLinkObj];
    const updatedSection = { ...selectedSection, content: updatedContent };
    
    setSelectedSection(updatedSection);
    setFooterData({
      ...footerData,
      sections: footerData.sections.map(section => 
        section.id === selectedSection.id ? updatedSection : section
      )
    });
    
    setNewLink({ title: '', url: '' });
  };

  const handleRemoveLink = (linkId: number) => {
    if (!selectedSection || !footerData) return;
    
    const updatedContent = selectedSection.content.filter(link => 
      link.link_id !== linkId && link.social_id !== linkId && link.id !== linkId
    );
    const updatedSection = { ...selectedSection, content: updatedContent };
    
    setSelectedSection(updatedSection);
    setFooterData({
      ...footerData,
      sections: footerData.sections.map(section => 
        section.id === selectedSection.id ? updatedSection : section
      )
    });
  };

  const handleAddSocialLink = () => {
    if (!selectedSection || !footerData || !newSocialLink.platform || !newSocialLink.url) return;
    
    const newSocialLinkObj: SocialLink = {
      social_id: Date.now(),
      section_id: selectedSection.id,
      platform: newSocialLink.platform,
      url: newSocialLink.url,
      icon: newSocialLink.icon,
      active: true
    };
    
    const updatedContent = [...selectedSection.content, newSocialLinkObj];
    const updatedSection = { ...selectedSection, content: updatedContent };
    
    setSelectedSection(updatedSection);
    setFooterData({
      ...footerData,
      sections: footerData.sections.map(section => 
        section.id === selectedSection.id ? updatedSection : section
      )
    });
    
    setNewSocialLink({ platform: '', url: '', icon: 'FaFacebook' });
  };

  const handleAddContactInfo = () => {
    if (!selectedSection || !footerData || !newContactInfo.type || !newContactInfo.value) return;
    
    const newContactInfoObj: ContactInfo = {
      id: Date.now(),
      section_id: selectedSection.id,
      type: newContactInfo.type,
      value: newContactInfo.value,
      icon: newContactInfo.icon
    };
    
    const updatedContent = [...selectedSection.content, newContactInfoObj];
    const updatedSection = { ...selectedSection, content: updatedContent };
    
    setSelectedSection(updatedSection);
    setFooterData({
      ...footerData,
      sections: footerData.sections.map(section => 
        section.id === selectedSection.id ? updatedSection : section
      )
    });
    
    setNewContactInfo({ type: '', value: '', icon: 'FaMapMarkerAlt' });
  };

  const handleCopyrightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!footerData) return;
    
    const { name, value } = e.target;
    const updatedCopyright = { ...footerData.copyright, [name]: value };
    
    setFooterData({
      ...footerData,
      copyright: updatedCopyright
    });
  };
  
  const handleSaveFooter = async () => {
    if (!footerData) return;
    
    setIsSaving(true);
    setMessage({ text: '', type: '' });
    
    try {
      const response = await fetch('/api/footer', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(footerData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'حدث خطأ أثناء حفظ بيانات التذييل');
      }
      
      setMessage({ text: 'تم حفظ بيانات التذييل بنجاح', type: 'success' });
    } catch (error) {
      console.error('خطأ في حفظ بيانات التذييل:', error);
      setMessage({ 
        text: error instanceof Error ? error.message : 'حدث خطأ أثناء حفظ بيانات التذييل', 
        type: 'error' 
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>جاري التحميل...</div>;
  }

    return (
    <div className={styles.editorContainer}>
      <h1 className={styles.editorTitle}>إعدادات الموقع</h1>

      {message.text && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}

      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tabButton} ${activeTab === 'site' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('site')}
          >
            إعدادات عامة
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'footer' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('footer')}
          >
            تذييل الموقع
          </button>
        </div>
        
        <div className={styles.tabContent}>
          {activeTab === 'site' && (
            <div className={styles.siteSettingsForm}>
          <div className={styles.formGroup}>
                <label htmlFor="site_name">اسم الموقع</label>
              <input
                type="text"
                  id="site_name"
                  name="site_name"
                  value={siteSettings?.site_name || ''}
                  onChange={handleSiteSettingsChange}
                  required
                />
          </div>
          
          <div className={styles.formGroup}>
                <label htmlFor="logo">شعار الموقع</label>
              <input
                  type="file"
                  id="logo"
                  onChange={handleLogoChange}
                  accept="image/*"
                  className={styles.fileInput}
                />
                {logoPreview && (
                  <div className={styles.logoPreview}>
                    <Image
                      src={logoPreview}
                      alt="شعار الموقع"
                      width={150}
                      height={50}
                      className={styles.previewImage}
                    />
              </div>
            )}
        </div>
        
        <div className={styles.formGroup}>
                <label className={styles.checkboxLabel}>
            <input
                    type="checkbox"
                    name="language_toggle"
                    checked={siteSettings?.language_toggle || false}
                    onChange={handleSiteSettingsChange}
                  />
                  إظهار زر تغيير اللغة
                </label>
        </div>
        
              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.saveButton}
                  onClick={handleSaveSiteSettings}
                  disabled={isSaving}
                >
                  <FaSave /> {isSaving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
                </button>
          </div>
        </div>
          )}

          {activeTab === 'footer' && footerData && (
            <div className={styles.footerEditor}>
              <div className={styles.footerSections}>
                <div className={styles.sectionsList}>
                  <h3 className={styles.subSectionTitle}>أقسام التذييل</h3>
                  {footerData.sections.map(section => (
                    <div 
                      key={section.id} 
                      className={`${styles.sectionItem} ${selectedSection?.id === section.id ? styles.selected : ''}`}
                      onClick={() => handleSelectSection(section)}
                    >
                      <span className={styles.sectionTitle}>{section.title}</span>
                      <span className={styles.sectionType}>({section.type})</span>
          </div>
                  ))}
        </div>
                
                {selectedSection && (
                  <div className={styles.sectionEditor}>
                    <h3 className={styles.subSectionTitle}>تعديل قسم: {selectedSection.title}</h3>
        
        <div className={styles.formGroup}>
                      <label htmlFor="section_title">عنوان القسم</label>
          <input
            type="text"
                        id="section_title"
                        value={selectedSection.title}
                        onChange={handleSectionTitleChange}
                        required
          />
        </div>
        
                    {selectedSection.type === 'links' && (
                      <div className={styles.linksEditor}>
                        <h4>الروابط</h4>
                        <ul className={styles.linksList}>
                          {selectedSection.content.map((link: FooterLink) => (
                            <li key={link.link_id} className={styles.linkItem}>
                              <span className={styles.linkTitle}>{link.title}</span>
                              <span className={styles.linkUrl}>{link.url}</span>
                              <button
                                type="button"
                                className={styles.removeButton}
                                onClick={() => handleRemoveLink(link.link_id)}
                              >
                                <FaTrash />
          </button>
                            </li>
                          ))}
                        </ul>
                        
                        <div className={styles.addLinkForm}>
                          <input
                            type="text"
                            placeholder="عنوان الرابط"
                            value={newLink.title}
                            onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                          />
            <input
                            type="text"
                            placeholder="الرابط (URL)"
                            value={newLink.url}
                            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                          />
                          <button
                            type="button"
                            className={styles.addButton}
                            onClick={handleAddLink}
                            disabled={!newLink.title || !newLink.url}
                          >
                            <FaPlus /> إضافة
                          </button>
          </div>
        </div>
                    )}
                    
                    {selectedSection.type === 'social' && (
                      <div className={styles.socialLinksEditor}>
                        <h4>روابط التواصل الاجتماعي</h4>
                        <ul className={styles.socialLinksList}>
                          {selectedSection.content.map((link: SocialLink) => (
                            <li key={link.social_id} className={styles.socialLinkItem}>
                              <span className={styles.socialIcon}>{link.icon}</span>
                              <span className={styles.socialPlatform}>{link.platform}</span>
                              <span className={styles.socialUrl}>{link.url}</span>
                              <button
                                type="button"
                                className={styles.removeButton}
                                onClick={() => handleRemoveLink(link.social_id)}
                              >
                                <FaTrash />
                              </button>
                            </li>
                          ))}
                        </ul>
                        
                        <div className={styles.addSocialLinkForm}>
                          <input
                            type="text"
                            placeholder="المنصة (مثال: فيسبوك)"
                            value={newSocialLink.platform}
                            onChange={(e) => setNewSocialLink({ ...newSocialLink, platform: e.target.value })}
                          />
                          <input
                            type="text"
                            placeholder="الرابط (URL)"
                            value={newSocialLink.url}
                            onChange={(e) => setNewSocialLink({ ...newSocialLink, url: e.target.value })}
                          />
            <input
                            type="text"
                            placeholder="الأيقونة (مثال: FaFacebook)"
                            value={newSocialLink.icon}
                            onChange={(e) => setNewSocialLink({ ...newSocialLink, icon: e.target.value })}
                          />
                          <button
                            type="button"
                            className={styles.addButton}
                            onClick={handleAddSocialLink}
                            disabled={!newSocialLink.platform || !newSocialLink.url}
                          >
                            <FaPlus /> إضافة
                          </button>
          </div>
        </div>
                    )}
                    
                    {selectedSection.type === 'contact' && (
                      <div className={styles.contactInfoEditor}>
                        <h4>معلومات الاتصال</h4>
                        <ul className={styles.contactInfoList}>
                          {selectedSection.content.map((info: ContactInfo) => (
                            <li key={info.id} className={styles.contactInfoItem}>
                              <span className={styles.contactIcon}>{info.icon}</span>
                              <span className={styles.contactType}>{info.type}</span>
                              <span className={styles.contactValue}>{info.value}</span>
                              <button
                                type="button"
                                className={styles.removeButton}
                                onClick={() => handleRemoveLink(info.id)}
                              >
                                <FaTrash />
                              </button>
                            </li>
                          ))}
                        </ul>
                        
                        <div className={styles.addContactInfoForm}>
                          <input
                            type="text"
                            placeholder="النوع (مثال: العنوان)"
                            value={newContactInfo.type}
                            onChange={(e) => setNewContactInfo({ ...newContactInfo, type: e.target.value })}
                          />
                          <input
                            type="text"
                            placeholder="القيمة (مثال: صنعاء - اليمن)"
                            value={newContactInfo.value}
                            onChange={(e) => setNewContactInfo({ ...newContactInfo, value: e.target.value })}
                          />
            <input
                            type="text"
                            placeholder="الأيقونة (مثال: FaMapMarkerAlt)"
                            value={newContactInfo.icon}
                            onChange={(e) => setNewContactInfo({ ...newContactInfo, icon: e.target.value })}
                          />
                          <button
                            type="button"
                            className={styles.addButton}
                            onClick={handleAddContactInfo}
                            disabled={!newContactInfo.type || !newContactInfo.value}
                          >
                            <FaPlus /> إضافة
                          </button>
          </div>
                      </div>
                    )}
                  </div>
                )}
        </div>
        
              <div className={styles.copyrightEditor}>
                <h3 className={styles.subSectionTitle}>حقوق النشر</h3>
        <div className={styles.formGroup}>
                  <label htmlFor="copyright_text">نص حقوق النشر</label>
            <input
                    type="text"
                    id="copyright_text"
                    name="text"
                    value={footerData.copyright?.text || ''}
                    onChange={handleCopyrightChange}
            />
          </div>
        <div className={styles.formGroup}>
                  <label htmlFor="copyright_year">السنة</label>
            <input
                    type="text"
                    id="copyright_year"
                    name="year"
                    value={footerData.copyright?.year || new Date().getFullYear().toString()}
                    onChange={handleCopyrightChange}
            />
          </div>
        </div>
        
        <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.saveButton}
                  onClick={handleSaveFooter}
                  disabled={isSaving}
                >
                  <FaSave /> {isSaving ? 'جاري الحفظ...' : 'حفظ التذييل'}
          </button>
        </div>
        </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsEditor;