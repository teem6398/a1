import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Only handle API requests
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  try {
    // Continue to the actual handler
    const response = NextResponse.next();
    
    // Add CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    console.error('API error in middleware:', error);
    
    // Return a friendly error response
    return new NextResponse(
      JSON.stringify({ 
        error: 'خطأ في الخادم، يرجى التحقق من اتصال قاعدة البيانات',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      }
    );
  }
}

// Only run the middleware on API routes
export const config = {
  matcher: '/api/:path*',
} 