import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const PhotoGallery = () => {
    const [albums, setAlbums] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [selectedAlbumId, setSelectedAlbumId] = useState(null);

    const ALBUM_API = 'https://jsonplaceholder.typicode.com/albums';
    const PHOTO_API = 'https://jsonplaceholder.typicode.com/photos';

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const res = await axios.get(ALBUM_API);
                setAlbums(res.data.slice(0, 10)); // show only 10 albums
            } catch (err) {
                console.error('Error fetching albums:', err);
            }
        };
        fetchAlbums();
    }, []);

    useEffect(() => {
        const fetchPhotos = async () => {
            if (selectedAlbumId) {
                try {
                    const res = await axios.get(`${PHOTO_API}?albumId=${selectedAlbumId}`);
                    setPhotos(res.data.slice(0, 12)); // show only 12 photos
                } catch (err) {
                    console.error('Error fetching photos:', err);
                }
            }
        };
        fetchPhotos();
    }, [selectedAlbumId]);

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">Photo Gallery</h2>
            <div className="row">
                {/* Album List */}
                <div className="col-md-3 mb-3">
                    <div className="list-group">
                        {albums.map((album) => (
                            <button
                                key={album.id}
                                className={`list-group-item list-group-item-action ${selectedAlbumId === album.id ? 'active' : ''}`}
                                onClick={() => setSelectedAlbumId(album.id)}
                            >
                                {album.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Photo Grid */}
                <div className="col-md-9">
                    <div className="row">
                        {photos.map((photo) => (
                            <div key={photo.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                                <div className="card">
                                    <img src={photo.thumbnailUrl} alt={photo.title} className="card-img-top" />
                                    <div className="card-body p-2">
                                        <small className="card-text d-block text-truncate">{photo.title}</small>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {!selectedAlbumId && (
                        <div className="text-center text-muted mt-4">
                            <p>Select an album to view photos.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PhotoGallery;
