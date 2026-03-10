import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

async function delay(ms) {
    return new Promise((res) => {
        setTimeout(res, ms);
    });
}
export default function AuthProvider({ children }) {
    const [user, setUser] = useState(localStorage.getItem("user") ?? null);
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem("user") ? true : false,
    );
    async function handleLogin(username, password, role) {
        setLoading(true);
        await delay(2000);
        setUser({ username, role });
        setLoading(false);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify({ username, role }));
    }
    function handleLogout() {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user");
    }
    return (
        <>
            <AuthContext.Provider
                value={{ user, loading, isAuthenticated, handleLogin, handleLogout }}>
                {children}
            </AuthContext.Provider>
        </>
    );
}

export function useAuth() {
    const { user, loading, isAuthenticated, handleLogin, handleLogout } =
        useContext(AuthContext);

    return { user, loading, isAuthenticated, handleLogin, handleLogout };
}

// async function handleLogin(e) {
//         try {
//             e.preventDefault();
//             const response = await fetch("https://dummyjson.com/auth/login", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     username: "emilys",
//                     password: "emilyspass",
//                     expiresInMins: 30, // optional, defaults to 60
//                 }),
//             });
//             const data = await response.json();
//             localStorage.setItem("accesstoken", data.accessToken);
//             localStorage.setItem("refreshtoken", data.refreshToken);
//             navigate("/dashboard",{replace:true})
//         } catch (error) {
//             console.log(error);

//         }
//     }
