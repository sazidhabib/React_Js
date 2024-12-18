import React from "react";
import AboutHero from "./AboutHero";
import Stats from "./Starts";
import Team from "./Team";
import Carousel from "./Carousel";
import Services from "./Services";

const AboutPage: React.FC = () => {
  return (
    <div
      data-layername="about"
      className="flex overflow-hidden flex-col bg-white"
    >
      <AboutHero />
      <Stats />
      <Team />
      <Carousel />
      <Services />
    </div>
  );
};

export default AboutPage;
