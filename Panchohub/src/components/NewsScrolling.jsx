import React from "react";

const NewsScrolling = () => {
  return (
    <div className=" sm:w-[90%] md:w-[80%] lg:w-[76%] mx-auto w-full  flex items-center">
      <div
        className="text-lg font-bold text-white bg-indigo-700 whitespace-nowrap px-6 my-3"
        style={{ borderRadius: "0 0 20px 0" }}
      >
        Latest News:
      </div>
      <div className="w-full">
        <marquee
          behavior="scroll"
          direction="left"
          scrollamount="12"
          className="text-lg font-bold text-blue-600"
        >
          Little Fast Scrolling
        </marquee>
      </div>
    </div>
  );
};

export default NewsScrolling;
