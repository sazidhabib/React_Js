import React from "react";

import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {
  const expenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    console.log(expenseData);
    props.addExpense(expenseData);
  };

  return (
    <div className="new-expense">
      <ExpenseForm saveExpenseData={expenseDataHandler} />
    </div>
  );
};

export default NewExpense;
