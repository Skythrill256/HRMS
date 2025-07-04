import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from "./Component/Authentication/Login.jsx";
import ForgetPass from "./Component/Authentication/ForgetPass.jsx";
import AdminDashboard from "./Dashboards/Admin-Dashboard/Dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/login",
    element: <Login />

  },
  {
    path: "/login/forgetpass",
    element: <ForgetPass />
  },
  // Admin Dashboard Base
  {
    path: "/admin-dashboard",
    element: <AdminDashboard />
  },
  // Projects Sections
  {
    path: "/admin-dashboard/projects",
    element: <AdminDashboard section="projects" />
  },
  // {
  //   path: "/admin-dashboard/projects/completed",
  //   element: <AdminDashboard section="completed" />
  // },
  // {
  //   path: "/admin-dashboard/projects/pending",
  //   element: <AdminDashboard section="pending" />
  // }, 

  {
    path: '/admin-dashboard/projects/addproject/:id',
    element: <AdminDashboard section='addproject' />
  },
  {
    path: "/admin-dashboard/TotalEmployee",
    element: <AdminDashboard section="TotalEmployee" />
  },
  // //  {path:`/admin-dashboard/employee-profile/${employee.id}`,
  // {path:`/admin-dashboard/employee-profile/EMP001`,

  //   element:<AdminDashboard section= "EmployeeProfile"/>
  // },
  {
    path: "/admin-dashboard/Allclients",
    element: <AdminDashboard section="Allclients" />
  },
  {
    path: "/admin-dashboard/Order",
    element: <AdminDashboard section="order" />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;