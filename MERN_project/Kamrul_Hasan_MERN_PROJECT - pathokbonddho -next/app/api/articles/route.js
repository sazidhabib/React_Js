import { NextResponse } from 'next/server';
import Article from '@/lib/models/article-model';
import User from '@/lib/models/user-model';

export async function GET() {
    try {
        const articles = await Article.findAll({
            where: { status: true },
            include: [{
                model: User,
                attributes: ['id', 'username']
            }],
            order: [['createdAt', 'DESC']]
        });

        return NextResponse.json(articles, { status: 200 });
    } catch (error) {
        console.error("Get Articles Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
