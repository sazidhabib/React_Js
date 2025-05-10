import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button, Form } from 'react-bootstrap';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/songs`;

const SongDashboard = () => {
    const [songs, setSongs] = useState([]);
    const [newSong, setNewSong] = useState({ title: '', youtubeUrl: '', position: '' });
    const [editId, setEditId] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // Fetch all songs
    const fetchSongs = async () => {
        try {
            const res = await axios.get(API_BASE_URL);
            console.log('Songs response:', res.data);
            if (Array.isArray(res.data)) {
                setSongs(res.data);
            } else {
                throw new Error('Expected array but got: ' + typeof res.data);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            toast.error('Failed to fetch songs');
            setSongs([]);
        }
    };

    useEffect(() => {
        fetchSongs();
    }, []);

    const handleInputChange = (e) => {
        setNewSong({ ...newSong, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setNewSong({ title: '', youtubeUrl: '', position: '' });
        setEditId(null);
    };


    const { token } = useAuth();

    // Create or update a song
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newSong.title.trim() === "" || newSong.youtubeUrl.trim() === "") {
            alert("Title and YouTube URL are required!");
            return;
        }

        try {
            const payload = {
                title: newSong.title,
                youtubeUrl: newSong.youtubeUrl,
                position: newSong.position || 9999,
            };

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // ✅ Only if your route is protected
                },
            };

            if (editId) {
                const res = await axios.patch(`${API_BASE_URL}/${editId}`, payload, config);
                setSongs(songs.map((song) => (song._id === editId ? res.data : song)));
                toast.success("Song updated successfully");
            } else {
                const res = await axios.post(API_BASE_URL, payload, config);
                setSongs([...songs, res.data]);
                toast.success("Song added successfully");
            }

            setNewSong({ title: "", youtubeUrl: "", position: "" });
            setEditId(null);
        } catch (error) {
            if (error.response?.status === 409 || error.response?.status === 400) {
                toast.error(error.response.data.message || "Duplicate title not allowed!");
            } else if (error.response?.status === 401) {
                toast.error("Unauthorized! Please log in.");
            } else {
                console.error(error);
                toast.error("Something went wrong. Please try again.");
            }
        }
    };


    const handleEdit = (song) => {
        setNewSong({ title: song.title, youtubeUrl: song.youtubeUrl, position: song.position });
        setEditId(song._id);
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setShowConfirm(true);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${API_BASE_URL}/${deleteId}`);
            toast.success('Song deleted');
            fetchSongs();
        } catch (error) {
            toast.error('Failed to delete song');
        } finally {
            setShowConfirm(false);
            setDeleteId(null);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">{editId ? 'Edit Song' : 'Add New Song'}</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control name="title" value={newSong.title} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>YouTube URL</Form.Label>
                    <Form.Control name="youtubeUrl" value={newSong.youtubeUrl} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Position (Optional)</Form.Label>
                    <Form.Control
                        type="number"
                        name="position"
                        value={newSong.position}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button type="submit" variant="primary">
                    {editId ? 'Update' : 'Add'} Song
                </Button>
                {editId && (
                    <Button variant="secondary" onClick={resetForm} className="ms-2">
                        Cancel
                    </Button>
                )}
            </Form>

            <hr />

            <h3 className="mt-5">All Songs</h3>
            {songs.length === 0 ? (
                <p>No songs found</p>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Title</th>
                            <th>YouTube URL</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs.map((song) => (
                            <tr key={song._id}>
                                <td>{song.position}</td>
                                <td>{song.title}</td>
                                <td>
                                    <a href={song.youtubeUrl} target="_blank" rel="noopener noreferrer">
                                        Watch
                                    </a>
                                </td>
                                <td>
                                    <Button variant="info" size="sm" onClick={() => handleEdit(song)} className="me-2">
                                        Edit
                                    </Button>
                                    <Button variant="danger" size="sm" onClick={() => confirmDelete(song._id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this song?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirm(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Yes, Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default SongDashboard;
