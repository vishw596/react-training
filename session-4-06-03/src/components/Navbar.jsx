import { Link, replace, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function Navbar() {
    const { isAuthenticated, handleLogout, loading, user } = useAuth();
    const navigate = useNavigate();
    return (
        <>
            {!loading && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems:"center", gap:"20px"}}>
                    {!isAuthenticated && <Link to={"/login"}>Login</Link>}
                    <Link to={"/home"}>Home</Link>
                    <Link to={"/about"}>About</Link>
                    {isAuthenticated && (
                        <>
                            <Link to={"/profile"}>Profile</Link>
                            <Link to={"/dashboard"}>Dashboard</Link>
                            {user?.role === "admin" && <Link to={"/admin"}>Admin</Link>}
                            <button
                                onClick={() => {
                                    handleLogout();
                                    navigate("/login", { replace: true});
                                }}>
                                Logout
                            </button>
                        </>
                    )}
                </div>
            )}
        </>
    );
}
