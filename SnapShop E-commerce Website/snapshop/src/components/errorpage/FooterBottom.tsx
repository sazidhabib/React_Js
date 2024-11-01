import React from "react";

const FooterBottom: React.FC = () => {
  return (
    <div className="flex flex-col items-center mt-16 w-full max-md:mt-10 max-md:max-w-full">
      <div
        data-layername="underLine"
        className="flex flex-col w-full max-md:max-w-full"
      >
        <div className="w-full bg-white border border-white border-solid opacity-40 min-h-[1px] max-md:max-w-full" />
      </div>
      <div className="flex gap-3 items-center mt-4 text-base text-white">
        <div className="flex gap-1.5 items-center self-stretch my-auto min-w-[240px]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d6d7851ae094af92cf192bb84763864c46d682b8e606b9a8f830b28913c0295f?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
          />
          <div
            data-layername="copyrightRimel2022AllRightReserved"
            className="self-stretch my-auto"
          >
            Copyright Rimel 2022. All right reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
