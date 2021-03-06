import React, { useState, useRef } from 'react'
import './FormularioNuevoUsuario.css'
import { useDispatch } from 'react-redux'
import { esconderFormularioNuevoUsuario, agregarNuevoUsuario } from '../../../redux/actions'
import mutation from '../../../mutations/agregarUsuario'
import query from '../../../queries/usuarios'
import { useMutation } from '@apollo/react-hooks'

const FormularioNuevoUsuario = () => {

  const [variables, setVariables] = useState({
    nombre: '',
    email: '',
    password: ''
  })
  const confirmacionPassword = useRef()
  const dispatch = useDispatch()
  const [agregarUsuarioMutate] = useMutation(mutation)
  const [error, setError] = useState(null)

  const registrarNuevoUsuario = e => {
    e.preventDefault()
    if (variables.password !== confirmacionPassword.current.value) {
      setError("Las contraseñas no coinciden")
      return
    }
    agregarUsuarioMutate({
      variables,
      refetchQueries: [{ query }]
    })
      .then(({ data }) => {
        const { id } = data.agregarUsuario
        dispatch(agregarNuevoUsuario(id))
        dispatch(esconderFormularioNuevoUsuario())
      })
      .catch(() => setError('Ya existe un usuario con ese e-mail'))
  }

  return (
    <div
      className="seccion-fondo-oscuro"
      onClick={() => dispatch(esconderFormularioNuevoUsuario())}
    >
      <div
        className="contenedor-formulario"
        id="formulario-nuevo-usuario"
        onClick={e => e.stopPropagation()}
      >
        <h3>Nuevo usuario</h3>
        <form onSubmit={registrarNuevoUsuario} autoComplete="new-password">
          <div>
            <label htmlFor="nuevo-usuario-nombre">Nombre</label>
            <input
              id="nuevo-usuario-nombre"
              type="text"
              spellCheck={false}
              autoFocus
              value={variables.nombre}
              onChange={e => setVariables({...variables, nombre: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="nuevo-usuario-email">E-mail</label>
            <input
              id="nuevo-usuario-email"
              type="email"
              spellCheck={false}
              autoComplete="new-password"
              value={variables.email}
              onChange={e => setVariables({...variables, email: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="nuevo-usuario-password">Contraseña</label>
            <input
              id="nuevo-usuario-password"
              type="password"
              autoComplete="new-password"
              value={variables.password}
              onChange={e => setVariables({...variables, password: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="nuevo-usuario-confirmacion-password">Confirmar contraseña</label>
            <input
              id="nuevo-usuario-confirmacion-password"
              type="password"
              ref={confirmacionPassword}
              autoComplete="new-password"
            />
          </div>
          <input type="submit" value="Registrar" />
          {error && <div>{error}</div>}
        </form>
      </div>
    </div>
  )
}

export default FormularioNuevoUsuario
