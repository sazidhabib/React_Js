import React, { useState } from "react";
import "./Form.css";

// const From = () => {
//   return (
//     <form className="form">
//       <div className="input-group">
//         <p>
//           <label htmlFor="current-savings">Current Savings ($)</label>
//           <input type="number" id="current-savings" />
//         </p>
//         <p>
//           <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
//           <input type="number" id="yearly-contribution" />
//         </p>
//       </div>
//       <div className="input-group">
//         <p>
//           <label htmlFor="expected-return">
//             Expected Interest (%, per year)
//           </label>
//           <input type="number" id="expected-return" />
//         </p>
//         <p>
//           <label htmlFor="duration">Investment Duration (years)</label>
//           <input type="number" id="duration" />
//         </p>
//       </div>
//       <p className="actions">
//         <button type="reset" className="buttonAlt">
//           Reset
//         </button>
//         <button type="submit" className="button">
//           Calculate
//         </button>
//       </p>
//     </form>
//   );
// };

const Form = () => {
  const [currentSavings, setCurrentSavings] = useState(0);
  const [yearlySavings, setYearlySavings] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [duration, setDuration] = useState(0);
  const [results, setResults] = useState([]);

  // Function to calculate the investment for each year
  const calculateInvestment = () => {
    let savings = parseFloat(currentSavings);
    let totalInvested = parseFloat(currentSavings);
    let totalInterest = 0;
    const yearlyInterestRate = parseFloat(interestRate) / 100;

    const resultData = [];

    for (let year = 1; year <= duration; year++) {
      // Add yearly savings to total savings and invested capital
      savings += yearlySavings;
      totalInvested += yearlySavings;

      // Calculate interest for the current year
      const interestGained = savings * yearlyInterestRate;
      totalInterest += interestGained;

      // Update total savings at the end of the year
      savings += interestGained;

      // Push the data for this year into resultData
      resultData.push({
        year,
        totalSavingsEndOfYear: savings,
        interestGainInYear: interestGained,
        totalInterestGained: totalInterest,
        totalInvestedCapital: totalInvested,
      });
    }

    // Update the result state to render the output
    setResults(resultData);
  };

  return (
    <div>
      <h1>Investment Calculator</h1>
      <div>
        <label>Current Savings: </label>
        <input
          type="number"
          value={currentSavings}
          onChange={(e) => setCurrentSavings(e.target.value)}
        />
      </div>
      <div>
        <label>Yearly Savings: </label>
        <input
          type="number"
          value={yearlySavings}
          onChange={(e) => setYearlySavings(e.target.value)}
        />
      </div>
      <div>
        <label>Interest Rate (% per year): </label>
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
      </div>
      <div>
        <label>Investment Duration (years): </label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
      <button onClick={calculateInvestment}>Calculate</button>

      {results.length > 0 && (
        <div>
          <h2>Investment Results</h2>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Total Savings End of Year</th>
                <th>Interest Gain in Year</th>
                <th>Total Interest Gained</th>
                <th>Total Invested Capital</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.year}>
                  <td>{result.year}</td>
                  <td>{result.totalSavingsEndOfYear}</td>
                  <td>{result.interestGainInYear}</td>
                  <td>{result.totalInterestGained}</td>
                  <td>{result.totalInvestedCapital}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Form;
