import { Navigate, Outlet, useLocation } from "react-router-dom";
// import NavBarPrivate from "../ui/NavBarPrivate";

const PrivateRouter = () => {
    console.log('PrivateRouter');
    const { pathname, search } = useLocation();
    const lastPath = pathname + search;
    localStorage.setItem('lastPath', lastPath);

    //const { cargando } = useSelector(state => state.ui);
    //const { status } = useSelector(state => state.auth);
    const cargando = false;
    const status = 'no-authenticated';

    if (status === 'no-authenticated' && !cargando) return <Navigate to="/login" replace />;

    return <>
        {/* <NavBarPrivate /> */}
        <Outlet />
    </>;
}

export default PrivateRouter