// App.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from "./Component/Authentication/Login.jsx";
import ForgetPass from "./Component/Authentication/ForgetPass.jsx";
import AdminDashboard from "./Dashboards/Admin-Dashboard/Dashboard.jsx"; // Ensure this path is correct


const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/login/forgetpass", element: <ForgetPass /> },

    // Admin Dashboard Base
    // Added a default 'initial' section for when just /admin-dashboard is hit
    { path: "/admin-dashboard", element: <AdminDashboard section="initial" /> },
    { path: "/admin-dashboard/projects/*", element: <AdminDashboard section="projects" /> },

    { path: "/admin-dashboard/TotalEmployee", element: <AdminDashboard section="TotalEmployee" /> },

    // clients routs

    {
        path: "/admin-dashboard/Allclients/*", element: <AdminDashboard section="Allclients" />

    },


    { path: "/admin-dashboard/Order", element: <AdminDashboard section="order" /> },

    // work order  routs
    { path: "/admin-dashboard/WorkOrder/*", element: <AdminDashboard section="workorder" /> },
    //HR
    { path: "/admin-dashboard/offerletter", element: <AdminDashboard section="offerletter" /> },
    { path: "/admin-dashboard/terminationletter", element: <AdminDashboard section="terminationletter" /> },
    { path: "/admin-dashboard/leave", element: <AdminDashboard section="leave" /> },

]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;