import { createContext, useContext, useState } from "react";
import { privateApi } from "../apis/privateApi";


const PerfilContext = createContext();

export const PerfilProvider = ({ children }) => {

    const [perfiles, setPerfiles] = useState([]);
    const [cargando, setCargando] = useState(true);

    const listarPerfiles = async () => {
        try {
            const response = await privateApi.get('/api/perfil');
            setPerfiles(response.data.data)
        } catch (error) {
            console.log('Exception: ' + error.message);
        } finally {
            setCargando(false)
        }
    }



    return <PerfilContext.Provider value={{
        listarPerfiles,
        perfiles,
        cargando
    }}>
        {children}
    </PerfilContext.Provider>
}

export const usePerfil = () => useContext(PerfilContext);