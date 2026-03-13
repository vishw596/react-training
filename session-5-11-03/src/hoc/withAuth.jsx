import { Navigate } from "react-router-dom";

function withAuth(Component) {
    return function (props) {
        const isAuthenticated = localStorage.getItem("user") ? true : false;
        if (!isAuthenticated) {
            return <Navigate to={"/login"} replace/>;
        }
        return <Component {...props} />;
    };
}
export default withAuth