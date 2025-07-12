'use client';

import React, { useState } from 'react';
import CollegeGeometricShapes, { aboutCollegeShapes } from './CollegeGeometricShapes';

interface AboutSectionProps {
  collegeName: string;
  deanWord: string;
  goals: string[];
  vision: string;
  mission: string;
}

const EnhancedAboutSection: React.FC<AboutSectionProps> = ({
  collegeName,
  deanWord,
  goals,
  vision,
  mission,
}) => {
  const [activeTab, setActiveTab] = useState<'dean' | 'goals' | 'vision' | 'mission'>('dean');

  const tabs = [
    { id: 'dean', label: 'كلمة عميد الكلية', content: deanWord },
    { id: 'goals', label: 'أهداف الكلية', content: goals },
    { id: 'vision', label: 'رؤية الكلية', content: vision },
    { id: 'mission', label: 'رسالة الكلية', content: mission },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dean':
        return (
          <div className="college-tab-content active">
            <h3>كلمة عميد الكلية</h3>
            <p>{deanWord}</p>
          </div>
        );
      case 'goals':
        return (
          <div className="college-tab-content active">
            <h3>أهداف الكلية</h3>
            <ul>
              {goals.map((goal, index) => (
                <li key={index}>{goal}</li>
              ))}
            </ul>
          </div>
        );
      case 'vision':
        return (
          <div className="college-tab-content active">
            <h3>رؤية الكلية</h3>
            <p>{vision}</p>
          </div>
        );
      case 'mission':
        return (
          <div className="college-tab-content active">
            <h3>رسالة الكلية</h3>
            <p>{mission}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="about-college-section college-section">
      <CollegeGeometricShapes shapes={aboutCollegeShapes} className="about-shapes" />
      
      <div className="about-college-container">
        <h2 className="about-college-title">
          عن {collegeName}
        </h2>

        <div className="college-tabs-container">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`college-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id as any)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="college-tab-content-container">
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

export default EnhancedAboutSection; 