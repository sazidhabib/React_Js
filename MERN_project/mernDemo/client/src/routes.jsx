import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminTable from "./admin/AdminTable";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./admin/AdminDashboard";
import ArticleDashboard from "./admin/ArticleDashboard";
import BlogPostDashboard from "./admin/BlogPostDashboard";


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Home Page Layout */}
        <Route path="/" element={<HomeLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Panel Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="/admin/table" element={<AdminTable />} />
          <Route path="/admin/article" element={<ArticleDashboard />} />
          <Route path="/admin/blog" element={<BlogPostDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
