import React from 'react'
import { Route } from 'react-router-dom'
import './Lateral.css'
import MenuSeccion from '../MenuSeccion'
import MenuSubseccion from '../MenuSubseccion'
import Breadcrumb from '../Breadcrumb'

const Lateral = () => {

  return (
    <aside>
      <Breadcrumb />
      <Route path="/seccion/:id" component={MenuSeccion} />
      <Route path="/subseccion/:id" component={MenuSubseccion} />
      <Route path="/contenido/:id" component={() => 'x'} />
    </aside>
  )
}

export default Lateral
