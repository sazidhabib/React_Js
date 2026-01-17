import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import PopularFrames from './pages/PopularFrames';
import TextFrames from './pages/TextFrames';
import AllFrames from './pages/AllFrames';
import AddFrame from './pages/AddFrame';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Admin Pages
import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import Users from './pages/admin/Users';
import Frames from './pages/admin/Frames';
import Settings from './pages/admin/Settings';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-gray-900 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/popular-frames" element={<PopularFrames />} />
            <Route path="/text-frames" element={<TextFrames />} />
            <Route path="/all-frames" element={<AllFrames />} />
            <Route path="/add-frame" element={<AddFrame />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="frames" element={<Frames />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
