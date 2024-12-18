import React from "react";

interface RelatedItemProps {
  discount?: number;
  imageSrc: string;
  name: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
}

const RelatedItem: React.FC<RelatedItemProps> = ({
  discount,
  imageSrc,
  name,
  price,
  originalPrice,
  rating,
  reviews,
}) => {
  return (
    <div
      data-layername="cartWithFlatDiscount"
      className="flex flex-col min-w-[240px] w-[270px]"
    >
      <div className="flex overflow-hidden gap-1 items-start px-3 pt-3 pb-12 max-w-full rounded bg-neutral-100 w-[270px]">
        {discount && (
          <div className="flex flex-col text-xs whitespace-nowrap text-neutral-50">
            <div
              data-layername="discountPercent"
              className="gap-2.5 self-start px-3 py-1 bg-red-500 rounded"
            >
              -{discount}%
            </div>
          </div>
        )}
        <img
          loading="lazy"
          src={imageSrc}
          alt={name}
          className="object-contain self-end mt-3 max-w-full aspect-[1.13] w-[172px]"
        />
        <div className="flex flex-col">
          <button aria-label="Add to wishlist">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/00d93adab53c5214ab1a164999c542db25c2e68622e0085e7c9140fbeae9a9e5?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
              alt=""
              className="object-contain aspect-square w-[34px]"
            />
          </button>
          <button aria-label="Quick view">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4bd4aeaf0f75ee52eaf1a86b7dbd1677fcd7bf0df326c61447e0ca8c7cb5a12e?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
              alt=""
              className="object-contain mt-2 aspect-square w-[34px]"
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-start self-start mt-4 text-base font-medium">
        <div
          data-layername={name.toLowerCase().replace(/\s+/g, "-")}
          className="self-stretch text-black"
        >
          {name}
        </div>
        <div className="flex gap-3 items-start mt-2 whitespace-nowrap">
          <div data-layername="price" className="text-red-500">
            {price}
          </div>
          {originalPrice && (
            <div
              data-layername="originalPrice"
              className="text-black opacity-50"
            >
              {originalPrice}
            </div>
          )}
        </div>
        <div className="flex gap-2 items-start mt-2 text-sm font-semibold text-black whitespace-nowrap">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f79bd71a6471f38d5d1fc5e45c151fa99346fc4a5342fd2b25d87f1e68ade395?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
            alt={`${rating} stars`}
            className="object-contain shrink-0 aspect-[5] w-[100px]"
          />
          <div data-layername="reviews" className="w-8 opacity-50">
            ({reviews})
          </div>
        </div>
      </div>
    </div>
  );
};

const RelatedItems: React.FC = () => {
  const relatedItems: RelatedItemProps[] = [
    {
      discount: 40,
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e93ad05ae04f0b54f4159cbcf6911a27cb651cbe215adedef39517dbfe9650fd?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      name: "HAVIT HV-G92 Gamepad",
      price: "$120",
      originalPrice: "$160",
      rating: 5,
      reviews: 88,
    },
    {
      discount: 35,
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/38fb1b7c0b0c5bfee5f9ee5cae45ee04b50a3a5cfbcf29cc559cdeb284a2057a?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      name: "AK-900 Wired Keyboard",
      price: "$960",
      originalPrice: "$1160",
      rating: 4,
      reviews: 75,
    },
    {
      discount: 30,
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6f9cef694ffcf7501a96b0aa76cc799d6c1e90afd4ba6497f689f36be8755cc1?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      name: "IPS LCD Gaming Monitor",
      price: "$370",
      originalPrice: "$400",
      rating: 5,
      reviews: 99,
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/427749dd55d765ed5e81937b58b7e33ac3b4e21af453883ae81f1f85eded22df?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      name: "RGB liquid CPU Cooler",
      price: "$160",
      originalPrice: "$170",
      rating: 4,
      reviews: 65,
    },
  ];

  return (
    <div className="flex flex-col mt-36 max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-4 items-center self-start">
        <div
          data-layername="categoryRectangle"
          className="flex flex-col self-stretch my-auto w-5"
        >
          <div className="flex shrink-0 h-10 bg-red-500 rounded" />
        </div>
        <div
          data-layername="relatedItem"
          className="self-stretch my-auto text-base font-semibold leading-none text-red-500"
        >
          Related Item
        </div>
      </div>
      <div className="flex flex-wrap gap-8 items-start mt-16 max-md:mt-10 max-md:max-w-full">
        {relatedItems.map((item, index) => (
          <RelatedItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default RelatedItems;
