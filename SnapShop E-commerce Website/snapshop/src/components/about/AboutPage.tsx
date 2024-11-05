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
      <div className="mt-4 w-full bg-black border border-black border-solid opacity-30 min-h-[1px] max-md:max-w-full" />
      <AboutHero />
      <Stats />
      <Team />
      <Carousel />
      <Services />
    </div>
  );
};

export default AboutPage;
