import React, { useContext } from "react";
import { GlobalContex } from "../context/GlobalState";

const MovieControls = ({ movies, type }) => {
  console.log(movies.id);

  const { removeMovieFromWatchlist } = useContext(GlobalContex);
  return (
    <>
      {type === "watchlist" && (
        <button
          onClick={() => movies?.id && removeMovieFromWatchlist(movies.id)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-3 my-3 rounded"
        >
          Remove WatchLater
        </button>
      )}
    </>
  );
};

export default MovieControls;
