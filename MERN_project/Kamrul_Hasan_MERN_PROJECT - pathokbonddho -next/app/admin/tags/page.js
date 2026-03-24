'use client';

import React, { useState, useEffect } from 'react';
import { Button, Table, Spinner, Badge, Form, Card, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from "@/app/lib/api";
import { useAuth } from "@/app/providers/AuthProvider";

const IMG_URL = `${process.env.NEXT_PUBLIC_API_URL || ''}/uploads`;

// --- Sub-components (Inlined) ---

const TagForm = ({ tag, onSubmit, onCancel, isSubmitting }) => {
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        tagTitle: '',
        tagDescription: '',
        image: null,
        imageUrl: '',
        metaTitle: '',
        metaDescription: '',
        metaKeywords: ''
    });

    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (tag) {
            setFormData({
                name: tag.name || '',
                slug: tag.slug || '',
                tagTitle: tag.tagTitle || '',
                tagDescription: tag.tagDescription || '',
                image: null,
                imageUrl: tag.image || '',
                metaTitle: tag.metaTitle || '',
                metaDescription: tag.metaDescription || '',
                metaKeywords: tag.metaKeywords || ''
            });
            if (tag.image) {
                const previewUrl = tag.image.startsWith('http') ? tag.image : `${IMG_URL}/${tag.image}`;
                setImagePreview(previewUrl);
            }
        } else {
            setFormData({
                name: '', slug: '', tagTitle: '', tagDescription: '',
                image: null, imageUrl: '', metaTitle: '', metaDescription: '', metaKeywords: ''
            });
            setImagePreview('');
        }
    }, [tag]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            const file = files[0];
            if (file) {
                setFormData(prev => ({ ...prev, [name]: file, imageUrl: '' }));
                setImagePreview(URL.createObjectURL(file));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
            if (name === 'name' && !tag) { // Auto-generate slug for new tags
                setFormData(prev => ({ ...prev, slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }));
            }
        }
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            setErrors({ name: 'Name is required' });
            return;
        }
        const submitData = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'image' && formData[key] instanceof File) {
                submitData.append(key, formData[key]);
            } else if (key !== 'imageUrl' && key !== 'image' && formData[key]) {
                submitData.append(key, formData[key]);
            }
        });
        if (!formData.image && formData.imageUrl) {
            submitData.append('image', formData.imageUrl);
        }
        onSubmit(submitData);
    };

    return (
        <Card className="mb-4">
            <Card.Header><h5 className="mb-0">{tag ? 'Edit Tag' : 'Create New Tag'}</h5></Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name <span className="text-danger">*</span></Form.Label>
                                <Form.Control name="name" value={formData.name} onChange={handleChange} isInvalid={!!errors.name} />
                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Slug <span className="text-danger">*</span></Form.Label>
                                <Form.Control name="slug" value={formData.slug} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Tag Title</Form.Label>
                        <Form.Control name="tagTitle" value={formData.tagTitle} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Tag Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="tagDescription" value={formData.tagDescription} onChange={handleChange} />
                    </Form.Group>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Upload Image</Form.Label>
                                <Form.Control type="file" name="image" accept="image/*" onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Or Image URL</Form.Label>
                                <Form.Control name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    {imagePreview && (
                        <div className="mb-3">
                            <img src={imagePreview} alt="Preview" className="img-thumbnail" style={{ maxHeight: '100px' }} />
                        </div>
                    )}
                    <Card className="mt-3 bg-light">
                        <Card.Header><h6 className="mb-0">SEO Settings</h6></Card.Header>
                        <Card.Body>
                            <Form.Group className="mb-2">
                                <Form.Label>Meta Title</Form.Label>
                                <Form.Control name="metaTitle" value={formData.metaTitle} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Meta Description</Form.Label>
                                <Form.Control as="textarea" rows={2} name="metaDescription" value={formData.metaDescription} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-0">
                                <Form.Label>Meta Keywords</Form.Label>
                                <Form.Control name="metaKeywords" value={formData.metaKeywords} onChange={handleChange} placeholder="k1, k2" />
                            </Form.Group>
                        </Card.Body>
                    </Card>
                    <div className="mt-4 d-flex gap-2">
                        <Button type="submit" variant="primary" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : (tag ? 'Update Tag' : 'Create Tag')}</Button>
                        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

// --- Main Component ---

const TagsDashboard = () => {
    const [tags, setTags] = useState([]);
    const [editingTag, setEditingTag] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const isLoggedIn = !!user;

    const loadTags = async () => {
        setLoading(true);
        try {
            const response = await api.get('/tags');
            const data = Array.isArray(response.data) ? response.data : (response.data.tags || response.data.data || []);
            setTags(data);
        } catch (error) {
            console.error('Error loading tags:', error);
            toast.error('Failed to load tags');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadTags(); }, []);

    const handleSubmit = async (formData) => {
        setLoading(true);
        try {
            if (editingTag) {
                await api.patch(`/tags/${editingTag.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                toast.success('Tag updated');
            } else {
                await api.post('/tags', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                toast.success('Tag created');
            }
            loadTags();
            setShowForm(false);
            setEditingTag(null);
        } catch (error) {
            toast.error('Operation failed');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (tagId) => {
        if (window.confirm('Delete this tag?')) {
            try {
                await api.delete(`/tags/${tagId}`);
                toast.success('Tag deleted');
                loadTags();
            } catch (error) {
                toast.error('Delete failed');
            }
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4>Tags Dashboard</h4>
                <Button onClick={() => setShowForm(true)} disabled={showForm}>+ Add Tag</Button>
            </div>

            {showForm && (
                <TagForm
                    tag={editingTag}
                    onSubmit={handleSubmit}
                    onCancel={() => { setShowForm(false); setEditingTag(null); }}
                    isSubmitting={loading}
                />
            )}

            {loading && !showForm ? (
                <div className="text-center py-5"><Spinner animation="border" /></div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Slug</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tags.map((tag, index) => (
                            <tr key={tag.id || index}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        {tag.image && (
                                            <img src={tag.image.startsWith('http') ? tag.image : `${IMG_URL}/${tag.image}`} alt="" className="rounded me-2" style={{ width: '30px', height: '30px', objectFit: 'cover' }} />
                                        )}
                                        {tag.name}
                                    </div>
                                </td>
                                <td><code>{tag.slug}</code></td>
                                <td>{tag.image ? <Badge bg="success">Yes</Badge> : <Badge bg="secondary">No</Badge>}</td>
                                <td>
                                    <div className="d-flex gap-1">
                                        <Button variant="outline-primary" size="sm" onClick={() => { setEditingTag(tag); setShowForm(true); }}>Edit</Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(tag.id)}>Delete</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            {!loading && tags.length === 0 && <p className="text-center text-muted">No tags found.</p>}
        </div>
    );
};

export default TagsDashboard;
