import { headers } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import BlogListClient from './BlogListClient';

async function getInitialBlogs(token) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    try {
        const res = await fetch(`${API_URL}/blogs`, {
            headers: { 'Authorization': `Bearer ${token}` },
            next: { revalidate: 0 }
        });
        if (!res.ok) return [];
        const data = await res.json();
        return (Array.isArray(data) ? data : []).sort((a, b) => new Date(b.publishDate || b.createdAt) - new Date(a.publishDate || a.createdAt));
    } catch (err) {
        console.error("Fetch blogs error (server):", err);
        return [];
    }
}

export default async function BlogDashboardPage() {
    const headersList = await headers();
    const cookieHeader = headersList.get('cookie') || '';
    const token = cookieHeader.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

    let user = null;
    let isAdmin = false;

    if (token) {
        try {
            user = jwtDecode(token);
            isAdmin = user.role === 'admin' || user.role === 'superadmin' || user.isAdmin;
        } catch (e) {
            console.error("JWT decode error (server blog):", e);
        }
    }

    const blogs = isAdmin ? await getInitialBlogs(token) : [];

    return (
        <BlogListClient 
            initialBlogs={blogs} 
            user={user}
            isAdmin={isAdmin} 
        />
    );
}
