import React from "react";
import { NavLink } from "react-router-dom";

function AdminSidebar() {
  return (
    <div className="p-3">
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink
            to="/admin"
            className="nav-link text-white"
            activeClassName="active"
          >
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/admin/article"
            className="nav-link text-white"
            activeClassName="active"
          >
            Article
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/admin/blog"
            className="nav-link text-white"
            activeClassName="active"
          >
            Blog
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
