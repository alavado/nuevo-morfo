import React, { useState, useEffect, useRef } from 'react'
import './Login.css'
import { useSelector, useDispatch } from 'react-redux'
import { esconderLogin, fijarUsuario } from '../../redux/actions'
import loginMutation from '../../mutations/login'
import { useMutation } from '@apollo/react-hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt as iconoEnlaceExterno } from '@fortawesome/free-solid-svg-icons'

const Login = () => {

  const [variables, setVariables] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState(null)
  const fondo = useRef()
  const inputEmail = useRef()
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
        const { token } = res.data.login
        dispatch(fijarUsuario(token))
      })
      .catch(err => {
        setError('Usuario o contraseña incorrectos')
      })
  }

  useEffect(() => {
    if (!mostrandoLogin) {
      fondo.current.classList.add('fondo-oscuro-oculto')
    }
    else {
      fondo.current.classList.remove('fondo-oscuro-oculto')
      inputEmail.current.focus()
    }
  }, [mostrandoLogin])

  return (
    <div
      className="fondo-oscuro fondo-oscuro-oculto"
      ref={fondo}
      onClick={() => dispatch(esconderLogin())}
    >
      {mostrandoLogin &&
        <div className="contenedor-formulario" onClick={e => e.stopPropagation()}>
          <h3>Ingresar a Morfo</h3>
          <form onSubmit={acceder}>
            <div>
              <label htmlFor="login-email">E-mail</label>
              <input
                id="login-email"
                type="email"
                ref={inputEmail}
                spellCheck={false}
                onChange={e => setVariables({...variables, email: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="login-password">Contraseña</label>
              <input
                id="login-password"
                type="password"
                onChange={e => setVariables({...variables, password: e.target.value})}
              />
            </div>
            {error && <div className="Login__error">{error}</div>}
            <button type="submit">Ingresar</button>
          </form>
          <button id="boton-ucampus" onClick={autenticarConUCampus}>
            Ingresar con U-Pasaporte <FontAwesomeIcon icon={iconoEnlaceExterno} />
          </button>
        </div>
      }
    </div>
  )
}

export default Login
