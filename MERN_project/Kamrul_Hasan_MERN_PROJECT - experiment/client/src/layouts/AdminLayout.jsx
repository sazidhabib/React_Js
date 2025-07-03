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
    <div className="vh-100 d-flex flex-column overflow-hidden">
      {/* Fixed Navbar */}
      <AdminNavbar toggleSidebar={toggleSidebar} className="fixed-top" />

      <div className="d-flex flex-grow-1" >
        {/* Fixed Sidebar */}
        <div
          className={`position-sticky top-56 h-100 overflow-y-auto bg-dark text-white ${isSidebarOpen ? "w-250" : "w-0"}`}
          style={{
            zIndex: 1020,
            minWidth: isSidebarOpen ? "250px" : "0",
            maxHeight: "calc(100vh - 56px)" // Ensures sidebar doesn't exceed viewport
          }}
        >
          <AdminSidebar isSidebarOpen={isSidebarOpen} />
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-grow-1 d-flex flex-column" style={{
          overflow: "auto",
          maxHeight: "calc(100vh - 56px)" // Takes full remaining height
        }}>
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