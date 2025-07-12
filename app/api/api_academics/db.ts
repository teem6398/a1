import { Teacher, Course } from '../../components/Teacher/interfaces';
import mysql from 'mysql2/promise';

// تكوين الاتصال بقاعدة البيانات MySQL
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'alryada_university_academics',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});



// Función para ejecutar consultas SQL
export async function executeQuery<T>({ query, values }: { query: string; values?: any[] }): Promise<T> {
  try {
    const [rows] = await pool.execute(query, values);
    return rows as T;
  } catch (error) {
    console.error('Error ejecutando la consulta SQL:', error);
    throw error;
  }
}

// Función para obtener un estudiante por ID
export async function getStudentById(studentId: string) {
  try {
    // Consulta para obtener información básica del estudiante
    const studentQuery = `
      SELECT 
        s.student_id, 
        s.enrollment_number,
        s.first_name_ar as name, 
        s.gender,
        s.birth_date as age,
        b.batch_year as join_year,
        p.program_name,
        m.major_name_ar as major,
        c.college_name_ar as college,
        b.batch_id
      FROM 
        students s
        LEFT JOIN batches b ON s.batch_id = b.batch_id
        LEFT JOIN programs p ON b.program_id = p.program_id
        LEFT JOIN majors m ON p.major_id = m.major_id
        LEFT JOIN colleges c ON p.college_id = c.college_id
      WHERE 
        s.student_id = ?
    `;
    
    const student = await executeQuery<any[]>({ 
      query: studentQuery, 
      values: [studentId] 
    });
    
    if (!student || student.length === 0) {
      return null;
    }

    // الحصول على جميع المواد في الخطة الدراسية للطالب
    const studyPlanQuery = `
      SELECT 
        spd.detail_id,
        spd.credit_hours,
        c.course_name,
        l.level_number,
        s.semester_name
      FROM 
        study_plan_details spd
        JOIN courses c ON spd.course_id = c.course_id
        JOIN levels l ON spd.level_id = l.level_id
        JOIN semesters s ON spd.semester_id = s.semester_id
        JOIN study_plans sp ON spd.plan_id = sp.plan_id
      WHERE 
        sp.batch_id = ?
      ORDER BY
        l.level_number, s.semester_id
    `;
    
    const studyPlan = await executeQuery<any[]>({ 
      query: studyPlanQuery, 
      values: [student[0].batch_id] 
    });

    // الحصول على علامات الطالب
    const gradesQuery = `
      SELECT 
        g.detail_id,
        g.grade,
        g.evaluation,
        l.level_number,
        s.semester_id,
        s.semester_name
      FROM 
        grades g
        JOIN study_plan_details spd ON g.detail_id = spd.detail_id
        JOIN levels l ON spd.level_id = l.level_id
        JOIN semesters s ON spd.semester_id = s.semester_id
      WHERE 
        g.student_id = ?
      ORDER BY 
        l.level_number DESC, s.semester_id DESC
    `;
    
    const grades = await executeQuery<any[]>({ 
      query: gradesQuery, 
      values: [studentId] 
    });

    // إنشاء خريطة للعلامات بناءً على detail_id
    const gradesMap = new Map();
    if (grades && grades.length > 0) {
      grades.forEach(grade => {
        gradesMap.set(grade.detail_id, grade);
      });
    }

    // حساب المعدل التراكمي (GPA) على مقياس 5.0
    let totalPoints = 0;
    let totalCreditHours = 0;
    let completedHours = 0;
    
    if (studyPlan && studyPlan.length > 0) {
      studyPlan.forEach(course => {
        const creditHours = course.credit_hours || 0;
        totalCreditHours += creditHours;
        
        // التحقق مما إذا كان الطالب لديه علامة لهذه المادة
        const grade = gradesMap.get(course.detail_id);
        
        if (grade) {
          // إذا كانت هناك علامة، نحسب النقاط
          completedHours += creditHours;
          
          // تحويل الدرجة إلى نقاط على مقياس 5.0
          let points = 0;
          const numericGrade = parseFloat(grade.grade);
          
          if (numericGrade >= 90) {
            points = 5.0; // A+, A
          } else if (numericGrade >= 85) {
            points = 4.5; // A-
          } else if (numericGrade >= 80) {
            points = 4.0; // B+
          } else if (numericGrade >= 75) {
            points = 3.5; // B
          } else if (numericGrade >= 70) {
            points = 3.0; // B-
          } else if (numericGrade >= 65) {
            points = 2.5; // C+
          } else if (numericGrade >= 60) {
            points = 2.0; // C
          } else if (numericGrade >= 55) {
            points = 1.5; // D+
          } else if (numericGrade >= 50) {
            points = 1.0; // D
          } else {
            points = 0.0; // F
          }
          
          totalPoints += points * creditHours;
        }
        // إذا لم تكن هناك علامة، فإن النقاط تبقى 0 لهذه المادة
      });
    }
    
    // حساب المعدل التراكمي - إذا لم تكن هناك خطة دراسية، نستخدم قيمة افتراضية
    let gpa = "0.00";
    if (totalCreditHours > 0) {
      gpa = (totalPoints / totalCreditHours).toFixed(2);
    }
    
    // تقدير عدد الساعات المتبقية (افتراضياً 140 ساعة للتخرج)
    const totalRequiredHours = totalCreditHours > 0 ? totalCreditHours : 140;
    const remainingHours = Math.max(0, totalRequiredHours - completedHours);
    
    // تحديد المستوى الدراسي بناءً على آخر فصل دراسي له علامات
    let studentLevel = 'المستوى الأول'; // القيمة الافتراضية
    
    if (grades && grades.length > 0) {
      // الحصول على أعلى مستوى دراسي له علامات
      const highestLevel = grades[0].level_number;
      
      // تحويل رقم المستوى إلى نص بالعربية
      switch(highestLevel) {
        case 1: studentLevel = 'المستوى الأول'; break;
        case 2: studentLevel = 'المستوى الثاني'; break;
        case 3: studentLevel = 'المستوى الثالث'; break;
        case 4: studentLevel = 'المستوى الرابع'; break;
        default: studentLevel = `المستوى ${highestLevel}`;
      }
    }
    
    return {
      ...student[0],
      photo_url: '/default-avatar.png', // URL por defecto para la foto
      level: studentLevel, // المستوى المحدد بناءً على العلامات
      nationality: 'يمني', // Valor por defecto para la nacionalidad
      expected_graduation: parseInt(student[0].join_year) + 4, // Estimación de año de graduación
      gpa: parseFloat(gpa), // المعدل التراكمي المحسوب
    };
  } catch (error) {
    console.error('Error al obtener datos del estudiante:', error);
    
    // في حالة حدوث خطأ، نعيد بيانات افتراضية
    return {
      student_id: studentId,
      name: "طالب",
      photo_url: '/default-avatar.png',
      college: "كلية تقنية المعلومات",
      major: "تقنية المعلومات",
      level: "المستوى الأول",
      age: "2000-01-01",
      nationality: "يمني",
      join_year: 2020,
      expected_graduation: 2024,
      gpa: 3.75
    };
  }
}

