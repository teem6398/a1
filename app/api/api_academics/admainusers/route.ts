import { NextResponse } from 'next/server';
import { getAllAdmins } from '../db';



export async function GET() {
  try {
    const admins = await getAllAdmins();
    return NextResponse.json(admins);
  } catch (error) {
    console.error('Error in API (admainusers):', error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم عند جلب الإداريين' },
      { status: 500 }
    );
  }
}