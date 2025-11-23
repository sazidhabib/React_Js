import React, { useEffect, useState } from "react";
import { Button, Table, Spinner, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../store/auth";
import HeroSectionFormModal from "./HeroSectionFormModal";
import ConfirmationModal from "./ConfirmationModal";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/hero-section`;
const IMG_URL = `${import.meta.env.VITE_API_BASE_URL}/`;

const HeroSectionDashboard = () => {
    const [heroSections, setHeroSections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [editHeroSection, setEditHeroSection] = useState(null);
    const [confirmModalShow, setConfirmModalShow] = useState(false);
    const [sectionToDelete, setSectionToDelete] = useState(null);

    const { token } = useAuth();

    // Fetch hero sections
    const fetchHeroSections = async () => {
        setLoading(true);
        try {
            const res = await axios.get(API_URL);

            // PROPERLY ACCESS THE DATA
            const responseData = res.data.data || res.data;

            // Ensure we always have an array
            let sections = [];
            if (Array.isArray(responseData)) {
                sections = responseData;
            } else if (responseData && typeof responseData === 'object') {
                sections = [responseData];
            }

            // FIX: Parse lines from JSON string to array for each section
            const processedSections = sections.map(section => {
                if (section.lines && typeof section.lines === 'string') {
                    try {
                        section.lines = JSON.parse(section.lines);
                    } catch (parseError) {
                        console.error("Error parsing lines JSON:", parseError);
                        section.lines = [];
                    }
                }
                return section;
            });

            setHeroSections(processedSections);
        } catch (err) {
            toast.error("Failed to fetch hero sections");
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHeroSections();
    }, []);

    const handleSubmit = async (heroData) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            };

            const formData = new FormData();
            formData.append("title", heroData.title);
            formData.append("lines[0]", heroData.lines[0]);
            formData.append("lines[1]", heroData.lines[1]);
            formData.append("lines[2]", heroData.lines[2]);
            if (heroData.image) {
                formData.append("image", heroData.image);
            }

            if (editHeroSection) {
                await axios.patch(`${API_URL}/${editHeroSection.id}`, formData, config);
                toast.success("Hero section updated successfully");
            } else {
                await axios.post(API_URL, formData, config);
                toast.success("Hero section created successfully");
            }
            setModalShow(false);
            fetchHeroSections();
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
            toast.success("Hero section deleted successfully");
            setConfirmModalShow(false);
            fetchHeroSections();
        } catch (err) {
            toast.error("Failed to delete hero section");
            console.error("Delete error:", err);
        }
    };

    // Check if hero section exists (length > 0)
    const hasHeroSection = heroSections.length > 0;
    // Check if there's exactly one hero section
    const hasSingleHeroSection = heroSections.length === 1;

    return (
        <div className="container custom-font-initial mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Hero Section Dashboard</h4>
                <Button
                    onClick={() => { setEditHeroSection(null); setModalShow(true); }}
                    disabled={hasHeroSection} // Disable if any hero section exists
                >
                    + Add Hero Section
                </Button>
            </div>

            {loading ? (
                <div className="text-center"><Spinner animation="border" /></div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Lines</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {heroSections.map((section, index) => (
                            <tr key={section.id}>
                                <td>{index + 1}</td>
                                <td>{section.title}</td>
                                <td>
                                    <ol>
                                        {(Array.isArray(section.lines) ? section.lines : []).map((line, i) => (
                                            <li key={i}>{line}</li>
                                        ))}
                                    </ol>
                                </td>
                                <td>
                                    {section.imageUrl && (
                                        <Image
                                            src={`${IMG_URL}${section.imageUrl.replace(/^\/+/, "")}`}
                                            alt="Hero"
                                            thumbnail
                                            style={{ maxWidth: "100px" }}
                                        />
                                    )}
                                </td>
                                <td>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        onClick={() => {
                                            setEditHeroSection(section);
                                            setModalShow(true);
                                        }}
                                        className="me-2"
                                    >
                                        Edit
                                    </Button>
                                    {/* Only show Delete button if there's more than one hero section */}
                                    {!hasSingleHeroSection && (
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => {
                                                setSectionToDelete(section.id);
                                                setConfirmModalShow(true);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {/* Modals */}
            <HeroSectionFormModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                onSubmit={handleSubmit}
                editData={editHeroSection}
            />
            <ConfirmationModal
                show={confirmModalShow}
                onHide={() => setConfirmModalShow(false)}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this hero section?"
            />
        </div>
    );
};

export default HeroSectionDashboard;