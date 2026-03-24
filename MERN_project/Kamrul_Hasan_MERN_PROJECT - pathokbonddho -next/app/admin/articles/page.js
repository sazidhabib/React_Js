'use client';

import React, { useState, useEffect, useRef } from "react";
import { Table, Form, Button, Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import DatePicker, { registerLocale } from "react-datepicker";
import { bn } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import api from "@/app/lib/api";

registerLocale('bn', bn);

const IMG_URL = `${process.env.NEXT_PUBLIC_API_URL || ''}/uploads`;

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

const ArticleDashboard = () => {
    const [articles, setArticles] = useState([]);
    const [newArticle, setNewArticle] = useState({
        title: "",
        description: "",
        status: false,
        image: null,
        publishDate: new Date(),
    });
    const [editingId, setEditingId] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const fileInputRef = useRef(null);

    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 10;

    const fetchArticles = async () => {
        setLoading(true);
        try {
            const response = await api.get('/articles', { params: { sort: '-publishDate' } });
            setArticles(response.data);
        } catch (error) {
            console.error("Error fetching articles:", error);
            toast.error("Failed to fetch articles");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
    const totalPages = Math.ceil(articles.length / articlesPerPage);

    const formatDateBangla = (dateString) => {
        if (!dateString) return "";
        const dateObj = new Date(dateString);
        return dateObj.toLocaleDateString("bn-BD", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "file") {
            const file = files[0];
            if (file) {
                setNewArticle(prev => ({ ...prev, image: file }));
                if (imagePreview?.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
                setImagePreview(URL.createObjectURL(file));
            }
        } else {
            setNewArticle(prev => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newArticle.title.trim() || !newArticle.description.trim()) {
            toast.error("Title and Description are required!");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("title", newArticle.title);
            formData.append("publishDate", moment(newArticle.publishDate).format("YYYY-MM-DD"));
            formData.append("description", newArticle.description);
            formData.append("status", newArticle.status);
            if (newArticle.image) {
                formData.append("image", newArticle.image);
            }

            if (editingId) {
                await api.patch(`/articles/${editingId}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                toast.success("Article updated successfully");
            } else {
                await api.post('/articles', formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                toast.success("Article added successfully");
            }

            setNewArticle({ title: "", description: "", status: false, image: null, publishDate: new Date() });
            setImagePreview(null);
            setEditingId(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            fetchArticles();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to save article");
        }
    };

    const handleEdit = (article) => {
        setNewArticle({
            title: article.title,
            description: article.description,
            status: article.status,
            image: null,
            publishDate: article.publishDate ? new Date(article.publishDate) : new Date(),
        });
        setImagePreview(article.image ? `${IMG_URL}/${article.image}` : null);
        setEditingId(article.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const confirmDelete = async () => {
        try {
            await api.delete(`/articles/${deleteId}`);
            toast.success("Article deleted successfully");
            fetchArticles();
        } catch (error) {
            toast.error("Failed to delete article");
        } finally {
            setShowConfirm(false);
            setDeleteId(null);
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            await api.patch(`/articles/${id}`, { status: !currentStatus });
            fetchArticles();
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">📝 Article Dashboard</h2>

            <Form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-light">
                <Row>
                    <Col md={8}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" value={newArticle.title} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Article Date</Form.Label>
                            <DatePicker
                                selected={newArticle.publishDate}
                                onChange={(date) => setNewArticle({ ...newArticle, publishDate: date })}
                                dateFormat="yyyy-MM-dd"
                                className="form-control"
                                locale="bn"
                                isClearable
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" value={newArticle.description} onChange={handleChange} required />
                </Form.Group>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Upload Image</Form.Label>
                            <Form.Control type="file" name="image" accept="image/*" onChange={handleChange} ref={fileInputRef} />
                        </Form.Group>
                        {imagePreview && (
                            <div className="mb-3 text-center">
                                <img src={imagePreview} alt="Preview" className="img-thumbnail" style={{ width: "150px", height: "100px", objectFit: 'cover' }} />
                            </div>
                        )}
                    </Col>
                    <Col md={6} className="d-flex align-items-center">
                        <Form.Group className="mb-3">
                            <Form.Check type="checkbox" label="Show on Homepage" name="status" checked={newArticle.status} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>

                <div className="d-flex gap-2">
                    <Button variant={editingId ? "warning" : "primary"} type="submit">
                        {editingId ? "Update Article" : "Add Article"}
                    </Button>
                    {editingId && (
                        <Button variant="secondary" onClick={() => {
                            setNewArticle({ title: "", description: "", status: false, image: null, publishDate: new Date() });
                            setEditingId(null);
                            setImagePreview(null);
                        }}>Cancel</Button>
                    )}
                </div>
            </Form>

            {loading ? (
                <div className="text-center"><Spinner animation="border" /></div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentArticles.map((article, index) => (
                            <tr key={article.id}>
                                <td>{indexOfFirstArticle + index + 1}</td>
                                <td>{formatDateBangla(article.publishDate)}</td>
                                <td>
                                    {article.image && (
                                        <img src={`${IMG_URL}/${article.image}`} alt="Article" width="60" height="60" style={{ objectFit: "cover", borderRadius: "5px" }} />
                                    )}
                                </td>
                                <td>{article.title}</td>
                                <td>
                                    <Form.Check type="switch" checked={article.status} onChange={() => handleToggleStatus(article.id, article.status)} label={article.status ? "Visible" : "Hidden"} />
                                </td>
                                <td>
                                    <div className="d-flex gap-1">
                                        <Button variant="info" size="sm" onClick={() => handleEdit(article)}>Edit</Button>
                                        <Button variant="danger" size="sm" onClick={() => { setDeleteId(article.id); setShowConfirm(true); }}>Delete</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {totalPages > 1 && (
                <div className="d-flex justify-content-center gap-1 my-3">
                    <Button variant="outline-primary" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</Button>
                    {[...Array(totalPages)].map((_, i) => (
                        <Button key={i} variant={currentPage === i + 1 ? "primary" : "outline-primary"} size="sm" onClick={() => setCurrentPage(i + 1)}>{i + 1}</Button>
                    ))}
                    <Button variant="outline-primary" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
                </div>
            )}

            <ConfirmationModal
                show={showConfirm}
                onHide={() => setShowConfirm(false)}
                onConfirm={confirmDelete}
                title="Delete Article"
                body="Are you sure you want to delete this article?"
            />
        </div>
    );
};

export default ArticleDashboard;
