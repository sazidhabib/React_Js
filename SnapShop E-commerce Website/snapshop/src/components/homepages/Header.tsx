import React from "react";
import SearchComponent from "./SearchComponent";
import NavigationLinks from "./NavigationLinks";

interface HeaderProps {
  logo: string;
}

const Header: React.FC<HeaderProps> = ({ logo }) => {
  return (
    <header className="flex flex-wrap gap-10 items-center self-center mt-10 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 items-start self-stretch my-auto text-black min-w-[240px] max-md:max-w-full">
        <h1 className="text-2xl font-bold tracking-wider leading-none whitespace-nowrap w-[118px] max-md:pr-0">
          {logo}
        </h1>
        <NavigationLinks />
      </div>
      <div className="flex gap-6 items-center self-stretch my-auto min-w-[240px]">
        <SearchComponent />
        <div className="flex gap-4 justify-center items-center self-stretch my-auto">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0123583f55d849d761c5aafb62524e58e76f4578ffd0ca775554d42933ddc549?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
            className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
            alt="User icon"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/27e6583cc2b0ad6384fa0e09ba54d132ea13906a2c9553ea3ae9481ef2628ff7?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
            className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
            alt="Cart icon"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
