// App.jsx (No changes)
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./Pages/Home.jsx";
import Login from "./Component/Authentication/Login.jsx";
<<<<<<< HEAD
import AdminDashboard from "./Dashboards/Admin-Dashboard/Dashboard.jsx"; 

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/home", element: <Home /> },
  { path: "/login", element: <Login /> },
  
  // Admin Dashboard Base
  { path: "/admin-dashboard", element: <AdminDashboard /> },

  // Projects Sections
  {
    path: "/admin-dashboard/projects",
    element: <AdminDashboard section="projects" />
  },
  {
    path: "/admin-dashboard/projects/completed",
    element: <AdminDashboard section="completed" />
  },
  {
    path: "/admin-dashboard/projects/pending",
    element: <AdminDashboard section="pending" />
  },{
    path:"/admin-dashboard/TotalEmployee",
    element:<AdminDashboard section= "TotalEmployee"/>
  }
]);

function App() {
  return <RouterProvider router={router} />;
=======
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
>>>>>>> 87c9c9590ea8f06656613deaf43b73d1c082418f
}

export default App;