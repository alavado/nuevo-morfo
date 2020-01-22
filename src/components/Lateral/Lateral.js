import React from 'react'
import { Route } from 'react-router-dom'
import './Lateral.css'
import MenuSeccion from '../MenuSeccion'
import MenuSubseccion from '../MenuSubseccion'

const Lateral = () => {

  return (
    <aside>
      <Route path="/seccion/:id" component={MenuSeccion} />
      <Route path="/subseccion/:id" component={MenuSubseccion} />
    </aside>
  )
}

export default Lateral
