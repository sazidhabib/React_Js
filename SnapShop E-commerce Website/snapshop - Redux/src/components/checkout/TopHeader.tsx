import React from "react";

const TopHeader: React.FC = () => {
  return (
    <header className="flex overflow-hidden flex-col justify-center items-end px-16 py-3 w-full text-sm bg-black text-neutral-50 max-md:px-5 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 items-start max-md:max-w-full">
        <div className="flex flex-wrap gap-2 items-center min-w-[240px] max-md:max-w-full">
          <p className="self-stretch my-auto w-[474px] max-md:max-w-full">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </p>
          <a
            href="#"
            className="self-stretch my-auto font-semibold leading-6 text-center underline"
          >
            ShopNow
          </a>
        </div>
        <div className="flex gap-1.5 justify-center items-center whitespace-nowrap">
          <span className="self-stretch my-auto">English</span>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/086dd669bbad3e4fcefbf1d6392f774b77d8ae772723fe01a24425e01abcaf04?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          />
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
