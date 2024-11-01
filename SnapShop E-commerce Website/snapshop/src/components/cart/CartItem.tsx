import React from "react";

interface CartItemProps {
  name: string;
  price: number;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ name, price, quantity }) => {
  return (
    <div className="overflow-hidden py-6 pr-16 pl-8 mt-10 w-full bg-white rounded shadow-sm max-md:px-5 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-1/5 max-md:ml-0 max-md:w-full">
          <div className="flex grow gap-5 text-base text-black max-md:mt-10">
            <div className="flex shrink-0 w-16 h-[58px]">
              {/* Placeholder for product image */}
            </div>
            <div className="my-auto">{name}</div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-4/5 max-md:ml-0 max-md:w-full">
          <div className="flex flex-wrap grow gap-5 justify-between items-center self-stretch my-auto text-base text-black whitespace-nowrap max-md:mt-10 max-md:max-w-full">
            <div className="self-stretch my-auto">${price}</div>
            <div className="flex shrink-0 self-stretch rounded border-2 border-solid border-black border-opacity-40 h-[47px] w-[75px]">
              <input
                type="number"
                value={quantity}
                min="1"
                aria-label={`Quantity for ${name}`}
                className="w-full h-full text-center bg-transparent border-none"
                readOnly
              />
            </div>
            <div className="self-stretch my-auto">${price * quantity}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
