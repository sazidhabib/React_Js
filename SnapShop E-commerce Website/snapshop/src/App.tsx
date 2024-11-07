import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import AboutPage from "./components/about/AboutPage";
import ContactPage from "./components/contactpage/ContactPage";
import HomePage from "./components/homepages/HomePage";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import ProductsPage from "./components/productlistage/ProductsPage";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ProductDetails />} />
          <Route path="/product" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </Layout>
    </Router>
  );
};

export default App;
