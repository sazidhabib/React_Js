import React from "react";

interface StatCardProps {
  icon: string;
  value: string;
  description: string;
  bgColor?: string;
  textColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  description,
  bgColor = "bg-white",
  textColor = "text-black",
}) => {
  return (
    <div
      className={`flex overflow-hidden flex-col justify-center px-12 py-8 rounded border border-solid border-black border-opacity-30 min-w-[240px] w-[270px] ${bgColor} ${textColor} max-md:px-5`}
    >
      <div className="flex flex-col items-center">
        <img
          loading="lazy"
          src={icon}
          alt=""
          className="object-contain w-20 aspect-square"
        />
        <div className="flex flex-col items-center mt-6">
          <div className="text-3xl font-bold tracking-widest leading-none">
            {value}
          </div>
          <div className="mt-3 text-base text-center">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
