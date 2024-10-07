import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";

const AddUser = (props) => {
  const [username, setUsername] = useState("");
  const [userage, setUserage] = useState("");

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
      return;
    }
    // this is for savely declear userage as a number thats why the put here(+) sign. coz we get the usger age as a string.
    if (+userage < 1) {
      return;
    }
    console.log(username, userage);
    setUsername("");
    setUserage("");
  };

  return (
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
  );
};

export default AddUser;
