'use client';

import { redirect } from 'next/navigation';

export default function CollegesPage() {
  // توجيه المستخدم إلى الصفحة الرئيسية
  redirect('/');
  return null;
} 