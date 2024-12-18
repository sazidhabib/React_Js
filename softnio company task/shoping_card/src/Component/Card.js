import React from "react";

const Card = () => {
  return (
    <div className="h-96 px-72 pt-28 flex-col justify-center items-start gap-24 inline-flex">
      <div className="self-stretch h-96 justify-start items-center gap-14 inline-flex">
        <div className="w-96 h-96 bg-[#ffa353] rounded border flex-col justify-center items-center inline-flex">
          <img
            className="w-96 h-96"
            src="https://via.placeholder.com/630x721"
            alt="product_img"
          />
        </div>
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-2.5 inline-flex">
          <div className="self-stretch h-96 flex-col justify-start items-start flex">
            <div className="py-3 flex-col justify-start items-start flex">
              <div className="text-[#364a63] text-4xl font-bold font-['Roboto'] leading-10">
                Classy Modern Smart watch
              </div>
            </div>
            <div className="self-stretch pr-1 pb-1 justify-start items-center gap-2 inline-flex">
              <div className="justify-start items-start gap-1 flex">
                {/* Stars can be added here */}
              </div>
              <div className="text-[#8091a7] text-sm font-normal font-['Roboto'] leading-normal">
                (2 Reviews)
              </div>
            </div>
            <div className="self-stretch pt-5 justify-start items-end gap-1 inline-flex">
              <div className="text-[#8091a7] text-xl font-normal font-['Roboto'] line-through leading-loose">
                $99.00
              </div>
              <div className="text-[#6576ff] text-2xl font-bold font-['Roboto'] leading-loose">
                $79.00
              </div>
            </div>
            <div className="self-stretch pr-1 pt-5 justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 text-[#8091a7] text-lg font-normal font-['Roboto'] leading-loose">
                I must explain to you how all this mistaken idea of denoun cing
                ple praising pain was born and I will give you a complete
                account of the system, and expound the actual teaching.
              </div>
            </div>
            <div className="self-stretch pr-1 pt-5 justify-start items-center gap-11 inline-flex">
              <div className="flex-col justify-start items-start inline-flex">
                <div className="text-[#8091a7] text-sm font-normal font-['Roboto'] leading-normal">
                  Type
                </div>
                <div className="text-[#364a63] text-base font-bold font-['Roboto'] leading-snug">
                  Watch
                </div>
              </div>
              <div className="flex-col justify-start items-start inline-flex">
                <div className="text-[#8091a7] text-sm font-normal font-['Roboto'] leading-normal">
                  Model Number
                </div>
                <div className="text-[#364a63] text-base font-bold font-['Roboto'] leading-snug">
                  Forerunner 290XT
                </div>
              </div>
            </div>
            {/* Wrist Size Selection */}
            <div className="self-stretch h-20 pt-5 flex-col justify-start items-start gap-2.5 flex">
              <div className="text-[#364a63] text-lg font-bold font-['Roboto'] leading-tight">
                Wrist Size
              </div>
              <div className="justify-start items-center gap-3 inline-flex">
                <div className="px-4 py-2 rounded-sm border border-[#6576ff] flex">
                  <span style={{ color: "#6576ff", fontWeight: "bold" }}>
                    S
                  </span>
                  <span style={{ color: "#8091a7", fontSize: "0.75rem" }}>
                    $69
                  </span>
                </div>
                <div className="px-4 py-2 rounded-sm border border-[#dbdfea] flex">
                  <span style={{ color: "#364a63", fontWeight: "bold" }}>
                    M
                  </span>
                  <span style={{ color: "#8091a7", fontSize: "0.75rem" }}>
                    $79
                  </span>
                </div>
                <div className="px-4 py-2 rounded-sm border border-[#dbdfea] flex">
                  <span style={{ color: "#364a63", fontWeight: "bold" }}>
                    L
                  </span>
                  <span style={{ color: "#8091a7", fontSize: "0.75rem" }}>
                    $89
                  </span>
                </div>
              </div>
            </div>
            {/* Add to Cart Section */}
            <div className="self-stretch pt-5 justify-start items-center gap-3 inline-flex">
              <button className="px-4 py-2 bg-[#6576ff] rounded-sm text-white font-bold text-xs">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
