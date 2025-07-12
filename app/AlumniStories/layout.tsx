'use client';

import { useTranslation } from '../lib/translation-context';
import { useEffect } from 'react';

export default function AlumniStoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language, dir } = useTranslation();
  
  // تطبيق اتجاه اللغة على القسم
  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);
  
  return (
    <div className={`alumni-stories-layout ${language}`} dir={dir}>
      {children}
    </div>
  );
} 