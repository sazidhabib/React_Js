import { useEffect, useState } from "react";
import { baseLink } from "../constant/index";
import { imgLink } from "../constant";

import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css"; // Default styles
import "react-awesome-slider/dist/custom-animations/fall-animation.css"; // Fall animation
import withAutoplay from "react-awesome-slider/dist/autoplay"; // Import Autoplay

const AutoplaySlider = withAutoplay(AwesomeSlider);

const getSlider = async () => {
  const response = await fetch(`${baseLink}/sliders`);
  const data = await response.json();

  console.log(data.id);
};

console.log(getSlider());
const Slider = () => {
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    fetch(`${baseLink}/sliders`)
      .then((response) => response.json())
      .then((data) => setSliders(data))
      .catch((error) => console.error("Error fetching sliders:", error));
  }, []);

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
        {sliders.map((slide, index) => (
          <div key={index} data-src={`${imgLink}/sliders/${slide.image}`} />
        ))}
      </AutoplaySlider>
    </div>
  );
};

export default Slider;
