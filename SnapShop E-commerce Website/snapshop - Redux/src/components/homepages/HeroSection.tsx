import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="flex z-10 flex-col items-start self-center w-full max-w-[1305px] max-md:max-w-full">
      <div className="w-full max-w-[1170px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          {/* Sidebar Navigation */}
          <aside className="hidden md:flex flex-col w-[21%] max-md:ml-0 max-md:w-full">
            <nav className="flex grow gap-4 text-base text-center text-black max-md:mt-10">
              <div className="flex flex-col items-start self-end mt-10">
                <ul>
                  {[
                    "Woman's Fashion",
                    "Men's Fashion",
                    "Electronics",
                    "Home & Lifestyle",
                    "Medicine",
                    "Sports & Outdoor",
                    "Baby's & Toys",
                    "Groceries & Pets",
                    "Health & Beauty",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className={`flex gap-10 items-start self-stretch ${
                        index > 0 ? "mt-4" : ""
                      }`}
                    >
                      <a
                        href={`#${item
                          .toLowerCase()
                          .replace(/[^a-z0-9]/g, "-")}`}
                      >
                        {item}
                      </a>
                      {index < 2 && (
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/419e3d65c94f39310352312d26156e850a5fd9835e5ec39a019f5290ed34bf71?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                          className="object-contain shrink-0 w-6 aspect-square"
                          alt=""
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="shrink-0 w-px h-96 border border-black border-solid"></div>
            </nav>
          </aside>

          {/* Main Hero Content */}
          <main className="flex flex-col ml-5 w-[100%] max-md:ml-0 md:w-full">
            <div className="overflow-hidden grow pt-4 pl-16 mt-10 w-full bg-black max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col">
                {/* Hero Text Section */}
                <div className="flex flex-col w-[37%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col items-start my-auto text-neutral-50">
                    <div className="flex gap-6 items-center">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/772cdd422d5a0b6b8b1c31e773a46607fc2b11be93b509419d37c3091dc8a920?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                        className="object-contain w-10"
                        alt="Apple logo"
                      />
                      <p>iPhone 14 Series</p>
                    </div>
                    <h2 className="mt-5 text-5xl font-semibold leading-[60px] max-md:text-4xl max-md:leading-[56px]">
                      Up to 10% off Voucher
                    </h2>
                    <div className="flex gap-2 items-center mt-6 font-medium">
                      <a href="#shop-now" className="flex items-start w-[81px]">
                        <span>Shop Now</span>
                        <div className="mt-1 border border-neutral-50 w-[81px]"></div>
                      </a>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a9f9190215df855e46de68e25db2cebf222e4b26191868239034c2f0ce1ceb8?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                        className="object-contain w-6"
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                {/* Hero Image Section */}
                <div className="relative flex flex-col ml-5 w-[63%] max-md:ml-0 max-md:w-full">
                  <div className="pt-72 pb-3 w-full min-h-[328px] max-md:pt-24">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/a0ad3dc472dc513c9563b3a674837965896bb7a86d13e583e04f974a1dff669d?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                      className="absolute inset-0 w-full h-full object-cover"
                      alt="iPhone 14"
                    />
                    <div className="relative flex gap-3 items-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full bg-white bg-opacity-50 ${
                            i === 2 ? "bg-opacity-100" : ""
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
