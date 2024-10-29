import React, { useState, useEffect, useCallback, Fragment } from "react";
import { Outlet } from "react-router-dom";
import MoviesList from "./components/MoviesList";
import "./index.css";
import Navber from "./components/NavBar";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://movies-api14.p.rapidapi.com/movies",
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "f763d779e0mshf17c58e06e03995p10a109jsnd27ec419a469",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const transformedMovies = data.movies.map((movieData) => {
        return {
          id: movieData._id,
          img: movieData.poster_path,
          title: movieData.title,
          releaseDate: movieData.release_date,
          openingText: movieData.overview,
          genres: movieData.genres,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  let content = <p className="text-center text-gray-600">Found no movies...</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p className="text-center text-red-600">{error}</p>;
  }
  if (isLoading) {
    content = <p className="text-center text-blue-500">Loading...</p>;
  }

  return (
    <Fragment>
      <Navber />
      <Outlet />
      <div className="bg-gray-100 min-h-screen p-8">
        <section className="text-center mb-8">
          <button
            onClick={fetchMovieHandler}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
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
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
            Fetch Movies
          </button>
        </section>
        <section className="container mx-auto">{content}</section>
      </div>
    </Fragment>
  );
}

export default App;
