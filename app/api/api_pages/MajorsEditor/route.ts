// File: c:\next\project\app\api\api_pages\MajorsEditor\route.ts
import { NextRequest, NextResponse } from 'next/server';
// Make sure this path is correct for your db utility functions
import { query, startTransaction, commitTransaction, rollbackTransaction } from '../db';

// --- Interfaces for Data Structures ---
interface Course {
  id?: number;
  program_id?: number;
  name_ar: string;
  name_en?: string;
  description_ar?: string;
  description_en?: string;
  semester?: number;
  is_elective?: boolean;
}

interface JobOpportunity {
  id?: number;
  program_id?: number;
  title_ar: string;
  title_en?: string;
  icon_url?: string;
}

interface Project {
  id?: number;
  program_id?: number;
  title_ar: string;
  title_en?: string;
  description_ar?: string;
  description_en?: string;
  image_url?: string;
}

interface Skill {
  id?: number;
  program_id?: number;
  name_ar: string;
  name_en?: string;
  icon_url?: string;
}

interface MajorData {
  id?: number;
  name_ar: string;
  name_en?: string;
  college_id: number;
  hero_title?: string;
  hero_subtitle?: string;
  hero_image_url?: string;
  about_text?: string;
  // Add any other fields from academic_programs table here
}

interface FullMajor extends MajorData {
  courses: Course[];
  jobOpportunities: JobOpportunity[];
  projects: Project[];
  skills: Skill[];
}

