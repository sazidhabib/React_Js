import { headers } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import ArticlesListClient from './ArticlesListClient';

async function getInitialArticles(token) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    try {
        const res = await fetch(`${API_URL}/articles?sort=-publishDate`, {
            headers: { 'Authorization': `Bearer ${token}` },
            next: { revalidate: 0 }
        });
        if (!res.ok) return [];
        const data = await res.json();
        return Array.isArray(data) ? data : (data.articles || []);
    } catch (err) {
        console.error("Fetch articles error (server):", err);
        return [];
    }
}

export default async function ArticlesDashboardPage() {
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
            console.error("JWT decode error (server articles):", e);
        }
    }

    const articles = isAdmin ? await getInitialArticles(token) : [];

    return (
        <ArticlesListClient 
            initialArticles={articles} 
            isAdmin={isAdmin} 
        />
    );
}
