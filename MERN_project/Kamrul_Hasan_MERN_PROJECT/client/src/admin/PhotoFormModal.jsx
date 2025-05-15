// PhotoFormModal.jsx
import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

const PhotoFormModal = ({ show, onHide, refresh, editPhoto }) => {
    const { register, handleSubmit, setValue, reset } = useForm();
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const res = await axios.get("/api/albums?status=active");
                setAlbums(res.data.albums);
            } catch (err) {
                toast.error("Failed to load albums");
            }
        };

        if (show) {
            fetchAlbums();
            if (editPhoto) {
                setValue("albumId", editPhoto.albumId?._id || "");
                setValue("status", editPhoto.status);
            } else {
                reset();
            }
        }
    }, [show, editPhoto, setValue, reset]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("albumId", data.albumId);
        formData.append("status", data.status);
        if (data.image[0]) formData.append("image", data.image[0]);

        try {
            if (editPhoto) {
                await axios.patch(`/api/photos/${editPhoto._id}`, formData);
                toast.success("Photo updated");
            } else {
                await axios.post("/api/photos", formData);
                toast.success("Photo added");
            }
            onHide();
            refresh();
        } catch (err) {
            toast.error("Failed to save photo");
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{editPhoto ? "Edit" : "Add"} Photo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <Form.Group className="mb-3">
                        <Form.Label>Album</Form.Label>
                        <Form.Select {...register("albumId", { required: true })}>
                            <option value="">Select Album</option>
                            {albums.map((album) => (
                                <option key={album._id} value={album._id}>
                                    {album.title}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select {...register("status", { required: true })}>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" {...register("image")} />
                    </Form.Group>

                    <Button type="submit">{editPhoto ? "Update" : "Add"} Photo</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default PhotoFormModal;
