'use client';

import React from 'react';

interface ShapeProps {
  type: 'circle' | 'square' | 'triangle';
  color: 1 | 2 | 3;
  size: number;
  top: string;
  left: string;
  rotate?: number;
  opacity?: number;
}

interface CollegeGeometricShapesProps {
  shapes: ShapeProps[];
  className?: string;
}

const CollegeGeometricShapes: React.FC<CollegeGeometricShapesProps> = ({ shapes, className = '' }) => {
  return (
    <div className={`geometric-shapes ${className}`}>
      {shapes.map((shape, index) => {
        const shapeClass = `shape shape-${shape.color} shape-${shape.type}`;
        const style = {
          width: `${shape.size}px`,
          height: `${shape.size}px`,
          top: shape.top,
          left: shape.left,
          transform: shape.rotate ? `rotate(${shape.rotate}deg)` : undefined,
          opacity: shape.opacity || 0.2,
        };

        return <div key={index} className={shapeClass} style={style} />;
      })}
    </div>
  );
};

// مجموعة أشكال خاصة بقسم عن الكلية
export const aboutCollegeShapes: ShapeProps[] = [
  { type: 'circle', color: 1, size: 120, top: '5%', left: '10%', opacity: 0.2 },
  { type: 'square', color: 2, size: 80, top: '15%', left: '85%', rotate: 25, opacity: 0.18 },
  { type: 'triangle', color: 3, size: 100, top: '70%', left: '5%', rotate: 45, opacity: 0.19 },
  { type: 'circle', color: 2, size: 60, top: '75%', left: '90%', opacity: 0.2 },
  { type: 'square', color: 1, size: 70, top: '45%', left: '3%', rotate: -15, opacity: 0.18 },
];

// مجموعة أشكال خاصة بقسم العميد
export const deanSectionShapes: ShapeProps[] = [
  { type: 'circle', color: 1, size: 100, top: '10%', left: '5%', opacity: 0.18 },
  { type: 'square', color: 2, size: 90, top: '20%', left: '88%', rotate: 30, opacity: 0.16 },
  { type: 'triangle', color: 3, size: 110, top: '70%', left: '8%', rotate: -20, opacity: 0.17 },
  { type: 'circle', color: 3, size: 70, top: '80%', left: '85%', opacity: 0.18 },
  { type: 'square', color: 1, size: 60, top: '40%', left: '95%', rotate: 45, opacity: 0.17 },
];

// مجموعة أشكال خاصة بقسم التخصصات
export const majorsSectionShapes: ShapeProps[] = [
  { type: 'triangle', color: 2, size: 130, top: '8%', left: '15%', rotate: 15, opacity: 0.19 },
  { type: 'circle', color: 1, size: 80, top: '25%', left: '80%', opacity: 0.2 },
  { type: 'square', color: 3, size: 90, top: '65%', left: '12%', rotate: -30, opacity: 0.18 },
  { type: 'triangle', color: 1, size: 70, top: '78%', left: '88%', rotate: 60, opacity: 0.19 },
  { type: 'circle', color: 2, size: 50, top: '50%', left: '2%', opacity: 0.18 },
];

// مجموعة أشكال خاصة بقسم الإحصائيات
export const statsectionShapes: ShapeProps[] = [
  { type: 'square', color: 1, size: 90, top: '10%', left: '8%', rotate: 20, opacity: 0.2 },
  { type: 'triangle', color: 2, size: 75, top: '20%', left: '85%', rotate: -15, opacity: 0.19 },
  { type: 'circle', color: 3, size: 110, top: '65%', left: '10%', opacity: 0.18 },
  { type: 'square', color: 2, size: 65, top: '75%', left: '88%', rotate: 35, opacity: 0.2 },
  { type: 'triangle', color: 1, size: 55, top: '40%', left: '95%', rotate: -45, opacity: 0.19 },
];

// مجموعة أشكال خاصة بقسم الخريجين
export const alumniSectionShapes: ShapeProps[] = [
  { type: 'circle', color: 3, size: 140, top: '12%', left: '10%', opacity: 0.2 },
  { type: 'square', color: 1, size: 75, top: '18%', left: '85%', rotate: 20, opacity: 0.18 },
  { type: 'triangle', color: 2, size: 95, top: '68%', left: '5%', rotate: -25, opacity: 0.19 },
  { type: 'circle', color: 2, size: 65, top: '75%', left: '90%', opacity: 0.2 },
  { type: 'square', color: 3, size: 55, top: '45%', left: '98%', rotate: 35, opacity: 0.18 },
];

// مجموعة أشكال خاصة بقسم الأخبار
export const newsSectionShapes: ShapeProps[] = [
  { type: 'square', color: 1, size: 110, top: '8%', left: '12%', rotate: -10, opacity: 0.19 },
  { type: 'circle', color: 2, size: 85, top: '22%', left: '85%', opacity: 0.2 },
  { type: 'triangle', color: 3, size: 120, top: '70%', left: '10%', rotate: 40, opacity: 0.18 },
  { type: 'square', color: 2, size: 60, top: '78%', left: '82%', rotate: 25, opacity: 0.19 },
  { type: 'circle', color: 1, size: 45, top: '40%', left: '95%', opacity: 0.18 },
];

export default CollegeGeometricShapes; 