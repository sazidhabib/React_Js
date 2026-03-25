'use client';

import React, { useState, useRef } from "react";
import { Table, Form, Button, Modal, Row, Col } from "react-bootstrap";
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

const ArticlesListClient = ({ initialArticles, isAdmin }) => {
    const [articles, setArticles] = useState(initialArticles || []);
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

    if (!isAdmin) return <div className="p-4 text-center"><h4>Access Denied</h4></div>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">📝 Article Dashboard</h2>

            <Form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-white shadow-sm transition-all">
                <Row>
                    <Col md={8}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Title</Form.Label>
                            <Form.Control type="text" name="title" value={newArticle.title} onChange={handleChange} required placeholder="Enter article title" />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Article Date</Form.Label>
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
                    <Form.Label className="fw-bold">Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" value={newArticle.description} onChange={handleChange} required placeholder="Enter description" />
                </Form.Group>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Upload Image</Form.Label>
                            <Form.Control type="file" name="image" accept="image/*" onChange={handleChange} ref={fileInputRef} />
                        </Form.Group>
                        {imagePreview && (
                            <div className="mb-3 text-start">
                                <img src={imagePreview} alt="Preview" className="img-thumbnail" style={{ width: "120px", height: "80px", objectFit: 'cover' }} />
                            </div>
                        )}
                    </Col>
                    <Col md={6} className="d-flex align-items-center">
                        <Form.Group className="mb-3">
                            <Form.Check type="switch" label="Show on Homepage" name="status" checked={newArticle.status} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>

                <div className="d-flex gap-2 justify-content-end mt-2">
                    {editingId && (
                        <Button variant="outline-secondary" onClick={() => {
                            setNewArticle({ title: "", description: "", status: false, image: null, publishDate: new Date() });
                            setEditingId(null);
                            setImagePreview(null);
                        }}>Cancel</Button>
                    )}
                    <Button variant={editingId ? "warning" : "primary"} type="submit" className="px-4">
                        {editingId ? "Update Article" : "Add Article"}
                    </Button>
                </div>
            </Form>

            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <Table hover responsive className="mb-0">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentArticles.map((article, index) => (
                                <tr key={article.id} className="align-middle">
                                    <td>{indexOfFirstArticle + index + 1}</td>
                                    <td>{formatDateBangla(article.publishDate)}</td>
                                    <td>
                                        {article.image ? (
                                            <img src={`${IMG_URL}/${article.image}`} alt="" width="50" height="50" className="rounded" style={{ objectFit: "cover" }} />
                                        ) : (
                                            <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{width: 50, height: 50}}><i className="fas fa-image text-muted"></i></div>
                                        )}
                                    </td>
                                    <td className="fw-bold">{article.title}</td>
                                    <td>
                                        <Form.Check type="switch" checked={article.status} onChange={() => handleToggleStatus(article.id, article.status)} label={article.status ? "Visible" : "Hidden"} />
                                    </td>
                                    <td className="text-center">
                                        <div className="btn-group">
                                            <Button variant="outline-primary" size="sm" onClick={() => handleEdit(article)}>Edit</Button>
                                            <Button variant="outline-danger" size="sm" onClick={() => { setDeleteId(article.id); setShowConfirm(true); }}>Del</Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>

            {totalPages > 1 && (
                <div className="d-flex justify-content-center gap-1 my-4">
                    <Button variant="outline-secondary" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}><i className="fas fa-chevron-left"></i></Button>
                    {[...Array(totalPages)].map((_, i) => (
                        <Button key={i} variant={currentPage === i + 1 ? "primary" : "outline-secondary"} size="sm" onClick={() => setCurrentPage(i + 1)}>{i + 1}</Button>
                    ))}
                    <Button variant="outline-secondary" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}><i className="fas fa-chevron-right"></i></Button>
                </div>
            )}

            <ConfirmationModal
                show={showConfirm}
                onHide={() => setShowConfirm(false)}
                onConfirm={confirmDelete}
                title="Delete Article"
                body="Are you sure you want to delete this article? This action cannot be undone."
            />
        </div>
    );
};

export default ArticlesListClient;
