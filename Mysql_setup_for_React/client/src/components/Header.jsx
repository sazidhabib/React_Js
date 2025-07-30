import React from 'react';
import { BookOpen } from 'lucide-react';

const Header = () => {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
                        <h1 className="text-2xl font-bold text-gray-900">BlogManager</h1>
                    </div>
                    <nav className="hidden md:flex space-x-8">
                        <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                            Dashboard
                        </a>
                        <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                            Analytics
                        </a>
                        <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                            Settings
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;