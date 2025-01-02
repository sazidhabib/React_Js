import Banner from "./components/Banner";
import KeyFeatures from "./components/KeyFeatures";
import Services from "./components/Services";
import Navbar from "./components/Navbar";

import "./App.css";
import Header from "./components/Header";
import ImageSlider from "./components/ImageSlider";
import SwiperSlider from "./components/SwiperSlider";
import Slider from "./components/Slider";
import NewsScrolling from "./components/NewsScrolling";

function App() {
  return (
    <>
      <Header />
      <NewsScrolling />
      <Slider />
      {/* <SwiperSlider /> */}
      {/* <ImageSlider /> */}
      {/* <Navbar /> */}
      {/* <Banner /> */}
      <KeyFeatures />
      <Services />
    </>
  );
}

export default App;
