import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const BlogPostDashboard = () => {
    const [blogs, setBlogs] = useState([
        {
            id: 1,
            title: "First Blog",
            description: "This is the first blog post",
            status: true,
            image: null,
        },
        {
            id: 2,
            title: "Second Blog",
            description: "Another blog post example",
            status: false,
            image: null,
        },
    ]);

    const [newBlog, setNewBlog] = useState({
        title: "",
        description: "",
        status: false,
        image: null,
    });

    const [editingId, setEditingId] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewBlog({
            ...newBlog,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Handle Image Upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewBlog({ ...newBlog, image: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Add or Edit Blog Post
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newBlog.title.trim() === "" || newBlog.description.trim() === "") {
            alert("Title and Description are required!");
            return;
        }

        if (editingId !== null) {
            // Edit existing blog
            setBlogs(
                blogs.map((blog) =>
                    blog.id === editingId
                        ? { ...newBlog, id: editingId }
                        : blog
                )
            );
            setEditingId(null);
        } else {
            // Add new blog
            setBlogs([...blogs, { ...newBlog, id: blogs.length + 1 }]);
        }

        setNewBlog({ title: "", description: "", status: false, image: null });
        setImagePreview(null);
    };

    // Edit Blog Post
    const handleEdit = (blog) => {
        setNewBlog(blog);
        setEditingId(blog.id);
        setImagePreview(blog.image ? URL.createObjectURL(blog.image) : null);
    };

    // Delete Blog Post
    const handleDelete = (id) => {
        setBlogs(blogs.filter((blog) => blog.id !== id));
    };

    // Toggle Status
    const handleToggleStatus = (id) => {
        setBlogs(
            blogs.map((blog) =>
                blog.id === id ? { ...blog, status: !blog.status } : blog
            )
        );
    };

    return (
        <div className="container mt-4">
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
            </Form>

            {/* Blogs Table */}
            <Table striped bordered hover>
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog, index) => (
                        <tr key={blog.id}>
                            <td>{index + 1}</td>
                            <td>
                                {blog.image ? (
                                    <img
                                        src={URL.createObjectURL(blog.image)}
                                        alt="Blog"
                                        className="img-thumbnail"
                                        style={{ width: "80px", height: "50px" }}
                                    />
                                ) : (
                                    "No Image"
                                )}
                            </td>
                            <td>{blog.title}</td>
                            <td>{blog.description}</td>
                            <td>
                                <Form.Check
                                    type="switch"
                                    checked={blog.status}
                                    onChange={() => handleToggleStatus(blog.id)}
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
                                    onClick={() => handleDelete(blog.id)}
                                >
                                    🗑️ Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default BlogPostDashboard;
