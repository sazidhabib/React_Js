import React, { useState, useEffect } from "react";

import axios from "axios";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAuth } from "../store/auth";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/articles`;

const ArticleDashboard = () => {
    const [articles, setArticles] = useState([]);
    const [newArticle, setNewArticle] = useState({ title: "", description: "", status: false });
    const [editingId, setEditingId] = useState(null);

    // ✅ Fetch Articles from Backend
    useEffect(() => {
        axios.get(API_URL)
            .then(response => setArticles(response.data))
            .catch(error => console.error("Error fetching articles:", error));
    }, []);




    // Handle Input Change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewArticle({
            ...newArticle,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const { token } = useAuth();

    // Add or Edit Article
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newArticle.title.trim() === "" || newArticle.description.trim() === "") {
            alert("Title and Description are required!");
            return;
        }

        try {
            if (editingId !== null) {
                // ✅ Fixed: Add headers to PATCH request
                const response = await axios.patch(
                    `${API_URL}/${editingId}`,
                    newArticle,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );
                setArticles(articles.map(article =>
                    article._id === editingId ? response.data.article : article
                ));
                setEditingId(null);
            } else {
                // POST request (unchanged)
                const response = await axios.post(API_URL, newArticle, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                });
                setArticles([...articles, response.data.article]);
            }
            setNewArticle({ title: "", description: "", status: false });
        } catch (error) {
            console.error("Error saving article:", error);
        }
    };


    // Edit Article
    const handleEdit = (article) => {
        setNewArticle(article);
        setEditingId(article._id);
    };

    // Delete Article
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setArticles(articles.filter(article => article._id !== id));
        } catch (error) {
            console.error("Error deleting article:", error);
        }
    };


    // Toggle Status
    const handleToggleStatus = async (id, currentStatus) => {
        try {
            const response = await axios.put(
                `${API_URL}/${id}`,
                { status: !currentStatus },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            setArticles(articles.map(article =>
                article._id === id ? response.data.article : article
            ));
        } catch (error) {
            console.error("Error updating article status:", error);
        }
    };


    return (
        <div className="container mt-4">
            <h2 className="mb-3">📝 Article Dashboard</h2>

            {/* Article Input Form */}
            <Form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-light">
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={newArticle.title}
                        onChange={handleChange}
                        placeholder="Enter article title"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={newArticle.description}
                        onChange={handleChange}
                        placeholder="Enter article description"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check
                        type="checkbox"
                        label="Show on Homepage"
                        name="status"
                        checked={newArticle.status}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant={editingId !== null ? "warning" : "primary"} type="submit">
                    {editingId !== null ? "Update Article" : "Add Article"}
                </Button>
            </Form>

            {/* Articles Table */}
            <Table striped bordered hover>
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article, index) => (
                        <tr key={article._id}>
                            <td>{index + 1}</td>
                            <td>{article.title}</td>
                            <td>{article.description}</td>
                            <td>
                                <Form.Check
                                    type="switch"
                                    checked={article.status}
                                    onChange={() => handleToggleStatus(article._id, article.status)}
                                    label={article.status ? "Visible" : "Hidden"}
                                />
                            </td>
                            <td>
                                <Button variant="info" size="sm" className="me-2" onClick={() => handleEdit(article)}>
                                    ✏️ Edit
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(article._id)}>
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

export default ArticleDashboard;
