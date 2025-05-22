
import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

const PhotoFormModal = ({ show, onHide, onSubmit, editPhoto }) => {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
    } = useForm();

    const [albums, setAlbums] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/albums?status=active`);
                setAlbums(res.data);
            } catch (err) {
                console.error("Failed to load albums:", err);
            }
        };

        if (show) {
            fetchAlbums();
            if (editPhoto) {
                setValue("albumId", editPhoto.album?._id || "");
                setValue("status", editPhoto.status || "active");
                setValue("caption", editPhoto.caption || ""); // Set caption value
                if (editPhoto.imageUrl) {
                    setImagePreview(`${import.meta.env.VITE_API_BASE_URL}/${editPhoto.imageUrl}`);
                }
            } else {
                reset();
                setImagePreview(null);
            }
        }
    }, [show, editPhoto, setValue, reset]);

    const handleFormSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('albumId', data.albumId);
            formData.append('caption', data.caption); // Add caption to form data
            if (data.image[0]) formData.append('image', data.image[0]);
            await onSubmit(formData);
            onHide();
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (imagePreview?.startsWith("blob:")) {
                URL.revokeObjectURL(imagePreview);
            }
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered className="custom-font-initial">
            <Modal.Header closeButton>
                <Modal.Title>{editPhoto ? "Edit" : "Add"} Photo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(handleFormSubmit)} encType="multipart/form-data">
                    <Form.Group className="mb-3">
                        <Form.Label>Album *</Form.Label>
                        <Form.Select
                            {...register("albumId", { required: "Album is required" })}
                            isInvalid={!!errors.albumId}
                        >
                            <option value="">Select Album</option>
                            {albums.map((album) => (
                                <option key={album._id} value={album._id}>
                                    {album.name}
                                </option>
                            ))}
                        </Form.Select>
                        {errors.albumId && (
                            <Form.Control.Feedback type="invalid">
                                {errors.albumId.message}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Caption</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            {...register("caption")}
                            placeholder="Optional photo description"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Status *</Form.Label>
                        <Form.Select
                            {...register("status", { required: "Status is required" })}
                            isInvalid={!!errors.status}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </Form.Select>
                        {errors.status && (
                            <Form.Control.Feedback type="invalid">
                                {errors.status.message}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Image {!editPhoto && "*"}</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            {...register("image", {
                                required: !editPhoto ? "Image is required" : false
                            })}
                            onChange={handleImageChange}
                            isInvalid={!!errors.image}
                        />
                        {errors.image && (
                            <Form.Control.Feedback type="invalid">
                                {errors.image.message}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    {imagePreview && (
                        <div className="mb-3 text-center">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{ maxWidth: "100%", maxHeight: "200px" }}
                                className="img-thumbnail"
                            />
                        </div>
                    )}

                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="secondary" onClick={onHide}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="d-flex align-items-center">
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    {editPhoto ? "Updating..." : "Adding..."}
                                </span>
                            ) : (
                                editPhoto ? "Update Photo" : "Add Photo"
                            )}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default PhotoFormModal;