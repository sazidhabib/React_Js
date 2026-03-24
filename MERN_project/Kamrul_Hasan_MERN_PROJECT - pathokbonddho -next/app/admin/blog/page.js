'use client';

import React, { useState, useEffect } from "react";
import { Table, Form, Button, Card, Spinner, Pagination, Row, Col, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "@/app/lib/api";
import { useAuth } from "@/app/providers/AuthProvider";

const IMG_URL = `${process.env.NEXT_PUBLIC_API_URL || ''}/uploads`;

const BlogPostDashboard = () => {
    const { user } = useAuth();
    const [blogs, setBlogs] = useState([]);
    const [newBlog, setNewBlog] = useState({ title: "", description: "", status: false, image: null, publishDate: null });
    const [editingId, setEditingId] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedBlogId, setSelectedBlogId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 10;

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const response = await api.get('/blogs');
            const sortedBlogs = (response.data || []).sort((a, b) => new Date(b.publishDate || b.createdAt) - new Date(a.publishDate || a.createdAt));
            setBlogs(sortedBlogs);
        } catch (err) {
            toast.error("Failed to fetch blogs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchBlogs(); }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewBlog(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewBlog(prev => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newBlog.title.trim() || !newBlog.description.trim()) {
            toast.warning("Title and Description are required");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("title", newBlog.title);
            formData.append("description", newBlog.description);
            formData.append("status", newBlog.status);
            formData.append("author", user?.id || 1);
            if (newBlog.publishDate) formData.append("publishDate", newBlog.publishDate.toISOString());
            if (newBlog.image) formData.append("image", newBlog.image);

            if (editingId) {
                await api.patch(`/blogs/${editingId}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
                toast.success("Blog updated");
            } else {
                await api.post('/blogs', formData, { headers: { "Content-Type": "multipart/form-data" } });
                toast.success("Blog added");
            }
            setNewBlog({ title: "", description: "", status: false, image: null, publishDate: null });
            setImagePreview(null);
            setEditingId(null);
            fetchBlogs();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to save blog");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/blogs/${selectedBlogId}`);
            toast.success("Blog deleted");
            fetchBlogs();
        } catch (error) { toast.error("Delete failed"); }
        finally { setShowModal(false); }
    };

    const handleToggleStatus = async (blog) => {
        try {
            await api.patch(`/blogs/${blog.id}`, { status: !blog.status });
            setBlogs(prev => prev.map(b => b.id === blog.id ? { ...b, status: !blog.status } : b));
            toast.success("Status updated");
        } catch (err) { toast.error("Update failed"); }
    };

    const formatDateBN = (d) => new Date(d).toLocaleDateString("bn-BD", { day: "numeric", month: "long", year: "numeric" });

    const indexOfLast = currentPage * blogsPerPage;
    const currentItems = blogs.slice(indexOfLast - blogsPerPage, indexOfLast);
    const totalPages = Math.ceil(blogs.length / blogsPerPage);

    return (
        <div className="container mt-4">
            <h4 className="mb-4">Blog Post Dashboard</h4>
            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={8}>
                                <Form.Group className="mb-3"><Form.Label>Title</Form.Label><Form.Control name="title" value={newBlog.title} onChange={handleChange} required /></Form.Group>
                                <Form.Group className="mb-3"><Form.Label>Description</Form.Label><Form.Control as="textarea" rows={4} name="description" value={newBlog.description} onChange={handleChange} required /></Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3"><Form.Label>Publish Date</Form.Label><DatePicker selected={newBlog.publishDate} onChange={d => setNewBlog(p => ({ ...p, publishDate: d }))} className="form-control" dateFormat="yyyy-MM-dd" /></Form.Group>
                                <Form.Group className="mb-3"><Form.Label>Image</Form.Label><Form.Control type="file" onChange={handleImageUpload} /></Form.Group>
                                {imagePreview && <img src={imagePreview} alt="Preview" className="img-thumbnail mb-3" style={{ maxWidth: '100px' }} />}
                                <Form.Check type="checkbox" label="Visible on Homepage" name="status" checked={newBlog.status} onChange={handleChange} className="mb-3" />
                                <div className="d-flex gap-2">
                                    <Button type="submit" variant={editingId ? "warning" : "primary"}>{editingId ? "Update" : "Add"} Blog</Button>
                                    {editingId && <Button variant="secondary" onClick={() => { setEditingId(null); setNewBlog({ title: "", description: "", status: false, image: null, publishDate: null }); setImagePreview(null); }}>Cancel</Button>}
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>

            <Card className="shadow-sm">
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead className="table-dark">
                            <tr><th>#</th><th>Image</th><th>Title</th><th>Date</th><th>Status</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                            {loading ? <tr><td colSpan="6" className="text-center py-5"><Spinner animation="border" /></td></tr> : currentItems.map((blog, i) => (
                                <tr key={blog.id}>
                                    <td>{(currentPage - 1) * blogsPerPage + i + 1}</td>
                                    <td>{blog.image ? <img src={`${IMG_URL}/${blog.image.replace(/^\/+/, "")}`} alt="" style={{ width: '60px', height: '40px', objectFit: 'cover' }} /> : 'No Image'}</td>
                                    <td>{blog.title}</td>
                                    <td>{blog.publishDate ? formatDateBN(blog.publishDate) : 'N/A'}</td>
                                    <td><Form.Check type="switch" checked={blog.status} onChange={() => handleToggleStatus(blog)} /></td>
                                    <td>
                                        <div className="d-flex gap-1">
                                            <Button variant="info" size="sm" onClick={() => { setEditingId(blog.id); setNewBlog({ title: blog.title, description: blog.description, status: blog.status, publishDate: blog.publishDate ? new Date(blog.publishDate) : null, image: null }); setImagePreview(blog.image ? `${IMG_URL}/${blog.image}` : null); }}>Edit</Button>
                                            <Button variant="danger" size="sm" onClick={() => { setSelectedBlogId(blog.id); setShowModal(true); }}>Delete</Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
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

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton><Modal.Title>Delete Blog</Modal.Title></Modal.Header>
                <Modal.Body>Are you sure you want to delete this blog post?</Modal.Body>
                <Modal.Footer><Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button><Button variant="danger" onClick={handleDelete}>Delete</Button></Modal.Footer>
            </Modal>
        </div>
    );
};

export default BlogPostDashboard;
