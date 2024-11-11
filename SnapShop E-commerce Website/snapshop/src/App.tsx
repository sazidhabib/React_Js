import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import AboutPage from "./components/about/AboutPage";
import ContactPage from "./components/contactpage/ContactPage";
import HomePage from "./components/homepages/HomePage";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import ProductsPage from "./components/productlist/ProductsPage";
import WishlistPage from "./components/wishlistpage/WishlistPage";
import Cart from "./components/cart/Cart";
import ErrorPage from "./components/errorpage/ErrorPage";
import LoginPage from "./components/login/LoginPage";
import SignUp from "./components/signup/SignUp";
import AccountPage from "./components/accountpage/AccountPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <Router>
      <Layout />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="//wishlist" element={<WishlistPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route path="/signup" element={<SignUp />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
