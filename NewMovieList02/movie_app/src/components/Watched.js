import React, { useContext, Fragment } from "react";
import { GlobalContex } from "../context/GlobalState";
import MovieCard from "./MovieCard";
import Navbar from "./NavBar";

const Watched = () => {
  const { watched } = useContext(GlobalContex);
  console.log(watched);

  return (
    <Fragment>
      <Navbar />
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black text-center">
        My Watched Movies
      </h1>
      {watched.length === 0 && (
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center">
          There are no Movies in this watched
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {watched.length > 0 &&
          watched.map((movie) => (
            <MovieCard movie={movie} key={movie.id} type="watched" />
          ))}
      </div>
    </Fragment>
  );
};

export default Watched;
