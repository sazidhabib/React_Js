import React, { createContext, useReducer, useEffect, ReactNode } from "react";
import AppReducer from "./AppReducer";
import { State, User, Product } from "./types";

// Initial state
const initialState: State = {
  wishlist: localStorage.getItem("wishlist")
    ? JSON.parse(localStorage.getItem("wishlist") as string)
    : [],
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") as string)
    : [],
};

// Create context
interface GlobalContextProps {
  wishlist: Product[];
  cart: Product[];
  isLogin: boolean;
  user?: User; // Add user type here
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  moveToWishlist: (product: Product) => void;
  setLogin: (isLogin: boolean, user?: User) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const GlobalContext = createContext<GlobalContextProps | undefined>(
  undefined
);

interface GlobalProviderProps {
  children: ReactNode;
}

// Provider component
export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    localStorage.setItem("cart", JSON.stringify(state.cart));
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state]);

  // Actions
  const addToWishlist = (product: Product) => {
    dispatch({ type: "ADD_TO_WISHLIST", payload: product });
  };

  const removeFromWishlist = (id: number) => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id });
  };

  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  const setLogin = (isLogin: boolean, user?: User) => {
    dispatch({ type: "SET_TO_LOGIN", payload: { isLogin, user } });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const moveToWishlist = (product: Product) => {
    dispatch({ type: "MOVE_TO_WISHLIST", payload: product });
  };

  return (
    <GlobalContext.Provider
      value={{
        wishlist: state.wishlist,
        cart: state.cart,
        isLogin: state.isLogin,
        user: state.user,
        addToWishlist,
        removeFromWishlist,
        addToCart,
        removeFromCart,
        moveToWishlist,
        setLogin,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
