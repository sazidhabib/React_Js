import React from "react";

interface OrderItem {
  image: string;
  name: string;
  price: string;
}

const orderItems: OrderItem[] = [
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/4ef510b12c0bdbd71683ed3f0134b4f59ce3d3b124d6b4f0f7a3cdb0e6f2c7cb?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
    name: "LCD Monitor",
    price: "$650",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/50183c6a595689dc52a6d5657261e924c442ed273a138200ac4bea43a44859b7?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef",
    name: "H1 Gamepad",
    price: "$1100",
  },
];

const OrderSummary: React.FC = () => {
  return (
    <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col items-start mt-8 max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col items-end text-base max-md:max-w-full">
          {orderItems.map((item, index) => (
            <div
              key={index}
              className="flex gap-6 items-center max-md:max-w-full mt-8"
            >
              <img
                loading="lazy"
                src={item.image}
                alt=""
                className="object-contain shrink-0 self-stretch my-auto aspect-square w-[54px]"
              />
              <div className="flex gap-10 items-center self-stretch my-auto min-w-[240px]">
                <div className="self-stretch my-auto text-black">
                  {item.name}
                </div>
                <div className="self-stretch my-auto text-black">
                  {item.price}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col mt-8 max-w-full w-[422px]">
          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full max-w-[422px] max-md:max-w-full">
              <div className="flex flex-col w-full max-md:max-w-full">
                <div className="flex gap-10 items-start text-base text-black whitespace-nowrap max-md:max-w-full">
                  <div>Subtotal:</div>
                  <div>$1750</div>
                </div>
                <div className="flex flex-col mt-4 w-full rotate-[8.742277657347563e-8rad]">
                  <div className="z-10 shrink-0 h-px bg-black border border-black border-solid max-md:max-w-full" />
                </div>
              </div>
              <div className="flex gap-10 items-start mt-4 text-base text-black whitespace-nowrap max-md:max-w-full">
                <div>Shipping:</div>
                <div>Free</div>
              </div>
            </div>
            <div className="flex flex-col mt-4 w-full rotate-[8.742277657347563e-8rad]">
              <div className="z-10 shrink-0 h-px bg-black border border-black border-solid max-md:max-w-full" />
            </div>
          </div>
          <div className="flex gap-10 items-start mt-4 text-base text-black whitespace-nowrap max-md:max-w-full">
            <div>Total:</div>
            <div>$1750</div>
          </div>
        </div>
        <div className="flex gap-10 items-center mt-8 max-md:max-w-full">
          <div className="flex gap-4 items-start self-stretch my-auto">
            <input
              type="radio"
              id="bank"
              name="paymentMethod"
              className="w-6 h-6"
            />
            <label htmlFor="bank" className="text-base text-black">
              Bank
            </label>
          </div>
          <div className="flex gap-2 items-start self-stretch my-auto">
            {["9-", "10-", "11-", "12-"].map((ext, index) => (
              <img
                key={index}
                loading="lazy"
                src={`http://b.io/ext_${ext}`}
                alt=""
                className="object-contain shrink-0 aspect-[1.5] w-[42px]"
              />
            ))}
          </div>
        </div>
        <div className="flex gap-4 items-start mt-8">
          <input
            type="radio"
            id="cashOnDelivery"
            name="paymentMethod"
            className="w-6 h-6"
            checked
          />
          <label htmlFor="cashOnDelivery" className="text-base text-black">
            Cash on delivery
          </label>
        </div>
        <form className="flex flex-wrap gap-4 items-end self-stretch mt-8 text-base max-md:max-w-full">
          <input
            type="text"
            id="couponCode"
            placeholder="Coupon Code"
            className="flex overflow-hidden flex-col justify-center items-start px-6 py-4 text-black rounded border border-black border-solid min-w-[240px] w-[300px] max-md:px-5"
          />
          <button
            type="submit"
            className="gap-2.5 self-stretch px-12 py-4 font-medium bg-red-500 rounded text-neutral-50 max-md:px-5"
          >
            Apply Coupon
          </button>
        </form>
        <button className="gap-2.5 self-stretch px-12 py-4 mt-8 text-base font-medium bg-red-500 rounded text-neutral-50 max-md:px-5">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
