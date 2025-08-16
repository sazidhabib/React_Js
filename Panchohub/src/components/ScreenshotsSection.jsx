import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";

const ScreenshotsSection = () => {
  const screenshots = [
    { id: 1, src: "image/Screenshot_1.png", alt: "screenshot" },
    { id: 2, src: "image/Screenshot_2.png", alt: "screenshot" },
    { id: 3, src: "image/Screenshot_3.png", alt: "screenshot" },
    { id: 4, src: "image/Screenshot_4.png", alt: "screenshot" },
    { id: 5, src: "image/Screenshot_5.png", alt: "screenshot" },
    { id: 6, src: "image/Screenshot_6.png", alt: "screenshot" },
    { id: 7, src: "image/Screenshot_7.png", alt: "screenshot" },
  ];

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <section id="screens" className="relative z-20 pt-[110px]">
      <div className="container mx-auto">
        <div
          className="wow fadeInUp mx-auto mb-10 max-w-[900px] text-center"
          data-wow-delay=".2s"
        >
          <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
            App Screenshots
          </h2>
          <p className="text-base text-body">
            এখানে আমরা আমাদের অ্যাপের লাইভ স্ক্রিনশট শেয়ার করেছি, যাতে আপনি সহজেই এর ডিজাইন, ফিচার এবং ব্যবহার পদ্ধতি সম্পর্কে ধারণা নিতে পারেন। স্ক্রিনশটগুলো দেখে আপনি অ্যাপের ভেতরের ইন্টারফেস ও কার্যপ্রণালী আগে থেকেই বুঝতে পারবেন, যা আপনাকে ডাউনলোড করার আগে একটি পরিষ্কার অভিজ্ঞতা দিবে।.
          </p>
        </div>
      </div>

      <div className="container mx-auto">
        <div
          className="wow fadeInUp mx-auto max-w-[1000px]"
          data-wow-delay=".2s"
        >
          <div className="relative z-20 mx-auto">
            <div className="absolute top-0 left-0 right-0 z-50 mx-auto w-full md:w-1/3">
              <img
                src="image/mobile-frame.png"
                alt="mobile-frame"
                className="mx-auto max-w-full"
              />
            </div>
            <div className="flex">
              <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                spaceBetween={30}
                slidesPerView={3}
                centeredSlides={true}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                touchEventsTarget="container"
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 25,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
                className="py-2 w-full"
              >
                {screenshots.map((screenshot) => (
                  <SwiperSlide key={screenshot.id}>
                    <div className="mx-auto w-full max-w-[261px] xs:max-w-[265px] py-2">
                      <img
                        src={screenshot.src}
                        alt={screenshot.alt}
                        className="mx-auto w-full rounded-2xl"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {/* Navigation buttons below the swiper */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              <button
                ref={prevRef}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                aria-label="Previous slide"
              >
                <FiChevronLeft className="text-2xl text-gray-700" />
              </button>
              <button
                ref={nextRef}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                aria-label="Next slide"
              >
                <FiChevronRight className="text-2xl text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Graphics */}
    </section>
  );
};

export default ScreenshotsSection;
