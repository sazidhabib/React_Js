import React from 'react';
import { Search, MoreVertical, Trash2, Eye } from 'lucide-react';

const Users = () => {
    // Mock Users Data
    const users = [
        { id: 1, name: 'Sajjad Hossin', email: 'sajjad@example.com', phone: '01880578893', joined: '12 Jan 2026', status: 'Active' },
        { id: 2, name: 'Rahim Ahmed', email: 'rahim@example.com', phone: '01712345678', joined: '10 Jan 2026', status: 'Active' },
        { id: 3, name: 'Karim Uddin', email: 'karim@example.com', phone: '01987654321', joined: '05 Jan 2026', status: 'Blocked' },
        { id: 4, name: 'Nusrat Jahan', email: 'nusrat@example.com', phone: '01611223344', joined: '01 Jan 2026', status: 'Active' },
        { id: 5, name: 'Abdul Malek', email: 'malek@example.com', phone: '01555667788', joined: '28 Dec 2025', status: 'Active' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-800">ব্যবহারকারী ব্যবস্থাপনা</h1>

                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                    <input
                        type="text"
                        placeholder="নাম বা ইমেইল দিয়ে খুঁজুন..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                <th className="p-4 font-semibold">নাম</th>
                                <th className="p-4 font-semibold">যোগাযোগ</th>
                                <th className="p-4 font-semibold">জয়েনিং তারিখ</th>
                                <th className="p-4 font-semibold">স্ট্যাটাস</th>
                                <th className="p-4 font-semibold text-right">অ্যাকশন</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-800">{user.name}</p>
                                                <p className="text-xs text-gray-500">ID: #{user.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-sm text-gray-800">{user.email}</p>
                                        <p className="text-xs text-gray-500">{user.phone}</p>
                                    </td>
                                    <td className="p-4 text-sm text-gray-500">{user.joined}</td>
                                    <td className="p-4">
                                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="বিস্তারিত দেখুন">
                                                <Eye size={18} />
                                            </button>
                                            <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="মুছে ফেলুন">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                    <p>দেখাচ্ছে ১-৫ এর মধ্যে ১২০</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">পূর্ববর্তী</button>
                        <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">পরবর্তী</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;
