import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
    const [articleCount, setArticleCount] = useState(0);
    const [blogCount, setBlogCount] = useState(0);
    const [photoCount, setPhotoCount] = useState(0); // New state for photos
    const [AlbumCount, setAlbumCount] = useState(0);
    const [SongCount, setSongCount] = useState(0);
    const [UserCount, setUserCount] = useState(0);

    useEffect(() => {
        // Fetch all articles and count them
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/articles`)
            .then(res => setArticleCount(res.data.length))
            .catch(err => console.error("Failed to fetch articles:", err));

        // Fetch all blogs and count them
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/blogs`)
            .then(res => setBlogCount(res.data.length))
            .catch(err => console.error("Failed to fetch blogs:", err));

        // Fetch all photos and count them
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/photos`)
            .then(res => setPhotoCount(res.data.length))
            .catch(err => console.error("Failed to fetch photos:", err));

        // Fetch all the albums and count them
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/albums`)
            .then(res => setAlbumCount(res.data.length))
            .catch(err => console.error("Failed to fetch photos:", err));

        // Fetch all the songs and count them
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/songs`)
            .then(res => setSongCount(res.data.length))
            .catch(err => console.error("Failed to fetch photos:", err));

        // Fetch all the songs and count them
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users`)
            .then(res => setUserCount(res.data.length))
            .catch(err => console.error("Failed to fetch photos:", err));
    }, []);

    return (
        <div className="container-fluid custom-font-initial px-4">
            <div className="row">
                <div className="col-lg-10 ms-0">
                    <h1 className="mt-4">📊 Admin Dashboard</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item active">Overview</li>
                    </ol>

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
                        {/* Blog Post Counter */}
                        <div className="col-xl-4 col-md-12">
                            <div className="card bg-primary text-white mb-4">
                                <div className="card-body">
                                    <h4>📚 Total Album</h4>
                                    <h2>{AlbumCount}</h2>
                                </div>
                            </div>
                        </div>

                        {/* Article Post Counter */}
                        <div className="col-xl-4 col-md-12">
                            <div className="card bg-success text-white mb-4">
                                <div className="card-body">
                                    <h4>📝 Total Songs</h4>
                                    <h2>{SongCount}</h2>
                                </div>
                            </div>
                        </div>

                        {/* Photo Counter */}
                        <div className="col-xl-4 col-md-12">
                            <div className="card bg-warning text-white mb-4">
                                <div className="card-body">
                                    <h4>📷 Total Users</h4>
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
