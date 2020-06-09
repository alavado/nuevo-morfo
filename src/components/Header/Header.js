import React, { useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fijarSeccion, esconderNavegacion, seleccionarVistaContenidosGrupo } from '../../redux/actions'
import Usuario from './Usuario'
import Secciones from './Secciones/Secciones'
import logo from '../../assets/logo_superior.png'
import { useQuery } from '@apollo/react-hooks'
import query from '../../queries/grupos'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

const Header = () => {

  const [mostrarMenu, setMostrarMenu] = useState(false)
  const { data } = useQuery(query)
  const { usuario } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  return (
    <header className="Header" onClick={() => mostrarMenu && setMostrarMenu(false)}>
      <div className="Header__brand">
        <Link to="/" className="Header__brand_link" onClick={e => {
          dispatch(esconderNavegacion())
          dispatch(fijarSeccion(null))
        }}>
          <img className="Header__brand_image" src={logo} alt="logo morfo, ícono por FreePik de www.flaticon.com" />
        </Link>
      </div>
      {usuario && false && <div className="Header__contenedor_selector_grupo">
        <label>Ver como:</label>
        <select onChange={e => dispatch(seleccionarVistaContenidosGrupo(e.target.value))}>
          {data && data.grupos.map(({nombre, id}) => (
            <option key={`selector-vista-grupo-${id}`} value={id}>{nombre}</option>
          ))}
        </select>
      </div>}
      <nav className={`Header__navegacion${mostrarMenu ? ' Header__navegacion--activa' : ''}`}>
        <button className="Header__ocultar_menu" onClick={() => setMostrarMenu(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <Secciones />
        <Usuario />
      </nav>
      <button className="Header__mostrar_menu" onClick={() => setMostrarMenu(true)}>
        <FontAwesomeIcon icon={faBars} />
      </button>
    </header>
  )
}

export default Header
