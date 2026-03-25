import { headers } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import AdminLayoutClient from './components/AdminLayoutClient';

export default async function AdminLayout({ children }) {
    const headersList = await headers();
    const cookieHeader = headersList.get('cookie') || '';
    const token = cookieHeader.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

    let user = null;
    if (token) {
        try {
            user = jwtDecode(token);
            user.isAdmin = user.role === 'admin' || user.role === 'superadmin' || user.isAdmin;
        } catch (e) {
            console.error("JWT decode error in AdminLayout:", e);
        }
    }

    return (
        <AdminLayoutClient user={user}>
            {children}
        </AdminLayoutClient>
    );
}
