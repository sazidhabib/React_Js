import React from "react";
import ProductCard from "./ProductCard";

const ProductsPage: React.FC = () => {
  const wishlistItems = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/21ee6e335ae9924a6e3f4f8d94798cec2f6ec584333896550356c05f5acab46a?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      title: "Gucci duffle bag",
      price: "$960",
      originalPrice: "$1160",
      discount: "-35%",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/623eb32eb1bbc25f1dc254a16c9cc73fa991f608ad75733d84070533c47c43a9?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      title: "RGB liquid CPU Cooler",
      price: "$1960",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/aa70e9baabbdd2932d65630db583f5e35497d82d8df49ce4b4b04c9ea246aba3?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      title: "GP11 Shooter USB Gamepad",
      price: "$550",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f53d1575c5dccca3733da8baa05d2d3e119a3c8552cb518629866a49fa0488f7?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      title: "Quilted Satin Jacket",
      price: "$750",
    },
  ];

  const justForYouItems = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bb44ca87fca38b27f10b8a899bc34eaeaf54123a82dc3023078ae6687a63a1a2?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      title: "ASUS FHD Gaming Laptop",
      price: "$960",
      originalPrice: "$1160",
      discount: "-35%",
      rating: 5,
      reviews: 65,
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/38fb1b7c0b0c5bfee5f9ee5cae45ee04b50a3a5cfbcf29cc559cdeb284a2057a?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      title: "IPS LCD Gaming Monitor",
      price: "$1160",
      rating: 5,
      reviews: 65,
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e93ad05ae04f0b54f4159cbcf6911a27cb651cbe215adedef39517dbfe9650fd?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      title: "HAVIT HV-G92 Gamepad",
      price: "$560",
      isNew: true,
      rating: 5,
      reviews: 65,
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/894eec9e8d60eee4f3c00e3415a295bffbe214c139b91ff832ad88185ddcdbe2?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      title: "AK-900 Wired Keyboard",
      price: "$200",
      rating: 5,
      reviews: 65,
    },
  ];

  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <hr className="mt-4 w-full bg-black border-black border-solid opacity-30 min-h-[1px] max-md:max-w-full" />

      <main className="flex flex-col self-center mt-20 max-md:mt-10 max-md:max-w-full">
        <section className="flex flex-col max-md:max-w-full">
          <div className="flex flex-wrap gap-10 items-center max-md:max-w-full">
            <h2 className="self-stretch my-auto text-xl leading-tight text-center text-black">
              Wishlist (4)
            </h2>
            <button className="gap-2.5 self-stretch px-12 py-4 my-auto text-base font-medium text-black rounded border border-solid border-black border-opacity-50 max-md:px-5">
              Move All To Bag
            </button>
          </div>
          <div className="flex flex-wrap gap-8 items-start mt-16 max-md:mt-10 max-md:max-w-full">
            {wishlistItems.map((item, index) => (
              <ProductCard key={index} {...item} />
            ))}
          </div>
        </section>

        <section className="flex flex-col mt-20 max-md:mt-10 max-md:max-w-full">
          <div className="flex flex-wrap gap-10 items-center max-md:max-w-full">
            <div className="flex gap-4 items-center self-stretch my-auto">
              <div className="flex shrink-0 h-10 bg-red-500 rounded w-5" />
              <h2 className="self-stretch my-auto text-xl leading-tight text-center text-black">
                Just For You
              </h2>
            </div>
            <button className="gap-2.5 self-stretch px-12 py-4 my-auto text-base font-medium text-black rounded border border-solid border-black border-opacity-50 max-md:px-5">
              See All
            </button>
          </div>
          <div className="flex flex-wrap gap-8 items-start mt-16 max-md:mt-10 max-md:max-w-full">
            {justForYouItems.map((item, index) => (
              <ProductCard key={index} {...item} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductsPage;
