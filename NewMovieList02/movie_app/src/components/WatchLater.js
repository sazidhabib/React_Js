import React, { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContex } from "../context/GlobalState";
import Navber from "./NavBar";
import MovieCard from "./MovieCard";

const WatchLater = () => {
  const { watchlist } = useContext(GlobalContex);

  const navigate = useNavigate();

  return (
    <Fragment>
      <Navber />
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black text-center">
        Watchlist Movies
      </h1>
      {watchlist.length === 0 && (
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center">
          There are no Movies in this Watch leter Movies page!
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {watchlist.length > 0 &&
          watchlist.map((movie) => (
            <MovieCard movie={movie} key={movie.id} type="watchlist" />
          ))}
      </div>
    </Fragment>
  );
};

export default WatchLater;
