'use client';

import AlumniList from '../components/Home/AlumniStories/List/AlumniList';
import { useTranslation } from '../lib/translation-context';

export default function AlumniStoriesPage() {
  const { language } = useTranslation();
  
  return (
    <div className="alumni-stories-page">
      <AlumniList />
    </div>
  );
} 