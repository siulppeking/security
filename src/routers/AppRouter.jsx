import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/public/HomePage'
import AboutPage from '../pages/public/AboutPage'
import LoginPage from '../pages/public/LoginPage'
import AdminPage from '../pages/private/AdminPage'
import PageNotFound from '../pages/public/PageNotFound'
import Loading from '../components/Loading'
import PublicRouter from './PublicRouter'
import PrivateRouter from './PrivateRouter'
import PerfilPage from '../pages/private/PerfilPage'
import EmpresaPage from '../pages/private/EmpresaPage'
const AppRouter = () => {

    //const { cargando } = useCheckUser();

    if (false) return <Loading />

    return (
        <Routes>
            <Route element={<PublicRouter />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route element={<PrivateRouter />}>
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/perfil" element={<PerfilPage />} />
                <Route path="/empresa" element={<EmpresaPage />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />

        </Routes>
    )
}

export default AppRouter