import React from 'react'
import './Header.css'
import query from '../../queries/secciones'
import { useQuery } from '@apollo/react-hooks'
import { isDev } from '../../helpers/dev'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fijarSeccion } from '../../redux/actions'

const Header = () => {

  const dispatch = useDispatch()
  const seccionSeleccionada = useSelector(state => state.seccion.seccion)
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
        {!loading && data.secciones.map((seccion, i) => (
          <Link
            key={seccion.id}
            to={`/seccion/${seccion.id}`}
            className={
              seccionSeleccionada &&
              seccionSeleccionada.id === seccion.id ?
              'seccion-activa' : ''
            }
            onClick={e => dispatch(fijarSeccion(seccion))}
            style={{ animationDelay: `${.15 * (data.secciones.length - i)}s` }}
          >
            {seccion.nombre}
          </Link>
        ))}
        <a href="#" onClick={autenticarConUCampus}>Acceder</a>
      </nav>
    </header>
  )
}

export default Header
