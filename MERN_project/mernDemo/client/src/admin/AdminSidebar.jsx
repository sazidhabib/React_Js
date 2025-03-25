import React from "react";
import { NavLink } from "react-router-dom";

function AdminSidebar() {
  return (
    <div className="p-3">
      <h4 className="text-center">Admin Panel</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to="/admin" className="nav-link text-white" activeClassName="active">
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/table" className="nav-link text-white" activeClassName="active">
            Article
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/blog" className="nav-link text-white" activeClassName="active">
            Blog
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/charts" className="nav-link text-white" activeClassName="active">
            Charts
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/tables" className="nav-link text-white" activeClassName="active">
            Tables
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
