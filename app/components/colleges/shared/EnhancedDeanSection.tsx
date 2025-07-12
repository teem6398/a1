'use client';

import React from 'react';
import CollegeGeometricShapes, { deanSectionShapes } from './CollegeGeometricShapes';

interface DeanSectionProps {
  deanName: string;
  deanImage: string;
  deanMessage: string;
  deanTitle?: string;
  collegeName: string;
}

const EnhancedDeanSection: React.FC<DeanSectionProps> = ({
  deanName,
  deanImage,
  deanMessage,
  deanTitle = 'عميد الكلية',
  collegeName,
}) => {
  return (
    <section className="dean-section college-section">
      <CollegeGeometricShapes shapes={deanSectionShapes} className="dean-shapes" />
      
      <div className="dean-container">
        <div className="dean-card">
          <div className="dean-image-container">
            <img 
              src={deanImage} 
              alt={`${deanName} - ${deanTitle}`}
              className="dean-image"
            />
          </div>
          
          <div className="dean-content">
            <h2 className="dean-title">كلمة العميد</h2>
            <h3 className="dean-name">{deanName}</h3>
            
            <div className="dean-message">
              <p>{deanMessage}</p>
            </div>
            
            <div className="dean-signature">
              <div className="dean-signature-title">{deanTitle} - {collegeName}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedDeanSection; 