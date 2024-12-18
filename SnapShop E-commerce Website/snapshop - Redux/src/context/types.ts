export interface Product {
  id: number;
  title: string;
  price: number;
  image?: string;
  // Add other relevant product fields here
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface State {
  wishlist: Product[];
  cart: Product[];
  isLogin: boolean;
  user?: User;
}

export type Action =
  | { type: "ADD_TO_WISHLIST"; payload: Product }
  | { type: "REMOVE_FROM_WISHLIST"; payload: number }
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "SET_TO_LOGIN"; payload: { isLogin: boolean; user?: User } }
  | { type: "MOVE_TO_WISHLIST"; payload: Product };
