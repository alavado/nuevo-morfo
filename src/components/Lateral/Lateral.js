import React from 'react'
import { Route } from 'react-router-dom'
import './Lateral.css'

const Lateral = () => {
  return (
    <aside>
      <Route path="/seccion/:id" component={props => <h1>x</h1>} />
    </aside>
  )
}

export default Lateral
