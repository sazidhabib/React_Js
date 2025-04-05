import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../admin/AdminNavbar";
import AdminSidebar from "../admin/AdminSidebar";

const AdminPanel = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="vh-100 d-flex flex-column">
      {/* Navbar */}
      <AdminNavbar toggleSidebar={toggleSidebar} />

      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <AdminSidebar isSidebarOpen={isSidebarOpen} />

        {/* Main Content - Centered */}
        <main className="d-flex flex-grow-1 p-3">
          <div className="w-100">
            <Outlet />
            {children}
          </div>
        </main>

      </div>
    </div>
  );
};

export default AdminPanel;
