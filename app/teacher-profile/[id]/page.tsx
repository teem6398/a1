'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import TeacherProfile from '../../components/Teacher/TeacherProfile'; 
import styles from './teacherProfilePage.module.css'; 

const TeacherProfilePage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const teacherIdFromUrl = params?.id as string;
  const viewMode = searchParams?.get('view'); // Obtener el parámetro view de la URL

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [teacherIdForProfile, setTeacherIdForProfile] = useState<string | null>(null);

  useEffect(() => {
    if (!teacherIdFromUrl) {
      setIsLoading(false);
      router.push('/login'); 
      return;
    }

    const storedTeacherId = localStorage.getItem('teacherId');
    const userRole = localStorage.getItem('userRole');

    // Autorizar si es modo invitado o si es el profesor autenticado
    if (viewMode === 'guest' || (userRole === 'teacher' && storedTeacherId === teacherIdFromUrl)) {
      setIsAuthorized(true);
      setTeacherIdForProfile(teacherIdFromUrl);
      setIsLoading(false);
    } else {
      // Si no es invitado ni profesor autenticado, redirigir al login
      router.push('/login');
      setIsLoading(false);
    }
  }, [teacherIdFromUrl, router, viewMode]);

  if (isLoading) {
    return <div className={styles.container}><p>يتم التحقق من صلاحية الوصول...</p></div>;
  }

  if (!isAuthorized) {
    return <div className={styles.container}><p>غير مصرح لك بالوصول. يتم الآن توجيهك...</p></div>;
  }

  if (!teacherIdForProfile) {
    return <div className={styles.error}>خطأ: معرف المعلم غير متوفر.</div>;
  }

  // Determinar si el usuario es el propietario del perfil
  const isOwner = localStorage.getItem('userRole') === 'teacher' && 
                  localStorage.getItem('teacherId') === teacherIdForProfile;

  return (
    <div className={styles.container}>
      <TeacherProfile teacherId={teacherIdForProfile} isOwner={isOwner} />
    </div>
  );
};

export default TeacherProfilePage;
