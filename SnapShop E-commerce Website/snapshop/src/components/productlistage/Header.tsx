import React from "react";
import SearchComponent from "./SearchComponent";
import IconButton from "./IconButton";

type HeaderProps = {
  logoText: string;
  navItems: string[];
};

const Header: React.FC<HeaderProps> = ({ logoText, navItems }) => {
  return (
    <header className="flex flex-wrap gap-10 items-center self-center mt-10 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 items-start self-stretch my-auto text-black min-w-[240px] max-md:max-w-full">
        <h1 className="text-2xl font-bold tracking-wider leading-none whitespace-nowrap w-[118px]">
          {logoText}
        </h1>
        <nav className="flex gap-10 items-start text-base text-center min-w-[240px]">
          {navItems.map((item, index) => (
            <a key={index} href="#" className="whitespace-nowrap">
              {item}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex gap-6 items-center self-stretch my-auto min-w-[240px]">
        <SearchComponent />
        <div className="flex gap-4 justify-center items-center self-stretch my-auto">
          <IconButton
            iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/2f46b01d8f56846dabad72a61fd444f3085a8b624cfad99f0b703fb6b78182f5?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
            alt="Wishlist"
          />
          <IconButton
            iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/27e6583cc2b0ad6384fa0e09ba54d132ea13906a2c9553ea3ae9481ef2628ff7?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
            alt="Cart"
          />
          <IconButton
            iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/505a01368e57ac667ecd551fd161eb3fa8202cee72841e5b11d9f712055e4607?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
            alt="Profile"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
