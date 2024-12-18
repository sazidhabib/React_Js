import React, { useState } from "react";

const CouponForm: React.FC = () => {
  const [coupon, setCoupon] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle coupon submission
    console.log("Coupon submitted:", coupon);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap gap-4 items-end min-w-[240px] max-md:max-w-full"
    >
      <div className="flex overflow-hidden flex-col justify-center items-start px-6 py-4 text-black rounded border border-black border-solid min-w-[240px] w-[300px] max-md:px-5">
        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Coupon Code"
          className="w-full bg-transparent border-none outline-none"
          aria-label="Enter coupon code"
        />
      </div>
      <button
        type="submit"
        className="gap-2.5 self-stretch px-12 py-4 font-medium bg-red-500 rounded text-neutral-50 max-md:px-5"
      >
        Apply Coupon
      </button>
    </form>
  );
};

export default CouponForm;
