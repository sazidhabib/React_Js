import React from "react";

interface CategoryCardProps {
  name: string;
  icon: string;
  active?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  icon,
  active = false,
}) => {
  return (
    <div
      className={`flex overflow-hidden flex-col items-center px-9 py-6 rounded border border-solid ${
        active
          ? "bg-red-500 shadow-sm text-neutral-50"
          : "border-black border-opacity-30 text-black"
      } w-[170px] max-md:px-5`}
    >
      <img
        loading="lazy"
        src={icon}
        className="object-contain w-14 aspect-square"
        alt={`${name} icon`}
      />
      <p className="mt-4">{name}</p>
    </div>
  );
};

export default CategoryCard;
