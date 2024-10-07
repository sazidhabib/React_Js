import react, { useState } from "react";

const InputForm = (props) => {
  // State to hold the values of both inputs
  const [UserName, setUserName] = useState("");
  const [UserAge, setUserAge] = useState("");

  const handelUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handelUserAgeChange = (event) => {
    setUserAge(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (UserName.trim().length === 0 || UserAge.trim().length === 0) {
      return;
    }

    if (UserAge < 1) {
      return;
    }
    props.onSubmit({ UserName, UserAge });

    setUserName("");
    setUserAge("");
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          value={UserName}
          onChange={handelUserNameChange}
        />
      </div>
      <div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">
          Age(years)
        </label>
        <input
          type="number"
          className="form-control"
          value={UserAge}
          onChange={handelUserAgeChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default InputForm;
