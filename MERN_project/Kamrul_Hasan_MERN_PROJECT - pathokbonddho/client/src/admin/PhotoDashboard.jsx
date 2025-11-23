import React, { useEffect, useState } from "react";
import { Button, Table, Spinner, Image, Badge, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import PhotoFormModal from "./PhotoFormModal";
import ConfirmationModal from "./ConfirmationModal";
import { useAuth } from "../store/auth";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/photos`;
const IMAGES_API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/photos`; // New endpoint

const PhotoDashboard = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [editPhoto, setEditPhoto] = useState(null);
    const [confirmModalShow, setConfirmModalShow] = useState(false);
    const [imageToDelete, setImageToDelete] = useState(null);
    const [deleteFromFS, setDeleteFromFS] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { token } = useAuth();

    const fetchAllImages = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${IMAGES_API_URL}/all/images`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("All Images Response:", res.data);

            const imagesData = res.data.images || [];

            // Client-side pagination
            const startIndex = (page - 1) * 10;
            const paginatedImages = imagesData.slice(startIndex, startIndex + 10);

            setImages(paginatedImages);
            setTotalPages(Math.ceil(imagesData.length / 10) || 1);
        } catch (err) {
            toast.error("Failed to fetch images");
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllImages();
    }, [page]);

    const handleDelete = async () => {
        try {
            await axios.delete(`${IMAGES_API_URL}/${imageToDelete.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    deleteFromFS: deleteFromFS
                }
            });

            toast.success("Image deleted successfully");
            setConfirmModalShow(false);
            setDeleteFromFS(false);
            fetchAllImages();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete image");
            console.error("Delete error:", err);
        }
    };

    const handleAddToGallery = async (filename, caption = '', albumId = null) => {
        try {
            await axios.post(`${IMAGES_API_URL}/add-to-gallery`, {
                filename,
                caption,
                albumId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success("Image added to gallery");
            fetchAllImages();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to add image to gallery");
        }
    };

    const handlePhotoSubmit = async (photoData) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            };

            if (editPhoto) {
                await axios.patch(`${API_URL}/${editPhoto.id}`, photoData, config);
                toast.success("Photo updated successfully");
            } else {
                await axios.post(API_URL, photoData, config);
                toast.success("Photo created successfully");
            }
            setModalShow(false);
            fetchAllImages();
        } catch (err) {
            console.error("Submit error details:", err.response?.data);
            toast.error(err.response?.data?.message || "Operation failed");
        }
    };

    // Safe image URL construction
    const getImageUrl = (imageUrl) => {
        if (!imageUrl) return '';
        // Remove leading slash if present to avoid double slashes
        const cleanUrl = imageUrl.startsWith('/') ? imageUrl.substring(1) : imageUrl;
        return `${import.meta.env.VITE_API_BASE_URL}/${cleanUrl}`;
    };

    const getSourceBadge = (source) => {
        const variants = {
            'photo_gallery': 'primary',
            'other_upload': 'secondary',
            'blog': 'success',
            'article': 'info',
            'news': 'warning'
        };

        const labels = {
            'photo_gallery': 'Gallery',
            'other_upload': 'Other',
            'blog': 'Blog',
            'article': 'Article',
            'news': 'News'
        };

        return (
            <Badge bg={variants[source] || 'secondary'}>
                {labels[source] || source}
            </Badge>
        );
    };

    return (
        <div className="container mt-4 custom-font-initial">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Image Management Dashboard</h4>
                <Button onClick={() => { setEditPhoto(null); setModalShow(true); }}>
                    + Upload New Photo
                </Button>
            </div>

            {loading ? (
                <div className="text-center"><Spinner animation="border" /></div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Preview</th>
                            <th>Filename</th>
                            <th>Source</th>
                            <th>Album</th>
                            <th>Caption</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {images && images.length > 0 ? (
                            images.map((image, index) => (
                                <tr key={image.id || index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {image.imageUrl ? (
                                            <Image
                                                src={getImageUrl(image.imageUrl)}
                                                thumbnail
                                                width={80}
                                                height={60}
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    if (e.target.nextSibling) {
                                                        e.target.nextSibling.style.display = 'inline';
                                                    }
                                                }}
                                            />
                                        ) : (
                                            <span>No Image</span>
                                        )}
                                    </td>
                                    <td>
                                        <small className="text-muted">
                                            {image.filename}
                                        </small>
                                    </td>
                                    <td>{getSourceBadge(image.source)}</td>
                                    <td>{image.Album?.name || 'N/A'}</td>
                                    <td>{image.caption || '-'}</td>
                                    <td>
                                        {!image.isManaged ? (
                                            <Button
                                                variant="success"
                                                size="sm"
                                                onClick={() => handleAddToGallery(image.filename)}
                                                className="me-2"
                                            >
                                                Add to Gallery
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="warning"
                                                size="sm"
                                                onClick={() => { setEditPhoto(image); setModalShow(true); }}
                                                className="me-2"
                                            >
                                                Edit
                                            </Button>
                                        )}
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => {
                                                setImageToDelete(image);
                                                setConfirmModalShow(true);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    No images found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-3">
                    <Button
                        variant="outline-primary"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="me-2"
                    >
                        Previous
                    </Button>
                    <span className="mx-2">Page {page} of {totalPages}</span>
                    <Button
                        variant="outline-primary"
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </Button>
                </div>
            )}

            {/* Modals */}
            <PhotoFormModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                onSubmit={handlePhotoSubmit}
                editPhoto={editPhoto}
            />

            <ConfirmationModal
                show={confirmModalShow}
                onHide={() => {
                    setConfirmModalShow(false);
                    setDeleteFromFS(false);
                }}
                onConfirm={handleDelete}
                title="Delete Image"
                message={
                    <div>
                        <p>Are you sure you want to delete this image?</p>
                        <Form.Check
                            type="checkbox"
                            label="Also delete from filesystem"
                            checked={deleteFromFS}
                            onChange={(e) => setDeleteFromFS(e.target.checked)}
                        />
                        <small className="text-muted">
                            {deleteFromFS
                                ? "This will permanently remove the image file from the server"
                                : "This will only remove the image from the gallery management"
                            }
                        </small>
                    </div>
                }
            />
        </div>
    );
};

export default PhotoDashboard;