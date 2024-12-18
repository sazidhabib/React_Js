import React from "react";

const AboutHero: React.FC = () => {
  return (
    <section className="flex flex-col items-start mt-20 w-full max-w-[1305px] mx-auto px-4 md:px-6 lg:px-8 max-md:mt-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex gap-3 items-center text-sm text-black whitespace-nowrap">
        <a href="#" className="opacity-50">
          Home
        </a>
        <span>About</span>
      </nav>

      {/* Content Section */}
      <div className="flex flex-col mt-11 md:flex-row md:gap-5 max-md:mt-10">
        {/* Text Column */}
        <div className="flex flex-col w-full md:w-[43%]">
          <h2 className="text-4xl font-semibold leading-tight text-black tracking-wide max-md:text-3xl">
            Our Story
          </h2>
          <div className="mt-6 text-base leading-7 text-black max-w-full md:max-w-[525px]">
            <p>
              Launched in 2015, Exclusive is South Asia's premier online
              shopping marketplace with an active presence in Bangladesh.
              Supported by a wide range of tailored marketing, data, and service
              solutions, Exclusive has 10,500 sellers and 300 brands and serves
              3 million customers across the region.
            </p>
            <p className="mt-6">
              Exclusive has more than 1 million products to offer and is growing
              rapidly. Exclusive offers a diverse assortment across categories
              ranging from consumer electronics to fashion.
            </p>
          </div>
        </div>

        {/* Image Column */}
        <div className="flex flex-col mt-10 md:mt-0 md:ml-5 w-full md:w-[57%]">
          <div className="overflow-hidden bg-pink-400 rounded">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d91fe816b0043439606098c814ae8037a347c975735484665286064564d80407?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
              alt="About us illustration"
              className="object-cover w-full h-auto max-md:aspect-[1.16]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
