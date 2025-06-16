import { createContext, useContext, useEffect, useState } from "react";
import { privateApi } from "../apis/privateApi";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [contador, setContador] = useState(0);
    const [cargando, setCargando] = useState(false);
    // crea un estado para status
    const [status, setStatus] = useState('no-authenticated'); // 'no-authenticated', 'checking', 'authenticated'

    const [usuario, setUsuario] = useState({
        id: '',
        name: '',
        email: '',
        role: ''
    });


    const checkUser = async () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            return;
        }
        try {
            setCargando(true);
            setStatus('checking');
            const response = await privateApi.get('/api/auth/info');
            if (response.status === 200) {
                setUsuario(response.data.data);
                setStatus('authenticated');
            } else {
                console.error('Error al verificar el usuario:', response.statusText);
            }

        } catch (error) {
            setStatus('no-authenticated');
            console.error('Error en la verificación del usuario:', error);
        } finally {
            setCargando(false);
        }
    }

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