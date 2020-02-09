import React from 'react'
import './Principal.css'
import Mapa from '../Mapa'
import { Switch, Route } from 'react-router-dom'
import Buscador from '../Buscador'
import Usuarios from '../Usuarios'

const Principal = () => {
  return (
    <section className="contenedor-principal">
      <Switch>
        <Route path="/contenido/nuevo" component={() => <p>x</p>} />
        <Route path="/contenido/:id" component={Mapa} />
        <Route path="/subseccion/:id" component={Buscador} />
        <Route path="/seccion/:id" component={Buscador} />
        <Route path="/" component={Buscador} />
        <Route path="/usuarios" component={Usuarios} />
      </Switch>
    </section>
  )
}

export default Principal
