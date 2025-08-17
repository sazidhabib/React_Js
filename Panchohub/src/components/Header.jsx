import React, { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LiaSmsSolid } from "react-icons/lia";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId.toLowerCase());
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <img
            src="image/logo-3.png"
            alt="Logo"
            className="h-[55px] w-auto object-contain"
          />
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2">
          <input
            type="text"
            placeholder="Search for anything..."
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
            <div className="relative">
              <IoMdNotificationsOutline className="text-blue-600 text-2xl" />
              <span className="absolute -top-1 -right-1 bg-yellow-400 rounded-full w-3.5 h-3.5"></span>
            </div>
          </button>
          <button>
            <div className="relative">
              <LiaSmsSolid className="text-blue-600 text-2xl" />
              <span className="absolute -top-1 -right-1 bg-pink-500 rounded-full w-3.5 h-3.5"></span>
            </div>
          </button>
          <div className="flex items-center space-x-2">
            <img
              src="image/users/user-1.png"
              alt="User"
              className="h-8 w-8 rounded-full border border-gray-300 object-cover"
            />
            <span className="text-sm text-gray-700">Profile</span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="border-t">
        <div className="container mx-auto flex space-x-6 px-6 py-4 items-center justify-center">
          {["Home", "About", "Features", "Pricing"].map((link, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(link.toLowerCase())}
              className="text-sm text-gray-700 hover:text-blue-600 cursor-pointer"
            >
              {link}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Header;