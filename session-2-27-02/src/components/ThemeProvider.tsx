// 4. **useContext**
    
//     In the sandbox, add a context (e.g. `ThemeContext` or `UserContext`), wrap part of the app in a Provider, and build a child component that reads the value with `useContext` and displays it (e.g. theme name or user name).


import { createContext, useState, type ReactNode, type SetStateAction } from "react";

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
type ThemeContextType = {
   theme: "light" | "dark",
   setTheme:React.Dispatch<SetStateAction<"light"|"dark">>
}
export default function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    return (
        <>
            <ThemeContext.Provider value={{theme,setTheme}}>{children}</ThemeContext.Provider>
        </>
    );
}
