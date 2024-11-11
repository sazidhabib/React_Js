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
    <section className="flex flex-wrap gap-6 justify-center items-center mt-20 w-full px-4  mx-auto md:px-6 lg:px-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center min-w-[220px] max-w-xs p-4 md:min-w-[280px] md:p-6"
        >
          <img
            loading="lazy"
            src={feature.icon}
            className="w-16 h-16 md:w-20 md:h-20"
            alt={feature.title}
          />
          <h4 className="mt-4 text-lg font-semibold md:text-xl">
            {feature.title}
          </h4>
          <p className="mt-2 text-sm text-gray-600 md:text-base">
            {feature.description}
          </p>
        </div>
      ))}
    </section>
  );
};

export default ServiceFeatures;
