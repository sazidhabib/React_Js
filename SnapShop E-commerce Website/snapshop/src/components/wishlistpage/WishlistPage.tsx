import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import ProductCard from "./ProductCard";

const WishlistPage: React.FC = () => {
  const { wishlist } = useContext(GlobalContext);

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
      <main className="flex flex-col self-center mt-20 max-md:mt-10 max-md:max-w-full px-4">
        <section className="flex flex-col max-md:max-w-full">
          <div className="flex flex-wrap gap-10 items-center max-md:max-w-full">
            <h2 className="self-stretch my-auto text-xl leading-tight text-center text-black">
              Wishlist (4)
            </h2>
            <button className="gap-2.5 self-stretch px-12 py-4 my-auto text-base font-medium text-black rounded border border-solid border-black border-opacity-50 max-md:px-5">
              Move All To Bag
            </button>
          </div>
          <div className="flex flex-wrap justify-around gap-8 items-start mt-16 max-md:mt-10 max-md:max-w-full">
            {wishlist.map((item) => (
              <ProductCard key={item.id} {...item} />
            ))}
            {wishlist.length === 0 && (
              <p>
                There is no product in WishList. Please add products to
                wishlist...
              </p>
            )}
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
          <div className="flex flex-wrap justify-around gap-8 items-start mt-16 max-md:mt-10 max-md:max-w-full">
            {justForYouItems.map((item, index) => (
              <ProductCard key={index} {...item} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default WishlistPage;
