import React from 'react'
import './Principal.css'
import Mapa from '../Mapa'
import { Switch, Route } from 'react-router-dom'
import Landing from '../Landing'
import Usuarios from '../Usuarios'
import Grupos from '../Grupos'
import Relleno from '../Relleno'
import Slider from '../Slider'
import Perfil from '../Perfil'

const Principal = () => {
  return (
    <section className="Principal">
      <Switch>
        <Route path="/slider" component={Slider} />
        <Route path="/contenido/nuevo" component={Relleno} />
        <Route path="/contenido/:id" component={Mapa} />
        <Route path="/subseccion/:id" component={Landing} />
        <Route path="/seccion/:id" component={Landing} />
        <Route path="/usuarios" component={Usuarios} />
        <Route path="/perfil" component={Perfil} />
        <Route path="/grupos" component={Grupos} />
        <Route path="/" component={Landing} />
      </Switch>
    </section>
  )
}

export default Principal
