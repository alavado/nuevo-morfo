import React from 'react'
import './Breadcrumb.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Breadcrumb = () => {

  const seccion = useSelector(({ navegacion }) => navegacion.seccion)
  const subseccion = useSelector(({ navegacion }) => navegacion.subseccion)

  const linkSeccion = seccion ? <Link to={`/seccion/${seccion.id}`}>{seccion.nombre}</Link> : ''
  const likSubseccion = subseccion ? <Link to={`/subseccion/${subseccion.id}`}>{subseccion.nombre}</Link> : ''

  return (
    <div
      className="breadcrumb"
      style={!seccion ? { backgroundColor: 'white' } : {}}
    >
      {linkSeccion} {likSubseccion}
    </div>
  )
}

export default Breadcrumb
