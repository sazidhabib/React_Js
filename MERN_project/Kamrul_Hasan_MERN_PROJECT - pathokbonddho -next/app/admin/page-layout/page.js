'use client';

import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Container, Row, Col, Card, Button, Form, Modal, Alert, Tab, Nav, Spinner } from 'react-bootstrap';
import api from "@/app/lib/api";
import { useAuth } from "@/app/providers/AuthProvider";

const SortableSection = ({ section, sectionIndex, onDelete, onUpdate, onAddColumn, editPage, setEditPage }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id || `section-${sectionIndex}` });
    const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };
    const rows = section.rows || [];
    const firstRow = rows[0] || { columns: [] };
    const columns = firstRow.columns || [];

    return (
        <Card ref={setNodeRef} style={style} className="mb-3">
            <Card.Header {...attributes} {...listeners} style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
                <div className="d-flex justify-content-between align-items-center">
                    <span>Section {sectionIndex + 1} 🟰 (Drag here)</span>
                    <Button variant="outline-danger" size="sm" onClick={() => onDelete(sectionIndex)}>Delete</Button>
                </div>
            </Card.Header>
            <Card.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Layout Type</Form.Label>
                    <Form.Select value={section.layoutType || 'grid'} onChange={(e) => onUpdate(sectionIndex, 'layoutType', e.target.value)}>
                        <option value="grid">Grid</option>
                        <option value="flex">Flex</option>
                    </Form.Select>
                </Form.Group>
                {columns.map((column, colIndex) => (
                    <Row key={colIndex} className="mb-2">
                        <Col md={4}>
                            <Form.Group><Form.Label>Content Type</Form.Label>
                                <Form.Select value={column.contentType || 'text'} onChange={(e) => {
                                    const updatedSections = [...editPage.PageSections];
                                    if (updatedSections[sectionIndex]?.rows[0]?.columns[colIndex]) {
                                        updatedSections[sectionIndex].rows[0].columns[colIndex].contentType = e.target.value;
                                        setEditPage({ ...editPage, PageSections: updatedSections });
                                    }
                                }}>
                                    <option value="text">Text</option><option value="news">News</option><option value="image">Image</option><option value="video">Video</option><option value="ad">Ad</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={3}><Form.Group><Form.Label>Width (1-12)</Form.Label><Form.Control type="number" min="1" max="12" value={column.width || 12} onChange={(e) => {
                            const updatedSections = [...editPage.PageSections];
                            if (updatedSections[sectionIndex]?.rows[0]?.columns[colIndex]) {
                                updatedSections[sectionIndex].rows[0].columns[colIndex].width = parseInt(e.target.value) || 12;
                                setEditPage({ ...editPage, PageSections: updatedSections });
                            }
                        }}/></Form.Group></Col>
                        <Col md={3}><Form.Group><Form.Label>Tag</Form.Label><Form.Control type="text" value={column.tag || ''} onChange={(e) => {
                            const updatedSections = [...editPage.PageSections];
                            if (updatedSections[sectionIndex]?.rows[0]?.columns[colIndex]) {
                                updatedSections[sectionIndex].rows[0].columns[colIndex].tag = e.target.value;
                                setEditPage({ ...editPage, PageSections: updatedSections });
                            }
                        }}/></Form.Group></Col>
                        <Col md={2} className="d-flex align-items-end"><Button variant="outline-danger" size="sm" onClick={() => {
                            const updatedSections = [...editPage.PageSections];
                            if (updatedSections[sectionIndex]?.rows?.[0]?.columns) {
                                updatedSections[sectionIndex].rows[0].columns = updatedSections[sectionIndex].rows[0].columns.filter((_, idx) => idx !== colIndex);
                                setEditPage({ ...editPage, PageSections: updatedSections });
                            }
                        }}>Del</Button></Col>
                    </Row>
                ))}
                <Button variant="outline-success" size="sm" onClick={() => onAddColumn(sectionIndex)}>+ Col</Button>
            </Card.Body>
        </Card>
    );
};

