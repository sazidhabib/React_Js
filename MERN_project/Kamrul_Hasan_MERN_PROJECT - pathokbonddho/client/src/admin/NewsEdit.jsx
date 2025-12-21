import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import WYSIWYGEditor from './WYSIWYGEditor';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}`;

const NewsEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [authors, setAuthors] = useState([]);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);

    // State for image selection
    const [showImageModal, setShowImageModal] = useState({
        leadImage: false,
        thumbImage: false,
        metaImage: false,
        editor: false
    });
    const [selectedImageType, setSelectedImageType] = useState('');
    const [currentEditor, setCurrentEditor] = useState(null);

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

    const [selectedImages, setSelectedImages] = useState({
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

    // Image handling functions
    const openEditorImageModal = (editorType) => {
        setCurrentEditor(editorType);
        setShowImageModal(prev => ({
            ...prev,
            editor: true
        }));
    };

    const openImageModal = (imageType) => {
        setSelectedImageType(imageType);
        setShowImageModal(prev => ({
            ...prev,
            [imageType]: true
        }));
    };

    const closeImageModal = () => {
        setShowImageModal({
            leadImage: false,
            thumbImage: false,
            metaImage: false,
            editor: false
        });
        setSelectedImageType('');
        setCurrentEditor(null);
    };

    const handleImageSelect = (photo) => {
        setSelectedImages(prev => ({
            ...prev,
            [selectedImageType]: photo
        }));
        setFiles(prev => ({
            ...prev,
            [selectedImageType]: null
        }));
        closeImageModal();
    };

    const fetchNewsData = async () => {
        try {
            setFetching(true);
            console.log(`Fetching news with ID: ${id} from ${API_URL}/api/news/${id}`);

            const response = await axios.get(`${API_URL}/api/news/${id}`);
            console.log('News data received:', response.data);

            const news = response.data;

            // Debug: Check what data we're getting
            console.log('News object keys:', Object.keys(news));
            console.log('News.Tags:', news.Tags);
            console.log('News.Categories:', news.Categories);

            setFormData({
                newsHeadline: news.newsHeadline || '',
                highlight: news.highlight || '',
                alternativeHeadline: news.alternativeHeadline || '',
                authorId: news.authorId?.toString() || '',
                shortDescription: news.shortDescription || '',
                content: news.content || '',
                imageCaption: news.imageCaption || '',
                videoLink: news.videoLink || '',
                newsSchedule: news.newsSchedule || '',
                metaTitle: news.metaTitle || '',
                metaKeywords: news.metaKeywords || '',
                metaDescription: news.metaDescription || '',
                status: news.status || 'draft',
                tagIds: (news.Tags || []).map(tag => tag.id?.toString()).filter(Boolean),
                categoryIds: (news.Categories || []).map(cat => cat.id?.toString()).filter(Boolean)
            });

            setCurrentImages({
                leadImage: news.leadImage || '',
                thumbImage: news.thumbImage || '',
                metaImage: news.metaImage || ''
            });

        } catch (error) {
            console.error('Error fetching news:', error);
            console.error('Error response:', error.response?.data);
            toast.error('Failed to load news data');
            navigate('/admin/news');
        } finally {
            setFetching(false);
        }
    };

    const fetchDropdownData = async () => {
        try {
            const [authorsRes, tagsRes, categoriesRes] = await Promise.all([
                axios.get(`${API_URL}/api/authors`),
                axios.get(`${API_URL}/api/tags`),
                axios.get(`${API_URL}/api/menus`)
            ]);

            // Handle different response formats
            setAuthors(extractArrayFromResponse(authorsRes.data, 'authors'));
            setTags(extractArrayFromResponse(tagsRes.data, 'tags'));

            let categoriesData = [];
            if (categoriesRes.data && categoriesRes.data.data) {
                categoriesData = categoriesRes.data.data;
            } else if (Array.isArray(categoriesRes.data)) {
                categoriesData = categoriesRes.data;
            }
            const processedCategories = processCategories(categoriesData);
            setCategories(processedCategories);

        } catch (error) {
            console.error('Error fetching dropdown data:', error);
            toast.error('Failed to load dropdown data');
        }
    };

    // Add these functions in NewsEdit component

    const processCategories = (categories) => {
        if (!Array.isArray(categories)) return [];
        const categoryMap = {};
        const rootCategories = [];

        categories.forEach(category => {
            categoryMap[category.id] = { ...category, children: [] };
        });

        categories.forEach(category => {
            if (category.parentId && categoryMap[category.parentId]) {
                categoryMap[category.parentId].children.push(categoryMap[category.id]);
            } else {
                rootCategories.push(categoryMap[category.id]);
            }
        });

        return rootCategories;
    };

    const renderCategoryOptions = (categories, level = 0) => {
        return categories.map(category => (
            <React.Fragment key={category.id}>
                <option value={category.id}>
                    {'-'.repeat(level * 2)} {category.name || category.title}
                </option>
                {category.children && category.children.length > 0 &&
                    renderCategoryOptions(category.children, level + 1)
                }
            </React.Fragment>
        ));
    };

    // Helper function to extract array from different response formats
    const extractArrayFromResponse = (data, key) => {
        console.log(`Extracting ${key} from:`, data);

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

    const handleEditorChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFileChange = (e) => {
        const { name, files: fileList } = e.target;
        setFiles(prev => ({
            ...prev,
            [name]: fileList[0]
        }));
        setSelectedImages(prev => ({
            ...prev,
            [name]: null
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
                    // Send as JSON string
                    submitData.append(key, JSON.stringify(formData[key]));
                } else {
                    submitData.append(key, formData[key]);
                }
            });

            // Append files or selected image paths
            Object.keys(files).forEach(key => {
                if (files[key]) {
                    submitData.append(key, files[key]);
                }
            });

            // Append selected image paths from gallery
            Object.keys(selectedImages).forEach(key => {
                if (selectedImages[key]) {
                    submitData.append(`${key}Path`, selectedImages[key].imageUrl);
                }
            });

            const response = await axios.patch(`${API_URL}/api/news/${id}`, submitData, {
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

    // Image preview component
    const ImagePreview = ({ imageType }) => {
        const file = files[imageType];
        const selectedImage = selectedImages[imageType];
        const currentImage = currentImages[imageType];

        if (file) {
            return (
                <div className="mt-2">
                    <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="img-thumbnail"
                        style={{ maxHeight: '100px' }}
                    />
                    <div className="text-muted small">New upload</div>
                </div>
            );
        }

        if (selectedImage) {
            return (
                <div className="mt-2">
                    <img
                        src={`${API_URL}/${selectedImage.imageUrl}`}
                        alt="Selected"
                        className="img-thumbnail"
                        style={{ maxHeight: '100px' }}
                        onError={(e) => {
                            e.target.src = '/placeholder-image.jpg';
                        }}
                    />
                    <div className="text-muted small">From gallery</div>
                </div>
            );
        }

        if (currentImage) {
            return (
                <div className="mt-2">
                    <img
                        src={`${API_URL}/${currentImage}`}
                        alt="Current"
                        className="img-thumbnail"
                        style={{ maxHeight: '100px' }}
                        onError={(e) => {
                            e.target.src = '/placeholder-image.jpg';
                        }}
                    />
                    <div className="text-muted small">Current image</div>
                </div>
            );
        }

        return null;
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
        <div className="container-fluid custom-font-initial">
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

                                    {/* Highlight with WYSIWYGEditor */}
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label">Highlight</label>
                                            <WYSIWYGEditor
                                                value={formData.highlight}
                                                onChange={(value) => handleEditorChange('highlight', value)}
                                                placeholder="Enter highlight text..."
                                                height={200}
                                                onImageClick={() => openEditorImageModal('highlight')}
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

                                    {/* Short Description with WYSIWYGEditor */}
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label">Short Description</label>
                                            <WYSIWYGEditor
                                                value={formData.shortDescription}
                                                onChange={(value) => handleEditorChange('shortDescription', value)}
                                                placeholder="Enter short description..."
                                                height={200}
                                                onImageClick={() => openEditorImageModal('shortDescription')}
                                            />
                                        </div>
                                    </div>

                                    {/* Main Content with WYSIWYGEditor */}
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label">Content *</label>
                                            <WYSIWYGEditor
                                                value={formData.content}
                                                onChange={(value) => handleEditorChange('content', value)}
                                                placeholder="Start writing your news content..."
                                                height={400}
                                                onImageClick={() => openEditorImageModal('content')}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Media Section */}
                                <div className="row mb-4">
                                    <div className="col-12">
                                        <h5>Media</h5>
                                        <hr />
                                    </div>

                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label">Lead Image</label>
                                            <div className="d-flex gap-2 mb-2">
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    name="leadImage"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => openImageModal('leadImage')}
                                                >
                                                    Choose
                                                </button>
                                            </div>
                                            <ImagePreview imageType="leadImage" />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label">Thumbnail Image</label>
                                            <div className="d-flex gap-2 mb-2">
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    name="thumbImage"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => openImageModal('thumbImage')}
                                                >
                                                    Choose
                                                </button>
                                            </div>
                                            <ImagePreview imageType="thumbImage" />
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
                                                size="6"
                                            >
                                                {categories.length > 0 ? (
                                                    renderCategoryOptions(categories)
                                                ) : (
                                                    <option value="">No categories available</option>
                                                )}
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
                                                size="6"
                                            >
                                                <option value="">Select Tags</option>
                                                {tags.map(tag => (
                                                    <option key={tag.id} value={tag.id}>
                                                        {tag.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <small className="text-muted">Hold Ctrl to select multiple tags</small>
                                        </div>
                                    </div>
                                </div>

                                {/* SEO Section */}
                                <div className="row mb-4">
                                    <div className="col-12">
                                        <h5>SEO Settings</h5>
                                        <hr />
                                    </div>

                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label">Meta Image</label>
                                            <div className="d-flex gap-2 mb-2">
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    name="metaImage"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => openImageModal('metaImage')}
                                                >
                                                    Choose
                                                </button>
                                            </div>
                                            <ImagePreview imageType="metaImage" />
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