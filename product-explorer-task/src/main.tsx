import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import CartProvider from "./context/CartProvider.tsx";
import FilterProvider from "./context/FilterProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <CartProvider>
            <FilterProvider>
                <App />
            </FilterProvider>
        </CartProvider>
    </StrictMode>,
);
