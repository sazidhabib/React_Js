import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  return (
    <li className={classes.movie}>
      <img src={props.img} alt={props.title} />
      <h2>{props.title}</h2>
      <h3>{props.category}</h3>
      <p>{props.description}</p>
      <h3>{props.price}</h3>
    </li>
  );
};

export default Movie;
