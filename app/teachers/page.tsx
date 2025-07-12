'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDebounce } from 'use-debounce';
import { FaSearch, FaUniversity, FaChalkboardTeacher, FaGraduationCap, FaUserTie } from 'react-icons/fa';
import styles from './teachers.module.css';

interface Teacher {
  id: string;
  name_ar: string;
  photo_url: string;
  college: string;
}

interface College {
  id: number;
  name: string;
}

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('');
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  // Handle scroll for search bar visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSearchBarVisible(scrollPosition > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch colleges for the filter dropdown
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch('/api/api_academics/colleges');
        if (response.ok) {
          const data: College[] = await response.json();
          setColleges(data);
        }
      } catch (error) {
        console.error('Failed to fetch colleges:', error);
      }
    };
    fetchColleges();
  }, []);

  // Fetch teachers based on search and filter
  const fetchTeachers = useCallback(async () => {
    setLoading(true);
    let url = '/api/api_academics/teachers?';
    const params = new URLSearchParams();
    if (debouncedSearchTerm) {
      params.append('search', debouncedSearchTerm);
    }
    if (selectedCollege) {
      params.append('collegeId', selectedCollege);
    }
    url += params.toString();

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data: Teacher[] = await response.json();
        setTeachers(data);
      }
    } catch (error) {
      console.error('Failed to fetch teachers:', error);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchTerm, selectedCollege]);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  return (
    <div className={styles.pageWrapper}>
      <div className="container mx-auto">
        {/* Hero Section */}
        <header className={styles.heroSection}>
          <div className={styles.heroIcon}>
            <FaChalkboardTeacher />
          </div>
          <h1 className={styles.heroTitle}>
            البحث عن عضو هيئة تدريس
          </h1>
          <p className={styles.heroDescription}>
            اكتشف أعضاء هيئة التدريس المتميزين في جامعتنا وتعرف على خبراتهم وتخصصاتهم
          </p>
        </header>

        {/* Search Section */}
        <div className={`${styles.searchSection} ${isSearchBarVisible ? styles.elevated : ''}`}>
          <div className={styles.searchContainer}>
            <div className={styles.searchForm}>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  placeholder="ابحث باسم المعلم..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
                <FaSearch className={styles.inputIcon} />
              </div>
              <div className={styles.inputWrapper}>
                <select
                  value={selectedCollege}
                  onChange={(e) => setSelectedCollege(e.target.value)}
                  className={styles.selectInput}
                >
                  <option value="">جميع الكليات</option>
                  {colleges.map((college) => (
                    <option key={college.id} value={college.id}>
                      {college.name}
                    </option>
                  ))}
                </select>
                <FaUniversity className={styles.inputIcon} />
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {loading ? (
          <div className={styles.loadingState}>
            <span className={`${styles.loadingSpinner} loading loading-spinner loading-lg`}></span>
            <p>جاري البحث عن المعلمين...</p>
          </div>
        ) : (
          <div className={styles.resultsGrid}>
            {teachers.length > 0 ? (
              teachers.map((teacher) => (
                <Link 
                  href={`/teacher-profile/${teacher.id}?view=guest`} 
                  key={teacher.id} 
                  className={styles.teacherCard}
                >
                  <div className={styles.imageContainer}>
                    <Image
                      src={teacher.photo_url || '/default-avatar.png'}
                      alt={`صورة ${teacher.name_ar}`}
                      layout="fill"
                      objectFit="cover"
                      className={styles.teacherImage}
                    />
                    <div className={styles.imageOverlay}></div>
                  </div>
                  
                  <div className={styles.cardContent}>
                    <div className={styles.teacherName}>
                      <FaUserTie className={styles.cardIcon} />
                      <span>{teacher.name_ar}</span>
                    </div>
                    <div className={styles.teacherCollege}>
                      <FaGraduationCap className={styles.cardIcon} />
                      <span>{teacher.college}</span>
                    </div>
                  </div>

                  <div className={styles.hoverEffect}></div>
                </Link>
              ))
            ) : (
              <div className={styles.noResults}>
                <FaSearch className={styles.noResultsIcon} />
                <h3 className={styles.noResultsTitle}>لا توجد نتائج</h3>
                <p className={styles.noResultsText}>حاول تغيير كلمات البحث أو الفلترة</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}