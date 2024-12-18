import React from "react";
import HeroSection from "./HeroSection";
import FlashSaleSection from "./FlashSaleSection";
import CategorySection from "./CategorySection";
import TopRatedProducts from "./TopRatedProducts";
import NewArrivalSection from "./NewArrivalSection";
import ServiceFeatures from "./ServiceFeatures";

const HomePage: React.FC = () => {
  return (
    <div className="flex overflow-hidden flex-col bg-white relative ">
      <HeroSection />
      <FlashSaleSection />
      <CategorySection />
      <TopRatedProducts />
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/df6ac03ddfea8c230a9930e390a638ce1ab1abb6377bcd7761859019e109c730?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
        className="object-contain self-center mt-36 w-full aspect-[2.34] max-w-[1170px] max-md:mt-10 max-md:max-w-full"
        alt="Featured product banner"
      />
      <NewArrivalSection />
      <ServiceFeatures />
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4994e2c1a620d4ea356d28611072582355d46de2085b91428063bb54d28d049e?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
        className="object-contain self-end mt-16 mr-24 aspect-square w-[46px] max-md:mt-10 max-md:mr-2.5"
        alt="Scroll to top"
      />
    </div>
  );
};

export default HomePage;
