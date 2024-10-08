import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const [username, setUsername] = useState("");
  const [userage, setUserage] = useState("");
  const [error, setError] = useState();

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };
  const userageChangeHandler = (event) => {
    setUserage(event.target.value);
  };
  const addUserHandler = (event) => {
    event.preventDefault();

    ///ei check ta deoar karon j ei duta jothi field jothi faka hoy then if conditioner poer code exicute hobe na.
    if (username.trim().length === 0 || userage.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age(non-empty value).",
      });
      return;
    }
    // this is for savely declear userage as a number thats why the put here(+) sign. coz we get the usger age as a string.
    if (+userage < 1) {
      setError({
        title: "Invalid age",
        message: "please enter a valid age(> 0).",
      });
      return;
    }
    props.onUsreSubmit(username, userage);
    setUsername("");
    setUserage("");
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onErrorOccurred={errorHandler}
        />
      )}
      <Card cssClass={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">User Name</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={usernameChangeHandler}
          />
          <label htmlFor="username">Age(years)</label>
          <input
            id="username"
            type="number"
            value={userage}
            onChange={userageChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
