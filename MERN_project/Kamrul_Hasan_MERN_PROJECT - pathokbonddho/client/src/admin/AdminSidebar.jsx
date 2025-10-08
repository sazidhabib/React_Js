import { useState } from "react";

import { NavLink, useLocation } from "react-router-dom";

function AdminSidebar({ isSidebarOpen }) {
  const location = useLocation();

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const isActiveRoute = (path) => location.pathname === path;

  return (
    <div className={`sidebar custom-font-initial fs-6 bg-dark ${isSidebarOpen ? "open" : "closed"}`}>
      <ul className="nav flex-column p-3">
        <li className={`nav-item py-2  ${isActiveRoute("/admin") ? "active-item" : ""}`}>
          <NavLink to="/admin" className="text-decoration-none p-3  text-white fs-5">
            Dashboard
          </NavLink>
        </li>

        <li className={`nav-item py-2 ${isActiveRoute("/admin/menu") ? "active-item" : ""}`}>
          <NavLink to="/admin/menu" className="text-decoration-none  text-white fs-5">
            Menu
          </NavLink>
        </li>

        <li className={`nav-item py-2 ${isActiveRoute("/admin/hero-section") ? "active-item" : ""}`}>
          <NavLink to="/admin/hero-section" className="text-decoration-none  text-white fs-5">
            Hero Section
          </NavLink>
        </li>

        <li className={`nav-item py-2 ${isActiveRoute("/admin/sections") ? "active-item" : ""}`}>
          <NavLink to="/admin/sections" className="text-decoration-none  text-white fs-5 sm-fs-6">
            Sections
          </NavLink>
        </li>

        <li className={`nav-item py-2 ${isActiveRoute("/admin/article") ? "active-item" : ""}`}>
          <NavLink to="/admin/article" className="text-decoration-none  text-white fs-5">
            Article
          </NavLink>
        </li>
        <li className={`nav-item py-2 ${isActiveRoute("/admin/tags") ? "active-item" : ""}`}>
          <NavLink to="/admin/tags" className="text-decoration-none  sm-fs-6 text-white fs-5">
            Tags
          </NavLink>
        </li>
        <li className={`nav-item py-2 ${isActiveRoute("/admin/author") ? "active-item" : ""}`}>
          <NavLink to="/admin/author" className="text-decoration-none  sm-fs-6 text-white fs-5">
            Author
          </NavLink>
        </li>

        <li className={`nav-item py-2 ${isActiveRoute("/admin/blog") ? "active-item" : ""}`}>
          <NavLink to="/admin/blog" className="text-decoration-none  sm-fs-6 text-white fs-5">
            Blog
          </NavLink>
        </li>

        {/* Photo Gallery */}
        <li className="nav-item py-2">
          <div
            className="nav-link text-warning d-flex justify-content-between align-items-center pe-3 fs-5"
            style={{ cursor: 'pointer' }}
            onClick={() => setIsGalleryOpen(!isGalleryOpen)}
          >
            <span>Photo Gallery</span>
            <i className={`fas fa-chevron-${isGalleryOpen ? 'down' : 'right'} transition-all`}></i>
          </div>
          <div className={`collapse ${isGalleryOpen ? 'show' : ''}`}>
            <ul className="nav flex-column ms-3 ">
              <li className={`text-decoration-none py-2 sm-fs-6 ${isActiveRoute("/admin/album") ? "active-item" : ""}`}>
                <NavLink to="/admin/album" className="text-decoration-none  sm-fs-6 text-white fs-5">
                  Album
                </NavLink>
              </li>
              <li className={`nav-item py-2 ${isActiveRoute("/admin/photos") ? "active-item" : ""}`}>
                <NavLink to="/admin/photos" className="text-decoration-none  sm-fs-6 text-white fs-5">
                  Photos
                </NavLink>
              </li>
            </ul>
          </div>
        </li>

        <li className={`nav-item py-2 ${isActiveRoute("/admin/songs") ? "active-item" : ""}`}>
          <NavLink to="/admin/songs" className="text-decoration-none  sm-fs-6 text-white fs-5">
            Songs
          </NavLink>
        </li>

        <li className={`nav-item py-2 ${isActiveRoute("/admin/videos") ? "active-item" : ""}`}>
          <NavLink to="/admin/videos" className="text-decoration-none  sm-fs-6 text-white fs-5">
            Videos
          </NavLink>
        </li>

        <li className={`nav-item py-2 ${isActiveRoute("/admin/page-layout") ? "active-item" : ""}`}>
          <NavLink to="/admin/page-layout" className="text-decoration-none  sm-fs-6 text-white fs-5">
            PageLayout
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;