import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

export default function Login() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const { handleLogin, isAuthenticated } = useAuth();
    const { state ,pathname} = useLocation();
    const navigate = useNavigate();
    const from = state?.pathname ?? "/dashboard";
    if (isAuthenticated) {
        return <Navigate to={from} replace={true} />;
    }

    return (
        <>
            <h1>Login Page</h1>
            <form
                onSubmit={async(e) => {
                    e.preventDefault();
                    console.log(state,pathname);
                    
                    if (username === "" || password === "" || role === "") {
                        alert("Please enter all the fields");
                        return;
                    }
                    handleLogin(username, password, role);
                    navigate(from, { replace: true });      
           }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        justifyItems: "center",
                    }}>
                    <div style={{ display: "flex", gap: "5px" }}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="username"
                            value={username}
                            onChange={(e) => {
                                setUserName(e.target.value);
                            }}
                        />
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <label htmlFor="passowrd">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            placeholder="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <label htmlFor="role">Role</label>
                        <select
                            name="role"
                            id="role"
                            onChange={(e) => {
                                setRole(e.target.value);
                            }}
                            value={role}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <span>
                        <button type="submit">Login</button>
                    </span>
                </div>
            </form>
        </>
    );
}
