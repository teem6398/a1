import { NextRequest, NextResponse } from 'next/server';
import db from '../db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lang = searchParams.get('lang') || 'ar'; // Default to Arabic if no language specified
    const collegeSlug = searchParams.get('college');
    const collegeId = searchParams.get('college_id');
    
    // Determine which database query to use based on parameters
    if (collegeId) {
      // Legacy format using college_id (used by MajorsSection.tsx)
      try {
        // Fetch majors for specific college
        const majorsRows = await db.query(
          'SELECT * FROM majors WHERE college_id = ?',
          [collegeId]
        );
        
        console.log(`Found ${majorsRows.length} majors for college ${collegeId}`);
        
        // Format data according to language
        const formattedMajors = majorsRows.map((major: any) => {
          // Create link for major page
          const majorLink = `/colleges/${collegeId}/majors/${major.id}`;
          
          return {
            ...major,
            name: lang === 'en' && major.name_en ? major.name_en : major.name,
            description: lang === 'en' && major.description_en ? major.description_en : major.description,
            features: lang === 'en' && major.features_en ? major.features_en : major.features,
            link: majorLink
          };
        });
        
        return NextResponse.json({
          majors: formattedMajors
        });
      } catch (error) {
        console.error('Error fetching majors data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
    } else {
      // New format using college slug (used by ApplicationForm.tsx)
      // Prepare the query based on whether a college filter is provided
      let query = 'SELECT * FROM majorsgrid';
      const params: any[] = [];
      
      if (collegeSlug) {
        query += ' WHERE college_slug = ?';
        params.push(collegeSlug);
      }
      
      // Execute the query
      const majors = await db.query(query, params);
      
      // Transform the data based on language
      const transformedMajors = majors.map((major: any) => {
        // Parse JSON strings for features and requirements
        const features = lang === 'en' 
          ? JSON.parse(major.features_en || '[]') 
          : JSON.parse(major.features_ar || '[]');
          
        const admissionRequirements = lang === 'en'
          ? JSON.parse(major.admission_requirements_en || '[]')
          : JSON.parse(major.admission_requirements_ar || '[]');
        
        return {
          id: major.id,
          name: lang === 'en' ? major.major_name_en : major.major_name_ar,
          college: lang === 'en' ? major.college_en : major.college_ar,
          collegeSlug: major.college_slug,
          slug: major.slug,
          description: lang === 'en' ? major.description_en : major.description_ar,
          icon: major.icon,
          duration: major.duration,
          students: major.students,
          features: features,
          admissionRequirements: admissionRequirements
        };
      });
      
      // Get unique colleges for filtering
      const collegesQuery = 'SELECT DISTINCT college_slug, college_en, college_ar FROM majorsgrid';
      const collegesResult = await db.query(collegesQuery);
      
      const colleges = collegesResult.map((college: any) => ({
        id: college.college_slug, // Using slug as ID for simplicity
        name: lang === 'en' ? college.college_en : college.college_ar,
        slug: college.college_slug
      }));
      
      return NextResponse.json({ 
        majors: transformedMajors,
        colleges: colleges
      }, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching majors:', error);
    return NextResponse.json({ error: 'Failed to fetch majors data' }, { status: 500 });
  }
} 