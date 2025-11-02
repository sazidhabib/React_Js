// NewsCreate.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import WYSIWYGEditor from './WYSIWYGEditor';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}`;

const NewsCreate = () => {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [authors, setAuthors] = useState([]);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [filteredPhotos, setFilteredPhotos] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState('all');

    // State for searchable dropdowns
    const [authorSearch, setAuthorSearch] = useState('');
    const [tagSearch, setTagSearch] = useState('');
    const [showAuthorDropdown, setShowAuthorDropdown] = useState(false);
    const [showTagDropdown, setShowTagDropdown] = useState(false);

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
        authorName: '',
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
        tagNames: [],
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

    // Image handling functions
    const openEditorImageModal = (editorType) => {
        setCurrentEditor(editorType);
        setShowImageModal(prev => ({
            ...prev,
            editor: true
        }));
    };

    const handleEditorImageSelect = (photo) => {
        const imageUrl = `${API_URL}/${photo.imageUrl}`;
        let currentEditorField = '';

        switch (currentEditor) {
            case 'highlight':
                currentEditorField = 'highlight';
                break;
            case 'shortDescription':
                currentEditorField = 'shortDescription';
                break;
            case 'content':
                currentEditorField = 'content';
                break;
            default:
                return;
        }

        // Insert HTML image with proper styling
        const htmlImage = `<img src="${imageUrl}" alt="${photo.caption || 'News Image'}" style="max-width: 100%; height: auto; border-radius: 0.375rem; margin: 1em 0; display: block;" />`;

        // Get current content
        const currentContent = formData[currentEditorField] || '';

        // Insert image at the cursor position or at the end
        const newContent = currentContent + (currentContent ? '<br>' : '') + htmlImage;

        setFormData(prev => ({
            ...prev,
            [currentEditorField]: newContent
        }));

        toast.success('Image inserted into editor');
        setShowImageModal(prev => ({
            ...prev,
            editor: false
        }));
        setCurrentEditor(null);
    };

    // Fetch data functions
    useEffect(() => {
        fetchDropdownData();
        fetchAlbums();
        fetchAllPhotos();
    }, []);

    useEffect(() => {
        filterPhotosByAlbum();
    }, [selectedAlbum, photos]);

    const fetchDropdownData = async () => {
        try {
            console.log('Fetching dropdown data...');

            const [authorsRes, tagsRes, categoriesRes] = await Promise.all([
                axios.get(`${API_URL}/api/authors`),
                axios.get(`${API_URL}/api/tags`),
                axios.get(`${API_URL}/api/menus`)
            ]);

            const extractArray = (data, possibleKeys) => {
                if (Array.isArray(data)) return data;
                for (let key of possibleKeys) {
                    if (data && Array.isArray(data[key])) return data[key];
                }
                if (data && typeof data === 'object') {
                    for (let key in data) {
                        if (Array.isArray(data[key])) return data[key];
                    }
                }
                return [];
            };

            setAuthors(extractArray(authorsRes.data, ['authors', 'data', 'rows']));
            setTags(extractArray(tagsRes.data, ['tags', 'data', 'rows']));
            const rawCategories = extractArray(categoriesRes.data, ['menus', 'categories', 'data', 'rows']);
            setCategories(processCategories(rawCategories));

        } catch (error) {
            console.error('Error fetching dropdown data:', error);
            toast.error('Failed to load dropdown data');
            setAuthors([]);
            setTags([]);
            setCategories([]);
        }
    };

    const fetchAlbums = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/albums`);
            const albumsData = response.data.albums || response.data || [];
            setAlbums(albumsData);
        } catch (error) {
            console.error('Error fetching albums:', error);
            toast.error('Failed to load albums');
        }
    };

    const fetchAllPhotos = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/photos`);
            const photosData = response.data.photos || response.data || [];
            setPhotos(photosData);
            setFilteredPhotos(photosData);
        } catch (error) {
            console.error('Error fetching photos:', error);
            toast.error('Failed to load photos');
        }
    };

    const filterPhotosByAlbum = () => {
        if (selectedAlbum === 'all') {
            setFilteredPhotos(photos);
        } else {
            const albumId = parseInt(selectedAlbum);
            const filtered = photos.filter(photo => photo.albumId === albumId);
            setFilteredPhotos(filtered);
        }
    };

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
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

    const handleAuthorSelect = (author) => {
        setFormData(prev => ({
            ...prev,
            authorId: author.id,
            authorName: author.name
        }));
        setAuthorSearch(author.name);
        setShowAuthorDropdown(false);
    };

    const handleTagSelect = (tag) => {
        if (!formData.tagIds.includes(tag.id.toString())) {
            setFormData(prev => ({
                ...prev,
                tagIds: [...prev.tagIds, tag.id.toString()],
                tagNames: [...prev.tagNames, tag.name]
            }));
        }
        setTagSearch('');
        setShowTagDropdown(false);
    };

    const removeTag = (tagId) => {
        setFormData(prev => ({
            ...prev,
            tagIds: prev.tagIds.filter(id => id !== tagId.toString()),
            tagNames: prev.tagNames.filter((_, index) => prev.tagIds[index] !== tagId.toString())
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

    const handleAlbumChange = (e) => {
        setSelectedAlbum(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const submitData = new FormData();

            // Append form data
            Object.keys(formData).forEach(key => {
                if (key === 'tagIds' || key === 'categoryIds') {
                    formData[key].forEach(value => {
                        submitData.append(key, value);
                    });
                } else if (key !== 'authorName' && key !== 'tagNames') {
                    submitData.append(key, formData[key]);
                }
            });

            // Append files or selected image paths
            Object.keys(files).forEach(key => {
                if (files[key]) {
                    submitData.append(key, files[key]);
                } else if (selectedImages[key]) {
                    submitData.append(`${key}Path`, selectedImages[key].imageUrl || selectedImages[key].image);
                }
            });

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
                authorName: '',
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
                tagNames: [],
                categoryIds: []
            });

            setFiles({
                leadImage: null,
                thumbImage: null,
                metaImage: null
            });
            setSelectedImages({
                leadImage: null,
                thumbImage: null,
                metaImage: null
            });
            setAuthorSearch('');
            setTagSearch('');

        } catch (error) {
            console.error('Error creating news:', error);
            toast.error(error.response?.data?.message || 'Failed to create news');
        } finally {
            setLoading(false);
        }
    };

    // Image preview component
    const ImagePreview = ({ imageType }) => {
        const file = files[imageType];
        const selectedImage = selectedImages[imageType];

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

        return null;
    };

    // Common Modal Component for Image Selection
    const ImageSelectionModal = ({ show, onClose, onSelect, title }) => {
        if (!show) return null;

        return (
            <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Filter by Album</label>
                                <select
                                    className="form-control"
                                    value={selectedAlbum}
                                    onChange={handleAlbumChange}
                                >
                                    <option value="all">All Albums</option>
                                    {albums.map(album => (
                                        <option key={album.id} value={album.id}>
                                            {album.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <small className="text-muted">
                                    Showing {filteredPhotos.length} photos
                                    {selectedAlbum !== 'all' && ` from selected album`}
                                </small>
                            </div>

                            <div className="row">
                                {filteredPhotos.map(photo => (
                                    <div key={photo.id} className="col-md-3 mb-3">
                                        <div
                                            className="card cursor-pointer"
                                            onClick={() => onSelect(photo)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <img
                                                src={`${API_URL}/${photo.imageUrl}`}
                                                className="card-img-top"
                                                alt={photo.caption || 'Photo'}
                                                style={{ height: '150px', objectFit: 'cover' }}
                                                onError={(e) => {
                                                    e.target.src = '/placeholder-image.jpg';
                                                }}
                                            />
                                            <div className="card-body p-2">
                                                <small className="card-text text-truncate d-block">
                                                    {photo.caption || 'No caption'}
                                                </small>
                                                <small className="text-muted">
                                                    Album: {albums.find(a => a.id === photo.albumId)?.name || 'Unknown'}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredPhotos.length === 0 && (
                                <div className="text-center text-muted py-4">
                                    No photos found
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Filtered data
    const filteredAuthors = authors.filter(author =>
        author.name?.toLowerCase().includes(authorSearch.toLowerCase())
    );

    const filteredTags = tags.filter(tag =>
        tag.name?.toLowerCase().includes(tagSearch.toLowerCase())
    );

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

                                    {/* Highlight with WYSIWYGEditor */}
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label">Highlight</label>
                                            <WYSIWYGEditor
                                                value={formData.highlight}
                                                onChange={(value) => setFormData(prev => ({ ...prev, highlight: value }))}
                                                placeholder="Enter highlight text..."
                                                height={200}
                                                onImageClick={() => openEditorImageModal('highlight')}
                                            />
                                        </div>
                                    </div>

                                    {/* Searchable Author Dropdown */}
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Author *</label>
                                            <div className="position-relative">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search author..."
                                                    value={authorSearch}
                                                    onChange={(e) => {
                                                        setAuthorSearch(e.target.value);
                                                        setShowAuthorDropdown(true);
                                                    }}
                                                    onFocus={() => setShowAuthorDropdown(true)}
                                                    onBlur={() => setTimeout(() => setShowAuthorDropdown(false), 200)}
                                                    required
                                                />
                                                {showAuthorDropdown && filteredAuthors.length > 0 && (
                                                    <div className="dropdown-menu show w-100" style={{ zIndex: 1060 }}>
                                                        {filteredAuthors.map(author => (
                                                            <button
                                                                key={author.id}
                                                                type="button"
                                                                className="dropdown-item"
                                                                onClick={() => handleAuthorSelect(author)}
                                                            >
                                                                {author.name}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            {formData.authorName && (
                                                <div className="mt-1">
                                                    <small className="text-success">
                                                        Selected: {formData.authorName}
                                                    </small>
                                                </div>
                                            )}
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
                                                onChange={(value) => setFormData(prev => ({ ...prev, shortDescription: value }))}
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
                                                onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
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
                                            <div className="position-relative">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search tags..."
                                                    value={tagSearch}
                                                    onChange={(e) => {
                                                        setTagSearch(e.target.value);
                                                        setShowTagDropdown(true);
                                                    }}
                                                    onFocus={() => setShowTagDropdown(true)}
                                                    onBlur={() => setTimeout(() => setShowTagDropdown(false), 200)}
                                                />
                                                {showTagDropdown && filteredTags.length > 0 && (
                                                    <div className="dropdown-menu show w-100" style={{ zIndex: 1060 }}>
                                                        {filteredTags.map(tag => (
                                                            <button
                                                                key={tag.id}
                                                                type="button"
                                                                className="dropdown-item"
                                                                onClick={() => handleTagSelect(tag)}
                                                            >
                                                                {tag.name}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {formData.tagNames.length > 0 && (
                                                <div className="mt-2">
                                                    {formData.tagNames.map((tagName, index) => (
                                                        <span key={formData.tagIds[index]} className="badge bg-primary me-1 mb-1">
                                                            {tagName}
                                                            <button
                                                                type="button"
                                                                className="btn-close btn-close-white ms-1"
                                                                style={{ fontSize: '0.7rem' }}
                                                                onClick={() => removeTag(formData.tagIds[index])}
                                                            ></button>
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
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

            {/* Image Selection Modals */}
            <ImageSelectionModal
                show={showImageModal.editor}
                onClose={closeImageModal}
                onSelect={handleEditorImageSelect}
                title="Select Image for Editor"
            />

            <ImageSelectionModal
                show={showImageModal.leadImage}
                onClose={closeImageModal}
                onSelect={handleImageSelect}
                title="Select Lead Image"
            />

            <ImageSelectionModal
                show={showImageModal.thumbImage}
                onClose={closeImageModal}
                onSelect={handleImageSelect}
                title="Select Thumbnail Image"
            />

            <ImageSelectionModal
                show={showImageModal.metaImage}
                onClose={closeImageModal}
                onSelect={handleImageSelect}
                title="Select Meta Image"
            />
        </div>
    );
};

export default NewsCreate;