import React from "react";

const Banner = () => (
  <section className="relative py-12 lg:py-20">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="flex flex-col items-center lg:flex-row lg:justify-between">
        {/* Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-gray-800 leading-tight lg:text-5xl">
            Scale design & dev operations with Avocode Enterprise
          </h1>
          <p className="mt-6 text-gray-600 text-lg">
            A fully integrated suite of authentication & authorization products,
            Stytch’s platform removes the headache of.
          </p>
          <a
            className="inline-block mt-8 px-6 py-3 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition"
            href="#"
          >
            Download The Theme
          </a>
        </div>

        {/* Image */}
        <div className="lg:w-1/2 mt-10 lg:mt-0">
          <img
            className="w-full max-w-lg mx-auto lg:max-w-none object-contain"
            src="/image/banner-img.png"
            width="603"
            height="396"
            alt="Banner"
          />
        </div>
      </div>
    </div>
  </section>
);

export default Banner;
