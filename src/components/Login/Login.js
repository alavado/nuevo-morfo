import React, { useState } from 'react'
import './Login.css'
import { useSelector, useDispatch } from 'react-redux'
import { esconderLogin, fijarUsuario } from '../../redux/actions'
import { isDev } from '../../helpers/dev'
import loginMutation from '../../mutations/login'
import { useMutation } from '@apollo/react-hooks'
import { decode } from 'jsonwebtoken'

const Login = () => {

  const [datosLogin, setDatosLogin] = useState({
    email: '',
    password: ''
  })
  const { mostrandoLogin } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [login, { data }] = useMutation(loginMutation)

  if (!mostrandoLogin) {
    return null
  }

  const autenticarConUCampus = () => {
    if (isDev) {
      window.location.href = 'https://www.u-cursos.cl/upasaporte/login?servicio=morfo'
    }
  }

  const acceder = e => {
    e.preventDefault()
    login({ variables: datosLogin })
    .then(res => {
      dispatch(fijarUsuario(decode(res.data.login.token)))
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="fondo-oscuro" onClick={() => dispatch(esconderLogin())}>
      <div className="contenedor-formulario" onClick={e => e.stopPropagation()}>
        <h3>Acceder a Morfo</h3>
        <form onSubmit={acceder}>
          <label>E-mail</label>
          <input type="text" onChange={e => setDatosLogin({...datosLogin, email: e.target.value})} />
          <label>Password</label>
          <input type="password" onChange={e => setDatosLogin({...datosLogin, password: e.target.value})} />
          <input type="submit" value="Acceder" />
        </form>
        <button onClick={autenticarConUCampus}>Acceder con U-Campus</button>
      </div>
    </div>
  )
}

export default Login
