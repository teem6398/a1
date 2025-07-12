import { NextRequest, NextResponse } from 'next/server';
import { getActivity, updateActivity, deleteActivity } from '../db';
import slugify from 'slugify';

// الحصول على نشاط محدد
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const searchParams = request.nextUrl.searchParams;
    const lang = searchParams.get('lang') || 'ar';
    
    const activity = await getActivity(id, lang);
    
    if (!activity) {
      return NextResponse.json(
        { success: false, error: 'Activity not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: activity });
  } catch (error) {
    console.error('Error fetching activity:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch activity' },
      { status: 500 }
    );
  }
}

// تحديث نشاط محدد
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const body = await request.json();
    
    // التحقق من وجود النشاط
    const existingActivity = await getActivity(id);
    
    if (!existingActivity) {
      return NextResponse.json(
        { success: false, error: 'Activity not found' },
        { status: 404 }
      );
    }
    
    // تحديث الرابط المختصر إذا تم تغيير العنوان ولم يتم توفير رابط مختصر جديد
    if (body.title_en && body.title_en !== existingActivity.title_en && !body.slug) {
      body.slug = slugify(body.title_en, { lower: true, strict: true });
    }
    
    const updatedActivity = await updateActivity(id, body);
    
    return NextResponse.json({ success: true, data: updatedActivity });
  } catch (error) {
    console.error('Error updating activity:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update activity' },
      { status: 500 }
    );
  }
}

// حذف نشاط محدد
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    
    // التحقق من وجود النشاط
    const existingActivity = await getActivity(id);
    
    if (!existingActivity) {
      return NextResponse.json(
        { success: false, error: 'Activity not found' },
        { status: 404 }
      );
    }
    
    await deleteActivity(id);
    
    return NextResponse.json({ success: true, message: 'Activity deleted successfully' });
  } catch (error) {
    console.error('Error deleting activity:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete activity' },
      { status: 500 }
    );
  }
} 