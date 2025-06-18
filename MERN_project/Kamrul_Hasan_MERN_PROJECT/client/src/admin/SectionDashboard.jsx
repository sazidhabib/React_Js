import React, { useEffect, useState } from "react";
import { Button, Table, Spinner, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../store/auth";
import SectionFormModal from "./SectionFormModal";
import ConfirmationModal from "./ConfirmationModal";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/sections`;
const IMG_URL = `${import.meta.env.VITE_API_BASE_URL}/`;

const sectionTypes = [
    { type: "about", name: "About" },
    { type: "jetukuboliniage", name: "Jetukuboliniage" },
    { type: "bookreading", name: "Book Reading" },
    { type: "music", name: "Music" }
];

const SectionDashboard = () => {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [currentSection, setCurrentSection] = useState(null);
    const [confirmModalShow, setConfirmModalShow] = useState(false);
    const [sectionToDelete, setSectionToDelete] = useState(null);

    const { token } = useAuth();

    // Fetch all sections
    const fetchSections = async () => {
        setLoading(true);
        try {
            const res = await axios.get(API_URL);
            setSections(res.data);
        } catch (err) {
            toast.error("Failed to fetch sections");
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSections();
    }, []);

    const handleSubmit = async (sectionData) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            };

            const formData = new FormData();
            formData.append("type", sectionData.type);
            formData.append("title", sectionData.title);
            formData.append("description", sectionData.description);
            if (sectionData.image) {
                formData.append("image", sectionData.image);
            }

            if (currentSection) {
                await axios.patch(`${API_URL}/${currentSection._id}`, formData, config);
                toast.success(`${sectionData.type} section updated successfully`);
            } else {
                await axios.post(API_URL, formData, config);
                toast.success(`${sectionData.type} section created successfully`);
            }
            setModalShow(false);
            fetchSections();
        } catch (err) {
            toast.error(err.response?.data?.error || "Operation failed");
            console.error("Submit error:", err);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${API_URL}/${sectionToDelete}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Section deleted successfully");
            setConfirmModalShow(false);
            fetchSections();
        } catch (err) {
            toast.error("Failed to delete section");
            console.error("Delete error:", err);
        }
    };

    return (
        <div className="container custom-font-initial mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Sections Dashboard</h4>
            </div>

            {loading ? (
                <div className="text-center"><Spinner animation="border" /></div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Type</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sectionTypes.map((sectionType, index) => {
                            const section = sections.find(s => s.type === sectionType.type);
                            return (
                                <tr key={sectionType.type}>
                                    <td>{index + 1}</td>
                                    <td>{sectionType.name}</td>
                                    <td>{section?.title || "Not created yet"}</td>
                                    <td>
                                        {section?.description
                                            ? `${section.description.substring(0, 50)}...`
                                            : "Not available"}
                                    </td>
                                    <td>
                                        {section?.imageUrl ? (
                                            <Image
                                                src={`${IMG_URL}${section.imageUrl.replace(/^\/+/, "")}`}
                                                alt={section.title}
                                                thumbnail
                                                style={{ maxWidth: "100px" }}
                                            />
                                        ) : (
                                            "No image"
                                        )}
                                    </td>
                                    <td>
                                        <Button
                                            variant={section ? "warning" : "primary"}
                                            size="sm"
                                            onClick={() => {
                                                setCurrentSection(section || { type: sectionType.type });
                                                setModalShow(true);
                                            }}
                                        >
                                            {section ? "Edit" : "Create"}
                                        </Button>
                                        {section && (
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                className="ms-2"
                                                onClick={() => {
                                                    setSectionToDelete(section._id);
                                                    setConfirmModalShow(true);
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            )}

            {/* Modals */}
            <SectionFormModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                onSubmit={handleSubmit}
                section={currentSection}
                sectionTypes={sectionTypes}
            />
            <ConfirmationModal
                show={confirmModalShow}
                onHide={() => setConfirmModalShow(false)}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this section?"
            />
        </div>
    );
};

export default SectionDashboard;