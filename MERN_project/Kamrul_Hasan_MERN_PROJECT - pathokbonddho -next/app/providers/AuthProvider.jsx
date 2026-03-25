'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const userData = {
                    userId: decoded.userId,
                    email: decoded.email,
                    isAdmin: decoded.isAdmin,
                    role: decoded.role,
                    token
                };
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                // Ensure cookie is also set for SSR
                document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;
            } catch (error) {
                console.error('Token decode error:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            }
        }
        setLoading(false);
    }, []);

    const login = (token) => {
        try {
            const decoded = jwtDecode(token);
            const userData = {
                userId: decoded.userId,
                email: decoded.email,
                isAdmin: decoded.isAdmin,
                role: decoded.role,
                token
            };
            setUser(userData);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));
            // Set cookie for SSR
            document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Remove cookie
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
