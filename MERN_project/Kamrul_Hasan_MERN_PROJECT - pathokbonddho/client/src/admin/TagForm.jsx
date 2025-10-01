import React, { useState, useEffect } from 'react';

const TagForm = ({ tag, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        tagTitle: '',
        tagDescription: '',
        image: '',
        metaTitle: '',
        metaDescription: '',
        metaKeywords: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (tag) {
            setFormData({
                name: tag.name || '',
                slug: tag.slug || '',
                tagTitle: tag.tagTitle || '',
                tagDescription: tag.tagDescription || '',
                image: tag.image || '',
                metaTitle: tag.metaTitle || '',
                metaDescription: tag.metaDescription || '',
                metaKeywords: tag.metaKeywords || ''
            });
        }
    }, [tag]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.slug.trim()) {
            newErrors.slug = 'Slug is required';
        } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
            newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    const generateSlug = () => {
        if (!formData.name) return;

        const slug = formData.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        setFormData(prev => ({
            ...prev,
            slug
        }));
    };

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title mb-0">
                    {tag ? 'Edit Tag' : 'Create New Tag'}
                </h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter tag name"
                                />
                                {errors.name && (
                                    <div className="invalid-feedback">{errors.name}</div>
                                )}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="slug" className="form-label">
                                    Slug <span className="text-danger">*</span>
                                </label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
                                        id="slug"
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleChange}
                                        placeholder="tag-slug"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={generateSlug}
                                        disabled={!formData.name}
                                    >
                                        Generate
                                    </button>
                                    {errors.slug && (
                                        <div className="invalid-feedback">{errors.slug}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="tagTitle" className="form-label">Tag Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="tagTitle"
                            name="tagTitle"
                            value={formData.tagTitle}
                            onChange={handleChange}
                            placeholder="Enter tag title for display"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="tagDescription" className="form-label">Tag Description</label>
                        <textarea
                            className="form-control"
                            id="tagDescription"
                            name="tagDescription"
                            rows="3"
                            value={formData.tagDescription}
                            onChange={handleChange}
                            placeholder="Enter tag description"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Image URL</label>
                        <input
                            type="url"
                            className="form-control"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                        />
                        {formData.image && (
                            <div className="mt-2">
                                <img
                                    src={formData.image}
                                    alt="Preview"
                                    className="img-thumbnail"
                                    style={{ maxHeight: '100px' }}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <div className="card mt-4">
                        <div className="card-header">
                            <h6 className="card-title mb-0">SEO Settings</h6>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="metaTitle" className="form-label">Meta Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="metaTitle"
                                    name="metaTitle"
                                    value={formData.metaTitle}
                                    onChange={handleChange}
                                    placeholder="Enter meta title for SEO"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="metaDescription" className="form-label">Meta Description</label>
                                <textarea
                                    className="form-control"
                                    id="metaDescription"
                                    name="metaDescription"
                                    rows="3"
                                    value={formData.metaDescription}
                                    onChange={handleChange}
                                    placeholder="Enter meta description for SEO"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="metaKeywords" className="form-label">Meta Keywords</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="metaKeywords"
                                    name="metaKeywords"
                                    value={formData.metaKeywords}
                                    onChange={handleChange}
                                    placeholder="keyword1, keyword2, keyword3"
                                />
                                <div className="form-text">
                                    Separate keywords with commas
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="btn btn-primary me-2"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                    {tag ? 'Updating...' : 'Creating...'}
                                </>
                            ) : (
                                <>
                                    {tag ? 'Update Tag' : 'Create Tag'}
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onCancel}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TagForm;