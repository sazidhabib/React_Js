import React from "react";
import { Modal, Button } from "react-bootstrap";


const DetailModal = ({ show, handleClose, item }) => {
    if (!item) return null;

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            size="xl"
            className="custom-detail-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title as="h4" className="w-100 post-title text-center">
                    {item.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                {item.image && (
                    <img
                        src={item.image}
                        alt={item.title}
                        className="img-fluid mb-3 rounded"
                    />
                )}
                <p className="modal-description">{item.description}</p>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DetailModal;
