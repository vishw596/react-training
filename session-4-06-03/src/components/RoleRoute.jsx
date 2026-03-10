import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function RoleRoute({ allowedRoutes }) {
    const { isAuthenticated, user,loading } = useAuth();
    const location = useLocation();
    if(loading){
        return <>
            <h1>Loading...</h1>
        </>
    }
    if (!isAuthenticated) {
        return <Navigate to={"/login"} state={location} replace />;
    }
    if (!allowedRoutes.includes(user?.role)) {
        return <Navigate to={"/unauthorized"}  replace />;
    }
    return <Outlet />;
}
