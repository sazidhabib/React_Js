import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function AdminSidebar({ isSidebarOpen }) {
  const location = useLocation();

  const isActiveRoute = (path) => location.pathname === path;

  return (
    <div className={`sidebar custom-font-initial bg-dark ${isSidebarOpen ? "open" : "closed"}`}>
      <ul className="nav flex-column">

        <li className={`nav-item ${isActiveRoute("/admin") ? "active-item" : ""}`}>
          <NavLink to="/admin" className="nav-link text-white">
            Dashboard
          </NavLink>
        </li>

        <li className={`nav-item ${isActiveRoute("/admin/menu") ? "active-item" : ""}`}>
          <NavLink to="/admin/menu" className="nav-link text-white">
            Menu
          </NavLink>
        </li>
        <li className={`nav-item ${isActiveRoute("/admin/hero-section") ? "active-item" : ""}`}>
          <NavLink to="/admin/hero-section" className="nav-link text-white">
            Hero Section
          </NavLink>
        </li>

        <li className={`nav-item ${isActiveRoute("/admin/sections") ? "active-item" : ""}`}>
          <NavLink to="/admin/sections" className="nav-link text-white">
            Sections
          </NavLink>
        </li>

        <li className={`nav-item ${isActiveRoute("/admin/article") ? "active-item" : ""}`}>
          <NavLink to="/admin/article" className="nav-link text-white">
            Article
          </NavLink>
        </li>


        <li className={`nav-item ${isActiveRoute("/admin/blog") ? "active-item" : ""}`}>
          <NavLink to="/admin/blog" className="nav-link text-white">
            Blog
          </NavLink>
        </li>

        {/* Photo Gallery */}
        <li className="nav-item">
          <span className="nav-link text-white disabled">Photo Gallery</span>
          <ul className="nav flex-column ms-3">
            <li className={`nav-item ${isActiveRoute("/admin/album") ? "active-item" : ""}`}>
              <NavLink to="/admin/album" className="nav-link text-white">
                Album
              </NavLink>
            </li>
            <li className={`nav-item ${isActiveRoute("/admin/photos") ? "active-item" : ""}`}>
              <NavLink to="/admin/photos" className="nav-link text-white">
                Photos
              </NavLink>
            </li>
          </ul>
        </li>

        <li className={`nav-item ${isActiveRoute("/admin/songs") ? "active-item" : ""}`}>
          <NavLink to="/admin/songs" className="nav-link text-white">
            Songs
          </NavLink>
        </li>
        <li className={`nav-item ${isActiveRoute("/admin/videos") ? "active-item" : ""}`}>
          <NavLink to="/admin/videos" className="nav-link text-white">
            Videos
          </NavLink>
        </li>
        <li className={`nav-item ${isActiveRoute("/admin/users") ? "active-item" : ""}`}>
          <NavLink to="/admin/users" className="nav-link text-white">
            Users
          </NavLink>
        </li>

      </ul>
    </div>
  );
}

export default AdminSidebar;
