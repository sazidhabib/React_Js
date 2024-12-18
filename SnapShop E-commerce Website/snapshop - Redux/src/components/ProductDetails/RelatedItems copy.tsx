import React, { useState } from "react";

interface ProductInfoProps {}

const ProductInfo: React.FC<ProductInfoProps> = () => {
  const [quantity, setQuantity] = useState(2);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="mt-20 w-full max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div
          data-layername="column"
          className="flex flex-col w-[64%] max-md:ml-0 max-md:w-full"
        >
          <div className="grow max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              <div
                data-layername="column"
                className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full"
              >
                <div className="flex flex-col grow max-md:mt-8">
                  {[1, 2, 3, 4].map((index) => (
                    <div
                      key={index}
                      className={`flex overflow-hidden flex-col justify-center px-6 py-3 ${
                        index > 1 ? "mt-4" : ""
                      } rounded bg-neutral-100 max-md:px-5`}
                    >
                      <img
                        loading="lazy"
                        src={`http://b.io/ext_${5 + index}-`}
                        alt={`Product view ${index}`}
                        className="object-contain aspect-[1.06] w-[121px]"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div
                data-layername="column"
                className="flex flex-col ml-5 w-9/12 max-md:ml-0 max-md:w-full"
              >
                <div className="flex overflow-hidden flex-col grow justify-center px-7 py-36 w-full rounded bg-neutral-100 max-md:px-5 max-md:py-24 max-md:mt-8 max-md:max-w-full">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/10996276eabfcd881e2e8c8c41b66f0ecbf43032de670185029bac10af65ae81?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                    alt="Main product view"
                    className="object-contain w-full aspect-[1.42] max-md:max-w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          data-layername="column"
          className="flex flex-col ml-5 w-[36%] max-md:ml-0 max-md:w-full"
        >
          <div className="flex flex-col items-start w-full max-md:mt-10">
            <h1
              data-layername="havicHvG92Gamepad"
              className="text-2xl font-semibold tracking-wider leading-none text-black"
            >
              Havic HV G-92 Gamepad
            </h1>
            <div className="flex gap-4 items-start mt-4 text-sm">
              <div className="flex gap-2 items-start text-black">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c35d903ef32712f74f1d691c7776b06b738b9c9c861a4482d47d9f9e4b9b6d4a?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                  alt="Rating"
                  className="object-contain shrink-0 aspect-[5] w-[100px]"
                />
                <span data-layername="150Reviews" className="opacity-50">
                  (150 Reviews)
                </span>
              </div>
              <div className="flex gap-4 items-center text-green-500">
                <div className="shrink-0 self-stretch my-auto w-0 h-4 bg-black border border-black border-solid opacity-50" />
                <span
                  data-layername="inStock"
                  className="self-stretch my-auto opacity-60"
                >
                  In Stock
                </span>
              </div>
            </div>
            <div
              data-layername="19200"
              className="mt-4 text-2xl tracking-wider leading-none text-black"
            >
              $192.00
            </div>
            <p
              data-layername="playStation5ControllerSkinHighQualityVinylWithAirChannelAdhesiveForEasyBubbleFreeInstallMessFreeRemovalPressureSensitive"
              className="self-stretch mt-6 mr-7 text-sm leading-5 text-black max-md:mr-2.5"
            >
              PlayStation 5 Controller Skin High quality vinyl with air channel
              adhesive for easy bubble free install & mess free removal Pressure
              sensitive.
            </p>
            <div className="shrink-0 self-stretch mt-6 w-full h-px bg-black border border-black border-solid" />
            <div className="flex gap-6 items-start mt-6">
              <span
                data-layername="colours"
                className="text-xl tracking-wide leading-none text-black"
              >
                Colours:
              </span>
              <div
                data-layername="colourChnage"
                className="flex gap-2 items-start"
              >
                <button
                  aria-label="Select blue color"
                  className="flex flex-col w-5"
                >
                  <div className="flex flex-col justify-center items-center px-0.5 w-5 h-5 rounded-full border-2 border-black border-solid">
                    <div className="flex shrink-0 w-3 h-3 bg-indigo-300 rounded-full" />
                  </div>
                </button>
                <button
                  aria-label="Select red color"
                  className="flex shrink-0 w-5 h-5 bg-red-400 rounded-full fill-red-400"
                />
              </div>
            </div>
            <div className="flex gap-6 items-center mt-6 whitespace-nowrap">
              <span
                data-layername="size"
                className="self-stretch my-auto text-xl tracking-wide leading-none text-black"
              >
                Size:
              </span>
              <div className="flex gap-4 items-start self-stretch my-auto text-sm font-medium text-black">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    aria-label={`Select size ${size}`}
                    className={`overflow-hidden px-2 pt-1.5 pb-4 w-8 rounded border border-solid ${
                      size === "M"
                        ? "bg-red-500 text-neutral-50"
                        : "border-black border-opacity-50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-4 self-stretch mt-6 w-full font-medium">
              <div className="flex gap-0 items-start text-xl leading-snug text-black whitespace-nowrap min-h-[44px]">
                <button
                  onClick={decrementQuantity}
                  aria-label="Decrease quantity"
                  className="px-3 py-2 border border-black border-opacity-50 rounded-l"
                >
                  -
                </button>
                <div className="overflow-hidden px-9 py-2 w-20 border-t border-b border-black border-opacity-50 max-md:px-5">
                  {quantity}
                </div>
                <button
                  onClick={incrementQuantity}
                  aria-label="Increase quantity"
                  className="px-3 py-2 border border-black border-opacity-50 rounded-r"
                >
                  +
                </button>
              </div>
              <button
                data-layername="button"
                className="gap-2.5 self-stretch px-12 py-2.5 text-base bg-red-500 rounded text-neutral-50 max-md:px-5"
              >
                Buy Now
              </button>
              <button aria-label="Add to wishlist">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/96b388edb85323f98c8e7e985856939fb1e202a7b2c62362d9367fbfb2293b30?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                  alt=""
                  className="object-contain shrink-0 self-start rounded aspect-square w-[42px]"
                />
              </button>
            </div>
            <div className="flex overflow-hidden flex-col items-start self-stretch py-6 mt-10 w-full font-medium rounded border border-solid border-black border-opacity-50">
              <div className="flex gap-4 items-center ml-4 max-md:ml-2.5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a23f35277ec287bdea2870638bbdacf171666c11a657aa3e10b9901a2334e8b?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                  alt=""
                  className="object-contain shrink-0 self-stretch my-auto w-10 aspect-square"
                />
                <div className="flex flex-col self-stretch my-auto min-w-[240px]">
                  <h3
                    data-layername="freeDelivery"
                    className="text-base text-black"
                  >
                    Free Delivery
                  </h3>
                  <p
                    data-layername="enterYourPostalCodeForDeliveryAvailability"
                    className="mt-2 text-xs text-black"
                  >
                    Enter your postal code for Delivery Availability
                  </p>
                </div>
              </div>
              <div className="shrink-0 self-stretch mt-4 h-px bg-black border border-black border-solid" />
              <div className="flex gap-4 items-center mt-4 ml-4 text-black max-md:ml-2.5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e8eb9d4232c5c4b5fb4e8c5b395d852ff88717160dc1ebc4089000daaa178e67?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                  alt=""
                  className="object-contain shrink-0 self-stretch my-auto w-10 aspect-square"
                />
                <div className="flex flex-col self-stretch my-auto">
                  <h3 data-layername="returnDelivery" className="text-base">
                    Return Delivery
                  </h3>
                  <p
                    data-layername="free30DaysDeliveryReturnsDetails"
                    className="mt-2 text-xs leading-5 underline"
                  >
                    Free 30 Days Delivery Returns.{" "}
                    <a href="/return-policy" className="underline">
                      Details
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
