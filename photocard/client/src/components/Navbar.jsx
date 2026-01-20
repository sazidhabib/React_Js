import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Bell, Plus, User } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Temporary state for demo

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded lg:hidden"></div> {/* Placeholder icon */}
                        <span className="text-xl font-bold text-green-700 flex items-center gap-2">
                            <span className="text-2xl">📷</span> ফটো কার্ড বিডি
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-primary font-medium">হোম</Link>
                        <Link to="/popular-frames" className="text-gray-600 hover:text-primary font-medium">জনপ্রিয় ফ্রেম</Link>
                        <Link to="/text-frames" className="text-gray-600 hover:text-primary font-medium">টেক্সট ফ্রেম</Link>
                        <Link to="/all-frames" className="text-gray-600 hover:text-primary font-medium">সকল ফ্রেম</Link>
                        <Link to="/add-frame" className="text-gray-600 hover:text-primary font-medium">যুক্ত করুন</Link>
                        <Link to="/contact" className="text-gray-600 hover:text-primary font-medium">যোগাযোগ</Link>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-4 ml-4">
                            {!isLoggedIn ? (
                                <button
                                    onClick={() => setIsLoggedIn(true)}
                                    className="flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold transition-colors shadow-lg shadow-blue-200"
                                >
                                    <User size={18} />
                                    লগইন
                                </button>
                            ) : (
                                <>
                                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
                                        <Bell size={20} />
                                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
                                    </button>
                                    <Link to="/add-frame" className="flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-full font-medium transition-colors shadow-md shadow-blue-100">
                                        <Plus size={18} />
                                        যুক্ত করুন
                                    </Link>
                                    <Link to="/dashboard" className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-full font-medium border border-green-200 hover:bg-green-100">
                                        <User size={18} />
                                        xyz
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-primary focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-green-50">হোম</Link>
                        <Link to="/popular-frames" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-green-50">জনপ্রিয় ফ্রেম</Link>
                        <Link to="/text-frames" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-green-50">টেক্সট ফ্রেম</Link>
                        <Link to="/all-frames" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-green-50">সকল ফ্রেম</Link>
                        <Link to="/add-frame" className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-green-50 mt-4">
                            Dashboard
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
