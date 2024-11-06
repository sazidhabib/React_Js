import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import AboutPage from "./components/about/AboutPage";
// import AccountPage from "./components/accountpage/AccountPage";
import Cart from "./components/cart/Cart";
// import CheckOut from "./components/checkout/CheckOut";
import ContactPage from "./components/contactpage/ContactPage";
// import ErrorPage from "./components/errorpage/ErrorPage";
import HomePage from "./components/homepages/HomePage";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import ProductsPage from "./components/productlistage/ProductsPage";
// import SignUp from "./components/signup/SignUp";
// import WishlistPage from "./components/wishlistpage/WishlistPage";
//import NewHomePage from "./components/pages/NewHomePage";

const App: React.FC = () => {
  return (
    <>
      <Layout>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ProductDetails />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Router>
      </Layout>
      <Footer />
      <ProductsPage />
      <Cart />

      {/* <SignUp />
      <WishlistPage />
      <Cart />
      <CheckOut />
      <AccountPage />

      <ErrorPage /> */}
    </>
  );
};

export default App;

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/contact" element={<Contact />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
