import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fijarSeccion, esconderNavegacion, mostrarAdministracion, seleccionarVistaContenidosGrupo } from '../../redux/actions'
import Usuario from './Usuario'
import Secciones from './Secciones/Secciones'
import logo from '../../assets/logo_superior.png'
import { useQuery } from '@apollo/react-hooks'
import query from '../../queries/grupos'

const Header = () => {

  const { data } = useQuery(query)
  const { mostrandoAdministracion } = useSelector(state => state.navegacion)
  const { usuario } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  return (
    <header>
      <div id="brand">
        <Link to="/" onClick={e => {
          dispatch(esconderNavegacion())
          dispatch(fijarSeccion(null))
        }}>
          <img src={logo} alt="logo morfo, ícono por FreePik de www.flaticon.com" />
        </Link>
      </div>
      {usuario && <div id="contenedor-selector-grupo">
        <label>Ver como:</label>
        <select onChange={e => dispatch(seleccionarVistaContenidosGrupo(e.target.value))}>
          {data && data.grupos.map(({nombre, id}) => (
            <option key={`selector-vista-grupo-${id}`} value={id}>{nombre}</option>
          ))}
        </select>
      </div>}
      <nav>
        {usuario && <Link
          to="/admin"
          className={mostrandoAdministracion ? 'seccion-activa': ''}
          onClick={e => {
            dispatch(mostrarAdministracion())
            dispatch(fijarSeccion(null))
          }}
        >
          Administración
        </Link>}
        <Secciones />
        <Usuario />
      </nav>
    </header>
  )
}

export default Header
