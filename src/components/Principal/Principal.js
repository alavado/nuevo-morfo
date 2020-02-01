import React from 'react'
import './Principal.css'
import Mapa from '../Mapa'
import { Switch, Route } from 'react-router-dom'

const Principal = () => {
  return (
    <section className="contenedor-principal">
      <Switch>
        <Route path="/contenido/:id" component={Mapa} />
        <Route path="/subseccion/:id" component={() => "selecciona un contenido"} />
        <Route path="/seccion/:id" component={() => "selecciona un contenido"} />
        <Route path="/" component={() => "bienvenido"} />
      </Switch>
    </section>
  )
}

export default Principal
