import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import KeyFeatures from "./components/KeyFeatures";
import FeatureDetails from "./components/FeatureDetails";
import Services from "./components/Services";
import { plans } from "./constant";

import "./App.css";
import Header from "./components/Header";

import SwiperSlider from "./components/SwiperSlider";
import Slider from "./components/Slider";
import NewsScrolling from "./components/NewsScrolling";
import Package from "./components/Package";
import DoctorCategories from "./components/DoctorCategoris";

function App() {
  return (
    <Router>
      <Header />
      <NewsScrolling />
      <Slider />
      <Routes>
        <Route path="/" element={<KeyFeatures />} />
        <Route path="/feature/:slug" element={<FeatureDetails />} />
      </Routes>
      <Package plans={plans} />
      <Services />
      <DoctorCategories />
    </Router>
  );
}

export default App;
