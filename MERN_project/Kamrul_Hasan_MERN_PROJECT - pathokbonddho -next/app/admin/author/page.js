'use client';

import React, { useState, useEffect } from 'react';
import { Button, Table, Spinner, Form, Card, Row, Col, Modal, Badge, Pagination } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from "@/app/lib/api";
import { useAuth } from "@/app/providers/AuthProvider";

const IMG_URL = `${process.env.NEXT_PUBLIC_API_URL || ''}/uploads`;

const AuthorDashboard = () => {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingAuthor, setEditingAuthor] = useState(null);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSpecial, setFilterSpecial] = useState('');
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        hasNext: false,
        hasPrev: false
    });

    const { user } = useAuth();
    const isLoggedIn = !!user;

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        websiteLink: '',
        isSpecialAuthor: false
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const fetchAuthors = async (page = 1) => {
        setLoading(true);
        try {
            const params = {
                page: page,
                limit: 10,
                ...(searchTerm && { search: searchTerm }),
                ...(filterSpecial && { isSpecialAuthor: filterSpecial })
            };
            const response = await api.get('/authors', { params });
            const data = response.data || {};
            const authorsList = data.authors || data.data || data || [];
            setAuthors(Array.isArray(authorsList) ? authorsList : []);
            setPagination({
                currentPage: data.currentPage || data.page || 1,
                totalPages: data.totalPages || 1,
                totalCount: data.totalCount || data.count || authorsList.length || 0,
                hasNext: data.hasNext || false,
                hasPrev: data.hasPrev || false
            });
        } catch (error) {
            console.error('Error fetching authors:', error);
            toast.error('Failed to fetch authors');
            setAuthors([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAuthors();
    }, [searchTerm, filterSpecial]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const resetForm = () => {
        setFormData({ name: '', description: '', websiteLink: '', isSpecialAuthor: false });
        setImageFile(null);
        setImagePreview('');
        setEditingAuthor(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const submitData = new FormData();
        Object.keys(formData).forEach(key => submitData.append(key, formData[key]));
        if (imageFile) submitData.append('image', imageFile);

        try {
            if (editingAuthor) {
                await api.patch(`/authors/${editingAuthor.id}`, submitData, { headers: { 'Content-Type': 'multipart/form-data' } });
                toast.success('Author updated');
            } else {
                await api.post('/authors', submitData, { headers: { 'Content-Type': 'multipart/form-data' } });
                toast.success('Author created');
            }
            setShowModal(false);
            resetForm();
            fetchAuthors(pagination.currentPage);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this author?')) {
            try {
                await api.delete(`/authors/${id}`);
                toast.success('Author deleted');
                fetchAuthors(pagination.currentPage);
            } catch (error) {
                toast.error('Delete failed');
            }
        }
    };

    const handleBulkDelete = async () => {
        if (!window.confirm(`Delete ${selectedAuthors.length} authors?`)) return;
        try {
            await api.post('/authors/bulk-delete', { authorIds: selectedAuthors });
            toast.success('Authors deleted');
            setSelectedAuthors([]);
            fetchAuthors(pagination.currentPage);
        } catch (error) {
            toast.error('Bulk delete failed');
        }
    };

    const toggleAuthorSelection = (id) => {
        setSelectedAuthors(prev => prev.includes(id) ? prev.filter(aid => aid !== id) : [...prev, id]);
    };

    const toggleSelectAll = () => {
        setSelectedAuthors(selectedAuthors.length === authors.length ? [] : authors.map(a => a.id));
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4>Authors Management</h4>
                <Button onClick={() => { resetForm(); setShowModal(true); }}>+ Add Author</Button>
            </div>

            <Row className="mb-4">
                <Col md={6}>
                    <Form.Control placeholder="Search authors..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </Col>
                <Col md={3}>
                    <Form.Select value={filterSpecial} onChange={(e) => setFilterSpecial(e.target.value)}>
                        <option value="">All Types</option>
                        <option value="true">Special</option>
                        <option value="false">Regular</option>
                    </Form.Select>
                </Col>
                <Col md={3}>
                    {selectedAuthors.length > 0 && <Button variant="danger" className="w-100" onClick={handleBulkDelete}>Delete Selected ({selectedAuthors.length})</Button>}
                </Col>
            </Row>

            <Card>
                <Card.Body>
                    {loading ? (
                        <div className="text-center py-5"><Spinner animation="border" /></div>
                    ) : (
                        <Table striped bordered hover responsive>
                            <thead className="table-dark">
                                <tr>
                                    <th><Form.Check checked={authors.length > 0 && selectedAuthors.length === authors.length} onChange={toggleSelectAll} /></th>
                                    <th>Photo</th>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {authors.map(author => (
                                    <tr key={author.id}>
                                        <td><Form.Check checked={selectedAuthors.includes(author.id)} onChange={() => toggleAuthorSelection(author.id)} /></td>
                                        <td>
                                            {author.image ? <img src={`${IMG_URL}/${author.image}`} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%' }} /> : <Badge bg="secondary">No Image</Badge>}
                                        </td>
                                        <td>{author.name}</td>
                                        <td>{author.isSpecialAuthor ? <Badge bg="success">Special</Badge> : <Badge bg="info">Regular</Badge>}</td>
                                        <td>
                                            <div className="d-flex gap-1">
                                                <Button variant="outline-primary" size="sm" onClick={() => {
                                                    setEditingAuthor(author);
                                                    setFormData({ name: author.name, description: author.description || '', websiteLink: author.websiteLink || '', isSpecialAuthor: author.isSpecialAuthor });
                                                    setImagePreview(author.image ? `${IMG_URL}/${author.image}` : '');
                                                    setShowModal(true);
                                                }}>Edit</Button>
                                                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(author.id)}>Delete</Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {authors.length === 0 && <tr><td colSpan="5" className="text-center text-muted">No authors found.</td></tr>}
                            </tbody>
                        </Table>
                    )}
                    {pagination.totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-3">
                            <Pagination>
                                <Pagination.Prev disabled={!pagination.hasPrev} onClick={() => fetchAuthors(pagination.currentPage - 1)} />
                                {[...Array(pagination.totalPages)].map((_, i) => (
                                    <Pagination.Item key={i} active={i + 1 === pagination.currentPage} onClick={() => fetchAuthors(i + 1)}>{i + 1}</Pagination.Item>
                                ))}
                                <Pagination.Next disabled={!pagination.hasNext} onClick={() => fetchAuthors(pagination.currentPage + 1)} />
                            </Pagination>
                        </div>
                    )}
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
                <Modal.Header closeButton><Modal.Title>{editingAuthor ? 'Edit' : 'Add'} Author</Modal.Title></Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name *</Form.Label>
                                    <Form.Control name="name" value={formData.name} onChange={handleInputChange} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Website</Form.Label>
                                    <Form.Control name="websiteLink" value={formData.websiteLink} onChange={handleInputChange} />
                                </Form.Group>
                                <Form.Check type="checkbox" label="Special Author" name="isSpecialAuthor" checked={formData.isSpecialAuthor} onChange={handleInputChange} className="mb-3" />
                                <Form.Group className="mb-3">
                                    <Form.Label>Photo</Form.Label>
                                    <Form.Control type="file" onChange={handleImageChange} />
                                </Form.Group>
                                {imagePreview && <img src={imagePreview} alt="Preview" className="img-thumbnail" style={{ maxHeight: '100px' }} />}
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={8} name="description" value={formData.description} onChange={handleInputChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                        <Button type="submit" variant="primary">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default AuthorDashboard;
