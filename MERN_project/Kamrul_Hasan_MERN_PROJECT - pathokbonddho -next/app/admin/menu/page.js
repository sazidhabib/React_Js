'use client';

import React, { useEffect, useState } from "react";
import { Button, Table, Spinner, Badge, Dropdown, Form, Modal, Row, Col, Accordion } from "react-bootstrap";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import api from "@/app/lib/api";
import { useAuth } from "@/app/providers/AuthProvider";

// --- Sub-components (Inlined) ---

const MenuFormModal = ({ show, onHide, onSubmit, editMenu, parentMenus }) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors }
    } = useForm();

    const [showSeoFields, setShowSeoFields] = useState(false);

    const watchParentId = watch("parentId");
    const watchMetaTitle = watch("metaTitle");
    const watchMetaDescription = watch("metaDescription");
    const watchMetaKeywords = watch("metaKeywords");

    useEffect(() => {
        if (editMenu) {
            setValue("name", editMenu.name);
            setValue("path", editMenu.path);
            setValue("order", editMenu.order);
            setValue("metaTitle", editMenu.metaTitle || "");
            setValue("metaDescription", editMenu.metaDescription || "");
            setValue("metaKeywords", editMenu.metaKeywords || "");
            setValue("parentId", editMenu.parentId || "");
            setValue("level", editMenu.level || 0);
            setValue("isActive", editMenu.isActive !== undefined ? editMenu.isActive : true);

            if (editMenu.metaTitle || editMenu.metaDescription || editMenu.metaKeywords) {
                setShowSeoFields(true);
            }
        } else {
            reset({
                name: "",
                path: "",
                order: 1,
                metaTitle: "",
                metaDescription: "",
                metaKeywords: "",
                parentId: "",
                level: 0,
                isActive: true
            });
            setShowSeoFields(false);
        }
    }, [editMenu, setValue, reset]);

    useEffect(() => {
        if (watchParentId) {
            const parentMenu = parentMenus.find(menu => menu.id == watchParentId);
            if (parentMenu) {
                setValue("level", parentMenu.level + 1);
            }
        } else {
            setValue("level", 0);
        }
    }, [watchParentId, parentMenus, setValue]);

    const handleFormSubmit = (data) => {
        const submitData = {
            ...data,
            parentId: data.parentId || null,
            metaTitle: data.metaTitle || null,
            metaDescription: data.metaDescription || null,
            metaKeywords: data.metaKeywords || null,
            level: parseInt(data.level),
            order: parseInt(data.order),
            isActive: data.isActive === "true" || data.isActive === true
        };
        onSubmit(submitData);
    };

    const generatePathFromName = (name) => {
        if (!name) return "";
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleNameChange = (e) => {
        const name = e.target.value;
        if (!editMenu && name) {
            const generatedPath = generatePathFromName(name);
            setValue("path", generatedPath);
        }
    };

    const hasSeoData = watchMetaTitle || watchMetaDescription || watchMetaKeywords;

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{editMenu ? "Edit" : "Add"} Menu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Menu Name *</Form.Label>
                                <Form.Control
                                    {...register("name", {
                                        required: "Name is required",
                                        minLength: { value: 2, message: "Minimum 2 characters" },
                                        maxLength: { value: 100, message: "Maximum 100 characters" }
                                    })}
                                    isInvalid={!!errors.name}
                                    onChange={handleNameChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Path *</Form.Label>
                                <Form.Control
                                    {...register("path", {
                                        required: "Path is required",
                                        pattern: {
                                            value: /^[a-z0-9-/]+$/,
                                            message: "Only lowercase letters, numbers, hyphens, and forward slashes"
                                        }
                                    })}
                                    isInvalid={!!errors.path}
                                />
                                <Form.Text className="text-muted">
                                    Use lowercase with hyphens, e.g., "about-us"
                                </Form.Text>
                                <Form.Control.Feedback type="invalid">
                                    {errors.path?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Order *</Form.Label>
                                <Form.Control
                                    type="number"
                                    {...register("order", {
                                        required: "Order is required",
                                        min: { value: 1, message: "Minimum 1" },
                                        max: { value: 999, message: "Maximum 999" }
                                    })}
                                    isInvalid={!!errors.order}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.order?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Parent Menu</Form.Label>
                                <Form.Select {...register("parentId")}>
                                    <option value="">— No Parent —</option>
                                    {parentMenus.map((menu) => (
                                        <option key={menu.id} value={menu.id}>
                                            {menu.name} {menu.level > 0 && `(Level ${menu.level})`}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Level</Form.Label>
                                <Form.Control type="number" {...register("level")} disabled />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Check
                            type="switch"
                            id="isActive"
                            label="Active Menu"
                            {...register("isActive")}
                        />
                    </Form.Group>

                    <Accordion defaultActiveKey={showSeoFields ? "0" : null}>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <span>SEO Meta Fields</span>
                                {hasSeoData && <Badge bg="info" className="ms-2">Has Data</Badge>}
                            </Accordion.Header>
                            <Accordion.Body>
                                <Form.Group className="mb-3">
                                    <Form.Label>Meta Title</Form.Label>
                                    <Form.Control
                                        {...register("metaTitle", { maxLength: 255 })}
                                        isInvalid={!!errors.metaTitle}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Meta Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        {...register("metaDescription", { maxLength: 500 })}
                                        isInvalid={!!errors.metaDescription}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Meta Keywords</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        {...register("metaKeywords", { maxLength: 500 })}
                                        isInvalid={!!errors.metaKeywords}
                                    />
                                </Form.Group>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                    <div className="d-flex justify-content-end gap-2 mt-4">
                        <Button variant="secondary" onClick={onHide}>Cancel</Button>
                        <Button type="submit" variant="primary">{editMenu ? "Update" : "Create"}</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

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

// --- Main Component ---

const MenuDashboard = () => {
    const [menus, setMenus] = useState([]);
    const [parentMenus, setParentMenus] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [editMenu, setEditMenu] = useState(null);
    const [confirmModalShow, setConfirmModalShow] = useState(false);
    const [menuToDelete, setMenuToDelete] = useState(null);
    const [viewFormat, setViewFormat] = useState('flat');
    const [activeOnly, setActiveOnly] = useState(false);

    const fetchMenus = async () => {
        setLoading(true);
        try {
            const params = { format: viewFormat, activeOnly };
            const res = await api.get('/menus', { params });
            if (Array.isArray(res.data)) {
                setMenus(res.data);
            } else if (res.data && res.data.data) {
                setMenus(res.data.data);
            } else {
                setMenus([]);
            }
        } catch (err) {
            console.error('Fetch error:', err);
            toast.error("Failed to fetch menus");
            setMenus([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchParentMenus = async () => {
        try {
            const res = await api.get('/menus/parents');
            if (res.data.success && res.data.data) {
                setParentMenus(res.data.data);
            } else {
                setParentMenus([]);
            }
        } catch (err) {
            console.error("Failed to fetch parent menus:", err);
            setParentMenus([]);
        }
    };

    useEffect(() => {
        fetchMenus();
        fetchParentMenus();
    }, [viewFormat, activeOnly]);

    const handleMenuSubmit = async (menuData) => {
        try {
            if (editMenu) {
                await api.patch(`/menus/${editMenu.id}`, menuData);
                toast.success("Menu updated successfully");
            } else {
                await api.post('/menus', menuData);
                toast.success("Menu created successfully");
            }
            setModalShow(false);
            setEditMenu(null);
            fetchMenus();
            fetchParentMenus();
        } catch (err) {
            toast.error(err.response?.data?.message || "Operation failed");
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/menus/${menuToDelete}`);
            toast.success("Menu deleted successfully");
            setConfirmModalShow(false);
            setMenuToDelete(null);
            fetchMenus();
            fetchParentMenus();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete menu");
        }
    };

    const toggleMenuStatus = async (menuId, currentStatus) => {
        try {
            await api.patch(`/menus/${menuId}`, { isActive: !currentStatus });
            toast.success(`Menu ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
            fetchMenus();
        } catch (err) {
            toast.error("Failed to update status");
        }
    };

    const renderMenuTree = (menuList, level = 0) => {
        return menuList.map((menu) => (
            <React.Fragment key={menu.id}>
                <tr>
                    <td>
                        <div style={{ paddingLeft: `${level * 30}px` }}>
                            {level > 0 && '↳ '}{menu.name}
                        </div>
                    </td>
                    <td>{menu.path}</td>
                    <td>{menu.order}</td>
                    <td>
                        <Badge bg={menu.isActive ? "success" : "secondary"}>
                            {menu.isActive ? "Active" : "Inactive"}
                        </Badge>
                    </td>
                    <td>{menu.level}</td>
                    <td>{menu.parent?.name || "—"}</td>
                    <td>
                        <div className="d-flex gap-1">
                            <Button variant="outline-primary" size="sm" onClick={() => { setEditMenu(menu); setModalShow(true); }}>Edit</Button>
                            <Button variant={menu.isActive ? "outline-warning" : "outline-success"} size="sm" onClick={() => toggleMenuStatus(menu.id, menu.isActive)}>
                                {menu.isActive ? "Deactivate" : "Activate"}
                            </Button>
                            <Button variant="outline-danger" size="sm" onClick={() => { setMenuToDelete(menu.id); setConfirmModalShow(true); }}>Delete</Button>
                        </div>
                    </td>
                </tr>
                {menu.children && renderMenuTree(menu.children, level + 1)}
            </React.Fragment>
        ));
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Menu Dashboard</h4>
                <Button onClick={() => { setEditMenu(null); setModalShow(true); }}>+ Add Menu</Button>
            </div>

            <Row className="mb-3">
                <Col md={6}>
                    <div className="d-flex gap-2 align-items-center">
                        <label>View Format:</label>
                        <Dropdown>
                            <Dropdown.Toggle variant="outline-secondary" size="sm">
                                {viewFormat === 'flat' ? 'Flat List' : 'Tree View'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setViewFormat('flat')} active={viewFormat === 'flat'}>Flat List</Dropdown.Item>
                                <Dropdown.Item onClick={() => setViewFormat('tree')} active={viewFormat === 'tree'}>Tree View</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Form.Check
                            type="switch"
                            id="active-only"
                            label="Active Only"
                            checked={activeOnly}
                            onChange={(e) => setActiveOnly(e.target.checked)}
                        />
                    </div>
                </Col>
            </Row>

            {loading ? (
                <div className="text-center"><Spinner animation="border" /></div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Path</th>
                            <th>Order</th>
                            <th>Status</th>
                            <th>Level</th>
                            <th>Parent</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {viewFormat === 'tree' ? renderMenuTree(menus) : menus.map((menu) => (
                            <tr key={menu.id}>
                                <td>{menu.name}</td>
                                <td>{menu.path}</td>
                                <td>{menu.order}</td>
                                <td><Badge bg={menu.isActive ? "success" : "secondary"}>{menu.isActive ? "Active" : "Inactive"}</Badge></td>
                                <td>{menu.level}</td>
                                <td>{menu.parent?.name || "—"}</td>
                                <td>
                                    <div className="d-flex gap-1">
                                        <Button variant="outline-primary" size="sm" onClick={() => { setEditMenu(menu); setModalShow(true); }}>Edit</Button>
                                        <Button variant={menu.isActive ? "outline-warning" : "outline-success"} size="sm" onClick={() => toggleMenuStatus(menu.id, menu.isActive)}>
                                            {menu.isActive ? "Deactivate" : "Activate"}
                                        </Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => { setMenuToDelete(menu.id); setConfirmModalShow(true); }}>Delete</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {!loading && menus.length === 0 && (
                <div className="text-center py-4"><p className="text-muted">No menus found.</p></div>
            )}

            <MenuFormModal
                show={modalShow}
                onHide={() => { setModalShow(false); setEditMenu(null); }}
                onSubmit={handleMenuSubmit}
                editMenu={editMenu}
                parentMenus={parentMenus}
            />

            <ConfirmationModal
                show={confirmModalShow}
                onHide={() => { setConfirmModalShow(false); setMenuToDelete(null); }}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this menu?"
            />
        </div>
    );
};

export default MenuDashboard;
