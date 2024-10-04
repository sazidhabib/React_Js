import React, { useState } from "react";
import Header from "./Component/Header";
import From from "./Component/Form";
import Result from "./Component/Result";

function App() {
  //for store the data in initial stage
  const [userInput, setUserInput] = useState(null);
  const calculateHandler = (userInput) => {
    // Should be triggered when form is submitted
    setUserInput(userInput);
  };

  const yearlyData = []; // per-year results

  if (userInput) {
    let currentSavings = +userInput["current-savings"]; // feel free to change the shape of this input object!
    const yearlyContribution = +userInput["yearly-contribution"]; // as mentioned: feel free to change the shape...
    const expectedReturn = +userInput["expected-return"] / 100;
    const duration = +userInput["duration"];

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        // feel free to change the shape of the data pushed to the array!
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }

    // do something with yearlyData ...
  }

  return (
    <div>
      <Header />
      {/* Form table er userInput neaor jonno jei function create kora hoyse otai akhne call diye calculation jei function korbe take assing kore dite hobe */}
      <From calculate={calculateHandler} />

      {!userInput && (
        <p style={{ textAlign: "center" }}>No investment calculated yet.</p>
      )}
      {/* Result table e initialInvestment er data ta nai data user input e ase userInput["current-savings"] er moddhe tar jonno initialInvestment props create kore userInputer data assine kore disi */}
      {userInput && (
        <Result
          data={yearlyData}
          initialInvestment={userInput["current-savings"]}
        />
      )}
    </div>
  );
}

export default App;
