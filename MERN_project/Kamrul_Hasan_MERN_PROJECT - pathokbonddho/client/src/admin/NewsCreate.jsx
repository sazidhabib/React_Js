import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';

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

    // Refs for editor containers to handle double-click
    const highlightEditorRef = useRef(null);
    const shortDescriptionEditorRef = useRef(null);
    const contentEditorRef = useRef(null);

    // TipTap Editors
    const highlightEditor = useEditor({
        extensions: [
            StarterKit.configure({
                // Disable the extensions that we're adding separately to avoid duplicates
                link: false,
                underline: false,
            }),
            Underline,
            Link.configure({
                openOnClick: false,
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'img-fluid rounded',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Placeholder.configure({
                placeholder: 'Enter highlight text...',
            }),
        ],
        content: formData.highlight,
        onUpdate: ({ editor }) => {
            // Debounce the update to prevent performance issues
            if (highlightTimeoutRef.current) {
                clearTimeout(highlightTimeoutRef.current);
            }
            highlightTimeoutRef.current = setTimeout(() => {
                const html = editor.getHTML();
                setFormData(prev => ({ ...prev, highlight: html }));
            }, 300); // 300ms delay for smooth typing
        },
        onBlur: ({ editor }) => {
            // Immediate save on blur as fallback
            const html = editor.getHTML();
            setFormData(prev => ({ ...prev, highlight: html }));
        },
        editorProps: {
            attributes: {
                class: 'proseMirror-editor',
                style: 'outline: none; min-height: 120px;',
            },
        },
    });



    const shortDescriptionEditor = useEditor({
        extensions: [
            StarterKit.configure({
                // Disable the extensions that we're adding separately to avoid duplicates
                link: false,
                underline: false,
            }),
            Underline,
            Link.configure({
                openOnClick: false,
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'img-fluid rounded',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Placeholder.configure({
                placeholder: 'Enter short description...',
            }),
        ],
        content: formData.shortDescription,
        onUpdate: ({ editor }) => {
            // Debounce the update
            if (shortDescriptionTimeoutRef.current) {
                clearTimeout(shortDescriptionTimeoutRef.current);
            }
            shortDescriptionTimeoutRef.current = setTimeout(() => {
                const html = editor.getHTML();
                setFormData(prev => ({ ...prev, shortDescription: html }));
            }, 300);
        },
        onBlur: ({ editor }) => {
            const html = editor.getHTML();
            setFormData(prev => ({ ...prev, shortDescription: html }));
        },
        editorProps: {
            attributes: {
                class: 'proseMirror-editor',
                style: 'outline: none; min-height: 120px;',
            },
        },
    });

    const contentEditor = useEditor({
        extensions: [
            StarterKit.configure({
                // Disable the extensions that we're adding separately to avoid duplicates
                link: false,
                underline: false,
            }),
            Underline,
            Link.configure({
                openOnClick: false,
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'img-fluid rounded',
                    style: 'max-width: 100%; height: auto;',
                    onload: "this.style.opacity = '1'",
                    loading: 'lazy',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Placeholder.configure({
                placeholder: 'Start writing your news content...',
            }),
        ],
        content: formData.content,
        onUpdate: ({ editor }) => {
            // Debounce the update
            if (contentTimeoutRef.current) {
                clearTimeout(contentTimeoutRef.current);
            }
            contentTimeoutRef.current = setTimeout(() => {
                const html = editor.getHTML();
                setFormData(prev => ({ ...prev, content: html }));
            }, 300);
        },
        onBlur: ({ editor }) => {
            const html = editor.getHTML();
            setFormData(prev => ({ ...prev, content: html }));
        },
        editorProps: {
            attributes: {
                class: 'proseMirror-editor',
                style: 'outline: none; min-height: 300px;',
            },
        },
    });

    // Cleanup timeouts on unmount
    useEffect(() => {
        return () => {
            if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
            if (shortDescriptionTimeoutRef.current) clearTimeout(shortDescriptionTimeoutRef.current);
            if (contentTimeoutRef.current) clearTimeout(contentTimeoutRef.current);
        };
    }, []);

    // Toolbar Components with Bootstrap classes
    const EditorToolbar = ({ editor, onImageClick }) => {
        if (!editor) {
            return null;
        }

        const setLink = () => {
            const previousUrl = editor.getAttributes('link').href;
            const url = window.prompt('URL', previousUrl);

            if (url === null) {
                return;
            }

            if (url === '') {
                editor.chain().focus().extendMarkRange('link').unsetLink().run();
                return;
            }

            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        };

        // IMPROVED button click handler
        const handleButtonClick = (callback) => (e) => {
            e.preventDefault();
            callback();
            // Simple focus restoration
            setTimeout(() => editor.commands.focus(), 50);
        };
        return (
            <div className="d-flex flex-wrap gap-2 p-2 bg-light border-bottom" >
                {/* Text Formatting */}
                <div className="btn-group">
                    <button
                        type="button"
                        className={`btn btn-sm btn-outline-secondary ${editor.isActive('bold') ? 'active' : ''}`}
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        title="Bold"
                    >
                        <strong>B</strong>
                    </button>
                    <button
                        type="button"
                        className={`btn btn-sm btn-outline-secondary ${editor.isActive('italic') ? 'active' : ''}`}
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        title="Italic"

                    >
                        <em>I</em>
                    </button>
                    <button
                        type="button"
                        className={`btn btn-sm btn-outline-secondary ${editor.isActive('underline') ? 'active' : ''}`}
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        title="Underline"

                    >
                        <u>U</u>
                    </button>
                </div>

                {/* Headings */}
                <select
                    className="form-select form-select-sm"
                    style={{ width: 'auto' }}
                    value={editor.getAttributes('heading').level || ''}
                    onChange={(e) => {
                        const level = e.target.value;
                        if (level === '') {
                            editor.chain().focus().setParagraph().run();
                        } else {
                            editor.chain().focus().toggleHeading({ level: parseInt(level) }).run();
                        }

                    }}
                    title="Heading"
                    onMouseDown={(e) => e.stopPropagation()}
                >
                    <option value="">Paragraph</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                    <option value="4">Heading 4</option>
                </select>

                {/* Lists */}
                <div className="btn-group">
                    <button
                        type="button"
                        className={`btn btn-sm btn-outline-secondary ${editor.isActive('bulletList') ? 'active' : ''}`}
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        title="Bullet List"
                    >
                        <i className="fa-solid fa-list-ul"></i>
                    </button>
                    <button
                        type="button"
                        className={`btn btn-sm btn-outline-secondary ${editor.isActive('orderedList') ? 'active' : ''}`}
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        title="Numbered List"
                    >
                        <i className="fa-solid fa-list-ol"></i>
                    </button>
                </div>

                {/* Blockquote */}
                <button
                    type="button"
                    className={`btn btn-sm btn-outline-secondary ${editor.isActive('blockquote') ? 'active' : ''}`}
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    title="Blockquote"
                >
                    <i className="fa-solid fa-quote-left"></i>
                </button>

                {/* Links & Images */}
                <div className="btn-group">
                    <button
                        type="button"
                        className={`btn btn-sm btn-outline-secondary ${editor.isActive('link') ? 'active' : ''}`}
                        onClick={handleButtonClick(setLink)}
                        title="Link"

                    >
                        <i className="fa-solid fa-link"></i>
                    </button>
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={handleButtonClick(onImageClick)}
                        title="Insert Image"

                    >
                        <i className="fa-regular fa-images"></i>
                    </button>
                </div>

                {/* Text Alignment */}
                <div className="btn-group">
                    <button
                        type="button"
                        className={`btn btn-sm btn-outline-secondary ${editor.isActive({ textAlign: 'left' }) ? 'active' : ''}`}
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        title="Align Left"

                    >
                        <i className="fa-solid fa-align-left"></i>
                    </button>
                    <button
                        type="button"
                        className={`btn btn-sm btn-outline-secondary ${editor.isActive({ textAlign: 'center' }) ? 'active' : ''}`}
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        title="Align Center"

                    >
                        <i className="fa-solid fa-align-center"></i>
                    </button>
                    <button
                        type="button"
                        className={`btn btn-sm btn-outline-secondary ${editor.isActive({ textAlign: 'right' }) ? 'active' : ''}`}
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        title="Align Right"

                    >
                        <i className="fa-solid fa-align-right"></i>
                    </button>
                </div>

                {/* Undo/Redo */}
                <div className="btn-group">
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                        title="Undo"
                    >
                        <i className="fa-solid fa-rotate-left"></i>
                    </button>
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                        title="Redo"
                    >
                        <i className="fa-solid fa-rotate-right"></i>
                    </button>
                </div>
            </div>
        );
    };

    // Simple Toolbar for Highlight
    const SimpleToolbar = ({ editor, onImageClick }) => {
        if (!editor) {
            return null;
        }

        const handleButtonClick = (callback) => (e) => {
            e.preventDefault();
            callback();
            // Simple focus restoration
            setTimeout(() => editor.commands.focus(), 50);
        };

        return (
            <div className="d-flex gap-2 p-2 bg-light border-bottom"
                onMouseDown={(e) => e.preventDefault()}
            >
                <button
                    type="button"
                    className={`btn btn-sm btn-outline-secondary ${editor.isActive('bold') ? 'active' : ''}`}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    title="Bold"
                >
                    <strong>B</strong>
                </button>
                <button
                    type="button"
                    className={`btn btn-sm btn-outline-secondary ${editor.isActive('italic') ? 'active' : ''}`}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    title="Italic"
                >
                    <em>I</em>
                </button>
                <button
                    type="button"
                    className={`btn btn-sm btn-outline-secondary ${editor.isActive('underline') ? 'active' : ''}`}
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    title="Underline"

                >
                    <u>U</u>
                </button>
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={handleButtonClick(onImageClick)}
                    title="Insert Image"

                >
                    <i className="fa-regular fa-images"></i>
                </button>
                {/* Lists */}
                <div className="btn-group">
                    <button
                        type="button"
                        className={`btn btn-sm btn-outline-secondary ${editor.isActive('bulletList') ? 'active' : ''}`}
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        title="Bullet List"
                    >
                        <i className="fa-solid fa-list-ul"></i>
                    </button>
                    <button
                        type="button"
                        className={`btn btn-sm btn-outline-secondary ${editor.isActive('orderedList') ? 'active' : ''}`}
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        title="Numbered List"

                    >
                        <i className="fa-solid fa-list-ol"></i>
                    </button>
                </div>
            </div>
        );
    };

    // Editor Components with Bootstrap
    const CustomEditor = ({ editor, onImageClick, height = 400 }) => {
        return (
            <div className="border rounded" style={{ height: `${height}px`, display: 'flex', flexDirection: 'column' }}>
                <EditorToolbar editor={editor} onImageClick={onImageClick} />
                <div style={{ flex: 1, overflow: 'auto' }}>
                    <EditorContent
                        editor={editor}
                        className="p-3"
                        style={{
                            minHeight: '200px',
                            height: '100%'
                        }}
                    />
                </div>
            </div>
        );
    };

    const SimpleEditor = ({ editor, onImageClick, height = 200 }) => {
        return (
            <div className="border rounded" style={{ height: `${height}px`, display: 'flex', flexDirection: 'column' }}>
                <SimpleToolbar editor={editor} onImageClick={onImageClick} />
                <div style={{ flex: 1, overflow: 'auto' }}>
                    <EditorContent
                        editor={editor}
                        className="p-3"
                        style={{ minHeight: '100px', height: '100%' }}
                    />
                </div>
            </div>
        );
    };

    // Image handling
    const openEditorImageModal = (editorType) => {
        setCurrentEditor(editorType);
        setShowImageModal(prev => ({
            ...prev,
            editor: true
        }));
    };

    const handleEditorImageSelect = (photo) => {
        const imageUrl = `${API_URL}/${photo.imageUrl}`;

        let currentEditorInstance = null;

        switch (currentEditor) {
            case 'highlight':
                currentEditorInstance = highlightEditor;
                break;
            case 'shortDescription':
                currentEditorInstance = shortDescriptionEditor;
                break;
            case 'content':
                currentEditorInstance = contentEditor;
                break;
        }

        if (currentEditorInstance) {
            currentEditorInstance.chain().focus().setImage({
                src: imageUrl,
                alt: photo.caption || 'News Image'
            }).run();
            toast.success('Image inserted into editor');
        }

        setShowImageModal(prev => ({
            ...prev,
            editor: false
        }));
        setCurrentEditor(null);
    };

    // Updated ProseMirrorStyles with better overflow handling
    const ProseMirrorStyles = () => (
        <style>
            {`
            .ProseMirror {
                white-space: pre-wrap;
                outline: none;
                min-height: 120px;
                overflow-wrap: break-word;
                word-wrap: break-word;
                padding: 1rem;
            }
            .ProseMirror p {
                margin-bottom: 1em;
                line-height: 1.6;
            }
            .ProseMirror h2 {
                font-size: 1.5em;
                font-weight: bold;
                margin: 1.5em 0 0.5em 0;
                color: #333;
            }
            .ProseMirror h3 {
                font-size: 1.25em;
                font-weight: bold;
                margin: 1.5em 0 0.5em 0;
                color: #444;
            }
            .ProseMirror h4 {
                font-size: 1.1em;
                font-weight: bold;
                margin: 1.5em 0 0.5em 0;
                color: #555;
            }
            .ProseMirror ul, .ProseMirror ol {
                padding-left: 1.5em;
                margin: 1em 0;
            }
            .ProseMirror blockquote {
                border-left: 4px solid #3b82f6;
                padding-left: 1rem;
                margin: 1.5em 0;
                font-style: italic;
                background: #f8fafc;
                padding: 1.5rem;
                border-radius: 0 0.375rem 0.375rem 0;
                color: #555;
            }
            .ProseMirror img {
                max-width: 100%;
                height: auto;
                border-radius: 0.375rem;
                margin: 1em 0;
            }
            .ProseMirror:focus {
                
                outline: none;
            }
            /* Better scrollbar styling */
            .ProseMirror::-webkit-scrollbar {
                width: 6px;
            }
            .ProseMirror::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 3px;
            }
            .ProseMirror::-webkit-scrollbar-thumb {
                background: #c1c1c1;
                border-radius: 3px;
            }
            .ProseMirror::-webkit-scrollbar-thumb:hover {
                background: #a8a8a8;
            }
        `}
        </style>
    );

    // Add Bootstrap Icons to your index.html head section if not already added
    // <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">

    // Rest of your existing code remains the same...
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
                    submitData.append(key, finalFormData[key]);
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

            // Reset editors
            highlightEditor?.commands.setContent('');
            shortDescriptionEditor?.commands.setContent('');
            contentEditor?.commands.setContent('');

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
        <>
            <ProseMirrorStyles />
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

                                        {/* Highlight with TipTap */}
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label className="form-label">Highlight</label>
                                                <SimpleEditor
                                                    editor={highlightEditor}
                                                    onImageClick={() => openEditorImageModal('highlight')}
                                                    height={200}
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

                                        {/* Short Description with TipTap */}
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label className="form-label">Short Description</label>
                                                <SimpleEditor
                                                    editor={shortDescriptionEditor}
                                                    onImageClick={() => openEditorImageModal('shortDescription')}
                                                    height={200}
                                                />
                                            </div>
                                        </div>

                                        {/* Main Content with Full TipTap Editor */}
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label className="form-label">Content *</label>
                                                <CustomEditor
                                                    editor={contentEditor}
                                                    onImageClick={() => openEditorImageModal('content')}
                                                    height={400}
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
        </>
    );
};

export default NewsCreate;