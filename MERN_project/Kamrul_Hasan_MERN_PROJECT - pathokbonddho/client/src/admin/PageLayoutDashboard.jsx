import React, { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Form,
    Modal,
    Alert,
    Tab,
    Nav,
    Spinner
} from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../store/auth'; // Import your AuthContext

const PageLayoutDashboard = () => {
    const { token, isLoggedIn, LogoutUser } = useAuth();
    const [pages, setPages] = useState([]);
    const [selectedPage, setSelectedPage] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });
    const [loading, setLoading] = useState(true);
    const [newPage, setNewPage] = useState({
        name: '',
        sections: [{
            layoutType: 'grid',
            rows: [{
                rowOrder: 1,
                columns: [{
                    colOrder: 1,
                    width: 12,
                    contentType: 'text',
                    tag: 'main-content'
                }]
            }]
        }]
    });

    // Create axios instance with base config
    const api = axios.create({
        baseURL: 'http://localhost:5000/api',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    // Add request interceptor to include token
    api.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Add response interceptor to handle errors
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                LogoutUser();
            }
            return Promise.reject(error);
        }
    );

    const showAlert = (message, type) => {
        setAlert({ show: true, message, type });
        setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
    };

    // Fetch all pages with axios
    const fetchPages = async () => {
        try {
            setLoading(true);
            const response = await api.get('/layout');
            setPages(response.data);
        } catch (error) {
            console.error('Error fetching pages:', error);
            if (error.response?.status !== 401) { // Don't show alert for 401 (handled by interceptor)
                showAlert(error.response?.data?.message || 'Error loading pages', 'danger');
            }
            setPages([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch specific page layout
    const fetchPageLayout = async (pageId) => {
        try {
            const response = await api.get(`/layout/${pageId}`);
            setSelectedPage(response.data);
        } catch (error) {
            console.error('Error fetching page layout:', error);
            if (error.response?.status !== 401) {
                showAlert(error.response?.data?.message || 'Error fetching page layout', 'danger');
            }
        }
    };

    // Create new page
    const createPage = async () => {
        try {
            const response = await api.post('/layout', newPage);
            showAlert('Page created successfully!', 'success');
            setShowCreateModal(false);
            setNewPage({
                name: '',
                sections: [{
                    layoutType: 'grid',
                    rows: [{
                        rowOrder: 1,
                        columns: [{
                            colOrder: 1,
                            width: 12,
                            contentType: 'text',
                            tag: 'main-content'
                        }]
                    }]
                }]
            });
            fetchPages();
        } catch (error) {
            console.error('Error creating page:', error);
            showAlert(error.response?.data?.message || 'Error creating page', 'danger');
        }
    };

    // Delete page
    const deletePage = async (pageId) => {
        if (window.confirm('Are you sure you want to delete this page?')) {
            try {
                await api.delete(`/layout/${pageId}`);
                showAlert('Page deleted successfully!', 'success');
                fetchPages();
                if (selectedPage && selectedPage.id === pageId) {
                    setSelectedPage(null);
                }
            } catch (error) {
                console.error('Error deleting page:', error);
                showAlert(error.response?.data?.message || 'Error deleting page', 'danger');
            }
        }
    };

    const addSection = () => {
        setNewPage(prev => ({
            ...prev,
            sections: [
                ...prev.sections,
                {
                    layoutType: 'grid',
                    rows: [{
                        rowOrder: prev.sections.length + 1,
                        columns: [{
                            colOrder: 1,
                            width: 12,
                            contentType: 'text',
                            tag: 'new-section'
                        }]
                    }]
                }
            ]
        }));
    };

    const addColumn = (sectionIndex) => {
        const updatedSections = [...newPage.sections];
        const section = updatedSections[sectionIndex];
        const row = section.rows[0];

        row.columns.push({
            colOrder: row.columns.length + 1,
            width: 6,
            contentType: 'text',
            tag: `column-${row.columns.length + 1}`
        });

        setNewPage(prev => ({ ...prev, sections: updatedSections }));
    };

    // Redirect to login if not logged in
    useEffect(() => {
        if (!isLoggedIn) {
            window.location.href = '/login';
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (isLoggedIn) {
            fetchPages();
        }
    }, [isLoggedIn]);

    if (loading) {
        return (
            <Container fluid className="py-4 d-flex justify-content-center align-items-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <Container fluid className="py-4">
            {alert.show && (
                <Alert variant={alert.type} className="mb-3">
                    {alert.message}
                </Alert>
            )}

            <Row>
                <Col md={4}>
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Pages</h5>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => setShowCreateModal(true)}
                            >
                                + New Page
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            {!Array.isArray(pages) || pages.length === 0 ? (
                                <p className="text-muted">No pages created yet.</p>
                            ) : (
                                <div className="list-group">
                                    {pages.map(page => (
                                        <div
                                            key={page.id}
                                            className={`list-group-item list-group-item-action ${selectedPage?.id === page.id ? 'active' : ''
                                                }`}
                                            onClick={() => fetchPageLayout(page.id)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span>{page.name}</span>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deletePage(page.id);
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={8}>
                    {selectedPage ? (
                        <Card>
                            <Card.Header>
                                <h4>Layout: {selectedPage.name}</h4>
                            </Card.Header>
                            <Card.Body>
                                <Tab.Container defaultActiveKey="preview">
                                    <Nav variant="tabs" className="mb-3">
                                        <Nav.Item>
                                            <Nav.Link eventKey="preview">Preview</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="json">JSON Data</Nav.Link>
                                        </Nav.Item>
                                    </Nav>

                                    <Tab.Content>
                                        <Tab.Pane eventKey="preview">
                                            {selectedPage.PageSections?.map((section, sectionIndex) => (
                                                <div key={sectionIndex} className="border rounded p-3 mb-3">
                                                    <h6>Section {sectionIndex + 1} ({section.layoutType})</h6>
                                                    {section.Rows?.map((row, rowIndex) => (
                                                        <Row key={rowIndex} className="mb-2">
                                                            {row.Columns?.map((column, colIndex) => (
                                                                <Col key={colIndex} md={column.width}>
                                                                    <div className="border p-2 bg-light">
                                                                        <small className="text-muted">
                                                                            Column {column.colOrder}<br />
                                                                            Width: {column.width}<br />
                                                                            Type: {column.contentType}<br />
                                                                            Tag: {column.tag}
                                                                        </small>
                                                                    </div>
                                                                </Col>
                                                            ))}
                                                        </Row>
                                                    ))}
                                                </div>
                                            ))}
                                        </Tab.Pane>

                                        <Tab.Pane eventKey="json">
                                            <pre className="bg-dark text-light p-3 rounded">
                                                {JSON.stringify(selectedPage, null, 2)}
                                            </pre>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Tab.Container>
                            </Card.Body>
                        </Card>
                    ) : (
                        <Card>
                            <Card.Body className="text-center text-muted py-5">
                                <h5>Select a page to view its layout</h5>
                                <p>Or create a new page to get started</p>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>

            {/* Create Page Modal */}
            <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Create New Page</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Page Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter page name (e.g., Homepage, About)"
                                value={newPage.name}
                                onChange={(e) => setNewPage({ ...newPage, name: e.target.value })}
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6>Sections</h6>
                            <Button variant="outline-primary" size="sm" onClick={addSection}>
                                + Add Section
                            </Button>
                        </div>

                        {newPage.sections.map((section, sectionIndex) => (
                            <Card key={sectionIndex} className="mb-3">
                                <Card.Header>
                                    <Form.Group>
                                        <Form.Label>Layout Type</Form.Label>
                                        <Form.Select
                                            value={section.layoutType}
                                            onChange={(e) => {
                                                const updatedSections = [...newPage.sections];
                                                updatedSections[sectionIndex].layoutType = e.target.value;
                                                setNewPage({ ...newPage, sections: updatedSections });
                                            }}
                                        >
                                            <option value="grid">Grid</option>
                                            <option value="flex">Flex</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Card.Header>
                                <Card.Body>
                                    {section.rows.map((row, rowIndex) => (
                                        <div key={rowIndex}>
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <h6 className="mb-0">Columns</h6>
                                                <Button
                                                    variant="outline-success"
                                                    size="sm"
                                                    onClick={() => addColumn(sectionIndex)}
                                                >
                                                    + Add Column
                                                </Button>
                                            </div>

                                            {row.columns.map((column, colIndex) => (
                                                <Row key={colIndex} className="mb-2">
                                                    <Col md={6}>
                                                        <Form.Group>
                                                            <Form.Label>Content Type</Form.Label>
                                                            <Form.Select
                                                                value={column.contentType}
                                                                onChange={(e) => {
                                                                    const updatedSections = [...newPage.sections];
                                                                    updatedSections[sectionIndex].rows[rowIndex].columns[colIndex].contentType = e.target.value;
                                                                    setNewPage({ ...newPage, sections: updatedSections });
                                                                }}
                                                            >
                                                                <option value="text">Text</option>
                                                                <option value="news">News</option>
                                                                <option value="image">Image</option>
                                                                <option value="video">Video</option>
                                                                <option value="ad">Advertisement</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Form.Group>
                                                            <Form.Label>Width (1-12)</Form.Label>
                                                            <Form.Control
                                                                type="number"
                                                                min="1"
                                                                max="12"
                                                                value={column.width}
                                                                onChange={(e) => {
                                                                    const updatedSections = [...newPage.sections];
                                                                    updatedSections[sectionIndex].rows[rowIndex].columns[colIndex].width = parseInt(e.target.value);
                                                                    setNewPage({ ...newPage, sections: updatedSections });
                                                                }}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Form.Group>
                                                            <Form.Label>Tag</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="e.g., sports, tech"
                                                                value={column.tag}
                                                                onChange={(e) => {
                                                                    const updatedSections = [...newPage.sections];
                                                                    updatedSections[sectionIndex].rows[rowIndex].columns[colIndex].tag = e.target.value;
                                                                    setNewPage({ ...newPage, sections: updatedSections });
                                                                }}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            ))}
                                        </div>
                                    ))}
                                </Card.Body>
                            </Card>
                        ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={createPage}>
                        Create Page
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default PageLayoutDashboard;