import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '../../../../db';

// GET: Obtener una recomendación específica
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; adviceId: string } }
) {
  try {
    const { id: teacherId, adviceId } = params;

    if (!teacherId || !adviceId) {
      return NextResponse.json(
        { error: 'معرف المعلم ومعرف النصيحة مطلوبان' },
        { status: 400 }
      );
    }

    const query = `
      SELECT 
        advice_id,
        title_ar,
        title_en,
        content_ar,
        content_en,
        category,
        created_at
      FROM 
        teacher_advice
      WHERE 
        teacher_id = ? AND advice_id = ?
    `;

    const advice = await executeQuery<any[]>({
      query,
      values: [teacherId, adviceId]
    });

    if (!advice || advice.length === 0) {
      return NextResponse.json(
        { error: 'النصيحة غير موجودة' },
        { status: 404 }
      );
    }

    return NextResponse.json(advice[0]);
  } catch (error) {
    console.error('Error fetching specific advice:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب النصيحة' },
      { status: 500 }
    );
  }
}

// PUT: Actualizar una recomendación específica
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; adviceId: string } }
) {
  try {
    const { id: teacherId, adviceId } = params;
    const data = await request.json();

    if (!teacherId || !adviceId) {
      return NextResponse.json(
        { error: 'معرف المعلم ومعرف النصيحة مطلوبان' },
        { status: 400 }
      );
    }

    if (!data.title_ar || !data.content_ar) {
      return NextResponse.json(
        { error: 'العنوان والمحتوى مطلوبان' },
        { status: 400 }
      );
    }

    // Verificar que la recomendación existe y pertenece al profesor
    const checkQuery = `
      SELECT advice_id FROM teacher_advice 
      WHERE teacher_id = ? AND advice_id = ?
    `;
    
    const existingAdvice = await executeQuery<any[]>({
      query: checkQuery,
      values: [teacherId, adviceId]
    });

    if (!existingAdvice || existingAdvice.length === 0) {
      return NextResponse.json(
        { error: 'النصيحة غير موجودة أو لا تنتمي لهذا المعلم' },
        { status: 404 }
      );
    }

    // Actualizar la recomendación
    const updateQuery = `
      UPDATE teacher_advice
      SET 
        title_ar = ?,
        title_en = ?,
        content_ar = ?,
        content_en = ?,
        category = ?
      WHERE 
        advice_id = ? AND teacher_id = ?
    `;

    await executeQuery({
      query: updateQuery,
      values: [
        data.title_ar,
        data.title_en || null,
        data.content_ar,
        data.content_en || null,
        data.category || null,
        adviceId,
        teacherId
      ]
    });

    // Obtener la recomendación actualizada
    const getQuery = `
      SELECT 
        advice_id,
        title_ar,
        title_en,
        content_ar,
        content_en,
        category,
        created_at
      FROM 
        teacher_advice
      WHERE 
        advice_id = ?
    `;

    const updatedAdvice = await executeQuery<any[]>({
      query: getQuery,
      values: [adviceId]
    });

    return NextResponse.json(updatedAdvice[0]);
  } catch (error) {
    console.error('Error updating advice:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تحديث النصيحة' },
      { status: 500 }
    );
  }
}

// DELETE: Eliminar una recomendación específica
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; adviceId: string } }
) {
  try {
    const { id: teacherId, adviceId } = params;

    if (!teacherId || !adviceId) {
      return NextResponse.json(
        { error: 'معرف المعلم ومعرف النصيحة مطلوبان' },
        { status: 400 }
      );
    }

    // Verificar que la recomendación existe y pertenece al profesor
    const checkQuery = `
      SELECT advice_id FROM teacher_advice 
      WHERE teacher_id = ? AND advice_id = ?
    `;
    
    const existingAdvice = await executeQuery<any[]>({
      query: checkQuery,
      values: [teacherId, adviceId]
    });

    if (!existingAdvice || existingAdvice.length === 0) {
      return NextResponse.json(
        { error: 'النصيحة غير موجودة أو لا تنتمي لهذا المعلم' },
        { status: 404 }
      );
    }

    // Eliminar la recomendación
    const deleteQuery = `
      DELETE FROM teacher_advice
      WHERE advice_id = ? AND teacher_id = ?
    `;

    await executeQuery({
      query: deleteQuery,
      values: [adviceId, teacherId]
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting advice:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء حذف النصيحة' },
      { status: 500 }
    );
  }
} 