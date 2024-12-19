import React from "react";

const CartModal = () => {
  return (
    <div>
      <div className="w-[1920px] h-[974px] bg-white flex-col justify-start items-center inline-flex">
        <div className="self-stretch h-[974px] px-[300px] pt-[120px] flex-col justify-center items-center gap-[92px] flex">
          <div className="w-[1920px] h-[974px] px-[502px] py-[265px] bg-[#10111b]/60 flex-col justify-center items-center gap-2 flex">
            <div className="p-11 bg-white rounded-[20px] flex-col justify-start items-start gap-4 flex">
              <div className="justify-start items-center gap-2.5 inline-flex">
                <div className="flex-col justify-start items-start inline-flex">
                  <div className="flex-col justify-start items-start flex">
                    <div className="text-[#364a63] text-[22px] font-bold font-[''] leading-normal">
                      Your Cart
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch pr-1 pt-1 pb-2 border-b border-[#dbdfea] justify-start items-center inline-flex">
                <div className="w-[278px] text-[#8091a7] text-sm font-normal font-[''] leading-[23.10px]">
                  Item
                </div>
                <div className="w-[62px] text-center text-[#8091a7] text-sm font-normal font-[''] leading-[23.10px]">
                  Color
                </div>
                <div className="w-[69px] text-center text-[#8091a7] text-sm font-normal font-[''] leading-[23.10px]">
                  Size{" "}
                </div>
                <div className="w-[59px] text-center text-[#8091a7] text-sm font-normal font-[''] leading-[23.10px]">
                  Qnt
                </div>
                <div className="w-[91px] text-right text-[#8091a7] text-sm font-normal font-[''] leading-[23.10px]">
                  Price
                </div>
              </div>
              <div className="self-stretch pr-1 pb-4 border-b border-[#dbdfea] justify-start items-center inline-flex">
                <div className="h-9 justify-center items-center gap-2 flex">
                  <div className="w-9 h-9 bg-[#ffa353] rounded-[3px] justify-center items-center flex">
                    <img
                      className="w-[36.64px] h-[41.79px]"
                      src="https://via.placeholder.com/37x42"
                    />
                  </div>
                  <div className="grow shrink basis-0 text-[#364a63] text-sm font-normal font-[''] leading-[23.10px]">
                    Classy Modern Smart watch
                  </div>
                </div>
                <div className="w-[62px] text-center text-[#364a63] text-sm font-normal font-[''] leading-[23.10px]">
                  Black
                </div>
                <div className="w-[69px] text-center text-[#364a63] text-sm font-bold font-[''] leading-[23.10px]">
                  XL
                </div>
                <div className="w-[59px] text-center text-[#364a63] text-sm font-bold font-[''] leading-[23.10px]">
                  1
                </div>
                <div className="w-[91px] text-right text-[#364a63] text-sm font-bold font-[''] leading-[23.10px]">
                  $99.00
                </div>
              </div>
              <div className="self-stretch pr-1 pb-4 border-b border-[#dbdfea] justify-start items-center inline-flex">
                <div className="h-9 justify-center items-center gap-2 flex">
                  <div className="h-9 bg-[#ffa353] rounded-[3px] border justify-center items-center flex">
                    <img
                      className="w-[37px] h-[42px]"
                      src="https://via.placeholder.com/37x42"
                    />
                  </div>
                  <div className="grow shrink basis-0 text-[#364a63] text-sm font-normal font-[''] leading-[23.10px]">
                    Classy Modern Smart watch
                  </div>
                </div>
                <div className="w-[62px] text-center text-[#364a63] text-sm font-normal font-[''] leading-[23.10px]">
                  Purple{" "}
                </div>
                <div className="w-[69px] text-center text-[#364a63] text-sm font-bold font-[''] leading-[23.10px]">
                  L
                </div>
                <div className="w-[59px] text-center text-[#364a63] text-sm font-bold font-[''] leading-[23.10px]">
                  2
                </div>
                <div className="w-[91px] text-right text-[#364a63] text-sm font-bold font-[''] leading-[23.10px]">
                  $178.00
                </div>
              </div>
              <div className="self-stretch pr-1 pb-4 border-b border-[#dbdfea] justify-start items-center inline-flex">
                <div className="h-9 justify-center items-center gap-2 flex">
                  <div className="w-9 h-9 bg-[#ffa353] rounded-[3px] justify-center items-center flex">
                    <img
                      className="w-[37.29px] h-[43.07px]"
                      src="https://via.placeholder.com/37x43"
                    />
                  </div>
                  <div className="grow shrink basis-0 text-[#364a63] text-sm font-normal font-[''] leading-[23.10px]">
                    Classy Modern Smart watch
                  </div>
                </div>
                <div className="w-[62px] text-center text-[#364a63] text-sm font-normal font-[''] leading-[23.10px]">
                  Cyan
                </div>
                <div className="w-[69px] text-center text-[#364a63] text-sm font-bold font-[''] leading-[23.10px]">
                  M
                </div>
                <div className="w-[59px] text-center text-[#364a63] text-sm font-bold font-[''] leading-[23.10px]">
                  1
                </div>
                <div className="w-[91px] text-right text-[#364a63] text-sm font-bold font-[''] leading-[23.10px]">
                  $79.00
                </div>
              </div>
              <div className="self-stretch justify-between items-end inline-flex">
                <div className="w-[379px] text-[#363636] text-base font-bold font-[''] leading-snug">
                  Total
                </div>
                <div className="text-[#364a63] text-sm font-bold font-[''] leading-[34px]">
                  4
                </div>
                <div className="text-[#364a63] text-lg font-bold font-[''] leading-[34px]">
                  $356.00
                </div>
              </div>
              <div className="self-stretch pt-2.5 justify-between items-end inline-flex">
                <div className="h-9 justify-end items-center gap-6 flex">
                  <div className="px-[18px] py-2 rounded-[3px] border border-[#dbdfea] justify-center items-center gap-2.5 flex">
                    <div className="text-[#364a63] text-[13px] font-bold font-[''] leading-tight tracking-tight">
                      Continue Shopping
                    </div>
                  </div>
                  <div className="px-[18px] py-2 bg-[#6576ff] rounded-[3px] justify-center items-center gap-2.5 flex">
                    <div className="text-white text-[13px] font-bold font-[''] leading-tight tracking-tight">
                      Checkout
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch h-[720px] justify-start items-center gap-[60px] inline-flex">
            <div className="w-[630px] h-[720px] bg-[#ffa353] rounded border flex-col justify-center items-center inline-flex">
              <img
                className="w-[630px] h-[721px]"
                src="https://via.placeholder.com/630x721"
              />
            </div>
            <div className="grow shrink basis-0 flex-col justify-start items-start gap-2.5 inline-flex">
              <div className="self-stretch h-[558px] flex-col justify-start items-start flex">
                <div className="py-2 flex-col justify-start items-start flex">
                  <div className="text-[#364a63] text-[40px] font-bold font-[''] leading-[44px]">
                    Classy Modern Smart watch
                  </div>
                </div>
                <div className="self-stretch pr-1 pb-1 justify-start items-center gap-2 inline-flex">
                  <div className="justify-start items-start gap-[4.50px] flex">
                    <div className="w-[18px] h-[18px] px-[1.50px] pt-[1.86px] pb-[1.83px] justify-center items-center flex" />
                    <div className="w-[18px] h-[18px] px-[1.50px] pt-[1.86px] pb-[1.83px] justify-center items-center flex" />
                    <div className="w-[18px] h-[18px] px-[1.50px] pt-[1.86px] pb-[1.83px] justify-center items-center flex" />
                    <div className="w-[18px] h-[18px] px-[1.50px] py-[1.83px] justify-center items-center flex" />
                    <div className="w-[18px] h-[18px] px-[1.50px] pt-[1.87px] pb-[1.83px] justify-center items-center flex" />
                  </div>
                  <div className="text-[#8091a7] text-sm font-normal font-[''] leading-[23.10px]">
                    (2 Reviews)
                  </div>
                </div>
                <div className="self-stretch pt-6 justify-start items-end gap-[5px] inline-flex">
                  <div className="text-[#6576ff] text-2xl font-bold font-[''] leading-relaxed">
                    $78.00
                  </div>
                  <div className="text-[#8091a7] text-sm font-normal font-[''] line-through leading-tight">
                    $90.00
                  </div>
                </div>
                <div className="self-stretch pr-1 pt-5 justify-start items-center gap-2 inline-flex">
                  <div className="grow shrink basis-0 text-[#8091a7] text-lg font-normal font-[''] leading-[30px]">
                    I must explain to you how all this mistaken idea of denoun
                    cing ple praising pain was born and I will give you a
                    complete account of the system, and expound the actual
                    teaching.
                  </div>
                </div>
                <div className="self-stretch pr-1 pt-[30px] justify-start items-center gap-[43px] inline-flex">
                  <div className="flex-col justify-start items-start inline-flex">
                    <div className="text-[#8091a7] text-sm font-normal font-[''] leading-[23.10px]">
                      Type
                    </div>
                    <div className="text-[#364a63] text-base font-bold font-[''] leading-[23px]">
                      Watch
                    </div>
                  </div>
                  <div className="flex-col justify-start items-start inline-flex">
                    <div className="text-[#8091a7] text-sm font-normal font-[''] leading-[23.10px]">
                      Model Number
                    </div>
                    <div className="text-[#364a63] text-base font-bold font-[''] leading-[23px]">
                      Forerunner 290XT
                    </div>
                  </div>
                </div>
                <div className="self-stretch h-[74px] pt-5 flex-col justify-start items-start gap-2.5 flex">
                  <div className="text-[#364a63] text-lg font-bold font-[''] leading-tight">
                    Color
                  </div>
                  <div className="justify-start items-center gap-[19px] inline-flex">
                    <div className="w-6 h-6 relative">
                      <div className="w-4 h-4 left-[4px] top-[4px] absolute bg-[#816bff] rounded-full" />
                      <div className="w-6 h-6 left-0 top-0 absolute rounded-full border-2 border-[#816bff]" />
                    </div>
                    <div className="w-4 h-4 justify-center items-center flex">
                      <div className="w-4 h-4 bg-[#1fcec9] rounded-full" />
                    </div>
                    <div className="w-4 h-4 justify-center items-center flex">
                      <div className="w-4 h-4 bg-[#4b97d3] rounded-full" />
                    </div>
                    <div className="w-4 h-4 justify-center items-center flex">
                      <div className="w-4 h-4 bg-[#0261f1] rounded-full" />
                    </div>
                  </div>
                </div>
                <div className="self-stretch h-[90px] pt-6 flex-col justify-start items-start gap-2.5 flex">
                  <div className="text-[#364a63] text-lg font-bold font-[''] leading-tight">
                    Size
                  </div>
                  <div className="justify-start items-center gap-3 inline-flex">
                    <div className="px-[18px] py-2 rounded-[3px] border border-[#6576ff] justify-center items-center gap-2.5 flex">
                      <div className="text-[#6576ff] text-[13px] font-bold font-['Nunito'] leading-tight tracking-tight">
                        XS
                      </div>
                    </div>
                    <div className="px-[18px] py-2 rounded-[3px] border border-[#dbdfea] justify-center items-center gap-2.5 flex">
                      <div className="text-[#364a63] text-[13px] font-bold font-['Nunito'] leading-tight tracking-tight">
                        SM
                      </div>
                    </div>
                    <div className="px-[18px] py-2 rounded-[3px] border border-[#dbdfea] justify-center items-center gap-2.5 flex">
                      <div className="text-[#364a63] text-[13px] font-bold font-['Nunito'] leading-tight tracking-tight">
                        L
                      </div>
                    </div>
                    <div className="px-[18px] py-2 rounded-[3px] border border-[#dbdfea] justify-center items-center gap-2.5 flex">
                      <div className="text-[#364a63] text-[13px] font-bold font-['Nunito'] leading-tight tracking-tight">
                        XL
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch pt-8 justify-start items-center gap-3 inline-flex">
                  <div className="rounded border border-[#dbdfea] justify-start items-center flex">
                    <div className="self-stretch px-2 py-[3px] border border-[#dbdfea] flex-col justify-center items-start gap-2.5 inline-flex">
                      <div className="text-[#8091a7] text-lg font-normal font-['Nioicon'] leading-[23.10px]">
                        
                      </div>
                    </div>
                    <div className="self-stretch px-[26px] py-[3px] border border-[#dbdfea] flex-col justify-center items-start gap-2.5 inline-flex">
                      <div className="text-[#364a63] text-sm font-normal font-[''] leading-[23.10px]">
                        0
                      </div>
                    </div>
                    <div className="self-stretch px-2 py-[3px] border border-[#dbdfea] flex-col justify-center items-start gap-2.5 inline-flex">
                      <div className="text-[#8091a7] text-lg font-normal font-['Nioicon'] leading-[23.10px]">
                        
                      </div>
                    </div>
                  </div>
                  <div className="px-[18px] py-2 bg-[#6576ff] rounded-[3px] justify-center items-center gap-2.5 flex">
                    <div className="text-white text-[13px] font-bold font-['Nunito'] leading-tight tracking-tight">
                      Add to Cart
                    </div>
                  </div>
                  <div className="w-5 h-5 pl-px py-0.5 justify-center items-center flex">
                    <div className="text-center text-[#6576ff] text-lg font-normal font-['Nioicon'] leading-none">
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch" />
        </div>
      </div>
    </div>
  );
};

export default CartModal;
