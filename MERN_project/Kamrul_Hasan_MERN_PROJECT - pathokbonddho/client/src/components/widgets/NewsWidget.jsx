import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Badge, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NewsWidget = ({ cell }) => {
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchNews = async () => {
            try {
                if (!cell.contentId) {
                    setLoading(false);
                    return;
                }

                // If contentId looks like a Mongo ID, fetch specific news
                // Check if it's an "auto" fetched item from page layout data?
                // Actually the API structure suggests `contentId` is saved.

                const response = await axios.get(`${API_BASE_URL}/api/news/${cell.contentId}`);
                setNews(response.data.data || response.data.news || response.data);
            } catch (err) {
                console.error('Error fetching news widget data:', err);
                // Optionally handle error state
            } finally {
                setLoading(false);
            }
        };

        if (cell.contentId) {
            fetchNews();
        } else if (cell.tag) {
            // Fetch latest news by tag
            const fetchByTag = async () => {
                try {
                    const response = await axios.get(`${API_BASE_URL}/api/news?tag=${cell.tag}&limit=1`);
                    const newsItems = response.data.news || response.data.rows || [];
                    if (newsItems.length > 0) {
                        setNews(newsItems[0]);
                    }
                } catch (err) {
                    // console.error(`Error fetching news by tag ${cell.tag}:`, err);
                } finally {
                    setLoading(false);
                }
            };
            fetchByTag();
        } else {
            setLoading(false);
        }
    }, [cell.contentId, cell.tag, API_BASE_URL]);

    if (loading) {
        return <div className="text-center p-2"><Spinner animation="border" size="sm" /></div>;
    }

    if (!news) {
        return null; // Or return a placeholder if desired
    }

    // Default design
    return (
        <Card className="h-100 border-0 shadow-sm news-widget">
            <div className="card-img-wrapper position-relative" style={{ height: '200px', overflow: 'hidden' }}>
                <Link to={`/news/${news._id || news.id}`}>
                    <Card.Img
                        variant="top"
                        src={(news.image || news.thumbnail) ? (
                            (news.image || news.thumbnail).startsWith('http')
                                ? (news.image || news.thumbnail)
                                : `${API_BASE_URL.replace(/\/$/, '')}/uploads/${(news.image || news.thumbnail).replace(/^\//, '').replace(/^uploads\//, '')}`
                        ) : '/placeholder-image.jpg'}
                        className="h-100 w-100 object-fit-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/placeholder-image.jpg';
                        }}
                    />
                </Link>
                {news.category && (
                    <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
                        {news.category.name}
                    </Badge>
                )}
            </div>
            <Card.Body>
                <Link to={`/news/${news._id || news.id}`} className="text-decoration-none text-dark">
                    <Card.Title className="h6 fw-bold mb-2 code-font-bangla">
                        {news.newsHeadline}
                    </Card.Title>
                </Link>
                {cell.design === 'featured' && (
                    <Card.Text className="small text-muted mb-2">
                        {news.shortDescription?.substring(0, 100)}...
                    </Card.Text>
                )}
                <div className="d-flex justify-content-between align-items-center small text-muted">
                    <span>{new Date(news.createdAt).toLocaleDateString()}</span>
                </div>
            </Card.Body>
        </Card>
    );
};

export default NewsWidget;
