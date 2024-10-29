import React, { useContext } from "react";
import { GlobalContex } from "../context/GlobalState";

import { useNavigate } from "react-router-dom";

const MoviesList = ({ movies }) => {
  console.log(movies);

  const { addMovieToWatchlater, watchlater, addMovieToWatched, watched } =
    useContext(GlobalContex);

  const limitText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const navigate = useNavigate();

  let existInWatchLater = (movie) => {
    let moviePresent = watchlater.find(
      (insideMovie) => insideMovie.id === movie.id
    );
    return moviePresent ? true : false;
  };

  let existInWatched = (movie) => {
    let moviePresent = watched.find(
      (insideMovie) => insideMovie.id === movie.id
    );
    return moviePresent ? true : false;
  };

  console.log(existInWatchLater(movies));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <div key={movie.id} className="bg-white p-4 shadow-lg rounded-lg">
          <img
            src={movie.img}
            alt={movie.title}
            className="w-full h-auto mb-4 rounded-lg"
          />
          <h3 className="text-lg font-semibold text-gray-800 mb-2 ">
            {limitText(movie.title, 10)}
          </h3>
          <p className="text-sm text-gray-600">
            Release Date: {movie.releaseDate}
          </p>
          <p className="text-sm text-gray-700 mt-2 mb-2">
            {limitText(movie.openingText, 100)}
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            onClick={() => {
              navigate(`/details/${movie.id}`);
            }}
          >
            Details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 inline-block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
              />
            </svg>
          </button>
          <button
            disabled={existInWatched(movie)}
            onClick={() => addMovieToWatched(movie)}
            className={`${
              existInWatched(movie)
                ? "bg-gray-300 cursor-not-allowed opacity-50 text-black"
                : "bg-blue-500 hover:bg-blue-700 text-white"
            } className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-3 rounded w-full`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 inline-block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
              />
            </svg>
            Watched
          </button>
          <button
            disabled={existInWatchLater(movie)}
            onClick={() => addMovieToWatchlater(movie)}
            className={`${
              existInWatchLater(movie)
                ? "bg-gray-300 cursor-not-allowed opacity-50 text-black"
                : "bg-blue-500 hover:bg-blue-700 text-white"
            }  font-bold py-2 px-4 rounded w-full`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 inline-block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            watched later
          </button>
        </div>
      ))}
    </div>
  );
};

export default MoviesList;
