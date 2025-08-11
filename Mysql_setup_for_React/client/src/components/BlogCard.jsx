import React, { useEffect, useState } from 'react';
import { Edit, Trash2, Calendar, Eye } from 'lucide-react';
import ConfirmDialog from './ConfirmDialog';

const BlogCard = ({ post, onEdit, onDelete }) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [imageStatus, setImageStatus] = useState('loading'); // 'loading', 'loaded', 'error'
    const [imgSrc, setImgSrc] = useState('');


    const handleDelete = () => {
        onDelete(post.id);
        setShowDeleteDialog(false);
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const truncateContent = (content, maxLength = 150) => {
        if (content.length <= maxLength) return content;
        return content.substring(0, maxLength) + '...';
    };

    // Add this effect to handle image loading
    useEffect(() => {
        if (!post.imageUrl) {
            setImageStatus('error');
            return;
        }

        // Create a proxy URL if needed (see alternative solution below)
        const finalUrl = post.imageUrl.startsWith('http')
            ? post.imageUrl
            : `http://localhost:5000${post.imageUrl}`;

        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = post.imageUrl;

        img.onload = () => {
            console.log('Image loaded:', post.imageUrl);
            setImgSrc(finalUrl);
            setImageStatus('loaded');
        };

        img.onerror = () => {
            console.error('Failed to load image:', post.imageUrl);
            setImageStatus('error');
            if (!finalUrl.includes('/proxy-image')) {
                setImgSrc(`/proxy-image?url=${encodeURIComponent(finalUrl)}`);
            }
        };
    }, [post.imageUrl]);

    return (
        <>
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                {post.imageUrl && (
                    <div className="relative h-48 overflow-hidden">
                        {imageStatus === 'loaded' ? (
                            <img
                                src={imgSrc}
                                alt={post.title}
                                crossOrigin="anonymous"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={() => setImageStatus('error')}
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                {imageStatus === 'loading' ? (
                                    <span className="text-gray-500">Loading image...</span>
                                ) : (
                                    <span className="text-gray-500">Image not available</span>
                                )}
                            </div>
                        )}
                    </div>
                )}

                <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(post.createdAt)}
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                                title="View details"
                            >
                                <Eye className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => onEdit(post)}
                                className="p-1 text-gray-400 hover:text-emerald-600 transition-colors duration-200"
                                title="Edit post"
                            >
                                <Edit className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setShowDeleteDialog(true)}
                                className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
                                title="Delete post"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-4">
                        {isExpanded ? post.content : truncateContent(post.content)}
                    </p>

                    {post.content.length > 150 && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
                        >
                            {isExpanded ? 'Show less' : 'Read more'}
                        </button>
                    )}

                    {post.updatedAt.getTime() !== post.createdAt.getTime() && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <span className="text-xs text-gray-400">
                                Updated {formatDate(post.updatedAt)}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <ConfirmDialog
                isOpen={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                onConfirm={handleDelete}
                title="Delete Blog Post"
                message="Are you sure you want to delete this blog post? This action cannot be undone."
            />
        </>
    );
};

export default BlogCard;