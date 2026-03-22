'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../lib/api';

export default function HomePage() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await api.get('/news?status=published&limit=10');
                setNews(response.data.news || []);
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-light">
            <header className="bg-primary text-white py-3">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="h4 mb-0">কামরুল হাসান</h1>
                        <nav className="d-flex gap-3">
                            <Link href="/login" className="text-white text-decoration-none">Login</Link>
                            <Link href="/admin" className="text-white text-decoration-none">Admin</Link>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="container py-4">
                <h2 className="mb-4">Latest News</h2>
                {news.length === 0 ? (
                    <p className="text-muted">No news available</p>
                ) : (
                    <div className="row">
                        {news.map((item) => (
                            <div key={item.id} className="col-md-4 mb-4">
                                <div className="card h-100">
                                    {item.leadImage && (
                                        <img 
                                            src={`/${item.leadImage}`} 
                                            className="card-img-top" 
                                            alt={item.newsHeadline}
                                            style={{ height: '200px', objectFit: 'cover' }}
                                        />
                                    )}
                                    <div className="card-body">
                                        <h5 className="card-title">{item.newsHeadline}</h5>
                                        <p className="card-text text-muted small">
                                            {item.shortDescription?.substring(0, 100)}...
                                        </p>
                                        <Link href={`/news/${item.slug}`} className="btn btn-sm btn-primary">
                                            Read More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <footer className="bg-dark text-white py-4 mt-5">
                <div className="container text-center">
                    <p className="mb-0">&copy; {new Date().getFullYear()} কামরুল হাসান. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
