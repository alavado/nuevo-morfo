import React from 'react'
import './Login.css'
import { useSelector, useDispatch } from 'react-redux'
import { esconderLogin } from '../../redux/actions'
import { isDev } from '../../helpers/dev'

const Login = () => {

  const { mostrandoLogin } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  if (!mostrandoLogin) {
    return null
  }

  const autenticarConUCampus = () => {
    if (isDev) {
      window.location.href = 'https://www.u-cursos.cl/upasaporte/login?servicio=morfo'
    }
  }

  return (
    <div className="fondo-oscuro" onClick={() => dispatch(esconderLogin())}>
      <div className="contenedor-formulario">
        <form>
          <input />
          <input type="submit" />
        </form>
      </div>
    </div>
  )
}

export default Login
