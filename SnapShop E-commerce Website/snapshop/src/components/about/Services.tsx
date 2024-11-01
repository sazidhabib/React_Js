import React from "react";

interface ServiceProps {
  icon: string;
  title: string;
  description: string;
}

const Service: React.FC<ServiceProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center self-stretch my-auto min-w-[240px]">
      <img
        loading="lazy"
        src={icon}
        alt=""
        className="object-contain w-20 aspect-square"
      />
      <div className="flex flex-col items-center mt-6">
        <h3 className="text-xl font-semibold leading-snug">{title}</h3>
        <p className="mt-2 text-sm text-center">{description}</p>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/37aa21264f28ca6f6adcf7eaa83eedf608d579c0a5c849789b6d3faf3f49ddd5?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/6018ed70041375a6a1c5f932ea37b74afb978a2dff08cdc94c05edd6f6100c8b?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/212dcc356d51af23492ece10724c086e774c8917c922a9d23b3a400e64353cb1?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      title: "MONEY BACK GUARANTEE",
      description: "We reurn money within 30 days",
    },
  ];

  return (
    <section
      data-layername="fullServices"
      className="flex flex-wrap gap-10 justify-center items-center mt-36 ml-28 text-black max-md:mt-10 max-md:max-w-full"
    >
      {services.map((service, index) => (
        <Service key={index} {...service} />
      ))}
    </section>
  );
};

export default Services;
