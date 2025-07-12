'use client';

import { useEffect, useState } from 'react';
import TeacherProfile from '../components/Teacher/TeacherProfile';

export default function TeacherProfilePage() {
  const [teacherId, setTeacherId] = useState<string | null>(null);

  useEffect(() => {
    // استرجاع معرف المعلم من localStorage عند تحميل الصفحة
    const storedTeacherId = localStorage.getItem('teacherId');
    console.log('Retrieved teacherId from localStorage:', storedTeacherId); // للتصحيح
    setTeacherId(storedTeacherId);
  }, []);

  return (
    <main>
      <TeacherProfile teacherId={teacherId || undefined} />
    </main>
  );
}
