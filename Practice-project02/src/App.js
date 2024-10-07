import React, { useState } from "react";
import InputForm from "./component/InputForm";
import ResultTable from "./component/ResultTable";

function App() {
  // State to store all submitted data
  const [userInput, setUserInput] = useState(null);
  const [submittedData, setSubmittedData] = useState([]);

  //Handele new data submission
  const handleFormSubmit = (newSubmit) => {
    setUserInput(newSubmit);
    if (userInput) {
      setSubmittedData([...submittedData, newSubmit]);
    }
  };

  return (
    <div className="container ">
      <InputForm onSubmit={handleFormSubmit} />
      <ResultTable submittedData={submittedData} />
    </div>
  );
}

export default App;
