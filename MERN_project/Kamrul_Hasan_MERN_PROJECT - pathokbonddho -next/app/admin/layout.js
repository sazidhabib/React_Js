'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/providers/AuthProvider';

export default function AdminLayout({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!user || !user.isAdmin)) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!user || !user.isAdmin) {
        return null;
    }

    return (
        <div className="d-flex min-vh-100">
            <aside className="bg-dark text-white p-3" style={{ width: '250px', minHeight: '100vh' }}>
                <h4 className="mb-4">Admin Panel</h4>
                <nav className="nav flex-column">
                    <Link href="/admin" className="nav-link text-white">Dashboard</Link>
                    <Link href="/admin/news" className="nav-link text-white">News</Link>
                    <Link href="/admin/news/create" className="nav-link text-white">Create News</Link>
                    <Link href="/admin/menu" className="nav-link text-white">Menu</Link>
                    <Link href="/admin/tags" className="nav-link text-white">Tags</Link>
                    <Link href="/admin/author" className="nav-link text-white">Authors</Link>
                    <Link href="/admin/articles" className="nav-link text-white">Articles</Link>
                    <Link href="/admin/blog" className="nav-link text-white">Blog</Link>
                    <Link href="/admin/ads" className="nav-link text-white">Ads</Link>
                    <Link href="/admin/design" className="nav-link text-white">Design</Link>
                    <Link href="/admin/users" className="nav-link text-white">Users</Link>
                </nav>
            </aside>
            <main className="flex-grow-1 p-4 bg-light">
                {children}
            </main>
        </div>
    );
}
