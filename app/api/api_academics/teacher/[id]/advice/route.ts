import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '../../../db';

// GET: Obtener todas las recomendaciones de un profesor
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const teacherId = params.id;

    if (!teacherId) {
      return NextResponse.json({ error: 'معرف المعلم مطلوب' }, { status: 400 });
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
        teacher_id = ?
      ORDER BY 
        created_at DESC
    `;

    const advice = await executeQuery<any[]>({
      query,
      values: [teacherId]
    });

    return NextResponse.json(advice);
  } catch (error) {
    console.error('Error fetching teacher advice:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب النصائح' },
      { status: 500 }
    );
  }
}

// POST: Añadir una nueva recomendación
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const teacherId = params.id;
    const data = await request.json();

    if (!teacherId) {
      return NextResponse.json({ error: 'معرف المعلم مطلوب' }, { status: 400 });
    }

    if (!data.title_ar || !data.content_ar) {
      return NextResponse.json(
        { error: 'العنوان والمحتوى مطلوبان' },
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO teacher_advice (
        teacher_id,
        title_ar,
        title_en,
        content_ar,
        content_en,
        category,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;

    const result = await executeQuery<any>({
      query,
      values: [
        teacherId,
        data.title_ar,
        data.title_en || null,
        data.content_ar,
        data.content_en || null,
        data.category || null
      ]
    });

    // Obtener la recomendación recién creada
    const insertId = (result as any).insertId;
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

    const newAdvice = await executeQuery<any[]>({
      query: getQuery,
      values: [insertId]
    });

    return NextResponse.json(newAdvice[0], { status: 201 });
  } catch (error) {
    console.error('Error adding teacher advice:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إضافة النصيحة' },
      { status: 500 }
    );
  }
} 