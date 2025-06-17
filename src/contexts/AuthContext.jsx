import { createContext, useContext, useEffect, useState } from "react";
import { privateApi } from "../apis/privateApi";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [status, setStatus] = useState('no-authenticated'); // 'authenticated', 'no-authenticated', 'checking'
    const [cargando, setCargando] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const [contador, setContador] = useState(0);

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

    const incrementar = () => {
        setContador(contador => contador + 1);
    }

    const decrementar = () => {
        setContador(contador => contador - 1);
    }

    const reset = () => {
        setContador(0);
    }

    useEffect(() => {
        checkUser();
    }, [])


    return <AuthContext.Provider value={{
        incrementar,
        decrementar,
        reset,
        contador,
        checkUser,
        cargando,
        status
    }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);