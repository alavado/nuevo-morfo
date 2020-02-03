import React from 'react'
import './Breadcrumb.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fijarSeccion } from '../../../redux/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

const Breadcrumb = () => {

  const seccion = useSelector(({ navegacion }) => navegacion.seccion)
  const subseccion = useSelector(({ navegacion }) => navegacion.subseccion)
  const dispatch = useDispatch()

  const linkSeccion = seccion ? <Link to={`/seccion/${seccion.id}`}>{seccion.nombre}</Link> : ''
  const likSubseccion = subseccion ? <Link to={`/subseccion/${subseccion.id}`}>{subseccion.nombre}</Link> : ''

  return (
    <div
      className="breadcrumb"
      style={!seccion ? { backgroundColor: 'white' } : {}}
    >
      <Link to="/" onClick={e => dispatch(fijarSeccion(null))}>
        <FontAwesomeIcon icon={faHome} />
      </Link>
      {linkSeccion}
      {likSubseccion}
    </div>
  )
}

export default Breadcrumb
