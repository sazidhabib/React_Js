'use client';

import React, { useState, useEffect } from "react";
import { Button, Table, Spinner, Image, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import api from "@/app/lib/api";

const IMG_URL = `${process.env.NEXT_PUBLIC_API_URL || ''}/uploads`;

const sectionTypes = [
    { type: "about", name: "About" },
    { type: "jetukuboliniage", name: "Jetukuboliniage" },
    { type: "bookreading", name: "Book Reading" },
    { type: "music", name: "Music" }
];

const SectionFormModal = ({ show, onHide, onSubmit, section, sectionTypes }) => {
    const [type, setType] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (section) {
            setType(section.type || "");
            setTitle(section.title || "");
            setDescription(section.description || "");
            setPreview(section.imageUrl ? `${IMG_URL}/${section.imageUrl.replace(/^\/+/, '')}` : '');
            setImage(null);
        } else {
            setType("");
            setTitle("");
            setDescription("");
            setImage(null);
            setPreview("");
        }
    }, [section, show]);

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
            await onSubmit({
                type,
                title,
                description,
                image: image || (section?.imageUrl ? section.imageUrl : null)
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title className="fw-bold">
                    {section?._id ? "Edit" : "Create"} {sectionTypes.find(st => st.type === type)?.name || "Section"}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Section Type</Form.Label>
                        <Form.Control
                            as="select"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            disabled={!!section?._id}
                            required
                        >
                            <option value="">Select section type</option>
                            {sectionTypes.map((st) => (
                                <option key={st.type} value={st.type}>{st.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Title</Form.Label>
                        <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Section Title" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Description</Form.Label>
                        <Form.Control as="textarea" rows={6} value={description} onChange={(e) => setDescription(e.target.value)} required placeholder="Enter detailed description..." />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Image</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                        {(preview) && (
                            <div className="mt-3 text-center border rounded p-2 bg-light">
                                <img src={preview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "250px", objectFit: 'contain' }} />
                            </div>
                        )}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={onHide}>Cancel</Button>
                    <Button variant="primary" type="submit" disabled={loading} className="px-4">
                        {loading ? <Spinner size="sm" className="me-2" /> : <i className="fas fa-save me-2"></i>}
                        Save Section
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

const SectionsListClient = ({ initialSections, isAdmin }) => {
    const [sections, setSections] = useState(initialSections || []);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [currentSection, setCurrentSection] = useState(null);

    const fetchSections = async () => {
        setLoading(true);
        try {
            const res = await api.get('/sections');
            setSections(res.data);
        } catch (err) {
            console.error("Fetch error:", err);
            toast.error("Failed to fetch sections");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (sectionData) => {
        try {
            const formData = new FormData();
            formData.append('type', sectionData.type);
            formData.append('title', sectionData.title);
            formData.append('description', sectionData.description);
            if (sectionData.image && typeof sectionData.image !== 'string') {
                formData.append('image', sectionData.image);
            }

            if (currentSection?._id) {
                await api.patch(`/sections/${currentSection._id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success("Section updated successfully");
            } else {
                await api.post('/sections', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success("Section created successfully");
            }
            setModalShow(false);
            fetchSections();
        } catch (error) {
            console.error('Submission error:', error);
            toast.error(error.response?.data?.error || error.response?.data?.message || 'Failed to save section');
        }
    };

    if (!isAdmin) return <div className="p-4 text-center"><h4>Access Denied</h4></div>;

    return (
        <div className="container mt-4">
            <h4 className="mb-4">🧩 Sections Dashboard</h4>

            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <Table hover responsive className="mb-0">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Type</th>
                                <th>Title</th>
                                <th>Description Snippet</th>
                                <th>Image</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sectionTypes.map((sectionType, index) => {
                                const section = sections.find(s => s.type === sectionType.type);
                                return (
                                    <tr key={sectionType.type} className="align-middle">
                                        <td>{index + 1}</td>
                                        <td><Badge bg="info" className="text-capitalize">{sectionType.name}</Badge></td>
                                        <td className="fw-bold">{section?.title || <span className="text-muted italic">Not created yet</span>}</td>
                                        <td>
                                            <div className="text-truncate text-muted" style={{maxWidth: '250px'}}>
                                                {section?.description || "No description available"}
                                            </div>
                                        </td>
                                        <td>
                                            {section?.imageUrl ? (
                                                <Image
                                                    src={`${IMG_URL}/${section.imageUrl.replace(/^\/+/, "")}`}
                                                    alt=""
                                                    className="rounded shadow-sm"
                                                    style={{ width: "60px", height: "40px", objectFit: 'cover' }}
                                                />
                                            ) : (
                                                <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{width: 60, height: 40}}><i className="fas fa-image text-muted"></i></div>
                                            )}
                                        </td>
                                        <td className="text-center">
                                            <Button
                                                variant={section ? "outline-warning" : "outline-primary"}
                                                size="sm"
                                                className="px-3"
                                                onClick={() => {
                                                    setCurrentSection(section || { type: sectionType.type });
                                                    setModalShow(true);
                                                }}
                                            >
                                                {section ? "Edit" : "Create"}
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>

            <SectionFormModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                onSubmit={handleSubmit}
                section={currentSection}
                sectionTypes={sectionTypes}
            />
        </div>
    );
};

export default SectionsListClient;
