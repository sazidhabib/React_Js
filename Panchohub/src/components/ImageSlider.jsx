import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FullWidthSlider = () => {
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Loop the slides
    speed: 500, // Transition speed
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Autoplay interval
  };

  const images = ["image/image1.jpeg", "image/image2.jpg"];

  return (
    <div className=" container mx-auto w-full mt-5">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="flex justify-center items-cente ">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="h-auto w-full object-cover rounded-md"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FullWidthSlider;
