'use client';

import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Card, Spinner, Pagination, Modal, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from "@/app/lib/api";
import { useAuth } from "@/app/providers/AuthProvider";

const IMG_URL = `${process.env.NEXT_PUBLIC_API_URL || ''}/uploads`;

const VideoDashboard = () => {
    const { user } = useAuth();
    const [videos, setVideos] = useState([]);
    const [newVideo, setNewVideo] = useState({ title: '', description: '', src: '', thumbnail: null });
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const videosPerPage = 8;

    const fetchVideos = async () => {
        setLoading(true);
        try {
            // Video API uses v1 prefix in legacy project
            const res = await api.get('/v1/videos');
            if (res.data.success && Array.isArray(res.data.data)) {
                setVideos(res.data.data);
            } else {
                setVideos([]);
            }
        } catch (error) {
            toast.error('Failed to fetch videos');
            setVideos([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchVideos(); }, []);

    const handleInputChange = (e) => {
        setNewVideo({ ...newVideo, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setNewVideo({ ...newVideo, thumbnail: e.target.files[0] });
    };

    const resetForm = () => {
        setNewVideo({ title: '', description: '', src: '', thumbnail: null });
        setEditId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newVideo.title.trim() || !newVideo.src.trim()) {
            toast.warning("Title and YouTube URL are required");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', newVideo.title);
            formData.append('description', newVideo.description);
            formData.append('src', newVideo.src);
            if (newVideo.thumbnail) formData.append('thumbnail', newVideo.thumbnail);

            if (editId) {
                await api.patch(`/v1/videos/${editId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                toast.success("Video updated");
            } else {
                await api.post('/v1/videos', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                toast.success("Video added");
            }
            fetchVideos();
            resetForm();
        } catch (error) {
            toast.error(error.response?.data?.message || "Operation failed");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/v1/videos/${deleteId}`);
            toast.success('Video deleted');
            fetchVideos();
        } catch (error) {
            toast.error('Delete failed');
        } finally {
            setShowConfirm(false);
            setDeleteId(null);
        }
    };

    const getYouTubeThumbnail = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url?.match(regExp);
        return (match && match[2].length === 11) ? `https://img.youtube.com/vi/${match[2]}/mqdefault.jpg` : null;
    };

    const indexOfLast = currentPage * videosPerPage;
    const currentItems = videos.slice(indexOfLast - videosPerPage, indexOfLast);
    const totalPages = Math.ceil(videos.length / videosPerPage);

    return (
        <div className="container mt-4">
            <h4 className="mb-4">Video Library</h4>
            
            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <h6>{editId ? 'Edit Video' : 'Add New Video'}</h6>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3"><Form.Label>Title*</Form.Label><Form.Control name="title" value={newVideo.title} onChange={handleInputChange} required /></Form.Group>
                                <Form.Group className="mb-3"><Form.Label>YouTube URL*</Form.Label><Form.Control name="src" value={newVideo.src} onChange={handleInputChange} required /></Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3"><Form.Label>Description</Form.Label><Form.Control as="textarea" rows={3} name="description" value={newVideo.description} onChange={handleInputChange} /></Form.Group>
                                <Form.Group className="mb-3"><Form.Label>Thumbnail (Optional)</Form.Label><Form.Control type="file" accept="image/*" onChange={handleFileChange} /></Form.Group>
                            </Col>
                        </Row>
                        <div className="d-flex gap-2">
                            <Button type="submit" variant={editId ? "warning" : "primary"} disabled={loading}>{editId ? 'Update' : 'Add'} Video</Button>
                            {editId && <Button variant="secondary" onClick={resetForm}>Cancel</Button>}
                        </div>
                    </Form>
                </Card.Body>
            </Card>

            <Card className="shadow-sm">
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead className="table-dark">
                            <tr><th>Preview</th><th>Title</th><th>Description</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                            {loading ? <tr><td colSpan="4" className="text-center py-5"><Spinner animation="border" /></td></tr> : currentItems.map((video) => (
                                <tr key={video._id}>
                                    <td>
                                        <img src={video.thumbnail || getYouTubeThumbnail(video.src)} alt="" style={{ width: '100px', height: '60px', objectFit: 'cover' }} />
                                    </td>
                                    <td>{video.title}</td>
                                    <td><div className="text-truncate" style={{maxWidth: '200px'}}>{video.description}</div></td>
                                    <td>
                                        <div className="d-flex gap-1">
                                            <Button variant="info" size="sm" onClick={() => { setEditId(video._id); setNewVideo({ title: video.title, description: video.description, src: video.src, thumbnail: null }); }}>Edit</Button>
                                            <Button variant="danger" size="sm" onClick={() => { setDeleteId(video._id); setShowConfirm(true); }}>Delete</Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {totalPages > 1 && (
                        <Pagination className="justify-content-center mt-3">
                            <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} />
                            {[...Array(totalPages)].map((_, i) => <Pagination.Item key={i} active={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>{i + 1}</Pagination.Item>)}
                            <Pagination.Next disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} />
                        </Pagination>
                    )}
                </Card.Body>
            </Card>

            <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
                <Modal.Header closeButton><Modal.Title>Confirm Deletion</Modal.Title></Modal.Header>
                <Modal.Body>Are you sure you want to delete this video?</Modal.Body>
                <Modal.Footer><Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancel</Button><Button variant="danger" onClick={handleDelete}>Delete</Button></Modal.Footer>
            </Modal>
        </div>
    );
};

export default VideoDashboard;
