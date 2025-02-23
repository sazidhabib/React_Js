import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import KeyFeatures from "./components/KeyFeatures";
import FeatureDetail from "./components/FeatureDetail";
import Services from "./components/Services";
import { plans } from "./constant";

import "./App.css";
import Header from "./components/Header";

import SwiperSlider from "./components/SwiperSlider";
import Slider from "./components/Slider";
import NewsScrolling from "./components/NewsScrolling";
import Package from "./components/Package";

function App() {
  return (
    <Router>
      <Header />
      <NewsScrolling />
      <Slider />
      <Routes>
        <Route path="/" element={<KeyFeatures />} />
        <Route path="/feature/:slug" element={<FeatureDetail />} />
      </Routes>
      <Package plans={plans} />
      <Services />
    </Router>
  );
}

export default App;
