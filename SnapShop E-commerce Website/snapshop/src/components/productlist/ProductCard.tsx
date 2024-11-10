import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import RatingBar from "./RatingBar";
import { GlobalContext } from "../../context/GlobalContext";
import LoginPromptModal from "../LoginPromptModal";

type ProductCardProps = {
  id: number;
  image: string;
  title: string;
  price: number;
  originalPrice?: string;
  discount?: string;
  isNew?: boolean;
  rating?: number;
  reviews?: number;
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  price,
  originalPrice,
  discount,
  isNew,
  rating,
  reviews,
}) => {
  const { addToWishlist, wishlist, addToCart, cart, isLogin } =
    useContext(GlobalContext);
  console.log("sazid", wishlist);

  const [showLoginPrompt, setShowLoginPrompt] = useState(false); // State for modal

  // Function to check if a product is already in the wishlist
  const existInWishlist = wishlist.some((product) => product.id === id);

  // Function to check if a product is already in the cart
  const existInCart = cart.some((product) => product.id === id);

  console.log("isLoginisLogin: ", isLogin);
  // Handle add to cart action
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLogin) {
      if (!existInCart) addToCart({ id, image, title, price });
    } else {
      setShowLoginPrompt(true); // Show modal if not logged in
    }
  };

  return (
    <>
      {showLoginPrompt && (
        <LoginPromptModal onClose={() => setShowLoginPrompt(false)} />
      )}
      <Link to={`/product/${id}`}>
        <div className="hover:shadow-lg relative overflow-hidden pt-3 rounded flex flex-col w-[270px]">
          <div className="relative overflow-hidden flex flex-col pt-3 w-full rounded bg-neutral-100 max-w-[270px]">
            <div className="relative overflow-hidden flex gap-2.5 mx-3 max-md:mx-2.5">
              <div className="flex flex-col text-xs whitespace-nowrap text-neutral-50">
                {discount && (
                  <div className="gap-2.5 self-start px-3 py-1 bg-red-500 rounded">
                    {discount}
                  </div>
                )}
                {isNew && (
                  <div className="gap-2.5 self-start px-3 py-1 bg-green-500 rounded">
                    NEW
                  </div>
                )}
                <img
                  loading="lazy"
                  src={image}
                  alt={title}
                  className="object-contain z-10 self-end max-w-full aspect-[0.95] w-[158px]"
                />
              </div>
              <button
                aria-label="Add to wishlist"
                className="flex flex-col self-start"
                onClick={(e) => {
                  e.preventDefault(); // Prevents link navigation
                  if (!existInWishlist)
                    addToWishlist({ id, image, title, price });
                }}
              >
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/00d93adab53c5214ab1a164999c542db25c2e68622e0085e7c9140fbeae9a9e5?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                  alt="Add to Wishlist"
                  className="object-contain aspect-square w-[34px]"
                />
              </button>
            </div>
            <button
              className="hover:bg-red-500 group-hover:flex inset-x-0 bottom-0 justify-center items-center px-7 py-2.5 mt-3.5 w-full text-xs text-white bg-black"
              aria-label="Add to Cart"
              onClick={handleAddToCart}
            >
              <div className="flex gap-2 items-center">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/eb1c7b4c5b8a14be22a3ab2dcaf00ea2a28efa02e58b408afde256eec3ce6cfd?placeholderIfAbsent=true&apiKey=f40e85373ac14970bb43d76751298eef"
                  alt="Add to Cart"
                  className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                />
                <span className="self-stretch my-auto">Add To Cart</span>
              </div>
            </button>
          </div>
          <div className="flex flex-col items-start self-start mt-4 text-base font-medium">
            <h3 className="self-stretch text-black">{title}</h3>
            <div className="flex gap-3 items-start mt-2 whitespace-nowrap">
              <span className="text-red-500">$ {price}</span>
              {originalPrice && (
                <span className="text-black opacity-50">{originalPrice}</span>
              )}
            </div>
            {rating && (
              <div className="flex gap-2 items-start mt-2 text-sm font-semibold text-black whitespace-nowrap">
                <RatingBar rating={rating} />
                <span className="w-8 opacity-50">({reviews})</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