// Función para obtener las calificaciones de un estudiante
export async function getStudentGrades(studentId: string) {
  try {
    const gradesQuery = `
      SELECT 
        c.course_name,
        c.course_id as course_code,
        spd.credit_hours,
        g.grade,
        g.evaluation,
        l.level_number,
        s.semester_name
      FROM 
        grades g
        JOIN study_plan_details spd ON g.detail_id = spd.detail_id
        JOIN courses c ON spd.course_id = c.course_id
        JOIN levels l ON spd.level_id = l.level_id
        JOIN semesters s ON spd.semester_id = s.semester_id
      WHERE 
        g.student_id = ?
      ORDER BY 
        l.level_number, s.semester_id
    `;
    
    const grades = await executeQuery<any[]>({ 
      query: gradesQuery, 
      values: [studentId] 
    });
    
    // لم يتم العثور على علامات، سنقوم بإنشاء بيانات تجريبية
    if (!grades || grades.length === 0) {
      return generateSampleGrades();
    }
    
    // تحويل النتائج إلى التنسيق المطلوب
    return grades.map(grade => {
      // تحويل المستوى الرقمي إلى نص بالعربية
      let academicYear = '';
      switch(grade.level_number) {
        case 1: academicYear = 'السنة الأولى'; break;
        case 2: academicYear = 'السنة الثانية'; break;
        case 3: academicYear = 'السنة الثالثة'; break;
        case 4: academicYear = 'السنة الرابعة'; break;
        default: academicYear = `السنة ${grade.level_number}`;
      }
      
      // تحويل الفصل الدراسي إلى تنسيق عربي
      let semester = '';
      if (grade.semester_name.includes('1') || grade.semester_name.toLowerCase().includes('first')) {
        semester = 'الفصل الأول';
      } else if (grade.semester_name.includes('2') || grade.semester_name.toLowerCase().includes('second')) {
        semester = 'الفصل الثاني';
      } else {
        semester = grade.semester_name;
      }
      
      // تحويل الدرجة الرقمية إلى تقدير إذا كان متاحاً
      let gradeDisplay = grade.grade;
      if (grade.evaluation) {
        gradeDisplay = `${grade.grade} (${grade.evaluation})`;
      }
      
      return {
        course_name: grade.course_name,
        course_code: grade.course_code,
        credit_hours: grade.credit_hours,
        grade: gradeDisplay,
        academic_year: academicYear,
        semester: semester
      };
    });
  } catch (error) {
    console.error('Error al obtener calificaciones del estudiante:', error);
    // في حالة حدوث خطأ، نقوم بإرجاع بيانات تجريبية
    return generateSampleGrades();
  }
}

