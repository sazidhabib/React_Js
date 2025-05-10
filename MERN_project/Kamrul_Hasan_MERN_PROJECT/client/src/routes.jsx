import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminTable from "./admin/AdminTable";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./admin/AdminDashboard";
import ArticleDashboard from "./admin/ArticleDashboard";
import BlogPostDashboard from "./admin/BlogPostDashboard";
import Logout from "./components/Logout";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import SongDashboard from "./admin/SongDashboard";


const AppRoutes = () => {
  return (
    <Router>

      <Routes>
        {/* Home Page Layout */}
        <Route path="/*" element={<HomeLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Panel Layout */}
        <Route path="/admin" element={<ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="/admin/table" element={<AdminTable />} />
          <Route path="/admin/article" element={<ArticleDashboard />} />
          <Route path="/admin/blog" element={<BlogPostDashboard />} />
          <Route path="/admin/songs" element={<SongDashboard />} />
        </Route>
      </Routes>

    </Router>
  );
};

export default AppRoutes;
