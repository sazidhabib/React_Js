import React from "react";
import ProductCard from "./ProductCard";

interface FlashSaleProduct {
  image: string;
  name: string;
  price: string;
  originalPrice: string;
  rating: number;
  reviews: number;
  discount: string;
}

const FlashSaleSection: React.FC = () => {
  const flashSaleProducts: FlashSaleProduct[] = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e93ad05ae04f0b54f4159cbcf6911a27cb651cbe215adedef39517dbfe9650fd?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      name: "HAVIT HV-G92 Gamepad",
      price: "$120",
      originalPrice: "$160",
      rating: 5,
      reviews: 88,
      discount: "-40%",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/9170071e3daa89b6799f0d14f0342b75a9776f989a852592d8f39e9178cf47ff?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      name: "AK-900 Wired Keyboard",
      price: "$960",
      originalPrice: "$1160",
      rating: 4,
      reviews: 75,
      discount: "-35%",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/38fb1b7c0b0c5bfee5f9ee5cae45ee04b50a3a5cfbcf29cc559cdeb284a2057a?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      name: "IPS LCD Gaming Monitor",
      price: "$370",
      originalPrice: "$400",
      rating: 5,
      reviews: 99,
      discount: "-30%",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/0e3fa4e823535c56b66e939b98c8a904352198ab013849f3cad68fd370f6bcda?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      name: "S-Series Comfort Chair",
      price: "$375",
      originalPrice: "$400",
      rating: 4,
      reviews: 99,
      discount: "-25%",
    },
  ];

  return (
    <section className="flex flex-col self-center mt-36 w-full px-4 mx-auto md:px-6 lg:px-8">
      <div className="flex flex-wrap gap-6 items-end max-w-full justify-between">
        <div className="flex flex-col min-w-[240px] md:min-w-[280px]">
          <div className="flex flex-col h-[103px]">
            <div className="flex gap-2 items-center">
              <div className="h-10 w-5 bg-red-500 rounded"></div>
              <h2 className="text-base font-semibold text-red-500">Today's</h2>
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-black md:text-3xl lg:text-4xl">
              Flash Sales
            </h3>
          </div>
          <div className="flex gap-4 text-black mt-4">
            {["Days", "Hours", "Minutes", "Seconds"].map((unit, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-xs font-medium">{unit}</div>
                <div className="text-2xl font-bold mt-1 md:text-3xl">
                  {index === 0
                    ? "03"
                    : index === 1
                    ? "23"
                    : index === 2
                    ? "19"
                    : "56"}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button aria-label="Previous" className="focus:outline-none">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d46c131187bfff9eb633481579a064341b51d7196040ee40dd3f9577e445a5e?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
              className="object-contain w-10 md:w-12"
              alt=""
            />
          </button>
          <button aria-label="Next" className="focus:outline-none">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e88e31fcac886e936832d43b7fb2b7a3e219274da66d8e9d07a08a6cc7094c1b?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
              className="object-contain w-10 md:w-12"
              alt=""
            />
          </button>
        </div>
      </div>
      <div className="flex overflow-x-auto gap-4 mt-6 pb-4 md:gap-6 md:mt-8 lg:gap-8 lg:mt-10">
        {flashSaleProducts.map((product, index) => (
          <div
            key={index}
            className="min-w-[220px] sm:min-w-[260px] md:min-w-[280px] lg:min-w-[300px]"
          >
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FlashSaleSection;
