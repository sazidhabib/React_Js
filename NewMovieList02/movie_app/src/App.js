import React, { useState, useEffect, useCallback, Fragment } from "react";
import MoviesList from "./components/MoviesList";
import "./index.css";

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
      <div className="bg-gray-100 min-h-screen p-8">
        <section className="text-center mb-8">
          <button
            onClick={fetchMovieHandler}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
          >
            Fetch Movies
          </button>
        </section>
        <section className="container mx-auto">{content}</section>
      </div>
    </Fragment>
  );
}

export default App;
