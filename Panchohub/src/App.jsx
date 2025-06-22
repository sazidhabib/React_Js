import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import KeyFeatures from "./components/KeyFeatures";
import FeatureDetails from "./components/FeatureDetails";

import { plans } from "./constant";

import "./App.css";
import Header from "./components/Header";

import SwiperSlider from "./components/SwiperSlider";
import Slider from "./components/Slider";
import NewsScrolling from "./components/NewsScrolling";
import Package from "./components/Package";
import DoctorCategories from "./components/DoctorCategoris";
import ScreenshotsSection from "./components/ScreenshotsSection";
import AppDownload from "./components/AppDownload";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />

      <AppDownload />
      <NewsScrolling />
      <Slider />
      <Routes>
        <Route path="/" element={<KeyFeatures />} />
        <Route path="/feature/:slug" element={<FeatureDetails />} />
        <Route path="/doctors" element={<DoctorCategories />} />
      </Routes>
      <Package plans={plans} />
      <ScreenshotsSection />
      <Footer />


    </Router>
  );
}

export default App;
