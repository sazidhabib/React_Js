import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./types";

interface AuthState {
  isLogin: boolean;
  user?: User;
}

const initialState: AuthState = {
  isLogin: false,
  user: JSON.parse(localStorage.getItem("user") || "null"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (
      state,
      action: PayloadAction<{ isLogin: boolean; user?: User }>
    ) => {
      state.isLogin = action.payload.isLogin;
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout: (state) => {
      state.isLogin = false;
      state.user = undefined;
      localStorage.removeItem("user");
    },
  },
});

export const { setLogin, logout } = authSlice.actions;
export default authSlice.reducer;
