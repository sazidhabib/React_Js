import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Search, Trash2, Plus, ImagePlus, Edit2, Eye, EyeOff } from 'lucide-react';
import Modal from '../../components/Modal';

const Frames = () => {
    const [frames, setFrames] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    // Form State
    const [editingId, setEditingId] = useState(null);
    const [title, setTitle] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [description, setDescription] = useState('');
    const [isPopular, setIsPopular] = useState(false);
    const [status, setStatus] = useState('active');

    const fetchAll = async () => {
        try {
            const [framesRes, catsRes] = await Promise.all([
                fetch('http://localhost:5000/api/frames'),
                fetch('http://localhost:5000/api/categories')
            ]);

            if (framesRes.ok) setFrames(await framesRes.json());
            if (catsRes.ok) setCategories(await catsRes.json());
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this frame?')) return;

        const loadingToast = toast.loading('Deleting frame...');
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/frames/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                toast.success('Frame deleted successfully', { id: loadingToast });
                fetchAll();
            } else {
                toast.error('Failed to delete frame', { id: loadingToast });
            }
        } catch (error) {
            console.error(error);
            toast.error('Error deleting frame', { id: loadingToast });
        }
    };

    const handleSaveFrame = async (e) => {
        e.preventDefault();

        if (!editingId && !imageFile) {
            toast.error('Please select an image');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        if (imageFile) formData.append('image', imageFile);
        formData.append('category_id', categoryId);
        formData.append('description', description);
        formData.append('is_popular', isPopular);
        formData.append('status', status);

        const loadingToast = toast.loading(editingId ? 'Updating frame...' : 'Adding frame...');

        try {
            const token = localStorage.getItem('token');
            const url = editingId
                ? `http://localhost:5000/api/frames/${editingId}`
                : 'http://localhost:5000/api/frames';

            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });

            if (response.ok) {
                toast.success(editingId ? 'Frame updated successfully' : 'Frame added successfully', { id: loadingToast });
                setIsAddModalOpen(false);
                resetForm();
                fetchAll();
            } else {
                toast.error('Failed to save frame', { id: loadingToast });
            }
        } catch (error) {
            console.error(error);
            toast.error('Error saving frame', { id: loadingToast });
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setTitle('');
        setImageFile(null);
        setCurrentImageUrl('');
        setCategoryId('');
        setDescription('');
        setIsPopular(false);
        setStatus('active');
    };

    const openEdit = (frame) => {
        setEditingId(frame.id);
        setTitle(frame.title);
        setCurrentImageUrl(frame.image_url);
        setCategoryId(frame.category_id || '');
        setDescription(frame.description || '');
        setIsPopular(frame.is_popular);
        setStatus(frame.status || 'active');
        setIsAddModalOpen(true);
    };

    const filteredFrames = frames.filter(frame =>
        frame.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-800">ফ্রেম ম্যানেজমেন্ট</h1>
                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="ফ্রেম খুঁজুন..."
                        className="w-full pl-4 pr-4 py-2 rounded-lg border focus:outline-none focus:border-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        onClick={() => { resetForm(); setIsAddModalOpen(true); }}
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg"
                    >
                        <Plus size={18} /> অ্যাড ফ্রেম
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4">প্রিভিউ</th>
                            <th className="p-4">শিরোনাম</th>
                            <th className="p-4">ক্যাটাগরি</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">অ্যাকশন</th>
                        </tr>
                    </thead>
                    <tbody>
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
                                <tr key={frame.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                                            <img src={frame.image_url} alt="" className="w-full h-full object-cover" />
                                        </div>
                                    </td>
                                    <td className="p-4 font-medium">{frame.title}</td>
                                    <td className="p-4 text-sm text-gray-600">{frame.category_name || '-'}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs ${frame.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {frame.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        <button onClick={() => openEdit(frame)} className="p-2 text-blue-500 hover:bg-blue-50 rounded"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete(frame.id)} className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title={editingId ? "Edit Frame" : "Add Frame"}>
                <form onSubmit={handleSaveFrame} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">শিরোনাম</label>
                        <input type="text" className="w-full border rounded p-2" value={title} onChange={e => setTitle(e.target.value)} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">ছবি</label>
                        {currentImageUrl && <img src={currentImageUrl} alt="Current" className="h-20 mb-2 rounded" />}
                        <input type="file" accept="image/*" className="w-full border rounded p-2" onChange={e => setImageFile(e.target.files[0])} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">ক্যাটাগরি</label>
                        <select className="w-full border rounded p-2" value={categoryId} onChange={e => setCategoryId(e.target.value)} required>
                            <option value="">Select Category</option>
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">বর্ণনা</label>
                        <textarea className="w-full border rounded p-2" value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div className="flex gap-6">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={isPopular} onChange={e => setIsPopular(e.target.checked)} />
                            <span className="text-sm">Popular?</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={status === 'active'} onChange={e => setStatus(e.target.checked ? 'active' : 'inactive')} />
                            <span className="text-sm">Active?</span>
                        </label>
                    </div>
                    <button type="submit" className="w-full bg-primary text-white py-2 rounded">
                        {editingId ? 'Update Frame' : 'Add Frame'}
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default Frames;
