import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container, Row, Col, Card, ListGroup, Spinner,
    Modal, Button, Carousel, Pagination
} from 'react-bootstrap';
import { toast } from 'react-toastify';

const PhotoGallery = () => {
    const [albums, setAlbums] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [selectedAlbumId, setSelectedAlbumId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [photoLoading, setPhotoLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
    const [albumPhotoCounts, setAlbumPhotoCounts] = useState({});

    // Pagination states
    const [currentAlbumPage, setCurrentAlbumPage] = useState(1);
    const [currentPhotoPage, setCurrentPhotoPage] = useState(1);
    const albumsPerPage = 12;
    const photosPerPage = 12;

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const ALBUM_API = `${API_BASE_URL}/api/albums`;
    const PHOTO_API = `${API_BASE_URL}/api/photos`;

    // Calculate pagination indexes
    const indexOfLastAlbum = currentAlbumPage * albumsPerPage;
    const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
    const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);
    const totalAlbumPages = Math.ceil(albums.length / albumsPerPage);

    const indexOfLastPhoto = currentPhotoPage * photosPerPage;
    const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
    const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);
    const totalPhotoPages = Math.ceil(photos.length / photosPerPage);

    // Fetch albums and photo counts
    useEffect(() => {
        const fetchAlbums = async () => {
            setLoading(true);
            try {
                const res = await axios.get(ALBUM_API);
                setAlbums(res.data);

                // Initialize photo counts and select first album if available
                const counts = {};
                for (const album of res.data) {
                    try {
                        const photosRes = await axios.get(`${PHOTO_API}/${album._id}`);
                        counts[album._id] = photosRes.data.length;

                        // Select the first album
                        if (res.data.length > 0 && !selectedAlbumId) {
                            setSelectedAlbumId(res.data[0]._id);
                        }
                    } catch (err) {
                        counts[album._id] = 0;
                        console.error(`Error fetching photos for album ${album._id}:`, err);
                    }
                }
                setAlbumPhotoCounts(counts);
            } catch (err) {
                toast.error('Failed to load albums');
                console.error('Error fetching albums:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAlbums();
    }, []);

    // Fetch photos when album is selected
    useEffect(() => {
        const fetchPhotos = async () => {
            if (selectedAlbumId) {
                setPhotoLoading(true);
                setPhotos([]);
                setCurrentPhotoPage(1); // Reset to first page when album changes
                try {
                    const res = await axios.get(`${PHOTO_API}/${selectedAlbumId}`);
                    setPhotos(res.data);
                } catch (err) {
                    toast.error('Failed to load photos');
                    console.error('Error fetching photos:', err);
                } finally {
                    setPhotoLoading(false);
                }
            }
        };
        fetchPhotos();
    }, [selectedAlbumId]);

    const handlePhotoClick = (index) => {
        // Adjust index based on pagination
        const actualIndex = indexOfFirstPhoto + index;
        setSelectedPhotoIndex(actualIndex);
        setShowModal(true);
    };

    const getSelectedAlbumTitle = () => {
        const album = albums.find(a => a._id === selectedAlbumId);
        return album ? album.name : 'Selected Album';
    };

    // Pagination controls
    const renderAlbumPagination = () => {
        if (albums.length <= albumsPerPage) return null;

        return (
            <div className="d-flex justify-content-center mt-3">
                <Pagination>
                    <Pagination.Prev
                        onClick={() => setCurrentAlbumPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentAlbumPage === 1}
                    />
                    {Array.from({ length: totalAlbumPages }, (_, i) => (
                        <Pagination.Item
                            key={i + 1}
                            active={i + 1 === currentAlbumPage}
                            onClick={() => setCurrentAlbumPage(i + 1)}
                        >
                            {i + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next
                        onClick={() => setCurrentAlbumPage(prev => Math.min(prev + 1, totalAlbumPages))}
                        disabled={currentAlbumPage === totalAlbumPages}
                    />
                </Pagination>
            </div>
        );
    };

    const renderPhotoPagination = () => {
        if (photos.length <= photosPerPage || !selectedAlbumId) return null;

        return (
            <div className="d-flex justify-content-center mt-3">
                <Pagination>
                    <Pagination.Prev
                        onClick={() => setCurrentPhotoPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPhotoPage === 1}
                    />
                    {Array.from({ length: totalPhotoPages }, (_, i) => (
                        <Pagination.Item
                            key={i + 1}
                            active={i + 1 === currentPhotoPage}
                            onClick={() => setCurrentPhotoPage(i + 1)}
                        >
                            {i + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next
                        onClick={() => setCurrentPhotoPage(prev => Math.min(prev + 1, totalPhotoPages))}
                        disabled={currentPhotoPage === totalPhotoPages}
                    />
                </Pagination>
            </div>
        );
    };

    return (
        <div className='custom-bgcolor photography' id='photography'>
            <Container >

                <Row>
                    {/* Album List */}
                    <Col md={3} className="mb-3">
                        <h2 className="subheading">ফটোগ্রাফি</h2>
                        <h5 className="mainheading mb-3">অ্যালবাম</h5>
                        {loading ? (
                            <div className="text-center">
                                <Spinner animation="border" />
                            </div>
                        ) : (
                            <>
                                <ListGroup>
                                    {currentAlbums.map((album) => (
                                        <ListGroup.Item
                                            key={album._id}
                                            action
                                            active={selectedAlbumId === album._id}
                                            onClick={() => setSelectedAlbumId(album._id)}
                                            className="d-flex justify-content-between align-items-center"
                                        >
                                            {album.name}
                                            <span className="badge bg-green rounded-pill">
                                                {albumPhotoCounts[album._id] || 0}
                                            </span>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                                {renderAlbumPagination()}
                            </>
                        )}
                    </Col>

                    {/* Photo Grid */}
                    <Col md={9} className='margin-photo'>
                        {selectedAlbumId ? (
                            <>

                                {photoLoading ? (
                                    <div className="text-center">
                                        <Spinner animation="border" />
                                        <p>Loading photos...</p>
                                    </div>
                                ) : photos.length > 0 ? (
                                    <>
                                        <Row>
                                            {currentPhotos.map((photo, index) => (
                                                <Col
                                                    key={photo._id}
                                                    xs={6}  // 2 columns on mobile (extra small devices)
                                                    sm={6}  // 2 columns on small devices
                                                    md={4}  // 3 columns on medium devices
                                                    lg={3}  // 4 columns on large devices
                                                    className="mb-4"
                                                >
                                                    <Card className="h-100" onClick={() => handlePhotoClick(index)}>
                                                        <Card.Img
                                                            variant="top"
                                                            src={`${API_BASE_URL}/${photo.imageUrl}`}
                                                            style={{
                                                                height: '180px',
                                                                objectFit: 'cover',
                                                                cursor: 'pointer'
                                                            }}
                                                        />
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                        {renderPhotoPagination()}
                                    </>
                                ) : (
                                    <div className="text-center text-muted py-5">
                                        <p>No photos found in this album.</p>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center text-muted py-5">
                                <p>Please select an album to view photos</p>
                            </div>
                        )}
                    </Col>
                </Row>

                {/* Full-screen Image Modal */}
                <Modal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    size="lg"
                    centered

                >
                    <Modal.Header closeButton className="border-0 pb-0">
                        <Modal.Title className="text-center w-100">{getSelectedAlbumTitle()}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="text-center p-0" style={{ overflowY: 'auto', maxHeight: '80vh' }}>
                        <Carousel
                            activeIndex={selectedPhotoIndex}
                            onSelect={(index) => setSelectedPhotoIndex(index)}
                            interval={null}
                        >
                            {photos.map((photo) => (
                                <Carousel.Item key={photo._id}>
                                    <img
                                        className="img-fluid d-block mx-auto"
                                        src={`${API_BASE_URL}/${photo.imageUrl}`}
                                        alt=""
                                        style={{
                                            maxHeight: '65vh',
                                            objectFit: 'contain',
                                            width: '100%',
                                            padding: '1rem'
                                        }}
                                    />
                                    {photo.title && (
                                        <Carousel.Caption className="bg-dark bg-opacity-50 rounded">
                                            <p className="mb-0">{photo.title}</p>
                                        </Carousel.Caption>
                                    )}
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Modal.Body>

                    <Modal.Footer className="border-0 pt-0 d-flex justify-content-between">
                        <div>{selectedPhotoIndex + 1} of {photos.length}</div>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            বন্ধ করুন
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        </div>
    );
};

export default PhotoGallery;