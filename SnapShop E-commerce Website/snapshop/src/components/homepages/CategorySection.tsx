import React from "react";
import CategoryCard from "./CategoryCard";

const CategorySection: React.FC = () => {
  const categories = [
    {
      name: "Phones",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5187a36507b8a7ad2f6b5e7570c9e17e5d24e737c7b947dde402c06a70fd19cf?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
    },
    {
      name: "Computers",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a4549bf9b8f26b56068f6eaaf9d4b711a1eea8143c3ee4266273c68f36575006?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
    },
    {
      name: "SmartWatch",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7865315e423277f0faf29a4afb376e1d7966765a444b18e541dbe679ce438aec?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
    },
    {
      name: "Camera",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6803d2698e4366024f351678a4ebb9f3df31528578f8560b471da9ecf0d1a58?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      active: true,
    },
    {
      name: "HeadPhones",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/53da0cff2ed9a288cca85554827621e4d2595c143d5fc57aedfefc1f8294fff2?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
    },
    {
      name: "Gaming",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/52dc4e07ff4a2d672265fef1bbff73f55b4601fdd54bd52795955d2255f4fffc?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
    },
  ];

  return (
    <section className="flex flex-col mt-20 max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 items-end max-md:max-w-full">
        <div className="flex flex-col min-w-[240px]">
          <div className="flex gap-4 items-center self-start">
            <div className="flex flex-col self-stretch my-auto w-5">
              <div className="flex shrink-0 h-10 bg-red-500 rounded"></div>
            </div>
            <h2 className="self-stretch my-auto text-base font-semibold leading-none text-red-500">
              Categories
            </h2>
          </div>
          <h3 className="mt-5 text-4xl font-semibold tracking-widest leading-none text-black">
            Browse By Category
          </h3>
        </div>
        <div className="flex gap-2 items-start">
          <button aria-label="Previous category" className="focus:outline-none">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d46c131187bfff9eb633481579a064341b51d7196040ee40dd3f9577e445a5e?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
              className="object-contain shrink-0 aspect-square w-[46px]"
              alt=""
            />
          </button>
          <button aria-label="Next category" className="focus:outline-none">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e88e31fcac886e936832d43b7fb2b7a3e219274da66d8e9d07a08a6cc7094c1b?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
              className="object-contain shrink-0 aspect-square w-[46px]"
              alt=""
            />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-8 items-start mt-16 text-base text-black whitespace-nowrap max-md:mt-10 max-md:max-w-full">
        {categories.map((category, index) => (
          <CategoryCard key={index} {...category} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
