import React from "react";

const Header: React.FC = () => {
  return (
    <header>
      <div className="flex overflow-hidden flex-col justify-center items-end px-16 py-3 w-full text-sm bg-black text-neutral-50 max-md:px-5 max-md:max-w-full">
        <div className="flex flex-wrap gap-10 items-start max-md:max-w-full">
          <div className="flex flex-wrap gap-2 items-center min-w-[240px] max-md:max-w-full">
            <div className="self-stretch my-auto w-[474px] max-md:max-w-full">
              Summer Sale For All Swim Suits And Free Express Delivery - OFF
              50%!
            </div>
            <div className="self-stretch my-auto font-semibold leading-6 text-center underline">
              ShopNow
            </div>
          </div>
          <div className="flex gap-1.5 justify-center items-center whitespace-nowrap">
            <div className="self-stretch my-auto">English</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/086dd669bbad3e4fcefbf1d6392f774b77d8ae772723fe01a24425e01abcaf04?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
            />
          </div>
        </div>
      </div>
      <nav className="flex flex-wrap gap-10 items-center self-center mt-10 max-md:max-w-full">
        <div className="flex flex-wrap gap-10 items-start self-stretch my-auto text-black min-w-[240px] max-md:max-w-full">
          <div className="text-2xl font-bold tracking-wider leading-none whitespace-nowrap w-[118px]">
            Exclusive
          </div>
          <div className="flex gap-10 items-start text-base text-center min-w-[240px]">
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
          </div>
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
            <button aria-label="Wishlist">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/850597cc14d3bfef027aa097fc5bca3ac1b650d683dc1d3c8c0134d5cd9a061d?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
              />
            </button>
            <button aria-label="Cart">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/27e6583cc2b0ad6384fa0e09ba54d132ea13906a2c9553ea3ae9481ef2628ff7?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
              />
            </button>
            <button aria-label="User profile">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5da7135e32227c2b57956f4aeebb39217ace541f01beff22a9a74f318d6ed56d?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square fill-red-500"
              />
            </button>
          </div>
        </div>
      </nav>
      <div className="mt-4 w-full bg-black border border-black border-solid opacity-30 min-h-[1px] max-md:max-w-full" />
    </header>
  );
};

export default Header;
