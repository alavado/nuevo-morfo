import React from 'react'
import './Header.css'
import query from '../../queries/secciones'
import { useQuery } from '@apollo/react-hooks'
import { isDev } from '../../helpers/dev'
import { NavLink } from 'react-router-dom'

const Header = () => {

  const { loading, error, data } = useQuery(query)

  const autenticarConUCampus = () => {
    if (isDev) {
      window.location.href = 'https://www.u-cursos.cl/upasaporte/login?servicio=morfo'
    }
  }

  return (
    <header>
      <div id="brand">Morfo</div>
      <nav>
        {!loading && data.secciones.map(({ id, nombre }, i) => (
          <NavLink
            key={id}
            to={`/seccion/${id}`}
            activeClassName="seccion-activa"
            style={{ animationDelay: `${.15 * (data.secciones.length - i)}s` }}
          >
            {nombre}
          </NavLink>
        ))}
        <a href="#" onClick={autenticarConUCampus}>Acceder</a>
      </nav>
    </header>
  )
}

export default Header
