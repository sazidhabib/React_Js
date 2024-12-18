import React from "react";
import TopHeader from "./TopHeader";
import Header from "./Header";
import BillingDetails from "./BillingDetails";
import OrderSummary from "./OrderSummary";
import Footer from "./Footer";

const CheckOut: React.FC = () => {
  return (
    <div className="flex flex-col bg-white">
      <TopHeader />
      <Header />
      <div className="mt-4 w-full bg-black border border-black border-solid opacity-30 min-h-[1px] max-md:max-w-full" />
      <main className="flex flex-col items-start self-center mt-20 w-full max-w-[1170px] max-md:mt-10 max-md:max-w-full">
        <nav aria-label="Breadcrumb">
          <ol className="flex gap-3 items-center text-sm text-black">
            <li>
              <a href="#" className="opacity-50">
                Account
              </a>
            </li>
            <li>
              <a href="#" className="opacity-50">
                My Account
              </a>
            </li>
            <li>
              <a href="#" className="opacity-50">
                Product
              </a>
            </li>
            <li>
              <a href="#" className="opacity-50">
                View Cart
              </a>
            </li>
            <li aria-current="page">CheckOut</li>
          </ol>
        </nav>
        <h1 className="mt-20 text-4xl font-medium tracking-widest leading-none text-black max-md:mt-10">
          Billing Details
        </h1>
        <div className="self-stretch mt-12 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <BillingDetails />
            <OrderSummary />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckOut;
