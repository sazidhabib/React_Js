import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}`;

const NewsCreate = () => {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
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

    useEffect(() => {
        fetchDropdownData();
    }, []);

    const fetchDropdownData = async () => {
        try {
            console.log('Fetching dropdown data...');

            const [authorsRes, tagsRes, categoriesRes] = await Promise.all([
                axios.get(`${API_URL}/api/authors`),
                axios.get(`${API_URL}/api/tags`),
                axios.get(`${API_URL}/api/menus`)
            ]);

            // Debug: Log the actual API responses
            console.log('Authors response:', authorsRes.data);
            console.log('Tags response:', tagsRes.data);
            console.log('Categories (menus) response:', categoriesRes.data);

            // Helper function to extract array from response
            const extractArray = (data, possibleKeys) => {
                if (Array.isArray(data)) {
                    return data;
                }

                for (let key of possibleKeys) {
                    if (data && Array.isArray(data[key])) {
                        return data[key];
                    }
                }

                // If no array found, try to find any array in the response
                if (data && typeof data === 'object') {
                    for (let key in data) {
                        if (Array.isArray(data[key])) {
                            console.log(`Found array in key: ${key}`, data[key]);
                            return data[key];
                        }
                    }
                }

                console.warn('No array found in response:', data);
                return [];
            };

            // Extract data with multiple possible keys
            setAuthors(extractArray(authorsRes.data, ['authors', 'data', 'rows']));
            setTags(extractArray(tagsRes.data, ['tags', 'data', 'rows']));
            setCategories(extractArray(categoriesRes.data, ['menus', 'categories', 'data', 'rows']));

            // Log the extracted data
            console.log('Extracted authors:', extractArray(authorsRes.data, ['authors', 'data', 'rows']));
            console.log('Extracted tags:', extractArray(tagsRes.data, ['tags', 'data', 'rows']));
            console.log('Extracted categories:', extractArray(categoriesRes.data, ['menus', 'categories', 'data', 'rows']));

        } catch (error) {
            console.error('Error fetching dropdown data:', error);
            console.error('Error details:', error.response?.data);
            toast.error('Failed to load dropdown data');

            // Set empty arrays on error to prevent map errors
            setAuthors([]);
            setTags([]);
            setCategories([]);
        }
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

            const response = await axios.post(`${API_URL}/api/news`, submitData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success('News created successfully!');

            // Reset form
            setFormData({
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
            setFiles({
                leadImage: null,
                thumbImage: null,
                metaImage: null
            });

        } catch (error) {
            console.error('Error creating news:', error);
            toast.error(error.response?.data?.message || 'Failed to create news');
        } finally {
            setLoading(false);
        }
    };

    // Safe render function for dropdown options
    const renderDropdownOptions = (items, placeholder = "No options available") => {
        if (!Array.isArray(items) || items.length === 0) {
            return <option value="">{placeholder}</option>;
        }

        return items.map(item => (
            <option key={item.id} value={item.id}>
                {item.name || item.title || item.label || `Item ${item.id}`}
            </option>
        ));
    };

    return (
        <div className="container-fluid custom-font-initial">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Create New News Post</h4>
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
                                                {renderDropdownOptions(authors, "No authors available")}
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

                                {/* Media */}
                                <div className="row mb-4">
                                    <div className="col-12">
                                        <h5>Media</h5>
                                        <hr />
                                    </div>

                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label">Lead Image</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                name="leadImage"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label">Thumbnail Image</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                name="thumbImage"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label">Image Caption</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="imageCaption"
                                                value={formData.imageCaption}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label">YouTube Video Link</label>
                                            <input
                                                type="url"
                                                className="form-control"
                                                name="videoLink"
                                                value={formData.videoLink}
                                                onChange={handleInputChange}
                                                placeholder="https://www.youtube.com/watch?v=..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Categories & Tags */}
                                <div className="row mb-4">
                                    <div className="col-12">
                                        <h5>Categories & Tags</h5>
                                        <hr />
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Categories</label>
                                            <select
                                                className="form-control"
                                                multiple
                                                value={formData.categoryIds}
                                                onChange={(e) => handleMultiSelect(e, 'categoryIds')}
                                            >
                                                {renderDropdownOptions(categories, "No categories available")}
                                            </select>
                                            <small className="text-muted">Hold Ctrl to select multiple categories</small>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Tags</label>
                                            <select
                                                className="form-control"
                                                multiple
                                                value={formData.tagIds}
                                                onChange={(e) => handleMultiSelect(e, 'tagIds')}
                                            >
                                                {renderDropdownOptions(tags, "No tags available")}
                                            </select>
                                            <small className="text-muted">Hold Ctrl to select multiple tags</small>
                                        </div>
                                    </div>
                                </div>

                                {/* SEO */}
                                <div className="row mb-4">
                                    <div className="col-12">
                                        <h5>SEO Settings</h5>
                                        <hr />
                                    </div>

                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label">Meta Image</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                name="metaImage"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-8">
                                        <div className="mb-3">
                                            <label className="form-label">Meta Title</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="metaTitle"
                                                value={formData.metaTitle}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label">Meta Description</label>
                                            <textarea
                                                className="form-control"
                                                name="metaDescription"
                                                rows="3"
                                                value={formData.metaDescription}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label">Meta Keywords</label>
                                            <textarea
                                                className="form-control"
                                                name="metaKeywords"
                                                rows="2"
                                                value={formData.metaKeywords}
                                                onChange={handleInputChange}
                                                placeholder="keyword1, keyword2, keyword3"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={loading}
                                        >
                                            {loading ? 'Creating...' : 'Create News Post'}
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

export default NewsCreate;