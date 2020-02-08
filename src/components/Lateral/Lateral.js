import React, { useEffect, useRef } from 'react'
import { Route } from 'react-router-dom'
import './Lateral.css'
import MenuSeccion from './MenuSeccion'
import MenuSubseccion from './MenuSubseccion'
import Breadcrumb from './Breadcrumb'
import InfoContenido from '../InfoContenido'
import MenuAdmin from './MenuAdmin'
import { useSelector } from 'react-redux'

const Lateral = () => {

  const { activa } = useSelector(state => state.navegacion)
  const lateral = useRef()

  useEffect(() => {
    if (activa) {
      lateral.current.classList.add('visible')
    }
    else {
      lateral.current.classList.remove('visible')
    }
  }, [activa])

  return (
    <aside ref={lateral}>
      <Breadcrumb />
      <Route path="/admin" component={MenuAdmin} />
      <Route path="/seccion/:id" component={MenuSeccion} />
      <Route path="/subseccion/:id" component={MenuSubseccion} />
      <Route path="/contenido/:id" component={InfoContenido} />
    </aside>
  )
}

export default Lateral
