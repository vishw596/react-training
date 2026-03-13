import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import LoginPage from "./pages/LoginPage.jsx";
const router = createBrowserRouter([
    { path: "/", element: <LoginPage/> },
    { path: "/login", element: <LoginPage/> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/search",element:<App/> },
]);
createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
