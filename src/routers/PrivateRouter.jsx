import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRouter = () => {
    console.log('PrivateRouter');

    const { status } = useAuth();

    if (status === 'no-authenticated') return <Navigate to="/login" replace />;

    return <Outlet />;
}

export default PrivateRouter