import React, { useState, useEffect } from 'react';
import { Search, CheckCircle, XCircle, Trash2, Eye, Plus, ImagePlus } from 'lucide-react';
import Modal from '../../components/Modal';

const Frames = () => {
    const [frames, setFrames] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    // New Frame State - Simplified, assuming URL input for now. 
    // Ideally user would upload image, but let's stick to text URL based on schema or simple input.
    // The schema says image_url TEXT.
    const [newFrame, setNewFrame] = useState({
        title: '',
        image_url: '',
        category: '',
        description: '',
        is_popular: false
    });

    const fetchFrames = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/frames');
            const data = await response.json();
            if (response.ok) {
                setFrames(data);
            }
        } catch (error) {
            console.error('Error fetching frames:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFrames();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this frame?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/frames/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                setFrames(frames.filter(frame => frame.id !== id));
            } else {
                alert('Failed to delete frame');
            }
        } catch (error) {
            console.error('Error deleting frame:', error);
        }
    };

    const handleAddFrame = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/frames', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newFrame)
            });

            if (response.ok) {
                setIsAddModalOpen(false);
                setNewFrame({ title: '', image_url: '', category: '', description: '', is_popular: false });
                fetchFrames();
                alert('Frame added successfully');
            } else {
                const data = await response.json();
                alert(data.message || 'Failed to add frame');
            }
        } catch (error) {
            console.error('Error adding frame:', error);
        }
    };

    const filteredFrames = frames.filter(frame =>
        frame.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-800">ফ্রেম ম্যানেজমেন্ট</h1>

                <div className="flex gap-3">
                    {/* Search Bar */}
                    <div className="relative w-full md:w-72">
                        <input
                            type="text"
                            placeholder="ফ্রেম খুঁজুন..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>

                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg transition-colors font-medium text-sm whitespace-nowrap"
                    >
                        <Plus size={18} />
                        অ্যাড ফ্রেম
                    </button>
                </div>
            </div>

            {/* Frames Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                <th className="p-4 font-semibold">প্রিভিউ</th>
                                <th className="p-4 font-semibold">শিরোনাম</th>
                                <th className="p-4 font-semibold">ক্যাটাগরি</th>
                                <th className="p-4 font-semibold">বর্ণনা</th>
                                <th className="p-4 font-semibold text-right">অ্যাকশন</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">লোডিং...</td>
                                </tr>
                            ) : filteredFrames.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">কোনো ফ্রেম পাওয়া যায়নি</td>
                                </tr>
                            ) : (
                                filteredFrames.map((frame) => (
                                    <tr key={frame.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <div className="w-16 h-16 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 overflow-hidden">
                                                {frame.image_url ? <img src={frame.image_url} alt={frame.title} className="w-full h-full object-cover" /> : 'IMG'}
                                            </div>
                                        </td>
                                        <td className="p-4 font-medium text-gray-800">{frame.title}</td>
                                        <td className="p-4 text-sm text-gray-600">{frame.category}</td>
                                        <td className="p-4 text-sm text-gray-500 max-w-xs truncate">{frame.description}</td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleDelete(frame.id)}
                                                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="মুছে ফেলুন"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Frame Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="নতুন ফ্রেম যোগ করুন"
            >
                <form onSubmit={handleAddFrame} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">ফ্রেম শিরোনাম</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                            value={newFrame.title}
                            onChange={(e) => setNewFrame({ ...newFrame, title: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        {/* For now simplest is URL, but ideally file upload */}
                        <label className="text-sm font-medium text-gray-700">ছবির URL</label>
                        <input
                            type="text"
                            required
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                            value={newFrame.image_url}
                            onChange={(e) => setNewFrame({ ...newFrame, image_url: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">ক্যাটাগরি</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                            value={newFrame.category}
                            onChange={(e) => setNewFrame({ ...newFrame, category: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">বর্ণনা</label>
                        <textarea
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                            value={newFrame.description}
                            onChange={(e) => setNewFrame({ ...newFrame, description: e.target.value })}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isPopular"
                            checked={newFrame.is_popular}
                            onChange={(e) => setNewFrame({ ...newFrame, is_popular: e.target.checked })}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <label htmlFor="isPopular" className="text-sm font-medium text-gray-700">জনপ্রিয় ফ্রেম?</label>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 mt-4"
                    >
                        <ImagePlus size={18} />
                        যোগ করুন
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default Frames;
