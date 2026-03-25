import { headers } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import PageLayoutClient from './PageLayoutClient';

async function getInitialPageLayoutData(token) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    try {
        const [layoutRes, tagsRes, menusRes] = await Promise.all([
            fetch(`${API_URL}/layout`, {
                headers: { 'Authorization': `Bearer ${token}` },
                next: { revalidate: 0 }
            }),
            fetch(`${API_URL}/tags`, {
                headers: { 'Authorization': `Bearer ${token}` },
                next: { revalidate: 0 }
            }),
            fetch(`${API_URL}/menus`, {
                headers: { 'Authorization': `Bearer ${token}` },
                next: { revalidate: 0 }
            })
        ]);

        const layouts = layoutRes.ok ? await layoutRes.json() : [];
        const tagsData = tagsRes.ok ? await tagsRes.json() : { tags: [] };
        const menusData = menusRes.ok ? await menusRes.json() : { data: [] };

        return {
            pages: Array.isArray(layouts) ? layouts : [],
            tags: tagsData.tags || [],
            menus: menusData.data || []
        };
    } catch (err) {
        console.error("Fetch layout data error (server):", err);
        return { pages: [], tags: [], menus: [] };
    }
}

export default async function PageLayoutDashboardPage() {
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
            console.error("JWT decode error (server):", e);
        }
    }

    const { pages, tags, menus } = isAdmin ? await getInitialPageLayoutData(token) : { pages: [], tags: [], menus: [] };

    return (
        <PageLayoutClient 
            initialPages={pages} 
            initialTags={tags} 
            initialMenus={menus}
            isAdmin={isAdmin} 
        />
    );
}
