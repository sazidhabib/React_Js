import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store"; // Adjust the import path based on your project structure
import { addToCart, CartState } from "../../Redux/cartSlice";
import { addToWishlist, WishlistState } from "../../Redux/wishlistSlice";
import { setLogin } from "../../Redux/authSlice"; // Ensure this selector is defined in authSlice
import RatingBar from "./RatingBar";
import LoginPromptModal from "../LoginPromptModal";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

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
  const dispatch = useDispatch();

  // Accessing Redux state
  const wishlist = useSelector((state: RootState) => state.wishlist.wishlist);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const isLogin = useSelector(setLogin);

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Check if the product is in the wishlist or cart
  const existInWishlist = wishlist.some((product) => product.id === id);
  const existInCart = cart.some((product) => product.id === id);

  // Handle add to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLogin) {
      if (!existInCart) {
        dispatch(addToCart({ id, image, title, price }));
      }
    } else {
      setShowLoginPrompt(true);
    }
  };

  // Handle add to wishlist
  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!existInWishlist) {
      dispatch(addToWishlist({ id, image, title, price }));
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
                onClick={handleAddToWishlist}
              >
                {existInWishlist ? (
                  <MdFavorite className="text-2xl hover:bg-gray-300 object-contain aspect-square" />
                ) : (
                  <MdFavoriteBorder className="text-2xl hover:bg-gray-300 object-contain aspect-square" />
                )}
              </button>
            </div>
            <button
              className={`${
                existInCart
                  ? "bg-gray-300 cursor-not-allowed opacity-50 text-black justify-center items-center px-7 py-2.5 mt-3.5 w-full"
                  : "hover:bg-red-500 group-hover:flex inset-x-0 bottom-0 justify-center items-center px-7 py-2.5 mt-3.5 w-full text-xs text-white bg-black"
              } `}
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
