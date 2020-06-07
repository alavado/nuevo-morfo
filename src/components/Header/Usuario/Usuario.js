import React from 'react'
import './Usuario.css'
import { useSelector, useDispatch } from 'react-redux'
import { mostrarLogin } from '../../../redux/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt as iconoUsuario } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Usuario = () => {

  const { usuario } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  return (
    <div className="Usuario">
      {usuario !== null ?
        <Link to="/perfil" className="Usuario__link">
          <FontAwesomeIcon className="Usuario__icono" icon={iconoUsuario} size="1x" />
          <div className="Usuario__nombre">{usuario.nombre}</div>
        </Link> :
        <button
          className="Usuario__boton_acceder"
          onClick={() => dispatch(mostrarLogin())}
        >
          Acceder
        </button>
      }
    </div>
  )
}

export default Usuario
