import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store"; // Update with your store's path
import { FaUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaTimes } from "react-icons/fa";

import SearchComponent from "./homepages/SearchComponent";
import AccountDropdown from "./homepages/AccountDropdown";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Accessing Redux state
  const cart = useSelector((state: RootState) => state.cart.cart);
  const wishlist = useSelector((state: RootState) => state.wishlist.wishlist);
  const isLogin = useSelector((state: RootState) => state.auth.isLoggedIn); // Adjust based on your auth slice

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="bg-white p-4 relative border-b-2 border-black">
      <div className="container mx-auto flex justify-between items-center relative">
        <h1 className="text-2xl font-bold">SnapShop</h1>

        <div className="hidden md:flex space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-gray-300 px-3 py-2 rounded-md text-sm ${
                isActive ? "underline underline-offset-8 border-black-500" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-gray-300 px-3 py-2 rounded-md text-sm ${
                isActive ? "underline underline-offset-8 border-black-500" : ""
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/product"
            className={({ isActive }) =>
              `hover:text-gray-300 px-3 py-2 rounded-md text-sm ${
                isActive ? "underline underline-offset-8 border-black-500" : ""
              }`
            }
          >
            ShopNow
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `hover:text-gray-300 px-3 py-2 rounded-md text-sm ${
                isActive ? "underline underline-offset-8 border-black-500" : ""
              }`
            }
          >
            Contact
          </NavLink>
        </div>

        <div className="flex items-center gap-6">
          <SearchComponent />

          <div className="relative">
            <NavLink to="/wishlist" className="relative">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0123583f55d849d761c5aafb62524e58e76f4578ffd0ca775554d42933ddc549?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                className="object-contain shrink-0 w-8"
                alt="Wishlist icon"
              />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex justify-center items-center rounded-full">
                  {wishlist.length}
                </span>
              )}
            </NavLink>
          </div>

          <div className="relative">
            <NavLink to="/cart" className="relative">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/27e6583cc2b0ad6384fa0e09ba54d132ea13906a2c9553ea3ae9481ef2628ff7?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                className="object-contain shrink-0 w-8"
                alt="Cart icon"
              />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex justify-center items-center rounded-full">
                  {cart.length}
                </span>
              )}
            </NavLink>
          </div>

          <button onClick={toggleDropdown}>
            <FaUserCircle className="text-3xl" />
          </button>
        </div>

        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg z-20">
            <AccountDropdown closeDropdown={() => setIsDropdownOpen(false)} />
          </div>
        )}

        <div className="md:hidden">
          <button
            type="button"
            onClick={toggleMenu}
            className="hover:text-gray-400 focus:outline-none"
          >
            {isOpen ? <FaTimes /> : <RxHamburgerMenu />}
          </button>
        </div>
      </div>

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
              `hover:text-gray-300 px-3 py-2 rounded-md text-sm ${
                isActive ? "underline underline-offset-8 border-blue-500" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/product"
            className={({ isActive }) =>
              `hover:text-gray-300 px-3 py-2 rounded-md text-sm ${
                isActive ? "underline underline-offset-8 border-blue-500" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            ShopNow
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `hover:text-gray-300 px-3 py-2 rounded-md text-sm ${
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
