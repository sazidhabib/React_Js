'use client';

import React, { useState } from "react";
import { Table, Form, Button, Card, Spinner, Pagination, Row, Col, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "@/app/lib/api";

const IMG_URL = `${process.env.NEXT_PUBLIC_API_URL || ''}/uploads`;

const BlogListClient = ({ initialBlogs, user, isAdmin }) => {
    const [blogs, setBlogs] = useState(initialBlogs || []);
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

    if (!isAdmin) return <div className="p-4 text-center"><h4>Access Denied</h4></div>;

    return (
        <div className="container mt-4">
            <h4 className="mb-4">🖋️ Blog Post Dashboard</h4>
            <Card className="mb-4 shadow-sm border-0">
                <Card.Body>
                    <h6 className="fw-bold mb-3">{editingId ? 'Edit Article' : 'Compose New Blog'}</h6>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={8}>
                                <Form.Group className="mb-3"><Form.Label className="fw-bold">Title</Form.Label><Form.Control name="title" value={newBlog.title} onChange={handleChange} required placeholder="Blog headline..." /></Form.Group>
                                <Form.Group className="mb-3"><Form.Label className="fw-bold">Full Content</Form.Label><Form.Control as="textarea" rows={6} name="description" value={newBlog.description} onChange={handleChange} required placeholder="Write your thoughts..." /></Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3"><Form.Label className="fw-bold">Publish Date</Form.Label><DatePicker selected={newBlog.publishDate} onChange={d => setNewBlog(p => ({ ...p, publishDate: d }))} className="form-control" dateFormat="yyyy-MM-dd" placeholderText="Pick a date" /></Form.Group>
                                <Form.Group className="mb-3"><Form.Label className="fw-bold">Cover Image</Form.Label><Form.Control type="file" onChange={handleImageUpload} className="border-0 shadow-sm" /></Form.Group>
                                {imagePreview && <div className="text-center mb-3 p-2 border rounded bg-light"><img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }} /></div>}
                                <Form.Check type="switch" label="Live on Site" id="status-switch" name="status" checked={newBlog.status} onChange={handleChange} className="mb-4 fw-bold" />
                                <div className="d-grid gap-2">
                                    <Button type="submit" variant={editingId ? "warning" : "primary"} className="py-2" disabled={loading}>
                                        {loading && <Spinner size="sm" className="me-2" />}
                                        {editingId ? "Update Blog" : "Publish Blog"}
                                    </Button>
                                    {editingId && <Button variant="outline-secondary" onClick={() => { setEditingId(null); setNewBlog({ title: "", description: "", status: false, image: null, publishDate: null }); setImagePreview(null); }}>Discard Changes</Button>}
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>

            <Card className="shadow-sm border-0">
                <div className="card-body p-0">
                    <Table hover responsive className="mb-0">
                        <thead className="table-dark">
                            <tr><th>#</th><th>Preview</th><th>Title</th><th>Published</th><th>Status</th><th className="text-center">Actions</th></tr>
                        </thead>
                        <tbody>
                            {loading ? <tr><td colSpan="6" className="text-center py-5"><Spinner animation="border" variant="primary" /></td></tr> : currentItems.map((blog, i) => (
                                <tr key={blog.id} className="align-middle">
                                    <td>{(currentPage - 1) * blogsPerPage + i + 1}</td>
                                    <td>{blog.image ? <img src={`${IMG_URL}/${blog.image.replace(/^\/+/, "")}`} alt="" className="rounded" style={{ width: '60px', height: '40px', objectFit: 'cover' }} /> : <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{width: 60, height: 40}}><i className="fas fa-image text-muted"></i></div>}</td>
                                    <td className="fw-bold">{blog.title}</td>
                                    <td><small className="text-muted">{blog.publishDate ? formatDateBN(blog.publishDate) : 'Not set'}</small></td>
                                    <td><Form.Check type="switch" checked={blog.status} onChange={() => handleToggleStatus(blog)} /></td>
                                    <td className="text-center">
                                        <div className="btn-group">
                                            <Button variant="outline-primary" size="sm" onClick={() => { setEditingId(blog.id); setNewBlog({ title: blog.title, description: blog.description, status: blog.status, publishDate: blog.publishDate ? new Date(blog.publishDate) : null, image: null }); setImagePreview(blog.image ? `${IMG_URL}/${blog.image}` : null); }}>Edit</Button>
                                            <Button variant="outline-danger" size="sm" onClick={() => { setSelectedBlogId(blog.id); setShowModal(true); }}>Del</Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Card>

            {totalPages > 1 && (
                <Pagination className="justify-content-center mt-4">
                    <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} />
                    {[...Array(totalPages)].map((_, i) => <Pagination.Item key={i} active={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>{i + 1}</Pagination.Item>)}
                    <Pagination.Next disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} />
                </Pagination>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)} centered size="sm">
                <Modal.Header closeButton><Modal.Title className="h6 mb-0">Security Check</Modal.Title></Modal.Header>
                <Modal.Body className="small">Permanently delete this blog post? This cannot be reversed.</Modal.Body>
                <Modal.Footer className="p-2 pt-0 border-top-0">
                    <Button variant="light" size="sm" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="danger" size="sm" onClick={handleDelete}>Confirm Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BlogListClient;
