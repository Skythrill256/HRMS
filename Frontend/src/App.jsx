// App.jsx (No changes)
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./Pages/Home.jsx";
import Login from "./Component/Authentication/Login.jsx";
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
}

export default App;