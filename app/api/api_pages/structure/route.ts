import { NextRequest, NextResponse } from 'next/server';
import { checkCoursesTable, checkProjectsTable, checkMajorsTable } from '../check-structure';

export async function GET(request: NextRequest) {
  try {
    const majorsStructure = await checkMajorsTable();
    const coursesStructure = await checkCoursesTable();
    const projectsStructure = await checkProjectsTable();
    
    return NextResponse.json({
      majors: majorsStructure,
      courses: coursesStructure,
      projects: projectsStructure
    });
  } catch (error) {
    console.error('Error checking table structures:', error);
    return NextResponse.json({ error: 'Check failed' }, { status: 500 });
  }
} 