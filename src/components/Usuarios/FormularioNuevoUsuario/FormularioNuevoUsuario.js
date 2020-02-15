import React from 'react'
import './FormularioNuevoUsuario.css'
import { useDispatch } from 'react-redux'
import { esconderFormularioNuevoUsuario } from '../../../redux/actions'

const FormularioNuevoUsuario = () => {

  const dispatch = useDispatch()

  const registrarNuevoUsuario = e => {
    e.preventDefault()
  }

  return (
    <div className="seccion-fondo-oscuro" onClick={() => dispatch(esconderFormularioNuevoUsuario())}>
      <div
        className="contenedor-formulario"
        id="formulario-nuevo-usuario"
        onClick={e => e.stopPropagation()}
      >
        <h3>Nuevo usuario</h3>
        <form onSubmit={registrarNuevoUsuario} autoComplete="new-password">
          <div>
            <label htmlFor="nuevo-usuario-email">E-mail</label>
            <input
              id="nuevo-usuario-email"
              type="email"
              spellCheck={false}
              autoFocus
              autoComplete="new-password"
            />
          </div>
          <div>
            <label htmlFor="nuevo-usuario-password">Contraseña</label>
            <input
              id="nuevo-usuario-password"
              type="password"
              autoComplete="new-password"
            />
          </div>
          <div>
            <label htmlFor="nuevo-usuario-confirmacion-password">Confirmar contraseña</label>
            <input
              id="nuevo-usuario-confirmacion-password"
              type="password"
            />
          </div>
          <input type="submit" value="Registrar" />
        </form>
      </div>
    </div>
  )
}

export default FormularioNuevoUsuario
