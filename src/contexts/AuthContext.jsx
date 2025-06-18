import { createContext, useContext, useEffect, useState } from "react";
import { privateApi } from "../apis/privateApi";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [status, setStatus] = useState('no-authenticated'); // 'authenticated', 'no-authenticated', 'checking'
    const [cargando, setCargando] = useState(false);
    const [usuario, setUsuario] = useState(null);

    const checkUser = async () => {
        const token = localStorage.getItem('access_token');
        if (!token) return setStatus('no-authenticated');

        try {
            setCargando(true);
            setStatus('checking');
            const response = await privateApi.get('/api/auth/info');
            setUsuario(response.data.data);
            setStatus('authenticated');
        } catch (error) {
            console.error('Error checkUser:', error);
            setStatus('no-authenticated');
        } finally {
            setCargando(false);
        }
    };

    const logout = () => {
        localStorage.clear();
        setUsuario(null);
        setStatus('no-authenticated');
    }

    useEffect(() => {
        checkUser();
    }, [])

    return <AuthContext.Provider value={{
        checkUser,
        cargando,
        status,
        usuario,
        logout
    }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);