import React from 'react'
import './Principal.css'
import Mapa from '../Mapa'
import { Switch, Route } from 'react-router-dom'
import Buscador from '../Buscador'
import Usuarios from '../Usuarios'
import Grupos from '../Grupos'
import Relleno from '../Relleno'
import Perfil from '../Perfil'

const Principal = () => {
  return (
    <section className="contenedor-principal">
      <Switch>
        <Route path="/contenido/nuevo" component={Relleno} />
        <Route path="/contenido/:id" component={Mapa} />
        <Route path="/subseccion/:id" component={Buscador} />
        <Route path="/seccion/:id" component={Buscador} />
        <Route path="/usuarios" component={Usuarios} />
        <Route path="/usuario" component={Perfil} />
        <Route path="/grupos" component={Grupos} />
        <Route path="/" component={Buscador} />
      </Switch>
    </section>
  )
}

export default Principal
