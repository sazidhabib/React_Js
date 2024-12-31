import React, { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <img
            src="/path-to-your-logo.png"
            alt="Logo"
            className="h-8 w-8 object-contain"
          />
          <span className="text-xl font-semibold text-blue-600">SLIM</span>
          <span className="text-sm text-gray-500">React MUI Template</span>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2">
          <input
            type="text"
            placeholder="Buscar"
            className="bg-transparent w-full outline-none text-sm text-gray-600 placeholder-gray-400"
          />
          <button className="ml-2 text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          <button className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405M17.5 3.5A5.5 5.5 0 0123 9m-4.5 0A5.5 5.5 0 0113 3.5M2 12a9.989 9.989 0 011.666-5.495A8.022 8.022 0 019 3.5c2.69 0 5.064.878 6.992 2.335M9 21v.01M21 12a9.99 9.99 0 00-3-7.09"
              />
            </svg>
          </button>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M8 6h.01M16 10h.01M16 6h.01M12 14h.01M12 10h.01M12 6h.01M4 10h.01M4 6h.01M20 10h.01M20 6h.01"
              />
            </svg>
          </button>
          <div className="flex items-center space-x-2">
            <img
              src="/path-to-user-image.jpg"
              alt="User"
              className="h-8 w-8 rounded-full border border-gray-300 object-cover"
            />
            <span className="text-sm text-gray-700">Elizabeth</span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="border-t">
        <div className="container mx-auto flex space-x-6 px-6 py-4">
          {[
            "DASHBOARD",
            "COMPONENTS",
            "PAGES",
            "THEME",
            "APPS",
            "SAMPLE TAB",
            "WIDGETS",
            "PERFIL",
          ].map((link, index) => (
            <a
              key={index}
              href="#"
              className="text-sm text-gray-700 hover:text-blue-600"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Header;
