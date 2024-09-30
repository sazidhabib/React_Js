import React, { useState } from "react";
import "./App.css";
import Expenses from "./Components/Expense/Expenses";
import NewExpense from "./Components/Expense/NewExpense/NewExpense";

const dataExpenses = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2022, 7, 14),
  },
  { id: "e2", title: "New TV", amount: 799.49, date: new Date(2023, 2, 12) },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2023, 2, 28),
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2023, 5, 12),
  },
];

function App() {
  const [expenses, setExpenses] = useState(dataExpenses);
  const expenseHandler = (expense) => {
    setExpenses((preExpenses) => {
      return [expense, ...preExpenses];
    });
  };

  return (
    <div>
      <NewExpense addExpense={expenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
}

export default App;
