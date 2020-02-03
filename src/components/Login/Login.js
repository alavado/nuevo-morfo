import React, { useState, useEffect, useRef } from 'react'
import './Login.css'
import { useSelector, useDispatch } from 'react-redux'
import { esconderLogin, fijarUsuario } from '../../redux/actions'
import loginMutation from '../../mutations/login'
import { useMutation } from '@apollo/react-hooks'
import { decode } from 'jsonwebtoken'

const Login = () => {

  const [variables, setVariables] = useState({
    email: '',
    password: ''
  })
  const fondo = useRef()
  const { mostrandoLogin } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [login] = useMutation(loginMutation)

  const autenticarConUCampus = () => {
    window.location.href = 'https://www.u-cursos.cl/upasaporte/login?servicio=morfo'
  }

  const acceder = e => {
    e.preventDefault()
    login({ variables })
      .then(res => {
        dispatch(fijarUsuario(decode(res.data.login.token)))
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (!mostrandoLogin) {
      fondo.current.classList.add('fondo-oscuro-oculto')
    }
    else {
      fondo.current.classList.remove('fondo-oscuro-oculto')
    }
  }, [mostrandoLogin])

  return (
    <div
      className="fondo-oscuro fondo-oscuro-oculto"
      ref={fondo}
      onClick={() => dispatch(esconderLogin())}
    >
      <div className="contenedor-formulario" onClick={e => e.stopPropagation()}>
        <h3>Acceder a Morfo</h3>
        <form onSubmit={acceder}>
          <label for="login-email">E-mail</label>
          <input
            id="login-email"
            type="text"
            onChange={e => setVariables({...variables, email: e.target.value})}
          />
          <label for="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            onChange={e => setVariables({...variables, password: e.target.value})}
          />
          <input type="submit" value="Acceder" />
        </form>
        <button onClick={autenticarConUCampus}>Acceder con U-Campus</button>
      </div>
    </div>
  )
}

export default Login
