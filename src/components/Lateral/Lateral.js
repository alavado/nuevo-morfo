import React from 'react'
import { Route } from 'react-router-dom'
import './Lateral.css'
import MenuSeccion from '../MenuSeccion'

const Lateral = () => {

  return (
    <aside>
      <Route path="/seccion/:id" component={MenuSeccion} />
    </aside>
  )
}

export default Lateral
