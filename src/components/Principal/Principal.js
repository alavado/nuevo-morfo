import React from 'react'
import './Principal.css'
import Mapa from '../Mapa'
import { Switch, Route } from 'react-router-dom'

const Principal = () => {
  return (
    <section className="contenedor-principal">
      <Switch>
        <Route path="/contenido/:id" component={Mapa} />
        <Route path="/" component={Mapa} />
      </Switch>
    </section>
  )
}

export default Principal
