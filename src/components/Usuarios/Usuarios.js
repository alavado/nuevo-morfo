import React, { useState } from 'react'
import query from '../../queries/usuarios'
import './Usuarios.css'
import { useQuery } from '@apollo/react-hooks'
import MiLoader from '../Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch as iconoBuscar } from '@fortawesome/free-solid-svg-icons'
import { faTimes as iconoLimpiarBusqueda } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'

const Usuarios = () => {

  const [terminoBusqueda, setTerminoBusqueda] = useState('')
  const { loading, error, data } = useQuery(query)

  if (loading) {
    return <MiLoader />
  }

  return (
    <div className="contenedor-tabla-grande">
      <div className="encabezado-tabla">
        <h1>Usuarios</h1>
        <div className="busqueda">
          <FontAwesomeIcon
            className="icono-buscar"
            icon={iconoBuscar}
            size="sm"
          />
          <input
            type="text"
            value={terminoBusqueda}
            onChange={e => setTerminoBusqueda(e.target.value)}
          />
          {!_.isEmpty(terminoBusqueda) && <FontAwesomeIcon
            className="icono-limpiar-busqueda"
            icon={iconoLimpiarBusqueda}
            size="sm"
            onClick={e => setTerminoBusqueda('')}
          />}
        </div>
      </div>
      <table>
        <thead>
          <th>Nombre</th>
          <th>E-mail</th>
          <th>Grupos</th>
        </thead>
        <tbody>
          {data.usuarios.map(u => (
            <tr>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Usuarios
