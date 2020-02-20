import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fijarSeccion, esconderNavegacion, mostrarAdministracion } from '../../redux/actions'
import Usuario from './Usuario'
import Secciones from './Secciones/Secciones'

const Header = () => {

  const { mostrandoAdministracion } = useSelector(state => state.navegacion)
  const dispatch = useDispatch()

  return (
    <header>
      <div id="brand">
        <Link to="/" onClick={e => {
          dispatch(esconderNavegacion())
          dispatch(fijarSeccion(null))
        }}>Morfo</Link>
      </div>
      <nav>
        <Link
          to="/admin"
          className={mostrandoAdministracion ? 'seccion-activa': ''}
          onClick={e => {
            dispatch(mostrarAdministracion())
            dispatch(fijarSeccion(null))
          }}
        >
          Administración
        </Link>
        <Secciones />
        <Usuario />
      </nav>
    </header>
  )
}

export default Header
