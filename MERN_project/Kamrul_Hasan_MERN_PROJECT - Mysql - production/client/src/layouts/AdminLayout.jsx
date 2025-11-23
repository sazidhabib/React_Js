import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../admin/AdminNavbar";
import AdminSidebar from "../admin/AdminSidebar";

const AdminPanel = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="vh-100 d-flex flex-column overflow-hidden">
      {/* Fixed Navbar */}
      <AdminNavbar toggleSidebar={toggleSidebar} className="fixed-top" />

      <div className="d-flex flex-grow-1">
        {/* Sidebar Container - Responsive */}
        <div
          className={`
            position-fixed position-lg-sticky 
            top-56 h-100 overflow-y-auto bg-dark text-white 
            ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}
          `}
          style={{
            zIndex: 1020,
            maxHeight: "calc(100vh - 56px)",
            transition: "transform 0.3s ease-in-out, min-width 0.3s ease-in-out"
          }}
        >
          <AdminSidebar isSidebarOpen={isSidebarOpen} onClose={closeSidebar} />
        </div>



        {/* Scrollable Content Area */}
        <div
          className="flex-grow-1 d-flex flex-column"
          style={{
            overflow: "auto",
            maxHeight: "calc(100vh - 56px)",
            marginLeft: isSidebarOpen ? "0" : "0",
            transition: "margin-left 0.3s ease-in-out"
          }}
        >
          <main className="p-3">
            <div className="container-fluid">
              <Outlet />
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;