import React from "react";
import { NavLink } from "react-router-dom";

function AdminSidebar({ isSidebarOpen }) {
  return (
    <div className={`sidebar custom-font-initial bg-dark ${isSidebarOpen ? "open" : "closed"}`}>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink
            to="/admin"
            className={({ isActive }) => `adnav-link text-white ${isActive ? "active" : ""}`}
          >
            Dashboard
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/admin/article"
            className={({ isActive }) => `adnav-link text-white ${isActive ? "active" : ""}`}
          >
            Article
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/admin/blog"
            className={({ isActive }) => `adnav-link text-white ${isActive ? "active" : ""}`}
          >
            Blog
          </NavLink>
        </li>

        {/* Photos parent item with sub-menu */}
        <li className="nav-item">
          <span className="adnav-link text-white disabled">Photo Gallery</span>
          <ul className="nav flex-column ms-3">
            <li className="nav-item">
              <NavLink
                to="/admin/album"
                className={({ isActive }) => `adnav-link text-white ${isActive ? "active" : ""}`}
              >
                Album
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin/photos"
                className={({ isActive }) => `adnav-link text-white ${isActive ? "active" : ""}`}
              >
                Photos
              </NavLink>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <NavLink
            to="/admin/songs"
            className={({ isActive }) => `adnav-link text-white ${isActive ? "active" : ""}`}
          >
            Songs
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
