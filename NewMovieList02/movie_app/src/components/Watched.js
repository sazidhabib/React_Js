import React, { useContext } from "react";
import { GlobalContex } from "../context/GlobalState";
import { MovieCard } from "./MovieCard";

const Watched = () => {
  return (
    <Fragment>
      <Navber />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {watchlist.length > 0 &&
          watchlist.map((movie) => (
            <MovieCard movie={movie} key={movie.id} type="watchlist" />
          ))}
        {watchlist.length === 0 && (
          <h1>There are no Movies in this watchlist</h1>
        )}
      </div>
    </Fragment>
  );
};

export default Watched;
