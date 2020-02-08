import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fijarSeccion, mostrarNavegacion, esconderNavegacion } from '../../redux/actions'
import Usuario from './Usuario'
import Secciones from './Secciones/Secciones'

const Header = () => {

  const dispatch = useDispatch()

  return (
    <header>
      <div id="brand">
        <Link to="/" onClick={e => {
          esconderNavegacion()
          dispatch(fijarSeccion(null))
        }}>Morfo</Link>
        <Link to="/admin">cp</Link>
      </div>
      <nav>
        <Secciones />
        <Usuario />
      </nav>
    </header>
  )
}

export default Header
