import React, { useState } from "react";

interface CartItemProps {
  image: string;
  title: string;
  price: number;
  quantity?: number;
}

const CartItem: React.FC<CartItemProps> = ({ title, image, price }) => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
  return (
    <div className="overflow-hidden py-6 pr-16 pl-8 mt-10 w-full bg-white rounded shadow-sm max-md:px-5 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-1/5 max-md:ml-0 max-md:w-full">
          <div className="flex grow gap-5 text-base text-black max-md:mt-10">
            <div className="flex shrink-0 w-16 h-[58px]">
              <img src={image} alt={title} />
            </div>
            <div className="my-auto">{title}</div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-4/5 max-md:ml-0 max-md:w-full">
          <div className="flex flex-wrap grow gap-5 justify-between items-center self-stretch my-auto text-base text-black  max-md:mt-10 max-md:max-w-full">
            <div className="self-stretch my-auto">${price}</div>
            <div className="flex my-auto shrink-0 self-stretch rounded border-2 border-solid border-black border-opacity-40 h-[47px] w-[100px]">
              <button
                onClick={decrementQuantity}
                aria-label="Decrease quantity"
                className="px-3 py-2 border border-black border-opacity-50 rounded-l"
              >
                -
              </button>
              <p className="w-full my-auto text-center bg-transparent border-none">
                {quantity}
              </p>
              <button
                onClick={incrementQuantity}
                aria-label="Increase quantity"
                className="px-3 py-2 border border-black border-opacity-50 rounded-r"
              >
                +
              </button>
            </div>
            <div className="self-stretch my-auto">${price * quantity}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
