import { NextRequest, NextResponse } from 'next/server';
import { query } from '../db';

export async function GET(request: NextRequest) {
  try {
    // الحصول على معرف البرنامج من الاستعلام
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');

    console.log('معلمات البحث:', { id, slug });

    // التحقق من توفر معرف أو slug
    if (!id && !slug) {
      return NextResponse.json({ error: 'يجب توفير معرف البرنامج أو slug' }, { status: 400 });
    }

    let programData;

    // البحث حسب المعرف إذا كان متوفراً
    if (id) {
      console.log('البحث عن البرنامج بواسطة المعرف:', id);
      const sqlQuery = `
        SELECT *
        FROM academic_programs
        WHERE id = ?
      `;
      const result = await query(sqlQuery, [id]);
      console.log('نتيجة البحث بالمعرف:', result);

      if (result.length === 0) {
        return NextResponse.json({ error: 'لم يتم العثور على البرنامج بالمعرف المحدد' }, { status: 404 });
      }

      programData = result[0];
    }
    // البحث حسب الاسم إذا كان المعرف غير متوفر
    else if (slug) {
      console.log('البحث عن البرنامج بواسطة الاسم:', slug);
      const sqlQuery = `
        SELECT *
        FROM academic_programs
        WHERE LOWER(name_en) LIKE ?
      `;
      const result = await query(sqlQuery, [`%${slug.toLowerCase()}%`]);
      console.log('نتيجة البحث بالاسم:', result);

      if (result.length === 0) {
        return NextResponse.json({ error: 'لم يتم العثور على البرنامج بالاسم المحدد' }, { status: 404 });
      }

      programData = result[0];
    }

    console.log('بيانات البرنامج:', programData);

    // الحصول على المقررات الدراسية
    let courses = [];
    try {
      const coursesQuery = `
        SELECT id, name_ar, name_en, description, semester, is_elective
        FROM courses
        WHERE program_id = ?
        ORDER BY id
      `;
      console.log('استعلام المقررات:', coursesQuery, [programData.id]);
      courses = await query(coursesQuery, [programData.id]);
      console.log('نتيجة استعلام المقررات:', courses);
    } catch (coursesError) {
      console.error('خطأ في استعلام المقررات:', coursesError);
      // استمرار التنفيذ مع مصفوفة فارغة
    }

    // الحصول على المهارات المكتسبة
    let skills = [];
    try {
      const skillsQuery = `
        SELECT id, skill_name, icon
        FROM skills
        WHERE program_id = ?
        ORDER BY id
      `;
      skills = await query(skillsQuery, [programData.id]);
      console.log('نتيجة استعلام المهارات:', skills);
    } catch (skillsError) {
      console.error('خطأ في استعلام المهارات:', skillsError);
      // استمرار التنفيذ مع مصفوفة فارغة
    }

    // الحصول على الوظائف المتاحة
    let jobs = [];
    try {
      const jobsQuery = `
        SELECT id, job_title_ar, job_title_en, icon
        FROM job_opportunities
        WHERE program_id = ?
        ORDER BY id
      `;
      jobs = await query(jobsQuery, [programData.id]);
      console.log('نتيجة استعلام الوظائف:', jobs);
    } catch (jobsError) {
      console.error('خطأ في استعلام الوظائف:', jobsError);
      // استمرار التنفيذ مع مصفوفة فارغة
    }

    // الحصول على المشاريع الطلابية
    let projects = [];
    try {
      const projectsQuery = `
        SELECT id, title_ar, title_en, description_ar, description_en, image_url
        FROM projects
        WHERE program_id = ?
        ORDER BY id
      `;
      projects = await query(projectsQuery, [programData.id]);
      console.log('نتيجة استعلام المشاريع:', projects);
    } catch (projectsError) {
      console.error('خطأ في استعلام المشاريع:', projectsError);
      // استمرار التنفيذ مع مصفوفة فارغة
    }

    // تجميع البيانات
    const result = {
      program: programData,
      courses,
      skills,
      jobs,
      projects
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('خطأ في معالجة الطلب:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء معالجة الطلب' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // استخراج بيانات الطلب
    const data = await request.json();
    const { collegeId } = data;

    console.log('بيانات الطلب:', data);

    // التحقق من توفر معرف الكلية
    if (!collegeId) {
      return NextResponse.json({ error: 'يجب توفير معرف الكلية' }, { status: 400 });
    }

    // الحصول على البرامج حسب الكلية
    const sqlQuery = `
      SELECT id, name_ar, name_en
      FROM academic_programs
      WHERE college_id = ?
      ORDER BY id
    `;
    const programs = await query(sqlQuery, [collegeId]);

    return NextResponse.json({ programs });
  } catch (error) {
    console.error('خطأ في معالجة الطلب:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء معالجة الطلب' }, { status: 500 });
  }
}

// دالة خاصة لجلب المهارات فقط لبرنامج معين
export async function PATCH(request: NextRequest) {
  try {
    const { programId } = await request.json();

    if (!programId) {
      return NextResponse.json({ error: 'يجب توفير معرف البرنامج' }, { status: 400 });
    }

    // الحصول على المهارات المكتسبة
    let skills = [];
    try {
      const skillsQuery = `
        SELECT id, skill_name, icon
        FROM skills
        WHERE program_id = ?
        ORDER BY id
      `;
      skills = await query(skillsQuery, [programId]);
      console.log('نتيجة استعلام المهارات:', skills);
    } catch (skillsError) {
      console.error('خطأ في استعلام المهارات:', skillsError);
      // استمرار التنفيذ مع مصفوفة فارغة
    }

    return NextResponse.json({ skills });
  } catch (error) {
    console.error('خطأ في الحصول على المهارات:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء معالجة طلب المهارات' }, { status: 500 });
  }
}
