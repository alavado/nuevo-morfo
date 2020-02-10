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
    <div
      className="breadcrumb"
      style={!seccion ? { backgroundColor: 'white' } : {}}
    >
      <Link to="/" onClick={e => {
        dispatch(esconderNavegacion())
        dispatch(fijarSeccion(null))
      }}>
        <FontAwesomeIcon icon={faHome} />
      </Link>
      {seccion && <Link to={`/seccion/${seccion.id}`}>{seccion.nombre}</Link>}
      {subseccion && <Link to={`/subseccion/${subseccion.id}`}>{subseccion.nombre}</Link>}
    </div>
  )
}

export default Breadcrumb
