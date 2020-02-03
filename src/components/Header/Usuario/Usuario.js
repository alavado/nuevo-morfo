import React from 'react'
import './Usuario.css'
import { useSelector, useDispatch } from 'react-redux'
import { mostrarLogin } from '../../../redux/actions'

const Usuario = () => {

  const { usuario } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  return (
    <>
      {usuario !== null ?
        <a>{usuario.nombre}</a> :
        <a href="#" onClick={() => dispatch(mostrarLogin())}>Acceder</a>
      }
    </>
  )
}

export default Usuario
