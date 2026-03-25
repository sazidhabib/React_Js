'use client';

import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form, Badge, OverlayTrigger, Tooltip, Spinner, Table } from 'react-bootstrap';
import { NewsSelectionModal, ImageSelectionModal, VideoSelectionModal, AdSelectionModal } from './ContentSelectionModals';
import api from "@/app/lib/api";

const UPLOADS_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

// Preview Cell Content Component
const PreviewCellContent = ({ contentType, contentId, contentTitle }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            if (!contentId || contentType === 'text') {
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                let res;
                if (contentType === 'news') res = await api.get(`/news/${contentId}`);
                else if (contentType === 'ad') res = await api.get(`/ads/${contentId}`);
                
                if (res) setData(res.data.data || res.data.news || res.data);
                else setData({ id: contentId, title: contentTitle });
            } catch (err) {
                console.error(`Error fetching ${contentType} preview:`, err);
                setData(null);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, [contentId, contentType]);

    if (loading) return <Spinner animation="border" size="sm" />;
    if (contentType === 'text') return <div className="small text-muted">{contentTitle || 'Text Content'}</div>;

    const imgSrc = contentType === 'news' ? (data?.thumbImage || data?.image) : (contentType === 'image' ? contentId : (contentType === 'ad' ? data?.image : null));
    const finalImgSrc = imgSrc ? (imgSrc.startsWith('http') ? imgSrc : `${UPLOADS_BASE_URL}/${imgSrc.replace(/^\//, '')}`) : null;

    return (
        <div className="preview-cell">
            {finalImgSrc && <div style={{ height: '40px', overflow: 'hidden', borderRadius: '4px' }}><img src={finalImgSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>}
            <div className="small fw-bold text-truncate" style={{ fontSize: '0.7rem' }}>{contentTitle || data?.newsHeadline || data?.title || 'Selected'}</div>
        </div>
    );
};

// Grid Cell Component
const GridCell = ({
    cell, rowIndex, colIndex, onUpdate, isMerged, isSelected, onCellSelect, 
    rowSpan, colSpan, isMasterCell, onContentSelect, onMouseDown, onMouseEnter,
    availableTags = [], availableDesigns = [], isAutoNewsMode = false, autoNewsItem = null
}) => {
    const [isEditing, setIsEditing] = useState(false);

    const cellStyle = {
        minWidth: '120px',
        height: '100px',
        backgroundColor: isMerged ? '#f8f9fa' : isSelected ? '#e7f1ff' : 'white',
        cursor: 'pointer',
        position: 'relative',
        border: isSelected ? '2px solid #0d6efd' : '1px solid #dee2e6',
        verticalAlign: 'top',
        padding: '8px'
    };

    if (isMerged && !isMasterCell) return null;

    return (
        <td
            rowSpan={rowSpan || 1}
            colSpan={colSpan || 1}
            style={cellStyle}
            onClick={(e) => onCellSelect(rowIndex, colIndex, e)}
            onMouseDown={(e) => onMouseDown(rowIndex, colIndex, e)}
            onMouseEnter={() => onMouseEnter(rowIndex, colIndex)}
            onDoubleClick={() => !isAutoNewsMode && setIsEditing(true)}
        >
            <Badge bg="secondary" className="position-absolute top-0 start-0" style={{fontSize: '0.6rem'}}>
                {String.fromCharCode(65 + colIndex)}{rowIndex + 1}
            </Badge>

            <div className="d-flex flex-column h-100 mt-2">
                {isEditing ? (
                    <div onClick={e => e.stopPropagation()}>
                        <Form.Select size="sm" value={cell.contentType || 'text'} onChange={e => onUpdate(rowIndex, colIndex, 'contentType', e.target.value)}>
                            <option value="text">📝 Text</option>
                            <option value="news">📰 News</option>
                            <option value="image">🖼️ Image</option>
                            <option value="video">🎥 Video</option>
                            <option value="ad">📢 Ad</option>
                        </Form.Select>
                        <Form.Control size="sm" placeholder="Tag" value={cell.tag || ''} onChange={e => onUpdate(rowIndex, colIndex, 'tag', e.target.value)} className="mt-1" />
                        <Button size="sm" variant="link" className="p-0 mt-1" onClick={() => setIsEditing(false)}>Done</Button>
                    </div>
                ) : (
                    <div className="text-center overflow-hidden">
                        {isAutoNewsMode ? (
                            <div>
                                <Badge bg="info">{cell.tag || 'No Tag'}</Badge>
                                {autoNewsItem && <div className="small mt-1 text-truncate">{autoNewsItem.newsHeadline}</div>}
                            </div>
                        ) : (
                            <>
                                <div className="small fw-bold mb-1">{cell.contentType === 'text' ? '📝' : cell.contentType === 'news' ? '📰' : cell.contentType === 'image' ? '🖼️' : cell.contentType === 'video' ? '🎥' : '📢'}</div>
                                {cell.contentType !== 'text' && (
                                    <Button size="sm" variant="outline-primary" style={{fontSize: '0.6rem'}} onClick={(e) => { e.stopPropagation(); onContentSelect(rowIndex, colIndex, cell.contentType); }}>
                                        {cell.contentId ? 'Change' : 'Select'}
                                    </Button>
                                )}
                                <div className="small text-truncate mt-1" style={{fontSize: '0.65rem'}}>{cell.contentTitle || cell.tag || ''}</div>
                                {cell.design && <Badge bg="warning" text="dark" className="ms-1" style={{fontSize: '0.5rem'}}>{cell.design}</Badge>}
                            </>
                        )}
                    </div>
                )}
            </div>
        </td>
    );
};

// Merge Controls
const MergeControls = ({ selectedCells, onMerge, onClearSelection }) => {
    if (selectedCells.size === 0) return null;
    return (
        <Card className="mb-3 bg-light border-primary">
            <Card.Body className="py-2 d-flex justify-content-between align-items-center">
                <Badge bg="primary">{selectedCells.size} Cells Selected</Badge>
                <div>
                    {selectedCells.size > 1 && <Button variant="primary" size="sm" className="me-2" onClick={() => onMerge('merge')}>🔗 Merge</Button>}
                    <Button variant="warning" size="sm" className="me-2" onClick={() => onMerge('split')}>🔓 Split</Button>
                    <Button variant="outline-secondary" size="sm" onClick={onClearSelection}>Clear</Button>
                </div>
            </Card.Body>
        </Card>
    );
};

// Excel Grid Section
export const ExcelGridSection = ({
    section, sectionIndex, onUpdateSection, onAddRow, onAddColumn, onDeleteRow, onDeleteColumn,
    onUpdateCell, onUpdateCellContent, onMergeCells, availableTags, availableDesigns, menus = []
}) => {
    const [selectedCells, setSelectedCells] = useState(new Set());
    const [selectionStart, setSelectionStart] = useState(null);
    const [isSelecting, setIsSelecting] = useState(false);
    const [contentModal, setContentModal] = useState({ show: false, contentType: null, rowIndex: null, colIndex: null });

    const rows = section.rows || [];
    const columns = rows[0]?.columns || [];

    const handleMouseDown = (r, c, e) => {
        setIsSelecting(true);
        const key = `${r}-${c}`;
        setSelectedCells(new Set([key]));
        setSelectionStart({ r, c });
    };

    const handleMouseEnter = (r, c) => {
        if (!isSelecting || !selectionStart) return;
        const newSelected = new Set();
        const startR = Math.min(selectionStart.r, r);
        const endR = Math.max(selectionStart.r, r);
        const startC = Math.min(selectionStart.c, c);
        const endC = Math.max(selectionStart.c, c);

        for (let i = startR; i <= endR; i++) {
            for (let j = startC; j <= endC; j++) {
                newSelected.add(`${i}-${j}`);
            }
        }
        setSelectedCells(newSelected);
    };

    useEffect(() => {
        const handleMouseUp = () => setIsSelecting(false);
        window.addEventListener('mouseup', handleMouseUp);
        return () => window.removeEventListener('mouseup', handleMouseUp);
    }, []);

    const handleMerge = (action) => {
        if (action === 'merge' && selectedCells.size > 1) {
            const cells = Array.from(selectedCells).map(k => {
                const [r, c] = k.split('-').map(Number);
                return { row: r, col: c };
            });
            const rIdxs = cells.map(c => c.row);
            const cIdxs = cells.map(c => c.col);
            onMergeCells(sectionIndex, {
                action: 'merge',
                startRow: Math.min(...rIdxs),
                endRow: Math.max(...rIdxs),
                startCol: Math.min(...cIdxs),
                endCol: Math.max(...cIdxs),
                cells
            });
        } else if (action === 'split') {
            const keys = Array.from(selectedCells);
            if (keys.length > 0) {
                const [r, c] = keys[0].split('-').map(Number);
                onMergeCells(sectionIndex, { action: 'split', row: r, col: c });
            }
        }
        setSelectedCells(new Set());
    };

    return (
        <Card className="mb-4 shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center bg-white">
                <div className="d-flex align-items-center">
                    <h6 className="mb-0 me-3">{section.name || `Section ${sectionIndex + 1}`}</h6>
                    <Form.Check type="switch" label="Auto News" checked={section.autoNewsSelection} onChange={e => onUpdateSection(sectionIndex, 'autoNewsSelection', e.target.checked)} />
                </div>
                <div>
                    <Button variant="outline-primary" size="sm" className="me-2" onClick={() => onAddRow(sectionIndex)}>+ Row</Button>
                    <Button variant="outline-primary" size="sm" onClick={() => onAddColumn(sectionIndex)}>+ Col</Button>
                </div>
            </Card.Header>
            <Card.Body>
                <MergeControls selectedCells={selectedCells} onMerge={handleMerge} onClearSelection={() => setSelectedCells(new Set())} />
                <div className="table-responsive">
                    <Table bordered className="mb-0" style={{ borderCollapse: 'separate' }}>
                        <thead>
                            <tr>
                                <th style={{ width: '40px' }} className="bg-light"></th>
                                {columns.map((_, ci) => (
                                    <th key={ci} className="text-center bg-light position-relative">
                                        {String.fromCharCode(65 + ci)}
                                        <Button variant="link" size="sm" className="p-0 position-absolute end-0 text-danger" onClick={() => onDeleteColumn(sectionIndex, ci)}>×</Button>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, ri) => (
                                <tr key={ri}>
                                    <td className="bg-light text-center fw-bold position-relative">
                                        {ri + 1}
                                        <Button variant="link" size="sm" className="p-0 position-absolute bottom-0 text-danger" onClick={() => onDeleteRow(sectionIndex, ri)}>×</Button>
                                    </td>
                                    {row.columns.map((cell, ci) => (
                                        <GridCell
                                            key={`${ri}-${ci}`}
                                            cell={cell}
                                            rowIndex={ri}
                                            colIndex={ci}
                                            onUpdate={(r, c, f, v) => onUpdateCell(sectionIndex, r, c, f, v)}
                                            isSelected={selectedCells.has(`${ri}-${ci}`)}
                                            onCellSelect={() => {}} 
                                            onMouseDown={handleMouseDown}
                                            onMouseEnter={handleMouseEnter}
                                            onContentSelect={(r, c, type) => setContentModal({ show: true, contentType: type, rowIndex: r, colIndex: c })}
                                            isMerged={cell.merged}
                                            isMasterCell={cell.masterCell}
                                            rowSpan={cell.rowSpan}
                                            colSpan={cell.colSpan}
                                            isAutoNewsMode={section.autoNewsSelection}
                                        />
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Card.Body>
            {contentModal.show && (
                <>
                    {contentModal.contentType === 'news' && <NewsSelectionModal show={true} onClose={() => setContentModal({show: false})} onSelect={data => { onUpdateCellContent(sectionIndex, contentModal.rowIndex, contentModal.colIndex, 'news', data.id, data.newsHeadline); setContentModal({show: false}); }} />}
                    {contentModal.contentType === 'image' && <ImageSelectionModal show={true} onClose={() => setContentModal({show: false})} onSelect={data => { onUpdateCellContent(sectionIndex, contentModal.rowIndex, contentModal.colIndex, 'image', data.imageUrl || data.image, data.filename); setContentModal({show: false}); }} />}
                    {contentModal.contentType === 'video' && <VideoSelectionModal show={true} onClose={() => setContentModal({show: false})} onSelect={data => { onUpdateCellContent(sectionIndex, contentModal.rowIndex, contentModal.colIndex, 'video', data.id, data.newsHeadline); setContentModal({show: false}); }} />}
                    {contentModal.contentType === 'ad' && <AdSelectionModal show={true} onClose={() => setContentModal({show: false})} onSelect={data => { onUpdateCellContent(sectionIndex, contentModal.rowIndex, contentModal.colIndex, 'ad', data.id, data.title || data.name); setContentModal({show: false}); }} />}
                </>
            )}
        </Card>
    );
};
