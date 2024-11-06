import React from "react";

import Movie from "./Movie";
import classes from "./MoviesList.module.css";

const MovieList = (props) => {
  return (
    <ul className={classes["grid-container"]}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          img={movie.img}
          title={movie.title}
          category={movie.category}
          description={movie.description}
          price={movie.price}
        />
      ))}
    </ul>
  );
};

export default MovieList;
