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
    <section className="flex flex-col mt-16 max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 items-end max-md:max-w-full">
        <div className="flex flex-col min-w-[240px]">
          <div className="flex gap-4 items-center self-start">
            <div className="flex flex-col self-stretch my-auto w-5">
              <div className="flex shrink-0 h-10 bg-red-500 rounded"></div>
            </div>
            <h2 className="self-stretch my-auto text-base font-semibold leading-none text-red-500">
              This Month
            </h2>
          </div>
          <h3 className="mt-5 text-4xl font-semibold tracking-widest leading-none text-black">
            Top Rated Products
          </h3>
        </div>
        <button className="gap-2.5 self-stretch px-12 py-4 text-base font-medium bg-red-500 rounded text-neutral-50 max-md:px-5">
          View All
        </button>
      </div>
      <div className="flex flex-wrap gap-8 items-start mt-16 text-base font-medium max-md:mt-10 max-md:max-w-full">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} discount="" />
        ))}
      </div>
    </section>
  );
};

export default TopRatedProducts;
