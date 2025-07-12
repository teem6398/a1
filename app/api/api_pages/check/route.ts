import { NextRequest, NextResponse } from 'next/server';
import { checkMajorsTables } from '../check-tables';

export async function GET(request: NextRequest) {
  try {
    await checkMajorsTables();
    
    return NextResponse.json({
      message: 'Database check completed. See server logs for details.'
    });
  } catch (error) {
    console.error('Error in check route:', error);
    return NextResponse.json({ error: 'Check failed' }, { status: 500 });
  }
} 