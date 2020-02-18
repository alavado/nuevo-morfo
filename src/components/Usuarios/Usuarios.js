import React, { useState, useCallback } from 'react'
import query from '../../queries/usuarios'
import './Usuarios.css'
import { useQuery } from '@apollo/react-hooks'
import MiLoader from '../Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch as iconoBuscar, faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTimes as iconoLimpiarBusqueda } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus as iconoAgregar } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import FormularioNuevoUsuario from './FormularioNuevoUsuario'
import { useDispatch, useSelector } from 'react-redux'
import { mostrarFormularioNuevoUsuario } from '../../redux/actions'
import { compararPropiedadString, busqueda } from '../../helpers/utiles'

const Usuarios = () => {

  const [terminoBusqueda, setTerminoBusqueda] = useState('')
  const { mostrandoDialogoNuevoUsuario } = useSelector(state => state.usuarios)
  const { nuevosUsuarios } = useSelector(state => state.usuarios)
  const dispatch = useDispatch()
  const { loading, error, data } = useQuery(query)

  const ordenarUsuarios = useCallback(
    () => {
      const nuevos = data.usuarios
        .filter(({ id }) => nuevosUsuarios.includes(id))
        .sort(compararPropiedadString('nombre'))
        .map(u => ({ ...u, nuevo: true }))
      const antiguos = data.usuarios
        .filter(({ id }) => !nuevosUsuarios.includes(id))
        .sort(compararPropiedadString('nombre'))
      return [...nuevos, ...antiguos].filter(({ nombre }) => busqueda(terminoBusqueda, nombre) >= 0)
    },
    [nuevosUsuarios, data, terminoBusqueda],
  )

  const destacarBusqueda = palabra => {
    const indiceBusqueda = busqueda(terminoBusqueda, palabra)
    if (_.isEmpty(terminoBusqueda) || indiceBusqueda < 0) {
      return palabra
    }
    const antes = palabra.substring(0, indiceBusqueda)
    const coincidencia = palabra.substring(indiceBusqueda, indiceBusqueda + terminoBusqueda.length)
    const despues = palabra.substring(indiceBusqueda + terminoBusqueda.length)
    return <>{antes}<span className="busqueda-destacada">{coincidencia}</span>{despues}</>
  }

  if (loading) {
    return <MiLoader />
  }

  return (
    <>
      {mostrandoDialogoNuevoUsuario && <FormularioNuevoUsuario />}
      <div className="contenedor-tabla-grande">
        <div className="encabezado-tabla">
          <div className="titulo">
            <h1>Usuarios</h1>
            <FontAwesomeIcon
              icon={iconoAgregar}
              size="sm"
              title="Agregar usuario"
              onClick={() => dispatch(mostrarFormularioNuevoUsuario())}
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
            {ordenarUsuarios().map((u, i) => (
              <tr key={u.id}>
                <td>
                  {destacarBusqueda(u.nombre)}
                  {u.nuevo && <span className="tag-usuario-nuevo">Nuevo</span>}
                </td>
                <td>{u.email}</td>
                <td>
                  {u.grupos.map(grupo => (
                    <span
                      className="tag-usuario-grupo"
                      style={{ backgroundColor: grupo.color }}
                    >
                      {grupo.nombre}
                    </span>
                  ))}
                  <button className="boton-agregar-grupo">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Usuarios
