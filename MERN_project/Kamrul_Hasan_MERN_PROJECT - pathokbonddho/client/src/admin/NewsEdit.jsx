import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const NewsEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [authors, setAuthors] = useState([]);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        newsHeadline: '',
        highlight: '',
        alternativeHeadline: '',
        authorId: '',
        shortDescription: '',
        content: '',
        imageCaption: '',
        videoLink: '',
        newsSchedule: '',
        metaTitle: '',
        metaKeywords: '',
        metaDescription: '',
        status: 'draft',
        tagIds: [],
        categoryIds: []
    });

    const [files, setFiles] = useState({
        leadImage: null,
        thumbImage: null,
        metaImage: null
    });

    const [currentImages, setCurrentImages] = useState({
        leadImage: '',
        thumbImage: '',
        metaImage: ''
    });

    useEffect(() => {
        fetchNewsData();
        fetchDropdownData();
    }, [id]);

    const fetchNewsData = async () => {
        try {
            setFetching(true);
            const response = await axios.get(`/api/news/${id}`);
            const news = response.data;

            setFormData({
                newsHeadline: news.newsHeadline || '',
                highlight: news.highlight || '',
                alternativeHeadline: news.alternativeHeadline || '',
                authorId: news.authorId || '',
                shortDescription: news.shortDescription || '',
                content: news.content || '',
                imageCaption: news.imageCaption || '',
                videoLink: news.videoLink || '',
                newsSchedule: news.newsSchedule ? news.newsSchedule.split('T')[0] + 'T' + news.newsSchedule.split('T')[1].substring(0, 5) : '',
                metaTitle: news.metaTitle || '',
                metaKeywords: news.metaKeywords || '',
                metaDescription: news.metaDescription || '',
                status: news.status || 'draft',
                tagIds: (news.Tags || news.tags || []).map(tag => tag.id.toString()),
                categoryIds: (news.Categories || news.categories || []).map(cat => cat.id.toString())
            });

            setCurrentImages({
                leadImage: news.leadImage || '',
                thumbImage: news.thumbImage || '',
                metaImage: news.metaImage || ''
            });

        } catch (error) {
            console.error('Error fetching news:', error);
            toast.error('Failed to load news data');
            navigate('/admin/news');
        } finally {
            setFetching(false);
        }
    };

    const fetchDropdownData = async () => {
        try {
            const [authorsRes, tagsRes, categoriesRes] = await Promise.all([
                axios.get('/api/authors'),
                axios.get('/api/tags'),
                axios.get('/api/categories')
            ]);

            // Handle different response formats
            setAuthors(extractArrayFromResponse(authorsRes.data, 'authors'));
            setTags(extractArrayFromResponse(tagsRes.data, 'tags'));
            setCategories(extractArrayFromResponse(categoriesRes.data, 'categories'));
        } catch (error) {
            console.error('Error fetching dropdown data:', error);
            toast.error('Failed to load dropdown data');
        }
    };

    // Helper function to extract array from different response formats
    const extractArrayFromResponse = (data, key) => {
        if (Array.isArray(data)) {
            return data;
        } else if (data && Array.isArray(data[key])) {
            return data[key];
        } else if (data && data.data && Array.isArray(data.data)) {
            return data.data;
        } else if (data && data[key] && Array.isArray(data[key])) {
            return data[key];
        }
        console.warn(`No array found in response for ${key}:`, data);
        return [];
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFiles(prev => ({
            ...prev,
            [name]: files[0]
        }));
    };

    const handleMultiSelect = (e, field) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setFormData(prev => ({
            ...prev,
            [field]: selectedOptions
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const submitData = new FormData();

            // Append form data
            Object.keys(formData).forEach(key => {
                if (key === 'tagIds' || key === 'categoryIds') {
                    submitData.append(key, JSON.stringify(formData[key]));
                } else {
                    submitData.append(key, formData[key]);
                }
            });

            // Append files
            if (files.leadImage) submitData.append('leadImage', files.leadImage);
            if (files.thumbImage) submitData.append('thumbImage', files.thumbImage);
            if (files.metaImage) submitData.append('metaImage', files.metaImage);

            const response = await axios.patch(`/api/news/${id}`, submitData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success('News updated successfully!');
            navigate('/admin/news');

        } catch (error) {
            console.error('Error updating news:', error);
            toast.error(error.response?.data?.message || 'Failed to update news');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Edit News Post</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                {/* Basic Information */}
                                <div className="row mb-4">
                                    <div className="col-12">
                                        <h5>Basic Information</h5>
                                        <hr />
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">News Headline *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="newsHeadline"
                                                value={formData.newsHeadline}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Alternative Headline</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="alternativeHeadline"
                                                value={formData.alternativeHeadline}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label">Highlight</label>
                                            <textarea
                                                className="form-control"
                                                name="highlight"
                                                rows="3"
                                                value={formData.highlight}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Author *</label>
                                            <select
                                                className="form-control"
                                                name="authorId"
                                                value={formData.authorId}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="">Select Author</option>
                                                {authors.map(author => (
                                                    <option key={author.id} value={author.id}>
                                                        {author.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Status</label>
                                            <select
                                                className="form-control"
                                                name="status"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                            >
                                                <option value="draft">Draft</option>
                                                <option value="published">Published</option>
                                                <option value="scheduled">Scheduled</option>
                                            </select>
                                        </div>
                                    </div>

                                    {formData.status === 'scheduled' && (
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Schedule Date & Time</label>
                                                <input
                                                    type="datetime-local"
                                                    className="form-control"
                                                    name="newsSchedule"
                                                    value={formData.newsSchedule}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="row mb-4">
                                    <div className="col-12">
                                        <h5>Content</h5>
                                        <hr />
                                    </div>

                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label">Short Description</label>
                                            <textarea
                                                className="form-control"
                                                name="shortDescription"
                                                rows="4"
                                                value={formData.shortDescription}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label">Content *</label>
                                            <textarea
                                                className="form-control"
                                                name="content"
                                                rows="10"
                                                value={formData.content}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>



                                {/* Current Images Preview */}
                                <div className="row mb-4">
                                    <div className="col-12">
                                        <h5>Current Images</h5>
                                        <hr />
                                    </div>
                                    <div className="col-md-4">
                                        {currentImages.leadImage && (
                                            <div>
                                                <label className="form-label">Current Lead Image</label>
                                                <div>
                                                    <img
                                                        src={`/uploads/news/${currentImages.leadImage}`}
                                                        alt="Lead"
                                                        className="img-thumbnail"
                                                        style={{ maxHeight: '150px' }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-md-4">
                                        {currentImages.thumbImage && (
                                            <div>
                                                <label className="form-label">Current Thumb Image</label>
                                                <div>
                                                    <img
                                                        src={`/uploads/news/${currentImages.thumbImage}`}
                                                        alt="Thumb"
                                                        className="img-thumbnail"
                                                        style={{ maxHeight: '150px' }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-md-4">
                                        {currentImages.metaImage && (
                                            <div>
                                                <label className="form-label">Current Meta Image</label>
                                                <div>
                                                    <img
                                                        src={`/uploads/news/${currentImages.metaImage}`}
                                                        alt="Meta"
                                                        className="img-thumbnail"
                                                        style={{ maxHeight: '150px' }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <button
                                            type="submit"
                                            className="btn btn-primary me-2"
                                            disabled={loading}
                                        >
                                            {loading ? 'Updating...' : 'Update News Post'}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => navigate('/admin/news')}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsEdit;