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

export default WatchLater;
