import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { esAdmin } from '../../../../../helpers/auth'
import { fijarSubseccion } from '../../../../../redux/actions'
import { faCaretRight, faEdit as iconoEditar } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt as iconoEliminar } from '@fortawesome/free-solid-svg-icons'
import eliminarSubseccionMutation from '../../../../../mutations/eliminarSubseccion'
import query from '../../../../../queries/seccion'
import { Link, useParams } from 'react-router-dom'
import _ from 'lodash'
import './LinkSubseccion.css'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'

const LinkSubseccion = ({ subseccion, i }) => {

  const { usuario } = useSelector(state => state.auth)
  const [eliminarMutate] = useMutation(eliminarSubseccionMutation)
  const dispatch = useDispatch()
  const { id } = useParams()

  const eliminar = idSubseccion => {
    eliminarMutate({
      variables: { id: idSubseccion },
      refetchQueries: [{ query, variables: { id } }]
    })
  }

  return (
    <li
      className="LinkSubseccion"
      key={subseccion.id}
      style={{ animationDelay: `${i * .05}s` }}
    >
      <Link
        to={`/subseccion/${subseccion.id}`} key={subseccion.id}
        onClick={e => dispatch(fijarSubseccion(subseccion))}
      >
        <FontAwesomeIcon
          className="ListaSubsecciones__icono_link_subseccion"
          icon={faCaretRight}
        />
        {subseccion.nombre}
      </Link>
      {usuario && esAdmin(usuario) && <div className="acciones-subseccion">
        {_.isEmpty(subseccion.contenidos.filter(c => !c.deleted)) &&
          <>
            <button
              className="boton-eliminar-subseccion"
              onClick={() => eliminar(subseccion.id)}
              title={`Editar nombre "${subseccion.nombre}"`}
            >
              <FontAwesomeIcon icon={iconoEditar} />
            </button>
            {/* <button
              className="boton-eliminar-subseccion"
              onClick={() => eliminar(subseccion.id)}
              title={`Eliminar subsección "${subseccion.nombre}"`}
            >
              <FontAwesomeIcon icon={iconoEliminar} />
            </button> */}
          </>
        }
      </div>}
    </li>
  )
}

export default LinkSubseccion