// دالة لإنشاء بيانات تجريبية للعلامات
function generateSampleGrades() {
  const sampleCourses = [
    // السنة الأولى - الفصل الأول
    { course_name: 'English Language (1)', course_code: 'ENG101', credit_hours: 3, grade: 'A', academic_year: 'السنة الأولى', semester: 'الفصل الأول' },
    { course_name: 'Arabic Language (1)', course_code: 'ARB101', credit_hours: 2, grade: 'B+', academic_year: 'السنة الأولى', semester: 'الفصل الأول' },
    { course_name: 'Computer Programming (1)', course_code: 'CSC101', credit_hours: 4, grade: 'A-', academic_year: 'السنة الأولى', semester: 'الفصل الأول' },
    { course_name: 'Islamic Culture', course_code: 'ISL101', credit_hours: 2, grade: 'A', academic_year: 'السنة الأولى', semester: 'الفصل الأول' },
    { course_name: 'Calculus (1)', course_code: 'MTH101', credit_hours: 3, grade: 'B', academic_year: 'السنة الأولى', semester: 'الفصل الأول' },
    
    // السنة الأولى - الفصل الثاني
    { course_name: 'English Language (2)', course_code: 'ENG102', credit_hours: 3, grade: 'A-', academic_year: 'السنة الأولى', semester: 'الفصل الثاني' },
    { course_name: 'Arabic Language (2)', course_code: 'ARB102', credit_hours: 2, grade: 'B', academic_year: 'السنة الأولى', semester: 'الفصل الثاني' },
    { course_name: 'Computer Programming (2)', course_code: 'CSC102', credit_hours: 4, grade: 'B+', academic_year: 'السنة الأولى', semester: 'الفصل الثاني' },
    { course_name: 'Introduction to Computer', course_code: 'CSC103', credit_hours: 3, grade: 'A', academic_year: 'السنة الأولى', semester: 'الفصل الثاني' },
    { course_name: 'Calculus (2)', course_code: 'MTH102', credit_hours: 3, grade: 'C+', academic_year: 'السنة الأولى', semester: 'الفصل الثاني' },
    
    // السنة الثانية - الفصل الأول
    { course_name: 'Digital Logic Design', course_code: 'CSC201', credit_hours: 3, grade: 'B+', academic_year: 'السنة الثانية', semester: 'الفصل الأول' },
    { course_name: 'Discrete Mathematics', course_code: 'MTH201', credit_hours: 3, grade: 'A-', academic_year: 'السنة الثانية', semester: 'الفصل الأول' },
    { course_name: 'Object oriented programming', course_code: 'CSC202', credit_hours: 4, grade: 'B', academic_year: 'السنة الثانية', semester: 'الفصل الأول' },
    { course_name: 'Principles of Information Systems', course_code: 'ISC201', credit_hours: 3, grade: 'A', academic_year: 'السنة الثانية', semester: 'الفصل الأول' },
    
    // السنة الثانية - الفصل الثاني
    { course_name: 'Operating Systems (Basic)', course_code: 'CSC203', credit_hours: 3, grade: 'B', academic_year: 'السنة الثانية', semester: 'الفصل الثاني' },
    { course_name: 'Computer Org.& Architecture', course_code: 'CSC204', credit_hours: 3, grade: 'C+', academic_year: 'السنة الثانية', semester: 'الفصل الثاني' },
    { course_name: 'Numerical Analysis', course_code: 'MTH202', credit_hours: 3, grade: 'B-', academic_year: 'السنة الثانية', semester: 'الفصل الثاني' },
    { course_name: 'Data Structures', course_code: 'CSC205', credit_hours: 4, grade: 'A-', academic_year: 'السنة الثانية', semester: 'الفصل الثاني' }
  ];
  
  return sampleCourses;
}

