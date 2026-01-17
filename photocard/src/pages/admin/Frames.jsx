import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, Trash2, Eye } from 'lucide-react';

const Frames = () => {
    const [activeTab, setActiveTab] = useState('pending');

    // Mock Frames Data
    const frames = [
        { id: 1, title: 'বিজয় দিবস ফ্রেম ২০২৬', user: 'Sajjad Hossin', date: '17 Jan 2026', status: 'Pending', image: null },
        { id: 2, title: 'ঈদ মোবারক ফ্রেম', user: 'Rahim Ahmed', date: '16 Jan 2026', status: 'Approved', image: null },
        { id: 3, title: 'রাজনৈতিক পোস্টার', user: 'Karim Uddin', date: '15 Jan 2026', status: 'Rejected', image: null },
        { id: 4, title: 'ব্যানার ডিজাইন', user: 'Nusrat Jahan', date: '14 Jan 2026', status: 'Pending', image: null },
    ];

    const filteredFrames = frames.filter(frame =>
        activeTab === 'all' || frame.status.toLowerCase() === activeTab
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-800">ফ্রেম ম্যানেজমেন্ট</h1>

                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                    <input
                        type="text"
                        placeholder="ফ্রেম খুঁজুন..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 border-b border-gray-200">
                {[
                    { id: 'pending', label: 'পেন্ডিং', count: 12 },
                    { id: 'approved', label: 'অনুমোদিত', count: 45 },
                    { id: 'rejected', label: 'বাতিলকৃত', count: 5 },
                    { id: 'all', label: 'সবগুলো', count: 62 }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab.label}
                        <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                            }`}>
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Frames Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                <th className="p-4 font-semibold">প্রিভিউ</th>
                                <th className="p-4 font-semibold">শিরোনাম</th>
                                <th className="p-4 font-semibold">আপলোডার</th>
                                <th className="p-4 font-semibold">তারিখ</th>
                                <th className="p-4 font-semibold">স্ট্যাটাস</th>
                                <th className="p-4 font-semibold text-right">অ্যাকশন</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredFrames.map((frame) => (
                                <tr key={frame.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <div className="w-16 h-16 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400">
                                            {/* Placeholder Image */}
                                            IMG
                                        </div>
                                    </td>
                                    <td className="p-4 font-medium text-gray-800">{frame.title}</td>
                                    <td className="p-4 text-sm text-gray-600">{frame.user}</td>
                                    <td className="p-4 text-sm text-gray-500">{frame.date}</td>
                                    <td className="p-4">
                                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold 
                                            ${frame.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                                frame.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                    'bg-orange-100 text-orange-700'}`}>
                                            {frame.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="অনুমোদন দিন">
                                                <CheckCircle size={18} />
                                            </button>
                                            <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="বাতিল করুন">
                                                <XCircle size={18} />
                                            </button>
                                            <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="বিস্তারিত">
                                                <Eye size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Frames;
