import React, { useEffect } from 'react'
import { usePerfil } from '../../contexts/PerfilContext'
import Loading from '../../components/Loading';

const PerfilPage = () => {

  const { listarPerfiles, perfiles, cargando } = usePerfil();

  useEffect(() => {

    listarPerfiles();

  }, [])

  if (cargando) return <Loading />

  return (
    <div>
      <table border={1}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Fecha de Registro</th>
          </tr>
        </thead>
        <tbody>
          {
            perfiles.map((perfil) => {
              let estado = perfil.estado ? 'Activo' : 'Inactivo';
              return (
                <tr key={perfil._id}>
                  <td>{perfil._id}</td>
                  <td>{perfil.nombre}</td>
                  <td>{estado}</td>
                  <td>{perfil.fechaRegistro}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default PerfilPage