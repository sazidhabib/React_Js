import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

//initial state
const initialState = {
  watchlater: localStorage.getItem("watchlater")
    ? JSON.parse(localStorage.getItem("watchlater"))
    : [],
  watched: localStorage.getItem("watched")
    ? JSON.parse(localStorage.getItem("watched"))
    : [],
};

//create contex
export const GlobalContex = createContext(initialState);

//provider components
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem("watchlater", JSON.stringify(state.watchlater));
    localStorage.setItem("watched", JSON.stringify(state.watched));
  }, [state]);

  //actions
  const addMovieToWatchlater = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHLATER", payload: movie });
  };

  const removeMovieFromWatchlater = (id) => {
    dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLATER", payload: id });
  };

  const addMovieToWatched = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHED", payload: movie });
  };

  //move to watchlater
  const moveToWatchlater = (movie) => {
    dispatch({ type: "MOVE_TO_WATCHLATER", payload: movie });
  };

  //remove from watched
  const removeMovieFromWatched = (id) => {
    dispatch({ type: "REMOVE_MOVIE_FROM_WATCHED", payload: id });
  };
  return (
    <GlobalContex.Provider
      value={{
        watchlater: state.watchlater,
        watched: state.watched,
        addMovieToWatchlater,
        removeMovieFromWatchlater,
        addMovieToWatched,
        moveToWatchlater,
        removeMovieFromWatched,
      }}
    >
      {props.children}
    </GlobalContex.Provider>
  );
};
