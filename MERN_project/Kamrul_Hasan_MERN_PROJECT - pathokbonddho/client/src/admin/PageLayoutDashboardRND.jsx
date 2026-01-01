import React, { useState, useEffect } from 'react';
import {
    Container, Row, Col, Card, Button, Form, Modal, Alert,
    Tab, Nav, Spinner, Badge, OverlayTrigger, Tooltip, Image, InputGroup
} from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../store/auth'; // Make sure this path is correct
import { toast } from 'react-toastify';

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

const API_URL = `${import.meta.env.VITE_API_BASE_URL}`;

// Content Selection Modal Components
const NewsSelectionModal = ({ show, onClose, onSelect, token }) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (show) {
            fetchNews();
        }
    }, [show, currentPage, searchTerm]);

    const fetchNews = async () => {
        try {
            setLoading(true);
            const params = {
                page: currentPage,
                limit: 12,
                ...(searchTerm && { search: searchTerm })
            };
            const response = await axios.get(`${API_URL}/api/news`, { params });
            const newsData = response.data.news || response.data.rows || response.data.data || response.data || [];
            setNews(Array.isArray(newsData) ? newsData : []);
            setTotalPages(response.data.totalPages || 1);
        } catch (error) {
            console.error('Error fetching news:', error);
            toast.error('Failed to load news');
            setNews([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onClose} size="xl" className="custom-font-initial">
            <Modal.Header closeButton>
                <Modal.Title>Select News</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Search news..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>
                {loading ? (
                    <div className="text-center py-4">
                        <Spinner animation="border" />
                    </div>
                ) : (
                    <div className="row">
                        {news.map((item) => (
                            <div key={item.id} className="col-md-6 mb-3">
                                <Card
                                    className="h-100 cursor-pointer"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => onSelect(item)}
                                >
                                    <Card.Body>
                                        <h6 className="card-title">{item.newsHeadline}</h6>
                                        <p className="card-text small text-muted">
                                            {item.shortDescription?.substring(0, 100)}...
                                        </p>
                                        <Badge bg="secondary">{item.status}</Badge>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}
                {news.length === 0 && !loading && (
                    <div className="text-center text-muted py-4">No news found</div>
                )}
                {totalPages > 1 && (
                    <div className="d-flex justify-content-center mt-3">
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <span className="mx-3 align-self-center">
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
};

const ImageSelectionModal = ({ show, onClose, onSelect, token }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (show) {
            fetchImages();
        }
    }, [show, currentPage]);

    const fetchImages = async () => {
        try {
            setLoading(true);
            const params = {
                page: currentPage,
                limit: 12
            };
            const response = await axios.get(`${API_URL}/api/all/images`, {
                params,
                headers: { Authorization: `Bearer ${token}` }
            });
            const imagesData = response.data.images || [];
            setImages(imagesData);
            setTotalPages(response.data.pagination?.totalPages || 1);
        } catch (error) {
            console.error('Error fetching images:', error);
            toast.error('Failed to load images');
            setImages([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredImages = searchTerm
        ? images.filter(img =>
            img.filename?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            img.caption?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : images;

    return (
        <Modal show={show} onHide={onClose} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Select Image</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Search images..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>
                {loading ? (
                    <div className="text-center py-4">
                        <Spinner animation="border" />
                    </div>
                ) : (
                    <div className="row">
                        {filteredImages.map((img) => (
                            <div key={img.id} className="col-md-3 mb-3">
                                <Card
                                    className="h-100 cursor-pointer"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => onSelect(img)}
                                >
                                    <Image
                                        src={`${API_URL}/${img.imageUrl || img.image}`}
                                        className="card-img-top"
                                        style={{ height: '150px', objectFit: 'cover' }}
                                        onError={(e) => {
                                            e.target.src = '/placeholder-image.jpg';
                                        }}
                                    />
                                    <Card.Body className="p-2">
                                        <small className="text-truncate d-block" title={img.filename}>
                                            {img.filename}
                                        </small>
                                        {img.caption && (
                                            <small className="text-muted d-block text-truncate" title={img.caption}>
                                                {img.caption}
                                            </small>
                                        )}
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}
                {filteredImages.length === 0 && !loading && (
                    <div className="text-center text-muted py-4">No images found</div>
                )}
                {totalPages > 1 && (
                    <div className="d-flex justify-content-center mt-3">
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <span className="mx-3 align-self-center">
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
};

const VideoSelectionModal = ({ show, onClose, onSelect, token }) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (show) {
            fetchVideos();
        }
    }, [show]);

    const fetchVideos = async () => {
        try {
            setLoading(true);
            const newsApiUrl = `${API_URL}/api/news`;
            console.log('Fetching video content from news API:', newsApiUrl);
            console.log('Token available:', !!token);

            const response = await axios.get(newsApiUrl, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                    'Content-Type': 'application/json'
                }
            });

            console.log('News API response status:', response.status);
            console.log('News API response data:', response.data);

            // Extract news data from response
            let newsData = response.data.news || response.data.rows || response.data.data || response.data || [];

            // Filter news items to show only those with video category
            const videosData = newsData.filter(item => {
                if (item.Categories && Array.isArray(item.Categories)) {
                    return item.Categories.some(cat => cat.path === 'video');
                }
                return false;
            });

            console.log('Filtered video content count:', videosData.length);
            console.log('First video sample:', videosData[0]);
            setVideos(videosData);
        } catch (error) {
            console.error('Error fetching video content:', error);
            console.error('Error response:', error.response?.data);
            console.error('Error status:', error.response?.status);
            toast.error(`Failed to load video content: ${error.response?.data?.message || error.message}`);
            setVideos([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredVideos = searchTerm
        ? videos.filter(video =>
            video.newsHeadline?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            video.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : videos;

    return (
        <Modal show={show} onHide={onClose} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Select Video Content</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Search video content..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>
                {loading ? (
                    <div className="text-center py-4">
                        <Spinner animation="border" />
                    </div>
                ) : (
                    <div className="row">
                        {filteredVideos.map((video) => (
                            <div key={video.id} className="col-md-6 mb-3">
                                <Card
                                    className="h-100 cursor-pointer"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => onSelect(video)}
                                >
                                    {video.image && (
                                        <Image
                                            src={`${API_URL}/${video.image}`}
                                            className="card-img-top"
                                            style={{ height: '150px', objectFit: 'cover' }}
                                            onError={(e) => {
                                                e.target.src = '/placeholder-image.jpg';
                                            }}
                                        />
                                    )}
                                    <Card.Body>
                                        <h6 className="card-title">{video.newsHeadline}</h6>
                                        <p className="card-text small text-muted">
                                            {video.shortDescription?.substring(0, 100)}...
                                        </p>
                                        <div>
                                            <Badge bg="info" className="me-2">Video</Badge>
                                            <Badge bg="secondary">{video.status}</Badge>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}
                {filteredVideos.length === 0 && !loading && (
                    <div className="text-center text-muted py-4">No video content found</div>
                )}
            </Modal.Body>
        </Modal>
    );
};

const AdSelectionModal = ({ show, onClose, onSelect, token }) => {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (show) {
            fetchAds();
        }
    }, [show, currentPage, searchTerm]);

    const fetchAds = async () => {
        try {
            setLoading(true);
            const params = {
                page: currentPage,
                limit: 12,
                ...(searchTerm && { search: searchTerm })
            };
            const response = await axios.get(`${API_URL}/api/ads`, {
                params,
                headers: { Authorization: `Bearer ${token}` }
            });
            const adsData = response.data.ads || response.data.data || response.data || [];
            setAds(Array.isArray(adsData) ? adsData : []);
            setTotalPages(response.data.totalPages || Math.ceil(adsData.length / 12) || 1);
        } catch (error) {
            console.error('Error fetching ads:', error);
            toast.error('Failed to load ads');
            setAds([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onClose} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Select Ad</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Search ads..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>
                {loading ? (
                    <div className="text-center py-4">
                        <Spinner animation="border" />
                    </div>
                ) : (
                    <div className="row">
                        {ads.map((ad) => (
                            <div key={ad.id} className="col-md-6 mb-3">
                                <Card
                                    className="h-100 cursor-pointer"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => onSelect(ad)}
                                >
                                    {ad.image && (
                                        <Image
                                            src={`${API_URL}/uploads/${ad.image}`}
                                            className="card-img-top"
                                            style={{ height: '150px', objectFit: 'cover' }}
                                        />
                                    )}
                                    <Card.Body>
                                        <h6 className="card-title">{ad.title || ad.name}</h6>
                                        <p className="card-text small text-muted">
                                            {ad.description?.substring(0, 100)}...
                                        </p>
                                        <div>
                                            <Badge bg={ad.isActive ? 'success' : 'secondary'}>
                                                {ad.isActive ? 'Active' : 'Inactive'}
                                            </Badge>
                                            {ad.type && <Badge bg="info" className="ms-2">{ad.type}</Badge>}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}
                {ads.length === 0 && !loading && (
                    <div className="text-center text-muted py-4">No ads found</div>
                )}
                {totalPages > 1 && (
                    <div className="d-flex justify-content-center mt-3">
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <span className="mx-3 align-self-center">
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
};

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
    showMergeControls,
    onContentSelect,
    onMouseDown,
    onMouseEnter
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
                                            const newContentType = e.target.value;
                                            onUpdate(rowIndex, colIndex, 'contentType', newContentType);
                                            // Don't close editing mode immediately - let user select content first
                                            // If content type is not text, trigger content selection
                                            if (newContentType !== 'text' && onContentSelect) {
                                                // Small delay to ensure state is updated
                                                setTimeout(() => {
                                                    onContentSelect(rowIndex, colIndex, newContentType);
                                                }, 100);
                                            } else {
                                                setIsEditing(false);
                                            }
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
                                    {cell.contentType && cell.contentType !== 'text' && (
                                        <Button
                                            size="sm"
                                            variant="outline-primary"
                                            className="mt-1 w-100"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (onContentSelect) {
                                                    onContentSelect(rowIndex, colIndex, cell.contentType);
                                                }
                                            }}
                                        >
                                            {cell.contentId ? 'Change Selection' : 'Select Content'}
                                        </Button>
                                    )}
                                </div>
                            ) : (
                                <div
                                    className="text-center p-1"
                                    onDoubleClick={() => setIsEditing(true)}
                                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
                                >
                                    {/* Content Type Icon and Name */}
                                    <div className="small fw-bold" style={{ marginBottom: '4px' }}>
                                        {cell.contentType === 'text' && '📝 Text'}
                                        {cell.contentType === 'news' && '📰 News'}
                                        {cell.contentType === 'image' && '🖼️ Image'}
                                        {cell.contentType === 'video' && '🎥 Video'}
                                        {cell.contentType === 'ad' && '📢 Ad'}
                                        {!cell.contentType && '📝 Text'}
                                    </div>

                                    {/* Tag */}
                                    {cell.tag && (
                                        <Badge bg="info" className="small" style={{ marginBottom: '4px' }}>
                                            Tag: {cell.tag}
                                        </Badge>
                                    )}

                                    {/* Content Display for Non-Text Types */}
                                    {cell.contentType && cell.contentType !== 'text' && (
                                        <div style={{ marginTop: 'auto' }}>
                                            {cell.contentId ? (
                                                <>
                                                    <Badge bg="success" className="small d-block mb-1">
                                                        ✓ {cell.contentType}
                                                    </Badge>
                                                    {cell.contentTitle && (
                                                        <div
                                                            className="small text-break"
                                                            style={{
                                                                fontSize: '0.75rem',
                                                                backgroundColor: '#f0f0f0',
                                                                padding: '4px',
                                                                borderRadius: '3px',
                                                                marginBottom: '4px',
                                                                maxHeight: '40px',
                                                                overflowY: 'auto',
                                                                lineHeight: '1.2'
                                                            }}
                                                            title={cell.contentTitle}
                                                        >
                                                            {cell.contentTitle}
                                                        </div>
                                                    )}
                                                    {cell.contentId && (
                                                        <div className="small text-muted" style={{ fontSize: '0.65rem' }}>
                                                            ID: {cell.contentId}
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <Button
                                                    size="sm"
                                                    variant="outline-primary"
                                                    className="w-100"
                                                    style={{ fontSize: '0.7rem', padding: '4px 2px' }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (onContentSelect) {
                                                            onContentSelect(rowIndex, colIndex, cell.contentType);
                                                        }
                                                    }}
                                                >
                                                    Select {cell.contentType}
                                                </Button>
                                            )}
                                        </div>
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
    onUpdateCellContent,
    onMergeCells,
    token
}) => {
    const [selectedCells, setSelectedCells] = useState(new Set()); // Store multiple selected cells
    const [selectionStart, setSelectionStart] = useState(null);
    const [isSelecting, setIsSelecting] = useState(false);
    const [contentModal, setContentModal] = useState({
        show: false,
        contentType: null,
        rowIndex: null,
        colIndex: null
    });

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

    // Handle content selection
    const handleContentSelect = (rowIndex, colIndex, contentType) => {
        console.log('Opening content modal:', { rowIndex, colIndex, contentType });
        setContentModal({
            show: true,
            contentType,
            rowIndex,
            colIndex
        });
    };


    // Handle content selection from modal
    const handleContentSelected = (content) => {
        const { rowIndex, colIndex, contentType } = contentModal;

        if (!contentType) {
            console.error('No contentType in contentModal');
            return;
        }

        console.log('Content selected for saving:', {
            contentType,
            content,
            rowIndex,
            colIndex,
            contentId: content.id || content._id,
            contentTitle: content.newsHeadline || content.filename || content.title || content.name
        });

        // Extract content ID
        const contentId = content.id || content._id || content.ID;
        if (!contentId) {
            console.error('No content ID found:', content);
            toast.error('Selected content has no ID');
            return;
        }

        // Extract content title based on content type
        const contentTitle = contentType === 'news' ? content.newsHeadline :
            contentType === 'image' ? content.filename :
                contentType === 'video' ? content.newsHeadline :
                    contentType === 'ad' ? content.title : content.name;

        console.log('Updating cell with:', { contentType, contentId, contentTitle });

        // Call the update function
        if (onUpdateCellContent) {
            onUpdateCellContent(sectionIndex, rowIndex, colIndex, contentType, contentId, contentTitle);
        } else {
            console.error('onUpdateCellContent function not available');
            // Fallback: update fields individually
            onUpdateCell(sectionIndex, rowIndex, colIndex, 'contentType', contentType);
            onUpdateCell(sectionIndex, rowIndex, colIndex, 'contentId', contentId);
            onUpdateCell(sectionIndex, rowIndex, colIndex, 'contentTitle', contentTitle);
        }

        console.log('Update call completed');

        // Close modal
        setContentModal({ show: false, contentType: null, rowIndex: null, colIndex: null });
        toast.success(`${contentType} selected successfully!`);
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
                                                onContentSelect={handleContentSelect}
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

            {/* Content Selection Modals */}
            {contentModal.show && (
                <>
                    {contentModal.contentType === 'news' && (
                        <NewsSelectionModal
                            show={true}
                            onClose={() => setContentModal({ show: false, contentType: null, rowIndex: null, colIndex: null })}
                            onSelect={handleContentSelected}
                            token={token}
                        />
                    )}
                    {contentModal.contentType === 'image' && (
                        <ImageSelectionModal
                            show={true}
                            onClose={() => setContentModal({ show: false, contentType: null, rowIndex: null, colIndex: null })}
                            onSelect={handleContentSelected}
                            token={token}
                        />
                    )}
                    {contentModal.contentType === 'video' && (
                        <VideoSelectionModal
                            show={true}
                            onClose={() => setContentModal({ show: false, contentType: null, rowIndex: null, colIndex: null })}
                            onSelect={handleContentSelected}
                            token={token}
                        />
                    )}
                    {contentModal.contentType === 'ad' && (
                        <AdSelectionModal
                            show={true}
                            onClose={() => setContentModal({ show: false, contentType: null, rowIndex: null, colIndex: null })}
                            onSelect={handleContentSelected}
                            token={token}
                        />
                    )}
                </>
            )}
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
                                contentType: col.contentType || 'text',
                                contentId: col.contentId || null,
                                contentTitle: col.contentTitle || null,
                                tag: col.tag || '',
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
        if (!editPage?.PageSections) {
            console.warn('Cannot update cell: editPage.PageSections is not available');
            return;
        }

        console.log('Updating cell:', { sectionIndex, rowIndex, colIndex, field, value });

        // Create a deep copy of the sections to avoid mutation issues
        const updatedSections = JSON.parse(JSON.stringify(editPage.PageSections));

        // Navigate to the specific cell
        const cell = updatedSections[sectionIndex]?.rows?.[rowIndex]?.columns?.[colIndex];

        if (cell) {
            // Update the specific field
            cell[field] = value;

            // Log the updated cell for debugging
            console.log('Cell after update:', cell);

            // Update the state with the new sections
            setEditPage(prev => ({
                ...prev,
                PageSections: updatedSections
            }));
        } else {
            console.error('Cell not found:', { sectionIndex, rowIndex, colIndex });
        }
    };

    // Add this function in your main component (PageLayoutDashboard)
    const updateCellContent = (sectionIndex, rowIndex, colIndex, contentType, contentId, contentTitle) => {
        if (!editPage?.PageSections) {
            console.warn('Cannot update cell: editPage.PageSections is not available');
            return;
        }

        console.log('Batch updating cell content:', {
            sectionIndex, rowIndex, colIndex,
            contentType, contentId, contentTitle
        });

        // Create a deep copy of the sections
        const updatedSections = JSON.parse(JSON.stringify(editPage.PageSections));

        // Navigate to the specific cell
        const cell = updatedSections[sectionIndex]?.rows?.[rowIndex]?.columns?.[colIndex];

        if (cell) {
            // Update all content-related fields at once
            cell.contentType = contentType;
            cell.contentId = contentId;
            cell.contentTitle = contentTitle;

            // Add timestamp to track changes
            cell.updatedAt = new Date().toISOString();

            console.log('Cell fully updated:', cell);

            // Update the state
            setEditPage(prev => ({
                ...prev,
                PageSections: updatedSections
            }));

            // Force immediate re-render
            setTimeout(() => {
                console.log('Current cell state after update:',
                    editPage?.PageSections?.[sectionIndex]?.rows?.[rowIndex]?.columns?.[colIndex]);
            }, 0);

        } else {
            console.error('Cell not found:', { sectionIndex, rowIndex, colIndex });
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
            console.log('Starting page update with data:', editPage);

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

                            // Log each cell's content data
                            console.log(`Cell [${rowIndex},${colIndex}]:`, {
                                contentType: column.contentType,
                                contentId: column.contentId,
                                contentTitle: column.contentTitle
                            });

                            // Add content selection data
                            if (column.contentId) {
                                cellData.contentId = column.contentId;
                                cellData.contentTitle = column.contentTitle || '';
                            }

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

                    console.log(`Processed section ${sectionIndex}:`, processedSection);
                    return processedSection;
                })
            };

            console.log('Sending update to API:', JSON.stringify(updateData, null, 2));

            const response = await api.patch(`/layout/${editPage.id}`, updateData);

            console.log('API Response:', response.data);

            showAlert('Page updated successfully!', 'success');
            setShowEditModal(false);
            setEditPage(null);

            // Refresh data
            setTimeout(() => {
                fetchPages();
                if (selectedPage?.id === editPage.id) {
                    fetchPageLayout(editPage.id);
                }
            }, 1000);

        } catch (error) {
            console.error('Error updating page:', error);
            console.error('Error details:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            });
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
                                onUpdateCellContent={updateCellContent}
                                onMergeCells={mergeGridCells}
                                token={token}
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