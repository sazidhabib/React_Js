// PhotoDashboard.jsx
import React, { useEffect, useState } from "react";
import { Button, Table, Spinner, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import PhotoFormModal from "./PhotoFormModal";
import ConfirmationModal from "./ConfirmationModal";

const PhotoDashboard = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [editPhoto, setEditPhoto] = useState(null);
    const [confirmModalShow, setConfirmModalShow] = useState(false);
    const [photoToDelete, setPhotoToDelete] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPhotos = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/photos?page=${page}`);
            setPhotos(res.data.photos);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            toast.error("Failed to fetch photos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, [page]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/photos/${photoToDelete}`);
            toast.success("Photo deleted successfully");
            setConfirmModalShow(false);
            fetchPhotos();
        } catch (err) {
            toast.error("Failed to delete photo");
        }
    };

    return (
        <div className="container mt-4">
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
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {photos.map((photo, index) => (
                            <tr key={photo._id}>
                                <td>{index + 1}</td>
                                <td>{photo.albumId?.title || 'N/A'}</td>
                                <td>
                                    <Image src={photo.image} thumbnail width={80} height={60} />
                                </td>
                                <td>{photo.status}</td>
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
                {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                        key={i}
                        variant={i + 1 === page ? "primary" : "light"}
                        onClick={() => setPage(i + 1)}
                        className="me-1"
                    >
                        {i + 1}
                    </Button>
                ))}
            </div>

            {/* Modals */}
            <PhotoFormModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                refresh={fetchPhotos}
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
