import React from "react";
import { useCart } from "../Context/CartContext";

const CartModal = ({ toggleCartModal }) => {
  const { cart } = useCart();

  // Calculate total quantity and price
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#10111b]/60 flex justify-center items-center">
      <div className="p-8 bg-white rounded-[20px] shadow-lg w-full max-w-3xl">
        {/* Header */}
        <div className="text-[22px] text-[#364a63] font-bold mb-6 text-left">
          Your Cart
        </div>

        {/* Table Header */}
        <div className="flex justify-between border-b pb-2 border-[#dbdfea] text-sm text-[#8091a7] font-medium">
          <div className="w-[278px] text-left">Item</div>
          <div className="w-[100px] text-center">Color</div>
          <div className="w-[80px] text-center">Size</div>
          <div className="w-[80px] text-center">Qnt</div>
          <div className="w-[100px] text-right">Price</div>
        </div>

        {/* Scrollable Cart Items */}
        <div className="max-h-[300px] overflow-y-auto">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-4 border-[#dbdfea] text-sm text-[#364a63]"
            >
              <div className="w-[278px] flex items-center gap-3">
                <img
                  className="w-12 h-12 rounded-md"
                  src={item.image}
                  alt={item.name}
                />
                <div className="">{item.name}</div>
              </div>
              <div className="w-[100px] text-center">{item.color}</div>
              <div className="w-[80px] text-center font-bold">{item.size}</div>
              <div className="w-[80px] text-center font-semibold">
                {item.quantity}
              </div>
              <div className="w-[100px] text-right font-semibold">
                ${item.price.toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Total Section */}
        <div className="flex justify-between items-center text-sm text-[#364a63] border-t pt-4 border-[#dbdfea] font-medium">
          <div className="w-[278px] text-left text-[18px] font-semibold">
            Total
          </div>
          <div className="w-[100px] text-center">{/* Empty for size */}</div>
          <div className="w-[80px] text-right">{/* Empty for size */}</div>
          <div className="w-[80px] text-center font-semibold text-[18px]">
            {totalQuantity}
          </div>
          <div className="w-[100px] text-right font-semibold text-[18px]">
            ${totalPrice.toFixed(2)}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={toggleCartModal}
            className="px-6 py-2 border border-[#8091a7] text-[#364a63] text-sm font-bold rounded-md hover:bg-gray-100"
          >
            Continue Shopping
          </button>
          <button className="px-6 py-2 bg-[#6576ff] text-white text-sm font-bold rounded-md hover:bg-[#5765d9]">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
