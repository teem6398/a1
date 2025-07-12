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

interface GeometricShapesProps {
  shapes: ShapeProps[];
  className?: string;
}

const GeometricShapes: React.FC<GeometricShapesProps> = ({ shapes, className = '' }) => {
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
          opacity: shape.opacity || 0.7,
        };

        return <div key={index} className={shapeClass} style={style} />;
      })}
    </div>
  );
};

// مجموعة أشكال افتراضية للاستخدام السريع
export const defaultShapes: ShapeProps[] = [
  { type: 'circle', color: 1, size: 120, top: '10%', left: '5%', opacity: 0.6 },
  { type: 'square', color: 2, size: 80, top: '20%', left: '85%', rotate: 30, opacity: 0.5 },
  { type: 'triangle', color: 3, size: 100, top: '70%', left: '10%', rotate: 45, opacity: 0.5 },
  { type: 'circle', color: 2, size: 60, top: '60%', left: '80%', opacity: 0.6 },
  { type: 'square', color: 3, size: 50, top: '85%', left: '45%', rotate: 15, opacity: 0.5 },
  { type: 'triangle', color: 1, size: 70, top: '40%', left: '90%', rotate: -15, opacity: 0.4 },
];

// مجموعة أشكال للأقسام المختلفة
export const aboutSectionShapes: ShapeProps[] = [
  { type: 'circle', color: 1, size: 100, top: '15%', left: '8%', opacity: 0.5 },
  { type: 'square', color: 2, size: 70, top: '25%', left: '85%', rotate: 30, opacity: 0.5 },
  { type: 'triangle', color: 3, size: 90, top: '75%', left: '12%', rotate: 45, opacity: 0.4 },
  { type: 'circle', color: 3, size: 50, top: '65%', left: '85%', opacity: 0.5 },
];

export const newsSectionShapes: ShapeProps[] = [
  { type: 'square', color: 1, size: 80, top: '10%', left: '80%', rotate: -15, opacity: 0.5 },
  { type: 'circle', color: 2, size: 110, top: '65%', left: '5%', opacity: 0.4 },
  { type: 'triangle', color: 3, size: 70, top: '30%', left: '15%', rotate: 30, opacity: 0.5 },
  { type: 'square', color: 2, size: 60, top: '80%', left: '75%', rotate: 45, opacity: 0.4 },
];

export const alumniSectionShapes: ShapeProps[] = [
  { type: 'triangle', color: 1, size: 90, top: '20%', left: '85%', rotate: -30, opacity: 0.4 },
  { type: 'circle', color: 3, size: 120, top: '70%', left: '10%', opacity: 0.5 },
  { type: 'square', color: 2, size: 70, top: '15%', left: '15%', rotate: 15, opacity: 0.5 },
  { type: 'circle', color: 1, size: 50, top: '75%', left: '80%', opacity: 0.6 },
];

export default GeometricShapes; 