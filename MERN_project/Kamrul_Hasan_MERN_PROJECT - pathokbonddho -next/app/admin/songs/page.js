'use client';

import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Card, Spinner, Pagination, Modal, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from "@/app/lib/api";
import { useAuth } from "@/app/providers/AuthProvider";

const SongsDashboard = () => {
    const { user } = useAuth();
    const [songs, setSongs] = useState([]);
    const [newSong, setNewSong] = useState({ title: '', youtubeUrl: '', position: '' });
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    
    const [currentPage, setCurrentPage] = useState(1);
    const songsPerPage = 10;

    const fetchSongs = async () => {
        setLoading(true);
        try {
            const res = await api.get('/songs');
            setSongs(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            toast.error('Failed to fetch songs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchSongs(); }, []);

    const handleInputChange = (e) => {
        setNewSong({ ...newSong, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newSong.title.trim() || !newSong.youtubeUrl.trim()) {
            toast.warning("Title and YouTube URL are required");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                title: newSong.title,
                youtubeUrl: newSong.youtubeUrl,
                position: newSong.position !== "" ? Number(newSong.position) : 9999,
            };

            if (editId) {
                await api.patch(`/songs/${editId}`, payload);
                toast.success("Song updated");
            } else {
                await api.post('/songs', payload);
                toast.success("Song added");
            }
            setNewSong({ title: '', youtubeUrl: '', position: '' });
            setEditId(null);
            fetchSongs();
        } catch (error) {
            toast.error(error.response?.data?.message || "Operation failed");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/songs/${deleteId}`);
            toast.success('Song deleted');
            fetchSongs();
        } catch (error) {
            toast.error('Delete failed');
        } finally {
            setShowConfirm(false);
            setDeleteId(null);
        }
    };

    const indexOfLast = currentPage * songsPerPage;
    const currentItems = songs.slice(indexOfLast - songsPerPage, indexOfLast);
    const totalPages = Math.ceil(songs.length / songsPerPage);

    return (
        <div className="container mt-4">
            <h4 className="mb-4">Songs Management</h4>
            
            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <h6>{editId ? 'Edit Song' : 'Add New Song'}</h6>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={5}>
                                <Form.Group className="mb-3"><Form.Label>Title</Form.Label><Form.Control name="title" value={newSong.title} onChange={handleInputChange} required /></Form.Group>
                            </Col>
                            <Col md={5}>
                                <Form.Group className="mb-3"><Form.Label>YouTube URL</Form.Label><Form.Control name="youtubeUrl" value={newSong.youtubeUrl} onChange={handleInputChange} required /></Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group className="mb-3"><Form.Label>Position</Form.Label><Form.Control type="number" name="position" value={newSong.position} onChange={handleInputChange} /></Form.Group>
                            </Col>
                        </Row>
                        <div className="d-flex gap-2">
                            <Button type="submit" variant={editId ? "warning" : "primary"} disabled={loading}>{editId ? 'Update' : 'Add'} Song</Button>
                            {editId && <Button variant="secondary" onClick={() => { setEditId(null); setNewSong({ title: '', youtubeUrl: '', position: '' }); }}>Cancel</Button>}
                        </div>
                    </Form>
                </Card.Body>
            </Card>

            <Card className="shadow-sm">
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead className="table-dark">
                            <tr><th>Pos</th><th>Title</th><th>YouTube</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                            {loading ? <tr><td colSpan="4" className="text-center py-5"><Spinner animation="border" /></td></tr> : currentItems.map((song) => (
                                <tr key={song.id}>
                                    <td>{song.position}</td>
                                    <td>{song.title}</td>
                                    <td><a href={song.youtubeUrl} target="_blank" rel="noopener noreferrer">Watch</a></td>
                                    <td>
                                        <div className="d-flex gap-1">
                                            <Button variant="info" size="sm" onClick={() => { setEditId(song.id); setNewSong({ title: song.title, youtubeUrl: song.youtubeUrl, position: song.position }); }}>Edit</Button>
                                            <Button variant="danger" size="sm" onClick={() => { setDeleteId(song.id); setShowConfirm(true); }}>Delete</Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!loading && songs.length === 0 && <tr><td colSpan="4" className="text-center text-muted py-4">No songs found</td></tr>}
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
                <Modal.Body>Are you sure you want to delete this song?</Modal.Body>
                <Modal.Footer><Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancel</Button><Button variant="danger" onClick={handleDelete}>Delete</Button></Modal.Footer>
            </Modal>
        </div>
    );
};

export default SongsDashboard;
