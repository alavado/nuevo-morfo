import React from 'react'
import './App.css'
import Mapa from '../Mapa'
import Header from '../Header'
import Lateral from '../Lateral'

const App = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Lateral />
        <section className="contenedor-principal">
          <Mapa />
        </section>
      </main>
    </div>
  )
}

export default App
