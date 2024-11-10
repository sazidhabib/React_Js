export interface Product {
  id: number;
  title: string;
  price: number;
  image?: string;
  // Add other relevant product fields here
}

export interface State {
  wishlist: Product[];
  cart: Product[];
  isLogin: boolean;
}

export type Action =
  | { type: "ADD_TO_WISHLIST"; payload: Product }
  | { type: "REMOVE_FROM_WISHLIST"; payload: number }
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "SET_TO_LOGIN"; payload: boolean }
  | { type: "MOVE_TO_WISHLIST"; payload: Product };