// Función para obtener logros del estudiante (datos de ejemplo)
export async function getStudentAchievements(studentId: string) {
  // Esta función devuelve datos de ejemplo ya que no hay una tabla de logros en la base de datos
  return [
    {
      title: 'مسابقة البرمجة',
      date: '2024-03-15',
      description: 'المركز الأول في مسابقة البرمجة على مستوى الجامعة',
      type: 'داخل الجامعة'
    },
    {
      title: 'دورة تدريبية',
      date: '2023-11-10',
      description: 'إكمال دورة تدريبية في تطوير تطبيقات الويب',
      type: 'داخل الجامعة'
    }
  ];
}

// Función para obtener todos los estudiantes
export async function getAllStudents(): Promise<any[]> {
  try {
    const query = `
      SELECT 
        s.student_id AS id, 
        s.first_name_ar AS name, 
        s.email,
        s.created_at,
        'student' AS role,
        b.batch_name AS batch,
        p.program_name,
        m.major_name_ar AS major,
        c.college_name_ar AS college
      FROM 
        students s
        LEFT JOIN batches b ON s.batch_id = b.batch_id
        LEFT JOIN programs p ON b.program_id = p.program_id
        LEFT JOIN majors m ON p.major_id = m.major_id
        LEFT JOIN colleges c ON p.college_id = c.college_id
      ORDER BY s.created_at DESC
    `;
    
    const students = await executeQuery<any[]>({ query });
    return students;
  } catch (error) {
    console.error('Error al obtener todos los estudiantes:', error);
    throw new Error('Error al obtener todos los estudiantes');
  }
}

// Función para obtener todos los profesores
export async function getAllTeachers(
  searchQuery?: string, 
  collegeId?: string
): Promise<any[]> {
  try {
    let query = `
      SELECT 
        t.teacher_id AS id,
        t.name_ar,
        t.email,
        t.image_path AS photo_url,
        t.created_at,
        'teacher' AS role,
        t.department_name AS department,
        c.college_name_ar AS college
      FROM 
        teachers t
        LEFT JOIN colleges c ON t.college_id = c.college_id
    `;
    
    const values: any[] = [];
    let whereClauses: string[] = [];

    if (searchQuery) {
      whereClauses.push("t.name_ar LIKE ?");
      values.push(`%${searchQuery}%`);
    }

    if (collegeId) {
      whereClauses.push("t.college_id = ?");
      values.push(collegeId);
    }
    
    if (whereClauses.length > 0) {
      query += " WHERE " + whereClauses.join(" AND ");
    }

    query += " ORDER BY t.created_at DESC";
    
    const teachers = await executeQuery<any[]>({ query, values });
    return teachers;
  } catch (error) {
    console.error('Error getting all teachers:', error);
    throw new Error('Error getting all teachers');
  }
}

// Función para obtener un profesor por ID
export async function getTeacherById(teacherId: string): Promise<Teacher | null> {
  try {
    const query = `
      SELECT 
        t.teacher_id,
        t.name_ar,
        t.name_en,
        t.image_path AS photo_url, 
        t.degree AS academic_degree, 
        t.department_name AS department,
        c.college_name_ar AS college,
        t.email,
        t.phone,
        t.gender,
        t.hire_date,
        t.bio, 
        t.years_of_experience 
      FROM 
        teachers t
        LEFT JOIN colleges c ON t.college_id = c.college_id
      WHERE 
        t.teacher_id = ?
    `;
    
    const teachers = await executeQuery<any[]>({
      query: query, 
      values: [teacherId] 
    });
    
    if (!teachers || teachers.length === 0) {
      return null;
    }
    
    const teacherData = teachers[0];
    
    let experienceYears = 0;
    if (teacherData.years_of_experience !== null && teacherData.years_of_experience !== undefined) {
        experienceYears = parseInt(String(teacherData.years_of_experience), 10);
        if (isNaN(experienceYears)) {
            experienceYears = 0;
        }
    }

    let finalPhotoUrl = teacherData.photo_url;
    if (!finalPhotoUrl) {
      finalPhotoUrl = '/default-teacher-avatar.png';
    }
    
    return {
      teacher_id: String(teacherData.teacher_id || ''),
      name_ar: String(teacherData.name_ar || 'اسم غير متوفر'),
      name_en: String(teacherData.name_en || ''),
      photo_url: String(finalPhotoUrl),
      academic_degree: String(teacherData.academic_degree || 'درجة غير متوفرة'),
      department: String(teacherData.department || 'قسم غير متوفر'),
      college: String(teacherData.college || 'كلية غير متوفرة'),
      email: String(teacherData.email || 'بريد غير متوفر'),
      phone: String(teacherData.phone || 'هاتف غير متوفر'),
      gender: String(teacherData.gender || ''),
      hire_date: teacherData.hire_date ? new Date(teacherData.hire_date).toISOString().split('T')[0] : undefined,
      bio: String(teacherData.bio || 'لا توجد نبذة شخصية.'),
      years_of_experience: experienceYears,
      specialization: teacherData.specialization ? String(teacherData.specialization) : undefined,
      office_location: teacherData.office_location ? String(teacherData.office_location) : undefined,
    } as unknown as Teacher;

  } catch (error) {
    console.error('Error al obtener datos del profesor:', error);
    return null;
  }
}

