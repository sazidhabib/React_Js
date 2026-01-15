import React, { useState } from 'react';
import {
    User, Phone, Mail, Edit, LogOut,
    Image as ImageIcon, CheckCircle, Clock,
    List, Headphones, MessageCircle
} from 'lucide-react';

const Dashboard = () => {
    // State for tabs
    const [activeTab, setActiveTab] = useState('live');

    // Stats Data
    const stats = [
        { title: 'মোট ফ্রেম', value: '0', icon: ImageIcon, color: 'text-blue-500', bg: 'bg-blue-100' },
        { title: 'লাইভ ফ্রেম', value: '0', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100' },
        { title: 'পেন্ডিং', value: '0', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-100' },
        { title: 'মোট লিস্ট', value: '0', icon: List, color: 'text-purple-500', bg: 'bg-purple-100' },
    ];

    return (
        <div className="bg-gray-50 min-h-screen pb-20 pt-10">
            <div className="container mx-auto px-4 space-y-8">

                {/* 1. User Profile Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-24 h-24 rounded-full border-4 border-green-100 bg-gray-100 flex items-center justify-center text-gray-400">
                            {/* Placeholder for user image */}
                            <span className="text-4xl">📷</span>
                        </div>
                        <div className="text-center md:text-left space-y-1">
                            <h2 className="text-2xl font-bold text-gray-800">xyz</h2>
                            <div className="flex items-center gap-2 text-gray-500 text-sm justify-center md:justify-start">
                                <Phone size={14} />
                                01234567891
                            </div>
                            <div className="flex items-center gap-2 text-gray-500 text-sm justify-center md:justify-start">
                                <Mail size={14} />
                                kedar9530@gixxo space.com
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary text-primary font-medium hover:bg-green-50 transition-colors">
                            <Edit size={16} />
                            এডিট প্রোফাইল
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-red-200 text-red-500 font-medium hover:bg-red-50 transition-colors">
                            <LogOut size={16} />
                            লগআউট
                        </button>
                    </div>
                </div>

                {/* 2. Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
                            <div>
                                <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                                <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                            </div>
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* 3. Support Banner */}
                <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                            <Headphones size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">এডমিনের সহায়তা প্রয়োজন?</h3>
                            <p className="text-sm text-gray-500">ফ্রেম সমস্যা বা অ্যাকাউন্টে কোনো জটিলতা দেখা দিলে আমাদের সাথে সরাসরি যোগাযোগ করুন।</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#25D366] text-white font-bold hover:bg-[#20bd5a] transition-colors shadow-lg shadow-green-200">
                            <MessageCircle size={18} />
                            হোয়াটসঅ্যাপ
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors">
                            <Phone size={18} />
                            কল করুন
                        </button>
                    </div>
                </div>

                {/* 4. My Frame Collection */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-800">আমার ফ্রেম কালেকশন</h3>

                        {/* Tabs */}
                        <div className="flex items-center gap-2 bg-white p-1 rounded-full shadow-sm border border-gray-100">
                            {[
                                { id: 'live', label: 'লাইভ', color: 'bg-green-500' },
                                { id: 'pending', label: 'পেন্ডিং', color: 'bg-orange-500' },
                                { id: 'recent', label: 'রিজেক্ট', color: 'bg-red-500' },
                                { id: 'trash', label: 'ট্র্যাশ', color: 'bg-gray-400' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
                                        ${activeTab === tab.id ? 'bg-white shadow-md text-gray-800' : 'text-gray-500 hover:bg-gray-50'}
                                    `}
                                >
                                    <span className={`w-2 h-2 rounded-full ${tab.color}`}></span>
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Table / Empty State */}
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                        {/* Header */}
                        <div className="grid grid-cols-4 p-4 border-b border-gray-100 bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wider">
                            <div>ছবি</div>
                            <div>বিস্তারিত</div>
                            <div>স্ট্যাটাস</div>
                            <div className="text-right">অ্যাকশন</div>
                        </div>

                        {/* Content */}
                        <div className="p-12 text-center">
                            <p className="text-gray-400 text-sm">কোনো তথ্য পাওয়া যায়নি</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
