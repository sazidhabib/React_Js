import React from "react";
import { NavLink } from "react-router-dom";

function AdminSidebar({ isSidebarOpen }) {  // Accept state as a prop
  return (
    <div className={`sidebar bg-dark ${isSidebarOpen ? "open" : "closed"}`}>
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
      </ul>
    </div>
  );
}

export default AdminSidebar;
