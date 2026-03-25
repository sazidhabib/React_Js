import { headers } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import HeroSectionListClient from './HeroSectionListClient';

async function getInitialHeroSections(token) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    try {
        const res = await fetch(`${API_URL}/hero-section`, {
            headers: { 'Authorization': `Bearer ${token}` },
            next: { revalidate: 0 }
        });
        if (!res.ok) return [];
        const data = await res.json();
        const heroData = data.data || data || [];
        return Array.isArray(heroData) ? heroData : (heroData ? [heroData] : []);
    } catch (err) {
        console.error("Fetch hero section error (server):", err);
        return [];
    }
}

export default async function HeroSectionDashboardPage() {
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
            console.error("JWT decode error (server hero):", e);
        }
    }

    const heroSections = isAdmin ? await getInitialHeroSections(token) : [];

    return (
        <HeroSectionListClient 
            initialHeroSections={heroSections} 
            isAdmin={isAdmin} 
        />
    );
}
