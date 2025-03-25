import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ArticleDashboard = () => {
    const [articles, setArticles] = useState([
        { id: 1, title: "First Article", description: "This is the first article", status: true },
        { id: 2, title: "Second Article", description: "Another article example", status: false }
    ]);

    const [newArticle, setNewArticle] = useState({
        title: "",
        description: "",
        status: false,
    });

    const [editingId, setEditingId] = useState(null);

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewArticle({
            ...newArticle,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Add or Edit Article
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newArticle.title.trim() === "" || newArticle.description.trim() === "") {
            alert("Title and Description are required!");
            return;
        }

        if (editingId !== null) {
            // Edit existing article
            setArticles(articles.map(article =>
                article.id === editingId ? { ...newArticle, id: editingId } : article
            ));
            setEditingId(null);
        } else {
            // Add new article
            setArticles([...articles, { ...newArticle, id: articles.length + 1 }]);
        }

        setNewArticle({ title: "", description: "", status: false });
    };

    // Edit Article
    const handleEdit = (article) => {
        setNewArticle(article);
        setEditingId(article.id);
    };

    // Delete Article
    const handleDelete = (id) => {
        setArticles(articles.filter(article => article.id !== id));
    };

    // Toggle Status
    const handleToggleStatus = (id) => {
        setArticles(articles.map(article =>
            article.id === id ? { ...article, status: !article.status } : article
        ));
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
                        <tr key={article.id}>
                            <td>{index + 1}</td>
                            <td>{article.title}</td>
                            <td>{article.description}</td>
                            <td>
                                <Form.Check
                                    type="switch"
                                    checked={article.status}
                                    onChange={() => handleToggleStatus(article.id)}
                                    label={article.status ? "Visible" : "Hidden"}
                                />
                            </td>
                            <td>
                                <Button variant="info" size="sm" className="me-2" onClick={() => handleEdit(article)}>
                                    ✏️ Edit
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(article.id)}>
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
