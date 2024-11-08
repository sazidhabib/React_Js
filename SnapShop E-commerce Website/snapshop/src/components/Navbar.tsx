import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaTimes } from "react-icons/fa";

import { FaUserCircle } from "react-icons/fa";
import SearchComponent from "./homepages/SearchComponent";
//import AccountDropdown from "./homepages/AccountDropdown";
import LogoutDropdown from "./homepages/LogoutDropdown";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white p-4 relative">
      <div className="container mx-auto flex justify-between items-center relative">
        <div className="flex gap-6">
          <h1 className=" text-2xl font-bold">SnapShop</h1>
        </div>

        <div className="hidden md:flex space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-gray-300 px-3 py-2 rounded-md text-sm  ${
                isActive ? "underline underline-offset-8 border-black-500" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              ` hover:text-gray-300 px-3 py-2 rounded-md text-sm ${
                isActive ? "underline underline-offset-8 border-black-500" : ""
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              ` hover:text-gray-300 px-3 py-2 rounded-md text-sm  ${
                isActive ? "underline underline-offset-8 border-black-500" : ""
              }`
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              ` hover:text-gray-300 px-3 py-2 rounded-md text-sm  ${
                isActive ? "underline underline-offset-8 border-black-500" : ""
              }`
            }
          >
            Contact
          </NavLink>
        </div>
        <div className="md:items-left flex gap-6 items-center self-stretch my-auto ">
          <SearchComponent />
          <div className="flex gap-4 justify-center items-center self-stretch my-auto">
            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                ` hover:text-gray-300 px-3 py-2 rounded-md text-sm  ${
                  isActive
                    ? "underline underline-offset-8 border-black-500"
                    : ""
                }`
              }
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0123583f55d849d761c5aafb62524e58e76f4578ffd0ca775554d42933ddc549?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
                alt="Wishlist icon"
              />
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                ` hover:text-gray-300 px-3 py-2 rounded-md text-sm  ${
                  isActive
                    ? "underline underline-offset-8 border-black-500"
                    : ""
                }`
              }
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/27e6583cc2b0ad6384fa0e09ba54d132ea13906a2c9553ea3ae9481ef2628ff7?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
                alt="Cart icon"
              />
            </NavLink>
            <button onClick={toggleDropdown}>
              <FaUserCircle className=" text-3xl object-contain shrink-0 self-stretch my-auto w-8 aspect-square" />
            </button>
          </div>
        </div>
        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg z-20">
            <LogoutDropdown />
          </div>
        )}

        {/* Mobile Menu */}
        <div className="md:hidden items-left">
          <button
            type="button"
            onClick={toggleMenu}
            className="hover:text-gray-400 focus:outline-none focus:text-gray-400"
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
              `hover:text-gray-300 px-3 py-2 rounded-md text-sm ${
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
              `hover:text-gray-300 px-3 py-2 rounded-md text-sm  ${
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
              ` hover:text-gray-300 px-3 py-2 rounded-md text-sm  ${
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
              ` hover:text-gray-300 px-3 py-2 rounded-md text-sm  ${
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
