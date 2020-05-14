import React from 'react'
import './Breadcrumb.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fijarSeccion, esconderNavegacion } from '../../../redux/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

const Breadcrumb = () => {

  const { seccion, subseccion } = useSelector(state => state.navegacion)
  const dispatch = useDispatch()
  
  return (
    <div className="Breadcrumb">
      <Link
        to="/"
        className="Breadcrumb__link"
        onClick={e => {
          dispatch(esconderNavegacion())
          dispatch(fijarSeccion(null))
        }}
      >
        <FontAwesomeIcon icon={faHome} />
      </Link>
      {seccion &&
        <Link className="Breadcrumb__link" to={`/seccion/${seccion.id}`}>
          {seccion.nombre}
        </Link>
      }
      {subseccion &&
        <Link className="Breadcrumb__link" to={`/subseccion/${subseccion.id}`}>
          {subseccion.nombre}
        </Link>}
    </div>
  )
}

export default Breadcrumb
