import React from "react";

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  originalPrice: string;
  rating: number;
  reviews: number;
  discount: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  originalPrice,
  rating,
  reviews,
  discount,
}) => {
  return (
    <article className="flex flex-col min-w-[240px] w-[270px]">
      <div className="flex overflow-hidden gap-1 items-start px-3 pt-3 pb-12 max-w-full rounded bg-neutral-100 w-[270px]">
        <div className="flex flex-col text-xs whitespace-nowrap text-neutral-50">
          <div className="gap-2.5 self-start px-3 py-1 bg-red-500 rounded">
            {discount}
          </div>
          <img
            loading="lazy"
            src={image}
            className="object-contain self-end mt-3 max-w-full aspect-[1.13] w-[172px]"
            alt={name}
          />
        </div>
        <div className="flex flex-col">
          <button aria-label="Add to favorites" className="focus:outline-none">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/00d93adab53c5214ab1a164999c542db25c2e68622e0085e7c9140fbeae9a9e5?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
              className="object-contain aspect-square w-[34px]"
              alt=""
            />
          </button>
          <button aria-label="Quick view" className="focus:outline-none mt-2">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/92f95af307a693492ef165c4482565d88008392560df9e3855fc15ed6903d028?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
              className="object-contain aspect-square w-[34px]"
              alt=""
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-start self-start mt-4 text-base font-medium">
        <h3 className="self-stretch text-black">{name}</h3>
        <div className="flex gap-3 items-start mt-2 whitespace-nowrap">
          <span className="text-red-500">{price}</span>
          <span className="text-black opacity-50">{originalPrice}</span>
        </div>
        <div className="flex gap-2 items-start mt-2 text-sm font-semibold text-black whitespace-nowrap">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                loading="lazy"
                src={
                  i < rating
                    ? "https://cdn.builder.io/api/v1/image/assets/TEMP/f79bd71a6471f38d5d1fc5e45c151fa99346fc4a5342fd2b25d87f1e68ade395?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                    : "https://cdn.builder.io/api/v1/image/assets/TEMP/dc96f02be6214aa2c5a10a5e290e5d7f143f389e81e1b093a9c0c4f46c5eb8a8?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                }
                className="object-contain shrink-0 w-5 h-5"
                alt=""
              />
            ))}
          </div>
          <span className="w-8 opacity-50">({reviews})</span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
