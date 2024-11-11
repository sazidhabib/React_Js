import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setLogin } = useContext(GlobalContext);

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://fakestoreapi.com/users");
      const users = await response.json();
      console.log("Saziduser", users);
      const user = users.find(
        (user: any) => user.username === username && user.password === password
      );

      if (user) {
        console.log("which user log in: ", user);
        setLogin(true, {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.name.firstname,
          lastName: user.name.lastname,
          address: user.address.city,
        });
        navigate("/"); // Redirect to homepage
      } else {
        alert("Invalid credentials!");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <section className="flex flex-col self-stretch my-auto min-w-[240px]">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col max-w-full w-[370px]"
      >
        <h2 className="text-4xl font-medium tracking-widest leading-none">
          Log in to SnapShop
        </h2>
        <div className="flex flex-col mt-12 w-full">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="mt-2 w-full border-b border-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col mt-10 w-full">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="mt-2 w-full border-b border-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="mt-10 text-neutral-50 bg-red-500 px-12 py-4 rounded"
        >
          Log In
        </button>
      </form>
      <p className="mt-10">
        Don't have an account?{" "}
        <Link to="/signup" className="text-red-500">
          Sign up
        </Link>
      </p>
    </section>
  );
};

export default LoginForm;
