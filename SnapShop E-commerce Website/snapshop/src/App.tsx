import "./App.css";
import AboutPage from "./components/about/AboutPage";
import AccountPage from "./components/accountpage/AccountPage";
import Cart from "./components/cart/Cart";
import CheckOut from "./components/checkout/CheckOut";
import ContactPage from "./components/contactpage/ContactPage";
import ErrorPage from "./components/errorpage/ErrorPage";
import HomePage from "./components/homepages/HomePage";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import SignUp from "./components/signup/SignUp";
import WishlistPage from "./components/wishlistpage/WishlistPage";
//import NewHomePage from "./components/pages/NewHomePage";

function App() {
  return (
    <>
      <HomePage />
      <SignUp />
      <WishlistPage />
      <Cart />
      <CheckOut />
      <AccountPage />
      <AboutPage />
      <ContactPage />
      <ErrorPage />
      <ProductDetails />
    </>
  );
}

export default App;
