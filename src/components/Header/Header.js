import React from 'react'
import './Header.css'
import query from '../../queries/secciones'
import { useQuery } from '@apollo/react-hooks'
import { isDev } from '../../helpers/dev'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fijarSeccion, mostrarLogin } from '../../redux/actions'

const Header = () => {

  const dispatch = useDispatch()
  const { seccion: seccionSeleccionada } = useSelector(state => state.navegacion)
  const { usuario } = useSelector(state => state.auth)
  const { loading, error, data } = useQuery(query)

  return (
    <header>
      <div id="brand">
        <Link to="/" onClick={e => dispatch(fijarSeccion(null))}>Morfo</Link>
        <Link to="/admin">cp</Link>
      </div>
      <nav>
        {!loading && data && data.secciones.map((seccion, i) => (
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
        {usuario !== null ?
          <a>{usuario.nombre}</a> :
          <a href="#" onClick={() => dispatch(mostrarLogin())}>Acceder</a>
        }
      </nav>
    </header>
  )
}

export default Header
