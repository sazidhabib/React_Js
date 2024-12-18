import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./wishlistSlice";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";

// Explicit RootState Interface
export interface RootState {
  wishlist: {
    id: number;
    name: string;
  }[];

  cart: {
    id: number;
    image: string;
    name: string;
    price: number;
    quantity: number;
  }[];

  auth: {
    isLogin: boolean;
    user: {
      id: number;
      name: string;
    } | null;
  };
}

const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

// Type for the entire store's state
export type AppState = RootState;

// App-specific types
export type AppDispatch = typeof store.dispatch;

export default store;
