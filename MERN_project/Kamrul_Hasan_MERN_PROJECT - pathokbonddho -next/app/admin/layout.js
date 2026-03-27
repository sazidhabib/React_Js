import { headers } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { redirect } from 'next/navigation';
import AdminLayoutClient from './components/AdminLayoutClient';

export default async function AdminLayout({ children }) {
    const headersList = await headers();
    const cookieHeader = headersList.get('cookie') || '';
    const token = cookieHeader.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

    if (!token) {
        redirect('/login');
    }

    let user = null;
    try {
        user = jwtDecode(token);
        const isAdmin = user.role === 'admin' || user.role === 'superadmin' || user.isAdmin;
        if (!isAdmin) {
            redirect('/');
        }
        user.isAdmin = isAdmin;
    } catch (e) {
        console.error("JWT decode error in AdminLayout:", e);
        redirect('/login');
    }

    return (
        <AdminLayoutClient user={user}>
            {children}
        </AdminLayoutClient>
    );
}
