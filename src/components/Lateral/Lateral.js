import React from 'react'
import { Route } from 'react-router-dom'
import './Lateral.css'
import MenuSeccion from '../MenuSeccion'
import MenuSubseccion from '../MenuSubseccion'
import { useSelector } from 'react-redux'

const Lateral = () => {

  const seccion = useSelector(state => state.navegacion.seccion)
  const subseccion = useSelector(state => state.navegacion.subseccion)

  return (
    <aside>
      <div className="breadcrumb">{seccion ? seccion.nombre : ''} {subseccion ? subseccion.nombre : ''}</div>
      <Route path="/seccion/:id" component={MenuSeccion} />
      <Route path="/subseccion/:id" component={MenuSubseccion} />
    </aside>
  )
}

export default Lateral
