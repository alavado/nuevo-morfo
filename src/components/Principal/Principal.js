import React from 'react'
import './Principal.css'
import Mapa from '../Mapa'
import { Route } from 'react-router-dom'

const Principal = () => {
  return (
    <section className="contenedor-principal">
      <Route path="/contenido/:id" component={Mapa} />
    </section>
  )
}

export default Principal
