import { useAuth } from "./AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();
    if (loading) {
        return (
            <>
                <h1>Loading...</h1>
            </>
        );
    }
    if (!isAuthenticated) {
        return <Navigate to={"/login"} state={location} replace />;
    }

    return <Outlet />;
}
