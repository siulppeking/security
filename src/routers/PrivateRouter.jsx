import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../components/Loading";
// import NavBarPrivate from "../ui/NavBarPrivate";

const PrivateRouter = () => {
    console.log('PrivateRouter');
    const { cargando, status } = useAuth();
    const { pathname, search } = useLocation();

    const lastPath = pathname + search;
    localStorage.setItem('lastPath', lastPath);

    if (cargando) return <Loading />;
    if (status === 'no-authenticated') return <Navigate to="/login" replace />;

    return <>
        {/* <NavBarPrivate /> */}
        <Outlet />
    </>;
}

export default PrivateRouter