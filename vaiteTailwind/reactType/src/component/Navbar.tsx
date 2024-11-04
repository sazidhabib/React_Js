import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaTimes } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">MyApp</h1>
        <div className="hidden md:flex space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium ${
                isActive ? "underline underline-offset-8 border-black-500" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium ${
                isActive ? "underline underline-offset-8 border-black-500" : ""
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium ${
                isActive ? "underline underline-offset-8 border-black-500" : ""
              }`
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium ${
                isActive ? "underline underline-offset-8 border-black-500" : ""
              }`
            }
          >
            Contact
          </NavLink>
        </div>
        {/* Mobile Menu */}
        <div className="md:hidden items-left">
          <button
            type="button"
            onClick={toggleMenu}
            className="text-gray-200 hover:text-gray-400 focus:outline-none focus:text-gray-400"
          >
            {isOpen ? <FaTimes /> : <RxHamburgerMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium ${
                isActive ? "underline underline-offset-8 border-blue-500" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium ${
                isActive ? "underline underline-offset-8 border-blue-500" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium ${
                isActive ? "underline underline-offset-8 border-blue-500" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Services
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium ${
                isActive ? "underline underline-offset-8 border-blue-500" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Contact
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
