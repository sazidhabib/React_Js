import React, { useEffect, useState } from "react";
import { Button, Table, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import MenuFormModal from "./MenuFormModal";
import ConfirmationModal from "./ConfirmationModal";
import axios from "axios";
import { useAuth } from "../store/auth";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/menus`;

const MenuDashboard = () => {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [editMenu, setEditMenu] = useState(null);
    const [confirmModalShow, setConfirmModalShow] = useState(false);
    const [menuToDelete, setMenuToDelete] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { token } = useAuth();

    // Fetch menus
    const fetchMenus = async () => {
        setLoading(true);
        try {
            const res = await axios.get(API_URL, {
                params: { page }
            });
            setMenus(res.data.data); // Adjusted for typical pagination response
            setTotalPages(res.data.totalPages || 1);
        } catch (err) {
            toast.error("Failed to fetch menus");
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenus();
    }, [page]);

    const handleMenuSubmit = async (menuData) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            if (editMenu) {
                await axios.patch(`${API_URL}/${editMenu.id}`, menuData, config);
                toast.success("Menu updated successfully");
            } else {
                await axios.post(API_URL, menuData, config);
                toast.success("Menu created successfully");
            }
            setModalShow(false);
            fetchMenus();
        } catch (err) {
            toast.error(err.response?.data?.message || "Operation failed");
            console.error("Submit error:", err);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${API_URL}/${menuToDelete}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Menu deleted successfully");
            setConfirmModalShow(false);
            fetchMenus();
        } catch (err) {
            toast.error("Failed to delete menu");
            console.error("Delete error:", err);
        }
    };

    return (
        <div className="container custom-font-initial mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Menu Dashboard</h4>
                <Button onClick={() => { setEditMenu(null); setModalShow(true); }}>
                    + Add Menu
                </Button>
            </div>

            {loading ? (
                <div className="text-center"><Spinner animation="border" /></div>
            ) : (
                <Table striped bordered hover>
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Path</th>
                            <th>Order</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menus.map((menu, index) => (
                            <tr key={menu.id}>
                                <td>{index + 1}</td>
                                <td>{menu.name}</td>
                                <td>{menu.path}</td>
                                <td>{menu.order}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        onClick={() => { setEditMenu(menu); setModalShow(true); }}
                                        className="me-2"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => { setMenuToDelete(menu.id); setConfirmModalShow(true); }}
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
            <MenuFormModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                onSubmit={handleMenuSubmit}
                editMenu={editMenu}
            />
            <ConfirmationModal
                show={confirmModalShow}
                onHide={() => setConfirmModalShow(false)}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this menu?"
            />
        </div>
    );
};

export default MenuDashboard;