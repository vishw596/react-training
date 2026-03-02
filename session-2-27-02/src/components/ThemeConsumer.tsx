import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export default function ThemeConsumer() {
    const { theme, setTheme } = useContext(ThemeContext)!;
    return (
        <>
            <p
                style={
                    theme === "dark"
                        ? { backgroundColor: "black", color: "white" }
                        : { backgroundColor: "white", color: "black" }
                }>
                value of theme context is: {theme}
            </p>
            <button
                onClick={() => {
                    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
                }}>
                Change Theme
            </button>
        </>
    );
}
