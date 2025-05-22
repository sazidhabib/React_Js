import React, { useEffect, useState } from "react";
import { Button, Table, Spinner, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import PhotoFormModal from "./PhotoFormModal";
import ConfirmationModal from "./ConfirmationModal";
import { useAuth } from "../store/auth"; // Adjust path as needed

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
            console.log("API Response:", res.data); // Debugging

            // Handle both paginated and non-paginated responses
            if (Array.isArray(res.data)) {
                // Client-side pagination if API doesn't support it
                const startIndex = (page - 1) * 10;
                const paginatedPhotos = res.data.slice(startIndex, startIndex + 10);
                setPhotos(paginatedPhotos);
                setTotalPages(Math.ceil(res.data.length / 10) || 1);
            } else {
                // Paginated API response
                setPhotos(res.data.photos || res.data.items || res.data.data || []);
                setTotalPages(res.data.totalPages || res.data.total_pages || 1);
            }
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

    // Handle create/update through modal
    const handlePhotoSubmit = async (photoData) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            };

            if (editPhoto) {
                // For updates, we need to handle caption separately if no image is being updated
                if (!photoData.get('image')) {
                    // If no image is being updated, send caption via PATCH with JSON content-type
                    const jsonData = {
                        albumId: photoData.get('albumId'),
                        caption: photoData.get('caption')
                    };
                    await axios.patch(`${API_URL}/${editPhoto._id}`, jsonData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                } else {
                    // If image is being updated, use the existing formData approach
                    await axios.patch(`${API_URL}/${editPhoto._id}`, photoData, config);
                }
                toast.success("Photo updated successfully");
            } else {
                await axios.post(API_URL, photoData, config);
                toast.success("Photo created successfully");
            }
            setModalShow(false);
            fetchPhotos();
        } catch (err) {
            toast.error(err.response?.data?.message || "Operation failed");
            console.error("Submit error:", err);
        }
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
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Album</th>
                            <th>Preview</th>
                            <th>Caption</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {photos && photos.map((photo, index) => (
                            <tr key={photo._id}>
                                <td>{index + 1}</td>
                                <td>{photo.album?.name || 'N/A'}</td>
                                <td>
                                    <Image
                                        src={`${import.meta.env.VITE_API_BASE_URL}/${photo.imageUrl}`}
                                        thumbnail
                                        width={80}
                                        height={60}
                                    />
                                </td>
                                <td>{photo.caption || '-'}</td>
                                <td>{photo.status || 'active'}</td>
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
                                        onClick={() => { setPhotoToDelete(photo._id); setConfirmModalShow(true); }}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {/* Pagination */}

            <div className="d-flex justify-content-center">
                {totalPages > 1 && (
                    <div className="pagination">
                        {/* Always show first page */}
                        <Button
                            variant={1 === page ? "primary" : "light"}
                            onClick={() => setPage(1)}
                            className="me-1"
                        >
                            1
                        </Button>

                        {/* Show dots if current page is far from start */}
                        {page > 3 && <span className="mx-2">...</span>}

                        {/* Show one page before current */}
                        {page > 2 && (
                            <Button
                                variant="light"
                                onClick={() => setPage(page - 1)}
                                className="me-1"
                            >
                                {page - 1}
                            </Button>
                        )}

                        {/* Show current page if it's not first or last */}
                        {page !== 1 && page !== totalPages && (
                            <Button variant="primary" className="me-1">
                                {page}
                            </Button>
                        )}

                        {/* Show one page after current */}
                        {page < totalPages - 1 && (
                            <Button
                                variant="light"
                                onClick={() => setPage(page + 1)}
                                className="me-1"
                            >
                                {page + 1}
                            </Button>
                        )}

                        {/* Show dots if current page is far from end */}
                        {page < totalPages - 2 && <span className="mx-2">...</span>}

                        {/* Always show last page */}
                        {totalPages > 1 && (
                            <Button
                                variant={totalPages === page ? "primary" : "light"}
                                onClick={() => setPage(totalPages)}
                                className="me-1"
                            >
                                {totalPages}
                            </Button>
                        )}
                    </div>
                )}
            </div>

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