import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Spinner, Alert, Badge } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

const NewsDetails = () => {
    const { id } = useParams();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [relatedNews, setRelatedNews] = useState([]);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchNewsDetails = async () => {
            try {
                setLoading(true);
                // Fetch the main news article
                const response = await axios.get(`${API_BASE_URL}/api/news/${id}`);
                const articleData = response.data.data || response.data.news || response.data;

                if (!articleData) throw new Error("Article not found");
                setNews(articleData);

                // Fetch related news (if categories exist, fetch by first category tag, otherwise just fetch latest)
                let relatedParams = { limit: 6, status: 'published', excludeIds: id };
                if (articleData.Categories && articleData.Categories.length > 0) {
                    relatedParams.categories = articleData.Categories[0].slug || articleData.Categories[0].name;
                }

                const relatedRes = await axios.get(`${API_BASE_URL}/api/news`, { params: relatedParams });
                setRelatedNews(relatedRes.data.news || relatedRes.data.rows || []);

            } catch (err) {
                console.error('Error fetching news details:', err);
                setError(err.message || "Failed to load the article.");
            } finally {
                setLoading(false);
            }
        };

        fetchNewsDetails();

        // Scroll to top when loading a new article
        window.scrollTo(0, 0);
    }, [id, API_BASE_URL]);

    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('http')) {
            return imagePath.replace(/^http:\/\//, 'https://');
        }
        return `${API_BASE_URL}/${imagePath.replace(/^\//, '')}`;
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('bn-BD', {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <Spinner animation="grow" variant="success" />
            </Container>
        );
    }

    if (error || !news) {
        return (
            <Container className="py-5" style={{ minHeight: '60vh' }}>
                <Alert variant="danger" className="text-center shadow-sm">
                    <Alert.Heading className="font-bangla mt-2">খবরটি পাওয়া যায়নি</Alert.Heading>
                    <p>{error || "The requested article could not be loaded."}</p>
                    <Link to="/" className="btn btn-outline-danger mt-3 font-bangla">নীড়ে ফিরে যান</Link>
                </Alert>
            </Container>
        );
    }

    const leadImageUrl = getImageUrl(news.leadImage || news.metaImage || news.thumbImage);

    return (
        <article className="news-details-page bg-white pb-5">
            {/* SEO Helmet */}
            <Helmet>
                <title>{news.metaTitle || news.newsHeadline} | পাঠকবন্ধু</title>
                <meta name="description" content={news.metaDescription || news.shortDescription} />
                {news.metaKeywords && <meta name="keywords" content={news.metaKeywords} />}
                {leadImageUrl && <meta property="og:image" content={leadImageUrl} />}
            </Helmet>

            {/* Main Content Container */}
            <Container className="pt-4">
                <Row className="g-5">

                    {/* LEFT COLUMN: Main Article (col-lg-8) */}
                    <Col lg={8} className="main-article-column">

                        {/* Categories Badge */}
                        <div className="mb-3">
                            {news.Categories && news.Categories.map(cat => (
                                <Badge bg="danger" className="me-2 px-3 py-2 font-bangla rounded-pill shadow-sm" key={cat.id || cat._id}>
                                    {cat.name}
                                </Badge>
                            ))}
                        </div>

                        {/* Title & Subtitle */}
                        <h1 className="fw-bold mb-3 font-bangla" style={{ fontSize: '2.5rem', lineHeight: '1.4', color: '#1a1a1a' }}>
                            {news.newsHeadline}
                        </h1>

                        {news.alternativeHeadline && (
                            <h3 className="text-muted font-bangla mb-4" style={{ fontSize: '1.5rem', lineHeight: '1.4' }}>
                                {news.alternativeHeadline}
                            </h3>
                        )}

                        {/* Meta Bar: Author, Date, Sharing */}
                        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 py-3 border-top border-bottom">
                            <div className="d-flex align-items-center text-muted small font-bangla">
                                {news.Author && (
                                    <div className="me-4 text-dark fw-bold">
                                        <i className="bi bi-person-circle me-2 text-secondary"></i>
                                        {news.Author.name}
                                    </div>
                                )}
                                <div>
                                    <i className="bi bi-calendar3 me-2 text-secondary"></i>
                                    {formatDate(news.newsSchedule || news.createdAt)}
                                </div>
                            </div>

                            {/* Social Sharing (Static UI for now) */}
                            <div className="social-sharing-icons mt-2 mt-md-0">
                                <span className="me-2 text-muted small">শেয়ার করুন:</span>
                                <button className="btn btn-sm btn-light rounded-circle me-2 shadow-sm border"><i className="fab fa-facebook-f text-primary"></i></button>
                                <button className="btn btn-sm btn-light rounded-circle me-2 shadow-sm border"><i className="fab fa-twitter text-info"></i></button>
                                <button className="btn btn-sm btn-light rounded-circle shadow-sm border"><i className="fab fa-whatsapp text-success"></i></button>
                            </div>
                        </div>

                        {/* Hero Image */}
                        {leadImageUrl && (
                            <div className="hero-image-wrapper mb-4 rounded shadow-sm overflow-hidden bg-light" style={{ maxHeight: '500px' }}>
                                <img
                                    src={leadImageUrl}
                                    alt={news.imageCaption || news.newsHeadline}
                                    className="w-100 h-100 object-fit-cover"
                                    style={{ width: '100%', display: 'block' }}
                                />
                                {news.imageCaption && (
                                    <p className="text-muted small text-center my-2 font-bangla px-3 fst-italic">
                                        {news.imageCaption}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Article Body Content */}
                        <div
                            className="article-body font-bangla editor-content"
                            style={{
                                fontSize: '1.2rem',
                                lineHeight: '1.9',
                                color: '#333',
                                wordWrap: 'break-word',
                            }}
                            dangerouslySetInnerHTML={{ __html: news.content }}
                        />

                        {/* Article Tags */}
                        {news.Tags && news.Tags.length > 0 && (
                            <div className="flex items-center mt-5 pt-4 border-top">
                                <h6 className="fw-bold mb-3 font-bangla text-muted">ট্যাগ:</h6>
                                <div className=" gap-2">
                                    {news.Tags.map(tag => (
                                        <span key={tag.id || tag._id} className="badge bg-light text-dark border px-3 py-2 font-bangla">
                                            #{tag.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Col>

                    {/* RIGHT COLUMN: Sidebar (col-lg-4) */}
                    <Col lg={4} className="sidebar-column">
                        <div className="sticky-top" style={{ top: '100px', zIndex: 1 }}>

                            {/* Optional Ad Space in Sidebar */}
                            <div className="my-4 p-4 bg-light text-center border rounded d-flex align-items-center justify-content-center flex-column" style={{ minHeight: '250px' }}>
                                <span className="text-muted small mb-2">- Advertisement -</span>
                                <div className="text-muted opacity-50">
                                    <i className="bi bi-badge-ad fs-1"></i>
                                </div>
                            </div>

                            <div className="section-header mb-4">
                                <div className="section-title-with-lines">
                                    <h4 className="title-text font-bangla fs-5">আরও খবর</h4>
                                </div>
                            </div>

                            <div className="related-news-list">
                                {relatedNews.length > 0 ? (
                                    relatedNews.map((item, idx) => {
                                        const rImg = getImageUrl(item.thumbImage || item.leadImage);
                                        return (
                                            <div key={item.id || idx} className="d-flex align-items-start gap-3 mb-4 pb-3 border-bottom hover-bg-light transition rounded p-2">
                                                {rImg && (
                                                    <div className="flex-shrink-0" style={{ width: '100px', height: '70px', overflow: 'hidden', borderRadius: '4px' }}>
                                                        <Link to={`/news/${item.id || item._id}`}>
                                                            <img
                                                                src={rImg}
                                                                alt={item.newsHeadline}
                                                                className="w-100 h-100 object-fit-cover hover-zoom"
                                                            />
                                                        </Link>
                                                    </div>
                                                )}
                                                <div>
                                                    <Link to={`/news/${item.id || item._id}`} className="text-decoration-none text-dark">
                                                        <h6 className="fw-bold mb-2 font-bangla hover-danger" style={{ lineHeight: '1.4' }}>
                                                            {item.newsHeadline}
                                                        </h6>
                                                    </Link>
                                                    <div className="small text-muted font-bangla" style={{ fontSize: '0.8rem' }}>
                                                        <i className="bi bi-clock me-1"></i>
                                                        {new Date(item.createdAt).toLocaleDateString('bn-BD')}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-muted small text-center font-bangla py-3 bg-light rounded">No related news found.</p>
                                )}
                            </div>



                        </div>
                    </Col>
                </Row>
            </Container>
        </article>
    );
};

export default NewsDetails;
