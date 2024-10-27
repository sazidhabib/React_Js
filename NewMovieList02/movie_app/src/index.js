import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter
} from 'react-router-dom'

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import WatchLater from './components/WatchLater';
import Watched from './components/Watched';
import MovieDetail from './components/MoiveDetail';


const router = createBrowserRouter([
  {
      path: '/',
      element: <App />,
 
  },
  {
    path: '/watch-later',
    element: <WatchLater />,
},
{
    path: '/watched',
    element: <Watched />,
},
{
    path: '/details/:id',
    element: <MovieDetail />,
},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}>
        <App />
    </RouterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
