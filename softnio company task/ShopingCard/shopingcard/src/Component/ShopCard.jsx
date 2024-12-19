import { useState } from "react";
import { useCart } from "../Context/CartContext";
import RatingBar from "./RatingBar";
import CartModal from "./CartModal";

function ShopCard() {
  const { addToCart } = useCart();

  const { cart } = useCart();

  // Calculate total quantity and price
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  const [isCartModalVisible, setIsCartModalVisible] = useState(false);
  const [activeBandColor, setActiveBandColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("S");
  const [quantity, setQuantity] = useState(1);

  const images = ["/image1.png", "/image2.png", "/image3.png", "/image4.png"];
  const bandColors = ["Purple", "Cyan", "Blue", "Black"];
  const sizePrices = { S: 69, M: 79, L: 89, XL: 99 };

  const toggleCartModal = (e) => {
    e.preventDefault();
    setIsCartModalVisible((prev) => !prev);
  };

  // Increment/Decrement Quantity
  const handleIncrement = () =>
    setQuantity((prev) => (prev < 10 ? prev + 1 : prev));
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  // Handle Add to Cart
  const handleAddToCart = () => {
    const item = {
      image: images[activeBandColor],
      name: "Classy Modern Smart Watch",
      color: bandColors[activeBandColor],
      size: selectedSize,
      quantity,
      price: sizePrices[selectedSize] * quantity,
    };
    addToCart(item);
  };

  return (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="w-full max-w-screen-2xl h-full px-12 pt-12 flex flex-col gap-12">
        {/* Product Display Section */}
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          <div className="  max-w-md lg:max-w-xl bg-orange-400 rounded-md overflow-hidden border">
            <img
              className="w-full h-auto xl:w-[630px] xl:h-[721px] bg-cover "
              src={images[activeBandColor]}
              alt="Product"
            />
          </div>
          <div className="flex flex-1 flex-col items-start gap-6">
            <h1 className="text-gray-800 text-3xl font-bold text-left">
              Classy Modern Smart Watch
            </h1>
            <div className="flex items-center gap-2">
              <RatingBar rating={3.5} />
              <span className="text-gray-500 text-sm">(2 Reviews)</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-gray-500 text-lg line-through">$99.00</span>
              <span className="text-[#6576ff] text-2xl font-bold">
                ${sizePrices[selectedSize]}.00
              </span>
            </div>
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

            {/* Band Colors */}

            <div className="self-stretch h-[74px] pt-5 flex-col justify-start items-start gap-2.5 flex">
              <div className="text-[#364a63] text-lg font-bold leading-tight">
                Band Color
              </div>
              <div className="justify-start items-center gap-[19px] inline-flex">
                {bandColors.map((color, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveBandColor(index)}
                    className={`w-6 h-6 relative cursor-pointer ${
                      activeBandColor === index ? "" : ""
                    }`}
                  >
                    {/* Outer circle */}
                    <div
                      className={`w-6 h-6 absolute rounded-full`}
                      style={{
                        borderColor:
                          activeBandColor === index
                            ? bandColors[index] === "Purple"
                              ? "#816bff"
                              : bandColors[index] === "Cyan"
                              ? "#1fcec9"
                              : bandColors[index] === "Blue"
                              ? "#4b97d3"
                              : "#000"
                            : "transparent", // Default transparent border for inactive circle
                        borderWidth: activeBandColor === index ? "2px" : "0", // Only show border when active
                      }}
                    ></div>

                    {/* Inner color circle */}
                    <div
                      className={`w-4 h-4 absolute rounded-full`}
                      style={{
                        backgroundColor:
                          color === "Purple"
                            ? "#816bff"
                            : color === "Cyan"
                            ? "#1fcec9"
                            : color === "Blue"
                            ? "#4b97d3"
                            : "#000",
                        left: "4px",
                        top: "4px",
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Options */}
            <h3 className="text-gray-800 text-lg font-bold text-left">
              Wrist Size
            </h3>
            <div className="flex items-center gap-2.5">
              {Object.keys(sizePrices).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-[18px] py-2 text-[13px] font-semibold rounded border ${
                    selectedSize === size
                      ? "border-blue-600 text-blue-600"
                      : "border-gray-300 text-gray-800"
                  }`}
                >
                  {size}{" "}
                  <span className="text-gray-500 "> ${sizePrices[size]}</span>
                </button>
              ))}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={handleDecrement}
                  className="px-2 py-1 text-gray-500 border-r"
                >
                  -
                </button>
                <span className=" px-[26px] py-[3px] text-[#364a63] text-sm">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="px-2 py-1 text-gray-500 border-l"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="px-[18px] py-2 bg-[#6576ff] text-white font-bold text-[13px] rounded hover:bg-[#5765d9]"
              >
                Add to Cart
              </button>
              <div className="w-5 h-5 pl-px py-0.5 justify-center items-center flex">
                <div className="text-center text-[#6576ff] text-lg font-normal font-['Nioicon'] leading-none">
                  <svg
                    width="19"
                    height="16"
                    viewBox="0 0 19 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.5 15.3729C9.39102 15.3729 9.28809 15.3547 9.19121 15.3184C9.10645 15.2699 9.02773 15.2154 8.95508 15.1549L2.39785 8.59766C1.96191 8.14961 1.6168 7.63496 1.3625 7.05371C1.1082 6.46035 0.981055 5.83066 0.981055 5.16465C0.981055 4.48652 1.1082 3.85684 1.3625 3.27559C1.6168 2.68223 1.96191 2.16758 2.39785 1.73164C2.83379 1.28359 3.34844 0.932422 3.9418 0.678125C4.53516 0.423828 5.16484 0.296679 5.83086 0.296679C6.49687 0.296679 7.12656 0.423828 7.71992 0.678125C8.31328 0.932422 8.82793 1.28359 9.26387 1.73164L9.5 1.96777L9.73613 1.71348C10.1721 1.27754 10.6807 0.932422 11.2619 0.678125C11.8553 0.423828 12.485 0.296679 13.151 0.296679C13.1631 0.296679 13.1691 0.296679 13.1691 0.296679C13.1813 0.296679 13.1873 0.296679 13.1873 0.296679C13.8533 0.296679 14.477 0.423828 15.0582 0.678125C15.6516 0.932422 16.1662 1.28359 16.6021 1.73164C17.0381 2.16758 17.3832 2.68223 17.6375 3.27559C17.8918 3.85684 18.0189 4.48652 18.0189 5.16465C18.0189 5.83066 17.8918 6.46035 17.6375 7.05371C17.3832 7.63496 17.0381 8.14961 16.6021 8.59766L10.0449 15.1549C9.97227 15.2154 9.8875 15.2699 9.79063 15.3184C9.70586 15.3547 9.60898 15.3729 9.5 15.3729ZM5.83086 1.85879C4.92266 1.85879 4.1416 2.17969 3.4877 2.82148C2.8459 3.46328 2.525 4.24434 2.525 5.16465C2.525 5.6127 2.60977 6.04258 2.7793 6.4543C2.96094 6.85391 3.19707 7.19902 3.4877 7.48965L9.5 13.502L15.5123 7.48965C15.8029 7.19902 16.033 6.85391 16.2025 6.4543C16.3842 6.04258 16.475 5.6127 16.475 5.16465C16.475 4.70449 16.3842 4.27461 16.2025 3.875C16.033 3.47539 15.8029 3.12422 15.5123 2.82148C15.2096 2.51875 14.8584 2.28262 14.4588 2.11309C14.0592 1.94355 13.6354 1.85879 13.1873 1.85879C13.1752 1.85879 13.1691 1.85879 13.1691 1.85879C12.709 1.85879 12.2791 1.94355 11.8795 2.11309C11.4799 2.28262 11.1348 2.51875 10.8441 2.82148H10.826L10.0449 3.60254C9.97227 3.6752 9.8875 3.73574 9.79063 3.78418C9.70586 3.82051 9.60898 3.83867 9.5 3.83867C9.39102 3.83867 9.28809 3.82051 9.19121 3.78418C9.10645 3.73574 9.02773 3.6752 8.95508 3.60254L8.17402 2.82148C7.87129 2.51875 7.52012 2.28262 7.12051 2.11309C6.7209 1.94355 6.29102 1.85879 5.83086 1.85879Z"
                      fill="#6576FF"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center">
          <button
            onClick={toggleCartModal}
            className="flex items-center gap-2 px-6 py-2 bg-yellow-400 rounded-full shadow"
          >
            <span className="text-gray-800 text-sm font-bold">Checkout</span>
            <span className="px-2 py-1 bg-white text-gray-800 text-xs font-bold rounded">
              {totalQuantity}
            </span>
          </button>
        </div>

        {/* Cart Modal */}
        {isCartModalVisible && <CartModal toggleCartModal={toggleCartModal} />}
      </div>
    </div>
  );
}

export default ShopCard;
