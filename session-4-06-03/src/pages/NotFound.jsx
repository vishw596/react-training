import { Link } from "react-router-dom";
import Home from "./Home";
import { useAuth } from "../components/AuthProvider";

export default function NotFound() {
    return (
        <>
            <h1>404 Page Not Found</h1>
            <Link to={"/"}>Home</Link>
        </>
    );
}
