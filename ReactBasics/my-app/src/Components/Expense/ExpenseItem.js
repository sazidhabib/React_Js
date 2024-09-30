import React, { useState } from "react";
import Card from "../UI/Card";
import ExpenseDate from "./ExpenseDate";
import "./ExpenseItem.css";

const ExpenseItem = (props) => {
  // to change the value on click
  // const [title, setTitle] = useState(props.title);
  // const clickHandler = () => {
  //   setTitle("Update!");
  //   console.log(title);
  // };

  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={props.date} />
        <div className="expense-item__description">
          {/* need to same name as title in in App.js file  */}
          <h2>{props.title}</h2>
          <div className="expense-item__price">${props.amount}</div>
          {/* <button onClick={clickHandler}>Clik Here</button> */}
        </div>
      </Card>
    </li>
  );
};

export default ExpenseItem;
