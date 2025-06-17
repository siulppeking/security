import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../components/Loading";

const PublicRouter = () => {
    console.log('PublicRouter');
    const { cargando, status } = useAuth();

    if (cargando) return <Loading />;
    if (status === 'authenticated') return <Navigate to="/admin" replace />;

    {/* <NavbarPublic /> */ }
    return <Outlet />;

}

export default PublicRouter