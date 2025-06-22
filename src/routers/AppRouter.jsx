import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/public/HomePage'
import AboutPage from '../pages/public/AboutPage'
import LoginPage from '../pages/public/LoginPage'
import AdminPage from '../pages/private/AdminPage'
import PageNotFound from '../pages/public/PageNotFound'
import PublicRouter from './PublicRouter'
import PrivateRouter from './PrivateRouter'
import PerfilPage from '../pages/private/PerfilPage'
import EmpresaPage from '../pages/private/EmpresaPage'
import { useAuth } from '../contexts/AuthContext'
import Loading from '../components/Loading'
import { PerfilProvider } from '../contexts/PerfilContext'

const AppRouter = () => {

    const { status } = useAuth();

    if (status === 'checking') return <Loading />;

    return (
        <Routes>
            <Route element={<PublicRouter />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route element={<PrivateRouter />}>
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/perfil" element={<PerfilProvider><PerfilPage /></PerfilProvider>} />
                <Route path="/empresa" element={<EmpresaPage />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />

        </Routes>
    )
}

export default AppRouter