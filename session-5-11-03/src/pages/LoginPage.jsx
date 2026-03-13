import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    function handleLogin() {
        if (username === "" || password === "") {
            alert("Please enter all fields");
        }
        localStorage.setItem("user",username);
        navigate("/dashboard",{replace:true})
    }
    const isAuthenticated = localStorage.getItem("user") ? true : false;
    if(isAuthenticated){
        <Navigate to={"/dashboard"}/>
    }
    return (
        <>
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
            <button onClick={handleLogin}>Login</button>
        </>
    );
}
