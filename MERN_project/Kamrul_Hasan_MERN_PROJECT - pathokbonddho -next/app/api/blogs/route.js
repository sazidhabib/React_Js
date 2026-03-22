import { NextResponse } from 'next/server';
import Blog from '@/lib/models/blog-model';
import User from '@/lib/models/user-model';

export async function GET() {
    try {
        const blogs = await Blog.findAll({
            where: { status: true },
            include: [{
                model: User,
                attributes: ['id', 'username']
            }],
            order: [['createdAt', 'DESC']]
        });

        return NextResponse.json(blogs, { status: 200 });
    } catch (error) {
        console.error("Get Blogs Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
