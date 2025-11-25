// import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import AlbumDashboard from "./admin/AlbumDashboard";
import PhotoDashboard from "./admin/PhotoDashboard";
import MenuDashboard from "./admin/MenuDashboard";
import HeroSectionDashboard from "./admin/HeroSectionDashboard";
import SectionDashboard from "./admin/SectionDashboard";
import VideoDashboard from "./admin/VideoDashboard";
import UserDashboard from "./admin/UserDashboard";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="table" element={<AdminTable />} />
          <Route path="article" element={<ArticleDashboard />} />
          <Route path="blog" element={<BlogPostDashboard />} />
          <Route path="album" element={<AlbumDashboard />} />
          <Route path="photos" element={<PhotoDashboard />} />
          <Route path="menu" element={<MenuDashboard />} />
          <Route path="songs" element={<SongDashboard />} />
          <Route path="videos" element={<VideoDashboard />} />
          <Route path="hero-section" element={<HeroSectionDashboard />} />
          <Route path="sections" element={<SectionDashboard />} />
          <Route path="users" element={<UserDashboard />} />
        </Route>

        {/* Home/Catch-all Route - MUST BE LAST */}
        <Route path="/*" element={<HomeLayout />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;