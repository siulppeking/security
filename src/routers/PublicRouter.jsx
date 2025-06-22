import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PublicRouter = () => {
    console.log('PublicRouter');

    const { status } = useAuth();

    if (status === 'authenticated') return <Navigate to="/admin" replace />;

    return <Outlet />;
}

export default PublicRouter;
