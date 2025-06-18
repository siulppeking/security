import React from 'react'
import { useAuth } from '../../contexts/AuthContext'

const AdminPage = () => {
  const { usuario, logout } = useAuth();
  return (
    <div>
      <label htmlFor="">Admin Page</label>
      <h4>{usuario.nombre}</h4>
      <button onClick={logout}>Salir</button>
    </div>
  )
}

export default AdminPage