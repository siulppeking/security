import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';

const HomePage = () => {
  const { usuario, logout } = useAuth();

  return (
    <div>
      <label htmlFor="">Admin Page</label>
      <h4>{usuario.nombre}</h4>
      <button onClick={logout}>Salir</button>

      <br />

      <Link to={'/perfil'}>Ir al Perfil</Link>
    </div>
  )
}

export default HomePage