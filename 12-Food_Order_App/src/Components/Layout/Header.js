import React, { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";
import MealsImage from "../../Assets/meals.jpg";
import Classes from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={Classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton />
      </header>
      <div className={Classes["main-image"]}>
        <img src={MealsImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
