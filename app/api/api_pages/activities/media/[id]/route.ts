import { NextRequest, NextResponse } from 'next/server';
import { deleteActivityMedia } from '../../db';

// حذف وسائط النشاط
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    
    await deleteActivityMedia(id);
    
    return NextResponse.json({ success: true, message: 'Activity media deleted successfully' });
  } catch (error) {
    console.error('Error deleting activity media:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete activity media' },
      { status: 500 }
    );
  }
} 