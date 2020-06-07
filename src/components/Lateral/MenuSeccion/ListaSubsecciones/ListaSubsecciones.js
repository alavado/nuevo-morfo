import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt as iconoEliminar } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom'
import eliminarSubseccionMutation from '../../../../mutations/eliminarSubseccion'
import { compararPropiedadString } from '../../../../helpers/utiles'
import { fijarSubseccion } from '../../../../redux/actions'
import query from '../../../../queries/seccion'
import _ from 'lodash'
import './ListaSubsecciones.css'
import { esAdmin } from '../../../../helpers/auth'

const ListaSubsecciones = ({ data }) => {

  const [eliminarMutate] = useMutation(eliminarSubseccionMutation)
  const { usuario } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const { id } = useParams()

  const eliminar = idSubseccion => {
    eliminarMutate({
      variables: { id: idSubseccion },
      refetchQueries: [{ query, variables: { id } }]
    })
  }

  return (
    <ul className="lista-items">
      {data.seccion.subsecciones
        .sort(compararPropiedadString('nombre'))
        .map((subseccion, i) => (
          <li
            key={subseccion.id}
            style={{ animationDelay: `${i * .05}s` }}
          >
            <Link
              to={`/subseccion/${subseccion.id}`} key={subseccion.id}
              onClick={e => dispatch(fijarSubseccion(subseccion))}
            >
              {subseccion.nombre}
            </Link>
            {usuario && esAdmin(usuario) && <div className="acciones-subseccion">
              {_.isEmpty(subseccion.contenidos.filter(c => !c.deleted)) &&
                <button
                  className="boton-eliminar-subseccion"
                  onClick={() => eliminar(subseccion.id)}
                  title={`Eliminar subsección "${subseccion.nombre}"`}
                >
                  <FontAwesomeIcon icon={iconoEliminar} />
                </button>
              }
            </div>}
          </li>
      ))}
    </ul>
  )
}

export default ListaSubsecciones
