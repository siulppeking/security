import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
// import NavBarPrivate from "../ui/NavBarPrivate";

const PrivateRouter = () => {
    console.log('PrivateRouter');
    const { pathname, search } = useLocation();
    const lastPath = pathname + search;
    localStorage.setItem('lastPath', lastPath);

    const { cargando, status } = useAuth();


    if (!cargando && status === 'no-authenticated') return <Navigate to="/login" replace />;

    return <>
        {/* <NavBarPrivate /> */}
        <Outlet />
    </>;
}

export default PrivateRouter