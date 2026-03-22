'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/providers/AuthProvider';
import api from '@/app/lib/api';

export default function AdminDashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        news: 0,
        users: 0,
        categories: 0,
        tags: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [newsRes, usersRes, menusRes, tagsRes] = await Promise.all([
                    api.get('/news?limit=1'),
                    api.get('/users'),
                    api.get('/menus'),
                    api.get('/tags')
                ]);

                setStats({
                    news: newsRes.data.totalCount || 0,
                    users: usersRes.data.length || 0,
                    categories: menusRes.data.length || 0,
                    tags: tagsRes.data.length || 0
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="mb-4">Dashboard</h1>
            <p className="mb-4">Welcome, {user?.username || user?.email}!</p>

            <div className="row">
                <div className="col-md-3 mb-4">
                    <div className="card bg-primary text-white">
                        <div className="card-body">
                            <h5 className="card-title">Total News</h5>
                            <h2>{stats.news}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card bg-success text-white">
                        <div className="card-body">
                            <h5 className="card-title">Total Users</h5>
                            <h2>{stats.users}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card bg-info text-white">
                        <div className="card-body">
                            <h5 className="card-title">Categories</h5>
                            <h2>{stats.categories}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card bg-warning text-white">
                        <div className="card-body">
                            <h5 className="card-title">Tags</h5>
                            <h2>{stats.tags}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