// Función para obtener todos los administradores
export async function getAllAdmins(): Promise<any[]> {
  try {
    const query = `
      SELECT 
        a.admin_id AS id,
        a.name,
        a.email,
        a.created_at,
        a.role
      FROM 
        admins a
      ORDER BY a.created_at DESC
    `;
    
    const admins = await executeQuery<any[]>({ query });
    return admins;
  } catch (error) {
    console.error('Error al obtener todos los administradores:', error);
    throw new Error('Error al obtener todos los administradores');
  }
}

// دالة للحصول على المواد الدراسية للمعلم
export async function getTeacherCourses(teacherId: string): Promise<Course[]> {
  try {
    const query = `
      SELECT 
        course_id,
        course_name
      FROM 
        courses
      WHERE 
        teacher_id = ?
      ORDER BY 
        course_name
    `;
    
    const dbCourses = await executeQuery<any[]>({
      query: query, 
      values: [teacherId] 
    });
    
    // Map to the Course interface from '../../components/Teacher/interfaces'
    return dbCourses.map(course => ({
      course_id: String(course.course_id || ''),
      course_name_ar: String(course.course_name || 'اسم المادة غير متوفر'),
      course_name_en: '', // Not in DB table
      credits: 0, // Not in DB table, default to 0 or handle as needed
      description_ar: '', // Not in DB table
      description_en: '', // Not in DB table
      // Add any other fields from the Course interface with default values
    } as Course));
    
  } catch (error) {
    console.error('Error al obtener los cursos del profesor:', error);
    throw new Error('Error al obtener los cursos del profesor');
  }
}

// دالة للحصول على منشورات المعلم
export async function getTeacherPublications(teacherId: string) {
  try {
    const query = `
      SELECT 
        p.publication_id,
        p.title,
        p.description,
        p.type,
        p.file_url,
        p.thumbnail_url,
        p.date
      FROM 
        publications p
      WHERE 
        p.teacher_id = ?
      ORDER BY 
        p.date DESC
    `;
    
    const publications = await executeQuery<any[]>({
      query: query, 
      values: [teacherId] 
    });
    
    return publications.map(pub => ({
      publication_id: String(pub.publication_id || ''),
      title: String(pub.title || 'عنوان غير متوفر'),
      description: String(pub.description || 'وصف غير متوفر'),
      type: pub.type || 'pdf',
      file_url: String(pub.file_url || ''),
      thumbnail_url: String(pub.thumbnail_url || ''),
      date: String(pub.date || '')
    }));
  } catch (error) {
    console.error('خطأ في الحصول على منشورات المعلم:', error);
    return [];
  }
}

// دالة للحصول على نصائح المعلم
export async function getTeacherAdvice(teacherId: string) {
  try {
    const query = `
      SELECT 
        advice_id,
        title_ar,
        title_en,
        content_ar,
        content_en,
        category,
        created_at
      FROM 
        teacher_advice
      WHERE 
        teacher_id = ?
      ORDER BY 
        created_at DESC
    `;
    
    const advice = await executeQuery<any[]>({
      query, 
      values: [teacherId] 
    });
    
    return advice.map(adv => ({
      advice_id: String(adv.advice_id || ''),
      title_ar: String(adv.title_ar || ''),
      title_en: adv.title_en ? String(adv.title_en) : undefined,
      content_ar: String(adv.content_ar || 'محتوى غير متوفر'),
      content_en: adv.content_en ? String(adv.content_en) : undefined,
      category: adv.category ? String(adv.category) : undefined,
      created_at: adv.created_at ? new Date(adv.created_at).toISOString() : new Date().toISOString()
    }));
  } catch (error) {
    console.error('خطأ في الحصول على نصائح المعلم:', error);
    return [];
  }
}
