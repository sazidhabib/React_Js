'use client';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Form, Modal, Badge, InputGroup, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from "@/app/lib/api";
import { useAuth } from "@/app/providers/AuthProvider";

const DesignDashboard = () => {
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin' || user?.isAdmin; // Check both for compatibility
    
    const [designs, setDesigns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingDesign, setEditingDesign] = useState(null);
    const [selectedDesigns, setSelectedDesigns] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const [formData, setFormData] = useState({
        design_name: '',
        slug: '',
        design_status: true,
        description: '',
        design_data: '{}'
    });

    const fetchDesigns = async () => {
        setLoading(true);
        try {
            const params = {
                search: searchTerm,
                design_status: statusFilter
            };
            const response = await api.get('/designs', { params });
            const designsData = response.data.designs || response.data || [];
            setDesigns(Array.isArray(designsData) ? designsData : []);
        } catch (error) {
            console.error('Error fetching designs:', error);
            toast.error('Failed to fetch designs');
            setDesigns([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAdmin) {
            fetchDesigns();
        }
    }, [isAdmin, searchTerm, statusFilter]);

    const resetForm = () => {
        setFormData({
            design_name: '',
            slug: '',
            design_status: true,
            description: '',
            design_data: '{}'
        });
        setEditingDesign(null);
    };

    const handleShowModal = (design = null) => {
        if (design) {
            setEditingDesign(design);
            setFormData({
                design_name: design.design_name,
                slug: design.slug,
                design_status: design.design_status,
                description: design.description || '',
                design_data: typeof design.design_data === 'string'
                    ? design.design_data
                    : JSON.stringify(design.design_data, null, 2)
            });
        } else {
            resetForm();
        }
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => {
            const newState = { ...prev, [name]: type === 'checkbox' ? checked : value };
            if (name === 'design_name') {
                newState.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            }
            return newState;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let designDataJson;
        try {
            designDataJson = formData.design_data.trim() ? JSON.parse(formData.design_data) : {};
        } catch (error) {
            toast.error('Design data must be valid JSON');
            return;
        }

        try {
            const submitData = { ...formData, design_data: designDataJson };
            if (editingDesign) {
                await api.patch(`/designs/${editingDesign.id}`, submitData);
                toast.success('Design updated');
            } else {
                await api.post('/designs', submitData);
                toast.success('Design created');
            }
            setShowModal(false);
            fetchDesigns();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this design?')) return;
        try {
            await api.delete(`/designs/${id}`);
            toast.success('Design deleted');
            fetchDesigns();
        } catch (error) {
            toast.error('Delete failed');
        }
    };

    const handleBulkDelete = async () => {
        if (!window.confirm(`Delete ${selectedDesigns.length} designs?`)) return;
        try {
            await api.post('/designs/bulk-delete', { designIds: selectedDesigns });
            toast.success('Designs deleted');
            setSelectedDesigns([]);
            fetchDesigns();
        } catch (error) {
            toast.error('Bulk delete failed');
        }
    };

    const toggleStatus = async (design) => {
        try {
            await api.patch(`/designs/${design.id}`, { design_status: !design.design_status });
            toast.success(`Design ${!design.design_status ? 'activated' : 'deactivated'}`);
            fetchDesigns();
        } catch (error) {
            toast.error('Status update failed');
        }
    };

    if (!isAdmin) return <Container className="mt-4"><Card><Card.Body className="text-center"><h4>Access Denied</h4></Card.Body></Card></Container>;

    return (
        <Container fluid className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4>Design Management</h4>
                <Button onClick={() => handleShowModal()}>+ Add Design</Button>
            </div>

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Control placeholder="Search designs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </Col>
                <Col md={3}>
                    <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="">All Status</option>
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </Form.Select>
                </Col>
                <Col md={3}>
                    {selectedDesigns.length > 0 && <Button variant="danger" className="w-100" onClick={handleBulkDelete}>Delete ({selectedDesigns.length})</Button>}
                </Col>
            </Row>

            <Card>
                <Card.Body>
                    {loading ? (
                        <div className="text-center py-5"><Spinner animation="border" /></div>
                    ) : (
                        <Table striped hover responsive>
                            <thead className="table-dark">
                                <tr>
                                    <th><Form.Check checked={designs.length > 0 && selectedDesigns.length === designs.length} onChange={(e) => setSelectedDesigns(e.target.checked ? designs.map(d => d.id) : [])} /></th>
                                    <th>Name</th>
                                    <th>Slug</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {designs.map(design => (
                                    <tr key={design.id}>
                                        <td><Form.Check checked={selectedDesigns.includes(design.id)} onChange={(e) => setSelectedDesigns(prev => e.target.checked ? [...prev, design.id] : prev.filter(id => id !== design.id))} /></td>
                                        <td><strong>{design.design_name}</strong><div className="text-muted small">{design.description}</div></td>
                                        <td><code>{design.slug}</code></td>
                                        <td><Badge bg={design.design_status ? 'success' : 'secondary'}>{design.design_status ? 'Active' : 'Inactive'}</Badge></td>
                                        <td>
                                            <div className="d-flex gap-1">
                                                <Button variant="outline-primary" size="sm" onClick={() => handleShowModal(design)}>Edit</Button>
                                                <Button variant={design.design_status ? "outline-warning" : "outline-success"} size="sm" onClick={() => toggleStatus(design)}>{design.design_status ? 'Pause' : 'Play'}</Button>
                                                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(design.id)}>Delete</Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {designs.length === 0 && <tr><td colSpan="5" className="text-center text-muted py-4">No designs found</td></tr>}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton><Modal.Title>{editingDesign ? 'Edit' : 'Create'} Design</Modal.Title></Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Row>
                            <Col md={6}><Form.Group className="mb-3"><Form.Label>Name *</Form.Label><Form.Control name="design_name" value={formData.design_name} onChange={handleInputChange} required /></Form.Group></Col>
                            <Col md={6}><Form.Group className="mb-3"><Form.Label>Slug *</Form.Label><Form.Control name="slug" value={formData.slug} onChange={handleInputChange} required /></Form.Group></Col>
                        </Row>
                        <Form.Group className="mb-3"><Form.Label>Description</Form.Label><Form.Control as="textarea" rows={2} name="description" value={formData.description} onChange={handleInputChange} /></Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Design Data (JSON)</Form.Label>
                            <Form.Control as="textarea" rows={8} name="design_data" value={formData.design_data} onChange={handleInputChange} style={{ fontFamily: 'monospace' }} />
                        </Form.Group>
                        <Form.Check type="checkbox" label="Active" name="design_status" checked={formData.design_status} onChange={handleInputChange} className="mb-3" />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                        <Button type="submit" variant="primary">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
};

export default DesignDashboard;
