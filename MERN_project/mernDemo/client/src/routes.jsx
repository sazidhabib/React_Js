import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminTable from "./admin/AdminTable";
import Login from "./components/Login";
import Register from "./components/Register";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Home Page Layout */}
        <Route path="/" element={<HomeLayout />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Panel Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/table" element={<AdminTable />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
