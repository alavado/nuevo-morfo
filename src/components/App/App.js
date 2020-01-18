import React from 'react'
import './App.css'
import Mapa from '../Mapa'

const App = () => {
  return (
    <div className="app">
      <section className="contenedor-lateral">
        Morfo
      </section>
      <section className="contenedor-principal">
        <Mapa />
      </section>
    </div>
  )
}

export default App
