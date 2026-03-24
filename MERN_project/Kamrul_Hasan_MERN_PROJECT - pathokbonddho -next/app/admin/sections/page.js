'use client';

import React, { useEffect, useState } from "react";
import { Button, Table, Spinner, Image, Modal, Form, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import api from "@/app/lib/api";

const IMG_URL = `${process.env.NEXT_PUBLIC_API_URL || ''}/uploads`;

const sectionTypes = [
    { type: "about", name: "About" },
    { type: "jetukuboliniage", name: "Jetukuboliniage" },
    { type: "bookreading", name: "Book Reading" },
    { type: "music", name: "Music" }
];

// --- Sub-components (Inlined) ---

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
                <Modal.Title>
                    {section?._id ? "Edit" : "Create"} {sectionTypes.find(st => st.type === type)?.name || "Section"}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Section Type</Form.Label>
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
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={5} value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </Form.Group>
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

// --- Main Component ---

const SectionDashboard = () => {
    const [sections, setSections] = useState([]);
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

    useEffect(() => {
        fetchSections();
    }, []);

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
            toast.error(error.response?.data?.error || 'Failed to save section');
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Sections Dashboard</h4>
            </div>

            {loading ? (
                <div className="text-center"><Spinner animation="border" /></div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Type</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sectionTypes.map((sectionType, index) => {
                            const section = sections.find(s => s.type === sectionType.type);
                            return (
                                <tr key={sectionType.type}>
                                    <td>{index + 1}</td>
                                    <td>{sectionType.name}</td>
                                    <td>{section?.title || "Not created yet"}</td>
                                    <td>
                                        {section?.description
                                            ? `${section.description.substring(0, 50)}${section.description.length > 50 ? '...' : ''}`
                                            : "Not available"}
                                    </td>
                                    <td>
                                        {section?.imageUrl ? (
                                            <Image
                                                src={`${IMG_URL}/${section.imageUrl.replace(/^\/+/, "")}`}
                                                alt={section.title}
                                                thumbnail
                                                style={{ maxWidth: "100px" }}
                                            />
                                        ) : (
                                            "No image"
                                        )}
                                    </td>
                                    <td>
                                        <Button
                                            variant={section ? "warning" : "primary"}
                                            size="sm"
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
            )}

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

export default SectionDashboard;
