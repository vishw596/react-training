import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                element: <Home />,
                index: true,
            },
            {
                path: "home",
                element: <Home />,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "profile",
                        element: <Profile />,
                    },
                    {
                        path: "dashboard",
                        element: <Dashboard />,
                    },
                ],
            },
            {
                element: <RoleRoute allowedRoutes={["admin"]} />,
                children: [
                    {
                        path: "admin",
                        element: <Admin />,
                    },
                ],
                
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />,
    },
]);

// { path: "/about", Component: About },
//     { path: "/login", Component: Login },
//     {
//         path: "/admin",
//         Component: Admin,
//     },
//     { path: "/dashboard", Component: Dashboard },
//     {
//         path: "/profile",
//         Component: Profile,
//     },
//     {
//         path: "/unauthorized",
//         Component: Unauthorized,
//     },
