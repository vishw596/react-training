import { useNavigate } from "react-router-dom";
import withAuth from "../hoc/withAuth";

function Dashboard() {
    const navigate = useNavigate();
    return (
        <>
            <h1>Dashboard Page</h1>
            <button
                onClick={() => {
                    localStorage.removeItem("user");
                    navigate("/login",{replace:true})
                }}>
                Logout
            </button>
        </>
    );
}

const AuthDashboard = withAuth(Dashboard);

export default AuthDashboard;
