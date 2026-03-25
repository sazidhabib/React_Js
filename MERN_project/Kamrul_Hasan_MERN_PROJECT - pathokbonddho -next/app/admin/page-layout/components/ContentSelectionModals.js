'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Card, Spinner, InputGroup, Image, Badge } from 'react-bootstrap';
import api from "@/app/lib/api";
import { toast } from 'react-toastify';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const UPLOADS_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export const NewsSelectionModal = ({ show, onClose, onSelect }) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchNews = async () => {
        try {
            setLoading(true);
            const params = {
                page: currentPage,
                limit: 12,
                ...(searchTerm && { search: searchTerm })
            };
            const res = await api.get('/news', { params });
            const data = res.data.news || res.data.rows || res.data.data || res.data || [];
            setNews(Array.isArray(data) ? data : []);
            setTotalPages(res.data.totalPages || 1);
        } catch (error) {
            toast.error('Failed to load news');
            setNews([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { if (show) fetchNews(); }, [show, currentPage, searchTerm]);

    return (
        <Modal show={show} onHide={onClose} size="xl">
            <Modal.Header closeButton><Modal.Title>Select News</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form.Control type="text" placeholder="Search news..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="mb-3" />
                {loading ? <div className="text-center py-4"><Spinner animation="border" /></div> : (
                    <div className="row">
                        {news.map(item => (
                            <div key={item.id} className="col-md-6 mb-3">
                                <Card onClick={() => onSelect(item)} style={{ cursor: 'pointer' }} className="h-100">
                                    <Card.Body>
                                        <h6>{item.newsHeadline}</h6>
                                        <p className="small text-muted mb-1 text-truncate">{item.shortDescription}</p>
                                        <Badge bg="secondary">{item.status}</Badge>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}
                {totalPages > 1 && (
                    <div className="d-flex justify-content-center mt-3">
                        <Button size="sm" variant="outline-secondary" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</Button>
                        <span className="mx-3 align-self-center">Page {currentPage} of {totalPages}</span>
                        <Button size="sm" variant="outline-secondary" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</Button>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
};

export const ImageSelectionModal = ({ show, onClose, onSelect }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchImages = async () => {
        try {
            setLoading(true);
            const params = { page: currentPage, limit: 12 };
            // Note: backend path is /api/images/all (assuming api helper adds /api or use it directly)
            const res = await api.get('/images/all', { params });
            const data = res.data.images || [];
            setImages(data);
            setTotalPages(res.data.pagination?.totalPages || 1);
        } catch (error) {
            toast.error('Failed to load images');
            setImages([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { if (show) fetchImages(); }, [show, currentPage]);

    const filteredImages = searchTerm ? images.filter(img => (img.filename || '').toLowerCase().includes(searchTerm.toLowerCase())) : images;

    return (
        <Modal show={show} onHide={onClose} size="xl">
            <Modal.Header closeButton><Modal.Title>Select Image</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form.Control type="text" placeholder="Search filenames..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="mb-3" />
                {loading ? <div className="text-center py-4"><Spinner animation="border" /></div> : (
                    <div className="row">
                        {filteredImages.map(img => (
                            <div key={img.id} className="col-md-3 mb-3">
                                <Card onClick={() => onSelect(img)} style={{ cursor: 'pointer' }} className="h-100">
                                    <div style={{height: '150px', overflow: 'hidden'}}>
                                        <Image src={`${UPLOADS_BASE_URL}/${img.imageUrl || img.image}`} fluid style={{objectFit: 'cover', height: '100%', width: '100%'}} />
                                    </div>
                                    <Card.Body className="p-2 small text-truncate text-center">{img.filename}</Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
};

export const VideoSelectionModal = ({ show, onClose, onSelect }) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchVideos = async () => {
        try {
            setLoading(true);
            // From old code: fetching news with categories 'video,ভিডিও'
            const res = await api.get('/news', { params: { categories: 'video,ভিডিও', limit: 20 } });
            const data = res.data.news || res.data.rows || [];
            setVideos(data);
        } catch (error) {
            toast.error('Failed to load videos');
            setVideos([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { if (show) fetchVideos(); }, [show]);

    const filtered = searchTerm ? videos.filter(v => (v.newsHeadline || '').toLowerCase().includes(searchTerm.toLowerCase())) : videos;

    return (
        <Modal show={show} onHide={onClose} size="xl">
            <Modal.Header closeButton><Modal.Title>Select Video Content</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form.Control type="text" placeholder="Search headline..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="mb-3" />
                {loading ? <div className="text-center py-4"><Spinner animation="border" /></div> : (
                    <div className="row">
                        {filtered.map(v => (
                            <div key={v.id} className="col-md-6 mb-3">
                                <Card onClick={() => onSelect(v)} style={{ cursor: 'pointer' }} className="h-100">
                                    <Card.Body><h6>{v.newsHeadline}</h6><Badge bg="info">Video</Badge></Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
};

export const AdSelectionModal = ({ show, onClose, onSelect }) => {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchAds = async () => {
        try {
            setLoading(true);
            const res = await api.get('/ads');
            const data = res.data.ads || res.data.data || res.data || [];
            setAds(Array.isArray(data) ? data : []);
        } catch (error) {
            toast.error('Failed to load ads');
            setAds([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { if (show) fetchAds(); }, [show]);

    const filtered = searchTerm ? ads.filter(a => (a.title || a.name || '').toLowerCase().includes(searchTerm.toLowerCase())) : ads;

    return (
        <Modal show={show} onHide={onClose} size="xl">
            <Modal.Header closeButton><Modal.Title>Select Ad</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form.Control type="text" placeholder="Search ads..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="mb-3" />
                {loading ? <div className="text-center py-4"><Spinner animation="border" /></div> : (
                    <div className="row">
                        {filtered.map(ad => (
                            <div key={ad.id} className="col-md-6 mb-3">
                                <Card onClick={() => onSelect(ad)} style={{ cursor: 'pointer' }} className="h-100">
                                    {ad.image && (
                                        <div style={{height: '100px', overflow: 'hidden'}}>
                                            <Image src={`${UPLOADS_BASE_URL}/uploads/ads/${ad.image}`} fluid style={{objectFit: 'cover', height: '100%', width: '100%'}} />
                                        </div>
                                    )}
                                    <Card.Body><h6>{ad.title || ad.name || `Ad ${ad.id}`}</h6></Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
};
