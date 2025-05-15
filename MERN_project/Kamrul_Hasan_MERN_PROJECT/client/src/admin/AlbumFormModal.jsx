// AlbumFormModal.jsx
import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

const AlbumFormModal = ({ show, onHide, refresh, editAlbum }) => {
    const { register, handleSubmit, reset, setValue } = useForm();

    useEffect(() => {
        if (editAlbum) {
            setValue("title", editAlbum.title);
            setValue("status", editAlbum.status);
        } else {
            reset();
        }
    }, [editAlbum, setValue, reset]);

    const onSubmit = async (data) => {
        try {
            if (editAlbum) {
                await axios.patch(`/api/albums/${editAlbum._id}`, data);
                toast.success("Album updated");
            } else {
                await axios.post("/api/albums", data);
                toast.success("Album created");
            }
            onHide();
            refresh();
        } catch (err) {
            toast.error("Failed to save album");
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{editAlbum ? "Edit" : "Add"} Album</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control {...register("title", { required: true })} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select {...register("status", { required: true })}>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </Form.Select>
                    </Form.Group>
                    <Button type="submit">{editAlbum ? "Update" : "Create"}</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AlbumFormModal;
