import React from 'react'
import './Usuario.css'
import { useSelector, useDispatch } from 'react-redux'
import { mostrarLogin } from '../../../redux/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser as iconoUsuario } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Usuario = () => {

  const { usuario } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  return (
    <>
      {usuario !== null ?
        <Link to="/usuario" className="nombre-usuario">
          <FontAwesomeIcon icon={iconoUsuario} size="lg" />
          <div>{usuario.nombre}</div>
        </Link> :
        <a href="#" onClick={() => dispatch(mostrarLogin())}>Acceder</a>
      }
    </>
  )
}

export default Usuario
