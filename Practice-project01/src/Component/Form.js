import React, { useState } from "react";
import classes from "./Form.module.css";

//jokhon child component teke parent component value pass korte hoy tokhon "Lifting the State Up" ata korte hobe. akhne form component er value gula result table e neoar jonno ata use korte hobe.

// by default akta input value set kore rakhsi
const intialUserInput = {
  "current-savings": 10000,
  "yearly-contribution": 1200,
  "expected-return": 7,
  duration: 5,
};

const Form = (props) => {
  //for storing the input value use here useState hook
  // for store the inpute value i use here uniqe key of input id

  const [userInput, setUserInput] = useState(intialUserInput);

  //For when form is submited that time this function is called.
  const submitHandeler = (event) => {
    event.preventDefault();
    console.log("Submit");

    //akhne Form functioner perameter call kore akta new function create kore userinput ta pataisi jate er function parent component e call diye use korte pare.
    props.calculate(userInput);
    //..
  };

  //For when Reset button is clicked that time this function is called.
  const resetHandler = () => {
    //jokhon reset er click korbe tokhon jate by default valu ta chole ase oy jonno kora ata
    setUserInput(intialUserInput);
    console.log("Reset");
  };

  // This function is need to save the or get the from input value
  //For doing this we need to call this function and pass the perameter as it's ID and it's VALUE
  const inputChangeHandeler = (input, value) => {
    //inputChageHandeler function e default value or save kora value set korar jonno setUserInput call kore er perameter k sprade kora hoyse r input perameter e value gula assign kore dise. akhne prevInput er value r [input] er value same.
    setUserInput((prevInput) => {
      return {
        ...prevInput,
        [input]: +value,
      };
    });
    console.log(input, value);
  };

  return (
    <form onSubmit={submitHandeler} className={classes.form}>
      <div className={classes["input-group"]}>
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>

          {/* //akhn value te useState hook er value k input teke get korar jonno valu te userInput call diye input er id ta assiine kore dite hobe tahole value ta useState e jabe  */}
          <input
            onChange={(event) =>
              inputChangeHandeler("current-savings", event.target.value)
            }
            value={userInput["current-savings"]}
            type="number"
            id="current-savings"
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input
            onChange={(event) =>
              inputChangeHandeler("yearly-contribution", event.target.value)
            }
            value={userInput["yearly-contribution"]}
            type="number"
            id="yearly-contribution"
          />
        </p>
      </div>
      <div className={classes["input-group"]}>
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input
            onChange={(event) =>
              inputChangeHandeler("expected-return", event.target.value)
            }
            value={userInput["expected-return"]}
            type="number"
            id="expected-return"
          />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            onChange={(event) =>
              inputChangeHandeler("duration", event.target.value)
            }
            value={userInput["duration"]}
            type="number"
            id="duration"
          />
        </p>
      </div>
      <p className={classes.actions}>
        <button
          onClick={resetHandler}
          type="reset"
          className={classes.buttonAlt}
        >
          Reset
        </button>
        <button type="submit" className={classes.button}>
          Calculate
        </button>
      </p>
    </form>
  );
};

export default Form;
// const Form = () => {
//   const [currentSavings, setCurrentSavings] = useState(0);
//   const [yearlySavings, setYearlySavings] = useState(0);
//   const [interestRate, setInterestRate] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [results, setResults] = useState([]);

//   // Function to calculate the investment for each year
//   const calculateInvestment = () => {
//     let savings = parseFloat(currentSavings);
//     let totalInvested = parseFloat(currentSavings);
//     let totalInterest = 0;
//     const yearlyInterestRate = parseFloat(interestRate) / 100;

//     const resultData = [];

//     for (let year = 1; year <= duration; year++) {
//       // Add yearly savings to total savings and invested capital
//       savings += yearlySavings;
//       totalInvested += yearlySavings;

//       // Calculate interest for the current year
//       const interestGained = savings * yearlyInterestRate;
//       totalInterest += interestGained;

//       // Update total savings at the end of the year
//       savings += interestGained;

//       // Push the data for this year into resultData
//       resultData.push({
//         year,
//         totalSavingsEndOfYear: savings,
//         interestGainInYear: interestGained,
//         totalInterestGained: totalInterest,
//         totalInvestedCapital: totalInvested,
//       });
//     }

//     // Update the result state to render the output
//     setResults(resultData);
//   };

//   return (
//     <div>
//       <h1>Investment Calculator</h1>
//       <div>
//         <label>Current Savings: </label>
//         <input
//           type="number"
//           value={currentSavings}
//           onChange={(e) => setCurrentSavings(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Yearly Savings: </label>
//         <input
//           type="number"
//           value={yearlySavings}
//           onChange={(e) => setYearlySavings(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Interest Rate (% per year): </label>
//         <input
//           type="number"
//           value={interestRate}
//           onChange={(e) => setInterestRate(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Investment Duration (years): </label>
//         <input
//           type="number"
//           value={duration}
//           onChange={(e) => setDuration(e.target.value)}
//         />
//       </div>
//       <button onClick={calculateInvestment}>Calculate</button>

//       {results.length > 0 && (
//         <div>
//           <h2>Investment Results</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>Year</th>
//                 <th>Total Savings End of Year</th>
//                 <th>Interest Gain in Year</th>
//                 <th>Total Interest Gained</th>
//                 <th>Total Invested Capital</th>
//               </tr>
//             </thead>
//             <tbody>
//               {results.map((result) => (
//                 <tr key={result.year}>
//                   <td>{result.year}</td>
//                   <td>{result.totalSavingsEndOfYear}</td>
//                   <td>{result.interestGainInYear}</td>
//                   <td>{result.totalInterestGained}</td>
//                   <td>{result.totalInvestedCapital}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };
