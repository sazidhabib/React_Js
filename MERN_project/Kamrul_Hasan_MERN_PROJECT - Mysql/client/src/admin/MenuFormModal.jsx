import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const MenuFormModal = ({ show, onHide, onSubmit, editMenu }) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        if (editMenu) {
            setValue("name", editMenu.name);
            setValue("path", editMenu.path);
            setValue("order", editMenu.order);
        } else {
            reset();
        }
    }, [editMenu, setValue, reset]);

    return (
        <Modal show={show} onHide={onHide} centered className="custom-font-initial">
            <Modal.Header closeButton>
                <Modal.Title>{editMenu ? "Edit" : "Add"} Menu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Menu Name</Form.Label>
                        <Form.Control
                            {...register("name", {
                                required: "Name is required",
                                minLength: {
                                    value: 2,
                                    message: "Minimum 2 characters"
                                }
                            })}
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Path</Form.Label>
                        <Form.Control
                            {...register("path", {
                                required: "Path is required",
                                pattern: {
                                    value: /^[a-z0-9-]+$/,
                                    message: "Only lowercase letters, numbers, and hyphens"
                                }
                            })}
                            isInvalid={!!errors.path}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.path?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Order</Form.Label>
                        <Form.Control
                            type="number"
                            {...register("order", {
                                required: "Order is required",
                                min: {
                                    value: 1,
                                    message: "Minimum order is 1"
                                }
                            })}
                            isInvalid={!!errors.order}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.order?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="secondary" onClick={onHide}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary">
                            {editMenu ? "Update" : "Create"}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default MenuFormModal;