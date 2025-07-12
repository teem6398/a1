import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase } from '../init-db';

export async function GET(request: NextRequest) {
  try {
    const success = await initializeDatabase();
    
    if (success) {
      return NextResponse.json({
        message: 'Database initialized successfully. See server logs for details.'
      });
    } else {
      return NextResponse.json({ 
        error: 'Database initialization failed. Check server logs for details.' 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in initialization route:', error);
    return NextResponse.json({ error: 'Initialization failed' }, { status: 500 });
  }
} 