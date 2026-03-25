'use client';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal, Table, Spinner } from 'react-bootstrap';
import api from "@/app/lib/api";
import { toast } from 'react-toastify';
import { ExcelGridSection } from './components/ExcelGrid';

const createNewSection = (rows = 3, columns = 3) => {
    const sectionRows = [];
    for (let i = 0; i < rows; i++) {
        const row = { rowOrder: i + 1, columns: [] };
        for (let j = 0; j < columns; j++) {
            row.columns.push({
                colOrder: j + 1,
                contentType: 'text',
                tag: '',
                width: Math.floor(12 / columns),
                merged: false,
                rowSpan: 1,
                colSpan: 1
            });
        }
        sectionRows.push(row);
    }
    return { layoutType: 'grid', name: `Section ${Date.now()}`, autoNewsSelection: false, rows: sectionRows };
};

const PageLayoutClient = ({ initialPages, initialTags, initialMenus, isAdmin }) => {
    const [pages, setPages] = useState(initialPages || []);
    const [selectedPage, setSelectedPage] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editPage, setEditPage] = useState(null);
    const [availableTags] = useState(initialTags || []);
    const [menus] = useState(initialMenus || []);
    const [newPage, setNewPage] = useState({ name: '', autoNewsSelection: false, sections: [createNewSection(3, 3)] });

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await api.get('/layout');
            setPages(Array.isArray(res.data) ? res.data : []);
        } catch (err) { toast.error("Failed to fetch layouts"); }
        finally { setLoading(false); }
    };

    const handleFetchForEdit = async (id) => {
        try {
            const res = await api.get(`/layout/${id}`);
            const data = res.data;
            if (data.PageSections) {
                data.PageSections = data.PageSections.map(s => ({
                    ...s,
                    rows: (s.Rows || s.rows || []).map(r => ({
                        ...r,
                        columns: (r.Columns || r.columns || []).map(c => ({
                            ...c,
                            contentType: c.contentType || 'text',
                            contentId: c.contentId || null,
                            contentTitle: c.contentTitle || null,
                            merged: c.merged || false,
                            rowSpan: c.rowSpan || 1,
                            colSpan: c.colSpan || 1
                        }))
                    }))
                }));
            }
            setEditPage(data);
            setShowEditModal(true);
        } catch (err) { toast.error("Failed to load page"); }
    };

    const handleSave = async () => {
        try {
            await api.patch(`/layout/${editPage.id}`, editPage);
            toast.success("Saved successfully");
            setShowEditModal(false);
            fetchData();
        } catch (err) { toast.error("Save failed"); }
    };

    const updateGridCell = (sIdx, rIdx, cIdx, field, value) => {
        const newData = JSON.parse(JSON.stringify(editPage));
        newData.PageSections[sIdx].rows[rIdx].columns[cIdx][field] = value;
        setEditPage(newData);
    };

    const updateCellContent = (sIdx, rIdx, cIdx, type, id, title) => {
        const newData = JSON.parse(JSON.stringify(editPage));
        const cell = newData.PageSections[sIdx].rows[rIdx].columns[cIdx];
        cell.contentType = type;
        cell.contentId = id;
        cell.contentTitle = title;
        setEditPage(newData);
    };

    const mergeGridCells = (sIdx, mergeData) => {
        const newData = JSON.parse(JSON.stringify(editPage));
        const section = newData.PageSections[sIdx];
        if (mergeData.action === 'merge') {
            const { startRow, startCol, endRow, endCol, cells } = mergeData;
            const master = section.rows[startRow].columns[startCol];
            master.merged = true; master.masterCell = true;
            master.rowSpan = endRow - startRow + 1;
            master.colSpan = endCol - startCol + 1;
            master.mergedCells = cells.slice(1);
            cells.slice(1).forEach(c => {
                const cell = section.rows[c.row].columns[c.col];
                cell.merged = true; cell.masterCell = false; cell.masterCellKey = `${startRow}-${startCol}`;
            });
        } else if (mergeData.action === 'split') {
            const { row, col } = mergeData;
            const master = section.rows[row].columns[col];
            if (master.merged && master.masterCell) {
                (master.mergedCells || []).forEach(c => {
                    const cell = section.rows[c.row].columns[c.col];
                    cell.merged = false; delete cell.masterCellKey;
                });
                master.merged = false; master.masterCell = false; master.rowSpan = 1; master.colSpan = 1; delete master.mergedCells;
            }
        }
        setEditPage(newData);
    };

    if (!isAdmin) return <div className="p-4 text-center"><h4>Access Denied</h4></div>;

    return (
        <div className="container-fluid mt-4">
            <Row>
                <Col md={3}>
                    <Card className="shadow-sm">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <span>Pages</span>
                            <Button size="sm" onClick={() => setShowCreateModal(true)}>+</Button>
                        </Card.Header>
                        <Card.Body className="p-0">
                            <div className="list-group list-group-flush">
                                {pages.map(p => (
                                    <div key={p.id} className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${selectedPage?.id === p.id ? 'active' : ''}`} style={{cursor: 'pointer'}} onClick={() => api.get(`/layout/${p.id}`).then(r => setSelectedPage(r.data))}>
                                        <span className="text-truncate" style={{maxWidth: '120px'}}>{p.name}</span>
                                        <div className="btn-group">
                                            <Button size="sm" variant={selectedPage?.id === p.id ? "light" : "outline-primary"} onClick={(e) => { e.stopPropagation(); handleFetchForEdit(p.id); }}>Edit</Button>
                                            <Button size="sm" variant={selectedPage?.id === p.id ? "light" : "outline-danger"} onClick={(e) => { e.stopPropagation(); if (confirm('Delete?')) api.delete(`/layout/${p.id}`).then(() => fetchData()); }}>×</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={9}>
                    {selectedPage ? (
                        <Card className="shadow-sm">
                            <Card.Body>
                                <h5 className="mb-4">{selectedPage.name}</h5>
                                {selectedPage.PageSections?.map((s, si) => (
                                    <div key={si} className="mb-4 p-3 border rounded bg-light">
                                        <h6 className="border-bottom pb-2 mb-3">{s.name || `Section ${si+1}`} ({s.layoutType})</h6>
                                        <div className="table-responsive">
                                            <Table bordered size="sm" className="bg-white m-0">
                                                <tbody>
                                                    {(s.Rows || s.rows)?.map((r, ri) => (
                                                        <tr key={ri}>
                                                            {(r.Columns || r.columns)?.map((c, ci) => (
                                                                !c.merged || c.masterCell ? (
                                                                    <td key={ci} rowSpan={c.rowSpan} colSpan={c.colSpan} className="p-2 text-center align-middle" style={{minWidth: '80px', height: '60px'}}>
                                                                        <div className="small fw-bold">{c.contentType}</div>
                                                                        <div className="text-truncate small text-muted">{c.contentTitle || c.tag}</div>
                                                                    </td>
                                                                ) : null
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                ))}
                            </Card.Body>
                        </Card>
                    ) : (
                        <div className="text-center p-5 border rounded bg-light text-muted">
                            <i className="fas fa-layer-group fa-3x mb-3"></i>
                            <p>Select a page to preview its layout</p>
                        </div>
                    )}
                </Col>
            </Row>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="xl" fullscreen="lg-down">
                <Modal.Header closeButton><Modal.Title>Edit Layout: {editPage?.name}</Modal.Title></Modal.Header>
                <Modal.Body className="bg-light">
                    <Form.Group className="mb-4"><Form.Label>Page Name</Form.Label><Form.Control value={editPage?.name || ''} onChange={e => setEditPage({...editPage, name: e.target.value})}/></Form.Group>
                    {editPage?.PageSections?.map((s, si) => (
                        <ExcelGridSection
                            key={s.id || si}
                            section={s}
                            sectionIndex={si}
                            onUpdateSection={(idx, f, v) => { const ss = [...editPage.PageSections]; if (typeof f === 'object') ss[idx] = {...ss[idx], ...f}; else ss[idx][f] = v; setEditPage({...editPage, PageSections: ss}); }}
                            onAddRow={idx => { const ss = [...editPage.PageSections]; const cols = ss[idx].rows[0]?.columns?.length || 3; ss[idx].rows.push({rowOrder: ss[idx].rows.length+1, columns: Array.from({length: cols}, (_, i) => ({colOrder: i+1, contentType: 'text', width: Math.floor(12/cols)}))}); setEditPage({...editPage, PageSections: ss}); }}
                            onAddColumn={idx => { const ss = [...editPage.PageSections]; ss[idx].rows.forEach(r => r.columns.push({colOrder: r.columns.length+1, contentType: 'text', width: Math.floor(12/(r.columns.length+1))})); setEditPage({...editPage, PageSections: ss}); }}
                            onDeleteRow={(si, ri) => { const ss = [...editPage.PageSections]; ss[si].rows.splice(ri, 1); setEditPage({...editPage, PageSections: ss}); }}
                            onDeleteColumn={(si, ci) => { const ss = [...editPage.PageSections]; ss[si].rows.forEach(r => r.columns.splice(ci, 1)); setEditPage({...editPage, PageSections: ss}); }}
                            onUpdateCell={updateGridCell}
                            onUpdateCellContent={updateCellContent}
                            onMergeCells={mergeGridCells}
                            availableTags={availableTags}
                            menus={menus}
                        />
                    ))}
                    <Button variant="primary" className="mt-2" onClick={() => setEditPage({...editPage, PageSections: [...(editPage.PageSections || []), createNewSection()]})}>+ Add New Section</Button>
                </Modal.Body>
                <Modal.Footer><Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button><Button variant="success" onClick={handleSave}>Save Layout</Button></Modal.Footer>
            </Modal>

            <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} centered>
                <Modal.Header closeButton><Modal.Title>Create New Page</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3"><Form.Label>Name</Form.Label><Form.Control value={newPage.name} onChange={e => setNewPage({...newPage, name: e.target.value})}/></Form.Group>
                </Modal.Body>
                <Modal.Footer><Button variant="secondary" onClick={() => setShowCreateModal(false)}>Cancel</Button><Button variant="primary" onClick={() => api.post('/layout', newPage).then(() => { setShowCreateModal(false); fetchData(); })}>Create</Button></Modal.Footer>
            </Modal>
        </div>
    );
};

export default PageLayoutClient;
