import React from 'react'
import { useAuth } from '../../contexts/AuthContext'

const AdminPage = () => {
  const { usuario } = useAuth();
  return (
    <div>
      <label htmlFor="">Admin Page</label>
      <h4>{usuario.nombre}</h4>
    </div>
  )
}

export default AdminPage