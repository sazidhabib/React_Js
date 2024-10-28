import React, { useContext } from "react";
import { GlobalContex } from "../context/GlobalState";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const MoviesList = ({ movies }) => {
  console.log(movies);

  const { addMovieToWatchlist, watchlist } = useContext(GlobalContex);

  const [watched, setWatched] = useState([]);

  const navigate = useNavigate();

  let existInWatchList = (movie) => {
    let moviePresent = watchlist.find(
      (insideMovie) => insideMovie.id === movie.id
    );
    return moviePresent ? true : false;
  };

  console.log(existInWatchList(movies));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <div key={movie.id} className="bg-white p-4 shadow-lg rounded-lg">
          <img
            src={movie.img}
            alt={movie.title}
            className="w-full h-auto mb-4 rounded-lg"
          />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {movie.title}
          </h3>
          <p className="text-sm text-gray-600">
            Release Date: {movie.releaseDate}
          </p>
          <p className="text-sm text-gray-700 mt-2">{movie.openingText}</p>
          <button
            onClick={() => {
              const arr = [...watched];

              const currentIndex = arr.findIndex((c) => c.id === movie.id);

              if (currentIndex === -1) {
                arr.push(movie);
              } else {
                arr.splice(currentIndex, 1);
              }

              setWatched(arr);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-3 my-3 rounded"
          >
            watched
          </button>
          <button
            disabled={existInWatchList(movie)}
            onClick={() => addMovieToWatchlist(movie)}
            className={`${
              existInWatchList(movie)
                ? "bg-gray-300 cursor-not-allowed opacity-50"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded`}
          >
            watched later
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              navigate(`/details/${movie.id}`);
            }}
          >
            Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default MoviesList;