// --- GET Handler ---
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      const majorId = parseInt(id, 10);
      if (isNaN(majorId)) {
        return NextResponse.json({ error: 'Invalid major ID' }, { status: 400 });
      }

      const [majorResults] = await query('SELECT * FROM academic_programs WHERE id = ?', [majorId]);
      const major: MajorData | undefined = majorResults as MajorData | undefined;

      if (!major) {
        return NextResponse.json({ error: 'Major not found' }, { status: 404 });
      }

      const courses: Course[] = (await query('SELECT * FROM courses WHERE program_id = ?', [majorId])) as Course[];
      const jobOpportunities: JobOpportunity[] = (await query('SELECT * FROM job_opportunities WHERE program_id = ?', [majorId])) as JobOpportunity[];
      const projects: Project[] = (await query('SELECT * FROM projects WHERE program_id = ?', [majorId])) as Project[];
      const skills: Skill[] = (await query('SELECT * FROM skills WHERE program_id = ?', [majorId])) as Skill[];

      const fullMajor: FullMajor = {
        ...major,
        courses: courses || [],
        jobOpportunities: jobOpportunities || [],
        projects: projects || [],
        skills: skills || [],
      };
      return NextResponse.json(fullMajor);

    } else {
      // Get all majors (simplified for listing purposes)
      const majors = await query(`
        SELECT ap.id, ap.name_ar, ap.name_en
        FROM academic_programs ap
      `);
      return NextResponse.json(majors);
    }
  } catch (error) {
    console.error('Failed to fetch majors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch majors', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// --- POST Handler ---
export async function POST(req: NextRequest) {
  let connection;
  try {
    const body: FullMajor = await req.json();
    const { courses, jobOpportunities, projects, skills, ...majorData } = body;

    connection = await startTransaction();
    
    const [result]: any = await connection.query(
      'INSERT INTO academic_programs SET ?', 
      [majorData]
    );
    const programId = result.insertId;

    if (courses?.length) {
      await connection.query(
        'INSERT INTO courses (program_id, name_ar, name_en, description_ar, description_en, semester, is_elective) VALUES ?',
        [courses.map(c => [programId, c.name_ar, c.name_en, c.description_ar, c.description_en, c.semester, c.is_elective])]
      );
    }
    if (jobOpportunities?.length) {
      await connection.query(
        'INSERT INTO job_opportunities (program_id, title_ar, title_en, icon_url) VALUES ?',
        [jobOpportunities.map(j => [programId, j.title_ar, j.title_en, j.icon_url])]
      );
    }
    if (projects?.length) {
      await connection.query(
        'INSERT INTO projects (program_id, title_ar, title_en, description_ar, description_en, image_url) VALUES ?',
        [projects.map(p => [programId, p.title_ar, p.title_en, p.description_ar, p.description_en, p.image_url])]
      );
    }
    if (skills?.length) {
      await connection.query(
        'INSERT INTO skills (program_id, name_ar, name_en, icon_url) VALUES ?',
        [skills.map(s => [programId, s.name_ar, s.name_en, s.icon_url])]
      );
    }

    await commitTransaction(connection);

    // Fetch the newly created major to return it in the response
    const [newMajorRows]: any = await query('SELECT * FROM academic_programs WHERE id = ?', [programId]);
    if (newMajorRows.length === 0) {
      // This should not happen if insert was successful, but as a safeguard
      console.error(`Failed to fetch newly created major with id: ${programId}`);
      return NextResponse.json({ error: 'Major created but failed to fetch details' }, { status: 500 });
    }
    const newMajor: MajorData = newMajorRows[0] as MajorData;

    // Fetch related data (courses, etc.) if they were part of the initial creation
    // For simplicity, assuming they were part of `body` and inserted.
    // The FullMajor object should be constructed here if needed.
    // For now, returning the core MajorData and the ID.
    // The frontend expects `responseData.major` to be the full major object.

    const createdMajor: FullMajor = {
      ...(newMajor as MajorData),
      id: programId, // Ensure the id is part of the returned object at the top level as well for consistency if needed by frontend
      courses: courses || [],
      jobOpportunities: jobOpportunities || [],
      projects: projects || [],
      skills: skills || [],
    };

    return NextResponse.json({ major: createdMajor, message: 'Major created successfully' });

  } catch (error) {
    if (connection) {
      await rollbackTransaction(connection);
    }
    console.error('Failed to create major:', error);
    return NextResponse.json(
      { error: 'Failed to create major', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// --- DELETE Handler ---
export async function DELETE(req: NextRequest) {
  let connection;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Major ID is required for deletion' }, { status: 400 });
  }

  const programId = parseInt(id, 10);
  if (isNaN(programId)) {
    return NextResponse.json({ error: 'Invalid major ID' }, { status: 400 });
  }

  try {
    connection = await startTransaction();

    // Check if the major exists before attempting to delete related data
    const [majorExistsRows]: any = await connection.query('SELECT id FROM academic_programs WHERE id = ?', [programId]);
    if (majorExistsRows.length === 0) {
      await rollbackTransaction(connection); // Rollback as no major found, nothing to delete
      return NextResponse.json({ error: 'Major not found' }, { status: 404 });
    }

    // Delete related data first to maintain referential integrity
    await connection.query('DELETE FROM courses WHERE program_id = ?', [programId]);
    await connection.query('DELETE FROM job_opportunities WHERE program_id = ?', [programId]);
    await connection.query('DELETE FROM projects WHERE program_id = ?', [programId]);
    await connection.query('DELETE FROM skills WHERE program_id = ?', [programId]);

    // Delete the major itself
    const [deleteResult]: any = await connection.query('DELETE FROM academic_programs WHERE id = ?', [programId]);

    if (deleteResult.affectedRows === 0) {
      // This case should ideally be caught by the check above, but as a safeguard:
      await rollbackTransaction(connection);
      return NextResponse.json({ error: 'Major not found or already deleted' }, { status: 404 });
    }

    await commitTransaction(connection);
    return NextResponse.json({ message: `Major with ID ${programId} and all related data deleted successfully` });

  } catch (error) {
    if (connection) {
      await rollbackTransaction(connection);
    }
    console.error('Failed to delete major:', error);
    return NextResponse.json(
      { error: 'Failed to delete major', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// Interface for the PUT request body when updating sections
interface UpdateRequestBody {
  id: number; // programId
  section: string; // e.g., 'heroSection', 'coursesSection'
  data: Partial<FullMajor>; // Contains only the data for the section being updated
}

// --- PUT Handler (Modified for Partial Updates) ---
export async function PUT(req: NextRequest) {
  let connection;
  try {
    const body: UpdateRequestBody = await req.json();
    const { id: programId, section, data } = body;

    if (!programId) {
      return NextResponse.json({ error: 'Major ID (programId) is required for update' }, { status: 400 });
    }
    if (!section) {
      return NextResponse.json({ error: 'Section identifier is required for update' }, { status: 400 });
    }
    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json({ error: 'Data for update is required and cannot be empty' }, { status: 400 });
    }

    connection = await startTransaction();

    switch (section) {
      case 'generalInfoSection':
        // data should contain { name_ar, name_en, college_id }
        if (data.name_ar === undefined || data.college_id === undefined) {
            throw new Error('Missing required fields for generalInfoSection update');
        }
        await connection.query(
          'UPDATE academic_programs SET name_ar = ?, name_en = ?, college_id = ? WHERE id = ?',
          [data.name_ar, data.name_en, data.college_id, programId]
        );
        break;
      case 'heroSection':
        // data should contain { hero_title, hero_subtitle, hero_image_url }
        await connection.query(
          'UPDATE academic_programs SET hero_title = ?, hero_subtitle = ?, hero_image_url = ? WHERE id = ?',
          [data.hero_title, data.hero_subtitle, data.hero_image_url, programId]
        );
        break;
      case 'aboutSection':
        // data should contain { about_text }
        await connection.query(
          'UPDATE academic_programs SET about_text = ? WHERE id = ?',
          [data.about_text, programId]
        );
        break;
      case 'coursesSection':
        // data should contain { courses: Course[] }
        await connection.query('DELETE FROM courses WHERE program_id = ?', [programId]);
        if (data.courses?.length) {
          await connection.query(
            'INSERT INTO courses (program_id, name_ar, name_en, description_ar, description_en, semester, is_elective) VALUES ?',
            [data.courses.map(c => [programId, c.name_ar, c.name_en, c.description_ar, c.description_en, c.semester, c.is_elective])]
          );
        }
        break;
      case 'jobOpportunitiesSection':
        // data should contain { jobOpportunities: JobOpportunity[] }
        await connection.query('DELETE FROM job_opportunities WHERE program_id = ?', [programId]);
        if (data.jobOpportunities?.length) {
          await connection.query(
            'INSERT INTO job_opportunities (program_id, title_ar, title_en, icon_url) VALUES ?',
            [data.jobOpportunities.map(j => [programId, j.title_ar, j.title_en, j.icon_url])]
          );
        }
        break;
      case 'projectsSection':
        // data should contain { projects: Project[] }
        await connection.query('DELETE FROM projects WHERE program_id = ?', [programId]);
        if (data.projects?.length) {
          await connection.query(
            'INSERT INTO projects (program_id, title_ar, title_en, description_ar, description_en, image_url) VALUES ?',
            [data.projects.map(p => [programId, p.title_ar, p.title_en, p.description_ar, p.description_en, p.image_url])]
          );
        }
        break;
      case 'skillsSection':
        // data should contain { skills: Skill[] }
        await connection.query('DELETE FROM skills WHERE program_id = ?', [programId]);
        if (data.skills?.length) {
          await connection.query(
            'INSERT INTO skills (program_id, name_ar, name_en, icon_url) VALUES ?',
            [data.skills.map(s => [programId, s.name_ar, s.name_en, s.icon_url])]
          );
        }
        break;
      default:
        // If the section is unknown, rollback and return an error
        await rollbackTransaction(connection);
        return NextResponse.json({ error: `Unknown or unsupported section for update: ${section}` }, { status: 400 });
    }

    await commitTransaction(connection);

    // Fetch the updated major data to return it in the response
    const [majorRows]: any = await query('SELECT * FROM academic_programs WHERE id = ?', [programId]);
    if (majorRows.length === 0) {
      // This should ideally not happen if the major existed and was being updated
      console.error(`Failed to fetch updated major with id: ${programId} after section update`);
      return NextResponse.json({ error: 'Section updated but failed to fetch full major details' }, { status: 500 });
    }
    const updatedCoreMajor: MajorData = majorRows[0] as MajorData;

    // Fetch all related data for the updated major
    const courses: Course[] = (await query('SELECT id, program_id, name_ar, name_en, description_ar, description_en, semester, is_elective FROM courses WHERE program_id = ?', [programId])) as Course[];
    const jobOpportunities: JobOpportunity[] = (await query('SELECT id, program_id, title_ar, title_en, icon_url FROM job_opportunities WHERE program_id = ?', [programId])) as JobOpportunity[];
    const projects: Project[] = (await query('SELECT id, program_id, title_ar, title_en, description_ar, description_en, image_url FROM projects WHERE program_id = ?', [programId])) as Project[];
    const skills: Skill[] = (await query('SELECT id, program_id, name_ar, name_en, icon_url FROM skills WHERE program_id = ?', [programId])) as Skill[];

    const updatedFullMajor: FullMajor = {
      ...updatedCoreMajor,
      courses: courses || [],
      jobOpportunities: jobOpportunities || [],
      projects: projects || [],
      skills: skills || [],
    };

    return NextResponse.json({ major: updatedFullMajor, message: `Major section '${section}' updated successfully for program ID ${programId}` });

  } catch (error) {
    if (connection) {
      await rollbackTransaction(connection);
    }
    console.error(`Failed to update major section '${req.url}':`, error);
    return NextResponse.json(
      { error: 'Failed to update major section', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}