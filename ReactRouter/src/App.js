import React from 'react'

import { createBrowserRouter, RouterProvider, 
  //createRoutesFromElements, 
  //Route 
  } from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';

// const routeDefinitions = createRoutesFromElements(
//   <Route>
//     <Route path='/' element={<Home/>}/>
//     <Route path='/products' element={<Products/>}/>
//   </Route>
//)
//const router = createBrowserRouter(routeDefinitions);

const router = createBrowserRouter([
  {path:'/',element:<Home/>},
  {path: "/products", element:<Products/>}
])



const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App