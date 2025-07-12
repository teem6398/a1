import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const collegeId = searchParams.get('college_id');
    const lang = searchParams.get('lang') || 'ar'; // اللغة الافتراضية هي العربية
    const majorId = params.id;

    console.log(`API called with majorId: ${majorId}, collegeId: ${collegeId}, lang: ${lang}`);

    if (!collegeId) {
      console.log('Missing college_id parameter');
      return NextResponse.json({ error: 'College ID is required' }, { status: 400 });
    }

    if (!majorId) {
      console.log('Missing majorId parameter');
      return NextResponse.json({ error: 'Major ID is required' }, { status: 400 });
    }

    // جلب بيانات التخصص
    console.log(`Fetching major data for id: ${majorId}, college_id: ${collegeId}`);
    const majorResults = await query(
      'SELECT * FROM majors WHERE id = ? AND college_id = ?',
      [majorId, collegeId]
    );

    console.log(`Query results length: ${majorResults.length}`);
    
    if (majorResults.length === 0) {
      console.log('Major not found in database');
      return NextResponse.json({ error: 'Major not found' }, { status: 404 });
    }

    const major = majorResults[0];
    console.log('Major found:', major.id, major.name);

    // البحث عن program_id المقابل للتخصص
    // في بعض الأنظمة، قد يكون program_id هو نفسه major_id
    // وفي أنظمة أخرى قد يكون هناك جدول للربط بينهما
    let programId = majorId; // افتراض مبدئي أن program_id = major_id
    
    try {
      // محاولة البحث عن program_id المقابل في جدول academic_programs
      const programResults = await query(
        'SELECT id FROM academic_programs WHERE major_id = ? OR id = ?',
        [majorId, majorId]
      );
      
      if (programResults.length > 0) {
        programId = programResults[0].id;
        console.log(`Found matching program_id: ${programId} for major_id: ${majorId}`);
      } else {
        console.log(`No matching program found, using major_id as program_id: ${majorId}`);
      }
    } catch (error) {
      console.warn('Could not find program_id, continuing with major_id:', error);
    }

    // جلب المقررات الدراسية للتخصص - مع التعامل مع حالة عدم وجود الجدول أو العمود
    let courses = [];
    try {
      console.log(`Fetching courses for program_id: ${programId}`);
      // التحقق من وجود جدول المقررات
      const checkCourses = await query("SHOW TABLES LIKE 'courses'");
      if (checkCourses.length > 0) {
        // التحقق من وجود عمود program_id
        const checkColumn = await query("SHOW COLUMNS FROM courses LIKE 'program_id'");
        if (checkColumn.length > 0) {
          courses = await query(
            'SELECT * FROM courses WHERE program_id = ?',
            [programId]
          );
        } else {
          // إذا كان العمود غير موجود، نبحث عن عمود بديل
          const columns = await query("DESCRIBE courses");
          const idColumn = columns.find((col: any) => 
            col.Field.includes('major') || col.Field.includes('specialty') || 
            col.Field === 'specialty_id' || col.Field === 'department_id'
          );
          
          if (idColumn) {
            courses = await query(
              `SELECT * FROM courses WHERE ${idColumn.Field} = ?`,
              [majorId]
            );
          }
        }
      }
      console.log(`Found ${courses.length} courses`);
    } catch (error) {
      console.warn('Could not fetch courses, continuing without them:', error);
      // استمر بدون المقررات الدراسية
    }

    // جلب مشاريع الطلاب للتخصص - مع التعامل مع حالة عدم وجود الجدول أو العمود
    let projects = [];
    try {
      console.log(`Fetching projects for program_id: ${programId}`);
      // التحقق من وجود جدول المشاريع
      const checkProjects = await query("SHOW TABLES LIKE 'projects'");
      if (checkProjects.length > 0) {
        // التحقق من وجود عمود program_id
        const checkColumn = await query("SHOW COLUMNS FROM projects LIKE 'program_id'");
        if (checkColumn.length > 0) {
          projects = await query(
            'SELECT * FROM projects WHERE program_id = ?',
            [programId]
          );
        } else {
          // إذا كان العمود غير موجود، نبحث عن عمود بديل
          const columns = await query("DESCRIBE projects");
          const idColumn = columns.find((col: any) => 
            col.Field.includes('major') || col.Field.includes('specialty') || 
            col.Field === 'specialty_id' || col.Field === 'department_id'
          );
          
          if (idColumn) {
            projects = await query(
              `SELECT * FROM projects WHERE ${idColumn.Field} = ?`,
              [majorId]
            );
          }
        }
      }
      console.log(`Found ${projects.length} projects`);
    } catch (error) {
      console.warn('Could not fetch projects, continuing without them:', error);
      // استمر بدون المشاريع
    }

    // جلب متطلبات القبول للتخصص
    let admissionRequirements = [];
    try {
      console.log(`Fetching admission requirements for major_id: ${majorId}`);
      // التحقق من وجود جدول متطلبات القبول
      const checkTable = await query("SHOW TABLES LIKE 'major_admission_requirements'");
      if (checkTable.length > 0) {
        admissionRequirements = await query(
          'SELECT * FROM major_admission_requirements WHERE major_id = ?',
          [majorId]
        );
      }
      console.log(`Found ${admissionRequirements.length} admission requirements`);
    } catch (error) {
      console.warn('Could not fetch admission requirements, continuing without them:', error);
    }

    // جلب فرص العمل للتخصص
    let jobOpportunities = [];
    try {
      console.log(`Fetching job opportunities for program_id: ${programId}`);
      // التحقق من وجود جدول فرص العمل
      const checkTable = await query("SHOW TABLES LIKE 'job_opportunities'");
      if (checkTable.length > 0) {
        jobOpportunities = await query(
          'SELECT * FROM job_opportunities WHERE program_id = ?',
          [programId]
        );
      }
      console.log(`Found ${jobOpportunities.length} job opportunities`);
    } catch (error) {
      console.warn('Could not fetch job opportunities, continuing without them:', error);
    }

    // جلب المهارات المكتسبة للتخصص
    let skills = [];
    try {
      console.log(`Fetching skills for program_id: ${programId}`);
      // التحقق من وجود جدول المهارات
      const checkTable = await query("SHOW TABLES LIKE 'skills'");
      if (checkTable.length > 0) {
        skills = await query(
          'SELECT * FROM skills WHERE program_id = ?',
          [programId]
        );
      }
      console.log(`Found ${skills.length} skills`);
    } catch (error) {
      console.warn('Could not fetch skills, continuing without them:', error);
    }

    // تنسيق البيانات حسب اللغة
    const formattedMajor = {
      ...major,
      name: lang === 'en' && major.name_en ? major.name_en : major.name,
      description: lang === 'en' && major.description_en ? major.description_en : major.description,
      features: lang === 'en' && major.features_en ? major.features_en : major.features,
      admission_requirements: lang === 'en' && major.admission_requirements_en 
        ? major.admission_requirements_en 
        : major.admission_requirements,
      job_opportunities: lang === 'en' && major.job_opportunities_en 
        ? major.job_opportunities_en 
        : major.job_opportunities
    };

    // تنسيق المقررات الدراسية حسب اللغة
    const formattedCourses = courses.map((course: any) => ({
      id: course.id,
      major_id: majorId,
      program_id: course.program_id,
      name: lang === 'en' && course.name_en ? course.name_en : course.name_ar,
      description: lang === 'en' && course.description_en ? course.description_en : course.description,
      semester: course.semester,
      is_elective: course.is_elective
    }));

    // تنسيق المشاريع حسب اللغة
    const formattedProjects = projects.map((project: any) => ({
      id: project.id,
      major_id: majorId,
      program_id: project.program_id,
      title: lang === 'en' && project.title_en ? project.title_en : project.title_ar,
      description: lang === 'en' && project.description_en ? project.description_en : project.description_ar,
      image_path: project.image_url
    }));

    // تنسيق متطلبات القبول حسب اللغة
    const formattedRequirements = admissionRequirements.map((req: any) => ({
      ...req,
      requirement: lang === 'en' && req.requirement_en ? req.requirement_en : req.requirement
    }));

    // تنسيق فرص العمل حسب اللغة
    const formattedJobs = jobOpportunities.map((job: any) => ({
      id: job.id,
      major_id: majorId,
      program_id: job.program_id,
      title: lang === 'en' && job.job_title_en ? job.job_title_en : job.job_title_ar,
      icon: job.icon
    }));

    // تنسيق المهارات حسب اللغة
    const formattedSkills = skills.map((skill: any) => ({
      id: skill.id,
      major_id: majorId,
      program_id: skill.program_id,
      name: lang === 'en' && skill.skill_name_en ? skill.skill_name_en : skill.skill_name,
      icon: skill.icon
    }));

    console.log('Successfully prepared response data');
    return NextResponse.json({
      major: formattedMajor,
      courses: formattedCourses,
      projects: formattedProjects,
      admission_requirements: formattedRequirements,
      job_opportunities: formattedJobs,
      skills: formattedSkills
    });
  } catch (error) {
    console.error('Error fetching major details:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 