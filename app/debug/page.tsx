'use client';

import CollegeGeometricShapes, { aboutCollegeShapes, deanSectionShapes, majorsSectionShapes } from '../components/colleges/shared/CollegeGeometricShapes';
import '../components/colleges/sharing/index.css';

export default function DebugPage() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>اختبار الأشكال الهندسية</h1>
      
      {/* قسم اختبار About Shapes */}
      <div style={{ 
        position: 'relative', 
        height: '500px', 
        marginBottom: '2rem', 
        background: 'var(--bg-primary)',
        border: '2px solid #ddd',
        borderRadius: '10px',
        overflow: 'hidden'
      }}>
        <h2 style={{ padding: '1rem', margin: 0 }}>About College Shapes</h2>
        <CollegeGeometricShapes shapes={aboutCollegeShapes} className="about-shapes" />
      </div>
      
      {/* قسم اختبار Dean Shapes */}
      <div style={{ 
        position: 'relative', 
        height: '500px', 
        marginBottom: '2rem', 
        background: 'var(--bg-secondary)',
        border: '2px solid #ddd',
        borderRadius: '10px',
        overflow: 'hidden'
      }}>
        <h2 style={{ padding: '1rem', margin: 0 }}>Dean Section Shapes</h2>
        <CollegeGeometricShapes shapes={deanSectionShapes} className="dean-shapes" />
      </div>
      
      {/* قسم اختبار Majors Shapes */}
      <div style={{ 
        position: 'relative', 
        height: '500px', 
        marginBottom: '2rem', 
        background: 'var(--bg-primary)',
        border: '2px solid #ddd',
        borderRadius: '10px',
        overflow: 'hidden'
      }}>
        <h2 style={{ padding: '1rem', margin: 0 }}>Majors Section Shapes</h2>
        <CollegeGeometricShapes shapes={majorsSectionShapes} className="majors-shapes" />
      </div>
      
      <p style={{ textAlign: 'center', marginTop: '2rem' }}>
        إذا رأيت أشكالاً هندسية متحركة (مربعات، دوائر، مثلثات) في المربعات أعلاه، فإن النظام يعمل بشكل صحيح.
      </p>
    </div>
  );
} 