import React, { useState, useEffect } from 'react';
import {
    Container, Row, Col, Card, Button, Form, Modal, Alert,
    Tab, Nav, Spinner, Badge, OverlayTrigger, Tooltip
} from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../store/auth'; // Make sure this path is correct

// Import DnD Kit components
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Enhanced Grid Cell Component with Merge Support
const GridCell = ({
    cell,
    rowIndex,
    colIndex,
    onUpdate,
    onMerge,
    isMerged,
    isSelected,
    onCellSelect,
    rowSpan,
    colSpan,
    isMasterCell,
    showMergeControls
}) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleClick = (e) => {
        if (onCellSelect) {
            onCellSelect(rowIndex, colIndex, e);
        }
    };

    const handleMouseDown = (e) => {
        if (onMouseDown) {
            onMouseDown(rowIndex, colIndex);
        }
    };

    const handleMouseEnter = (e) => {
        if (onMouseEnter) {
            onMouseEnter(rowIndex, colIndex);
        }
    };

    const handleMerge = () => {
        if (onMerge) {
            onMerge(rowIndex, colIndex, 'merge');
        }
    };

    const handleSplit = () => {
        if (onMerge) {
            onMerge(rowIndex, colIndex, 'split');
        }
    };

    const cellStyle = {
        minWidth: '120px',
        height: '80px',
        backgroundColor: isMerged ? '#e3f2fd' : isSelected ? '#fff3cd' : 'white',
        cursor: 'pointer',
        position: 'relative',
        border: isSelected ? '2px solid #007bff' : '1px solid #dee2e6'
    };

    return (
        <td
            className="position-relative"
            rowSpan={rowSpan || 1}
            colSpan={colSpan || 1}
            style={cellStyle}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
        >
            {/* Cell Coordinates */}
            <Badge bg="secondary" className="position-absolute top-0 start-0 small">
                {String.fromCharCode(65 + colIndex)}{rowIndex + 1}
            </Badge>

            {/* Merge Indicators */}
            {isMerged && !isMasterCell && (
                <div className="text-center text-muted">
                    <small>Part of merge</small>
                </div>
            )}

            {isMasterCell && (
                <div className="text-center">
                    <Badge bg="primary" className="mb-1">Merged</Badge>
                </div>
            )}

            {/* Cell Content */}
            {!isMerged || isMasterCell ? (
                <>
                    <div className="d-flex justify-content-between align-items-start mb-1">
                        <div className="flex-grow-1">
                            {isEditing ? (
                                <div className="small">
                                    <Form.Select
                                        size="sm"
                                        value={cell.contentType || 'text'}
                                        onChange={(e) => {
                                            onUpdate(rowIndex, colIndex, 'contentType', e.target.value);
                                            setIsEditing(false);
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <option value="text">📝 Text</option>
                                        <option value="news">📰 News</option>
                                        <option value="image">🖼️ Image</option>
                                        <option value="video">🎥 Video</option>
                                        <option value="ad">📢 Ad</option>
                                    </Form.Select>
                                    <Form.Control
                                        size="sm"
                                        type="text"
                                        placeholder="Tag"
                                        value={cell.tag || ''}
                                        onChange={(e) => onUpdate(rowIndex, colIndex, 'tag', e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                        className="mt-1"
                                    />
                                </div>
                            ) : (
                                <div
                                    className="text-center p-1"
                                    onDoubleClick={() => setIsEditing(true)}
                                >
                                    <div className="small fw-bold">
                                        {cell.contentType === 'text' && '📝 Text'}
                                        {cell.contentType === 'news' && '📰 News'}
                                        {cell.contentType === 'image' && '🖼️ Image'}
                                        {cell.contentType === 'video' && '🎥 Video'}
                                        {cell.contentType === 'ad' && '📢 Ad'}
                                    </div>
                                    {cell.tag && (
                                        <Badge bg="info" className="small mt-1">
                                            {cell.tag}
                                        </Badge>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Merge Controls */}
                    {showMergeControls && (
                        <div className="position-absolute bottom-0 end-0 d-flex gap-1 p-1">
                            {!isMerged ? (
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Merge selected cells</Tooltip>}
                                >
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={handleMerge}
                                    >
                                        🔗
                                    </Button>
                                </OverlayTrigger>
                            ) : (
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Split merged cells</Tooltip>}
                                >
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={handleSplit}
                                    >
                                        🔓
                                    </Button>
                                </OverlayTrigger>
                            )}
                        </div>
                    )}
                </>
            ) : null}

            {/* Selection Indicator */}
            {isSelected && (
                <div className="position-absolute top-0 end-0 p-1">
                    <Badge bg="success">✓</Badge>
                </div>
            )}
        </td>
    );
};

// Merge Controls Component
// Enhanced MergeControls component
const MergeControls = ({ selectedCells, selectedRange, onMerge, onClearSelection }) => {
    if (selectedCells.size === 0) return null;

    const cellCount = selectedCells.size;

    return (
        <Card className="mb-3">
            <Card.Body className="py-2">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <Badge bg="primary" className="me-2">
                            {cellCount} {cellCount === 1 ? 'Cell' : 'Cells'} Selected
                        </Badge>
                        {selectedRange && (
                            <small className="text-muted">
                                Range: {String.fromCharCode(65 + selectedRange.startCol)}
                                {selectedRange.startRow + 1} to {String.fromCharCode(65 + selectedRange.endCol)}
                                {selectedRange.endRow + 1}
                            </small>
                        )}
                    </div>
                    <div>
                        {cellCount > 1 && (
                            <Button
                                variant="success"
                                size="sm"
                                className="me-2"
                                onClick={() => onMerge('merge')}
                            >
                                🔗 Merge {cellCount} Cells
                            </Button>
                        )}
                        <Button
                            variant="warning"
                            size="sm"
                            className="me-2"
                            onClick={() => onMerge('split')}
                        >
                            🔓 Split Merged Cells
                        </Button>
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={onClearSelection}
                        >
                            Clear Selection
                        </Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

// Enhanced Excel Grid Section Component with Multi-Selection
const ExcelGridSection = ({
    section,
    sectionIndex,
    onUpdateSection,
    onAddRow,
    onAddColumn,
    onDeleteRow,
    onDeleteColumn,
    onUpdateCell,
    onMergeCells
}) => {
    const [selectedCells, setSelectedCells] = useState(new Set()); // Store multiple selected cells
    const [selectionStart, setSelectionStart] = useState(null);
    const [isSelecting, setIsSelecting] = useState(false);

    const rows = section.rows || [];
    const columns = rows[0]?.columns || [];

    // Add this helper function to ExcelGridSection
    const getSelectedRange = () => {
        if (selectedCells.size === 0) return null;

        const cellsArray = Array.from(selectedCells).map(key => {
            const [row, col] = key.split('-').map(Number);
            return { row, col };
        });

        const rows = cellsArray.map(cell => cell.row);
        const cols = cellsArray.map(cell => cell.col);

        return {
            startRow: Math.min(...rows),
            startCol: Math.min(...cols),
            endRow: Math.max(...rows),
            endCol: Math.max(...cols),
            cells: cellsArray
        };
    };

    // Handle cell selection with Shift key for multi-selection
    const handleCellSelect = (rowIndex, colIndex, event) => {
        const cellKey = `${rowIndex}-${colIndex}`;

        if (event.shiftKey && selectionStart) {
            // Range selection with Shift key
            handleRangeSelection(rowIndex, colIndex);
        } else if (event.ctrlKey || event.metaKey) {
            // Add/remove from selection with Ctrl/Cmd key
            handleMultiSelection(cellKey);
        } else {
            // Single selection
            handleSingleSelection(rowIndex, colIndex, cellKey);
        }
    };

    // Single cell selection
    const handleSingleSelection = (rowIndex, colIndex, cellKey) => {
        setSelectionStart({ row: rowIndex, col: colIndex });
        setSelectedCells(new Set([cellKey]));
    };

    // Multi-cell selection with Ctrl/Cmd
    const handleMultiSelection = (cellKey) => {
        const newSelectedCells = new Set(selectedCells);
        if (newSelectedCells.has(cellKey)) {
            newSelectedCells.delete(cellKey); // Deselect if already selected
        } else {
            newSelectedCells.add(cellKey); // Add to selection
        }
        setSelectedCells(newSelectedCells);
    };

    // Range selection with Shift key
    const handleRangeSelection = (rowIndex, colIndex) => {
        if (!selectionStart) return;

        const startRow = Math.min(selectionStart.row, rowIndex);
        const startCol = Math.min(selectionStart.col, colIndex);
        const endRow = Math.max(selectionStart.row, rowIndex);
        const endCol = Math.max(selectionStart.col, colIndex);

        const newSelectedCells = new Set();

        // Add all cells in the rectangular range
        for (let r = startRow; r <= endRow; r++) {
            for (let c = startCol; c <= endCol; c++) {
                const cellKey = `${r}-${c}`;
                // Check if cell is not part of an existing merge or is master cell
                const mergeInfo = getCellMergeInfo(r, c);
                if (!mergeInfo.isMerged || mergeInfo.isMasterCell) {
                    newSelectedCells.add(cellKey);
                }
            }
        }

        setSelectedCells(newSelectedCells);
    };

    // Mouse drag selection
    const handleMouseDown = (rowIndex, colIndex) => {
        const cellKey = `${rowIndex}-${colIndex}`;
        setSelectionStart({ row: rowIndex, col: colIndex });
        setIsSelecting(true);
        setSelectedCells(new Set([cellKey]));
    };

    const handleMouseEnter = (rowIndex, colIndex) => {
        if (isSelecting && selectionStart) {
            handleRangeSelection(rowIndex, colIndex);
        }
    };

    const handleMouseUp = () => {
        setIsSelecting(false);
    };

    // Initialize merge data (keep your existing function)
    const initializeMergeData = () => {
        const mergeMap = new Map();
        rows.forEach((row, rowIndex) => {
            row.columns.forEach((cell, colIndex) => {
                const cellKey = `${rowIndex}-${colIndex}`;
                if (cell.merged && cell.masterCell) {
                    mergeMap.set(cellKey, {
                        isMaster: true,
                        rowSpan: cell.rowSpan || 1,
                        colSpan: cell.colSpan || 1,
                        mergedCells: cell.mergedCells || []
                    });
                } else if (cell.merged && cell.masterCellKey) {
                    mergeMap.set(cellKey, {
                        isMaster: false,
                        masterCellKey: cell.masterCellKey
                    });
                }
            });
        });
        return mergeMap;
    };

    const mergeData = initializeMergeData();

    // Enhanced merge function
    const handleMerge = (action) => {
        if (action === 'merge' && selectedCells.size > 1) {
            // Convert selected cells to array and get bounds
            const cellsArray = Array.from(selectedCells).map(key => {
                const [row, col] = key.split('-').map(Number);
                return { row, col };
            });

            // Calculate selection bounds
            const rows = cellsArray.map(cell => cell.row);
            const cols = cellsArray.map(cell => cell.col);
            const startRow = Math.min(...rows);
            const startCol = Math.min(...cols);
            const endRow = Math.max(...rows);
            const endCol = Math.max(...cols);

            // Validate selection is rectangular
            const expectedCellCount = (endRow - startRow + 1) * (endCol - startCol + 1);
            if (cellsArray.length !== expectedCellCount) {
                alert('Please select a rectangular area for merging.');
                return;
            }

            onMergeCells(sectionIndex, {
                action: 'merge',
                startRow,
                startCol,
                endRow,
                endCol,
                cells: cellsArray
            });

            clearSelection();

        } else if (action === 'split') {
            // Split the first merged cell found in selection
            const selectedCellKeys = Array.from(selectedCells);
            for (const cellKey of selectedCellKeys) {
                const [row, col] = cellKey.split('-').map(Number);
                const mergeInfo = mergeData.get(cellKey);
                if (mergeInfo?.isMaster) {
                    onMergeCells(sectionIndex, {
                        action: 'split',
                        row: row,
                        col: col
                    });
                    break;
                }
            }
            clearSelection();
        }
    };

    const clearSelection = () => {
        setSelectedCells(new Set());
        setSelectionStart(null);
        setIsSelecting(false);
    };

    const getCellMergeInfo = (rowIndex, colIndex) => {
        const cellKey = `${rowIndex}-${colIndex}`;
        const mergeInfo = mergeData.get(cellKey);

        if (!mergeInfo) {
            return {
                isMerged: false,
                isMasterCell: false,
                rowSpan: 1,
                colSpan: 1,
                showMergeControls: true
            };
        }

        if (mergeInfo.isMaster) {
            return {
                isMerged: true,
                isMasterCell: true,
                rowSpan: mergeInfo.rowSpan,
                colSpan: mergeInfo.colSpan,
                showMergeControls: true
            };
        } else {
            return {
                isMerged: true,
                isMasterCell: false,
                rowSpan: 1,
                colSpan: 1,
                showMergeControls: false
            };
        }
    };

    const isCellSelected = (rowIndex, colIndex) => {
        const cellKey = `${rowIndex}-${colIndex}`;
        return selectedCells.has(cellKey);
    };

    // Add event listeners
    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        return () => document.removeEventListener('mouseup', handleMouseUp);
    }, [isSelecting]);

    return (
        <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
                <h6 className="mb-0">
                    {section.name || `Section ${sectionIndex + 1}`}
                    <Badge bg="secondary" className="ms-2">
                        {rows.length} × {columns.length}
                    </Badge>
                </h6>
                <div>
                    <Button
                        variant="outline-success"
                        size="sm"
                        className="me-2"
                        onClick={() => onAddRow(sectionIndex)}
                    >
                        + Add Row
                    </Button>
                    <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => onAddColumn(sectionIndex)}
                    >
                        + Add Column
                    </Button>
                </div>
            </Card.Header>
            <Card.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Section Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={section.name || `Section ${sectionIndex + 1}`}
                        onChange={(e) => onUpdateSection(sectionIndex, 'name', e.target.value)}
                    />
                </Form.Group>

                {/* Enhanced Merge Controls */}
                <MergeControls
                    selectedCells={selectedCells}
                    selectedRange={getSelectedRange()}
                    onMerge={handleMerge}
                    onClearSelection={clearSelection}
                />

                {/* Selection Instructions */}
                <div className="alert alert-info small">
                    <strong>Selection Tips:</strong>
                    <ul className="mb-0">
                        <li>Click: Select single cell</li>
                        <li>Ctrl+Click: Add/remove from selection</li>
                        <li>Shift+Click: Select rectangular range</li>
                        <li>Click and drag: Select multiple cells</li>
                    </ul>
                </div>

                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th style={{ width: '60px' }} className="text-center bg-light"></th>
                                {columns.map((_, colIndex) => (
                                    <th key={colIndex} className="text-center position-relative bg-light">
                                        <span className="fw-bold">{String.fromCharCode(65 + colIndex)}</span>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            className="position-absolute end-0 top-0"
                                            onClick={() => onDeleteColumn(sectionIndex, colIndex)}
                                            disabled={columns.length <= 1}
                                        >
                                            ×
                                        </Button>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td className="text-center fw-bold position-relative bg-light">
                                        <span>{rowIndex + 1}</span>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            className="position-absolute end-0 top-0"
                                            onClick={() => onDeleteRow(sectionIndex, rowIndex)}
                                            disabled={rows.length <= 1}
                                        >
                                            ×
                                        </Button>
                                    </td>
                                    {row.columns.map((cell, colIndex) => {
                                        const mergeInfo = getCellMergeInfo(rowIndex, colIndex);

                                        // Skip rendering if this cell is part of a merge but not the master
                                        if (mergeInfo.isMerged && !mergeInfo.isMasterCell) {
                                            return null;
                                        }

                                        return (
                                            <GridCell
                                                key={`${rowIndex}-${colIndex}`}
                                                cell={cell}
                                                rowIndex={rowIndex}
                                                colIndex={colIndex}
                                                onUpdate={onUpdateCell}
                                                onMerge={handleMerge}
                                                isSelected={isCellSelected(rowIndex, colIndex)}
                                                onCellSelect={handleCellSelect}
                                                onMouseDown={handleMouseDown}
                                                onMouseEnter={handleMouseEnter}
                                                {...mergeInfo}
                                            />
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="d-flex gap-2 mt-3">
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => onAddRow(sectionIndex)}
                    >
                        + Add Row Below
                    </Button>
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => onAddColumn(sectionIndex)}
                    >
                        + Add Column Right
                    </Button>
                    <Button
                        variant="outline-info"
                        size="sm"
                        onClick={clearSelection}
                    >
                        Clear Selection ({selectedCells.size})
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

// Helper function to create new section with grid
function createNewSection(rows = 3, columns = 3) {
    const sectionRows = [];

    for (let i = 0; i < rows; i++) {
        const row = {
            rowOrder: i + 1,
            columns: []
        };

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

    return {
        layoutType: 'grid',
        name: `Section ${Date.now()}`,
        rows: sectionRows
    };
}

// Enhanced merge functionality in main component
const PageLayoutDashboard = () => {
    const { token, isLoggedIn, LogoutUser } = useAuth();
    const [pages, setPages] = useState([]);
    const [selectedPage, setSelectedPage] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });
    const [loading, setLoading] = useState(true);

    const [newPage, setNewPage] = useState({
        name: '',
        sections: [createNewSection(3, 3)] // Start with 3x3 grid
    });

    const [editPage, setEditPage] = useState(null);

    // Axios configuration
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

    // Fetch all pages
    const fetchPages = async () => {
        try {
            setLoading(true);
            const response = await api.get('/layout');
            setPages(response.data);
        } catch (error) {
            console.error('Error fetching pages:', error);
            if (error.response?.status !== 401) {
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
                sections: [createNewSection(3, 3)]
            });
            fetchPages();
        } catch (error) {
            console.error('Error creating page:', error);
            showAlert(error.response?.data?.message || 'Error creating page', 'danger');
        }
    };

    // Fetch page layout for editing
    const fetchPageForEdit = async (pageId) => {
        try {
            const response = await api.get(`/layout/${pageId}`);
            const pageData = response.data;

            // Normalize data structure for grid
            if (pageData.PageSections) {
                pageData.PageSections = pageData.PageSections.map((section, index) => {
                    const rows = section.Rows || section.rows || [];

                    return {
                        ...section,
                        id: section.id || `section-${index}`,
                        rows: rows.map(row => ({
                            ...row,
                            columns: (row.Columns || row.columns || []).map(col => ({
                                ...col,
                                merged: col.merged || false,
                                rowSpan: col.rowSpan || 1,
                                colSpan: col.colSpan || 1
                            }))
                        }))
                    };
                });
            }

            setEditPage(pageData);
            setShowEditModal(true);
        } catch (error) {
            console.error('Error fetching page for edit:', error);
            showAlert('Error loading page for editing', 'danger');
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

    // Grid manipulation functions for Edit Modal
    const addGridRow = (sectionIndex) => {
        if (!editPage?.PageSections) return;

        const updatedSections = [...editPage.PageSections];
        const section = updatedSections[sectionIndex];
        const columnCount = section.rows[0]?.columns.length || 3;

        const newRow = {
            rowOrder: section.rows.length + 1,
            columns: []
        };

        for (let i = 0; i < columnCount; i++) {
            newRow.columns.push({
                colOrder: i + 1,
                contentType: 'text',
                tag: '',
                width: Math.floor(12 / columnCount),
                merged: false,
                rowSpan: 1,
                colSpan: 1
            });
        }

        section.rows.push(newRow);
        setEditPage({ ...editPage, PageSections: updatedSections });
    };

    const addGridColumn = (sectionIndex) => {
        if (!editPage?.PageSections) return;

        const updatedSections = [...editPage.PageSections];
        const section = updatedSections[sectionIndex];

        section.rows.forEach(row => {
            row.columns.push({
                colOrder: row.columns.length + 1,
                contentType: 'text',
                tag: '',
                width: Math.floor(12 / (row.columns.length + 1)),
                merged: false,
                rowSpan: 1,
                colSpan: 1
            });
        });

        setEditPage({ ...editPage, PageSections: updatedSections });
    };

    const deleteGridRow = (sectionIndex, rowIndex) => {
        if (!editPage?.PageSections) return;

        const updatedSections = [...editPage.PageSections];
        const section = updatedSections[sectionIndex];

        if (section.rows.length > 1) {
            section.rows.splice(rowIndex, 1);
            // Update row orders
            section.rows.forEach((row, index) => {
                row.rowOrder = index + 1;
            });
            setEditPage({ ...editPage, PageSections: updatedSections });
        }
    };

    const deleteGridColumn = (sectionIndex, colIndex) => {
        if (!editPage?.PageSections) return;

        const updatedSections = [...editPage.PageSections];
        const section = updatedSections[sectionIndex];

        if (section.rows[0].columns.length > 1) {
            section.rows.forEach(row => {
                row.columns.splice(colIndex, 1);
                // Update column orders
                row.columns.forEach((col, index) => {
                    col.colOrder = index + 1;
                    col.width = Math.floor(12 / row.columns.length);
                });
            });
            setEditPage({ ...editPage, PageSections: updatedSections });
        }
    };

    const updateGridCell = (sectionIndex, rowIndex, colIndex, field, value) => {
        if (!editPage?.PageSections) return;

        const updatedSections = [...editPage.PageSections];
        const cell = updatedSections[sectionIndex].rows[rowIndex].columns[colIndex];

        if (cell) {
            cell[field] = value;
            setEditPage({ ...editPage, PageSections: updatedSections });
        }
    };

    // Enhanced merge cells function
    const mergeGridCells = (sectionIndex, mergeData) => {
        if (!editPage?.PageSections) return;

        const updatedSections = [...editPage.PageSections];
        const section = updatedSections[sectionIndex];

        if (mergeData.action === 'merge') {
            const { startRow, startCol, endRow, endCol, cells } = mergeData;

            // Validate merge area (must be rectangular and not overlap existing merges)
            const rowsToMerge = endRow - startRow + 1;
            const colsToMerge = endCol - startCol + 1;

            // Set master cell
            const masterCell = section.rows[startRow].columns[startCol];
            masterCell.merged = true;
            masterCell.masterCell = true;
            masterCell.rowSpan = rowsToMerge;
            masterCell.colSpan = colsToMerge;
            masterCell.mergedCells = cells.slice(1); // All cells except the master

            // Mark other cells as merged and reference master
            for (let r = startRow; r <= endRow; r++) {
                for (let c = startCol; c <= endCol; c++) {
                    if (r === startRow && c === startCol) continue; // Skip master cell

                    const cell = section.rows[r].columns[c];
                    cell.merged = true;
                    cell.masterCell = false;
                    cell.masterCellKey = `${startRow}-${startCol}`;
                }
            }

        } else if (mergeData.action === 'split') {
            const { row, col } = mergeData;
            const masterCell = section.rows[row].columns[col];

            if (masterCell.merged && masterCell.masterCell) {
                // Reset master cell
                masterCell.merged = false;
                masterCell.masterCell = false;
                masterCell.rowSpan = 1;
                masterCell.colSpan = 1;

                // Reset all merged cells
                if (masterCell.mergedCells) {
                    masterCell.mergedCells.forEach(({ row: r, col: c }) => {
                        const cell = section.rows[r].columns[c];
                        cell.merged = false;
                        cell.masterCell = false;
                        delete cell.masterCellKey;
                    });
                }

                delete masterCell.mergedCells;
            }
        }

        setEditPage({ ...editPage, PageSections: updatedSections });
    };

    // Enhanced update function to handle merge data
    const updatePage = async () => {
        try {
            const updateData = {
                name: editPage.name,
                PageSections: editPage.PageSections.map((section, sectionIndex) => {
                    const processedSection = {
                        layoutType: section.layoutType || 'grid',
                        name: section.name || `Section ${sectionIndex + 1}`,
                        rows: []
                    };

                    // Process rows and handle merged cells
                    const rows = section.rows || [];
                    processedSection.rows = rows.map((row, rowIndex) => ({
                        rowOrder: row.rowOrder || rowIndex + 1,
                        columns: (row.columns || []).map((column, colIndex) => {
                            const cellData = {
                                colOrder: column.colOrder || colIndex + 1,
                                width: column.width || Math.floor(12 / (row.columns?.length || 3)),
                                contentType: column.contentType || 'text',
                                tag: column.tag || '',
                                merged: column.merged || false,
                                rowSpan: column.rowSpan || 1,
                                colSpan: column.colSpan || 1
                            };

                            // Add merge-specific data
                            if (column.merged) {
                                cellData.masterCell = column.masterCell || false;
                                if (column.masterCellKey) {
                                    cellData.masterCellKey = column.masterCellKey;
                                }
                                if (column.mergedCells) {
                                    cellData.mergedCells = column.mergedCells;
                                }
                            }

                            return cellData;
                        })
                    }));

                    return processedSection;
                })
            };

            const response = await api.patch(`/layout/${editPage.id}`, updateData);
            showAlert('Page updated successfully!', 'success');
            setShowEditModal(false);
            setEditPage(null);

            setTimeout(() => {
                fetchPages();
                if (selectedPage?.id === editPage.id) {
                    fetchPageLayout(editPage.id);
                }
            }, 1000);

        } catch (error) {
            console.error('Error updating page:', error);
            showAlert(error.response?.data?.message || 'Error updating page', 'danger');
        }
    };

    // UseEffects
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
        <Container fluid className="py-4 custom-font-initial">
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
                                            className={`list-group-item list-group-item-action ${selectedPage?.id === page.id ? 'active' : ''}`}
                                            onClick={() => fetchPageLayout(page.id)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span>{page.name}</span>
                                                <div>
                                                    <Button
                                                        variant="outline-primary"
                                                        size="sm"
                                                        className="me-2"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            fetchPageForEdit(page.id);
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
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
                                            <Nav.Link eventKey="preview">Grid Preview</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="json">JSON Data</Nav.Link>
                                        </Nav.Item>
                                    </Nav>

                                    <Tab.Content>
                                        <Tab.Pane eventKey="preview">
                                            {selectedPage.PageSections?.map((section, sectionIndex) => (
                                                <div key={sectionIndex} className="mb-4">
                                                    <h5>{section.name || `Section ${sectionIndex + 1}`}</h5>
                                                    <div className="table-responsive">
                                                        <table className="table table-bordered">
                                                            <tbody>
                                                                {section.Rows?.map((row, rowIndex) => (
                                                                    <tr key={rowIndex}>
                                                                        {row.Columns?.map((column, colIndex) => (
                                                                            <td
                                                                                key={colIndex}
                                                                                className="p-3"
                                                                                rowSpan={column.rowSpan || 1}
                                                                                colSpan={column.colSpan || 1}
                                                                            >
                                                                                <div className="d-flex justify-content-between">
                                                                                    <strong>{column.contentType}</strong>
                                                                                    {column.tag && <Badge bg="info">{column.tag}</Badge>}
                                                                                </div>
                                                                                <small className="text-muted">
                                                                                    Size: {column.width}/12
                                                                                </small>
                                                                            </td>
                                                                        ))}
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
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
            <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} size="lg" className='custom-font-initial'>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Page</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Page Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter page name"
                                value={newPage.name}
                                onChange={(e) => setNewPage({ ...newPage, name: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Initial Grid Size</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Label>Rows</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={3}
                                        onChange={(e) => setNewPage({
                                            ...newPage,
                                            sections: [createNewSection(parseInt(e.target.value), newPage.sections[0].rows[0].columns.length)]
                                        })}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>Columns</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={3}
                                        onChange={(e) => setNewPage({
                                            ...newPage,
                                            sections: [createNewSection(newPage.sections[0].rows.length, parseInt(e.target.value))]
                                        })}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
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

            {/* Edit Page Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="xl" className='custom-font-initial' style={{ maxWidth: '95vw' }}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Page: {editPage?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Page Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={editPage?.name || ''}
                                onChange={(e) => setEditPage({ ...editPage, name: e.target.value })}
                            />
                        </Form.Group>

                        {editPage?.PageSections?.map((section, sectionIndex) => (
                            <ExcelGridSection
                                key={section.id || sectionIndex}
                                section={section}
                                sectionIndex={sectionIndex}
                                onUpdateSection={(idx, field, value) => {
                                    const updatedSections = [...editPage.PageSections];
                                    updatedSections[idx][field] = value;
                                    setEditPage({ ...editPage, PageSections: updatedSections });
                                }}
                                onAddRow={addGridRow}
                                onAddColumn={addGridColumn}
                                onDeleteRow={deleteGridRow}
                                onDeleteColumn={deleteGridColumn}
                                onUpdateCell={updateGridCell}
                                onMergeCells={mergeGridCells}
                            />
                        ))}

                        <Button
                            variant="outline-primary"
                            onClick={() => {
                                const newSection = createNewSection(3, 3);
                                setEditPage({
                                    ...editPage,
                                    PageSections: [...editPage.PageSections, newSection]
                                });
                            }}
                        >
                            + Add New Section
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={updatePage}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default PageLayoutDashboard;