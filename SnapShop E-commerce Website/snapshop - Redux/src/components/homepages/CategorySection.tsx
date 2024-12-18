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
    <section className="flex flex-col items-center mt-20 px-4 md:px-6 lg:px-8">
      <div className="flex flex-wrap gap-6 items-center justify-between w-full">
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2">
            <div className="w-5 h-10 bg-red-500 rounded"></div>
            <h2 className="text-base font-semibold text-red-500">Categories</h2>
          </div>
          <h3 className="mt-4 text-2xl font-semibold md:text-3xl lg:text-4xl text-black">
            Browse By Category
          </h3>
        </div>
        <div className="flex gap-2">
          <button aria-label="Previous category" className="focus:outline-none">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d46c131187bfff9eb633481579a064341b51d7196040ee40dd3f9577e445a5e?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
              className="w-10 md:w-12"
              alt=""
            />
          </button>
          <button aria-label="Next category" className="focus:outline-none">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e88e31fcac886e936832d43b7fb2b7a3e219274da66d8e9d07a08a6cc7094c1b?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
              className="w-10 md:w-12"
              alt=""
            />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mt-10 max-w-[1280px] w-full justify-center">
        {categories.map((category, index) => (
          <div
            key={index}
            className="min-w-[120px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[200px]"
          >
            <CategoryCard {...category} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
