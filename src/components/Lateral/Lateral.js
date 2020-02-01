import React from 'react'
import { Route } from 'react-router-dom'
import './Lateral.css'
import MenuSeccion from './MenuSeccion'
import MenuSubseccion from './MenuSubseccion'
import Breadcrumb from './Breadcrumb'
import InfoContenido from '../InfoContenido'
import MenuAdmin from './MenuAdmin'

const Lateral = () => {

  return (
    <aside>
      <Breadcrumb />
      <Route path="/admin" component={MenuAdmin} />
      <Route path="/seccion/:id" component={MenuSeccion} />
      <Route path="/subseccion/:id" component={MenuSubseccion} />
      <Route path="/contenido/:id" component={InfoContenido} />
    </aside>
  )
}

export default Lateral
