import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CartItem from "./CartItem";
import CouponForm from "./CouponForm";
import CartTotal from "./CartTotal";

// interface CartProps {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
// }

const Cart: React.FC = () => {
  const cartItems = [
    { id: 1, name: "LCD Monitor", price: 650, quantity: 1 },
    { id: 2, name: "H1 Gamepad", price: 550, quantity: 2 },
  ];

  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <Header />
      <main className="flex flex-col self-center mt-20 w-full max-w-[1170px] max-md:mt-10 max-md:max-w-full">
        <nav aria-label="Breadcrumb">
          <ol className="flex gap-3 items-center self-start text-sm text-black whitespace-nowrap">
            <li>
              <a href="/" className="opacity-50">
                Home
              </a>
            </li>
            <li aria-current="page">Cart</li>
          </ol>
        </nav>
        <section className="flex flex-col mt-20 w-full max-md:mt-10 max-md:max-w-full">
          <div className="flex overflow-hidden flex-col justify-center px-10 py-6 w-full text-base text-black whitespace-nowrap bg-white rounded shadow-sm max-md:px-5 max-md:max-w-full">
            <div className="flex flex-wrap gap-10 items-center max-md:max-w-full">
              <div className="self-stretch my-auto">Product</div>
              <div className="self-stretch my-auto">Price</div>
              <div className="self-stretch my-auto">Quantity</div>
              <div className="self-stretch my-auto">Subtotal</div>
            </div>
          </div>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="flex flex-wrap gap-10 items-start mt-6 text-base font-medium text-black max-md:max-w-full">
            <button className="gap-2.5 self-stretch px-12 py-4 rounded border border-solid border-black border-opacity-50 max-md:px-5">
              Return To Shop
            </button>
            <button className="gap-2.5 self-stretch px-12 py-4 rounded border border-solid border-black border-opacity-50 max-md:px-5">
              Update Cart
            </button>
          </div>
        </section>
        <section className="flex flex-wrap gap-10 items-start mt-20 text-base max-md:mt-10 max-md:max-w-full">
          <CouponForm />
          <CartTotal total={1750} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
