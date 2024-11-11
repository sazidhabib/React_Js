import React from "react";
import ProductCard from "./ProductCard";

const TopRatedProducts: React.FC = () => {
  const products = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/b105a8dbe1dc9f006b0f6cd6d18aaa0fbf4ea8f515104bdd3ea732d4e299eed5?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      name: "The north coat",
      price: "$260",
      originalPrice: "$360",
      rating: 5,
      reviews: 65,
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6bd72a2c7b81b0644ae58cdd3fc8a4ade69cc80b404f273928ba1d0d2f57086e?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      name: "Gucci duffle bag",
      price: "$960",
      originalPrice: "$1160",
      rating: 4,
      reviews: 65,
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/2f91e7a05224c2a05864f6b013ea6ea93cd54318632b730b94f07fd9e6c5632b?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      name: "RGB liquid CPU Cooler",
      price: "$160",
      originalPrice: "$170",
      rating: 4,
      reviews: 65,
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c8a264718fe1b660f1abf2ccf93f14a24cabe7eb02b1f268fc2c9d64cae26154?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      name: "Small BookSelf",
      price: "$360",
      originalPrice: "$360",
      rating: 5,
      reviews: 65,
    },
  ];

  return (
    <section className="flex flex-col items-center mt-16 w-full px-4 mx-auto md:px-6 ">
      <div className="flex flex-wrap gap-6 items-end w-full justify-between">
        <div className="flex flex-col min-w-[240px] md:min-w-[280px]">
          <div className="flex items-center gap-4">
            <div className="w-5 h-10 bg-red-500 rounded"></div>
            <h2 className="text-lg md:text-base font-semibold text-red-500">
              This Month
            </h2>
          </div>
          <h3 className="mt-4 text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight tracking-widest text-black">
            Top Rated Products
          </h3>
        </div>
        <button className="self-stretch px-6 md:px-12 py-2 md:py-4 bg-red-500 text-white font-medium text-sm md:text-base rounded-md">
          View All
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 mt-8 md:mt-10 lg:mt-12">
        {products.map((product, index) => (
          <div
            key={index}
            className="min-w-[220px] sm:min-w-[260px] md:min-w-[280px] lg:min-w-[300px]"
          >
            <ProductCard {...product} discount="" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopRatedProducts;
