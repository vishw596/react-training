import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes.jsx";
import AuthProvider from "./components/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <RouterProvider router={routes} />
    </AuthProvider>,
);
