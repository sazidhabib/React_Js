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
            <a
              href="#"
              className="self-stretch my-auto font-semibold leading-6 text-center underline"
            >
              ShopNow
            </a>
          </div>
          <div className="flex gap-1.5 justify-center items-center whitespace-nowrap">
            <div className="self-stretch my-auto">English</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c458026ddcb4daaaca9291897ab1b8ab8e65bd1233e48db8bbc95eb90ee3e16?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
            />
          </div>
        </div>
      </div>
      <nav className="flex flex-wrap gap-10 items-center self-center mt-10 text-black max-md:max-w-full">
        <div className="flex flex-wrap gap-10 items-start self-stretch my-auto min-w-[240px] max-md:max-w-full">
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
            <a href="#" className="flex flex-col items-center w-[61px]">
              <div>Sign Up</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0920b22871091a003d57879ee03c1104f183703b25cc2a6c5aab9ae6c5117ea6?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                alt=""
                className="object-contain aspect-[62.5] w-[61px]"
              />
            </a>
          </div>
        </div>
        <form className="flex gap-6 items-center self-stretch my-auto text-xs min-w-[240px]">
          <div className="flex flex-col justify-center items-center self-stretch py-2 pr-3 pl-5 my-auto rounded bg-neutral-100 min-w-[240px]">
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
          </div>
        </form>
      </nav>
      <div className="mt-4 w-full bg-black border border-black border-solid opacity-30 min-h-[1px] max-md:max-w-full" />
    </header>
  );
};

export default Header;
