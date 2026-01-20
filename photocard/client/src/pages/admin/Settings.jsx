import React from 'react';
import { Save, Lock, Globe } from 'lucide-react';

const Settings = () => {
    return (
        <div className="max-w-4xl space-y-8">
            <h1 className="text-2xl font-bold text-gray-800">সেটিংস</h1>

            {/* General Settings */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <Globe className="text-primary" size={24} />
                    <h2 className="text-lg font-bold text-gray-800">সাধারণ সেটিংস</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">ওয়েবসাইট টাইটেল</label>
                        <input
                            type="text"
                            defaultValue="ফটো কার্ড বিডি"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">সাপোর্ট ইমেইল</label>
                        <input
                            type="email"
                            defaultValue="contact@photocardbd.com"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">হেল্পলাইন নম্বর</label>
                        <input
                            type="text"
                            defaultValue="01880578893"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">ফুটার টেক্সট</label>
                        <input
                            type="text"
                            defaultValue="© 2026 Photo Card BD. All rights reserved."
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>
                </div>
            </div>

            {/* Admin Profile/Security */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <Lock className="text-primary" size={24} />
                    <h2 className="text-lg font-bold text-gray-800">অ্যাডমিন নিরাপত্তা</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">বর্তমান পাসওয়ার্ড</label>
                        <input
                            type="password"
                            placeholder="********"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <div className="space-y-2 md:col-start-1">
                        <label className="text-sm font-medium text-gray-700">নতুন পাসওয়ার্ড</label>
                        <input
                            type="password"
                            placeholder="********"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">নতুন পাসওয়ার্ড নিশ্চিত করুন</label>
                        <input
                            type="password"
                            placeholder="********"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button className="px-8 py-3 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-colors flex items-center gap-2">
                    <Save size={20} />
                    সেভ করুন
                </button>
            </div>
        </div>
    );
};

export default Settings;
