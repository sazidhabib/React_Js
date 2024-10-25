import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <ul className="flex justify-center space-x-4 text-white">
        <li>
          <Link to="/" className="hover:text-yellow-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="/watched" className="hover:text-yellow-300">
            Watched
          </Link>
        </li>
        <li>
          <Link to="/watch-later" className="hover:text-yellow-300">
            Watch Later
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
