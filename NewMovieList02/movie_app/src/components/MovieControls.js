import React, { useContext } from "react";
import { GlobalContex } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";

const MovieControls = ({ movies, type }) => {
  const navigate = useNavigate();
  console.log(movies.id);

  const {
    removeMovieFromWatchlater,
    addMovieToWatched,
    moveToWatchlater,
    removeMovieFromWatched,
  } = useContext(GlobalContex);
  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        onClick={() => {
          navigate(`/details/${movies.id}`);
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
      {type === "watchlater" && (
        <>
          <button
            onClick={() => addMovieToWatched(movies)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded w-full"
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
            watched
          </button>
          <button
            onClick={() => movies?.id && removeMovieFromWatchlater(movies.id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-3 rounded w-full"
          >
            Remove WatchLater
          </button>
        </>
      )}
      {type === "watched" && (
        <>
          <button
            onClick={() => moveToWatchlater(movies)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded w-full"
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
            WatchLater
          </button>
          <button
            onClick={() => removeMovieFromWatched(movies.id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  my-3 rounded w-full"
          >
            Remove Watched
          </button>
        </>
      )}
    </div>
  );
};

export default MovieControls;
