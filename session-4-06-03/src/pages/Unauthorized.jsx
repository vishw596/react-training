import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

export default function Unauthorized() {
    const { handleLogout } = useAuth();
    const navigate = useNavigate();
    return (
        <>
            <h1>Unauthorized</h1>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                <Link to={"/home"}>Home</Link>
                <button
                    onClick={() => {
                        handleLogout();
                        navigate("/login", { replace: true});
                    }}>
                    Login with different account
                </button>
            </div>
        </>
    );
}
