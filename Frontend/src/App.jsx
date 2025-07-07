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
    { path: "/admin-dashboard/projects", element: <AdminDashboard section="projects" /> },
    { path: "/admin-dashboard/projects/addproject/:id", element: <AdminDashboard section="addproject" /> },
    { path: "/admin-dashboard/TotalEmployee", element: <AdminDashboard section="TotalEmployee" /> },
    { path: "/admin-dashboard/Allclients", element: <AdminDashboard section="Allclients" /> },
    { path: "/admin-dashboard/Order", element: <AdminDashboard section="order" /> },

    // *** CRITICAL CHANGE FOR WORK ORDERS ***
    // This route will render AdminDashboard with section="workorder".
    // WorkOrderList will then handle its own nested routes (e.g., /new, /:id, /:id/edit).
    { path: "/admin-dashboard/WorkOrder/*", element: <AdminDashboard section="workorder" /> },

    // You should remove these specific WorkOrder sub-routes from App.jsx
    // as WorkOrderList will manage them internally:
    // { path: "/admin-dashboard/WorkOrder/new", element: <AdminDashboard section="workorder-form" /> },
    // { path: "/admin-dashboard/WorkOrder/:id", element: <AdminDashboard section="workorder-profile" /> },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;