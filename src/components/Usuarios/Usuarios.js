import React from 'react'
import query from '../../queries/usuarios'
import './Usuarios.css'
import { useQuery } from '@apollo/react-hooks'
import MiLoader from '../Loader'

const Usuarios = () => {

  const { loading, error, data } = useQuery(query)

  if (loading) {
    return <MiLoader />
  }

  return (
    <div className="contenedor-tabla-grande">
      <table>
        <thead>
          <th>Nombre</th>
          <th>E-mail</th>
        </thead>
        <tbody>
          {data.usuarios.map(u => (
            <tr>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Usuarios
