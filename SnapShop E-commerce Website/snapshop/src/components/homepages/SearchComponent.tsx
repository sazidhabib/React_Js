import React, { useState } from "react";

const SearchComponent: React.FC = () => {
  const [isSearchbarOpen, setIsSearchbarOpen] = useState(false);

  const handelSearchber = () => {
    setIsSearchbarOpen(!isSearchbarOpen);
  };

  return (
    <>
      {isSearchbarOpen && (
        <form className="md:flex flex-col justify-center items-center self-stretch py-2 pr-3 pl-5 my-auto text-xs text-black rounded bg-neutral-100 min-w-[240px] ">
          <div className="flex gap-9 justify-center items-center">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              id="search"
              placeholder="What are you looking for?"
              className="self-stretch my-auto opacity-50 bg-transparent border-none outline-none"
            />
            <button onClick={handelSearchber} type="submit" aria-label="Search">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a36546edd30f9649053810fdbf6c98d92541e863e7b8b10ab13af855343b34e?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                alt=""
              />
            </button>
          </div>
        </form>
      )}
      <button
        onClick={handelSearchber}
        className={` ${isSearchbarOpen ? "hidden" : ""} items-left`}
        type="submit"
        aria-label="Search"
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a36546edd30f9649053810fdbf6c98d92541e863e7b8b10ab13af855343b34e?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
          className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          alt=""
        />
      </button>
    </>
  );
};

export default SearchComponent;
