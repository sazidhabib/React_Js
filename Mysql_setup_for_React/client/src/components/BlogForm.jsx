import React, { useState, useEffect } from 'react';
import { Save, X, Upload, Image as ImageIcon } from 'lucide-react';

const BlogForm = ({ post, onSubmit, onCancel }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setContent(post.content);
            setImageUrl(post.imageUrl || '');
            setPreviewUrl(post.imageUrl || '');
        }
    }, [post]);

    const handleImageFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
            setImageUrl(''); // Clear URL input when file is selected
        }
    };

    const handleImageUrlChange = (e) => {
        const url = e.target.value;
        setImageUrl(url);
        setPreviewUrl(url);
        setImageFile(null); // Clear file when URL is entered
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        setIsSubmitting(true);

        try {
            let finalImageUrl = imageUrl;

            // Upload image file if exists
            if (imageFile) {
                const formData = new FormData();
                formData.append('image', imageFile);

                const uploadResponse = await fetch('http://localhost:5000/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!uploadResponse.ok) {
                    const errorData = await uploadResponse.json();
                    throw new Error(errorData.error || 'Upload failed');
                }

                const uploadData = await uploadResponse.json();
                finalImageUrl = uploadData.imageUrl;
            }

            // Submit post data
            const response = await fetch('http://localhost:5000/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title.trim(),
                    content: content.trim(),
                    imageUrl: finalImageUrl
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create post');
            }

            const newPost = await response.json();
            onSubmit(newPost); // Pass the complete post data back to parent
        } catch (error) {
            console.error('Error submitting form:', error);
            alert(`Error: ${error.message}`); // Or use a better notification system
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                    {post ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h2>
                <button
                    onClick={onCancel}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                    <X className="h-6 w-6" />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        Title *
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="Enter blog post title..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Featured Image
                    </label>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="imageFile" className="block text-xs text-gray-600 mb-1">
                                Upload Image File
                            </label>
                            <div className="flex items-center space-x-3">
                                <label htmlFor="imageFile" className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors duration-200">
                                    <Upload className="h-4 w-4 mr-2" />
                                    Choose File
                                </label>
                                <input
                                    type="file"
                                    id="imageFile"
                                    accept="image/*"
                                    onChange={handleImageFileChange}
                                    className="hidden"
                                />
                                {imageFile && (
                                    <span className="text-sm text-gray-600">{imageFile.name}</span>
                                )}
                            </div>
                        </div>

                        <div className="text-center text-gray-400">or</div>

                        <div>
                            <label htmlFor="imageUrl" className="block text-xs text-gray-600 mb-1">
                                Image URL
                            </label>
                            <input
                                type="url"
                                id="imageUrl"
                                value={imageUrl}
                                onChange={handleImageUrlChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>

                        {previewUrl && (
                            <div className="relative">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full h-48 object-cover rounded-lg border border-gray-200"
                                />
                                <div className="absolute top-2 right-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPreviewUrl('');
                                            setImageUrl('');
                                            setImageFile(null);
                                        }}
                                        className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {!previewUrl && (
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-500">No image selected</p>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                        Content *
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows={12}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-vertical"
                        placeholder="Write your blog post content here..."
                    />
                    <div className="mt-1 text-sm text-gray-500">
                        {content.length} characters
                    </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting || !title.trim() || !content.trim()}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                        <Save className="h-4 w-4 mr-2" />
                        {isSubmitting ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BlogForm;