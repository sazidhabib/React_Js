import React from "react";

import classes from "./Result.module.css";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// use like this:
//formatter.format(yourValue);

const Result = (props) => {
  return (
    <table className="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Total Savings</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {/* akhne yearData take show korate hobe tar jonno result perameter er
        maddome (data) akhne jeta name dibo same name er Apps.js file <Result/> e acces akta props banaite hobe.oy data props er maddome jei data ta pathabe ota ei child class e access paowa jabe  */}
        {props.data.map((yearData) => (
          <tr key={yearData.year}>
            <td>{yearData.year}</td>
            {/* yearData.year coz amra jehetu Apps.js file er yearlyData access nissi sekhane year, yearlyInterest, savingsEndOfYear, yearlyContribution er result ta Object akare store ase ota paower jonno amne korte hbe.*/}
            <td>{formatter.format(yearData.savingsEndOfYear)}</td>
            <td>{formatter.format(yearData.yearlyInterest)}</td>
            <td>
              {formatter.format(
                yearData.savingsEndOfYear -
                  props.initialInvestment -
                  yearData.yearlyContribution * yearData.year
              )}
            </td>
            <td>
              {formatter.format(
                props.initialInvestment +
                  yearData.yearlyContribution * yearData.year
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Result;
