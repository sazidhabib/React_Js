import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import KeyFeatures from "./components/KeyFeatures";
import FeatureDetails from "./components/FeatureDetails";
import { plans } from "./constant";
import "./App.css";
import Header from "./components/Header";
import StandaloneLayout from "./layouts/StandaloneLayout";
import Slider from "./components/Slider";
import NewsScrolling from "./components/NewsScrolling";
import DoctorCategories from "./components/DoctorCategoris";
import ScreenshotsSection from "./components/ScreenshotsSection";
import AppDownload from "./components/AppDownload";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy";
import FaqSection from "./components/FaqSection";
import PricingSection from "./components/PricingSection";
import Testimonials from "./components/Testimonials";
import AboutUs from "./components/AboutUs";
import DeleteAccountPage from "./components/DeleteAccountPage";
import ContactPage from "./components/ContactPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes with header/footer */}
        <Route
          path="/*"
          element={
            <>
              <Header />
              <AppDownload />
              <NewsScrolling />
              <Slider />
              <Routes>
                <Route path="/" element={<KeyFeatures />} />
                <Route path="/feature/:slug" element={<FeatureDetails />} />
                <Route path="/doctors" element={<DoctorCategories />} />
              </Routes>
              {/* <AboutUs /> */}

              <Testimonials />
              <FaqSection />
              {/* <PricingSection /> */}
              {/* <ContactPage /> */}
              <ScreenshotsSection />

              <Footer />
            </>
          }
        />

        {/* Completely standalone privacy policy route */}
        <Route
          path="/privacy-policy"
          element={
            <StandaloneLayout>
              <PrivacyPolicy />
            </StandaloneLayout>
          }
        />
        {/* Delete account route */}
        <Route
          path="/delete-account"
          element={
            <StandaloneLayout>
              <DeleteAccountPage />
            </StandaloneLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
