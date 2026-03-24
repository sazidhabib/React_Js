'use client';

import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Card, Spinner, Pagination, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from "@/app/lib/api";
import { useAuth } from "@/app/providers/AuthProvider";

const AlbumDashboard = () => {
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin' || user?.isAdmin;

    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editAlbum, setEditAlbum] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [formData, setFormData] = useState({ name: '', status: 'active' });

    const fetchAlbums = async () => {
        setLoading(true);
        try {
            const res = await api.get('/albums', { params: { page } });
            // The legacy API returns { albums, totalPages } or just the array
            if (Array.isArray(res.data)) {
                setAlbums(res.data);
                setTotalPages(res.data.totalPages || 1);
            } else if (res.data.albums) {
                setAlbums(res.data.albums);
                setTotalPages(res.data.totalPages);
            } else {
                setAlbums([]);
                setTotalPages(1);
            }
        } catch (err) {
            toast.error("Failed to fetch albums");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { if (isAdmin) fetchAlbums(); }, [page, isAdmin]);

    const handleShowModal = (album = null) => {
        if (album) {
            setEditAlbum(album);
            setFormData({ name: album.name, status: album.status });
        } else {
            setEditAlbum(null);
            setFormData({ name: '', status: 'active' });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.name.trim().length < 3) {
            toast.warning("Album name must be at least 3 characters");
            return;
        }

        try {
            if (editAlbum) {
                await api.patch(`/albums/${editAlbum._id}`, formData);
                toast.success("Album updated");
            } else {
                await api.post('/albums', formData);
                toast.success("Album created");
            }
            setShowModal(false);
            fetchAlbums();
        } catch (err) {
            toast.error(err.response?.data?.message || "Operation failed");
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/albums/${deleteId}`);
            toast.success("Album deleted");
            fetchAlbums();
        } catch (err) {
            toast.error("Delete failed");
        } finally {
            setShowConfirm(false);
            setDeleteId(null);
        }
    };

    if (!isAdmin) return <div className="p-4 text-center"><h4>Access Denied</h4></div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4>Album Dashboard</h4>
                <Button onClick={() => handleShowModal()}>+ Add Album</Button>
            </div>

            <Card className="shadow-sm">
                <Card.Body>
                    {loading ? (
                        <div className="text-center py-5"><Spinner animation="border" /></div>
                    ) : (
                        <Table striped bordered hover responsive>
                            <thead className="table-dark">
                                <tr><th>#</th><th>Name</th><th>Status</th><th>Actions</th></tr>
                            </thead>
                            <tbody>
                                {albums.map((album, i) => (
                                    <tr key={album._id}>
                                        <td>{(page - 1) * 10 + i + 1}</td>
                                        <td>{album.name}</td>
                                        <td><span className={`badge bg-${album.status === 'active' ? 'success' : 'secondary'}`}>{album.status}</span></td>
                                        <td>
                                            <div className="d-flex gap-1">
                                                <Button variant="info" size="sm" onClick={() => handleShowModal(album)}>Edit</Button>
                                                <Button variant="danger" size="sm" onClick={() => { setDeleteId(album._id); setShowConfirm(true); }}>Delete</Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {albums.length === 0 && <tr><td colSpan="4" className="text-center py-4 text-muted">No albums found</td></tr>}
                            </tbody>
                        </Table>
                    )}
                    {totalPages > 1 && (
                        <Pagination className="justify-content-center mt-3">
                            {[...Array(totalPages)].map((_, i) => (
                                <Pagination.Item key={i} active={i + 1 === page} onClick={() => setPage(i + 1)}>{i + 1}</Pagination.Item>
                            ))}
                        </Pagination>
                    )}
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton><Modal.Title>{editAlbum ? 'Edit' : 'Create'} Album</Modal.Title></Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Album Name</Form.Label>
                            <Form.Control value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                        <Button type="submit" variant="primary">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
                <Modal.Header closeButton><Modal.Title>Confirm Deletion</Modal.Title></Modal.Header>
                <Modal.Body>Are you sure you want to delete this album?</Modal.Body>
                <Modal.Footer><Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancel</Button><Button variant="danger" onClick={handleDelete}>Delete</Button></Modal.Footer>
            </Modal>
        </div>
    );
};

export default AlbumDashboard;
