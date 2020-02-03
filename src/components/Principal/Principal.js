import React from 'react'
import './Principal.css'
import Mapa from '../Mapa'
import { Switch, Route } from 'react-router-dom'
import Buscador from '../Buscador'

const Principal = () => {
  return (
    <section className="contenedor-principal">
      <Switch>
        <Route path="/contenido/:id" component={Mapa} />
        <Route path="/subseccion/:id" component={Buscador} />
        <Route path="/seccion/:id" component={Buscador} />
        <Route path="/" component={Buscador} />
      </Switch>
    </section>
  )
}

export default Principal
