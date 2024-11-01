import React from "react";

const Carousel: React.FC = () => {
  return (
    <div className="flex gap-3 items-center self-center mt-10">
      <div className="flex shrink-0 self-stretch my-auto w-3 h-3 rounded-full bg-black bg-opacity-30 fill-black" />
      <div className="flex shrink-0 self-stretch my-auto w-3 h-3 rounded-full bg-black bg-opacity-30 fill-black" />
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/92b177d4489b789ca67cd5f3caa2fe9bf63df0a7d703e2d52fb18370f3559c3c?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
        alt="Active carousel indicator"
        className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
      />
      <div className="flex shrink-0 self-stretch my-auto w-3 h-3 rounded-full bg-black bg-opacity-30 fill-black" />
      <div className="flex shrink-0 self-stretch my-auto w-3 h-3 rounded-full bg-black bg-opacity-30 fill-black" />
    </div>
  );
};

export default Carousel;
