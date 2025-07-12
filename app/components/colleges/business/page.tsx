'use client';
import { useEffect, useState } from 'react';
import Navbar from '../../Home/Navbar/Navbar';
import Hero from './HeroSection/heroSection';
import About from './AboutSection/aboutSection';
import Dean from './DeanSection/deanSection';
import Majors from './Majors/majors';
import Footer from '../../Home/Footer/footers';

// تعريف نوع بيانات الكلية
interface CollegeData {
  id: number;
  hero_title: string;
  hero_subtitle: string;
  hero_image_url: string;
  about_content: string;
  dean_name: string;
  dean_title: string;
  dean_image_url: string;
  dean_message: string;
  updated_at: string;
}

// تعريف نوع بيانات الإحصائيات
interface StatItem {
  id: number;
  college_id: number;
  stat_number: string;
  stat_label: string;
}

export default function BusinessPage() {
  const [collegeData, setCollegeData] = useState<CollegeData | null>(null);
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCollegeData() {
      try {
        const response = await fetch('/api/api_pages/colleges?id=3'); // id=3 لكلية العلوم الإدارية
        if (!response.ok) {
          throw new Error('Failed to fetch college data');
        }
        const data = await response.json();
        setCollegeData(data.college);
        setStats(data.stats);
      } catch (err) {
        console.error('Error fetching college data:', err);
        setError('Failed to load college data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchCollegeData();
  }, []);

  if (loading) {
    return <div className="loading">جاري تحميل بيانات الكلية...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!collegeData) {
    return <div className="not-found">لم يتم العثور على بيانات الكلية</div>;
  }

  return (
    <div>
      <Navbar context='faculties'/>
      <Hero 
        title={collegeData.hero_title}
        subtitle={collegeData.hero_subtitle}
        imageUrl={collegeData.hero_image_url}
      />
      <About 
        content={collegeData.about_content}
        stats={stats}
      />
      <Dean 
        name={collegeData.dean_name}
        title={collegeData.dean_title}
        imageUrl={collegeData.dean_image_url}
        message={collegeData.dean_message}
      />
      <Majors />
      <Footer />
    </div>
  );
}
