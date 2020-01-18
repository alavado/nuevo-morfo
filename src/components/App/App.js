import React from 'react'
import './App.css'
import Mapa from '../Mapa'

const App = () => {
  return (
    <div className="app">
      <nav>Morfo</nav>
      <main>
        <section className="contenedor-lateral">
          
        </section>
        <section className="contenedor-principal">
          <Mapa />
        </section>
      </main>
    </div>
  )
}

export default App
