import React from 'react'
import { Route } from 'react-router-dom'
import './Lateral.css'
import MenuSubsecciones from '../MenuSubsecciones'

const Lateral = () => {

  return (
    <aside>
      <Route path="/seccion/:id" component={MenuSubsecciones} />
    </aside>
  )
}

export default Lateral
