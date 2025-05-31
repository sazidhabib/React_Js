import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import ConfirmationModal from "./ConfirmationModal";
import DatePicker from "react-datepicker";
import moment from "moment";
import 'moment/locale/bn';
import "react-datepicker/dist/react-datepicker.css";



const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/blogs`;
const IMG_URL = `${import.meta.env.VITE_API_BASE_URL}/uploads/`;

const BlogPostDashboard = () => {
    const [blogs, setBlogs] = useState([]);
    const [newBlog, setNewBlog] = useState({
        title: "",
        description: "",
        status: false,
        image: null,
        publishDate: null,
    });
    const [editingId, setEditingId] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [selectedBlogId, setSelectedBlogId] = useState(null);

    const formatDateBangla = (dateString) => {
        const dateObj = new Date(dateString);
        return dateObj.toLocaleDateString("bn-BD", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };


    // Fetch all blogs on component mount
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const response = await axios.get(API_URL);
                // Sort blogs by publishDate descending
                const sortedBlogs = response.data.sort((a, b) =>
                    new Date(b.publishDate || b.createdAt) - new Date(a.publishDate || a.createdAt)
                );
                setBlogs(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewBlog({
            ...newBlog,
            [name]: type === "checkbox" ? checked : value,
        });
    };


    const confirmDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`${API_URL}/${selectedBlogId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setBlogs(blogs.filter(blog => blog._id !== selectedBlogId));
            toast.success("Blog deleted successfully!");
        } catch (error) {
            toast.error(`Failed to delete: ${error.message}`);
        } finally {
            setLoading(false);
            setShowModal(false);
            setSelectedBlogId(null);
        }
    };


    // Handle Image Upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewBlog({ ...newBlog, image: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleDateChange = (date) => {
        setNewBlog({ ...newBlog, publishDate: date });
    };

    // Add or Edit Blog Post
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newBlog.title.trim() === "" || newBlog.description.trim() === "") {
            alert("Title and Description are required!");
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("title", newBlog.title);
            formData.append("description", newBlog.description);
            formData.append("status", newBlog.status);
            if (newBlog.publishDate) {
                formData.append("publishDate", newBlog.publishDate.toISOString());
            }
            if (newBlog.image) {
                formData.append("image", newBlog.image);
            }

            let response;
            // Submit
            if (editingId) {
                response = await axios.patch(`${API_URL}/${editingId}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setBlogs(
                    blogs
                        .map(blog => blog._id === editingId ? response.data.blog : blog)
                        .sort((a, b) => new Date(b.publishDate || b.createdAt) - new Date(a.publishDate || a.createdAt))
                );
            } else {
                response = await axios.post(API_URL, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setBlogs(
                    [response.data.blog, ...blogs].sort(
                        (a, b) => new Date(b.publishDate || b.createdAt) - new Date(a.publishDate || a.createdAt)
                    )
                );
            }


            setNewBlog({ title: "", description: "", status: false, image: null, publishDate: null });
            setImagePreview(null);
            toast.success(editingId ? "Blog updated!" : "Blog added!");
            setEditingId(null);
        } catch (error) {
            toast.error(error.response?.data?.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    // Edit Blog Post
    const handleEdit = (blog) => {
        setNewBlog({
            title: blog.title,
            description: blog.description,
            status: blog.status,
            image: null,
            publishDate: blog.publishDate ? new Date(blog.publishDate) : null, // Reset image to null when editing
        });
        setEditingId(blog._id);
        setImagePreview(blog.image ? `${IMG_URL}${blog.image.startsWith("/") ? "" : "/"}${blog.image}` : null);
    };




    // Toggle Status

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            setLoading(true);
            await axios.patch(
                `${API_URL}/${id}`,
                { status: !currentStatus },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            setBlogs(
                blogs
                    .map(blog => blog._id === id ? { ...blog, status: !currentStatus } : blog)
                    .sort((a, b) => new Date(b.publishDate || b.createdAt) - new Date(a.publishDate || a.createdAt))
            );
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };


    if (loading) return <div className="text-center my-5">Loading...</div>;
    if (error) return <div className="alert alert-danger">Error: {error}</div>;

    return (
        <div className="container custom-font-initial mt-4">
            <h2 className="mb-3">📝 Blog Post Dashboard</h2>

            {/* Blog Input Form */}
            <Form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-light">
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={newBlog.title}
                        onChange={handleChange}
                        placeholder="Enter blog title"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={newBlog.description}
                        onChange={handleChange}
                        placeholder="Enter blog description"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Publish Date</Form.Label>
                    <DatePicker
                        selected={newBlog.publishDate}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        isClearable
                        placeholderText="Select publish date"
                        className="form-control"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                </Form.Group>

                {/* Image Preview */}
                {imagePreview && (
                    <div className="mb-3">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="img-thumbnail"
                            style={{ width: "150px", height: "100px" }}
                        />
                    </div>
                )}

                <Form.Group className="mb-3">
                    <Form.Check
                        type="checkbox"
                        label="Show on Homepage"
                        name="status"
                        checked={newBlog.status}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant={editingId !== null ? "warning" : "primary"} type="submit">
                    {editingId !== null ? "Update Blog" : "Add Blog"}
                </Button>

                {/* Add a Cancel button to reset */}
                {editingId !== null && <Button variant="secondary" className="mx-2" onClick={() => {
                    setNewBlog({ title: "", description: "", status: false, image: null });
                    setEditingId(null);
                    setImagePreview(null);
                }}>
                    Cancel
                </Button>}

            </Form>

            {/* Blogs Table */}
            <Table striped bordered hover>
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Publish Date</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog, index) => (
                        <tr key={blog._id}>
                            <td>{index + 1}</td>
                            <td>
                                {blog.image ? (
                                    <img
                                        src={`${IMG_URL}${blog.image.replace(/^\/+/, "")}`}
                                        alt="Blog"
                                        className="img-thumbnail"
                                        style={{ width: "80px", height: "50px" }}
                                    />
                                ) : (
                                    "No Image"
                                )}
                            </td>
                            <td>{blog.title}</td>
                            <td>{formatDateBangla(blog.publishDate)}</td>
                            <td>{blog.description.length > 200 ? `${blog.description.slice(0, 200)}...` : blog.description}</td>
                            <td>
                                <Form.Check
                                    type="switch"
                                    checked={blog.status}
                                    onChange={() => handleToggleStatus(blog._id, blog.status)}
                                    label={blog.status ? "Visible" : "Hidden"}
                                />
                            </td>
                            <td>
                                <Button
                                    variant="info"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleEdit(blog)}
                                >
                                    ✏️ Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => {
                                        setSelectedBlogId(blog._id);
                                        setShowModal(true);
                                    }}
                                >
                                    🗑️ Delete
                                </Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <ConfirmationModal
                show={showModal}
                onHide={() => setShowModal(false)}
                onConfirm={confirmDelete}
                title="Delete Blog"
                body="Are you sure you want to delete this blog post?"
            />
        </div>
    );
};

export default BlogPostDashboard;