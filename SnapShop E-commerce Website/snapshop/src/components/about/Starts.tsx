import React from "react";
import StatCard from "./StatCard";

const Stats: React.FC = () => {
  const stats = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/540ce15ebf56d8ba02478887cc0b866b4d9dc2c9f12f6273e5f726096f954a1c?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      value: "10.5k",
      description: "Sellers active on our site",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/9b964920c51749798432322beca130e89a93bd03ed1e219faf0ac82dfc9fb6f4?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      value: "33k",
      description: "Monthly Product Sale",
      bgColor: "bg-red-500",
      textColor: "text-white",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/23347f57400a31c91cbbb7279fdf9ecb779726a76da0f742e02fc58f642d4925?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      value: "45.5k",
      description: "Customers active on our site",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/dd02f132c954ac28f6ae308c0af30f5c76b453da141c47f1cad95f50f6c76bcc?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
      value: "25k",
      description: "Annual gross sale on our site",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-8 items-start mt-36 text-black max-w-full px-4 md:px-8 lg:px-12 max-md:mt-10">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default Stats;
