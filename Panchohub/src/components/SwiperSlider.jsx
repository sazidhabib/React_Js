import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Correctly import modules from 'swiper/modules'
import { Pagination, Navigation } from "swiper/modules";

const SwiperSlider = () => {
  const slides = [
    "image/image1.jpeg",
    "image/image1.jpeg",
    "image/image1.jpeg",
  ];

  return (
    <div className="bg-gray-100">
      <div className="bg-gray-100" style={{ width: "600px", margin: "auto" }}>
        <Swiper
          modules={[Pagination, Navigation]} // Attach the modules
          pagination={{ clickable: true }} // Enable pagination
          navigation={true} // Enable navigation arrows
          loop={true} // Loop the slides
          spaceBetween={50}
          slidesPerView={1}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SwiperSlider;
