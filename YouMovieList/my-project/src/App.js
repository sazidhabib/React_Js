import React from "react";
import { Fragment } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Watchlist from "./components/Watchlist";
import Watched from "./components/Watched";
import Add from "./components/Add";
import "./lib/font-awesome/css/all.min.css";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header /> <Watchlist />
        </>
      ),
    },
    {
      path: "/add",
      element: (
        <>
          <Header /> <Add />
        </>
      ),
    },
    {
      path: "/watched",
      element: (
        <>
          <Header /> <Watched />
        </>
      ),
    },
  ]);

  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  );
}

export default App;
