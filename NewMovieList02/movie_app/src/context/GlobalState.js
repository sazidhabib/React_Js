import React, { createContext, useReducer, useEffect } from "react";

//initial state
const initialState = {
  watchlist: [],
  watched: [],
};

//create contex
export const GlobalState = createContext(initialState);

//provider components
