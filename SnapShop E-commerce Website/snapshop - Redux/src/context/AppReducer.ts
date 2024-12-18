import { State, Action } from "./types";

const AppReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        wishlist: [action.payload, ...state.wishlist],
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (product) => product.id !== action.payload
        ),
      };
    case "ADD_TO_CART":
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (product) => product.id !== action.payload.id
        ),
        cart: [action.payload, ...state.cart],
      };
    case "MOVE_TO_WISHLIST":
      return {
        ...state,
        cart: state.cart.filter((product) => product.id !== action.payload.id),
        wishlist: [action.payload, ...state.wishlist],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((product) => product.id !== action.payload),
      };
    case "SET_TO_LOGIN":
      return {
        ...state,
        isLogin: action.payload.isLogin,
        user: action.payload.user,
        // Save user details when logged in
      };
    default:
      return state;
  }
};

export default AppReducer;
