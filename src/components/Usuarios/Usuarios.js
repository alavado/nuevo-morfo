import React, { useState } from 'react'
import query from '../../queries/usuarios'
import './Usuarios.css'
import { useQuery } from '@apollo/react-hooks'
import MiLoader from '../Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch as iconoBuscar } from '@fortawesome/free-solid-svg-icons'
import { faTimes as iconoLimpiarBusqueda } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus as iconoAgregar } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import FormularioNuevoUsuario from './FormularioNuevoUsuario'

const Usuarios = () => {

  const [terminoBusqueda, setTerminoBusqueda] = useState('')
  const [mostrandoDialogo, setMostrandoDialogo] = useState(false)
  const { loading, error, data } = useQuery(query)

  const registrarNuevoUsuario = e => {
    e.preventDefault()
  }

  if (loading) {
    return <MiLoader />
  }

  return (
    <>
      {mostrandoDialogo &&
        <FormularioNuevoUsuario />
      }
      <div className="contenedor-tabla-grande">
        <div className="encabezado-tabla">
          <div className="titulo">
            <h1>Usuarios</h1>
            <FontAwesomeIcon
              icon={iconoAgregar}
              size="sm"
              title="Agregar usuario"
              onClick={() => setMostrandoDialogo(true)}
            />
          </div>
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
              title="Limpiar búsqueda"
              onClick={e => setTerminoBusqueda('')}
            />}
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>E-mail</th>
              <th>Grupos</th>
            </tr>
          </thead>
          <tbody>
            {data.usuarios.map(u => (
              <tr key={u.id}>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Usuarios
