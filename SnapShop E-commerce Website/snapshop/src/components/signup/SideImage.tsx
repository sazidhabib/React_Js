import React from "react";

const SideImage: React.FC = () => {
  return (
    <div className="flex overflow-hidden hidden lg:flex self-stretch pt-20 my-auto rounded-none bg-slate-300 min-w-[240px] w-[805px] max-md:max-w-full">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2ff408ee612dbb33d2f787373e344b420b1316185128daa899473c17b86d4a35?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
        alt="Decorative side image"
        className="object-contain w-full aspect-[1.14] max-md:max-w-full"
      />
    </div>
  );
};

export default SideImage;
