import { NextRequest, NextResponse } from 'next/server';
import { query, startTransaction, commitTransaction, rollbackTransaction, queryWithinTransaction } from '../../db';

// الحصول على رسالة وأهداف الجامعة
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const lang = searchParams.get('lang') || 'ar';

        // الحصول على رسالة الجامعة
        const missionQuery = 'SELECT * FROM university_mission WHERE language = ?';
        const missionResult = await query(missionQuery, [lang]);
        const mission = missionResult[0] || null;

        // الحصول على أهداف الجامعة مرتبة حسب الترتيب
        const goalsQuery = 'SELECT * FROM university_goals WHERE language = ? ORDER BY goal_order ASC';
        const goals = await query(goalsQuery, [lang]);

        return NextResponse.json({
            mission,
            goals,
            success: true
        });
    } catch (error) {
        console.error('خطأ في جلب رسالة وأهداف الجامعة:', error);
        return NextResponse.json(
            { error: 'فشل في جلب رسالة وأهداف الجامعة', success: false },
            { status: 500 }
        );
    }
}

// إضافة أو تحديث رسالة وأهداف الجامعة
export async function POST(request: NextRequest) {
    const connection = await startTransaction();
    
    try {
        const { mission, goals } = await request.json();
        const searchParams = request.nextUrl.searchParams;
        const lang = searchParams.get('lang') || 'ar';

        // تحديث أو إضافة رسالة الجامعة
        const missionUpsertQuery = `
            INSERT INTO university_mission (title, content, language)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE
            title = VALUES(title),
            content = VALUES(content)
        `;
        
        await queryWithinTransaction(connection, missionUpsertQuery, [
            mission.title,
            mission.content,
            lang
        ]);

        // حذف الأهداف القديمة للغة المحددة
        await queryWithinTransaction(
            connection,
            'DELETE FROM university_goals WHERE language = ?',
            [lang]
        );

        // إضافة الأهداف الجديدة
        const goalInsertQuery = `
            INSERT INTO university_goals 
            (goal_title, goal_description, goal_order, icon, language)
            VALUES (?, ?, ?, ?, ?)
        `;

        for (const goal of goals) {
            await queryWithinTransaction(connection, goalInsertQuery, [
                goal.goal_title,
                goal.goal_description,
                goal.goal_order,
                goal.icon || null,
                lang
            ]);
        }

        await commitTransaction(connection);

        return NextResponse.json({
            message: 'تم حفظ رسالة وأهداف الجامعة بنجاح',
            success: true
        });
    } catch (error) {
        await rollbackTransaction(connection);
        console.error('خطأ في حفظ رسالة وأهداف الجامعة:', error);
        return NextResponse.json(
            { error: 'فشل في حفظ رسالة وأهداف الجامعة', success: false },
            { status: 500 }
        );
    }
}

// تحديث رسالة وأهداف الجامعة
export async function PUT(request: NextRequest) {
    const connection = await startTransaction();
    
    try {
        const { mission, goals } = await request.json();
        const searchParams = request.nextUrl.searchParams;
        const lang = searchParams.get('lang') || 'ar';

        // تحديث رسالة الجامعة
        if (mission) {
            const updateMissionQuery = `
                UPDATE university_mission 
                SET title = ?, content = ?
                WHERE language = ?
            `;
            await queryWithinTransaction(connection, updateMissionQuery, [
                mission.title,
                mission.content,
                lang
            ]);
        }

        // تحديث الأهداف
        if (goals && goals.length > 0) {
            // حذف الأهداف القديمة
            await queryWithinTransaction(
                connection,
                'DELETE FROM university_goals WHERE language = ?',
                [lang]
            );

            // إضافة الأهداف الجديدة
            const goalInsertQuery = `
                INSERT INTO university_goals 
                (goal_title, goal_description, goal_order, icon, language)
                VALUES (?, ?, ?, ?, ?)
            `;

            for (const goal of goals) {
                await queryWithinTransaction(connection, goalInsertQuery, [
                    goal.goal_title,
                    goal.goal_description,
                    goal.goal_order,
                    goal.icon || null,
                    lang
                ]);
            }
        }

        await commitTransaction(connection);

        return NextResponse.json({
            message: 'تم تحديث رسالة وأهداف الجامعة بنجاح',
            success: true
        });
    } catch (error) {
        await rollbackTransaction(connection);
        console.error('خطأ في تحديث رسالة وأهداف الجامعة:', error);
        return NextResponse.json(
            { error: 'فشل في تحديث رسالة وأهداف الجامعة', success: false },
            { status: 500 }
        );
    }
}

// حذف رسالة وأهداف الجامعة للغة محددة
export async function DELETE(request: NextRequest) {
    const connection = await startTransaction();
    
    try {
        const searchParams = request.nextUrl.searchParams;
        const lang = searchParams.get('lang') || 'ar';

        // حذف رسالة الجامعة
        await queryWithinTransaction(
            connection,
            'DELETE FROM university_mission WHERE language = ?',
            [lang]
        );

        // حذف أهداف الجامعة
        await queryWithinTransaction(
            connection,
            'DELETE FROM university_goals WHERE language = ?',
            [lang]
        );

        await commitTransaction(connection);

        return NextResponse.json({
            message: 'تم حذف رسالة وأهداف الجامعة بنجاح',
            success: true
        });
    } catch (error) {
        await rollbackTransaction(connection);
        console.error('خطأ في حذف رسالة وأهداف الجامعة:', error);
        return NextResponse.json(
            { error: 'فشل في حذف رسالة وأهداف الجامعة', success: false },
            { status: 500 }
        );
    }
}

