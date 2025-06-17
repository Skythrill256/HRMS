// import { Children } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./Pages/Home.jsx";
import Login from "./Component/Authentication/Login.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/home",
      element:<Home/>
    },
    {
      path:"login",
      element:<Login/>
    }
  ]);
  return <RouterProvider  router={router}/>
}

export default App
