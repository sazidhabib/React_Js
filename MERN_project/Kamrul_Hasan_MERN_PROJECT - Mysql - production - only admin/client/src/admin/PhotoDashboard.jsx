import React, { useEffect, useState } from "react";
import { Button, Table, Spinner, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import PhotoFormModal from "./PhotoFormModal";
import ConfirmationModal from "./ConfirmationModal";
import { useAuth } from "../store/auth";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/photos`;

const PhotoDashboard = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [editPhoto, setEditPhoto] = useState(null);
    const [confirmModalShow, setConfirmModalShow] = useState(false);
    const [photoToDelete, setPhotoToDelete] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { token } = useAuth();

    const fetchPhotos = async () => {
        setLoading(true);
        try {
            const res = await axios.get(API_URL);
            console.log("API Response:", res.data);

            // Handle both array and object responses
            const photosData = Array.isArray(res.data) ? res.data : (res.data.data || res.data.photos || []);

            // Client-side pagination
            const startIndex = (page - 1) * 10;
            const paginatedPhotos = photosData.slice(startIndex, startIndex + 10);

            setPhotos(paginatedPhotos);
            setTotalPages(Math.ceil(photosData.length / 10) || 1);
        } catch (err) {
            toast.error("Failed to fetch photos");
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, [page]);

    const handleDelete = async () => {
        try {
            await axios.delete(`${API_URL}/${photoToDelete}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Photo deleted successfully");
            setConfirmModalShow(false);
            fetchPhotos();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete photo");
            console.error("Delete error:", err);
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
            fetchPhotos();
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

    return (
        <div className="container mt-4 custom-font-initial">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Photo Dashboard</h4>
                <Button onClick={() => { setEditPhoto(null); setModalShow(true); }}>
                    + Add Photo
                </Button>
            </div>

            {loading ? (
                <div className="text-center"><Spinner animation="border" /></div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Album</th>
                            <th>Preview</th>
                            <th>Caption</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {photos && photos.length > 0 ? (
                            photos.map((photo, index) => (
                                <tr key={photo.id || index}>
                                    <td>{index + 1}</td>
                                    <td>{photo.Album?.name || 'N/A'}</td>
                                    <td>
                                        {photo.imageUrl ? (
                                            <Image
                                                src={getImageUrl(photo.imageUrl)}
                                                thumbnail
                                                width={80}
                                                height={60}
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    // Optionally show a placeholder
                                                    if (e.target.nextSibling) {
                                                        e.target.nextSibling.style.display = 'inline';
                                                    }
                                                }}
                                            />
                                        ) : (
                                            <span>No Image</span>
                                        )}
                                    </td>
                                    <td>{photo.caption || '-'}</td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            onClick={() => { setEditPhoto(photo); setModalShow(true); }}
                                            className="me-2"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => { setPhotoToDelete(photo.id); setConfirmModalShow(true); }}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No photos found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}

            {/* Pagination - Simplified */}
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
                onHide={() => setConfirmModalShow(false)}
                onConfirm={handleDelete}
            />
        </div>
    );
};

export default PhotoDashboard;