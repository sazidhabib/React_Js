import React, { useState } from 'react';
import { Edit, Trash2, Calendar, Eye } from 'lucide-react';
import ConfirmDialog from './ConfirmDialog';

const BlogCard = ({ post, onEdit, onDelete }) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

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

    return (
        <>
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                {post.imageUrl && (
                    <div className="relative h-48 overflow-hidden">
                        <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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