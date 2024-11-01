import React from "react";
import TopHeader from "./TopHeader";
import MainHeader from "./MainHeader";
import AboutHero from "./AboutHero";
import Stats from "./Starts";
import Team from "./Team";
import Carousel from "./Carousel";
import Services from "./Services";
import Footer from "./Footer";

const AboutPage: React.FC = () => {
  return (
    <div
      data-layername="about"
      className="flex overflow-hidden flex-col bg-white"
    >
      <TopHeader />
      <MainHeader />
      <div className="mt-4 w-full bg-black border border-black border-solid opacity-30 min-h-[1px] max-md:max-w-full" />
      <AboutHero />
      <Stats />
      <Team />
      <Carousel />
      <Services />
      <Footer />
    </div>
  );
};

export default AboutPage;
