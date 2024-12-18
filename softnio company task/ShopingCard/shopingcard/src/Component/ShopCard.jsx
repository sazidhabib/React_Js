import React, { useState } from "react";
import RatingBar from "./RatingBar";

function ShopCard() {
  // State to manage the active band color and corresponding image
  const [activeBandColor, setActiveBandColor] = useState(0);

  //For wrist size
  const [selectedSize, setSelectedSize] = useState("S");

  // Images array
  const images = ["/image1.png", "/image2.png", "/image3.png", "/image4.png"];

  // Band colors array
  const bandColors = [
    "bg-purple-500",
    "bg-teal-500",
    "bg-blue-400",
    "bg-gray-700",
  ];

  return (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="w-full max-w-screen-2xl h-full px-12 pt-12 flex flex-col gap-12">
        {/* Product Display Section */}
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Product Image */}
          <div className="w-full max-w-md lg:max-w-xl bg-orange-400 rounded-md overflow-hidden border">
            <img
              className="w-full h-auto"
              src={images[activeBandColor]}
              alt="Product"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-1 flex-col items-start gap-6">
            {/* Product Title */}
            <h1 className="text-gray-800 text-3xl font-bold text-left">
              Classy Modern Smart Watch
            </h1>

            {/* Reviews */}
            <div className="flex items-center gap-2">
              <div className="flex space-x-1">
                <RatingBar rating={3.5} />
              </div>
              <span className="text-gray-500 text-sm">(2 Reviews)</span>
            </div>

            {/* Price Section */}
            <div className="flex items-end gap-2">
              <span className="text-gray-500 text-lg line-through">$99.00</span>
              <span className="text-blue-500 text-2xl font-bold">$79.00</span>
            </div>

            {/* Product Description */}
            <p className="text-gray-600 text-base text-left">
              I must explain to you how all this mistaken idea of denouncing
              pleasure and praising pain was born and I will give you a complete
              account of the system, and expound the actual teachings.
            </p>

            {/* Product Specifications */}
            <div className="flex gap-12">
              <div>
                <h3 className="text-gray-500 text-sm text-left">Type</h3>
                <p className="text-gray-800 text-base font-bold">Watch</p>
              </div>
              <div>
                <h3 className="text-gray-500 text-sm text-left">
                  Model Number
                </h3>
                <p className="text-gray-800 text-base font-bold">
                  Forerunner 290XT
                </p>
              </div>
            </div>

            {/* Band Color Options */}
            <div>
              <h3 className="text-gray-800 text-lg font-bold text-left">
                Band Color
              </h3>
              <div className="flex items-center gap-4 mt-2">
                {bandColors.map((color, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveBandColor(index)} // Update the active image
                    className={`w-6 h-6 rounded-full ${color} border-2 cursor-pointer transition-all ${
                      activeBandColor === index
                        ? `border-yellow-500  scale-110`
                        : "border-gray-300 "
                    }`}
                    tabIndex={0} // Enable keyboard focus
                    onKeyDown={(e) =>
                      e.key === "Enter" && setActiveBandColor(index)
                    } // Handle Enter key
                  ></div>
                ))}
              </div>
            </div>

            {/* Wrist Size Options */}
            <div>
              <h3 className="text-gray-800 text-lg font-bold text-left">
                Wrist Size
              </h3>
              <div className="flex font-semibold items-center gap-3 mt-2">
                {["S", "M", "L", "XL"].map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`flex items-center gap-1 px-4 py-2 rounded border text-base ${
                      selectedSize === size
                        ? "border-blue-600 text-blue-600"
                        : "border-gray-300 text-gray-800"
                    } hover:border-blue-400 hover:text-blue-400 transition`}
                  >
                    <span className="text-lg">{size}</span>
                    <span className="text-gray-500">
                      $
                      {index === 0
                        ? "69"
                        : index === 1
                        ? "79"
                        : index === 2
                        ? "89"
                        : "99"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300  rounded">
                <button className="px-2 py-1 text-gray-500 border-r border-gray-300">
                  -
                </button>
                <span className="px-4 text-gray-800">0</span>
                <button className="px-2 py-1 text-gray-500 border-l border-gray-300">
                  +
                </button>
              </div>
              <button className="px-6 py-2 bg-blue-500 text-white rounded">
                Add to Cart
              </button>
              <button className="py-2 text-blue-500 rounded">
                <svg
                  width="19"
                  height="16"
                  viewBox="0 0 19 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* SVG Path */}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="flex justify-center">
          <button className="flex items-center gap-2 px-6 py-2 bg-yellow-400 rounded-full shadow">
            <span className="text-gray-800 text-sm font-bold">Checkout</span>
            <span className="px-2 py-1 bg-white text-gray-800 text-xs font-bold rounded">
              2
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShopCard;
