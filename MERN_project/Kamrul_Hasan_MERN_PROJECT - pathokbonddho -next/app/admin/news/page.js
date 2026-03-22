'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/app/lib/api';
import { toast } from 'react-toastify';

export default function NewsList() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchNews = async (pageNum = 1) => {
        setLoading(true);
        try {
            const response = await api.get(`/news?page=${pageNum}&limit=10`);
            setNews(response.data.news || []);
            setTotalPages(response.data.totalPages || 1);
            setPage(pageNum);
        } catch (error) {
            toast.error('Error fetching news');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this news?')) return;
        
        try {
            await api.delete(`/news/${id}`);
            toast.success('News deleted successfully');
            fetchNews(page);
        } catch (error) {
            toast.error('Error deleting news');
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>News List</h1>
                <Link href="/admin/news/create" className="btn btn-primary">
                    Create News
                </Link>
            </div>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Headline</th>
                                    <th>Status</th>
                                    <th>Type</th>
                                    <th>Author</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {news.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center">No news found</td>
                                    </tr>
                                ) : (
                                    news.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.newsHeadline}</td>
                                            <td>
                                                <span className={`badge bg-${item.status === 'published' ? 'success' : 'warning'}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td>{item.newsType}</td>
                                            <td>{item.Author?.name || '-'}</td>
                                            <td>
                                                <Link href={`/admin/news/edit/${item.id}`} className="btn btn-sm btn-info me-2">
                                                    Edit
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(item.id)} 
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <nav>
                            <ul className="pagination justify-content-center">
                                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => fetchNews(page - 1)}>Previous</button>
                                </li>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <li key={i + 1} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => fetchNews(i + 1)}>
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}
                                <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => fetchNews(page + 1)}>Next</button>
                                </li>
                            </ul>
                        </nav>
                    )}
                </>
            )}
        </div>
    );
}
