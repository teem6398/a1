import { NextRequest, NextResponse } from 'next/server';
import db from '../db';

// معالج طلب GET
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lang = searchParams.get('lang') || 'ar'; // Default to Arabic if no language specified
    
    // Query to get application steps ordered by step_order
    const query = 'SELECT * FROM application_steps ORDER BY step_order ASC';
    
    // Execute the query
    const steps = await db.query(query);
    
    // Transform the data based on language
    const transformedSteps = steps.map((step: any) => {
      return {
        id: step.id,
        title: lang === 'en' ? step.title_en : step.title_ar,
        description: lang === 'en' ? step.description_en : step.description_ar,
        icon: step.icon,
        step_order: step.step_order
      };
    });
    
    return NextResponse.json({ 
      steps: transformedSteps
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error fetching application steps:', error);
    return NextResponse.json({ error: 'Failed to fetch application steps data' }, { status: 500 });
  }
}
