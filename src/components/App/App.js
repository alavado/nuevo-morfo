import React from 'react'
import './App.css'
import Mapa from '../Mapa'

const App = () => {
  return (
    <div className="app">
      <header>
        <div id="brand">Morfo</div>
        <nav>
          <a href="">Anatomía</a>
          <a href="">Neuroanatomía</a>
          <a href="">Imagenología</a>
          <a href="#" onClick={() => {
            if (window.location.href.indexOf('localhost') < 0) {
              window.location.href = 'https://www.u-cursos.cl/upasaporte/login?servicio=morfo'
              return null;
          }}}>Acceder</a>
        </nav>
      </header>
      <main>
        <aside>
          
        </aside>
        <section className="contenedor-principal">
          <Mapa />
        </section>
      </main>
    </div>
  )
}

export default App
