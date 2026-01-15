import React from 'react';
import { Facebook, Youtube, Globe, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#0f172a] text-white pt-12 pb-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand & Description */}
                    <div>
                        <div className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                            <span className="text-2xl">📷</span> ফটো কার্ড বিডি
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            বাংলাদেশের যেকোনো জাতীয় দিবস বা বিশেষ দিনে নিজের ছবি দিয়ে
                            সবাইকে শুভেচ্ছা জানানোর জন্য ডিজিটাল কার্ড তৈরি করুন খুব সহজে।
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                                <Facebook size={16} />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                                <Youtube size={16} />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                                <Globe size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 border-b border-gray-700 pb-2 inline-block">প্রয়োজনীয় লিংক</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-primary transition-colors">হোম পেজ</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">জনপ্রিয় ফ্রেম</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">সকল ক্যাটাগরি</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">ফ্রেম যুক্ত করুন</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">এডমিন প্যানেল</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 border-b border-gray-700 pb-2 inline-block">যোগাযোগ করুন</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <Phone size={16} className="text-primary mt-1" />
                                <div>
                                    <span className="block font-medium text-gray-300">হটলাইন:</span>
                                    01880578893
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail size={16} className="text-primary mt-1" />
                                <div>
                                    <span className="block font-medium text-gray-300">ইমেইল:</span>
                                    contact@photocardbd.com
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin size={16} className="text-primary mt-1" />
                                <div>
                                    <span className="block font-medium text-gray-300">ঠিকানা:</span>
                                    মিরপুর, ঢাকা, বাংলাদেশ - ১২১৬
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-6 text-center text-xs text-gray-500">
                    <p>© 2026 Photo Card BD. All rights reserved. Developed by <span className="text-gray-400">Sazid.js Dev</span></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
