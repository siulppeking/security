import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom';

const AdminPage = () => {

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

export default AdminPage