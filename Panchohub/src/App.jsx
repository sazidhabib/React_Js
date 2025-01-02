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
import Package from "./components/Package";

function App() {
  const plans = [
    {
      title: "Basic",
      price: 29,
      description:
        "Lorem ipsum dolor sit amet, secteturi adipiscing elit at sem ipsum.",
      features: [
        "Everything in Basic plan Into This",
        "Tellus eget condi To the mentum",
        "Up to $100.000 monthly sales",
        "Unlimited integrations For This Item",
        "Up to 100,000 monthly visits",
      ],
      icon: "https://via.placeholder.com/50", // Example placeholder icon URL
      featured: false,
    },
    {
      title: "Enterprise",
      price: 59,
      description:
        "Lorem ipsum dolor sit amet, secteturi adipiscing elit at sem ipsum.",
      features: [
        "Everything in Basic plan Into This",
        "Tellus eget condi To the mentum",
        "Up to $100.000 monthly sales",
        "Unlimited integrations For This Item",
        "Up to 1,000,000 monthly visits",
      ],
      icon: "https://via.placeholder.com/50", // Example placeholder icon URL
      featured: true,
    },
    {
      title: "Basic",
      price: 29,
      description:
        "Lorem ipsum dolor sit amet, secteturi adipiscing elit at sem ipsum.",
      features: [
        "Everything in Basic plan Into This",
        "Tellus eget condi To the mentum",
        "Up to $100.000 monthly sales",
        "Unlimited integrations For This Item",
        "Up to 100,000 monthly visits",
      ],
      icon: "https://via.placeholder.com/50", // Example placeholder icon URL
      featured: false,
    },
  ];

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
      <Package plans={plans} />
      <Services />
    </>
  );
}

export default App;
