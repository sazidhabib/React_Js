import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:5000/api/auth/login";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log("Login: ", response);

      if (response.ok) {
        const responseData = await response.json();
        alert("Login successful");
        setUser({ email: "", password: "" });
        console.log(responseData);
      } else {
        alert("Login failed");
        console.log("error inside response ", "error");
      }
    } catch (error) {
      console.log("error");
    }
    // Add your login logic here
    console.log("Logging in with:", username, password);
    // Redirect to another page after login (e.g., dashboard)
    navigate("/dashboard"); // Replace with your desired route
  };

  return (
    <div className="container col-md-4  card p-4">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleLogin}>
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
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            value={user.password}
            onChange={handleInput}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
      <p className="text-center mt-3">
        Don't have an account?{" "}
        <button
          className="btn btn-link p-0"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </p>
    </div>
  );
}

export default Login;