'use client';

import React, { useEffect, useState } from "react";
import { Button, Table, Spinner, Image, Modal, Form, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import api from "@/app/lib/api";

const IMG_URL = process.env.NEXT_PUBLIC_API_URL || '';

// --- Sub-components (Inlined) ---

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
            onHide();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{editData ? "Edit" : "Add"} Hero Section</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </Form.Group>
                    {lines.map((line, index) => (
                        <Form.Group key={index} className="mb-3">
                            <Form.Label>Line {index + 1}</Form.Label>
                            <Form.Control as="textarea" rows={2} value={line} onChange={(e) => handleLineChange(index, e.target.value)} required />
                        </Form.Group>
                    ))}
                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                        {(preview) && (
                            <div className="mt-2 text-center">
                                <img src={preview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "200px", objectFit: 'contain' }} />
                            </div>
                        )}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Cancel</Button>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? <Spinner size="sm" /> : "Save"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

const ConfirmationModal = ({ show, onHide, onConfirm, title = "Confirm", body = "Are you sure?" }) => (
    <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton><Modal.Title>{title}</Modal.Title></Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>No</Button>
            <Button variant="danger" onClick={onConfirm}>Yes</Button>
        </Modal.Footer>
    </Modal>
);

// --- Main Component ---

const HeroSectionDashboard = () => {
    const [heroSections, setHeroSections] = useState([]);
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
        } catch (err) {
            console.error("Fetch error:", err);
            toast.error("Failed to fetch hero sections");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHeroSections();
    }, []);

    const handleSubmit = async (heroData) => {
        try {
            const formData = new FormData();
            formData.append("title", heroData.title);
            formData.append("lines[0]", heroData.lines[0]);
            formData.append("lines[1]", heroData.lines[1]);
            formData.append("lines[2]", heroData.lines[2]);
            if (heroData.image) {
                formData.append("image", heroData.image);
            }

            if (editHeroSection) {
                await api.patch(`/hero-section/${editHeroSection.id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                toast.success("Hero section updated successfully");
            } else {
                await api.post('/hero-section', formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                toast.success("Hero section created successfully");
            }
            setModalShow(false);
            fetchHeroSections();
        } catch (err) {
            toast.error(err.response?.data?.error || "Operation failed");
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/hero-section/${sectionToDelete}`);
            toast.success("Hero section deleted successfully");
            setConfirmModalShow(false);
            fetchHeroSections();
        } catch (err) {
            toast.error("Failed to delete hero section");
        }
    };

    const hasHeroSection = heroSections.length > 0;
    const hasSingleHeroSection = heroSections.length === 1;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Hero Section Dashboard</h4>
                <Button onClick={() => { setEditHeroSection(null); setModalShow(true); }} disabled={hasHeroSection}>
                    + Add Hero Section
                </Button>
            </div>

            {loading ? (
                <div className="text-center"><Spinner animation="border" /></div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Lines</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {heroSections.map((section, index) => (
                            <tr key={section.id}>
                                <td>{index + 1}</td>
                                <td>{section.title}</td>
                                <td>
                                    <ol className="mb-0">
                                        {section.lines.map((line, i) => <li key={i}>{line}</li>)}
                                    </ol>
                                </td>
                                <td>
                                    {section.imageUrl && (
                                        <Image
                                            src={`${IMG_URL}/${section.imageUrl.replace(/^\/+/, "")}`}
                                            alt="Hero"
                                            thumbnail
                                            style={{ maxWidth: "100px" }}
                                        />
                                    )}
                                </td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <Button variant="warning" size="sm" onClick={() => { setEditHeroSection(section); setModalShow(true); }}>Edit</Button>
                                        {!hasSingleHeroSection && (
                                            <Button variant="danger" size="sm" onClick={() => { setSectionToDelete(section.id); setConfirmModalShow(true); }}>Delete</Button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <HeroSectionFormModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                onSubmit={handleSubmit}
                editData={editHeroSection}
            />
            <ConfirmationModal
                show={confirmModalShow}
                onHide={() => setConfirmModalShow(false)}
                onConfirm={handleDelete}
                body="Are you sure you want to delete this hero section?"
            />
        </div>
    );
};

export default HeroSectionDashboard;
