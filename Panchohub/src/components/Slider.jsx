import React from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css"; // Default styles
import "react-awesome-slider/dist/custom-animations/fall-animation.css"; // Fall animation
import withAutoplay from "react-awesome-slider/dist/autoplay"; // Import Autoplay

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Slider = () => {
  const slides = [
    "image/slider1.jpg",
    "image/slider3.png",
    "image/slider4.jpg",
  ];

  return (
    <div
      className="sm:w-[90%] md:w-[80%] lg:w-[76%] mx-auto"
      style={{ height: "500px" }}
    >
      <AutoplaySlider
        animation="fallAnimation"
        organicArrows={true}
        bullets={true}
        play={true}
        cancelOnInteraction={false} // Autoplay will not stop on user interaction
        interval={3000} // Interval between slides in milliseconds
        mobileTouch={true}
        style={{ height: "500px", borderRadius: "10px" }} // Set height for the slider
      >
        {slides.map((slide, index) => (
          <div key={index} data-src={slide} />
        ))}
      </AutoplaySlider>
    </div>
  );
};

export default Slider;