const PageLayoutDashboard = () => {
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin' || user?.isAdmin;
    const [pages, setPages] = useState([]);
    const [selectedPage, setSelectedPage] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editPage, setEditPage] = useState(null);
    const [newPage, setNewPage] = useState({ name: '', sections: [{ layoutType: 'grid', rows: [{ rowOrder: 1, columns: [{ colOrder: 1, width: 12, contentType: 'text', tag: 'main' }] }] }] });

    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

    const fetchPages = async () => {
        try {
            setLoading(true);
            const res = await api.get('/layout');
            setPages(Array.isArray(res.data) ? res.data : []);
        } catch (err) { toast.error("Failed to fetch layouts"); }
        finally { setLoading(false); }
    };

    useEffect(() => { if (isAdmin) fetchPages(); }, [isAdmin]);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIdx = editPage.PageSections.findIndex(s => s.id === active.id);
        const newIdx = editPage.PageSections.findIndex(s => s.id === over.id);
        const reordered = arrayMove(editPage.PageSections, oldIdx, newIdx).map((s, i) => ({ ...s, rows: (s.rows || []).map(r => ({ ...r, rowOrder: i + 1 })) }));
        setEditPage({ ...editPage, PageSections: reordered });
    };

    const handleSave = async () => {
        try {
            const data = { name: editPage.name, PageSections: editPage.PageSections.map((s, i) => ({ layoutType: s.layoutType || 'grid', rows: (s.rows || s.Rows || []).map((r, ri) => ({ rowOrder: i + 1, columns: (r.columns || r.Columns || []).map((c, ci) => ({ colOrder: ci + 1, width: c.width, contentType: c.contentType, tag: c.tag })) })) })) };
            await api.patch(`/layout/${editPage.id}`, data);
            toast.success("Saved");
            setShowEditModal(false);
            fetchPages();
        } catch (err) { toast.error("Save failed"); }
    };

    const handleCreate = async () => {
        try {
            await api.post('/layout', newPage);
            toast.success("Created");
            setShowCreateModal(false);
            fetchPages();
        } catch (err) { toast.error("Create failed"); }
    };

    if (!isAdmin) return <div className="p-4 text-center"><h4>Access Denied</h4></div>;

    return (
        <div className="container fluid mt-4">
            <Row>
                <Col md={4}>
                    <Card><Card.Header className="d-flex justify-content-between">Pages <Button size="sm" onClick={() => setShowCreateModal(true)}>+</Button></Card.Header>
                    <Card.Body>
                        <div className="list-group">
                            {pages.map(p => (
                                <div key={p.id} className={`list-group-item d-flex justify-content-between ${selectedPage?.id === p.id ? 'active' : ''}`} onClick={() => api.get(`/layout/${p.id}`).then(r => setSelectedPage(r.data))}>
                                    {p.name}
                                    <div>
                                        <Button size="sm" variant="outline-light" className="me-1" onClick={(e) => { e.stopPropagation(); api.get(`/layout/${p.id}`).then(r => { const d = r.data; d.PageSections = d.PageSections.map((s, i) => ({ ...s, id: s.id || `s-${i}`, rows: s.Rows || s.rows || [] })); setEditPage(d); setShowEditModal(true); }); }}>Edit</Button>
                                        <Button size="sm" variant="outline-danger" onClick={(e) => { e.stopPropagation(); if (confirm('Delete?')) api.delete(`/layout/${p.id}`).then(() => fetchPages()); }}>X</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card.Body></Card>
                </Col>
                <Col md={8}>
                    {selectedPage ? (
                        <Card><Card.Body>
                        <h5>{selectedPage.name}</h5>
                        {selectedPage.PageSections?.map((s, i) => (
                            <div key={i} className="border p-2 mb-2 bg-light">
                                <h6>Section {i+1} ({s.layoutType})</h6>
                                {(s.Rows || s.rows)?.map((r, ri) => (
                                    <Row key={ri} className="g-1">
                                        {(r.Columns || r.columns)?.map((c, ci) => (
                                            <Col key={ci} md={c.width}><div className="border bg-white p-1 text-center small">{c.contentType}:{c.tag}</div></Col>
                                        ))}
                                    </Row>
                                ))}
                            </div>
                        ))}
                        </Card.Body></Card>
                    ) : <div className="text-center p-5 border text-muted">Select a page</div>}
                </Col>
            </Row>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="xl">
                <Modal.Header closeButton><Modal.Title>Edit {editPage?.name}</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3"><Form.Label>Name</Form.Label><Form.Control value={editPage?.name || ''} onChange={e => setEditPage({...editPage, name: e.target.value})}/></Form.Group>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={editPage?.PageSections?.map(s => s.id) || []} strategy={verticalListSortingStrategy}>
                            {editPage?.PageSections?.map((s, si) => (
                                <SortableSection key={s.id} section={s} sectionIndex={si} editPage={editPage} setEditPage={setEditPage} onDelete={idx => setEditPage({...editPage, PageSections: editPage.PageSections.filter((_, i) => i !== idx)})} onUpdate={(idx, f, v) => { const ss = [...editPage.PageSections]; ss[idx][f] = v; setEditPage({...editPage, PageSections: ss}); }} onAddColumn={idx => { const ss = [...editPage.PageSections]; if (!ss[idx].rows[0]) ss[idx].rows = [{columns: []}]; ss[idx].rows[0].columns.push({width: 6, contentType: 'text', tag: 'col'}); setEditPage({...editPage, PageSections: ss}); }}/>
                            ))}
                        </SortableContext>
                    </DndContext>
                    <Button variant="outline-primary" onClick={() => setEditPage({...editPage, PageSections: [...(editPage.PageSections || []), { id: `s-${Date.now()}`, layoutType: 'grid', rows: [{columns: [{width: 12, contentType: 'text', tag: 'new'}]}] }]})}>+ Add Section</Button>
                </Modal.Body>
                <Modal.Footer><Button variant="primary" onClick={handleSave}>Save</Button></Modal.Footer>
            </Modal>
        </div>
    );
};

export default PageLayoutDashboard;
