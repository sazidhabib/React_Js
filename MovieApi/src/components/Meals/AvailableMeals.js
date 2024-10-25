import { useEffect, useState } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
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

      const responseData = await response.json();
      //console.log(responseData);

      const loadedMeals = responseData.movies.map((movieData) => {
        return {
          id: movieData._id,
          img: movieData.poster_path,
          title: movieData.title,
          releaseDate: movieData.release_date,
          openingText: movieData.overview,
        };
      });

      //console.log(loadedMeals);

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  // const mealsList = meals.movies.map((meal) => (
  //   <MealItem
  //     key={meal.id}
  //     id={meal.id}
  //     title={meal.title}
  //     description={meal.description}
  //   />
  // ));
  // console.log(mealsList);

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
