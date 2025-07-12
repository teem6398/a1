'use client';

import React, { useState, useEffect } from 'react';
import styles from '../Teacher.module.css';
import { Course, CoursesSectionProps } from '../interfaces';

const CoursesSection: React.FC<CoursesSectionProps> = ({ teacherId }) => {
  const [fetchedCourses, setFetchedCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!teacherId) {
      setIsLoading(false);
      //setError('Teacher ID is not provided.'); // Or handle as appropriate
      setFetchedCourses([]); // Clear courses if no teacherId
      return;
    }

    const fetchCourses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/api_academics/teachers/course?teacherId=${teacherId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        const data: Course[] = await response.json();
        setFetchedCourses(data);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred while fetching courses.');
        }
        setFetchedCourses([]); // Clear courses on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [teacherId]);

  if (isLoading) {
    return <div className={styles.coursesSection}><p className={styles.loading}>جار تحميل المواد الدراسية...</p></div>;
  }

  if (error) {
    return <div className={styles.coursesSection}><p className={styles.error}>خطأ في تحميل المواد: {error}</p></div>;
  }

  return (
    <div className={styles.coursesSection}>
      <h2 className={styles.sectionTitle}>المواد الدراسية</h2>
      <div className={styles.coursesList}>
        {fetchedCourses.length > 0 ? (
          fetchedCourses.map((course) => (
            <div key={course.course_id} className={styles.courseCard}>
              <h3 className={styles.courseTitle}>{course.course_name_ar || course.course_name_en || 'مادة غير مسماة'}</h3>
              <div className={styles.courseInfo}>
                {(course.description_ar || course.description_en) && 
                  <p className={styles.courseDescription}>{course.description_ar || course.description_en}</p>
                }
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noData}>لا توجد مواد دراسية مسجلة لهذا المعلم.</div>
        )}
      </div>
    </div>
  );
};

export default CoursesSection;
