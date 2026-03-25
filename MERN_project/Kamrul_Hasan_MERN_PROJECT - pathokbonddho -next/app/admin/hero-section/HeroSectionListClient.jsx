'use client';

import React, { useEffect, useState } from "react";
import { Button, Table, Spinner, Image, Modal, Form, Row, Col, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import api from "@/app/lib/api";

const IMG_URL = process.env.NEXT_PUBLIC_API_URL || '';

const HeroSectionFormModal = ({ show, onHide, onSubmit, editData }) => {
    const [title, setTitle] = useState("");
    const [lines, setLines] = useState(["", "", ""]);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editData) {
            setTitle(editData.title || "");
            setLines(editData.lines || ["", "", ""]);
            setPreview(editData.imageUrl ? `${IMG_URL}/${editData.imageUrl.replace(/^\/+/, "")}` : "");
            setImage(null);
        } else {
            setTitle("");
            setLines(["", "", ""]);
            setImage(null);
            setPreview("");
        }
    }, [editData, show]);

    const handleLineChange = (index, value) => {
        const newLines = [...lines];
        newLines[index] = value;
        setLines(newLines);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit({ title, lines, image: image || undefined });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title className="fw-bold">{editData ? "Update" : "Create"} Hero Section</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body className="bg-light">
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Hero Title</Form.Label>
                        <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Main headline" />
                    </Form.Group>
                    <Row>
                        {lines.map((line, index) => (
                            <Col md={12} key={index}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold small text-muted">Sub-line {index + 1}</Form.Label>
                                    <Form.Control as="textarea" rows={2} value={line} onChange={(e) => handleLineChange(index, e.target.value)} required placeholder={`Description line ${index + 1}...`} />
                                </Form.Group>
                            </Col>
                        ))}
                    </Row>
                    <Form.Group className="mb-0">
                        <Form.Label className="fw-bold">Hero Background Image</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={handleImageChange} className="border-0 shadow-sm" />
                        {preview && (
                            <div className="mt-3 text-center border rounded p-2 bg-white">
                                <img src={preview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "250px", objectFit: 'contain' }} />
                                <div className="small text-muted mt-1">Image Preview</div>
                            </div>
                        )}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className="border-top-0 pt-0">
                    <Button variant="outline-secondary" onClick={onHide}>Cancel</Button>
                    <Button variant="primary" type="submit" disabled={loading} className="px-5">
                        {loading ? <Spinner size="sm" className="me-2" /> : <i className="fas fa-save me-2"></i>}
                        Save Hero Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

const HeroSectionListClient = ({ initialHeroSections, isAdmin }) => {
    const [heroSections, setHeroSections] = useState(initialHeroSections || []);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [editHeroSection, setEditHeroSection] = useState(null);
    const [confirmModalShow, setConfirmModalShow] = useState(false);
    const [sectionToDelete, setSectionToDelete] = useState(null);

    const fetchHeroSections = async () => {
        setLoading(true);
        try {
            const res = await api.get('/hero-section');
            const data = res.data.data || res.data;
            setHeroSections(Array.isArray(data) ? data : (data ? [data] : []));
        } catch (err) { toast.error("Failed to refresh"); }
        finally { setLoading(false); }
    };

    const handleSubmit = async (heroData) => {
        try {
            const formData = new FormData();
            formData.append("title", heroData.title);
            formData.append("lines[0]", heroData.lines[0]);
            formData.append("lines[1]", heroData.lines[1]);
            formData.append("lines[2]", heroData.lines[2]);
            if (heroData.image) formData.append("image", heroData.image);

            if (editHeroSection) {
                await api.patch(`/hero-section/${editHeroSection.id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
                toast.success("Hero updated");
            } else {
                await api.post('/hero-section', formData, { headers: { "Content-Type": "multipart/form-data" } });
                toast.success("Hero created");
            }
            setModalShow(false);
            fetchHeroSections();
        } catch (err) { toast.error("Operation failed"); }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/hero-section/${sectionToDelete}`);
            toast.success("Hero deleted");
            setConfirmModalShow(false);
            fetchHeroSections();
        } catch (err) { toast.error("Delete failed"); }
    };

    if (!isAdmin) return <div className="p-4 text-center"><h4>Access Denied</h4></div>;

    const hasHero = heroSections.length > 0;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">🎬 Hero Section Management</h4>
                <Button variant="primary" onClick={() => { setEditHeroSection(null); setModalShow(true); }} disabled={hasHero} className="shadow-sm">
                    <i className="fas fa-plus me-2"></i>Add Hero Section
                </Button>
            </div>

            <Card className="shadow-sm border-0 overflow-hidden">
                <div className="table-responsive">
                    <Table hover className="mb-0">
                        <thead className="table-dark">
                            <tr>
                                <th style={{width: 50}}>#</th>
                                <th>Headline</th>
                                <th>Content Breakdown</th>
                                <th>Visual</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? <tr><td colSpan="5" className="text-center py-5"><Spinner animation="border" variant="primary" /></td></tr> : heroSections.map((section, index) => (
                                <tr key={section.id} className="align-middle">
                                    <td>{index + 1}</td>
                                    <td className="fw-bold">{section.title}</td>
                                    <td>
                                        <ul className="list-unstyled mb-0 small text-muted">
                                            {section.lines.map((line, i) => <li key={i} className="text-truncate" style={{maxWidth: '300px'}}>{i+1}. {line}</li>)}
                                        </ul>
                                    </td>
                                    <td>
                                        {section.imageUrl ? (
                                            <Image src={`${IMG_URL}/${section.imageUrl.replace(/^\/+/, "")}`} alt="Hero" className="rounded shadow-sm" style={{ width: "80px", height: "50px", objectFit: 'cover' }} />
                                        ) : <Badge bg="light" text="dark" className="border">No Image</Badge>}
                                    </td>
                                    <td className="text-center">
                                        <div className="btn-group">
                                            <Button variant="outline-primary" size="sm" onClick={() => { setEditHeroSection(section); setModalShow(true); }}>Edit</Button>
                                            <Button variant="outline-danger" size="sm" onClick={() => { setSectionToDelete(section.id); setConfirmModalShow(true); }}>Del</Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!loading && heroSections.length === 0 && (
                                <tr><td colSpan="5" className="text-center py-5 text-muted">No hero section configured. Click "Add Hero Section" to begin.</td></tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </Card>

            <HeroSectionFormModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                onSubmit={handleSubmit}
                editData={editHeroSection}
            />

            <Modal show={confirmModalShow} onHide={() => setConfirmModalShow(false)} centered size="sm">
                <Modal.Header closeButton><Modal.Title className="h6 mb-0">Confirm Delete</Modal.Title></Modal.Header>
                <Modal.Body className="small text-center py-3">Are you sure you want to remove this hero section? This will affect the homepage immediately.</Modal.Body>
                <Modal.Footer className="p-2 border-top-0 d-flex justify-content-center">
                    <Button variant="light" size="sm" onClick={() => setConfirmModalShow(false)}>Keep It</Button>
                    <Button variant="danger" size="sm" onClick={handleDelete} className="px-3">Yes, Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default HeroSectionListClient;
