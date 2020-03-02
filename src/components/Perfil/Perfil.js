import React, { useEffect } from 'react'
import './Perfil.css'
import { logout } from '../../helpers/auth'
import { logout as logoutRedux } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { esconderNavegacion } from '../../redux/actions'
import { Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'

const Perfil = () => {

  const dispatch = useDispatch()
  const { usuario } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(esconderNavegacion())
  }, [])

  if (!usuario) {
    return <Redirect to="/" />
  }

  const cerrarSesion = () => {
    logout()
    dispatch(logoutRedux())
  }

  return (
    <div className="fondo-perfil">
      <div className="contenedor-datos-perfil">
        <FontAwesomeIcon icon={faUserAlt} size="2x" />
        <h1>{usuario.nombre}</h1>
        <button onClick={cerrarSesion}>Cerrar sesión</button>
      </div>
    </div>
  )
}

export default Perfil
