import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { Upload, Image as ImageIcon, Check } from 'lucide-react';

const AddFrame = () => {
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <SectionHeader title="নতুন ফ্রেম আপলোড করুন" subtitle="আপনার ডিজাইনটি সবার সাথে শেয়ার করুন" />

                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
                    <div className="mb-8 p-4 bg-orange-50 text-orange-800 rounded-lg border border-orange-100 flex gap-3 text-sm">
                        <span className="text-xl">💡</span>
                        <p>টিপস: শুধুমাত্র স্বচ্ছ ব্যাকগ্রাউন্ডের (Transparent) .PNG ফাইল আপলোড করুন। সাইজ ১০৮০x১০৮০ পিক্সেল হলে ভালো হয়।</p>
                    </div>

                    <form className="space-y-8">
                        {/* File Upload Area */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700">ফ্রেমের ছবি (PNG)</label>
                            <div
                                className={`relative border-2 border-dashed rounded-xl p-10 text-center transition-colors ${dragActive ? 'border-primary bg-green-50' : 'border-gray-300 hover:bg-gray-50'}`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrag}
                            >
                                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".png" />
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center">
                                        <Upload size={32} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-700">এখানে ক্লিক করে ছবি বাছুন</p>
                                        <p className="text-xs text-gray-400 mt-1">অথবা ড্র্যাগ করে আনুন</p>
                                    </div>
                                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full font-bold">
                                        শুধুমাত্র PNG
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">ফ্রেমের শিরোনাম</label>
                                <input
                                    type="text"
                                    placeholder="যেমন: বিজয় দিবসের ফ্রেম"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">পদবি / বিস্তারিত</label>
                                <input
                                    type="text"
                                    placeholder="যেমন: নিচে নাম ও ছবি থাকবে"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="w-full py-4 bg-primary hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 text-lg">
                            <Check size={24} />
                            ফ্রেম জমা দিন
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFrame;
