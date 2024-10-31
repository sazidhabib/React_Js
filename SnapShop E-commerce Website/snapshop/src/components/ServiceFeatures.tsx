import React from "react";

interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
}

const ServiceFeatures: React.FC = () => {
  const features: ServiceFeature[] = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/f0a7bd2a5e3513489be7039e049bc66d1b1434d1cc5f3befd26a6d4c3de66e8c?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/885e2fc6a1a866812344a678238b5fd24dd00416f935f34641161f18e9559297?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/3c1be3f37cdea8175ea2ee7a50fd0510114f5e02888e1167452b59c532555006?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days",
    },
  ];

  return (
    <section className="flex flex-wrap gap-10 justify-center items-center self-center mt-32 text-black max-md:mt-10 max-md:max-w-full">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col items-center self-stretch my-auto min-w-[240px]"
        >
          <img
            loading="lazy"
            src={feature.icon}
            className="object-contain w-20 aspect-square"
            alt={feature.title}
          />
          <div className="flex flex-col items-center mt-6">
            <h4 className="text-xl font-semibold leading-snug">
              {feature.title}
            </h4>
            <p className="mt-2 text-sm text-center">{feature.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ServiceFeatures;
