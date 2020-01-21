import React from 'react'
import './Header.css'
import query from '../../queries/secciones'
import { useQuery } from '@apollo/react-hooks'
import { isDev } from '../../helpers/dev'

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
          <a
            style={{ animationDelay: `${.15 * (data.secciones.length - i)}s` }}
            href={`/seccion/${id}`}
          >
            {nombre}
          </a>
        ))}
        <a href="#" onClick={autenticarConUCampus}>Acceder</a>
      </nav>
    </header>
  )
}

export default Header
