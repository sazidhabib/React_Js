import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/auth";

const AdminDashboard = () => {
    const [articleCount, setArticleCount] = useState(0);
    const [blogCount, setBlogCount] = useState(0);
    const [photoCount, setPhotoCount] = useState(0);
    const [AlbumCount, setAlbumCount] = useState(0);
    const [SongCount, setSongCount] = useState(0);
    const [UserCount, setUserCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { token } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch all articles and count them
                const articlesResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/articles`);
                setArticleCount(articlesResponse.data.length);

                // Fetch all blogs and count them
                const blogsResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/blogs`);
                setBlogCount(blogsResponse.data.length);

                // Fetch all photos and count them
                const photosResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/photos`);
                setPhotoCount(photosResponse.data.length);

                // Fetch all the albums and count them
                const albumsResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/albums`);
                setAlbumCount(albumsResponse.data.length);

                // Fetch all the songs and count them
                const songsResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/songs`);
                setSongCount(songsResponse.data.length);

                // Fetch all users - WITH PROPER AUTH HANDLING
                if (!token) {
                    console.error("No token available");
                    setError("Authentication token not found");
                    return;
                }



                const usersResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });



                // Handle different possible response structures
                let usersData = [];
                if (Array.isArray(usersResponse.data)) {
                    usersData = usersResponse.data;
                } else if (usersResponse.data && Array.isArray(usersResponse.data.data)) {
                    usersData = usersResponse.data.data;
                } else if (usersResponse.data && usersResponse.data.users) {
                    usersData = usersResponse.data.users;
                } else {
                    console.warn("Unexpected users response structure:", usersResponse.data);
                }

                setUserCount(usersData.length);

            } catch (error) {
                console.error("Failed to fetch data:", error);

                if (error.response) {
                    // Server responded with error status
                    if (error.response.status === 401) {
                        setError("Authentication failed. Please log in again.");
                    } else if (error.response.status === 403) {
                        setError("You don't have permission to access user data.");
                    } else {
                        setError(`Server error: ${error.response.status}`);
                    }
                } else if (error.request) {
                    // Request was made but no response received
                    setError("Network error. Please check your connection.");
                } else {
                    // Something else happened
                    setError("An unexpected error occurred.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]); // Add token as dependency

    if (loading) {
        return (
            <div className="container-fluid custom-font-initial px-4">
                <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid custom-font-initial px-4">
            <div className="row">
                <div className="col-lg-10 ms-0">
                    <h1 className="mt-4">📊 Admin Dashboard</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item active">Overview</li>
                    </ol>

                    {/* Error Display */}
                    {error && (
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>Error:</strong> {error}
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setError("")}
                            ></button>
                        </div>
                    )}

                    <div className="row">
                        {/* Blog Post Counter */}
                        <div className="col-xl-4 col-md-12">
                            <div className="card bg-primary text-white mb-4">
                                <div className="card-body">
                                    <h4>📚 Total Blog Posts</h4>
                                    <h2>{blogCount}</h2>
                                </div>
                            </div>
                        </div>

                        {/* Article Post Counter */}
                        <div className="col-xl-4 col-md-12">
                            <div className="card bg-success text-white mb-4">
                                <div className="card-body">
                                    <h4>📝 Total Articles</h4>
                                    <h2>{articleCount}</h2>
                                </div>
                            </div>
                        </div>

                        {/* Photo Counter */}
                        <div className="col-xl-4 col-md-12">
                            <div className="card bg-warning text-white mb-4">
                                <div className="card-body">
                                    <h4>📷 Total Photos</h4>
                                    <h2>{photoCount}</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {/* Album Counter */}
                        <div className="col-xl-4 col-md-12">
                            <div className="card bg-info text-white mb-4">
                                <div className="card-body">
                                    <h4>🎵 Total Albums</h4>
                                    <h2>{AlbumCount}</h2>
                                </div>
                            </div>
                        </div>

                        {/* Song Counter */}
                        <div className="col-xl-4 col-md-12">
                            <div className="card bg-secondary text-white mb-4">
                                <div className="card-body">
                                    <h4>🎶 Total Songs</h4>
                                    <h2>{SongCount}</h2>
                                </div>
                            </div>
                        </div>

                        {/* User Counter */}
                        <div className="col-xl-4 col-md-12">
                            <div className="card bg-dark text-white mb-4">
                                <div className="card-body">
                                    <h4>👥 Total Users</h4>
                                    <h2>{UserCount}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;