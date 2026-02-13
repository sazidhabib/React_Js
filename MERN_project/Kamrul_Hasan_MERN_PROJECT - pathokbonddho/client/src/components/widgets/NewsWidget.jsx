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
                if (!cell.contentId && !cell.tag) {
                    setLoading(false);
                    return;
                }

                if (cell.contentId) {
                    // Fetch specific news by ID
                    const response = await axios.get(`${API_BASE_URL}/api/news/${cell.contentId}`);
                    setNews(response.data.data || response.data.news || response.data);
                } else if (cell.tag) {
                    // Fetch latest news by tag
                    const response = await axios.get(`${API_BASE_URL}/api/news?tag=${cell.tag}&limit=1`);
                    const newsItems = response.data.news || response.data.rows || [];
                    if (newsItems.length > 0) {
                        setNews(newsItems[0]);
                    }
                }
            } catch (err) {
                console.error('Error fetching news widget data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [cell.contentId, cell.tag, API_BASE_URL]);

    // Build proper image URL from the news data
    // The DB stores paths like: "images/post_image/filename.jpg"
    // Server serves: /images/* → uploads/ folder, /uploads/* → uploads/ folder
    const getImageUrl = (newsItem) => {
        if (!newsItem) return null;

        // Check fields in order of preference: thumbImage, leadImage, metaImage
        const imagePath = newsItem.thumbImage || newsItem.leadImage || newsItem.metaImage;

        if (!imagePath) return null;

        // If already a full URL (starts with http)
        if (imagePath.startsWith('http')) {
            return imagePath.replace(/^http:\/\//, 'https://');
        }

        // Build URL: API_BASE_URL + / + imagePath
        // imagePath is like "images/post_image/filename.jpg"
        // Server serves /images as static, so this will work
        return `${API_BASE_URL}/${imagePath.replace(/^\//, '')}`;
    };

    if (loading) {
        return <div className="text-center p-2"><Spinner animation="border" size="sm" /></div>;
    }

    if (!news) {
        return null;
    }

    const imageUrl = getImageUrl(news);

    return (
        <Card className="h-100 border-0 shadow-sm news-widget">
            <div className="card-img-wrapper position-relative" style={{ height: '200px', overflow: 'hidden' }}>
                <Link to={`/news/${news._id || news.id}`}>
                    {imageUrl ? (
                        <Card.Img
                            variant="top"
                            src={imageUrl}
                            className="h-100 w-100 object-fit-cover"
                            onError={(e) => {
                                // Try alternative field on error
                                const altPath = news.leadImage || news.thumbImage;
                                if (altPath && e.target.src.indexOf(altPath) === -1) {
                                    e.target.src = `${API_BASE_URL}/${altPath.replace(/^\//, '')}`;
                                } else {
                                    e.target.onerror = null;
                                    e.target.style.display = 'none';
                                }
                            }}
                        />
                    ) : (
                        <div className="h-100 w-100 bg-light d-flex align-items-center justify-content-center">
                            <span className="text-muted">📰</span>
                        </div>
                    )}
                </Link>
                {news.Categories && news.Categories[0] && (
                    <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
                        {news.Categories[0].name}
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
