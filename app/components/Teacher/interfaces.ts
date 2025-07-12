export interface Teacher {
  teacher_id: string;
  name_ar: string; // تم التعديل من name
  name_en?: string;
  photo_url: string;
  academic_degree: string;
  department: string;
  college: string;
  email: string;
  phone: string;
  gender?: string;
  hire_date?: string; // Store as ISO string or YYYY-MM-DD
  bio: string;
  years_of_experience: number;
  specialization?: string;
  office_location?: string;
  // courses_taught?: Array<{ course_id: string; course_name: string; credits: number }>;
  // publications?: Array<{ title: string; journal: string; year: number; link?: string }>;
  // research_interests?: string[];
}

export interface Course {
  course_id: string;
  course_name_ar: string;
  course_name_en?: string;
  credits: number;
  description_ar?: string;
  description_en?: string;
  department_id?: string;
}

// Props for CoursesSection
export interface CoursesSectionProps {
  courses: Course[];
  teacherId?: string;
}

export interface Publication {
  publication_id: number;
  teacher_id: number;
  title_ar?: string;
  title_en?: string;
  description_ar?: string;
  description_en?: string;
  publication_date?: string;
  category?: string;
  file_path?: string;
  thumbnail_path?: string;
  journal_conference_name_ar?: string;
  journal_conference_name_en?: string;
  publication_year?: number;
  link?: string;
  thumbnailUrl?: string;
  mediaType?: 'video' | 'image' | 'pdf' | 'powerpoint';
}

// Props for PublicationsSection
export interface PublicationsSectionProps {
  publications: Publication[];
  teacherId?: string;
  lang?: string;
  isOwner?: boolean;
}

export interface TeacherAdvice {
  advice_id: string;
  title_ar: string;
  title_en?: string;
  content_ar: string;
  content_en?: string;
  category?: string; 
  teacher_id?: string;
  created_at?: string;
}

// Props for AdviceSection
export interface AdviceSectionProps {
  advice: TeacherAdvice[]; // استخدام TeacherAdvice
  teacherId?: string;
}
