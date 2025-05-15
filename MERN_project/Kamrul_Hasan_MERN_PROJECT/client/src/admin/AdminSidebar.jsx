import React from "react";
import { NavLink } from "react-router-dom";

function AdminSidebar({ isSidebarOpen }) {
  return (
    <div className={`sidebar custom-font-initial bg-dark ${isSidebarOpen ? "open" : "closed"}`}>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to="/admin" className="nav-link text-white">
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/article" className="nav-link text-white">
            Article
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/blog" className="nav-link text-white">
            Blog
          </NavLink>
        </li>

        {/* Photos parent item with sub-menu */}
        <li className="nav-item">
          <span className="nav-link text-white disabled">Photo Gallery</span>
          <ul className="nav flex-column ms-3">
            <li className="nav-item">
              <NavLink to="/admin/album" className=" nav-link text-white">
                Album
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/admin/photos" className="nav-link text-white fs-1">
                Photos
              </NavLink>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <NavLink to="/admin/songs" className="nav-link text-white">
            Songs
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
