import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });
  
  const navigate = useNavigate();

//handling the input values
const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;
    
    setUser({
      ...user,
      [name]: value,
    });
};


  const handleRegister = (e) => {
    e.preventDefault();
    console.log(user);
    // Add your registration logic here
    console.log("Registering with:", username, email, phone, password);
    // Redirect to login page after registration
    navigate("/login");
  };

  return (
   
    <div className="container col-md-4 card p-4">
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="form-control"
            id="username"
            value={user.username}
            onChange={handleInput}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            value={user.email}
            onChange={handleInput}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="number"
            name="phone"
            className="form-control"
            id="phone"
            value={user.phone}
            onChange={handleInput}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            value={user.password}
            onChange={handleInput}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
      <p className="text-center mt-3">
        Already have an account?{" "}
        <button
          className="btn btn-link p-0"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </p>
    </div>
    
  );
}

export default Register;