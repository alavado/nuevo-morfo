import React from 'react'
import './Header.css'

const Header = () => {

  const autenticarConUCampus = () => {
    if (window.location.href.indexOf('localhost') < 0) {
      window.location.href = 'https://www.u-cursos.cl/upasaporte/login?servicio=morfo'
      return null;
    }
  }

  return (
    <header>
      <div id="brand">Morfo</div>
      <nav>
        <a href="">Anatomía</a>
        <a href="">Neuroanatomía</a>
        <a href="">Imagenología</a>
        <a href="#" onClick={autenticarConUCampus}>Acceder</a>
      </nav>
    </header>
  )
}

export default Header
