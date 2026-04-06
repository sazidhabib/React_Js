import React, { useEffect, useState } from "react";
import { Button, Table, Spinner, Image, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../store/auth";
import SectionFormModal from "./SectionFormModal";


const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/sections`;
const IMG_URL = `${import.meta.env.VITE_API_BASE_URL}/uploads/`;

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



    const { token } = useAuth();

    // Fetch all sections
    const fetchSections = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}?t=${Date.now()}`);
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
            const formData = new FormData();
            formData.append('type', sectionData.type);
            formData.append('title', sectionData.title);
            formData.append('description', sectionData.description);
            if (sectionData.image && typeof sectionData.image !== 'string') {
                formData.append('image', sectionData.image);
            }

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            };

            const response = currentSection?._id
                ? await axios.patch(`${API_URL}/${currentSection._id}`, formData, config)
                : await axios.post(API_URL, formData, config);

            toast.success(`Section ${currentSection?._id ? 'updated' : 'created'} successfully`);
            setModalShow(false);
            fetchSections();
            return response.data;
        } catch (error) {
            console.error('Submission error:', error);
            toast.error(error.response?.data?.error || 'Failed to save section');
            throw error;
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this section?")) return;
        try {
            await axios.delete(`${API_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Section deleted successfully");
            fetchSections();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete section");
        }
    };

    const handleToggleVisibility = async (section) => {
        try {
            await axios.patch(`${API_URL}/${section._id}/toggle-visibility`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success(`Section visibility ${section.isVisible ? 'hidden' : 'shown'}`);
            fetchSections();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to toggle visibility");
        }
    };



    return (
        <div className="container custom-font-initial mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Sections Dashboard</h4>
                <Button variant="success" onClick={() => { setCurrentSection(null); setModalShow(true); }}>
                    Create New Section
                </Button>
            </div>

            {loading ? (
                <div className="text-center"><Spinner animation="border" /></div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead className="table-dark">
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
                        {sections.map((section, index) => {
                            const sectionType = sectionTypes.find(st => st.type === section.type);
                            return (
                                <tr key={section._id || index}>
                                    <td>{index + 1}</td>
                                    <td>{sectionType ? sectionType.name : section.type}</td>
                                    <td>{section?.title || "No Title"}</td>
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
                                        <div className="d-flex gap-2">
                                            <Button
                                                variant="warning"
                                                size="sm"
                                                onClick={() => {
                                                    setCurrentSection(section);
                                                    setModalShow(true);
                                                }}
                                            >
                                                Edit
                                            </Button>
                                            <Form.Check
                                                type="switch"
                                                id={`visibility-switch-${section._id}`}
                                                label={section.isVisible ? "Visible" : "Hidden"}
                                                checked={section.isVisible}
                                                onChange={() => handleToggleVisibility(section)}
                                                className="mt-1"
                                            />
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleDelete(section._id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        {sections.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center">No sections created yet.</td>
                            </tr>
                        )}
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

        </div>
    );
};

export default SectionDashboard;