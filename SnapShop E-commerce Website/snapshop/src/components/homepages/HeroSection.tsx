import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="flex z-10 flex-col items-start self-end w-full max-w-[1305px] max-md:max-w-full">
      <div className="w-full max-w-[1170px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <aside className="flex flex-col w-[21%] max-md:ml-0 max-md:w-full">
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
          <main className="flex flex-col ml-5 w-[79%] max-md:ml-0 max-md:w-full">
            <div className="overflow-hidden grow pt-4 pl-16 mt-10 w-full bg-black max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col">
                <div className="flex flex-col w-[37%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col items-start self-stretch my-auto w-full text-base text-neutral-50 max-md:mt-10">
                    <div className="flex gap-6 items-center text-center">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/772cdd422d5a0b6b8b1c31e773a46607fc2b11be93b509419d37c3091dc8a920?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                        className="object-contain shrink-0 self-stretch my-auto w-10 aspect-[0.82]"
                        alt="Apple logo"
                      />
                      <p className="self-stretch my-auto w-[126px]">
                        iPhone 14 Series
                      </p>
                    </div>
                    <h2 className="self-stretch mt-5 text-5xl font-semibold tracking-widest leading-[60px] max-md:text-4xl max-md:leading-[56px]">
                      Up to 10% off Voucher
                    </h2>
                    <div className="flex gap-2 items-center mt-6 font-medium text-center">
                      <a
                        href="#shop-now"
                        className="flex flex-col self-stretch my-auto w-[81px]"
                      >
                        <span className="self-start">Shop Now</span>
                        <div className="mt-1 border border-solid bg-neutral-50 border-neutral-50 min-h-[1px] w-[81px]"></div>
                      </a>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a9f9190215df855e46de68e25db2cebf222e4b26191868239034c2f0ce1ceb8?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-[63%] max-md:ml-0 max-md:w-full">
                  <div className="flex relative flex-col items-start pt-72 pb-3 w-full min-h-[328px] max-md:pt-24 max-md:mt-10 max-md:max-w-full">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/a0ad3dc472dc513c9563b3a674837965896bb7a86d13e583e04f974a1dff669d?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                      className="object-cover absolute inset-0 size-full"
                      alt="iPhone 14"
                    />
                    <div className="flex relative gap-3 items-center">
                      <div className="flex shrink-0 self-stretch my-auto w-3 h-3 rounded-full bg-white bg-opacity-50 fill-white"></div>
                      <div className="flex shrink-0 self-stretch my-auto w-3 h-3 rounded-full bg-white bg-opacity-50 fill-white"></div>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6197da67d2a30b0f3aed051f4377cce1b6b8adcaa3bb6e32f46eb1058f1bcecd?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                        className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square"
                        alt="Active indicator"
                      />
                      <div className="flex shrink-0 self-stretch my-auto w-3 h-3 rounded-full bg-white bg-opacity-50 fill-white"></div>
                      <div className="flex shrink-0 self-stretch my-auto w-3 h-3 rounded-full bg-white bg-opacity-50 fill-white"></div>
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
