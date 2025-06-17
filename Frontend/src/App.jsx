// import { Children } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./Pages/Home.jsx";
import Login from "./Component/Authentication/Login.jsx";
import ForgetPass from "./Component/Authentication/ForgetPass.jsx"
import AdminDashboard from "./Dashboards/Admin-Dashboard/Dashboard.jsx"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/home",
      element: <Home />
    },
    {
      path: "login",
      element: <Login />
    },
    {
      path:"forgetpassword",
      element:<ForgetPass/>
    },
    {
      path:"admin-dashboard",
      element:<AdminDashboard/>
      
    }
  ]);
  return <RouterProvider router={router} />
}
export default App
