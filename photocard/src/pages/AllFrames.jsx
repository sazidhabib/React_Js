import React from 'react';
import SectionHeader from '../components/SectionHeader';
import FrameCard from '../components/FrameCard';
import { Search, Filter } from 'lucide-react';

const AllFrames = () => {
    // Mock Data
    const allFrames = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        title: `ফ্রেম ডিজাইন ${i + 1}`,
        subtitle: 'ক্যাটাগরি',
        image: null
    }));

    return (
        <div className="min-h-screen bg-gray-50 py-10 pb-20">
            <div className="container mx-auto px-4">
                <SectionHeader title="সকল ফটো ফ্রেম" subtitle="আমাদের বিশাল কালেকশন থেকে আপনার পছন্দেরটি বেছে নিন" />

                {/* Search and Filter Bar */}
                <div className="bg-white p-4 rounded-xl shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:max-w-md">
                        <input
                            type="text"
                            placeholder="ফ্রেম খুঁজুন..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>

                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                        {['সব', 'রাজনৈতিক', 'উৎসব', 'ইসলামিক', 'অন্যান্য'].map((cat, idx) => (
                            <button
                                key={idx}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${idx === 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {allFrames.map(frame => (
                        <FrameCard key={frame.id} {...frame} />
                    ))}
                </div>

                {/* Pagination Placeholder */}
                <div className="mt-12 flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map(page => (
                        <button
                            key={page}
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${page === 1 ? 'bg-primary text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllFrames;
