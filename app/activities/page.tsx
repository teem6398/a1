import React from 'react';
import { getActivities, getActivityCategories } from '../api/api_pages/activities/db';
import { ActivitiesContainer } from './ActivitiesContainer';
import { cookies } from 'next/headers';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

// صفحة الأنشطة (Server Component)
export default async function ActivitiesPage({ searchParams }: PageProps) {
  // Get language from cookie or query parameter
  const cookieStore = cookies();
  const langCookie = cookieStore.get('NEXT_LOCALE');
  const lang = searchParams.lang as string || langCookie?.value || 'ar';

  // جلب البيانات من الخادم
  const [activities, categories] = await Promise.all([
    getActivities(lang),
    getActivityCategories(lang)
  ]);

  return <ActivitiesContainer initialActivities={activities} initialCategories={categories} />;
} 