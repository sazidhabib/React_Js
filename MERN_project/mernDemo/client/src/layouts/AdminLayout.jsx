import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../admin/AdminNavbar";
import AdminSidebar from "../admin/AdminSidebar";

const AdminPanel = () => {
  return (
    <div className="sb-nav-fixed">
      <AdminNavbar />
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-2 col-lg-2 bg-dark text-white vh-100" id="layoutSidenav_nav">
            <AdminSidebar />
          </div>

          {/* Content */}
          <div className="col-md-10 col-lg-10 p-4" id="layoutSidenav_content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
