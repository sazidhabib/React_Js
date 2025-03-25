import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../admin/AdminNavbar";
import AdminSidebar from "../admin/AdminSidebar";

const AdminPanel = () => {
  return (
    <div className="sb-nav-fixed">
      <AdminNavbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <AdminSidebar />
        </div>
        <div id="layoutSidenav_content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
