import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      //const response = await fetch("https://swapi.dev/api/films");
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
      console.log(data);

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
  }, []);

  let content = <p>Found no Moives..</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  console.log(movies);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
