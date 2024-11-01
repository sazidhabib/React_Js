import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex flex-wrap gap-10 items-center self-center mt-10 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 items-start self-stretch my-auto text-black min-w-[240px] max-md:max-w-full">
        <h1 className="text-2xl font-bold tracking-wider leading-none whitespace-nowrap w-[118px]">
          Exclusive
        </h1>
        <nav className="flex gap-10 items-start text-base text-center min-w-[240px]">
          <a href="#" className="w-12 whitespace-nowrap">
            Home
          </a>
          <a href="#" className="whitespace-nowrap w-[66px]">
            Contact
          </a>
          <a href="#" className="w-12 whitespace-nowrap">
            About
          </a>
          <a href="#" className="w-[61px]">
            Sign Up
          </a>
        </nav>
      </div>
      <div className="flex gap-6 items-center self-stretch my-auto min-w-[240px]">
        <form className="flex flex-col justify-center items-center self-stretch py-2 pr-3 pl-5 my-auto text-xs text-black rounded bg-neutral-100 min-w-[240px]">
          <div className="flex gap-9 justify-center items-center">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              type="search"
              id="search"
              placeholder="What are you looking for?"
              className="self-stretch my-auto opacity-50 bg-transparent border-none outline-none"
            />
            <button type="submit" aria-label="Search">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a36546edd30f9649053810fdbf6c98d92541e863e7b8b10ab13af855343b34e?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
              />
            </button>
          </div>
        </form>
        <div className="flex gap-4 justify-center items-center self-stretch my-auto">
          <a href="#" aria-label="Wishlist">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f46b01d8f56846dabad72a61fd444f3085a8b624cfad99f0b703fb6b78182f5?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
            />
          </a>
          <a href="#" aria-label="Cart">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d49936bb7e7947951a24074df0be75fc667e72893b1780ac9e82c006a87816b?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
            />
          </a>
          <a href="#" aria-label="User account">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/505a01368e57ac667ecd551fd161eb3fa8202cee72841e5b11d9f712055e4607?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
            />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
