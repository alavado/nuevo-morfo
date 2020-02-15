import React, { useCallback } from 'react'
import query from '../../queries/Grupos'
import './Grupos.css'
import { useQuery } from '@apollo/react-hooks'
import MiLoader from '../Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus as iconoAgregar } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { mostrarFormularioNuevoUsuario } from '../../redux/actions'
import { compararPropiedadString } from '../../helpers/utiles'

const Grupos = () => {

  const { grupos } = useSelector(state => state.grupos)
  const dispatch = useDispatch()
  const { loading, error, data } = useQuery(query)

  const ordenarGrupos = useCallback(
    () => {
      const nuevos = data.usuarios
        .filter(({ id }) => nuevosUsuarios.includes(id))
        .sort(compararPropiedadString('nombre'))
        .map(u => ({ ...u, nuevo: true }))
      const antiguos = data.usuarios
        .filter(({ id }) => !nuevosUsuarios.includes(id))
        .sort(compararPropiedadString('nombre'))
      return [...nuevos, ...antiguos]
    },
    [nuevosUsuarios, data],
  )

  if (loading) {
    return <MiLoader />
  }

  return (
    <div className="contenedor-tabla-grande">
      <div className="encabezado-tabla">
        <div className="titulo">
          <h1>Usuarios</h1>
          <FontAwesomeIcon
            icon={iconoAgregar}
            size="sm"
            title="Agregar grupo"
          />
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
          {ordenarGrupos().map((u, i) => (
            <tr key={u.id}>
              <td>
                {u.nuevo && <span className="tag-usuario-nuevo">Nuevo</span>}
              </td>
              <td>{u.email}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Grupos
